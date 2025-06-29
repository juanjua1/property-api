import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  // Campos específicos para propiedades inmobiliarias
  @Column()
  location: string;

  @Column()
  area: number;

  @Column({ nullable: true })
  imageUrl: string;
}