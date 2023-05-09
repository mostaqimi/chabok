

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './services/local.strategy';
import { JwtStrategy } from './services/jwt.strategy';
import { UserRepository } from './repositories/user.repository';


@Module({
    imports: [
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
    ]),
      JwtModule.registerAsync({
        imports: [ConfigModule,],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET','qwer!@#$'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
          },
        })
      }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy,UserRepository ],
    controllers: [AuthController],
    exports:[]
  
  })
  export class AuthModule { }