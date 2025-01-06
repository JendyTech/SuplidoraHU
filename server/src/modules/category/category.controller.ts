import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from '@modules/category/category.service';
import { PaginationDTO } from '@shared/dto/Pagination.dto';

@Controller('api/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get('/')
    getCategories(@Query() dto: PaginationDTO) {
        return this.categoryService.getCategories(dto)
    }

    @Get('/:id')
    getCategoryById(@Param('id') id: string) {
        return this.categoryService.getCategoryById(id)
    }
}
