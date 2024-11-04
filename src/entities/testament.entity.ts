import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('testament')
export class Testament {
  @ApiProperty({ description: 'ID do testamento' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do testamento' })
  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.testament)
  books: Book[];
}