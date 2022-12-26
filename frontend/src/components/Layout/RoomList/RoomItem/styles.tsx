import { Box, ListItemButton, Paper, styled } from '@mui/material';

export const RoomListItem = styled(ListItemButton)(() => ({
  padding: 0,
  margin: '1rem 0.2rem',
}));

export const RoomItemContainer = styled(Paper)(() => ({
  flex: 1,
  display: 'flex',
  padding: '0.5rem',
}));

export const RoomItemNameContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 0.5rem',
}));

export const RoomItemIconsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`;
