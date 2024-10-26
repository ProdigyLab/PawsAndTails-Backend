import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenValidationGuard } from '../../guards/token-validation.guard';
import { User } from '../../_entities/user.entity';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
}
@Controller('user')
@UseGuards(TokenValidationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUserStart(): string {
    console.log('get request from User here');
    return 'User start from here';
  }

  @Get(':email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<User | undefined> {
    return this.usersService.findByEmail(email);
  }

  @Get('user-details/:id')
  async getUserById(
    @Param('id') id: number,
  ): Promise<ApiResponse<Partial<User>>> {
    console.log('get request', id);
    try {
      const user = await this.usersService.findUserById(id);
      if (!user) {
        return {
          statusCode: 404,
          message: 'User not found',
          data: null,
        };
      }
      // Return only specific fields
      const {
        name,
        phone,
        email,
        image,
        birthDayDate,
        homeAddress,
        homeAddressLocationLink,
        officeAddress,
        officeAddressLocationLink,
        createdAt,
        updatedAt,
      } = user;
      return {
        statusCode: 200,
        message: 'User details retrieved successfully',
        data: {
          name,
          phone,
          email,
          image,
          birthDayDate,
          homeAddress,
          homeAddressLocationLink,
          officeAddress,
          officeAddressLocationLink,
          createdAt,
          updatedAt,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Put('user-details/update/:id')
  @HttpCode(200)
  async updateUser(
    @Param('id') id: number,
    @Body()
    updateData: {
      name: string;
      phone: string | null;
      email: string;
      image: string | null;
      birthDayDate: Date | null;
      homeAddress: string | null;
      homeAddressLocationLink: string | null;
      officeAddress: string | null;
      officeAddressLocationLink: string | null;
      createdAt: string;
      updatedAt: string;
    },
  ): Promise<ApiResponse<Partial<User>>> {
    try {
      const updatedUser = await this.usersService.updateUserDetails(
        id,
        updateData,
      );
      if (!updatedUser) {
        return { statusCode: 404, message: 'User not found', data: null };
      }
      return {
        statusCode: 200,
        message: 'Information Updated Successfully',
        data: {
          name: updatedUser.name,
          phone: updatedUser.phone,
          email: updatedUser?.email,
          image: updatedUser?.image,
          birthDayDate: updatedUser?.birthDayDate,
          homeAddress: updatedUser?.homeAddress,
          homeAddressLocationLink: updatedUser?.homeAddressLocationLink,
          officeAddress: updatedUser?.officeAddress,
          officeAddressLocationLink: updatedUser?.officeAddressLocationLink,
          createdAt: updatedUser?.createdAt,
          updatedAt: updatedUser?.updatedAt,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error Updating Data',
        data: null,
      };
    }
  }

  // @Post('create')
  // async create(
  //   @Body() createUserDto: CreateUserDto,
  //   @Req() request: Request,
  //   @Res() response: Response,
  // ) {
  //   try {
  //     const data: any = await this.usersService.create(createUserDto);
  //     return response.status(200).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // @Get()
  // async findAll() {
  //   // return this.usersService.findAll();
  //   try {
  //     const data: any = await this.usersService.findAll();
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   // return this.usersService.findOne(+id);
  //   try {
  //     const data: any = await this.usersService.findOne(+id);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   try {
  //     const data: any = await this.usersService.update(+id, updateUserDto);
  //     return { message: 'Updated successfully' };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     const data: any = await this.usersService.remove(+id);
  //     return { message: 'Deleted successfully' };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
