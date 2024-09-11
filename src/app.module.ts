import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './auth/middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { TodoListController } from './todo-list/todo-list.controller';
import { TodoController } from './todo/todo.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    TodoModule,
    TodoListModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'signUp',
          method: RequestMethod.POST,
        },
        {
          path: 'signIn',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(
        UserController,
        TodoListController,
        TodoController,
        AuthController,
      );
  }
}
