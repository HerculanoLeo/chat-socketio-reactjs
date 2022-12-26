import { PartialType } from '@nestjs/mapped-types';

import UserRegisterDto from './user-register.dto';

export default class UserUpdateDto extends PartialType(UserRegisterDto) {}
