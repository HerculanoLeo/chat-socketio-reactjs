import SocketIoService from '../../services/socket-io.service';
import { Subscription } from 'rxjs';
import { RoomWrapper } from './chat-context';

export default class ChatState {
  socket?: SocketIoService;
  rooms$!: Subscription;
  rooms!: RoomWrapper[];
  activeRoom?: RoomWrapper;

  constructor() {
    this.rooms$ = new Subscription();
    this.rooms = [];
  }

}
