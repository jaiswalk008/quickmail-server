import Email from "src/email/email.entity";

export interface Sender {
    id: number;
    name: string;
    email: string;
  }
  
export  interface ReceivedEmail {
    id: number;
    subject: string;
    body: string;
    sender: Sender;
  }
  
export interface GetReceivedEmailsResponse {
    receivedEmails:ReceivedEmail[] ;
    email: string;
  }
  