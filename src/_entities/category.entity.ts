// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products.entity';
import { SubCategory } from './subcategory.entity';

@Entity('tblCategory')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
