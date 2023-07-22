import { IsEmail, IsNotEmpty } from 'class-validator';

// TODO: better criteria

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
