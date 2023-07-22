import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // TODO: create base class witn _id
  // TODO: transform object id

  @Expose()
  _id: Types.ObjectId;

  @Expose()
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Expose()
  @Prop({ type: String, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
