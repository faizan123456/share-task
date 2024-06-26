import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import * as dotenv from 'dotenv';
dotenv.config()
const mongo_uri = process.env.DB_URL
console.log('process.env.DB_URL', mongo_uri)
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ".env",
    //   isGlobal: true,
    // }),
    MongooseModule.forRoot(mongo_uri),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('task');
  }
}
