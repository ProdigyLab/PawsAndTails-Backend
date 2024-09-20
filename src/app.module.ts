import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configService from './database/dbconfigue';
import { LoginModule } from './login/login.module';
import { PetInfoModule } from './petInfo/petInfo.module';
import { ProductModule } from './products/products.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    ProductModule,
    LoginModule,
    PetInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
