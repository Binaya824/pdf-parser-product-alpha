import nodemailer from 'nodemailer';
import config from '../../common/config/index'; 

class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: config.emailUser,
                pass: config.emailPass,
            },
        });
    }

    public async sendOTP(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export default new MailService();
