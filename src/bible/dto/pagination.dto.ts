import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Número da página', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O parâmetro "page" deve ser um número inteiro.' })
  @Min(1, { message: 'O valor mínimo para "page" é 1.' })
  page: number = 1;

  @ApiPropertyOptional({ description: 'Itens por página', example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O parâmetro "limit" deve ser um número inteiro.' })
  @Min(1, { message: 'O valor mínimo para "limit" é 1.' })
  @Max(100, { message: 'O valor máximo para "limit" é 100.' })
  limit: number = 20;
}