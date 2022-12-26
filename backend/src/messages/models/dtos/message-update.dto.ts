import { IsNotEmpty } from 'class-validator';

export default class MessageUpdateDto {
  @IsNotEmpty()
  text!: string;
}
