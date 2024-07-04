declare module 'sib-api-v3-sdk' {
    export = sibApiV3Sdk;
  
    const sibApiV3Sdk: {
      ApiClient: {
        instance: {
          authentications: {
            'api-key': {
              apiKey: string;
            };
          };
        };
      };
      TransactionalEmailsApi: new () => {
        sendTransacEmail: (email: SendSmtpEmail) => Promise<any>;
      };
      SendSmtpEmail: new () => SendSmtpEmail;
    };
  
    interface SendSmtpEmail {
      sender: { name: string; email: string };
      to: Array<{ email: string }>;
      subject: string;
      htmlContent: string;
    }
  }
  