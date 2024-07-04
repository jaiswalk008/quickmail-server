import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Email from "./email.entity";
import { Repository } from "typeorm";
import User from "src/user/user.entity";
import { GetSentEmailsResponse } from "src/types/sentEmails.interface";
import { GetReceivedEmailsResponse } from "src/types/receivedEmails.interface";
import SendEmail from "./sendEmail";


@Injectable()
export default class EmailService{
    constructor(
        @InjectRepository(Email)
        private emailRepository:Repository<Email>,
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private sendEmailService:SendEmail
    ){
        
    }

    async createEmail(email:any):Promise<Email>{
        const {subject,body,sender} = email;
        const receiver:User = await this.userRepository.findOne({where:{email:email.receiver}})

        try {
          const res= await this.sendEmailService.sendEmail(sender.email,sender.name,receiver.email,
            subject,body
          )
          if(res.message==='email sent'){
            const newEmail:Email  = await this.emailRepository.save({
                subject,body,sender , receiver
            })
           

            return newEmail;
          }
            
        } catch (error) {
            throw new Error(error)
        }

    }
    async getReceivedEmails(userId: number): Promise<GetReceivedEmailsResponse> {
      const res = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['receivedEmails', 'receivedEmails.sender'],
      });
    
      return {
        receivedEmails: res.receivedEmails.map(e => ({
          ...e,
          sender: {
            id: e.sender.id,
            name: e.sender.name,
            email: e.sender.email,
          }
        })),
       
        email: res.email
      };
    }
    async getSentEmails(userId: number): Promise<GetSentEmailsResponse> {
      const res = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['sentEmails', 'sentEmails.receiver'],
      });

      return {
        sentEmails: res.sentEmails.map(e => ({
          ...e,
          receiver: {
            id: e.receiver.id,
            name: e.receiver.name,
            email: e.receiver.email,
          }
        })),

        email: res.email
      };
    }

    async markEmailAsRead(emailId:number) : Promise<{message:string}>{
      try {
        await this.emailRepository.update(emailId,{isRead:true});
        return {message:"Email marked as read"}
      } catch (error) {
        console.log(error)
      }      
    }
    
}