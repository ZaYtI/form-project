import { Test, TestingModule } from '@nestjs/testing';
import { TodoList } from './todo-list';

describe('TodoList', () => {
  let provider: TodoList;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoList],
    }).compile();

    provider = module.get<TodoList>(TodoList);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
