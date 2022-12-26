export default class UserDto {
  id!: string;
  username!: string;
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version!: number;

  constructor(entity?: Partial<UserDto>) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
