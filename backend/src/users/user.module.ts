import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserImpl from '../database/entity/user.entity';
import UserService from './user.service';
import UserController from './user.controller';
import UserToDtoMapper from './model/mapper/user-to-dto.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserImpl])],
  exports: [UserService],
  providers: [UserService, UserToDtoMapper],
  controllers: [UserController],
})
export default class UserModule {}
