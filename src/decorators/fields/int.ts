import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export interface IntFieldOptions {
  required?: boolean;
  example?: number;
  description?: string;
  min?: number;
  max?: number;
}

export function IntField({
  required,
  example,
  description,
  min,
  max,
}: IntFieldOptions = {}) {
  const decorators = [
    IsInt(),
    ApiProperty({
      required,
      example,
      description,
      type: Number,
    }),
  ];

  if (required) {
    decorators.push(IsNotEmpty());
  }

  if (min) {
    decorators.push(Min(min));
  }

  if (max) {
    decorators.push(Max(max));
  }

  return applyDecorators(...decorators);
}
