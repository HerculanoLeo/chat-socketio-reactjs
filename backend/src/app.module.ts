import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configurations/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './users/user.module';
import RoomModule from './rooms/room.module';
import MessageModule from './messages/message.module';
import ChatModule from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(configuration().database),
    ChatModule,
    UserModule,
    RoomModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
