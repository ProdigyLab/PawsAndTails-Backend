import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './database/dbconfigue';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
