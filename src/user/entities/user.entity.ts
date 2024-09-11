import { Exclude } from 'class-transformer';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/roles.enum';

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Exclude()
  role: UserRole;

  @ManyToMany(() => TodoList, (todoList) => todoList.users)
  todoLists: TodoList[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
