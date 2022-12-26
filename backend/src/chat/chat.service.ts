import { forwardRef, Inject, Injectable } from '@nestjs/common';
import RoomService from '../rooms/room.service';
import MessageService from '../messages/message.service';
import UserService from '../users/user.service';
import PullSocket from './models/pull-socket.model';
import RoomSearchDto from '../rooms/models/dtos/room-search.dto';
import Room from '../rooms/models/room.model';
import MessageRegisterDto from '../messages/models/dtos/message-register.dto';
import Message from '../messages/models/message.model';
import MessageSearchDto from '../messages/models/dtos/message-search.dto';

@Injectable()
export default class ChatService {
  private pullSocket: PullSocket[] = [];

  constructor(
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  async addUserOnPullSocket(userId: string, socketId: string) {
    await this.userService.findById(userId);
    this.pullSocket.push(new PullSocket(userId, socketId));
  }

  async getAvailableRoomsBySocketId(id: string): Promise<Room[]> {
    const pullSocket = this.pullSocket.find((ps) => ps.socketId === id);
    return await this.roomService.findAll(
      new RoomSearchDto({ userId: pullSocket.userId }),
    );
  }

  async sendMessage(requestEntity: MessageRegisterDto): Promise<Message> {
    return await this.messageService.register(requestEntity);
  }

  async findMessagesRoomId(roomId: string): Promise<Message[]> {
    return await this.messageService.findAll(
      new MessageSearchDto({ roomId: roomId }),
    );
  }

  findSocketIdsByUserIds(ids: string[]) {
    return this.pullSocket
      .filter((ps) => ids.some((id) => ps.userId === id))
      .map((ps) => ps.socketId);
  }

  removeOnPullSocket(id: string): void {
    this.pullSocket = this.pullSocket.filter((ps) => ps.socketId !== id);
  }
}
