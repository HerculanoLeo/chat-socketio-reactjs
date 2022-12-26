import UserDto from '../../../users/model/dtos/user.dto';

export default class RoomDto {
  id!: string;
  name!: string;
  participants!: UserDto[];
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  constructor(entity?: RoomDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
