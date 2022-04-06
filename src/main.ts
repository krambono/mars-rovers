import { NestFactory } from '@nestjs/core';
import { CLI } from './adapters/primary/cli';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cli = app.get(CLI);
  await cli.execute('data.txt');
  await app.close();
}

bootstrap();
