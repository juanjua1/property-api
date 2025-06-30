import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
// import { SeedModule } from './seed/seed.module'; // Temporarily disabled for debugging

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = process.env.MONGODB_URI || 
                   configService.get<string>('MONGODB_URI') || 
                   configService.get<string>('DATABASE_URL');
        
        if (!uri) {
          throw new Error('MongoDB URI not found in environment variables');
        }
        
        console.log('🔌 Connecting to MongoDB...');
        return { 
          uri,
          retryWrites: true,
          w: 'majority'
        };
      },
      inject: [ConfigService],
    }),
    
    UsersModule,
    AuthModule,
    ProductsModule,
    // SeedModule, // Temporarily disabled
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}