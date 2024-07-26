import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    // return this.usersService.create(createUserDto);
    try {
      const data: any = await this.usersService.create(createUserDto);
      return response.status(200).json({
        statusCode: 200,
        message: 'User Successfully Created',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll() {
    // return this.usersService.findAll();
    try {
      const data: any = await this.usersService.findAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    try {
      const data: any = await this.usersService.findOne(+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data: any = await this.usersService.update(+id, updateUserDto);
      return { message: 'Updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data: any = await this.usersService.remove(+id);
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
