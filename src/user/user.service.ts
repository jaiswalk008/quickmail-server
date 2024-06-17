import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import CreateUserDTO from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import UpdateUserDto from "./dto/update-user.dto";
import { ConfigService } from "@nestjs/config";
@Injectable()
export default class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService:JwtService , 
        private configService:ConfigService,
    ){}
    async signup(user:CreateUserDTO) : Promise<User>{
        const existinguser = await this.userRepository.findOne({where:{email:user.email}});
        if(existinguser){
            throw new ConflictException('user with this email already exist!');
        }
        try{
            const saltRounds =10;
            const hashedPassword = await bcrypt.hash(user.password,saltRounds);
            const res = await this.userRepository.save({...user , password:hashedPassword})
            return res;
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
    async login(user : UpdateUserDto): Promise<{token:string}>{
        const {email , password} = user;
        const existinguser = await this.userRepository.findOne({where:{email}});
        if(!existinguser){
            throw new NotFoundException('user with this email does not exist!');
        }
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if(isMatch){
            return {token:this.jwtService.sign({userId:existinguser.id} , {secret:this.configService.get<string>("JWT_SECRET_KEY")})}
        }
        else {
            throw new ForbiddenException('Invalid credentials');
        }
    }
    async findById(id:number): Promise<User>{
        return await this.userRepository.findOneOrFail({where:{id}});
    }
}