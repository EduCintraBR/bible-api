import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleService } from './bible.service';
import { BibleController } from './bible.controller';
import { Testament } from '../entities/testament.entity';
import { Book } from '../entities/book.entity';
import { Verse } from '../entities/verse.entity';
import { Metadata } from '../entities/metadata.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    // Conexão para ARA
    TypeOrmModule.forRoot({
      name: 'ARA',
      type: 'sqlite',
      database: 'data/ARA.sqlite',
      entities: [Testament, Book, Verse, Metadata],
      synchronize: false,
    }),
    // Conexão para NVT
    TypeOrmModule.forRoot({
      name: 'NVT',
      type: 'sqlite',
      database: 'data/NVT.sqlite',
      entities: [Testament, Book, Verse, Metadata],
      synchronize: false,
    }),
    // Repositórios para ARA
    TypeOrmModule.forFeature([Testament, Book, Verse, Metadata], 'ARA'),
    // Repositórios para NVT
    TypeOrmModule.forFeature([Testament, Book, Verse, Metadata], 'NVT'),
  ],
  providers: [JwtService, BibleService],
  controllers: [BibleController],
})

export class BibleModule {}