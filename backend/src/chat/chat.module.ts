import { forwardRef, Module } from '@nestjs/common';

import ChatGateway from './chat.gateway';
import ChatService from './chat.service';
import RoomModule from '../rooms/room.module';
import MessageModule from '../messages/message.module';
import UserModule from '../users/user.module';

@Module({
  imports: [forwardRef(() => RoomModule), MessageModule, UserModule],
  exports: [ChatGateway],
  providers: [ChatGateway, ChatService],
  controllers: [],
})
export default class ChatModule {}
