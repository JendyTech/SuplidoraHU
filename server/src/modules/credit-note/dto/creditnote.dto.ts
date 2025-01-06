import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, IsDateString, IsMongoId, IsOptional, IsArray, ArrayNotEmpty, Min, IsInt } from 'class-validator';

export class CreateCreditNotesItemDto {
    @ApiProperty({ example: '60d9b7e1b5f0c9a4b4e1f1b0', description: 'Id del producto' })
    @IsMongoId({ message: 'El id del producto debe ser un ObjectId' })
    @IsNotEmpty({ message: 'El id del producto no puede estar vacío' })
    productId: string;

    @ApiProperty({ example: 5, description: 'Cantidad de productos' })
    @IsInt()
    @Min(1, { message: 'La cantidad de productos no puede estar vacía' })
    quantity: number;
}

export class CreateCreditNotesDto {
    @ApiProperty({ example: 'Razón de la nota de crédito', description: 'Razón de la nota de crédito' })
    @IsString({ message: 'La razón de la nota de crédito debe ser un string' })
    @IsOptional()
    reason: string;

    @ApiProperty({ example: '60d9b7e1b5f0c9a4b4e1f1b0', description: 'ID de la factura' })
    @IsMongoId({ message: 'El id de la factura debe ser un ObjectId' })
    @IsNotEmpty({ message: 'El id de la factura no puede estar vacío' })
    invoiceId: string; 

    @ApiProperty({ example: '26525256256325265', description: 'Número de la factura (NCF)' })
    @IsString({ message: 'El NCF debe ser un string' })
    @IsOptional()
    ncfNumber: string; 

    @ApiProperty({ example: 'B02147154745', description: 'RNC de la factura' })
    @IsString({ message: 'El RNC debe ser un string' })
    @IsOptional() 
    rncNumber: string; 

    @ApiProperty({ example: '2021-05-25', description: 'Fecha de expiración de la nota de crédito' })
    @IsDateString()
    @IsOptional() 
    expirationDate: Date; 

    @ApiProperty({ example: 'FA-0001', description: 'Número de la factura afectada (NCF)' })
    @IsString({ message: 'El número de la factura afectada debe ser un string' })
    @IsOptional() 
    affectedInvoice: string; 

    @ApiProperty({ example: 'Cliente 1', description: 'Nombre del cliente' })
    @IsString({ message: 'El nombre del cliente debe ser un string' })
    @IsOptional() 
    clientName: string; 

    @ApiProperty({ example: 'B12141414852', description: 'RNC del cliente' })
    @IsString({ message: 'El RNC del cliente debe ser un string' })
    @IsOptional() 
    clientRnc: string;

    @ApiProperty({ example: 'Contado', description: 'Condición de pago' })
    @IsString({ message: 'La condición de pago debe ser un string' })
    @IsOptional() 
    paymentCondition: string; 

    @ApiProperty({ example: 'Proveedor 1', description: 'Nombre del proveedor' })
    @IsString({ message: 'El nombre del proveedor debe ser un string' })
    @IsOptional() 
    supplierName: string;

    @ApiProperty({
        default: [
            { productId: '64b4f7e2d6e44b239f4cfc12', quantity: 2 }
        ],
        description: 'Items de la nota de crédito',
    })
    @IsArray({ message: 'Los items deben ser un array' })
    @ArrayNotEmpty({ message: 'Los items no pueden estar vacíos' })
    @Type(() => CreateCreditNotesItemDto)
    items: CreateCreditNotesItemDto[]; 
}
