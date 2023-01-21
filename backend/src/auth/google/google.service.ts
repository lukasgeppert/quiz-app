import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class GoogleService {
  client: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.client = new google.auth.OAuth2(
      this.configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_ID'),
      this.configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_SECRET'),
    );
  }

  async getUserDetails(accessToken: string) {
    this.client.setCredentials({ access_token: accessToken });

    const oauth2 = google.oauth2({
      auth: this.client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();
    const {
      email,
      family_name: lastName,
      given_name: firstName,
      picture: image,
    } = data;
    const user: CreateUserDto = {
      email,
      firstName,
      lastName,
      image,
      emailVerified: true,
    };
    return user;
  }

  async getUserDetailsFromIdToken(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const {
      email,
      family_name: lastName,
      given_name: firstName,
      picture: image,
    } = payload;
    const user: CreateUserDto = {
      email,
      firstName,
      lastName,
      image,
      emailVerified: true,
    };
    return user;
  }
}
