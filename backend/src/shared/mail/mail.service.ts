import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private mailService: MailerService,
        private configService: ConfigService) { }

    sendVerificationMail(to: string, otp: string) {
        try {
            return this.mailService.sendMail({
                to,
                subject: 'Please confirm your email',
                text: "Welcome to my app",
                html: `
                <h1>Welcome to my app</h1>
                <p>Copy and paste the code below to verify your email</p>
                <button style="background-color:blue;color:white;padding:10px 20px;border-radius:5px;" disabled>
                    ${otp}
                </button>
                <footer style="background-color:yellow;width: fit-content;">
                    <p style="color:red; font-weight: bold;">
                        If you did not create an account, please ignore this email.
                    </p>
                </footer>
                `,
            })
        } catch (error) {
            throw new HttpException("Unable to send email", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
