import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { BibleService } from './bible.service';
import { Translation } from '../common/decorators/translation.decorator';
import { GetVersesDto } from './dto/get-verses.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('bible')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @ApiOperation({ summary: 'Obter todos os testamentos' })
  @ApiParam({ name: 'translation', required: true, description: 'Tradução da Bíblia (ARA ou NVT)' })
  @ApiResponse({ status: 200, description: 'Lista de testamentos obtida com sucesso.' })
  @Get(':translation/testaments')
  async getTestaments(@Translation() translation: string) {
    return this.bibleService.getTestaments(translation);
  }

  @ApiOperation({ summary: 'Obter livros por testamento' })
  @ApiParam({ name: 'translation', required: true, description: 'Tradução da Bíblia (ARA ou NVT)' })
  @ApiParam({ name: 'testamentId', required: true, description: 'ID do testamento' })
  @ApiResponse({ status: 200, description: 'Lista de livros obtida com sucesso.' })
  @Get(':translation/testament/:testamentId/books')
  async getBooksByTestament(
    @Translation() translation: string,
    @Param('testamentId') testamentId: number,
  ) {
    return this.bibleService.getBooksByTestament(translation, +testamentId);
  }

  @ApiOperation({ summary: 'Obter capítulos por livro' })
  @ApiParam({ name: 'translation', required: true, description: 'Tradução da Bíblia (ARA ou NVT)' })
  @ApiParam({ name: 'bookId', required: true, description: 'ID do livro' })
  @ApiResponse({ status: 200, description: 'Lista de capítulos obtida com sucesso.' })
  @Get(':translation/book/:bookId/chapters')
  async getChaptersByBook(
    @Translation() translation: string,
    @Param('bookId') bookId: number,
  ) {
    return this.bibleService.getChaptersByBook(translation, +bookId);
  }

  @ApiOperation({ summary: 'Obter versículos de um capítulo com paginação' })
  @ApiParam({ name: 'translation', required: true, description: 'Tradução da Bíblia (ARA ou NVT)' })
  @ApiParam({ name: 'bookId', required: true, description: 'ID do livro' })
  @ApiParam({ name: 'chapter', required: true, description: 'Número do capítulo' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite de itens por página' })
  @ApiResponse({ status: 200, description: 'Versículos obtidos com sucesso.' })
  @Get(':translation/book/:bookId/chapter/:chapter')
  async getVerses(
    @Translation() translation: string,
    @Param() params: GetVersesDto,
    @Query() pagination: PaginationDto,
  ) {
    const { bookId, chapter } = params;
    const { page, limit } = pagination;

    return this.bibleService.getVerses(translation, bookId, chapter, page, limit);
  }
}
