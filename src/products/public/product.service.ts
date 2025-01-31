import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllProductsDto } from './dto/find-all-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  findAll(findAllDto: FindAllProductsDto) {
    const { name, page = 1, limit = 15 } = findAllDto;
    return this.prismaService.product.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string) {
    const product = await this.prismaService.product.findFirst({
      where: { slug },
    });
    if (!product) {
      throw new NotFoundError('Product', slug, ' slug');
    }

    return product;
  }
}
