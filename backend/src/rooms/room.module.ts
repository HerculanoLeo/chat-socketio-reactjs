import { forwardRef, Module } from '@nestjs/common';
import RoomService from './room.service';
import RoomController from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoomImpl from '../database/entity/room.entity';
import RoomToDtoMapper from './models/mapper/room-to-dto.mapper';
import ChatModule from '../chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomImpl]), forwardRef(() => ChatModule)],
  exports: [RoomService, RoomToDtoMapper],
  providers: [RoomService, RoomToDtoMapper],
  controllers: [RoomController],
})
export default class RoomModule {}
