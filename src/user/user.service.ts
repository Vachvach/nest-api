import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UserDocument, User } from "src/schemas/user.schemas";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return await newUser.save();
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    if(user) {
      return user;
    }
    throw new HttpException('email does not exist', HttpStatus.NOT_FOUND);
  }
   
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find()
    return users;
  }

  async updateMusicList(id: string, m_id: any){
   return  this.userModel.updateOne({_id: id}, { $push: { muiscList: m_id } } )

  }

  async getById(id:string): Promise<User> {
    return await this.userModel.findOne({_id: id});
  }

  async deleteFromId(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);    
  }

  async removeAll() {
    return await this.userModel.deleteMany();
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, userDto, {new: true});
  }
}
