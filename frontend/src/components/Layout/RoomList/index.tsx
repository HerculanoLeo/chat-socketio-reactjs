import RoomItem from './RoomItem';
import { RoomListContainer } from './styles';
import { useChat } from '../../../contexts/ChatContext';
import { Typography } from '@mui/material';

const RoomList = () => {
  const { rooms } = useChat();

  if (!rooms.length) {
    return (
      <RoomListContainer>
        <Typography>Nenhuma sala disponivel</Typography>
      </RoomListContainer>
    );
  }

  return (
    <RoomListContainer>
      {rooms.map((message) => (
        <RoomItem
          key={message.room.id}
          room={message.room}
          newMessage={message.newMessage}
        />
      ))}
    </RoomListContainer>
  );
};

export default RoomList;
