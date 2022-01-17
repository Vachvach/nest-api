import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    UploadedFile, 
    UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateMusicDto } from 'src/dto/create-music.dto';
import { UpdateMusicDto } from 'src/dto/update-music.dto';
import { MusicsService } from './musics.service';
import { UserService } from 'src/user/user.service';

@Controller('/musics')
export class MusicsController {
    constructor(private readonly musicsService: MusicsService, private readonly userService: UserService ) {}

    @UseInterceptors(FileInterceptor('music'))
    @Post('/create/:id')
   async createById(
        @Body() createMusicDto: CreateMusicDto, 
        @UploadedFile() file: Express.Multer.File, 
        @Param('id')id: string
        ){
            const music =  await this.musicsService.createById(createMusicDto, file, id);
            return this.userService.updateMusicList(id, music);
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('music'))
    uploadOne(
        @Body() createMusicDto: CreateMusicDto, 
        @UploadedFile() file: Express.Multer.File
        ) {
        return this.musicsService.create(createMusicDto, file);
    }

    @Get('/')
    getMusics() {
        return this.musicsService.getMusics();
    }

    @Get('/:id')
    getById(@Param('id')id: string) {
        return this.musicsService.getOne(id);
    }

    @Delete('/')
    remove() {
        return this.musicsService.removeAll();
    }

    @Delete('/:id')
    removeFromId(@Param('id')id: string) {
        return this.musicsService.removeById(id);
    }

    @Put('/:id')
    update(@Param('id')id: string, @Body()updateMusicDto: UpdateMusicDto) {
        return this.musicsService.update(id, updateMusicDto);
    }
}