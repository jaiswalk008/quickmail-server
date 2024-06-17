import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
 
import UserService from "src/user/user.service";


export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService , 
        private configService:ConfigService,
        private userService:UserService
    ){}
    async canActivate(context: ExecutionContext): 
    Promise<boolean>  {

        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.token as string;
        if(!token) return false;
        try {
            const payload = this.jwtService.verify(token,{
                secret:this.configService.get('JWT_SECRET_KEY')
            })
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