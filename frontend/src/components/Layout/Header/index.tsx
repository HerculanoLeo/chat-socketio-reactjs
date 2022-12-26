import {
  HeaderButtonContainer,
  HeaderContainer,
  HeaderTitleContainer,
} from './styles';
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

interface Props {
  onClickMenu(): void;
}

const Header: FC<Props> = ({ onClickMenu }) => {
  return (
    <HeaderContainer>
      <HeaderButtonContainer>
        <IconButton onClick={onClickMenu}>
          <MenuIcon />
        </IconButton>
      </HeaderButtonContainer>
      <HeaderTitleContainer>
        <Typography>Chat</Typography>
      </HeaderTitleContainer>
      <HeaderButtonContainer></HeaderButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
