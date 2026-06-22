import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mysecretkey123',
        })
    }

    async validate(payload: any) {
        console.log('jwt', payload);
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        }
    }
}