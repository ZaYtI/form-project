import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from 'src/database/database.module';
import { todoProviders } from './providers/todo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todoProviders],
})
export class TodoModule {}
