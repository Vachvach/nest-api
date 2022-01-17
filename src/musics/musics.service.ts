import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicDocument, Music } from 'src/schemas/musics.schemas';
import { CreateMusicDto } from 'src/dto/create-music.dto';
import { UpdateMusicDto } from 'src/dto/update-music.dto';

@Injectable()
export class MusicsService {
    constructor(@InjectModel(Music.name) private musicModel: Model<MusicDocument>) {}

    async createById(musicDto: CreateMusicDto, file: Express.Multer.File, id: string) {
        const newMusicByUser = new this.musicModel(musicDto);
        newMusicByUser.fileName = file.originalname;
        newMusicByUser.pathName = file.path;
        newMusicByUser.owner = id;
        const music_id = await newMusicByUser.save();
        return music_id._id;
    }

    async create(musicDto: CreateMusicDto, file: Express.Multer.File): Promise<Music> {
        const newMusic = new this.musicModel(musicDto);
        newMusic.fileName = file.originalname;
        newMusic.pathName = file.path;
        return await newMusic.save();
    }

    async getMusics(): Promise<Music[]> {
        const musics = await this.musicModel.find().populate('owner');
        return musics;
    }

    async getOne(id: string) {
        return await this.musicModel.findById(id);
    }

    async removeAll() {
        return await this.musicModel.deleteMany();
    }

    async removeById(id: string): Promise<Music> {
        return await this.musicModel.findByIdAndRemove(id);
    }

    async update(id: string, musicDto: UpdateMusicDto) {
        return await this.musicModel.findByIdAndUpdate(id, musicDto, { new: true });
    }
}