import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetInfoService } from './petInfo.service';
import { PetInfo } from './entities/petInfo.entity';
import { PetInfoController } from './petInfo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PetInfo])],
  controllers: [PetInfoController],
  providers: [PetInfoService],
})
export class PetInfoModule {}
