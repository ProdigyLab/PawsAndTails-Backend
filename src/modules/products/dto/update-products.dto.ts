import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-products.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  readonly strProductName: string;
  readonly intProductId: number;
  readonly strUuid: string;
  readonly strProductCode: string;
  readonly strImageURL: string;
  readonly dteCreatedAt: Date;
  readonly dteExpiryAt: Date;
  readonly blnIsAvailable: boolean;
  readonly intOrganizationId: number;
}
