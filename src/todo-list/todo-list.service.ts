import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

    const todoList = this.todoListRepository.create(createTodoListDto);

    todoList.users = [user];

    return await this.todoListRepository.save(todoList);
  }

  async findAll(userRequest: {
    userId: number;
    email: string;
    role: UserRole;
  }) {
    return this.todoListRepository.find({
      relations: ['users', 'todoItems'],
      where: {
        users: {
          id: userRequest.userId,
        },
      },
    });
  }

  async findOne(listId: number, userId: number) {
    try {
      return await this.todoListRepository.findOneOrFail({
        relations: ['todoItems'],
        where: {
          id: listId,
          users: {
            id: userId,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    listId: number,
    userId: number,
    updateTodoListDto: UpdateTodoListDto,
  ) {
    try {
      const todoList = await this.findOne(listId, userId);

      todoList.title = updateTodoListDto.title;
      todoList.color = updateTodoListDto.color;

      return await this.todoListRepository.save(todoList);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async remove(listId: number, userId: number) {
    try {
      const todoList = await this.findOne(listId, userId);

      await this.todoListRepository.delete(todoList.id);

      return {
        message: 'Deleted Successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
