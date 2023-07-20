import { Global, Module } from '@nestjs/common';
import { CacheModule as MongoCacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    MongoCacheModule.register({
      isGlobal: true,
    }),
  ],
})
export class CacheModule {}
