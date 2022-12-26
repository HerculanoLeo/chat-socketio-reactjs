import { MessageListContainer, MessageListItemContainer } from './styles';
import MessageItem from './MessageItem';
import { useLayoutEffect } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { useUser } from '../../../contexts/UserContext';

const MessageList = () => {
  const { user } = useUser();
  const { activeRoom } = useChat();

  useLayoutEffect(() => {
    if (activeRoom?.messages.length) {
      const messageElement = document.querySelector(
        `#message-${activeRoom.messages[0].id}`,
      );
      messageElement?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MessageListContainer>
      {activeRoom?.messages.map((message) => (
        <MessageListItemContainer
          id={`message-${message.id}`}
          key={message.id}
          owner={Boolean(message.userId === user?.id)}>
          <MessageItem message={message} />
        </MessageListItemContainer>
      ))}
    </MessageListContainer>
  );
};

export default MessageList;
