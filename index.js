// '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'
var Brevo = require('@getbrevo/brevo');
var defaultClient = Brevo.ApiClient.apiInstance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['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'];
apiKey.apiKey = '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';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

// Configure API key authorization: partner-key
var partnerKey = defaultClient.authentications['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'];
partnerKey.apiKey = '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';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix = 'Token';

var apiInstance = new Brevo.TransactionalEmailsApi();

var sendSmtpEmail = new Brevo.SendSmtpEmail({

     "sender":{ "email":"brevo@brevo.com", "name":"Brevo"},
     "subject":"This is my default subject line",
     "htmlContent":"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
     "params":{
        "greeting":"This is the default greeting",
        "headline":"This is the default headline"
     },
   "messageVersions":[
     //Definition for Message Version 1 
     {
         "to":[
            {
               "email":"evjk3360@gmail.com",
               "name":"Bob Anderson"
            },
           
         ],
         "htmlContent":"<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
         "subject":"We are happy to be working with you"
      },
     
    //  // Definition for Message Version 2
    //   {
    //      "to":[
    //         {
    //            "email":"jim@example.com",
    //            "name":"Jim Stevens"
    //         },
    //         {
    //            "email":"mark@example.com",
    //            "name":"Mark Payton"
    //         },
    //         {
    //            "email":"andrea@example.com",
    //            "name":"Andrea Wallace"
    //         }
    //      ]
    //   }
   ]

}); // SendSmtpEmail | Values to send a transactional email

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});
