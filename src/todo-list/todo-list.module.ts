import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { DatabaseModule } from 'src/database/database.module';
import { todoListProviders } from './providers/todo-list.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [TodoListController],
  providers: [TodoListService, ...todoListProviders],
})
export class TodoListModule {}
