import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { AppModule } from './module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, {bodyParser:true});
 app.use(helmet());
 app.use(cookieParser());
 app.use(rateLimit({windowMs:15*60*1000, limit:150, standardHeaders:'draft-7', legacyHeaders:false}));
 app.enableCors({origin:process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials:true});
 app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,transform:true}));
 app.setGlobalPrefix('api');
 await app.listen(Number(process.env.PORT)||4000);
}
bootstrap().catch((e)=>{console.error(e);process.exit(1)});
