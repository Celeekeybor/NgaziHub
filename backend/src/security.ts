import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, createParamDecorator, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createHash, randomBytes } from 'node:crypto';
import type { Request } from 'express';
import { Role } from '@prisma/client';
import { Db } from './prisma';
export const AUTH_COOKIE = 'ngazihub_session';
export const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');
export const createToken=()=>randomBytes(32).toString('base64url');
export const Roles=(...roles:Role[])=>SetMetadata('roles',roles);
export const Public=()=>SetMetadata('public',true);
export type Actor={id:string;email:string;name:string;role:Role};
export const CurrentUser=createParamDecorator((_data:unknown,ctx:ExecutionContext):Actor => (ctx.switchToHttp().getRequest() as Request & {actor:Actor}).actor);
@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private db:Db,private reflector:Reflector){}
 async canActivate(context:ExecutionContext){
  if(this.reflector.getAllAndOverride<boolean>('public',[context.getHandler(),context.getClass()]))return true;
  const req=context.switchToHttp().getRequest<Request&{actor:Actor}>();
  const token=req.cookies?.[AUTH_COOKIE];
  if(typeof token!=='string')throw new UnauthorizedException('Log in required');
  const session=await this.db.session.findUnique({where:{tokenHash:tokenHash(token)},include:{user:true}});
  if(!session||session.revokedAt||session.expiresAt<=new Date()||!session.user.active)throw new UnauthorizedException('Session expired');
  req.actor={id:session.user.id,email:session.user.email,name:session.user.name,role:session.user.role};
  const roles=this.reflector.getAllAndOverride<Role[]>('roles',[context.getHandler(),context.getClass()]);
  if(roles && !roles.includes(req.actor.role))throw new ForbiddenException('Insufficient permissions');
  return true;
 }
}
