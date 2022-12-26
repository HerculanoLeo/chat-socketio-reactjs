import { Box, BoxProps, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

interface MessageListItemContainerProps {
  owner: boolean;
}

export const MessageListContainer = styled(Box)(() => ({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column-reverse',
  width: '100%',
  padding: '0 1rem',
}));

export const MessageListItemContainer = styled(
  ({
    children,
    owner,
    ...rest
  }: PropsWithChildren & MessageListItemContainerProps & BoxProps) => (
    <Box {...rest}>{children}</Box>
  ),
)(({ owner }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: owner ? 'flex-end' : 'flex-start',
}));
