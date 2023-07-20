import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  CacheInterceptor as NodeCacheInterceptor,
  CACHE_KEY_METADATA,
} from '@nestjs/cache-manager';

@Injectable()
export class CacheInterceptor extends NodeCacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // TODO: manage authentication

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
}
