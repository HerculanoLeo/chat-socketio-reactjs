import UserDto from '../user/user.dto';

export interface IUserContext {
  user?: UserDto;

  loadUser(username: string): Promise<void>;
}
