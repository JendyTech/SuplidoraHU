import { PAGINATION } from '@messages/General.json'
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationDTO {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber({}, { message: PAGINATION.PAGE_NUMBER })
  @IsOptional()
  @Transform(({ value }) => {
    const number = parseInt(value)
    return isNaN(number) ? 1 : number === 0 ? 1 : number
  })
  page: number = 1

  @ApiProperty({ required: false, default: 10 })
  @IsNumber({}, { message: PAGINATION.MAX_NUMBER })
  @IsOptional()
  @Transform(({ value }) => {
    const number = parseInt(value)
    return isNaN(number) ? 1 : number === 0 ? 1 : number
  })
  max: number = 10

  @ApiProperty({ required: false })
  @IsString({ message: PAGINATION.SEARCH_STRING })
  @IsOptional()
  search?: string

  @ApiProperty({ required: false })
  @IsString({ message: PAGINATION.START_DATE })
  @IsOptional()
  @IsDateString({}, { message: PAGINATION.START_DATE })
  startDate?: string

  @ApiProperty({ required: false })
  @IsString({ message: PAGINATION.END_DATE })
  @IsOptional()
  @IsDateString({}, { message: PAGINATION.END_DATE })
  endDate?: string
}
