// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,);
  const hbs = require('hbs');

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'views'));

  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
    
  app.setViewEngine('hbs');
  let port = parseInt(process.env.PORT) || 5432;
  await app.listen(port);
}

bootstrap();

