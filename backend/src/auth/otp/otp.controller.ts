import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/shared/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { CreateOtpDto } from './dto/otp.dto';
import { OtpService } from './otp.service';

@Controller('auth/otp')
@ApiTags('otp')
export class OtpController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  @ApiCookieAuth()
  @Post('generate')
  async generateOtp(@Body() { email} : CreateOtpDto) {
    const user = await this.userService.findOne({ email });
    if (!user.id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const otp = await this.otpService.generateOtp(user.id);
    await this.mailService.sendVerificationMail(user.email, otp);
    return { message: 'Otp sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body() { email} : CreateOtpDto, @Headers('otp') otp: string) {
    const user = await this.userService.findOne({ email });
    if (!user.id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (await this.otpService.verifyOtp(user.id, otp)) {
      return { message: 'Otp verified successfully' };
    }
    throw new HttpException('Invalid otp', HttpStatus.UNAUTHORIZED);
  }
}
