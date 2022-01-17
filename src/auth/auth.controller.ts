import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from "src/dto/LoginUserDto";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body()userData: CreateUserDto) {
        return this.authService.register(userData);
    }

    @Post('/login')
    async login(@Body()loginUser: LoginUserDto) {
        return this.authService.login(loginUser);
    }
}
