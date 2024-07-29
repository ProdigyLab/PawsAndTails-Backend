export class CreateLoginDto {
  readonly strUserName: string;
  readonly strPassword: string;
  readonly strEmail: string;
  readonly strPhone: string;
  readonly dteCreatedAt: Date;
  readonly dteLastLoginAt: Date;
}
