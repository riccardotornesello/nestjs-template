import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { AuthToken } from './schemas';
import { User } from '../users/schemas';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(AuthToken.name) private authTokenModel: Model<AuthToken>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user || user.password !== pass) {
      return null;
    }

    return plainToInstance(User, user);
  }

  async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.create(username, email, password);
    return plainToInstance(User, user);
  }

  async generateUserJwt(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateAuthToken(user: any): Promise<AuthToken> {
    const token = new this.authTokenModel({
      userId: user._id,
      // TODO: generate random string
      token: this.jwtService.sign({ sub: user._id }),
    });
    await token.save();

    return plainToInstance(AuthToken, token);
  }

  async validateAuthToken(token: string): Promise<AuthToken> {
    // TODO: use hashing

    const authToken = await this.authTokenModel.findOne({ token });
    return plainToInstance(AuthToken, authToken);
  }
}
