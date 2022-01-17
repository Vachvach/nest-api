import * as mongoose from "mongoose"

export class CreateMusicDto {
    fileName: string
    pathName: string
    owner: mongoose.Schema.Types.Mixed
}