import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function validationExceptionFactory(errors: ValidationError[]): any {
  const details = errors
    .map((error) =>
      Object.entries(error.constraints).map(([key, value]) => ({
        property: error.property,
        value: error.value,
        code: key,
        message: value,
      })),
    )
    .flat();

  return new BadRequestException(details);
}
