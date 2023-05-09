import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';


@Injectable()
export class AuthService {

    constructor(
        public readonly jwtService: JwtService,
        public readonly userRepository: UserRepository

    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.findUser(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }



    async login(user) {

        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    async findUser(username: string): Promise<any> {
        return await this.userRepository.findUser(username)
    }


    async registerUser() {

        const user = await this.userRepository.findUser('chabok')

        if (!user) {

            await this.userRepository.createUser()

        }

    }
}
