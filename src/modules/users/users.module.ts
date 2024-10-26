import { forwardRef, Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { LoginInfo } from 'src/login/entities/login.entity';
// import { UserInfo } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/_entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UserRepository, UsersService],
})
export class UsersModule {}
