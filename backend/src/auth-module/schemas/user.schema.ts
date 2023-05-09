import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop({ type: String })
    username: string;

    @Prop({ type: String })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);