import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { AuthModule } from '@modules/auth/auth.module'
import { AuthGuard } from '@shared/guards/session'
import { APP_GUARD } from '@nestjs/core'
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { TaxModule } from './modules/tax/tax.module';

@Module({
  imports: [AuthModule, ProductsModule, UsersModule, InvoicesModule, TaxModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
