import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
    @InjectModel(AuthToken.name) private authTokenModel: Model<AuthToken>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }

    const passMatch = await bcrypt.compare(pass, user.password);
    if (!passMatch) {
      return null;
    }

    return plainToInstance(User, user);
  }

  async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const passHash = await bcrypt.hash(
      password,
      this.configService.get<number>('crypto.bcryptRounds'),
    );
    const user = await this.usersService.create(username, email, passHash);
    return plainToInstance(User, user);
  }

  async generateUserJwt(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateAuthToken(user: any): Promise<AuthToken> {
    const token = crypto.randomBytes(20).toString('hex');
    const tokenHash = await bcrypt.hash(
      token,
      this.configService.get<number>('crypto.bcryptRounds'),
    );

    const authToken = new this.authTokenModel({
      userId: user._id,
      secret: tokenHash,
    });
    await authToken.save();

    return plainToInstance(AuthToken, token);
  }

  async validateAuthToken(
    id: string,
    token: string,
  ): Promise<AuthToken | null> {
    const authToken = await this.authTokenModel.findById(id);
    if (!authToken) {
      return null;
    }

    const tokenMatch = await bcrypt.compare(token, authToken.secret);
    if (!tokenMatch) {
      return null;
    }

    return plainToInstance(AuthToken, authToken);
  }
}
