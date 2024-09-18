import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './database/dbconfigue';
import { ProductModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { PetInfoModule } from './petInfo/petInfo.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    ProductModule,
    LoginModule,
    PetInfoModule,
    AuthModule,
    JwtModule.register({
      secret: `${process.env.jwt_secret_key}`, // Use a secure secret key
      signOptions: { expiresIn: '1h' }, // Default options
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
