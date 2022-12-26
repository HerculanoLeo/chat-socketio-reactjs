import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const LayoutContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  height: '100vh',
  width: '100vw',
}));

export const LayoutContentContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 'calc(100vh * 0.9)',
  '& > div': {
    height: '100%',
  },
}));

export const LayoutRoomsContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'stretch',
  padding: '0.1rem 0.5rem',
  backgroundColor: grey['100'],
  width: '340px',
}));

export const LayoutRoomsHeaderContainer = styled(Box)``;

export const LayoutContent = styled(Box)(() => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: grey['A200'],
}));
