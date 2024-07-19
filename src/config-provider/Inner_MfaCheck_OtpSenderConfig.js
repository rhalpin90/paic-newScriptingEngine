// Configuration Provider Node Script for an OTP Sender Node where the emailAttribute field is
// dynamically read from the otpContactValue on the sharedState. This will either be `mail` or
// `fr-attr-str1` depending if the user selected Primary or Alternate email for MFA.

var otpContactValue = String(nodeState.get('otpContactValue').asString());

config = {
    emailAttribute: otpContactValue,
    emailContent: {
        en: 'Hello, This is your One Time Password: \n {{OTP}}'
    },
    emailSubject: {
        en: 'One Time Passcode'
    },
    fromEmailAddress: 'noreply@utah.gov',
    hostName: 'smtp.sendgrid.net',
    hostPort: '587',
    password: String(systemEnv.getProperty('esv.sou.sendgrid.api.key')),
    smsGatewayImplementationClass: 'com.sun.identity.authentication.modules.hotp.DefaultSMSGatewayImpl',
    sslOption: 'NON_SSL',
    username: 'apikey'
};
