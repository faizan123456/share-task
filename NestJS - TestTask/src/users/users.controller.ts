import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/auth/auth.decorator';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
        @Body('email') email: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    
        const result = await this.usersService.createUser(
            username,
            email,
            hashedPassword,
        );
        return result;
    }

    @Public()
    @Get('/users')
    async users(
       ): Promise<User | any> {
       const result:any = await this.usersService.getUsers();
        return { success:true, users: result};
    }
}