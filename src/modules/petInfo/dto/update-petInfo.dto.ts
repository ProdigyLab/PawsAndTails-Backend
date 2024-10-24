import { PartialType } from '@nestjs/mapped-types';
import { CreatePetInfoDto } from './create-pet.dto';

export class UpdatePetInfoDto extends PartialType(CreatePetInfoDto) {
  readonly strPetName: string;
  readonly strPetSize: string;
  readonly strImageURL: string;
  readonly strPetColor: string;
  readonly strPetFood: string;
  readonly strPetDesc: string;
  readonly dteCreatedAt: Date;
}
