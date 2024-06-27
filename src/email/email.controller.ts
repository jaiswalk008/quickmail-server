import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import CreateEmailDTO from "./dto/createEmail.dto";
import EmailService from "./email.service";
import AuthGuard from "src/guards/authenticate.guard";

@Controller()
export class EmailController{
    constructor(private emailService:EmailService){}

    @UseGuards(AuthGuard)
    @Post('/email')
    sendEmail(@Body (ValidationPipe) email: CreateEmailDTO,
     @Req() request:any){
        return this.emailService.createEmail({...email, sender:request.user});
    
    }
}