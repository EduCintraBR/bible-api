import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Testament } from './testament.entity';
import { Verse } from './verse.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('book')
export class Book {
  @ApiProperty({ description: 'ID do Livro' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'ID de referência do livro' })
  @Column()
  book_reference_id: number;

  @ApiProperty({ description: 'ID de referência do testamento' })
  @Column()
  testament_reference_id: number;

  @ApiProperty({ description: 'Nome do livro' })
  @Column()
  name: string;

  @ManyToOne(() => Testament, (testament) => testament.books)
  @JoinColumn({ name: 'testament_reference_id' })
  testament: Testament;

  @OneToMany(() => Verse, (verse) => verse.book)
  verses: Verse[];
}