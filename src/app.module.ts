import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './database/dbconfigue';
import { ProductModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { PetInfoModule } from './petInfo/petInfo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    ProductModule,
    LoginModule,
    PetInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
