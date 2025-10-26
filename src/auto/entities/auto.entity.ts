import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('poop') 
export class AutoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; 

  @Column()
  year: number;
}