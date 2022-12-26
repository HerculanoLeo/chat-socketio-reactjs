import { Box, styled, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

export const MessageSenderContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`;

export const MessageSenderInputContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding: 0 1rem;
`;

export const MessageSenderInput = styled(TextField)`
  background-color: ${grey['50']};
  word-wrap: break-word;
`;

export const MessageSenderButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;
