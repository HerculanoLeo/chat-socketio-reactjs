export default class RoomRegisterDto {
  name!: string;
  participants!: string[];

  constructor(entity?: RoomRegisterDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
