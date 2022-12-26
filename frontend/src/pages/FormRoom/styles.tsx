import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const FormRoomContainer = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormRoomFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 40%;
  border-radius: 1rem;
  background-color: ${grey['50']};

  @media (max-width: 769px) {
    width: 95%;
  }
`;

export const FormRoomFormHeaderContainer = styled(Box)`
  text-align: center;
  background-color: ${grey.A400};
  border-radius: 1rem 1rem 0 0;
  margin: 0 0 1rem 0;
`;

export const FormRoomForm = styled(Box)``;

export const FormRoomFormInputContainer = styled(Box)`
  margin: 1rem 1rem;
`;

export const FormRoomFormButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;
