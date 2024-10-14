import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInfo } from './entities/login.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginInfo]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'y878yux', // Use a secure secret key
      signOptions: { expiresIn: '60s' }, // Default options
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService, JwtModule, PassportModule],
})
export class LoginModule {}
