import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInfo } from 'src/login/entities/login.entity';
import { UserInfo } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, LoginInfo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'aweacawerqwe',
      signOptions: { expiresIn: '15d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, PassportModule, JwtModule],
})
export class UsersModule {}
