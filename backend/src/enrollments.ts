import { BadRequestException, Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { EnrollmentStatus, PaymentMode, Prisma, Role } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';
import { Db } from './prisma';
import { Actor, CurrentUser, Roles } from './security';
class EnrollDto { @IsString() courseId!:string; @IsIn(['FREE','FULL','INSTALLMENTS']) plan!:PaymentMode; }
const roles:Role[]=['STAFF','ADMIN','SUPER_ADMIN'];
@Controller('enrollments')
export class EnrollmentsController {
 constructor(private db:Db){}
 @Post() async enroll(@Body() dto:EnrollDto,@CurrentUser() actor:Actor){
  const course=await this.db.course.findFirst({where:{OR:[{id:dto.courseId},{code:dto.courseId}],status:'PUBLISHED'}});
  if(!course)throw new NotFoundException('Course unavailable');
  if(course.paymentMode==='FREE'&&dto.plan!=='FREE')throw new BadRequestException('Free plan required');
  if(course.paymentMode!=='FREE'&&(dto.plan==='FREE'||(course.paymentMode!=='BOTH'&&course.paymentMode!==dto.plan)))throw new BadRequestException('Payment option not offered');
  const free=course.paymentMode==='FREE';
  const existing=await this.db.enrollment.findUnique({where:{userId_courseId:{userId:actor.id,courseId:course.id}}});
  if(existing)return existing; // never reset an existing verified enrollment by re-enrolling
  const fee=free?0:course.feeMinor;
  if(!free&&fee<=0)throw new BadRequestException('Course fee not configured');
  const amounts:number[]=[];
  if(dto.plan==='INSTALLMENTS'){
    const deposit=Math.ceil(fee*course.depositPercent/100);amounts.push(deposit);
    const remaining=fee-deposit;const count=course.installmentCount-1;
    for(let i=0;i<count;i++)amounts.push(Math.floor(remaining/count)+(i<remaining%count?1:0));
  }else if(!free)amounts.push(fee);
  try{return await this.db.enrollment.create({data:{userId:actor.id,courseId:course.id,selectedPlan:dto.plan,totalMinor:fee,currency:course.currency,status:free?'ACTIVE':'PENDING_PAYMENT',accessGrantedAt:free?new Date():null,installments:{create:amounts.map((amountMinor,i)=>({sequence:i+1,amountMinor}))}},include:{installments:true}});}
  catch(e){if(e instanceof Prisma.PrismaClientKnownRequestError&&e.code==='P2002')return this.db.enrollment.findUnique({where:{userId_courseId:{userId:actor.id,courseId:course.id}}});throw e;}
 }
 @Get('mine') mine(@CurrentUser() actor:Actor){return this.db.enrollment.findMany({where:{userId:actor.id},include:{course:{select:{id:true,code:true,title:true,currency:true}},installments:true,payments:{select:{id:true,amountMinor:true,status:true,createdAt:true}}},orderBy:{createdAt:'desc'}});}
 @Get(':id/lessons') async lessons(@Param('id') id:string,@CurrentUser() actor:Actor){
  const enrollment=await this.db.enrollment.findUnique({where:{id},include:{course:true}});
  if(!enrollment)throw new NotFoundException();
  if(enrollment.userId!==actor.id&&!roles.includes(actor.role))throw new ForbiddenException();
  if(!['ACTIVE','COMPLETED'].includes(enrollment.status))throw new ForbiddenException('Payment required before learning');
  return this.db.lesson.findMany({where:{courseId:enrollment.courseId,published:true},orderBy:{position:'asc'}});
 }
 @Post(':id/lessons/:lessonId/complete') async complete(@Param('id')id:string,@Param('lessonId')lessonId:string,@CurrentUser()actor:Actor){
  const enrollment=await this.db.enrollment.findUnique({where:{id}});
  if(!enrollment||enrollment.userId!==actor.id)throw new NotFoundException();
  if(enrollment.status!=='ACTIVE'&&enrollment.status!=='COMPLETED')throw new ForbiddenException('Course access is locked');
  const lesson=await this.db.lesson.findFirst({where:{id:lessonId,courseId:enrollment.courseId,published:true}});
  if(!lesson)throw new NotFoundException();
  return this.db.lessonProgress.upsert({where:{enrollmentId_lessonId:{enrollmentId:id,lessonId}},update:{},create:{enrollmentId:id,lessonId}});
 }
}
@Controller('admin/enrollments')
export class AdminEnrollmentsController {
 constructor(private db:Db){}
 @Roles(...roles) @Get() list(){return this.db.enrollment.findMany({include:{user:{select:{name:true,email:true}},course:{select:{title:true,code:true}},payments:true,installments:true},orderBy:{createdAt:'desc'}});}
}
