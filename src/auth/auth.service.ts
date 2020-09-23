import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import UserModel from 'src/database/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateAdmin(email: string, password: string): Promise<any> {
    const user = await this.adminService.findByEmail(email);

    if (!user) {
      return null;
    }

    // @ts-ignore
    const verified = await user.verifyPassword(password);

    if (verified) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserModel) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: (user.roles || []).map(role => role.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
