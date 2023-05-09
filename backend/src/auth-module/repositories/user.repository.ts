import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UserRepository {


    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async findUser(username): Promise<User> {

        const filter = { username }

        const response = await <any>this.userModel.findOne(filter)
        if (!response)
            return null
        return <User>response._doc

    }

    async createUser(){

        const _id = new Types.ObjectId()
        await this.userModel.create({
            _id,
            username:"chabok",
            password:"1234"
        })

    }


}

