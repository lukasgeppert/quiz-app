import { Controller, Get, Post, Body, Res, UseGuards, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { ValidationErrorDto } from 'src/shared/dto/validation-error.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialLogin } from './dto/credential-login.dto';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { Payload } from './entities/auth.entity';
import { AuthUser } from './decorator/auth.gaurd';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { AccessTokenGuard } from './access-token/access-token.gaurd';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VerifyEmailDto } from './dto/verify-emaill.dto';


@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({ description: 'Bad request', type: ValidationErrorDto })
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService) { }


  @Post("login")
  async credentailLogin(
    @Res({ passthrough: true }) response: Response,
    @Body() credentail: CredentialLogin) {
    const user = await this.userService.validateUserCredentail(credentail.email, credentail.password);
    this.sendToken(response, user);
    return user;
  }


  @Post("signup")
  @ApiConflictResponse({ description: 'Unable to create user' })
  async credentailSignUp(@Body() body: CredentialLogin) {
    const data = await this.userService.create(body);
    const token = this.jwtService.sign({ sub: data.id, email: data.email, role: data.role });
    this.mailService.sendVerificationMail(data.email, token);
    return {
      message: "User created successfully"
    };
  }

  @Get('verify-email')
  async verifyEmail(@Query() data: VerifyEmailDto) {
    const { sub } = this.jwtService.verify(data.token);
    await this.userService.verifyEmail(sub);


  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response)
    this.accessTokenService.clearCookie(response);
  }

  @Get('refresh')
  @ApiCookieAuth()
  @UseGuards(RefreshTokenGuard)
  async refresh(@AuthUser() id: number, @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.findOne(id);
    this.sendToken(response, user);
    return user;
  }


  @Get('me')
  @UseGuards(AccessTokenGuard)
  me(@AuthUser() id: number) {
    return this.userService.findOne(id);
  }

  sendToken(
    response: Response,
    { email, id: sub, role }: UserEntity) {
    const token: Payload = { email, sub, role };
    this.accessTokenService.sendCookie(response, token);
    this.refreshTokenService.sendCookie(response, token);
  }

}
