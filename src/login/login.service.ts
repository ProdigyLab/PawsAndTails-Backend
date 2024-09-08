import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-loginUser.dto';
import { UpdateLoginDto } from './dto/update-loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInfo } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
  ) {}
  async create(CreateLoginDto: CreateLoginDto) {
    try {
      // const userInfo = await this.loginInfoRepository.save(CreateLoginDto);
      const userInfo = await this.loginInfoRepository.find({
        where: {
          strEmail: CreateLoginDto.strEmail,
          strPassword: CreateLoginDto.strPassword,
        },
      });
      if (!userInfo || userInfo.length === 0) {
        throw new NotFoundException(
          `User not found with this ${CreateLoginDto.strEmail}. Please try again`,
        );
      }
      return userInfo;
    } catch (error) {
      return error.response;
    }
  }

  async findAll() {
    try {
      const userInfo = await this.loginInfoRepository.find();
      if (userInfo.length === 0) throw new NotFoundException('User not found');

      return userInfo;
    } catch (error) {
      return error.response;
    }
  }

  async findOne(id: number) {
    try {
      const userInfo = await this.loginInfoRepository.findOneBy({ intId: id });
      if (userInfo === null) throw new NotFoundException('User not found');

      return {
        statusCode: 200,
        data: userInfo,
      };
    } catch (error) {
      return error.response;
    }
  }

  async update(id: number, UpdateLoginDto: UpdateLoginDto) {
    // return `This action updates a #${id} user`;
    try {
      const userInfo = await this.loginInfoRepository.findOneBy({ intId: id });
      if (!userInfo) throw new NotFoundException('User not found');

      const info = await this.loginInfoRepository.update(id, UpdateLoginDto);
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
      const userInfo = await this.loginInfoRepository.findOneBy({ intId: id });
      if (!userInfo) throw new NotFoundException('User not found');

      const info = await this.loginInfoRepository.delete(id);
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
