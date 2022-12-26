import { IsOptional, IsUUID } from 'class-validator';

export default class MessageSearchDto {
  @IsUUID()
  @IsOptional()
  roomId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  constructor(entity?: MessageSearchDto) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
