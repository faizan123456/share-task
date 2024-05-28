import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
      private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if(!user) {
      return {success: false, message: "Email does not exist."}
      // throw new Error("Email does not exist.");
    }
    const passwordValid = await bcrypt.compare(pass, user.password)
   
    if (!passwordValid) {
      return {success: false, message: "Incorrect Passord, please try again."}
      // throw new UnauthorizedException();
    }
    const payload = { sub: user, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      success: true,
      message: 'Login successfully'
    };
  }

}