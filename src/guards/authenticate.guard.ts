import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
 
import UserService from "src/user/user.service";

@Injectable()
export default class AuthGuard implements CanActivate{
    constructor(
        private configService:ConfigService,
        private jwtService:JwtService , 
        private userService:UserService
    ){}
    
    async canActivate(context: ExecutionContext): 
    Promise<boolean>  {
        const request = context.switchToHttp().getRequest<Request>();
        
        const token = request.headers.authorization as string;
        
        if(!token) return false;
        try {
            const payload = this.jwtService.verify(token)
            const existingUser = await this.userService.findById(payload.userId);
            if(!existingUser) return false;
            request.user = existingUser;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }
}