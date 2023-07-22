import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export interface EmailFieldOptions {
  required?: boolean;
  example?: string;
  description?: string;
}

export function EmailField({
  required,
  example,
  description,
}: EmailFieldOptions = {}) {
  const decorators = [
    IsEmail(),
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

  return applyDecorators(...decorators);
}
