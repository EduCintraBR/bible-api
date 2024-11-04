import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Testament } from '../entities/testament.entity';
import { Book } from '../entities/book.entity';
import { Verse } from '../entities/verse.entity';
import { Metadata } from '../entities/metadata.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationResult } from './interfaces/pagination-result.interface';

@Injectable()
export class BibleService {
  constructor(
    // Repositórios para ARA
    @InjectRepository(Testament, 'ARA')
    private testamentRepositoryARA: Repository<Testament>,

    @InjectRepository(Book, 'ARA')
    private bookRepositoryARA: Repository<Book>,

    @InjectRepository(Verse, 'ARA')
    private verseRepositoryARA: Repository<Verse>,

    @InjectRepository(Metadata, 'ARA')
    private metadataRepositoryARA: Repository<Metadata>,

    // Repositórios para NVT
    @InjectRepository(Testament, 'NVT')
    private testamentRepositoryNVT: Repository<Testament>,

    @InjectRepository(Book, 'NVT')
    private bookRepositoryNVT: Repository<Book>,

    @InjectRepository(Verse, 'NVT')
    private verseRepositoryNVT: Repository<Verse>,

    @InjectRepository(Metadata, 'NVT')
    private metadataRepositoryNVT: Repository<Metadata>,
  ) {}

  // Método auxiliar para selecionar o repositório com base na tradução
  private getRepositories(translation: string) {
    switch (translation) {
      case 'ARA':
        return {
          testamentRepository: this.testamentRepositoryARA,
          bookRepository: this.bookRepositoryARA,
          verseRepository: this.verseRepositoryARA,
          metadataRepository: this.metadataRepositoryARA,
        };
      case 'NVT':
        return {
          testamentRepository: this.testamentRepositoryNVT,
          bookRepository: this.bookRepositoryNVT,
          verseRepository: this.verseRepositoryNVT,
          metadataRepository: this.metadataRepositoryNVT,
        };
      default:
        return null;
    }
  }  

  // Obter todos os testamentos
  async getTestaments(translation: string): Promise<Testament[]> {
    const { testamentRepository } = this.getRepositories(translation);
    return testamentRepository.find();
  }

  // Obter livros por testamento
  async getBooksByTestament(
    translation: string,
    testamentId: number,
  ): Promise<Book[]> {
    const { bookRepository } = this.getRepositories(translation);
    return bookRepository.find({
      where: { testament_reference_id: testamentId },
    });
  }

  // Obter capítulos por livro
  async getChaptersByBook(
    translation: string,
    bookId: number,
  ): Promise<number[]> {
    const { verseRepository } = this.getRepositories(translation);
    const chapters = await verseRepository
      .createQueryBuilder('verse')
      .select('verse.chapter')
      .where('verse.book_id = :bookId', { bookId })
      .groupBy('verse.chapter')
      .getRawMany();

    return chapters.map((c) => c.chapter);
  }

  // Obter versículos por capítulo
  async getVerses(
    translation: string,
    bookId: number,
    chapter: number,
    page: number,
    limit: number,
  ): Promise<PaginationResult<Verse>> {
    const { verseRepository } = this.getRepositories(translation);
  
    const [data, total] = await verseRepository.findAndCount({
      where: { book_id: bookId, chapter },
      order: { verse: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const totalPages = Math.ceil(total / limit);
  
    const baseUrl = `/bible/${translation}/book/${bookId}/chapter/${chapter}`;
  
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
  
    const nextPageUrl = nextPage ? `${baseUrl}?page=${nextPage}&limit=${limit}` : null;
    const prevPageUrl = prevPage ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null;
  
    return {
      data,
      total,
      totalPages,
      page,
      limit,
      nextPageUrl,
      prevPageUrl,
    };
  }
}