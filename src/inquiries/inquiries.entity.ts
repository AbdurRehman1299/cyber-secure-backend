import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  message: string;

  @Column({ default: 'Pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
