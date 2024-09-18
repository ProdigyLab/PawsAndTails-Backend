import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tblUserInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  intId: number;

  @Column({ type: 'int', nullable: true, default: 1 })
  intRoleId: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strUserName: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strFirstName: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strLastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  strEmail: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strPassword: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strPhone: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, default: '' })
  strImageURL: string;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dteCreatedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dteLastLoginAt: Date;

  // @Column({ type: 'boolean', default: true })
  // blnIsActive: boolean;

  @Column({ type: 'int', nullable: true })
  intOrganizationId: number;
  @Column({ type: 'varchar', length: 512, nullable: true })
  strAccess_token: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strRefresh_token: string;
}
