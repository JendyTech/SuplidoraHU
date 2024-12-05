import { TaxService } from './tax.service';
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { User } from '@shared/decorators/Session'
import { IUser } from '@interfaces/User'
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
import { CreateTaxesDto } from '@modules/tax/dto/tax.dto';

@Controller('/api/tax')
export class TaxController {
    constructor(private readonly taxService: TaxService) { }

    @Get('/')
    getTaxes(@Query() dto: PaginationDTO) {
        return this.taxService.getTaxes(dto)
    }

    @Get('/:id')
    getTaxById(@Param('id') id: string) {
        return this.taxService.getTaxById(id)
    }

    @Post('/')
    createTax(@Body() dto: CreateTaxesDto, @User() user: IUser) {
        return this.taxService.createTax(dto, user)
    }

    @Delete('/:id')
    deleteTax(@Param('id') id: string) {
        return this.taxService.deleteTax(id)
    }

    @Patch('/:id')
    updateTax(
        @Param('id') id: string, 
        @Body() dto: CreateTaxesDto, 
        @User() user: IUser
    ) {
        return this.taxService.updateTax(dto, id, user)
    }
}
