import { IsNotEmpty } from 'class-validator';

export default class UserRegisterDto {
  @IsNotEmpty()
  username: string;
}
