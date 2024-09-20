import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-loginUser.dto';
import { UpdateLoginDto } from './dto/update-loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInfo } from './entities/login.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateRefreshToken(existingUser: any): Promise<string> {
    const oldRefToken = existingUser.strRefresh_token;
    if (!oldRefToken) {
      throw new InternalServerErrorException(
        'Refresh token not found in the existing user.',
      );
    }

    try {
      const decodedRefToken: any = this.jwtService.decode(oldRefToken);

      if (!decodedRefToken) {
        throw new InternalServerErrorException(
          'Invalid refresh token in the decoded token.',
        );
      }

      const { email, intId, password } = decodedRefToken;

      const payload = {
        email: email,
        intId: intId,
        password: password,
        roleId: existingUser.intRoleId,
        organizationId: existingUser.intOrganizationId,
      };

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      });
      await this.loginInfoRepository.update(existingUser.intId, {
        strRefresh_token: refreshToken,
      });

      return refreshToken;
    } catch (error) {
      throw error;
    }
  }

  private async generateAccessToken(existingUser: any): Promise<string> {
    const oldRefToken = existingUser.strRefresh_token;
    if (!oldRefToken) {
      throw new InternalServerErrorException(
        'Refresh token not found to generate Access token',
      );
    }

    try {
      const decodedRefToken: any = this.jwtService.decode(oldRefToken);

      if (!decodedRefToken) {
        throw new InternalServerErrorException(
          'Invalid refresh token in the decoded token.',
        );
      }

      const { email, intId, password } = decodedRefToken;

      const payload = {
        email: email,
        intId: intId,
        password: password,
        roleId: existingUser.intRoleId,
        organizationId: existingUser.intOrganizationId,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      });

      await this.loginInfoRepository.update(existingUser.intId, {
        strAccess_token: accessToken,
        dteLastLoginAt: new Date(),
      });

      return accessToken;
    } catch (error) {
      console.error('Error generating access token:', error);
      throw error;
    }
  }

  async create(strEmail: string, strPassword: string) {
    try {
      // Find the user by email
      const existingUser: any = await this.loginInfoRepository.findOne({
        where: { strEmail: strEmail },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `User not found with this ${strEmail}. Please try again`,
        );
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(
        strPassword,
        existingUser.strPassword,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Invalid credentials. Please try again.',
        );
      }

      const refreshToken = await this.generateRefreshToken(existingUser);
      const accessToken = await this.generateAccessToken(existingUser);
      return {
        success: 200,
        data: {
          name: existingUser.name,
          email: existingUser.strEmail,
          role: existingUser.role,
          organization: existingUser.organization,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        return {
          success: false,
          error: error.message,
        };
      }
      throw new InternalServerErrorException('An error occurred during login.');
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
