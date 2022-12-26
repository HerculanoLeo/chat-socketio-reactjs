import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  IChatContext,
  IChatContextAction,
  IChatWrapperData,
} from '../models/contexts/chat-context';
import SocketIoService from '../services/socket-io.service';
import UserDto from '../models/user/user.dto';
import { useUser } from './UserContext';
import RoomDto from '../models/room/room.dto';
import MessageDto from '../models/message/message.dto';
import MessageRegisterDto from '../models/message/message-register.dto';
import ChatState from '../models/contexts/chat-state';

const ChatContext = createContext({} as IChatContext);

const initialState: IChatWrapperData = { state: new ChatState() };

const reducer = (
  wrapper: IChatWrapperData,
  action: IChatContextAction,
): IChatWrapperData => {
  const state = wrapper.state;

  switch (action.type) {
    case 'add-socket': {
      state.socket = action.data.socket;
      return { state };
    }

    case 'listing-available-rooms': {
      state.rooms$ = action.data.rooms$;
      return { state };
    }

    case 'add-room': {
      state.rooms = state.rooms
        .filter((value) => value.room.id !== action.data.room.id)
        .concat({
          room: action.data.room,
          messages$: action.data.messages$,
          messages: [],
          newMessage: false,
        })
        .sort((a, b) => a.room.name.localeCompare(b.room.name));
      return { state };
    }

    case 'update-room': {
      state.rooms = state.rooms.map((r) => {
        if (r.room.id === action.data.room.id) {
          r.room = action.data.room;
        }
        return r;
      });

      return { state };
    }

    case 'remove-room': {
      state.rooms = state.rooms.filter((r) => r.room.id !== action.data.roomId);
      return { state };
    }

    case 'set-active-room': {
      state.activeRoom = state.rooms.find(
        (w) => w.room.id === action.data.activeRoomId,
      );

      if (state.activeRoom) {
        state.activeRoom.newMessage = false;
      }

      return { state };
    }

    case 'add-messages': {
      state.rooms = state.rooms.map((value) => {
        if (value.room.id === action.data.roomId) {
          const nMessages = value.messages.filter(
            (message) =>
              !action.data.messages.some(
                (nMessage) => nMessage.id === message.id,
              ),
          );

          nMessages.push(...action.data.messages);

          nMessages.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1;
            }

            if (a.createdAt < b.createdAt) {
              return 1;
            }

            return 0;
          });

          value.messages = nMessages;

          if (state.activeRoom?.room.id !== value.room.id) {
            value.newMessage = true;
          }
        }
        return value;
      });
      return { state };
    }

    default:
      return wrapper;
  }
};

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  const [wrapper, dispatch] = useReducer(reducer, initialState);

  const state = wrapper.state;

  useEffect(() => {
    return () => {
      state.rooms$?.unsubscribe();
      state.rooms?.forEach((r) => r.messages$.unsubscribe());
      state.socket?.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && !state.socket) {
      startChat(user);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (state.socket) {
      const rooms$ = state.socket
        .listing<RoomDto[]>('available-rooms')
        .subscribe({
          next: (rooms) => {
            for (const room of rooms) {
              if (!state.rooms.some((r) => r.room.id === room.id)) {
                addRoom(room);
              } else if (room.participants.some((p) => p.id === user?.id)) {
                updateRoom(room);
              } else {
                removeRoom(room.id);
              }
            }
          },
          error: (err) => {
            console.error(err);
          },
        });

      dispatch({
        type: 'listing-available-rooms',
        data: { rooms$ },
      });

      state.socket.send('find-rooms');
    }
    // eslint-disable-next-line
  }, [state.socket]);

  const startChat = (user: UserDto) => {
    if (user) {
      const socket = new SocketIoService(
        process.env.REACT_APP_SOCKET_CHAT_URL ?? process.env.REACT_APP_URL,
        {
          query: {
            userId: user.id,
          },
        },
      );

      dispatch({ type: 'add-socket', data: { socket } });
    }
  };

  const addRoom = (room: RoomDto) => {
    if (state.socket) {
      const messages$ = state.socket.listing<MessageDto[]>(room.id).subscribe({
        next: (messages) => {
          dispatch({
            type: 'add-messages',
            data: {
              roomId: room.id,
              messages,
            },
          });
        },
      });

      dispatch({
        type: 'add-room',
        data: { room, messages$ },
      });

      findMessages(room.id);
    }
  };

  const updateRoom = (room: RoomDto) => {
    dispatch({
      type: 'update-room',
      data: { room },
    });
  };

  const removeRoom = (roomId: string) => {
    dispatch({
      type: 'remove-room',
      data: { roomId },
    });
  };

  const setActiveRoom = (roomId?: string) => {
    dispatch({
      type: 'set-active-room',
      data: { activeRoomId: roomId },
    });
  };

  const sendMessage = (requestEntity: MessageRegisterDto) => {
    if (state.socket) {
      state.socket.send('send-message', requestEntity);
    }
  };

  const findMessages = (roomId: string) => {
    state.socket?.send('find-messages', roomId);
  };

  return (
    <ChatContext.Provider
      value={{
        rooms: state.rooms,
        activeRoom: state.activeRoom,
        setActiveRoom,
        sendMessage,
        findMessages,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
