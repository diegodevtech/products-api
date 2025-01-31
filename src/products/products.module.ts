import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminProductsController } from './admin/admin-products.controller';
import { AdminProductsService } from './admin/admin-products.service';
import { ProductsController } from './public/products.controller';
import { ProductsService } from './public/product.service';

@Module({
  controllers: [AdminProductsController, ProductsController],
  providers: [AdminProductsService, ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private productsService: AdminProductsService,
  ) {}

  async onModuleInit() {
    const products = new Array(10).fill(0).map((_, index) => index + 1);

    await this.prismaService.product.deleteMany(); //development only

    for (const productIndex of products) {
      await this.productsService.create({
        name: `Product ${productIndex}`,
        slug: `product-${productIndex}`,
        description: `Description of product ${productIndex}`,
        price: productIndex * 100,
      });
    }
  }
}
