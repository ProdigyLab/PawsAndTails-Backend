import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfo } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfo])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
