const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: 'mail.server.in',
    port: 587,
    auth: {
        user: 'automail@server.in',
        pass: 'password'
    },            
    authMethod:'NTLM',
    secure:false,
    tls: {rejectUnauthorized: false},
    debug:true
});

module.exports = smtpTransport;