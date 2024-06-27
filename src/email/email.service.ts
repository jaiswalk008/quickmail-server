import { Injectable } from "@nestjs/common";
import CreateEmailDTO from "./dto/createEmail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import Email from "./email.entity";
import { Repository } from "typeorm";
import User from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export default class EmailService{
    constructor(
        @InjectRepository(Email)
        private emailRepository:Repository<Email>,
        @InjectRepository(User)
        private userRepository : Repository<User>,
        
    ){
        
    }

    async createEmail(email:any):Promise<Email>{
        const {subject,body,sender} = email;
        const receiver:User = await this.userRepository.findOne({where:{email:email.receiver}})
        const newEmail:Email  = await this.emailRepository.save({
            subject,body,sender , receiver
        })
        return newEmail;

    }
}