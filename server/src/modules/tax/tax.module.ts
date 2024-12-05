import { Module } from '@nestjs/common';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';

@Module({
  exports: [TaxService],
  controllers: [TaxController],
  providers: [TaxService]
})
export class TaxModule {}
