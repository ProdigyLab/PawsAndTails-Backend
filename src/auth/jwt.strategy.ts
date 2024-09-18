import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '9dd836828352d87789c5e0d10f89c63282417e46', // Use the same secret as in JwtModule
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.intId,
      email: payload.email,
      roleId: payload.roleId,
      organizationId: payload.organizationId,
    };
  }
}
