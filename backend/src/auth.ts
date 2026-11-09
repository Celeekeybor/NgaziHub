import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import type { Request, Response } from 'express';
import { Db } from './prisma';
import { AUTH_COOKIE, createToken, CurrentUser, Actor, Public, tokenHash } from './security';
class RegisterDto { @IsString() @MinLength(2) @MaxLength(100) name!:string; @IsEmail() email!:string; @IsString() @MinLength(12) @MaxLength(200) password!:string; }
class LoginDto { @IsEmail() email!:string; @IsString() password!:string; }
const cookieSettings=()=>({httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/',maxAge:7*24*3600*1000});
@Controller('auth')
export class AuthController {
 constructor(private db:Db){}
 private async loginSession(user:{id:string;name:string;email:string;role:string},res:Response){
  const token=createToken();await this.db.session.create({data:{userId:user.id,tokenHash:tokenHash(token),expiresAt:new Date(Date.now()+7*24*3600*1000)}});
  res.cookie(AUTH_COOKIE,token,cookieSettings());return {user:{id:user.id,name:user.name,email:user.email,role:user.role}};
 }
 @Public() @Post('register') async register(@Body() dto:RegisterDto,@Res({passthrough:true})res:Response){
  const email=dto.email.trim().toLowerCase();
  try {const user=await this.db.user.create({data:{name:dto.name.trim(),email,passwordHash:await argon2.hash(dto.password),role:'STUDENT'}});return this.loginSession(user,res);}
  catch(e){if(e instanceof Prisma.PrismaClientKnownRequestError&&e.code==='P2002')throw new BadRequestException('Email already registered');throw e;}
 }
 @Public() @Post('login') async login(@Body() dto:LoginDto,@Res({passthrough:true})res:Response){
  const user=await this.db.user.findUnique({where:{email:dto.email.trim().toLowerCase()}});
  if(!user||!user.active||!(await argon2.verify(user.passwordHash,dto.password)))throw new UnauthorizedException('Invalid credentials');
  return this.loginSession(user,res);
 }
 @Get('me') me(@CurrentUser()user:Actor){return {user};}
 @Post('logout') @HttpCode(204) async logout(@Req() req:Request,@Res({passthrough:true})res:Response){
  const token=req.cookies?.[AUTH_COOKIE];if(typeof token==='string')await this.db.session.updateMany({where:{tokenHash:tokenHash(token)},data:{revokedAt:new Date()}});
  res.clearCookie(AUTH_COOKIE,{path:'/',sameSite:'lax',secure:process.env.NODE_ENV==='production'});
 }
}
