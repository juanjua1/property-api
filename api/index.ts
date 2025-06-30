import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Import modules directly
import { AppModule } from '../src/app.module';

let cachedApp: any = null;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  console.log('🚀 Starting NestJS app creation...');
  
  try {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    console.log('📦 Creating NestJS application...');
    const nestApp = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn', 'log']
    });

    console.log('🔧 Setting up pipes and CORS...');
    
    nestApp.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    
    // Get CORS origins from environment
    const corsOriginEnv = process.env.CORS_ORIGIN;
    const corsOrigin = corsOriginEnv 
      ? corsOriginEnv.split(',').map(origin => origin.trim())
      : ['http://localhost:3001'];
    
    console.log('🌐 CORS Origins:', corsOrigin);
    
    nestApp.enableCors({
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    console.log('⚡ Initializing application...');
    await nestApp.init();
    
    cachedApp = expressApp;
    console.log('✅ NestJS app initialized successfully');
    
    return cachedApp;
  } catch (error) {
    console.error('❌ Error creating NestJS app:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  console.log(`📨 ${req.method} ${req.url}`);
  
  try {
    const app = await createApp();
    return app(req, res);
  } catch (error) {
    console.error('❌ Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
