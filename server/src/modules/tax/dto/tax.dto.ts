import { ApiProperty } from '@nestjs/swagger'
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsInt,
    Min,
    IsBoolean,
} from 'class-validator'



export class CreateTaxesDto {
    @ApiProperty({ example: 'IVA', description: 'Nombre del impuesto' })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string

    @ApiProperty({ example: 0.16, description: 'Tasa del impuesto', })
    @IsNumber({}, { message: 'La tasa debe ser un número' })
    @Min(0, { message: 'La tasa debe ser mayor a 0' })
    @IsInt()
    rate: number

    @ApiProperty({ example: 16, description: 'Monto del impuesto' })
    @IsNumber({}, { message: 'El monto debe ser un número' })
    amount: number

    @ApiProperty({ example: false, description: '¿Está exento?' })
    @IsBoolean({ message: 'El campo debe ser un booleano' })
    isExempt?: boolean
}