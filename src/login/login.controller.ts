import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SUCCESS } from 'src/shared/constants/httpCodes';
import { success } from 'src/helpers/http';
import { UpdateLoginDto } from './dto/update-loginUser.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}

  @Post()
  async create(
    @Body('strEmail') strEmail: string,
    @Body('strPassword') strPassword: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result: any = await this.LoginService.login(strEmail, strPassword);
      return response.status(SUCCESS).json(success(result));
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    // return this.usersService.findAll();
    try {
      const data: any = await this.LoginService.findAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    try {
      const data: any = await this.LoginService.findOne(+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateLoginDto) {
    try {
      const data: any = await this.LoginService.update(+id, updateUserDto);
      return { message: 'Updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data: any = await this.LoginService.remove(+id);
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
