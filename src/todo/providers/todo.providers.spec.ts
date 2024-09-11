import { Test, TestingModule } from '@nestjs/testing';
import { TodoProviders } from './todo.providers';

describe('TodoProviders', () => {
  let provider: TodoProviders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoProviders],
    }).compile();

    provider = module.get<TodoProviders>(TodoProviders);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
