import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './app.config';

// Common modules
import { CacheModule } from './common/cache/cache.module';
import { AuthModule } from './common/auth/auth.module';
import { UsersModule } from './common/users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.url'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CacheModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
