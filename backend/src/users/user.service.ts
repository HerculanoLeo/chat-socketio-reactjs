import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserImpl from '../database/entity/user.entity';
import User from './model/user.model';
import UserRegisterDto from './model/dtos/user-register.dto';
import UserUpdateDto from './model/dtos/user-update.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserImpl)
    private readonly repository: Repository<UserImpl>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find({});
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOne({
      where: { username },
      withDeleted: true,
    });
  }

  async register(requestEntity: UserRegisterDto): Promise<User> {
    await this.verifyUsername(requestEntity.username);

    return await this.repository.save(new UserImpl({ ...requestEntity }));
  }

  async update(id: string, requestEntity: UserUpdateDto): Promise<void> {
    const user = await this.findById(id);

    if (user.username !== requestEntity.username) {
      await this.verifyUsername(requestEntity.username);
    }

    await this.repository.update({ id }, { ...requestEntity });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete({ id });
  }

  private async verifyUsername(username: string) {
    const op = await this.findByUsername(username);
    if (op) {
      throw new BadRequestException('username already exist.');
    }
  }
}
