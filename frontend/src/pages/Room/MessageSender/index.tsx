import {
  MessageSenderButtonContainer,
  MessageSenderContainer,
  MessageSenderInput,
  MessageSenderInputContainer,
} from './styles';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import MessageRegisterDto from '../../../models/message/message-register.dto';
import { useUser } from '../../../contexts/UserContext';

const MessageSender = () => {
  const [text, setText] = useState('');
  const { user } = useUser();
  const { sendMessage, activeRoom } = useChat();

  const submit = () => {
    if (activeRoom?.room && text && user) {
      sendMessage(
        new MessageRegisterDto({
          userId: user.id,
          roomId: activeRoom.room.id,
          text: text,
        }),
      );
      setText('');
    }
  };

  return (
    <MessageSenderContainer>
      <MessageSenderInputContainer>
        <MessageSenderInput
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </MessageSenderInputContainer>
      <MessageSenderButtonContainer>
        <IconButton
          color='secondary'
          aria-label='send message'
          onClick={submit}>
          <SendIcon />
        </IconButton>
      </MessageSenderButtonContainer>
    </MessageSenderContainer>
  );
};

export default MessageSender;
