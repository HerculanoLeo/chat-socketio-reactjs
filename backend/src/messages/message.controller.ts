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
  Res,
} from '@nestjs/common';
import MessageService from './message.service';
import MessageToDtoMapper from './models/mapper/message-to-dto.mapper';
import MessageDto from './models/dtos/message.dto';
import MessageRegisterDto from './models/dtos/message-register.dto';
import { Response } from 'express';
import MessageUpdateDto from './models/dtos/message-update.dto';
import MessageSearchDto from './models/dtos/message-search.dto';

@Controller('messages')
export default class MessageController {
  constructor(
    private readonly service: MessageService,
    private messageToDtoMapper: MessageToDtoMapper,
  ) {}

  @Get()
  async findAll(
    @Query() requestEntity: MessageSearchDto,
  ): Promise<MessageDto[]> {
    return this.messageToDtoMapper.mapList(
      await this.service.findAll(requestEntity),
    );
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MessageDto> {
    return this.messageToDtoMapper.map(await this.service.findById(id));
  }

  @Post()
  async register(
    @Body() requestEntity: MessageRegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageDto> {
    const entity = await this.service.register(requestEntity);
    res.status(HttpStatus.CREATED);
    return this.messageToDtoMapper.map(entity);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() requestEntity: MessageUpdateDto,
  ): Promise<void> {
    await this.service.update(id, requestEntity);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
