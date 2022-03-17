import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jsonWebToken from 'jsonwebtoken';
//import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard implements CanActivate {
  //constructor(private jwtService: JwtService) {}
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret-key';

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User do not authorisation',
        });
      }

      const user = jsonWebToken.verify(token, this.JWT_SECRET_KEY);

      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User do not authorisation' });
    }
  }
}
