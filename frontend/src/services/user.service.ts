import UserDto from '../models/user/user.dto';
import { api, apiUrl } from '../configurations/axios.configuration';
import UserRegisterDto from '../models/user/user-register.dto';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { map } from 'rxjs';
import { instanceDates } from '../util/instace-dates.util';

class UserService {
  constructor(private readonly baseUrl: string) {}

  async register(requestEntity: UserRegisterDto): Promise<UserDto> {
    const response = await api.post<UserDto>('users', requestEntity);
    return response.data;
  }

  async findByUsername(username: string): Promise<UserDto> {
    const response = await api.get<UserDto>(`users/username`, {
      params: { username },
    });
    return response.data;
  }

  async findAll(): Promise<UserDto[]> {
    const response = await api.get<UserDto[]>(`users`);
    return instanceDates(response.data);
  }

  findAll$() {
    return ajax.get<UserDto[]>(`${this.baseUrl}`).pipe(
      map((value) => {
        return value.response;
      }),
      map((value) => {
        return instanceDates(value);
      }),
    );
  }
}

const userService = new UserService(`${apiUrl}/users`);

export default userService;
