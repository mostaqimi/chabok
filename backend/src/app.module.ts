import { Module } from '@nestjs/common';
import { AuthModule } from './auth-module/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_ADDRESS') + "/" + configService.get<string>('CHABOK_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
