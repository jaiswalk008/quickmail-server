import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './config/database.config';
import { UserModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }) , TypeOrmModule.forRootAsync(dbConnection),
    UserModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
