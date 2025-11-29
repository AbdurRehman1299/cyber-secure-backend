import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  content: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  author: string;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
