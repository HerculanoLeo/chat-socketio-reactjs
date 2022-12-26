import { FC, useEffect } from 'react';
import {
  FormRoomContainer,
  FormRoomForm,
  FormRoomFormButtonContainer,
  FormRoomFormContainer,
  FormRoomFormHeaderContainer,
  FormRoomFormInputContainer,
} from './styles';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { bind } from '@react-rxjs/core';
import userService from '../../services/user.service';
import UserDto from '../../models/user/user.dto';
import roomsService from '../../services/rooms.service';
import RoomRegisterDto from '../../models/room/room-register.dto';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import RoomDto from '../../models/room/room.dto';

const formSchema = yup.object().shape({
  name: yup.string().min(3, 'Min 3').required('Required'),
  participants: yup
    .array()
    .ensure()
    .compact()
    .of(yup.string().uuid())
    .min(2, 'Min 1')
    .required('Required'),
});

const [useUsers] = bind<[], UserDto[]>(() => {
  return userService.findAll$();
}, []);

interface Props {
  editRoom?: RoomDto;
}

const FormRoom: FC<Props> = ({ editRoom }) => {
  const { user } = useUser();

  const { register, handleSubmit, setValue } = useForm<RoomRegisterDto>();

  const users = useUsers();

  const navigate = useNavigate();

  useEffect(() => {
    if (editRoom) {
      setValue('name', editRoom.name);
      setValue(
        'participants',
        editRoom.participants.map((p) => p.id),
      );
    }
    // eslint-disable-next-line
  }, [editRoom]);

  const submit = async (formData: RoomRegisterDto) => {
    try {
      if (user) {
        formData.participants?.push(user.id);
      }

      await formSchema.validate(formData, {
        abortEarly: false,
      });
      if (!editRoom) {
        const nRoom = await roomsService.register(formData);

        navigate(`/room/${nRoom.id}`);
      } else {
        await roomsService.update(editRoom.id, formData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormRoomContainer>
      <FormRoomFormContainer>
        <FormRoomFormHeaderContainer>
          <Typography>
            {editRoom ? `Editar - ${editRoom.name}` : 'Nova Sala'}
          </Typography>
        </FormRoomFormHeaderContainer>

        <FormRoomForm>
          <FormRoomFormInputContainer>
            <TextField
              fullWidth
              label='Nome da Sala'
              defaultValue={editRoom?.name ?? ''}
              {...register('name')}
            />
          </FormRoomFormInputContainer>

          <FormRoomFormInputContainer>
            <FormControl fullWidth>
              <InputLabel id='participants-select-label'>
                Participantes
              </InputLabel>
              <Select
                labelId='participants-select-label'
                id='participants-select'
                multiple
                label='Participantes'
                defaultValue={editRoom?.participants.map((p) => p.id) ?? []}
                {...register('participants', {
                  onChange: (event: {
                    target: { value: string[]; name: string };
                  }) => {
                    const { value } = event.target;
                    setValue('participants', value);
                  },
                })}>
                {users
                  .filter((u) => u.id !== user?.id)
                  .map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </FormRoomFormInputContainer>
        </FormRoomForm>

        <FormRoomFormButtonContainer>
          <Button variant='contained' onClick={handleSubmit(submit)}>
            Salvar
          </Button>
        </FormRoomFormButtonContainer>
      </FormRoomFormContainer>
    </FormRoomContainer>
  );
};

export default FormRoom;
