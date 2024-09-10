import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => User, (user) => user.todoLists)
  @JoinTable({ name: 'todo-list_users' })
  users: User[];

  constructor(todoList: Partial<TodoList>) {
    Object.assign(this, todoList);
  }

  addUser(user: User) {
    if (!this.users) {
      this.users = [];
    }
    this.users.push(user);
  }
}
