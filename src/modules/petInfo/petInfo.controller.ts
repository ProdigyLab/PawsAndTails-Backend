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
import { UpdatePetInfoDto } from './dto/update-petInfo.dto';
import { CreatePetInfoDto } from './dto/create-pet.dto';
import { PetInfoService } from './petInfo.service';
import { Request, Response } from 'express';
import { SUCCESS } from 'src/shared/constants/httpCodes';
import { success } from 'src/helpers/http';
// import { response } from 'express';

@Controller('petInfo')
export class PetInfoController {
  constructor(private readonly petInfoService: PetInfoService) {}

  @Post()
  async create(
    @Body() CreatePetInfoDto: CreatePetInfoDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const data: any = await this.petInfoService.create(CreatePetInfoDto);
      return response.status(200).json({
        statusCode: 200,
        message: 'PetInfo Successfully Created',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    // return this.usersService.findAll();
    try {
      const data: any = await this.petInfoService.findAll();
      return response.status(SUCCESS).json(success(data));
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        error: 'An error occurred while retrieving pet information',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    try {
      const data: any = await this.petInfoService.findOne(+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePetInfoDto,
  ) {
    try {
      const data: any = await this.petInfoService.update(+id, updateUserDto);
      return { message: 'Updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data: any = await this.petInfoService.remove(+id);
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
