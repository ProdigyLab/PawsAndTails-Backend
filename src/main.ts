import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
