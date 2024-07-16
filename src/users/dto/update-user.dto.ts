import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly strUserName: string;
  readonly intRoleId: number;
  readonly strPassword: string;
  readonly strFirstName: string;
  readonly strLastName: string;
  readonly strEmail: string;
  readonly strPhone: string;
  readonly strImageURL: string;
  readonly dteCreatedAt: Date;
  readonly dteLastLoginAt: Date;
  readonly blnIsActive: boolean;
  readonly intOrganizationId: number;
}
