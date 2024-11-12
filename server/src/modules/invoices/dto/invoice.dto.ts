import { ApiProperty } from '@nestjs/swagger'
import {
    IsString,
    IsNotEmpty,
    MinLength,
    IsDate,
} from 'class-validator'

export class CreateInvoiceDto {
    @ApiProperty({ example: 'Factura 1', description: 'Nombre de la factura' })
    @IsString({ message: 'El NCF debe ser un string' })
    @IsNotEmpty({ message: 'El NCF no puede estar vacío' })
    @MinLength(11, { message: 'El NCF debe tener al menos 11 caracteres' })
    ncfNumber: string

    @ApiProperty({ example: 'RNC 1', description: 'RNC de la factura' })
    @IsString({ message: 'El RNC debe ser un string' })
    @IsNotEmpty({ message: 'El RNC no puede estar vacío' })
    @MinLength(9, { message: 'El RNC debe tener al menos 9 digitos' })
    rncNumber: string

    @ApiProperty({ example: '2021-10-10', description: 'Fecha de expiración de la factura' })
    @IsDate ({ message: 'La fecha de expiración debe ser una fecha' })
    expirationDate: Date

    @ApiProperty({ example: 'Cliente 1', description: 'Nombre del cliente' })
    @IsString({ message: 'El nombre del cliente debe ser un string' })
    @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacío' })
    clientName: string

    @ApiProperty({ example: 'RNC 2', description: 'RNC del cliente' })
    @IsString({ message: 'El RNC del cliente debe ser un string' })
    @IsNotEmpty({ message: 'El RNC del cliente no puede estar vacío' })
    @MinLength(9, { message: 'El RNC del cliente debe tener al menos 9 digitos' })
    clientRnc: string

    @ApiProperty({ example: 'Contado', description: 'Condición de pago' })
    @IsString({ message: 'La condición de pago debe ser un string' })
    @IsNotEmpty({ message: 'La condición de pago no puede estar vacía' })
    paymentCondition: string

    @ApiProperty({ example: 'Proveedor 1', description: 'Nombre del proveedor' })
    @IsString({ message: 'El nombre del proveedor debe ser un string' })
    @IsNotEmpty({ message: 'El nombre del proveedor no puede estar vacío' })
    supplierName: string

}