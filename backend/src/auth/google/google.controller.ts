import { Controller, Get, Headers, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AccessTokenService } from '../access-token/access-token.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { GoogleGaurd } from './google.gaurd';
import { Response } from 'express';
import { GoogleService } from './google.service';

@Controller('auth/google')
@ApiTags('google')
export class GoogleController {
  constructor(
    private readonly userService: UsersService,
    private readonly googleAuthService: GoogleService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Get('backend-login')
  @UseGuards(GoogleGaurd)
  async googleAuth(@Req() req: any) {}

  @UseGuards(GoogleGaurd)
  @Get('callback')
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.googleAuthService.getUserDetails(
      req.user.accessToken,
    );
    let user = await this.userService.findOne({ email: userData.email });
    if (!user) user = await this.userService.create(userData);

    this.accessTokenService.sendCookie(res, user);
    this.refreshTokenService.sendCookie(res, user);
    return user;
  }

  @Get('login')
  async googleAuthFrontend(
    @Headers('idToken') idToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.googleAuthService.getUserDetailsFromIdToken(
      idToken,
    );
    let user = await this.userService.findOne({ email: userData.email });
    if (!user) user = await this.userService.create(userData);
    this.accessTokenService.sendCookie(res, user);
    this.refreshTokenService.sendCookie(res, user);
    return user;
  }
}
