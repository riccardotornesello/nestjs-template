import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthTokenDocument = HydratedDocument<AuthToken>;

@Schema()
export class AuthToken {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  token: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
