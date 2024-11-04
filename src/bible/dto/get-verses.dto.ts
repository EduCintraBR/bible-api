import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetVersesDto {
    @ApiProperty({ description: 'ID do livro', example: 1 })
    @Type(() => Number)
    @IsInt({ message: 'O parâmetro "bookId" deve ser um número inteiro.' })
    @Min(1, { message: 'O parâmetro "bookId" deve ser maior ou igual a 1.' })
    bookId: number;
  
    @ApiProperty({ description: 'Número do capítulo', example: 1 })
    @Type(() => Number)
    @IsInt({ message: 'O parâmetro "chapter" deve ser um número inteiro.' })
    @Min(1, { message: 'O parâmetro "chapter" deve ser maior ou igual a 1.' })
    chapter: number;
  }
  