import { Controller, Param, Query, Get } from '@nestjs/common'
import { CatalogService } from '@modules/catalog/catalog.service'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { IsPublic } from '@shared/decorators/isPublic'
import { CatalogPaginationDTO } from '@shared/dto/CatalogPagination.dto'

@Controller('/api/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('/')
  @IsPublic()
  getCatalog(@Query() dto: CatalogPaginationDTO) {
    return this.catalogService.getCatalog(dto)
  }

  @Get('/:slug')
  @IsPublic()
  getCatalogBySlug(@Param('slug') slug: string) {
    return this.catalogService.getCatalogBySlug(slug)
  }
}
