import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user.entity';
import { LoginInfo } from 'src/login/entities/login.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, LoginInfo]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
