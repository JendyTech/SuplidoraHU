import { Injectable } from '@nestjs/common'
import { data } from '@/database/data'

@Injectable()
export class ProductsService {
  getProducts() {
    return data
  }
}
