import { IsNotEmpty, IsUUID } from 'class-validator';

export default class MessageRegisterDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
