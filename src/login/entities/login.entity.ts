import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tblLoginInfo')
export class LoginInfo {
  @PrimaryGeneratedColumn()
  intId: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strUserName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  strEmail: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strPassword: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strPhone: string;

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
}
