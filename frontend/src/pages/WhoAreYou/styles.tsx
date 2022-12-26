import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const WhoAreYouContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const WhoAreYouFormContainer = styled(Box)`
  width: 40%;
  border-radius: 1rem;
  background-color: ${grey.A200};
  
  @media(max-width: 769px) {
    width: 95%;
  }
`;

export const WhoAreYouFormHeaderContainer = styled(Box)`
  background-color: ${grey.A400};
  border-radius: 1rem 1rem 0 0;
  margin: 0 0 1rem 0;
`;

export const WhoAreYouForm = styled(Box)`
  padding: 1rem 1rem;
`;

export const WhoAreYouButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`