import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, email: string, password: string) {
    const user = await this.usersService.create(username, email, password);
    return this.login(user);
  }

  async validateToken(token: string): Promise<AuthToken> {
    // TODO: use hashing

    const authToken = await this.authTokenModel.findOne({ token });
    return authToken;
  }
}
