// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from 'passport-google-oauth2';
// import { CreateUserDto } from "src/users/dto/create-user.dto";

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
//     constructor(private readonly configService: ConfigService) {
//         super({
//             clientID: configService.get("GOOGLE_CLIENT_ID"),
//             clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
//             callbackURL: configService.get("GOOGLE_CALLBACK_URL"),
//             scope: ["email", "profile"],
//         });
//     }

//     async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
//         const {name, emails, photos, } = profile;
//         const user: CreateUserDto = {
//             name: `${name.givenName || ''} ${name.familyName || ''}`,
//             email: emails[0].value as string,
//             image: photos[0].value as string,
//         };
//         done(null, user);
//     }
// }