import { FC, useEffect } from 'react';
import {
  RoomContainer,
  RoomHeaderContainer,
  RoomHeaderReloadButton,
  RoomHeaderTitleContainer,
  RoomMessagesContainer,
  RoomMessageSenderContainer,
} from './styles';
import { Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MessageList from './MessageList';
import MessageSender from './MessageSender';
import { useParams } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';

const Room: FC = () => {
  const { rooms, activeRoom, setActiveRoom, findMessages } = useChat();

  const params = useParams<{ id?: string }>();

  useEffect(() => {
    if (params?.id) {
      setActiveRoom(params.id);
    }
    return () => {
      setActiveRoom(undefined);
    };
    // eslint-disable-next-line
  }, [params, rooms]);

  if (!activeRoom) {
    return (
      <RoomContainer>
        <Typography>Sala indisponivel ou não encontrada</Typography>
      </RoomContainer>
    );
  }

  return (
    <RoomContainer>
      <RoomHeaderContainer>
        <RoomHeaderTitleContainer>
          <Typography>{activeRoom?.room.name}</Typography>
        </RoomHeaderTitleContainer>

        <RoomHeaderReloadButton
          onClick={() => activeRoom && findMessages(activeRoom.room.id)}>
          <RestartAltIcon />
        </RoomHeaderReloadButton>
      </RoomHeaderContainer>

      <RoomMessagesContainer>
        <MessageList />
      </RoomMessagesContainer>

      <RoomMessageSenderContainer>
        <MessageSender />
      </RoomMessageSenderContainer>
    </RoomContainer>
  );
};

export default Room;
