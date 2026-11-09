import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Db } from './prisma';
import { AuthGuard } from './security';
import { AuthController } from './auth';
import { CoursesController, AdminCoursesController } from './courses';
import { EnrollmentsController, AdminEnrollmentsController } from './enrollments';
import { PaymentsController } from './payments';
import { ContentController, InquiriesController } from './content';
@Module({controllers:[AuthController,CoursesController,AdminCoursesController,EnrollmentsController,AdminEnrollmentsController,PaymentsController,ContentController,InquiriesController],providers:[Db,{provide:APP_GUARD,useClass:AuthGuard}]})
export class AppModule {}
