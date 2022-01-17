import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Music, MusicSchema } from 'src/schemas/musics.schemas';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [MulterModule.register({
    dest: "./uploads"
  }),
  MongooseModule.forFeature([{name: Music.name, schema: MusicSchema}]),
  MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
],
  controllers: [MusicsController],
  providers: [MusicsService, UserService]
})
export class MusicsModule {}