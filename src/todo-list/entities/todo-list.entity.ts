import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  constructor(todoList: Partial<TodoList>) {
    Object.assign(this, todoList);
  }
}
