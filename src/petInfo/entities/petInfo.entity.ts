import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tblPetInfo')
export class PetInfo {
  @PrimaryGeneratedColumn()
  intId: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  intPetInfoId: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strPetName: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  strPetSize: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, default: '' })
  strImageURL: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  strPetColor: string;
  @Column({ type: 'varchar', length: 1024, nullable: true })
  strPetFood: string;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dteCreatedAt: Date;

}
