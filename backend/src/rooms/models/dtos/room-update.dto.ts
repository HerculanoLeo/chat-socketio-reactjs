import { PartialType } from '@nestjs/mapped-types';
import RoomRegisterDto from './room-register.dto';
import { IsNotEmpty } from 'class-validator';

export default class RoomUpdateDto extends PartialType(RoomRegisterDto) {
  @IsNotEmpty()
  name: string;
}
