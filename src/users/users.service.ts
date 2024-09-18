import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user.entity';
import { LoginInfo } from 'src/login/entities/login.entity';
import * as bcrypt from 'bcrypt'; // Import bcrypt module
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const password: any = createUserDto.strPassword;
      const salt: any = await bcrypt.genSalt(10);
      const hashedPassword: any = await bcrypt.hash(password, salt);
      createUserDto = {
        ...createUserDto,
        strPassword: hashedPassword,
      };
      const userInfo = await this.userInfoRepository.save(createUserDto);
      if (!userInfo)
        throw new NotFoundException(
          'User can not be created. Please try again',
        );
      const payload = {
        email: userInfo.strEmail,
        intId: userInfo.intId,
        roleId: userInfo.intRoleId,
        organizationId: userInfo.intOrganizationId,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      });
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      await this.userInfoRepository.update(userInfo.intId, {
        strRefresh_token: refreshToken,
      });
      // console.log('strRefresh_token', strRefresh_token);

      await this.loginInfoRepository.save({
        strUserName: userInfo.strUserName,
        strEmail: userInfo.strEmail,
        strPassword: hashedPassword,
        strPhone: userInfo.strPhone,
        strAccess_token: accessToken,
        strRefresh_token: refreshToken,
        dteCreatedAt: new Date(),
        dteLastLoginAt: new Date(),
      });

      return { user: userInfo, refreshToken, accessToken };
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

  async update(id: number, updateUserDto: UpdateUserDto) {
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
