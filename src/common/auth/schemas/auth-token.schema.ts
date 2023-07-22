import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from '../../../schemas/base.schema';

export type AuthTokenDocument = HydratedDocument<AuthToken>;

@Schema()
export class AuthToken extends BaseSchema {
  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Expose()
  @Prop({ type: String, required: true })
  secret: string;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
