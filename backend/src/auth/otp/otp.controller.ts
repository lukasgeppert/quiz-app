import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/shared/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from '../access-token/access-token.gaurd';
import { AuthUser } from '../decorator/auth.gaurd';
import { OtpService } from './otp.service';

@Controller('auth/otp')
@ApiTags('otp')
export class OtpController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @ApiCookieAuth()
  @Post('generate-otp')
  async generateOtp(@AuthUser() id: number) {
    const user = await this.userService.findOne({ id });
    const otp = await this.otpService.generateOtp(user.id);
    await this.mailService.sendVerificationMail(user.email, otp);
    return { message: 'Otp sent successfully' };
  }

  @Post('verify-otp')
  @ApiCookieAuth()
  @UseGuards(AccessTokenGuard)
  async verifyOtp(@AuthUser() id: number, @Headers('otp') otp: string) {
    if (await this.otpService.verifyOtp(id, otp)) {
      return { message: 'Otp verified successfully' };
    }
    throw new HttpException('Invalid otp', HttpStatus.UNAUTHORIZED);
  }
}
