import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

let app: any;

async function createApp() {
  if (!app) {
    const expressApp = express();
    
    try {
      const nestApp = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
        { 
          logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'log']
        }
      );

      const configService = nestApp.get(ConfigService);
      
      nestApp.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }));
      
      // Handle CORS_ORIGIN from environment
      const corsOriginEnv = process.env.CORS_ORIGIN || configService.get<string>('CORS_ORIGIN');
      const corsOrigin = corsOriginEnv?.split(',') || 
                        ['http://localhost:3001', 'http://localhost:3000'];
      
      nestApp.enableCors({
        origin: corsOrigin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      });

      // Skip seeding in production serverless environment
      if (process.env.NODE_ENV !== 'production') {
        try {
          const { SeedService } = await import('../src/seed/seed.service');
          const seedService = nestApp.get(SeedService);
          await seedService.seedProducts();
        } catch (error) {
          console.log('Seed service error (expected in serverless):', error.message);
        }
      }

      await nestApp.init();
      app = expressApp;
      
      console.log('✅ NestJS app initialized successfully');
      console.log('🌍 Environment:', process.env.NODE_ENV);
      console.log('🔗 CORS Origins:', corsOrigin);
      
    } catch (error) {
      console.error('❌ Error creating NestJS app:', error);
      throw error;
    }
  }
  return app;
}

export default async function handler(req: any, res: any) {
  try {
    const server = await createApp();
    return server(req, res);
  } catch (error) {
    console.error('❌ Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}
