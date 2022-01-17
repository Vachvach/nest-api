import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schemas";
import * as mongoose from 'mongoose';
import { Type } from "@nestjs/common";

export type MusicDocument = Music & Document;

@Schema()
export class Music {
    @Prop()
    fileName: string

    @Prop()
    pathName: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: string
}

export const MusicSchema = SchemaFactory.createForClass(Music);