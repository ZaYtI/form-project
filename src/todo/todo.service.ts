import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const todo = new Todo(createTodoDto);
    return await this.entityManager.save(todo);
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: number) {
    return this.todoRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneByOrFail({ id });

    todo.title = updateTodoDto.title;
    todo.desc = updateTodoDto.desc;
    todo.isComplete = updateTodoDto.isComplete;

    return await this.entityManager.save(todo);
  }

  remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}
