import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: false, name: 'is_complete' })
  isComplete: boolean;

  @Column({ name: 'todo_list_id', nullable: false })
  todoListId: number;

  @ManyToOne(() => TodoList, (todoList) => todoList.todoItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'todo_list_id' })
  todoList: TodoList;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}
