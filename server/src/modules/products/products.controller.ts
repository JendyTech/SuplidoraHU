import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { ProductsService } from '@modules/products/products.service'
import { CreateProductDto } from '@modules/products/dto/Product.dto'
import { User } from '@shared/decorators/Session'
import { IUser } from '@interfaces/User'
@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  getProducts(@Query() dto: PaginationDTO) {
    return this.productsService.getProducts(dto)
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id)
  }

  @Post('/')
  createProduct(@Body() dto: CreateProductDto, @User() user: IUser) {
    return this.productsService.createProduct(dto, user)
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id)
  }

  @Patch('/:id')
  updatedProduct(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
    @User() user: IUser,
  ) {
    return this.productsService.updatedProduct(dto, id, user)
  }
}
