import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.create(createTodoDto);
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

    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}
