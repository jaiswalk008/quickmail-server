import {IsString , IsNotEmpty , IsEmail} from 'class-validator'
export default class CreateUserDTO {
     @IsNotEmpty()
     @IsString()
     name:string;

     @IsEmail()
     email:string;

     @IsString()
     @IsNotEmpty()
     password:string;

}