import User from '../../users/model/user.model';
import Room from '../../rooms/models/room.model';

export default abstract class Message {
  id!: string;
  text!: string;
  user!: User;
  room!: Room;
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version!: number;
}
