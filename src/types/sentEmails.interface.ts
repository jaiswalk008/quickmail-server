import Email from "src/email/email.entity";

export interface Receiver {
    id: number;
    name: string;
    email: string;
  }
  
export  interface SentEmail {
    id: number;
    subject: string;
    body: string;
    receiver: Receiver;
  }
  
export interface GetSentEmailsResponse {
    sentEmails:SentEmail[] ;
    email: string;
  }
  