import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Headers,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationErrorDto } from 'src/shared/dto/validation-error.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialLogin } from './dto/credential-login.dto';
import { Response } from 'express';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AuthUser } from './decorator/auth.gaurd';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { AccessTokenGuard } from './access-token/access-token.gaurd';
import { CredentailRegister } from './dto/credential-register.dto';
import { OtpService } from './otp/otp.service';

@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({ description: 'Bad request', type: ValidationErrorDto })
export class AuthController {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UsersService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('login')
  async credentailLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() { email, password }: CredentialLogin,
  ) {
    const user = await this.userService.findOne({ email });
    if (user.email === email && (await user.comparePassword(password))) {
      this.refreshTokenService.sendCookie(response, user);
      this.accessTokenService.sendCookie(response, user);
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  @Post('register')
  @ApiConflictResponse({ description: 'Unable to create user' })
  async credentailSignUp(@Body() body: CredentailRegister) {
    const _ = await this.userService.create(body);
    return { message: 'User created successfully' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response);
    this.accessTokenService.clearCookie(response);
    return { message: 'Logout successfully' };
  }

  @Get('refresh')
  @ApiCookieAuth()
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @AuthUser() id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ id });
    this.accessTokenService.sendCookie(response, user);
    return user;
  }

  @Get('personal-details')
  @UseGuards(AccessTokenGuard)
  me(@AuthUser() id: number) {
    return this.userService.findOne({ id });
  }

  @Post('change-password')
  async changePassword(@Body() {email, password}: CredentialLogin,  @Headers('otp') otp: string) {
    console.log(email, password, otp);
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (await this.otpService.verifyOtp(user.id, otp)) {
      return await this.userService.update(user.id, { password });
    }
    throw new HttpException('Invalid otp', HttpStatus.UNAUTHORIZED);
  }

  
}
