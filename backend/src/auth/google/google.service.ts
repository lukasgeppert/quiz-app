import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class GoogleService {
    constructor(
        private configService: ConfigService,
    ) { }

    async getUserDetails(accessToken: string) {
        const client = new google.auth.OAuth2(
            this.configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_ID'),
            this.configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_SECRET'),
        );

        client.setCredentials({ access_token: accessToken });

        const oauth2 = google.oauth2({
            auth: client,
            version: 'v2',
        });

        const { data } = await oauth2.userinfo.get();
        const {email, family_name: lastName, given_name: firstName, picture: image} = data;
        const user: CreateUserDto =  {
            email,
            firstName,
            lastName,
            image,
            emailVerified: true,
        };
        return user;
    }
}