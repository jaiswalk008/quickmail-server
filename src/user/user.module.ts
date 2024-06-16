import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./user.entity";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";
import UserService from "./user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot() , JwtModule.register({})],
    controllers:[UserController],
    providers:[UserService]
})
export class UserModule{}
