import { Module } from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';
import { CreditNoteController } from './credit-note.controller';

@Module({
  providers: [CreditNoteService],
  controllers: [CreditNoteController]
})
export class CreditNoteModule {}
