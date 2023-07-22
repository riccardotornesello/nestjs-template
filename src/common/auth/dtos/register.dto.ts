import { StringField, EmailField } from '../../../decorators/fields';

// TODO: better criteria for password

export class RegisterDto {
  @EmailField({ required: true })
  email: string;

  @StringField({ required: true, minLength: 4, maxLength: 30 })
  username: string;

  @StringField({ required: true, minLength: 8, maxLength: 30 })
  password: string;
}
