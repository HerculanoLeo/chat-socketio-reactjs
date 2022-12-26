import { IsOptional } from 'class-validator';

export default class RoomSearchDto {
  @IsOptional()
  userId?: string;

  constructor(entity?: RoomSearchDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
