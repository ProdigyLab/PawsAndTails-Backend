import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInfo } from './entities/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginInfo])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
