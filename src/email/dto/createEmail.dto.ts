import { IsEmail, IsString } from "class-validator";


export default class CreateEmailDTO {
    @IsString()
    subject:string;
    
    @IsEmail()
    receiver: string;
    @IsString()
    body:string;
    
}