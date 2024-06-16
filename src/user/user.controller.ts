import { Body, Controller, Post, ValidationPipe} from "@nestjs/common";
import CreateUserDTO from "./dto/create-user.dto";
import UserService from "./user.service";
import UpdateUserDto from "./dto/update-user.dto";

@Controller()
export class UserController{
    constructor(private  userService:UserService){}
    @Post('/signup')
    signup(@Body(ValidationPipe) user:CreateUserDTO){
        return this.userService.signup(user);
    }

    @Post('/login')
    login(@Body(ValidationPipe) user:UpdateUserDto){
        return this.userService.login(user);
    }
}