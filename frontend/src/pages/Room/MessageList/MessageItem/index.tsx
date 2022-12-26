import { Divider, Typography } from '@mui/material';
import MessageDto from '../../../../models/message/message.dto';
import { FC } from 'react';
import {
  MessageItemContainer,
  MessageItemContentContainer,
  MessageItemFooterContainer,
  MessageItemHeaderContainer,
} from './styles';
import { formatDate } from '../../../../util/formatter.util';
import { useUser } from '../../../../contexts/UserContext';

interface Props {
  message: MessageDto;
}

const MessageItem: FC<Props> = ({ message }) => {
  const { user } = useUser();

  const isOwner = () => {
    return message.userId === user?.id;
  };

  return (
    <MessageItemContainer owner={isOwner()}>
      <MessageItemHeaderContainer>
        {!isOwner() ? (
          <>
            <Typography variant='subtitle2' fontSize={10}>
              Enviado por {message.username}
            </Typography>{' '}
            <Divider />
          </>
        ) : null}
      </MessageItemHeaderContainer>
      <MessageItemContentContainer>
        <Typography textAlign={isOwner() ? 'end' : 'start'}>
          {message.text}
        </Typography>
      </MessageItemContentContainer>
      <MessageItemFooterContainer>
        <Divider />

        <Typography
          textAlign={isOwner() ? 'start' : 'end'}
          variant='subtitle2'
          fontSize={10}>
          Enviado em {formatDate(message.createdAt)}
          {message.updatedAt ? ' - (editado)' : null}
        </Typography>
      </MessageItemFooterContainer>
    </MessageItemContainer>
  );
};

export default MessageItem;
