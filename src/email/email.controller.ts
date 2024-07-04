import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import CreateEmailDTO from "./dto/createEmail.dto";
import EmailService from "./email.service";
import AuthGuard from "src/guards/authenticate.guard";

@Controller()
export class EmailController{
    constructor(private emailService:EmailService){}

    @UseGuards(AuthGuard)
    @Post('/email')
    sendEmail(@Body() email: any,
     @Req() request:any){
        console.log(email)
        return this.emailService.createEmail({...email, sender:request.user});
    }

    @UseGuards(AuthGuard)
    @Get('/inbox')
    getReceivedEmails(@Req() request:any){
        return this.emailService.getReceivedEmails(+request.user.id);
    }
    @UseGuards(AuthGuard)
    @Get('/sent')
    getSentEmails(@Req() request:any){
        return this.emailService.getSentEmails(+request.user.id);
    }
    
    @Patch('/email/:id')
    markAsRead(@Param('id') id:string){
        return this.emailService.markEmailAsRead(+id); 
    }

}