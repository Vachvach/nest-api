import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "src/dto/LoginUserDto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
    
    async register(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        try {
            const createdUser = await this.userService.create({...userDto, password: hashedPassword});
            createdUser.password = undefined;
            return createdUser;
        } catch(err) {
            throw new HttpException(err, HttpStatus.UNAUTHORIZED);
        }
    }

    async login(loginUser: LoginUserDto) {
        try {
            const user = await this.userService.findUser(loginUser.email);
            await this.verifyPassword(loginUser.password, user.password);
            user.password = undefined;
            return user;
        } catch(err) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async verifyPassword(plainText: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(plainText,hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    // async validateUser(email: string, pass: string) {
    //     const user = this.userService.findUser(email);
    //     if(user && (await user).password === pass) {
    //         const { ...res } = user;
    //         return res;
    //     }
    // }
}
