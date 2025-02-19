import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './libs';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from 'src/libs/internal/winston.logger';
import { MockDataService } from './mock-data/mock-data.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: WinstonLogger,
    }),
  });
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: process.env.CORS_HEADERS || 'Content-Type,Authorization',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.ADD_MOCK_DATA === 'true') {
    const mockDataService = app.get(MockDataService);
    await mockDataService.initializeMockData();
  }

  await app.listen(`${process.env.HOST_PORT}`);

  WinstonLogger.info(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
  );
}
bootstrap();
