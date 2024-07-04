import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Email from "./email.entity";
import EmailService from "./email.service";
import UserService from "src/user/user.service";
import User from "src/user/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import AuthGuard from "src/guards/authenticate.guard";
import SendEmail from "./sendEmail";

@Module({
    imports:[TypeOrmModule.forFeature([Email,User]),ConfigModule.forRoot() ,
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (configService: ConfigService) =>({
            secret: configService.get<string>('JWT_SECRET_KEY'),
        })
    })],
    controllers:[EmailController],
    providers:[EmailService,UserService, AuthGuard,SendEmail],
    
})
export class EmailModule{}