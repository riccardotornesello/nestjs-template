import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export interface StringFieldOptions {
  required?: boolean;
  example?: string;
  description?: string;
  minLength?: number;
  maxLength?: number;
}

export function StringField({
  required,
  example,
  description,
  minLength,
  maxLength,
}: StringFieldOptions = {}) {
  const decorators = [
    IsString(),
    ApiProperty({
      required,
      example,
      description,
      type: String,
    }),
  ];

  if (required) {
    decorators.push(IsNotEmpty());
  }

  if (minLength) {
    decorators.push(MinLength(minLength));
  }

  if (maxLength) {
    decorators.push(MaxLength(maxLength));
  }

  return applyDecorators(...decorators);
}
