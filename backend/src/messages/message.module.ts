import { forwardRef, Module } from '@nestjs/common';
import MessageService from './message.service';
import MessageController from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageImpl from '../database/entity/message.entity';
import MessageToDtoMapper from './models/mapper/message-to-dto.mapper';
import RoomModule from '../rooms/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageImpl]),
    forwardRef(() => RoomModule),
  ],
  exports: [MessageService, MessageToDtoMapper],
  providers: [MessageService, MessageToDtoMapper],
  controllers: [MessageController],
})
export default class MessageModule {}
