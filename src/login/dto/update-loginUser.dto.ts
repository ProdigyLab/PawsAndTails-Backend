import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './create-loginUser.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {
  readonly strUserName: string;
  readonly strPassword: string;
  readonly strEmail: string;
  readonly strPhone: string;
  readonly dteCreatedAt: Date;
  readonly dteLastLoginAt: Date;
}
