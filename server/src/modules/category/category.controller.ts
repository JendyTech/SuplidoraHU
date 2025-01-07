import { Controller, Get, Param, Query } from '@nestjs/common'
import { CategoryService } from '@modules/category/category.service'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { IsPublic } from '@shared/decorators/isPublic'

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @IsPublic()
  @Get('/')
  getCategories(@Query() dto: PaginationDTO) {
    return this.categoryService.getCategories(dto)
  }

  @IsPublic()
  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id)
  }
}
