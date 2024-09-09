import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return await this.entityManager.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({ id });

    user.email = updateUserDto.email;
    user.birthDate = updateUserDto.birthdate;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;

    return await this.entityManager.save(user);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
