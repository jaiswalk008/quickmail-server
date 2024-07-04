import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sib from 'sib-api-v3-sdk';

@Injectable()
export default class SendEmail{
    constructor(private configService:ConfigService){}

    async sendEmail(senderEmail:string,senderName:string, receiverEmail:string,subject:string,body:string){

        const defaultClient = sib.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = this.configService.get('EMAIL_API_KEY');
        const apiInstance = new sib.TransactionalEmailsApi();
        let sendSmtpEmail = new sib.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
        
        const sender ={ name:senderName,email: senderEmail};
        sendSmtpEmail = {
            sender,
            to: [{
                email: receiverEmail
            }], 
        subject,
        htmlContent: body,
        };
        try {
            const res = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log(res)
            return {message:'email sent'}
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
       
    }
}