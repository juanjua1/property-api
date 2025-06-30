import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  const corsOrigin = configService.get<string>('CORS_ORIGIN')?.split(',') || 
                    ['http://localhost:3001', 'http://localhost:3000'];
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  const seedService = app.get(SeedService);
  await seedService.seedProducts();
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  
  console.log('🚀 Property API is running on port', port);
}
bootstrap();
