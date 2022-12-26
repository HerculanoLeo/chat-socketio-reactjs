import { IsNotEmpty, IsUUID } from 'class-validator';

export default class RoomRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsUUID('all', { each: true })
  participants: string[];
}
