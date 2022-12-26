import UserDto from '../user/user.dto';

export default class RoomDto {
  id!: string;
  name!: string;
  participants!: UserDto[];
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version!: number;

  constructor(entity?: Partial<RoomDto>) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
