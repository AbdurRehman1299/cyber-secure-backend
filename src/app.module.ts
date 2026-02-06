import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    // 1. Initialize ConfigModule to read .env files
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Use forRootAsync so we can inject ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'my_secret_password'),
        database: configService.get<string>('DB_NAME', 'todo'),
        
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Be careful: in production, migrations are safer
        // 3. SSL is REQUIRED for Supabase/Aiven but usually FALSE for local
        ssl: configService.get('NODE_ENV') === 'production' 
             ? { rejectUnauthorized: false } 
             : false,
      }),
    }),

    ContactModule,
    UserModule,
    AdminModule,
    AuthModule,
    InquiriesModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}