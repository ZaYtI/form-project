import { DataSource } from 'typeorm';
import { TodoList } from '../entities/todo-list.entity';

export const todoListProviders = [
  {
    provide: 'TODOLIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TodoList),
    inject: ['DATA_SOURCE'],
  },
];
