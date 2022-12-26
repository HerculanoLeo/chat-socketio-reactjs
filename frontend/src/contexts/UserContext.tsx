import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IUserContext } from '../models/contexts/user-context';
import UserDto from '../models/user/user.dto';
import useAsyncSetState from '../hooks/async-set-state';
import userService from '../services/user.service';
import UserRegisterDto from '../models/user/user-register.dto';
import { useCookies } from 'react-cookie';
import moment from 'moment';

const UserContext = createContext({} as IUserContext);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const [user, setUser] = useState<UserDto>();
  const setAsyncUser = useAsyncSetState(setUser);

  useEffect(() => {
    if (cookies['username']) {
      (async () => await loadUser(cookies['username']))();
    }
    // eslint-disable-next-line
  }, []);

  const loadUser = async (username: string) => {
    try {
      let user = await userService.findByUsername(username);

      if (user) {
        setAsyncUser(user);
      } else {
        user = await userService.register(new UserRegisterDto(username));
        setAsyncUser(user);
      }

      setCookies('username', username, {
        expires: moment().add(2, 'hours').toDate(),
        path: '/',
        secure: process.env.REACT_APP_ENVIRONMENT !== 'dev',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider value={{ user, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
