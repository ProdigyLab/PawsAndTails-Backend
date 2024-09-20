import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInfo } from './entities/login.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginInfo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'y878yux', // Use a secure secret key
      signOptions: { expiresIn: '1h' }, // Default options
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtService, JwtModule, PassportModule],
  exports: [JwtModule, LoginService],
})
export class LoginModule {}
