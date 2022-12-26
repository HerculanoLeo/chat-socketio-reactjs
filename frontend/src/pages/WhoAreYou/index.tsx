import {
  WhoAreYouButtonContainer,
  WhoAreYouContainer,
  WhoAreYouForm,
  WhoAreYouFormContainer,
  WhoAreYouFormHeaderContainer,
} from './styles';
import { useUser } from '../../contexts/UserContext';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const WhoAreYou = () => {
  const [username, setUsername] = useState('');

  const { loadUser } = useUser();

  return (
    <WhoAreYouContainer>
      <WhoAreYouFormContainer>
        <WhoAreYouFormHeaderContainer>
          <Typography textAlign='center'>Quem é você?</Typography>
        </WhoAreYouFormHeaderContainer>

        <WhoAreYouForm>
          <TextField
            id='username'
            variant='filled'
            fullWidth
            label='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </WhoAreYouForm>
        <WhoAreYouButtonContainer>
          <Button onClick={async () => username && loadUser(username)}>
            Abrir
          </Button>
        </WhoAreYouButtonContainer>
      </WhoAreYouFormContainer>
    </WhoAreYouContainer>
  );
};

export default WhoAreYou;
