import nodemailer from 'nodemailer'
import mailConf from './config'

async function send(message,address){

    let transporter = nodemailer.createTransport({
        host:qq,
        port:587,
        secure:false,
        auth:{
            user:mailConf.user,
            pass:mailConf.passwd
        }
    });

    let mailOptions = {
        from:'',
        to:address,
        subject:'notify',
        text:message
    };

    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

}

export default send;