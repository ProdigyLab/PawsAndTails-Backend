import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configService from '../database/dbconfigue';
import { LoginModule } from '../login/login.module';
import { PetInfoModule } from '../modules/petInfo/petInfo.module';
import { ProductModule } from '../modules/products/products.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from 'src/modules/auth/auth.module';
import { join } from 'path';
import { Image } from '../_entities/image.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule globally available
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Image]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to the public directory
      serveRoot: '/', // The base route for serving static files
      exclude: ['/api*', '/auth', 'products'],
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    LoginModule,
    PetInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
