export class CreateProductDto {
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
