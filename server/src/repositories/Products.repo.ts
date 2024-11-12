import * as Contracts from '@contracts/repositories/Products.repo'
import { IProduct } from '@interfaces/Product';
import { ProductModel } from '@database/products.db'


export class ProductRepository {
 static async createProduct: (data: Contracts.CreateProducts) => {
    const result = await ProductModel.create({
        name: data.name,
    })
  
 }
}