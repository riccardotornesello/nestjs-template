import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type AuthTokenDocument = HydratedDocument<AuthToken>;

@Schema()
export class AuthToken {
  @Expose()
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Expose()
  @Prop({ type: String, required: true })
  secret: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
