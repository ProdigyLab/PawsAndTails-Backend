import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tblProductInfo')
export class ProductInfo {
  @PrimaryGeneratedColumn()
  intId: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  intProductId: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strProductName: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strUuid: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  strProductCode: string;

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
  dteExpiryAt: Date;

  @Column({ type: 'boolean', default: true })
  blnIsAvailable: boolean;

  @Column({ type: 'int', nullable: false })
  intOrganizationId: number;
}
