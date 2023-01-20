import { Controller, Get, Post, Body, Res, UseGuards, Query, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { ValidationErrorDto } from 'src/shared/dto/validation-error.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialLogin } from './dto/credential-login.dto';
import { Response } from 'express';
import { MailService } from '../shared/mail/mail.service';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AuthUser } from './decorator/auth.gaurd';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { AccessTokenGuard } from './access-token/access-token.gaurd';
import { JwtService } from '@nestjs/jwt';
import { VerifyEmailDto } from './dto/verify-emaill.dto';
import { CredentailRegister } from './dto/credential-register.dto';
import { OtpService } from 'src/shared/otp/otp.service';


@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({ description: 'Bad request', type: ValidationErrorDto })
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService) { }

  @Post("login")
  async credentailLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() { email, password }: CredentialLogin) {
    const user = await this.userService.findOne({ email });
    if (user.email === email && await user.comparePassword(password)) {
      this.refreshTokenService.sendCookie(response, user);
      this.accessTokenService.sendCookie(response, user);
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  @Post("signup")
  @ApiConflictResponse({ description: 'Unable to create user' })
  async credentailSignUp(@Body() body: CredentailRegister) {
    const data = await this.userService.create(body);
    const token = this.jwtService.sign({ sub: data.id, email: data.email, role: data.role });
    return { message: "User created successfully" };
  }


  @UseGuards(AccessTokenGuard)
  @ApiCookieAuth()
  @Post("generate-otp")
  async generateOtp(@AuthUser() id: number) {
    const user = await this.userService.findOne({ id });
    const otp = await this.otpService.generateOtp(user.id);
    await this.mailService.sendVerificationMail(user.email, otp);
    return { message: "Otp sent successfully" };
  }

  @Post("verify-otp")
  @ApiCookieAuth()
  @UseGuards(AccessTokenGuard)
  async verifyOtp(@AuthUser() id: number, @Query() { otp }: VerifyEmailDto) {
    if (await this.otpService.verifyOtp(id, otp)) {
      return { message: "Otp verified successfully" };
    }
    throw new HttpException('Invalid otp', HttpStatus.UNAUTHORIZED);
  }


  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response)
    this.accessTokenService.clearCookie(response);
    return { message: "Logout successfully" };
  }

  @Get('refresh')
  @ApiCookieAuth()
  @UseGuards(RefreshTokenGuard)
  async refresh(@AuthUser() id: number, @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.findOne({ id });
    this.accessTokenService.sendCookie(response, user);
    return user;
  }


  @Get('personal-details')
  @UseGuards(AccessTokenGuard)
  me(@AuthUser() id: number) {
    return this.userService.findOne({ id });
  }





}
