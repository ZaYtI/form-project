import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
  ) {}
  async create(createTodoListDto: CreateTodoListDto) {
    const todoList = new TodoList(createTodoListDto);

    return await this.entityManager.save(todoList);
  }

  async findAll() {
    return this.todoListRepository.find();
  }

  async findOne(id: number) {
    return this.todoListRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    const todoList = await this.todoListRepository.findOneByOrFail({ id });

    todoList.title = updateTodoListDto.title;
    todoList.color = updateTodoListDto.color;

    return await this.entityManager.save(todoList);
  }

  async remove(id: number) {
    return this.todoListRepository.delete({ id });
  }
}
