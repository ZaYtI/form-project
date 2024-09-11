import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { UserRequest } from 'src/auth/type/user-request.type';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(
    @Body() createTodoListDto: CreateTodoListDto,
    @Request() req: UserRequest,
  ) {
    return this.todoListService.create(createTodoListDto, req.user);
  }

  @Get()
  findAll(@Request() req: UserRequest) {
    return this.todoListService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: UserRequest) {
    return this.todoListService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: UserRequest,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, req.user.userId, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: UserRequest) {
    return this.todoListService.remove(+id, req.user.userId);
  }
}
