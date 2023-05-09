import { Injectable } from "@nestjs/common";
import { PassportStrategy,AuthGuard } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTFromCookie,
              ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET','qwer!@#$'),
        })
    }

    private static extractJWTFromCookie(req: Request): string | null {


        if (req.cookies && req.cookies.access_token) {
          return req.cookies.access_token;
        }
        return null;
      }

    async validate(payload: any): Promise<any> {

        return { userId: payload.sub, username: payload.username };

    }

}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}