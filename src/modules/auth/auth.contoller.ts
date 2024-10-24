// auth.controller,ts
import {
  Controller,
  Post,
  Body,
  ConflictException,
  BadRequestException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RolesGuard } from './jwt/roles.guard';
import { Roles } from './jwt/roles.decorator';
