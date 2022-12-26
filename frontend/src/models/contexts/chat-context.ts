import SocketIoService from '../../services/socket-io.service';
import { Subscription } from 'rxjs';
import RoomDto from '../room/room.dto';
import MessageDto from '../message/message.dto';
import MessageRegisterDto from '../message/message-register.dto';
import ChatState from './chat-state';

export interface IChatContext {
  rooms: RoomWrapper[];
  activeRoom?: RoomWrapper;

  setActiveRoom(roomId?: string): void;

  sendMessage(requestEntity: MessageRegisterDto): void;

  findMessages(roomId: string): void;
}

export interface IChatWrapperData {
  state: ChatState;
}

export interface RoomWrapper {
  room: RoomDto;
  messages$: Subscription;
  messages: MessageDto[];
  newMessage: boolean;
}

export type IChatContextAction =
  | {
      type: 'add-socket';
      data: { socket: SocketIoService };
    }
  | {
      type: 'listing-available-rooms';
      data: { rooms$: Subscription };
    }
  | {
      type: 'add-room';
      data: { room: RoomDto; messages$: Subscription };
    }
  | {
      type: 'update-room';
      data: { room: RoomDto };
    }
  | {
      type: 'remove-room';
      data: { roomId: string };
    }
  | {
      type: 'add-messages';
      data: { roomId: string; messages: MessageDto[] };
    }
  | {
      type: 'set-active-room';
      data: { activeRoomId?: string };
    };
