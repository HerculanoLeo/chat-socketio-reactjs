import { Box, styled } from '@mui/material';
import { grey } from "@mui/material/colors";

export const HeaderContainer = styled(Box)`
  flex: 0 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  background-color: ${grey['200']};
`;

export const HeaderButtonContainer = styled(Box)`
  min-width: 14rem;
`;

export const HeaderTitleContainer = styled(Box)`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`;
