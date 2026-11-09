import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, BadRequestException } from '@nestjs/common';
import { CourseStatus, PaymentMode, Role } from '@prisma/client';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Db } from './prisma';
import { Actor, CurrentUser, Public, Roles } from './security';
class CourseDto {
 @IsString() @MaxLength(30) code!:string;
 @IsString() @MaxLength(180) title!:string;
 @IsOptional() @IsString() @MaxLength(3000) description?:string;
 @IsOptional() @IsString() @MaxLength(80) department?:string;
 @IsOptional() @IsIn(['DRAFT','PUBLISHED','ARCHIVED']) status?:CourseStatus;
 @IsInt() @Min(0) feeMinor!:number;
 @IsString() @MaxLength(3) currency!:string;
 @IsIn(['FREE','FULL','INSTALLMENTS','BOTH']) paymentMode!:PaymentMode;
 @IsInt() @Min(1) @Max(99) depositPercent!:number;
 @IsInt() @Min(2) @Max(24) installmentCount!:number;
 @IsBoolean() accessAfterDeposit!:boolean;
}
class LessonDto { @IsString() @MaxLength(180) title!:string; @IsString() @MaxLength(50000) body!:string; @IsInt() @Min(1) position!:number; @IsBoolean() published!:boolean; }
const staffRoles:Role[]=['STAFF','ADMIN','SUPER_ADMIN'];
@Controller('courses')
export class CoursesController {
 constructor(private db:Db){}
 @Public() @Get() list(){return this.db.course.findMany({where:{status:'PUBLISHED'},select:{id:true,code:true,title:true,description:true,department:true,feeMinor:true,currency:true,paymentMode:true,depositPercent:true,installmentCount:true,accessAfterDeposit:true},orderBy:{title:'asc'}});}
 @Public() @Get(':id') async detail(@Param('id') id:string){const course=await this.db.course.findFirst({where:{OR:[{id},{code:id}],status:'PUBLISHED'},select:{id:true,code:true,title:true,description:true,department:true,feeMinor:true,currency:true,paymentMode:true,depositPercent:true,installmentCount:true,accessAfterDeposit:true,lessons:{where:{published:true},select:{id:true,title:true,position:true},orderBy:{position:'asc'}}}});if(!course)throw new NotFoundException();return course;}
 @Roles(...staffRoles) @Post() async create(@Body() dto:CourseDto,@CurrentUser() actor:Actor){const course=await this.db.course.create({data:dto});await this.db.auditLog.create({data:{actorId:actor.id,action:'COURSE_CREATED',entity:'course',entityId:course.id}});return course;}
 @Roles(...staffRoles) @Patch(':id') async update(@Param('id') id:string,@Body() dto:CourseDto,@CurrentUser() actor:Actor){const course=await this.db.course.update({where:{id},data:dto});await this.db.auditLog.create({data:{actorId:actor.id,action:'COURSE_UPDATED',entity:'course',entityId:course.id}});return course;}
 @Roles(...staffRoles) @Post(':id/lessons') async addLesson(@Param('id')courseId:string,@Body()dto:LessonDto,@CurrentUser() actor:Actor){const course=await this.db.course.findUnique({where:{id:courseId}});if(!course)throw new NotFoundException('Course not found');const lesson=await this.db.lesson.create({data:{courseId,...dto}});await this.db.auditLog.create({data:{actorId:actor.id,action:'LESSON_CREATED',entity:'lesson',entityId:lesson.id}});return lesson;}
}
@Controller('admin/courses')
export class AdminCoursesController {
 constructor(private db:Db){}
 @Roles(...staffRoles) @Get() all(){return this.db.course.findMany({orderBy:{updatedAt:'desc'},include:{_count:{select:{enrollments:true,lessons:true}}}});}
}
