// src/entities/verse.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('verse')
export class Verse {
  @ApiProperty({ description: 'ID do versículo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'ID do livro' })
  @Column()
  book_id: number;

  @ApiProperty({ description: 'Número do capítulo' })
  @Column()
  chapter: number;

  @ApiProperty({ description: 'Número do versículo' })
  @Column()
  verse: number;

  @ApiProperty({ description: 'Texto do versículo' })
  @Column('text')
  text: string;

  @ManyToOne(() => Book, (book) => book.verses)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}