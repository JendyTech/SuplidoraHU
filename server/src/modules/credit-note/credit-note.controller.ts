import { Controller, Query, Get, Post, Body, Param } from '@nestjs/common'
import { CreditNoteService } from '@modules/credit-note/credit-note.service'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { CreateCreditNotesDto } from '@modules/credit-note/dto/creditnote.dto'
import { User } from '@shared/decorators/Session'
import { IUser } from '@interfaces/User'

@Controller('/api/credit-notes')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) {}

  @Get('/')
  getCreditNotes(@Query() dto: PaginationDTO) {
    return this.creditNoteService.getCreditNotes(dto)
  }

  @Get('/:id')
  getCreditNoteById(@Param('id') id: string, @Query('items') items: boolean = false) {
    return this.creditNoteService.getCreditNoteById(id, String(items) === 'true')
  }

  @Post('/')
  createCreditNotes(@Body() dto: CreateCreditNotesDto, @User() user: IUser) {
    return this.creditNoteService.createCreditNote(dto, user)
  }
}
