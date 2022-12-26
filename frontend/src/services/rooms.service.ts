import RoomRegisterDto from '../models/room/room-register.dto';
import RoomDto from '../models/room/room.dto';
import { api, apiUrl } from '../configurations/axios.configuration';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { map } from 'rxjs';
import { instanceDates } from '../util/instace-dates.util';

class RoomsService {
  constructor(private readonly baseUrl: string) {}

  async register(requestEntity: RoomRegisterDto): Promise<RoomDto> {
    const response = await api.post<RoomDto>('rooms', requestEntity);
    return response.data;
  }

  async update(id: string, requestEntity: RoomRegisterDto): Promise<void> {
    await api.put(`rooms/${id}`, requestEntity);
  }

  async findById(id: string): Promise<RoomDto> {
    const response = await api.get<RoomDto>(`rooms/${id}`);
    return instanceDates(response.data);
  }

  findById$(id: string) {
    return ajax
      .get<RoomDto>(`${this.baseUrl}/${id}`)
      .pipe(map((value) => instanceDates(value.response)));
  }
}

const roomsService = new RoomsService(`${apiUrl}/rooms`);

export default roomsService;
