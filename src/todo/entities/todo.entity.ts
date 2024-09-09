import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: false })
  isComplete: boolean;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}
