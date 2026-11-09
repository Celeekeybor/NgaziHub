import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IsEmail, IsIn, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { Prisma, Role } from '@prisma/client';
import { Db } from './prisma';
import { Actor, CurrentUser, Public, Roles } from './security';
const roles:Role[]=['STAFF','ADMIN','SUPER_ADMIN'];
const allowedKeys=['home','contact','footer','programs'];
class ContentDto { @IsObject() value!:Record<string,unknown>; }
class InquiryDto { @IsString() @MaxLength(120) name!:string; @IsEmail() email!:string; @IsOptional() @IsString() @MaxLength(30) phone?:string; @IsIn(['COURSES','KIDS','CORPORATE','PARTNERSHIP','GENERAL']) category!:string; @IsString() @MaxLength(5000) message!:string; }
@Controller('content')
export class ContentController {
 constructor(private db:Db){}
 @Public() @Get() async site(){const rows=await this.db.siteContent.findMany({where:{key:{in:allowedKeys}}});return Object.fromEntries(rows.map(row=>[row.key,row.value]));}
 @Roles(...roles) @Patch(':key') async update(@Param('key') key:string,@Body() dto:ContentDto,@CurrentUser()actor:Actor){
  if(!allowedKeys.includes(key)||!dto.value||typeof dto.value!=='object'||Array.isArray(dto.value))throw new BadRequestException('Invalid content section');
  // Whitelist fields in deployment rather than allowing arbitrary nested JSON/HTML.
  const record=await this.db.siteContent.upsert({where:{key},create:{key,value:dto.value as Prisma.InputJsonValue},update:{value:dto.value as Prisma.InputJsonValue}});
  await this.db.auditLog.create({data:{actorId:actor.id,action:'CONTENT_UPDATED',entity:'content',entityId:key}});
  return record;
 }
}
@Controller('inquiries')
export class InquiriesController {
 constructor(private db:Db){}
 @Public() @Post() async submit(@Body() dto:InquiryDto){await this.db.inquiry.create({data:dto});return {received:true,message:'Your inquiry was received.'};}
 @Roles(...roles) @Get() list(){return this.db.inquiry.findMany({orderBy:{createdAt:'desc'}});}
}
