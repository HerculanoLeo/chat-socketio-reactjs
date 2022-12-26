import FormRoom from '../index';
import { useEffect, useState } from 'react';
import RoomDto from '../../../models/room/room.dto';
import useAsyncSetState from '../../../hooks/async-set-state';
import roomsService from '../../../services/rooms.service';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const [editRoom, setEditRoom] = useState<RoomDto>();
  const setAsyncEditRoom = useAsyncSetState(setEditRoom);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      (async () => {
        const room = await roomsService.findById(id);
        setAsyncEditRoom(room);
      })();
    }
    // eslint-disable-next-line
  }, [id]);

  if (!editRoom) {
    return <></>;
  }

  return <FormRoom editRoom={editRoom} />;
};

export default Edit;
