import { Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  INestApplication,
} from '@nestjs/common';

export function configureApp(app: INestApplication<any>) {
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );
}
