import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { jwtConstants } from './auth.constants';
import {
  LocalStrategy,
  JwtStrategy,
  GoogleStrategy,
  BearerStrategy,
} from './strategies';
import { AuthToken, AuthTokenSchema } from './schemas';

// Dependencies
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: AuthToken.name, schema: AuthTokenSchema },
    ]),
  ],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    BearerStrategy,
  ],
})
export class AuthModule {}
