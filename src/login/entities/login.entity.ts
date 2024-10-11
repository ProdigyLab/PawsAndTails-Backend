import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tblLoginInfo')
export class LoginInfo {
  @PrimaryGeneratedColumn()
  intId: number;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  strEmail: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strPassword: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strPhone: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strAccess_token: string;
  @Column({ type: 'varchar', length: 512, nullable: true })
  strRefresh_token: string;

  @Column({ type: 'timestamp', nullable: true })
  dteAccessTokenExpiry: Date;

  @Column({ type: 'timestamp', nullable: true })
  dteRefreshTokenExpiry: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dteCreatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dteLastLoginAt: Date;
}
