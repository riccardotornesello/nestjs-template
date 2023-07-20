import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CacheInterceptor } from '../interceptors/cache.interceptor';

export type CacheOptions = {
  ttl?: number;
  key?: string;
};

export function Cache({ ttl, key }: CacheOptions = {}): MethodDecorator {
  const decorators = [UseInterceptors(CacheInterceptor)];

  if (ttl) {
    decorators.push(CacheTTL(ttl));
  }
  if (key) {
    decorators.push(CacheKey(key));
  }

  return applyDecorators(...decorators);
}
