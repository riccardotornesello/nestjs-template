import { Transform } from 'class-transformer';

export function TransformObjectId(): PropertyDecorator {
  return Transform((value) => {
    if ('value' in value && value.value) {
      return value.obj[value.key].toString();
    }
    return undefined;
  });
}
