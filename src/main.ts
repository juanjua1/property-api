import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Habilitar CORS para el frontend
  const corsOrigin = configService.get<string>('CORS_ORIGIN')?.split(',') || 
                    ['http://localhost:3001', 'http://localhost:3000'];
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Poblar la base de datos con datos de ejemplo si está vacía
  const seedService = app.get(SeedService);
  await seedService.seedProducts();
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  
  console.log('🚀 Property API is running on port', port);
  console.log('📀 MongoDB URI:', configService.get<string>('MONGODB_URI'));
  console.log('📚 Available endpoints:');
  console.log('  POST /auth/register - Registrar usuario');
  console.log('  POST /auth/login - Iniciar sesión');
  console.log('  GET  /auth/profile - Obtener perfil');
  console.log('  GET  /products - Listar propiedades');
  console.log('  GET  /products/:id - Obtener propiedad');
  console.log('  POST /products - Crear propiedad');
  console.log('  GET  /users/favorites - Obtener favoritos');
  console.log('  POST /users/favorites/:id - Agregar favorito');
  console.log('  DELETE /users/favorites/:id - Quitar favorito');
}
bootstrap();
