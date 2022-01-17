import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Music } from "./musics.schemas";
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop({ unique: true })
    email: string
    
    @Prop({ 
        type: mongoose.Schema.Types.Mixed,
        default: [] 
    })
    muiscList: string[]

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);