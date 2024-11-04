import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('metadata')
export class Metadata {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}