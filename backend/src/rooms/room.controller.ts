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
import RoomService from './room.service';
import RoomDto from './models/dtos/room.dto';
import RoomToDtoMapper from './models/mapper/room-to-dto.mapper';
import RoomRegisterDto from './models/dtos/room-register.dto';
import { Response } from 'express';
import RoomUpdateDto from './models/dtos/room-update.dto';
import RoomSearchDto from './models/dtos/room-search.dto';

@Controller('rooms')
export default class RoomController {
  constructor(
    private readonly service: RoomService,
    private readonly mapperToDto: RoomToDtoMapper,
  ) {}

  @Get()
  async findAll(@Query() requestEntity: RoomSearchDto): Promise<RoomDto[]> {
    return this.mapperToDto.mapList(await this.service.findAll(requestEntity));
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RoomDto> {
    return this.mapperToDto.map(await this.service.findById(id));
  }

  @Post()
  async register(
    @Body() requestEntity: RoomRegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RoomDto> {
    const room = await this.service.register(requestEntity);
    res.status(HttpStatus.CREATED);
    return this.mapperToDto.map(room);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() requestEntity: RoomUpdateDto,
  ): Promise<void> {
    await this.service.update(id, requestEntity);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
