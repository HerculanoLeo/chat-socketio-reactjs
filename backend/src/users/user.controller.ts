import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import UserService from './user.service';
import UserDto from './model/dtos/user.dto';
import UserToDtoMapper from './model/mapper/user-to-dto.mapper';
import UserRegisterDto from './model/dtos/user-register.dto';
import UserUpdateDto from './model/dtos/user-update.dto';

@Controller('users')
export default class UserController {
  constructor(
    private readonly service: UserService,
    private readonly userToDtoMapper: UserToDtoMapper,
  ) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.service.findAll();
    return this.userToDtoMapper.mapList(users);
  }

  @Get('username')
  async findByUsername(@Query('username') username: string) {
    const user = await this.service.findByUsername(username);
    return this.userToDtoMapper.map(user);
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return this.userToDtoMapper.map(await this.service.findById(id));
  }

  @Post()
  async register(
    @Body() requestEntity: UserRegisterDto,
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDto> {
    const user = await this.service.register(requestEntity);
    res.status(HttpStatus.CREATED);
    return this.userToDtoMapper.map(user);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() requestEntity: UserUpdateDto,
  ): Promise<void> {
    await this.service.update(id, requestEntity);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
