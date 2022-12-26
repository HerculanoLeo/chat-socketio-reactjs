import { Box, BoxProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { PropsWithChildren } from 'react';

interface OwnerProps {
  owner: boolean;
}

export const MessageItemContainer = styled(
  ({ children, owner, ...rest }: BoxProps & PropsWithChildren & OwnerProps) => (
    <Box {...rest}>{children}</Box>
  ),
)(({ owner }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0.2rem 0.5rem',
  maxWidth: '50%',
  margin: '0.5rem 0',
  border: `1px solid ${grey['A700']}`,
  backgroundColor: `${grey['50']}`,
  borderRadius: owner ? '0.2rem 0.2rem 0 0.2rem' : '0.2rem 0.2rem 0.2rem 0',

  '@media(max-width: 768px)': {
    maxWidth: '80%',
  },
}));

export const MessageItemHeaderContainer = styled(Box)`
  width: 100%;
  margin: 0 0 0.3rem 0;
`;
export const MessageItemContentContainer = styled(Box)``;

export const MessageItemFooterContainer = styled(Box)`
  margin: 0.3rem 0 0 0;
  width: 100%;
`;
