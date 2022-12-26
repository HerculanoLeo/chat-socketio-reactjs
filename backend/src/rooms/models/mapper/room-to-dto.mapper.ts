import Mapper from '../../../common/mapper';
import Room from '../room.model';
import RoomDto from '../dtos/room.dto';
import { Injectable } from '@nestjs/common';
import UserToDtoMapper from '../../../users/model/mapper/user-to-dto.mapper';

@Injectable()
export default class RoomToDtoMapper implements Mapper<Room, RoomDto> {
  private readonly userToDtoMapper = new UserToDtoMapper();

  map(source?: Room): RoomDto {
    if (source) {
      return new RoomDto({
        id: source.id,
        name: source.name,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        version: source.version,
        participants: this.userToDtoMapper.mapList(source.participants),
      });
    }
    return undefined;
  }

  mapList(sources?: Room[]): RoomDto[] {
    return sources?.map((s) => this.map(s)) ?? [];
  }
}
