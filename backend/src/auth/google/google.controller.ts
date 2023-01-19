import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenService } from '../access-token/access-token.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { GoogleGaurd } from './google.gaurd';
import { Request, Response } from 'express';
import { GoogleService } from './google.service';

@Controller('auth/google')
@ApiTags('auth/google')
export class GoogleController {
  constructor(
    private readonly userService: UsersService,
    private readonly googleAuthService: GoogleService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService) { }
    
  @Get('backend-login')
  @UseGuards(GoogleGaurd)
  async googleAuth(@Req() req: any) { }


  @UseGuards(GoogleGaurd)
  @Get('callback')
  async googleCallback(
    @Req() req: { accessToken: string },
    @Res({ passthrough: true }) res: Response) {
    const { accessToken } = req;
    const userData = await this.googleAuthService.getUserDetails(accessToken);
    let user = await this.userService.findOne({ email: userData.email });
    if (!user)
      user = await this.userService.create(userData);

    this.accessTokenService.sendCookie(res, user);
    this.refreshTokenService.sendCookie(res, user);
    return user;
  }

}
