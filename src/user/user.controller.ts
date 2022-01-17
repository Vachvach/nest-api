import { 
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto:CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/')
    GetUserData(){
        return this.userService.getUsers();
    }

    @Get(':id')
    getOne(@Param('id') id:string) {
        const user = this.userService.getById(id);
        // if(!user) {
        //     throw new HttpException('user not fount', HttpStatus.NOT_FOUND);
        // }
        return user;
    }

    @Delete('/')
    removeAll() {
        return this.userService.removeAll();
    }
    
    @Delete(':id')
    removeFromId(@Param('id') id:string) {
        return this.userService.deleteFromId(id);
    }

    @Put(':id')
    updateFromId(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return this.userService.update(id, updateUserDto);
    }
}
