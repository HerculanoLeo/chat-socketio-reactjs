export default class MessageRegisterDto {
  text!: string;

  roomId!: string;

  userId!: string;

  constructor(entity?: MessageRegisterDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
