import { IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  title: string;

  @IsString()
  color: string;
}
