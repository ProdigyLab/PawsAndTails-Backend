import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user.entity';
import { LoginInfo } from 'src/login/entities/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, LoginInfo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
