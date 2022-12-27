import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import ChatService from './chat.service';
import RoomToDtoMapper from '../rooms/models/mapper/room-to-dto.mapper';
import MessageRegisterDto from '../messages/models/dtos/message-register.dto';
import MessageToDtoMapper from '../messages/models/mapper/message-to-dto.mapper';
import Room from '../rooms/models/room.model';

@WebSocketGateway({
  namespace: '/api/chat',
  cors: {
    origin: '*',
  },
})
export default class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Namespace;

  constructor(
    private readonly service: ChatService,
    private readonly roomToDtoMapper: RoomToDtoMapper,
    private readonly messageToDtoMapper: MessageToDtoMapper,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      await this.service.addUserOnPullSocket(
        client.handshake.query['userId'] as string,
        client.id,
      );
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    this.service.removeOnPullSocket(client.id);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    client: Socket,
    @MessageBody() requestEntity: MessageRegisterDto,
  ): Promise<void> {
    const message = this.messageToDtoMapper.map(
      await this.service.sendMessage(requestEntity),
    );

    this.server.emit(message.roomId, [message]);
  }

  @SubscribeMessage('find-rooms')
  async findRooms(client: Socket) {
    const rooms = await this.service.getAvailableRoomsBySocketId(client.id);

    client.emit('available-rooms', this.roomToDtoMapper.mapList(rooms));
  }

  @SubscribeMessage('find-messages')
  async findMessagesByRoomId(client: Socket, roomId: string) {
    const messages = this.messageToDtoMapper.mapList(
      await this.service.findMessagesRoomId(roomId),
    );

    client.emit(roomId, messages);
  }

  async emitRoom(room: Room, oldParticipants: string[] = []) {
    const socketIds = this.service.findSocketIdsByUserIds([
      ...room.participants.map((p) => p.id),
      ...oldParticipants,
    ]);

    for (const socketId of socketIds) {
      const client = this.server.sockets.get(socketId);
      client?.emit('available-rooms', [this.roomToDtoMapper.map(room)]);
    }
  }
}
