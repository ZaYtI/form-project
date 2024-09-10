import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsBoolean()
  isComplete: boolean;

  @IsInt()
  todoListId: number;
}
