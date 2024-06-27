import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './config/database.config';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }) , TypeOrmModule.forRootAsync(dbConnection),
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
