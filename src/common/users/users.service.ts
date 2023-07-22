import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findById(id: Types.ObjectId): Promise<User | undefined> {
    const user = await this.userModel.findById(id);
    return plainToInstance(User, user);
  }

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new this.userModel({ username, email, password });
    return user.save();
  }
}
