import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async login(email: string, pass: string) {
    // Admin
    const adminObj = await this.adminRepo.findOneBy({ email });
    if (adminObj && adminObj.password === pass) {
      const { password, ...result } = adminObj;
      return { ...result, role: 'admin' };
    }

    // Client
    const userObj = await this.userRepo.findOneBy({ email });
    if (userObj && userObj.password === pass) {
      const { password, ...result } = userObj;
      return { ...result, role: 'client' };
    }

    return { status: 'error', message: 'Invalid credentials' };
  }
}
