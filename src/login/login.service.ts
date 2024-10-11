import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateLoginDto } from './dto/update-loginUser.dto';
import { LoginInfo } from './entities/login.entity';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
    private readonly jwtService: JwtService,
  ) {}

  async login(strEmail: string, strPassword: string) {
    try {
      let existingUser: any = await this.loginInfoRepository.findOne({
        where: { strEmail: strEmail },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `User not found with this ${strEmail}. Please try again`,
        );
      }

      const isPasswordValid = await bcrypt.compare(
        strPassword,
        existingUser.strPassword,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Invalid credentials. Please try again.',
        );
      }

      const payload = {
        email: existingUser.strEmail,
        intId: existingUser.intId,
        roleId: existingUser.intRoleId,
        organizationId: existingUser.intOrganizationId,
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
      ); // 30 days

      existingUser = {
        ...existingUser,
        strAccess_token: accessToken,
        strRefresh_token: refreshToken,
        dteAccessTokenExpiry: accessTokenExpiryDate,
        dteRefreshTokenExpiry: refreshTokenExpiryDate,
        dteLastLoginAt: new Date(),
      };
      const loginUser = await this.loginInfoRepository.save(existingUser);
      return loginUser;
    } catch (error) {
      throw error;
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
