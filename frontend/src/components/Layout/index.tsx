import { FC, useState } from 'react';
import {
  LayoutContentContainer,
  LayoutContainer,
  LayoutContent,
  LayoutRoomsContainer,
  LayoutRoomsHeaderContainer,
} from './styles';
import { Outlet } from 'react-router-dom';
import RoomList from './RoomList';
import RoomCreate from './RoomCreate';
import { Divider, Drawer, IconButton } from '@mui/material';
import Header from './Header';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Layout: FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const onClickMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <LayoutContainer>
      <Header onClickMenu={onClickMenu} />
      <LayoutContentContainer
        sx={{ marginLeft: { sm: 0, md: showMenu ? '340px' : '0' }, transition: 'margin 0.3s' }}>
        <Drawer
          variant='persistent'
          open={showMenu}
          onClose={onClickMenu}
          sx={{ display: { md: 'flex', sm: 'none' } }}>
          <LayoutRoomsContainer>
            <LayoutRoomsHeaderContainer>
              <IconButton onClick={onClickMenu}>
                <ChevronLeftIcon />
              </IconButton>
            </LayoutRoomsHeaderContainer>

            <Divider sx={{ width: '100%' }} />

            <RoomList />

            <Divider sx={{ width: '100%' }} />

            <RoomCreate />
          </LayoutRoomsContainer>
        </Drawer>

        <Drawer
          variant='temporary'
          open={showMenu}
          onClose={onClickMenu}
          sx={{ display: { md: 'none', sm: 'flex' } }}>
          <LayoutRoomsContainer>
            <RoomList />

            <Divider sx={{ width: '100%' }} />

            <RoomCreate />
          </LayoutRoomsContainer>
        </Drawer>

        <LayoutContent id='layout-content'>
          <Outlet />
        </LayoutContent>
      </LayoutContentContainer>
    </LayoutContainer>
  );
};

export default Layout;
