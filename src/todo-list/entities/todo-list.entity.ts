import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @OneToMany(() => Todo, (todoItem) => todoItem.todoList)
  todoItems: Todo[];

  constructor(todoList: Partial<TodoList>) {
    Object.assign(this, todoList);
  }
}
