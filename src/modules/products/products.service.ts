import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInfo } from './entities/products.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductInfo)
    private userInfoRepository: Repository<ProductInfo>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const userInfo = await this.userInfoRepository.save(createProductDto);
      if (!userInfo)
        throw new NotFoundException(
          'User can not be created. Please try again',
        );

      return userInfo;
    } catch (error) {
      return error.response;
    }
  }

  async findAll() {
    try {
      const userInfo = await this.userInfoRepository.find();
      if (userInfo.length === 0) throw new NotFoundException('User not found');

      return userInfo;
    } catch (error) {
      return error.response;
    }
  }

  async findOne(id: number) {
    try {
      const userInfo = await this.userInfoRepository.findOneBy({ intId: id });
      if (userInfo === null) throw new NotFoundException('User not found');

      return {
        statusCode: 200,
        data: userInfo,
      };
    } catch (error) {
      return error.response;
    }
  }

  async update(id: number, updateUserDto: UpdateProductDto) {
    // return `This action updates a #${id} user`;
    try {
      const userInfo = await this.userInfoRepository.findOneBy({ intId: id });
      if (!userInfo) throw new NotFoundException('User not found');

      const info = await this.userInfoRepository.update(id, updateUserDto);
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
      const userInfo = await this.userInfoRepository.findOneBy({ intId: id });
      if (!userInfo) throw new NotFoundException('User not found');

      const info = await this.userInfoRepository.delete(id);
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
