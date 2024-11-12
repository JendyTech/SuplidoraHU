import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsInt,
  Min,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
  @IsInt()
  @Min(1, { message: 'El precio debe ser mayor a 0' })
  price: number

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
}
