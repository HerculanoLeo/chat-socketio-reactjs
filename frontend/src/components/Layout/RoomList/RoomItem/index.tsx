import {
  RoomItemContainer,
  RoomItemIconsContainer,
  RoomItemNameContainer,
  RoomListItem,
} from './styles';
import { Avatar, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import RoomDto from '../../../../models/room/room.dto';
import { formatDate } from '../../../../util/formatter.util';
import { useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  room: RoomDto;
  newMessage: boolean;
}

const RoomItem: FC<Props> = ({ room, newMessage }) => {
  const navigate = useNavigate();

  return (
    <RoomListItem onClick={() => navigate(`room/${room.id}`)}>
      <RoomItemContainer elevation={4}>
        <Avatar variant='rounded'>RM</Avatar>

        <RoomItemNameContainer>
          <Typography>{room.name}</Typography>
          <Typography variant='caption'>
            criando em {formatDate(room.createdAt)}{' '}
            {room.updatedAt && ` - atualizado em ${formatDate(room.updatedAt)}`}
          </Typography>
        </RoomItemNameContainer>

        <RoomItemIconsContainer>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/room/${room.id}/edit`);
            }}
            sx={{ p: 0, mb: 1, mt: 1 }}>
            <EditIcon fontSize='small' />
          </IconButton>
          {newMessage ? (
            <NotificationsActiveIcon fontSize='small' color='warning' />
          ) : null}
        </RoomItemIconsContainer>
      </RoomItemContainer>
    </RoomListItem>
  );
};

export default RoomItem;
