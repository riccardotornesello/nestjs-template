import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Common modules
import { ConfigModule } from './common/config/config.module';
import { MongoModule } from './common/mongo/mongo.module';

@Module({
  imports: [ConfigModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
