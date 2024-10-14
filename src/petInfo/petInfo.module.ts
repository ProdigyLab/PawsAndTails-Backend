import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetInfoService } from './petInfo.service';
import { PetInfo } from './entities/petInfo.entity';
import { PetInfoController } from './petInfo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetInfo]), AuthModule],
  controllers: [PetInfoController],
  providers: [PetInfoService],
})
export class PetInfoModule {}
