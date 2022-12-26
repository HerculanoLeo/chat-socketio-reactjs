import React from 'react';
import Routes from './routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './configurations/theme.configuration';
import UserProvider from './contexts/UserContext';
import { CookiesProvider } from 'react-cookie';
import ChatProvider from './contexts/ChatContext';

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <ChatProvider>
            <Routes />
          </ChatProvider>
        </UserProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
