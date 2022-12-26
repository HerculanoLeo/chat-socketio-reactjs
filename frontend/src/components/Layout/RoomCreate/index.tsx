import { RoomCreateContainer } from './styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RoomCreate = () => {
  const navigate = useNavigate();

  return (
    <RoomCreateContainer>
      <Button variant='contained' onClick={() => navigate('/room/create')}>Create Room</Button>
    </RoomCreateContainer>
  );
};

export default RoomCreate;
