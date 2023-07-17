import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  @Matches(/.*\d.*/, { message: 'Password must contain a number.' })
  @Matches(/.*[A-Z].*/, {
    message: 'Password must contain an uppercase letter.',
  })
  @Matches(/.*[a-z].*/, {
    message: 'Password must contain a lowercase letter.',
  })
  password: string;
}
