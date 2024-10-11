import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // Import bcrypt module
import { LoginInfo } from 'src/login/entities/login.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(strEmail: string) {
    try {
      const userInfo = await this.userInfoRepository.findOneBy({ strEmail });
      return userInfo;
    } catch (error) {
      return error.response;
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const userEmailExists = await this.findByEmail(createUserDto.strEmail);
      if (userEmailExists) {
        throw new InternalServerErrorException('User already exists');
      }
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
        userName: userInfo.strUserName,
        firstName: userInfo.strFirstName,
        lastName: userInfo.strLastName,
        email: userInfo.strEmail,
        intId: userInfo.intId,
        roleId: userInfo.intRoleId,
        organizationId: userInfo.intOrganizationId,
      };

      const accessTokenExpiry = '1h';
      const refreshTokenExpiry = '30d';

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: accessTokenExpiry,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: refreshTokenExpiry,
      });

      const currentDate = new Date();
      const accessTokenExpiryDate = new Date(
        currentDate.getTime() + 60 * 60 * 1000,
      ); // 1 hour
      const refreshTokenExpiryDate = new Date(
        currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
      ); //

      const login = await this.loginInfoRepository.save({
        strUserName: userInfo.strUserName,
        strEmail: userInfo.strEmail,
        strPassword: hashedPassword,
        strPhone: userInfo.strPhone,
        strAccess_token: accessToken,
        strRefresh_token: refreshToken,
        dteAccessTokenExpiry: accessTokenExpiryDate,
        dteRefreshTokenExpiry: refreshTokenExpiryDate,
        dteCreatedAt: new Date(),
        dteLastLoginAt: new Date(),
      });
      return login;
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
