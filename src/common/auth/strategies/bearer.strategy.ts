import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    // check if token is in format id:secret
    const tokenParts = token.split(':');
    if (tokenParts.length !== 2) {
      throw new UnauthorizedException();
    }

    const tokenId = tokenParts[0];
    const tokenSecret = tokenParts[1];

    const authToken = await this.authService.validateAuthToken(
      tokenId,
      tokenSecret,
    );
    if (!authToken) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(authToken.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
