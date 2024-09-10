import { Exclude } from 'class-transformer';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  birthDate: Date;

  @ManyToMany(() => TodoList, (todoList) => todoList.users)
  todoLists: TodoList[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
