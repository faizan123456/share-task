import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
      constructor(@InjectModel(User.name) private userModel: Model<User>) { }

      async createUser(username: string, email: string, password: string): Promise<User | any> {
            const user = this.userModel.findOne({ email });
            if(user) {
                  return { success: false, message: 'User is already exist with this email' }
            }
            this.userModel.create({
                  username,
                  email,
                  password,
            });
       return { success: true, message: 'User registered successfully' }
      }
      async getUser(query: object): Promise<User> {
            return this.userModel.findOne(query);
      }

      async getUsers() {
            return this.userModel.find();
      }

      async findOne(username: string): Promise<User | undefined> {
            return this.userModel.findOne({ username });
      }
      async findByEmail(email: string): Promise<User | undefined> {
            return this.userModel.findOne({ email });
      }
}