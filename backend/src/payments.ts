import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { IsIn, IsString, MaxLength } from 'class-validator';
import { Db } from './prisma';
import { Actor, CurrentUser, Roles } from './security';
class PaymentRequestDto { @IsIn(['MPESA','CARD','BANK_TRANSFER']) provider!:string; }
@Controller('payments')
export class PaymentsController {
 constructor(private db:Db){}
 @Post('enrollments/:id/request') async initiate(@Param('id')id:string,@Body()dto:PaymentRequestDto,@CurrentUser()actor:Actor){
  const enrollment=await this.db.enrollment.findUnique({where:{id},include:{course:true,installments:true,payments:true}});
  if(!enrollment||enrollment.userId!==actor.id)throw new NotFoundException();
  if(enrollment.status==='CANCELLED'||enrollment.status==='COMPLETED')throw new BadRequestException('Enrollment cannot accept payments');
  const paid=enrollment.payments.filter(p=>p.status==='VERIFIED').reduce((total,p)=>total+p.amountMinor,0);
  const next=enrollment.installments.find(inst=>inst.amountMinor>0 && enrollment.payments.filter(p=>p.status==='VERIFIED').reduce((sum,p)=>sum+p.amountMinor,0)<enrollment.installments.filter(x=>x.sequence<=inst.sequence).reduce((sum,x)=>sum+x.amountMinor,0));
  if(!next||paid>=enrollment.totalMinor)throw new BadRequestException('No payment due');
  // Intentionally no pseudo-payment is created. A real provider adapter must first initiate a charge.
  return {status:'NOT_CONFIGURED',provider:dto.provider,amountMinor:Math.min(next.amountMinor,enrollment.totalMinor-paid),currency:enrollment.currency,message:'Payment provider not yet connected. No charge was initiated and course access remains controlled by verified payments.'};
 }
 @Get('enrollments/:id') async history(@Param('id')id:string,@CurrentUser()actor:Actor){const enrollment=await this.db.enrollment.findUnique({where:{id}});if(!enrollment||enrollment.userId!==actor.id)throw new NotFoundException();return this.db.payment.findMany({where:{enrollmentId:id},select:{id:true,amountMinor:true,currency:true,provider:true,status:true,verifiedAt:true,createdAt:true}});}
}
