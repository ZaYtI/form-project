import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => TodoList, (todoList) => todoList.todoItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  todoList: TodoList;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}
