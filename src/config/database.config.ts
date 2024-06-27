import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import Email from "src/email/email.entity";
import User from "src/user/user.entity";


class DBConfig {
    static getDBConfig (configService: ConfigService) : TypeOrmModuleOptions{
        console.log(configService.get("DB_USERNAME"))
        return {
            type:"mysql",
            host:configService.get("DB_HOST"),
            port:configService.get("DB_PORT"),
            username:configService.get("DB_USERNAME"),
            password:configService.get("DB_PASSWORD"),
            database:configService.get("DB_DATABASE"),
            entities:[User,Email],
            autoLoadEntities:true,
            synchronize:true,
            logging:true,
        }
    }
} 

export const dbConnection:TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    useFactory: async (configService:ConfigService)
    :Promise<TypeOrmModuleOptions> => DBConfig.getDBConfig(configService),
    inject:[ConfigService]
}