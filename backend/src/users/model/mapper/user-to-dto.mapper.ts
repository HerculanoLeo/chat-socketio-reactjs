import { Injectable } from '@nestjs/common';

import User from '../user.model';
import UserDto from '../dtos/user.dto';
import Mapper from '../../../common/mapper';

@Injectable()
export default class UserToDtoMapper implements Mapper<User, UserDto> {
  map(source?: User): UserDto {
    if (source) {
      return new UserDto({
        id: source.id,
        username: source.username,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        version: source.version,
      });
    }
    return undefined;
  }

  mapList(sources?: User[]): UserDto[] {
    return sources?.map((value) => this.map(value)) ?? [];
  }
}
