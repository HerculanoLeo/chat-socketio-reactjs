export default class MessageDto {
  id!: string;
  text!: string;
  username!: string;
  userId!: string;
  roomId!: string;
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version!: number;

  constructor(entity?: MessageDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
