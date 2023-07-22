import { Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { now, Types } from 'mongoose';
import { TransformObjectId } from '../decorators/serialization/object-id';

export abstract class BaseSchema {
  @Expose()
  @TransformObjectId()
  _id: Types.ObjectId;

  @Expose()
  @Prop({ default: now() })
  createdAt: Date;
}
