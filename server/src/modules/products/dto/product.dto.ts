import { IsBase64Image } from '@shared/decorators/Validator'
import { imageBase64 } from '@shared/data/imageBase64'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  IsInt,
  Min,
  IsOptional,
  IsArray,
  IsMongoId,
  IsBoolean
} from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ example: 'Producto 1', description: 'Nombre del producto' })
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string

  @ApiProperty({
    example: 1,
    description: 'Descripción del producto',
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número entero o con 2 decimales' })
  @Min(1, { message: 'El precio debe ser mayor a 0' })
  price: number

  @ApiProperty({
    example: true,
    description: 'Estado del producto',
  })
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  status: boolean

  @ApiProperty({
    example: 'Descripción del producto',
    description: 'Descripción del producto',
  })
  @IsString({ message: 'La descripción debe ser un string' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  description: string

  @ApiProperty({
    example: 'Código del producto',
    description: 'Código del producto',
  })
  @IsString({ message: 'El codigo debe ser un string' })
  @IsNotEmpty({ message: 'El codigo no puede estar vacío' })
  code: string

  @ApiProperty({ example: 1, description: 'Unidades por paquete' })
  @IsNumber({}, { message: 'Las unidades por paquete debe ser un número' })
  @IsInt()
  @Min(1, { message: 'Las unidades por paquete debe ser mayor a 0' })
  unitsPerPack: number

  @ApiProperty({ example: [imageBase64], description: 'Imagen del producto'})
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El nombre de la categoria debe ser un string' })
  @IsNotEmpty({ message: 'El nombre de la categoria no puede estar vacío' })
  categoryName?: string


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El id de la categoria debe ser un string' })
  @IsMongoId({ message: 'El id de la categoria debe ser valido' })
  categoryId?: string


}

export class UpdateProductDto{
  @ApiProperty({ example: 'Producto 1', description: 'Nombre del producto' })
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @IsOptional()
  name?: string

  @ApiProperty({
    example: 1,
    description: 'Descripción del producto',
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número entero o con 2 decimales' })
  @Min(1, { message: 'El precio debe ser mayor a 0' })
  @IsOptional()
  price?: number

  @ApiProperty({
    example: true,
    description: 'Estado del producto',
  })
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @IsOptional()
  status?: boolean

  @ApiProperty({
    example: 'Descripción del producto',
    description: 'Descripción del producto',
  })
  @IsString({ message: 'La descripción debe ser un string' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @IsOptional()
  description?: string

  @ApiProperty({
    example: 'Código del producto',
    description: 'Código del producto',
  })
  @IsString({ message: 'El codigo debe ser un string' })
  @IsNotEmpty({ message: 'El codigo no puede estar vacío' })
  @IsOptional()
  code?: string

  @ApiProperty({ example: 1, description: 'Unidades por paquete' })
  @IsNumber({}, { message: 'Las unidades por paquete debe ser un número' })
  @IsInt()
  @IsOptional()
  @Min(1, { message: 'Las unidades por paquete debe ser mayor a 0' })
  unitsPerPack?: number

  @ApiProperty({ example: [imageBase64], description: 'Imagen del producto'})
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ example: "00000000000000", description: 'ID del producto'})
  @IsOptional()
  @IsArray()
  imagesToDelete?: string[];

  @ApiProperty({ example: [imageBase64], description: 'Imagen del producto'})
  @IsOptional()
  @IsArray()
  imagesToAdd?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El nombre de la categoria debe ser un string' })
  @IsNotEmpty({ message: 'El nombre de la categoria no puede estar vacío' })
  categoryName?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El id de la categoria debe ser un string' })
  @IsMongoId({ message: 'El id de la categoria debe ser valido' })
  categoryId?: string
}


export class UploadProductImageDto {
  @ApiProperty({ example: imageBase64, description: 'Imagen del producto' })
  @IsString({ message: 'La imagen debe ser un string' })
  @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
  @IsBase64Image({ message: 'La imagen debe ser base64' })
  image: string
}