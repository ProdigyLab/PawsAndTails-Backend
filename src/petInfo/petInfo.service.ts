import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetInfoDto } from './dto/create-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePetInfoDto } from './dto/update-petInfo.dto';
import { PetInfo } from './entities/petInfo.entity';

@Injectable()
export class PetInfoService {
  constructor(
    @InjectRepository(PetInfo)
    private petInfoRepository: Repository<PetInfo>,
  ) {}
  async create(createPetInfoDto: CreatePetInfoDto) {
    try {
      const petInfos = await this.petInfoRepository.save(createPetInfoDto);
      if (!petInfos)
        throw new NotFoundException(
          'User can not be created. Please try again',
        );

      return petInfos;
    } catch (error) {
      return error.response;
    }
  }

  async findAll() {
    try {
      const petInfos = await this.petInfoRepository.find();
      if (petInfos.length === 0) throw new NotFoundException('User not found');

      return petInfos;
    } catch (error) {
      return error.response;
    }
  }

  async findOne(id: number) {
    try {
      const petInfos = await this.petInfoRepository.findOneBy({ intId: id });
      if (petInfos === null) throw new NotFoundException('User not found');

      return {
        statusCode: 200,
        data: petInfos,
      };
    } catch (error) {
      return error.response;
    }
  }

  async update(id: number, updateUserDto: UpdatePetInfoDto) {
    // return `This action updates a #${id} user`;
    try {
      const petInfos = await this.petInfoRepository.findOneBy({ intId: id });
      if (!petInfos) throw new NotFoundException('User not found');

      const info = await this.petInfoRepository.update(id, updateUserDto);
      if (!info)
        throw new NotFoundException(
          'User can not be updated. Please try again',
        );

      return info;
    } catch (error) {
      return error.response;
    }
  }

  async remove(id: number) {
    try {
      const petInfos = await this.petInfoRepository.findOneBy({ intId: id });
      if (!petInfos) throw new NotFoundException('User not found');

      const info = await this.petInfoRepository.delete(id);
      if (!info)
        throw new NotFoundException(
          'User can not be deleted. Please try again',
        );

      return info;
    } catch (error) {
      return error.response;
    }
  }
}
