import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private mailService: MailerService,
        private configService: ConfigService) { }

    sendVerificationMail(to: string, token: string) {
        const verificationUrl = `${this.configService.getOrThrow('BACKEND_URL')}/verify-email?token=${token}`;
        try {
            return this.mailService.sendMail({
                to,
                subject: 'Please confirm your email',
                text: "Welcome to my app",
                html: `
                <h1>Welcome to my app</h1>
                <p>Click on the link below to verify your email</p>
                <button style="height:50px;width:100px;background-color: green;">
                    <a style="text-decoration:none; color:white;font-weight: bold;" href="${verificationUrl}">Verify Email</a>
                </button>
                <p>Or copy and paste the link below into your browser</p>
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
