import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { Repository } from 'typeorm';
import { TodoList } from './entities/todo-list.entity';
import { UserRole } from 'src/user/enum/roles.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoListService {
  constructor(
    @Inject('TODOLIST_REPOSITORY')
    private todoListRepository: Repository<TodoList>,
    private readonly userService: UserService,
  ) {}
  async create(createTodoListDto: CreateTodoListDto, userRequest: any) {
    const user = await this.userService.findOne(userRequest.userId);

    const todoList = new TodoList(createTodoListDto);

    todoList.addUser(user);

    return this.todoListRepository.create(todoList);
  }

  async findAll(userRequest: {
    userId: number;
    email: string;
    role: UserRole;
  }) {
    return this.todoListRepository.find({
      relations: ['users'],
      where: {
        users: {
          id: userRequest.userId,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.todoListRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    const todoList = await this.todoListRepository.findOneByOrFail({ id });

    todoList.title = updateTodoListDto.title;
    todoList.color = updateTodoListDto.color;

    return await this.todoListRepository.save(todoList);
  }

  async remove(id: number) {
    return this.todoListRepository.delete({ id });
  }
}
