import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class ConfigModule {}
