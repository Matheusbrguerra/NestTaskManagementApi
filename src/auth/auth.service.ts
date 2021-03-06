import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    signUp(authCredentialsDto:AuthCredentialsDto){
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto:AuthCredentialsDto): Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)

        if(!username){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = { username }
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }
}
