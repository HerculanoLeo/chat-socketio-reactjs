import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';

export const RoomContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: 'inherit',
}));

export const RoomHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  height: '3rem',
  backgroundColor: grey['400'],
  padding: '0 1rem',
}));

export const RoomHeaderTitleContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const RoomHeaderReloadButton = styled(LoadingButton)(() => ({}));

export const RoomMessagesContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  overflow: 'auto',
}));

export const RoomMessageSenderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 1rem 0;
`;
