import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@Entity('Contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Column()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  message: string;
}
