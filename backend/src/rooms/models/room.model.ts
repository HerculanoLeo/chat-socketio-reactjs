import User from '../../users/model/user.model';

export default abstract class Room {
  id!: string;
  name!: string;
  participants!: User[];
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;
}
