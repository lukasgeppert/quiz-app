import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {

    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_ID'),
            clientSecret: configService.getOrThrow('GOOGLE_PROVIDER_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('GOOGLE_PROVIDER_CALLBACK_URL'),
            scope: ["email", "profile"],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const user: CreateUserDto = {
            email,
            password: id,
            firstName: displayName,
            lastName: displayName,
            image: photos[0].value,
        };
        done(null, user);
    }
}