import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  const config = new DocumentBuilder()
  .setTitle('Auth example')
  .setDescription('The Authentication API description')
  .setVersion('1.0').addServer("/")
  .build();
const document = SwaggerModule.createDocument(app, config,);
SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
