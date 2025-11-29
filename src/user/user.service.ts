import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const allUsers = await this.usersRepository.find();
    return allUsers;
  }

  async getUserById(id: string) {
    const foundUser = await this.usersRepository.findOneBy({
      id: parseInt(id),
    });
    if (!foundUser) return { message: 'User not found' };

    return foundUser;
  }

  async getUserByEmail(email: string) {
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (!foundUser) return { message: 'User not found' };

    return foundUser;
  }

  async signUp(name: string, email: string, password: string) {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) return { message: 'User with this email already exist' };

    const newUser = this.usersRepository.create({
      name: name,
      email: email,
      password: password,
    });

    const response = await this.usersRepository.save(newUser);
    return response;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) return { message: 'User not found' };

    if (user.email !== email || user.password !== password)
      return { message: 'Invalid credentials' };

    return user;
  }

  async updateUser(id: string, name: string, email: string, password?: string) {
    const userToUpdate = await this.usersRepository.findOneBy({
      id: parseInt(id),
    });
    if (!userToUpdate) return { message: 'User not found' };

    userToUpdate.name = name;
    userToUpdate.email = email;

    if (password) {
      userToUpdate.password = password;
    }

    await this.usersRepository.save(userToUpdate);
    return { message: 'User has been successfully updated' };
  }

  async deleteUserById(id: string) {
    const userToDelete = await this.usersRepository.findOneBy({
      id: parseInt(id),
    });
    if (!userToDelete) return { message: 'User not found' };

    await this.usersRepository.remove(userToDelete);
    return { message: 'User has been successfully deleted' };
  }

  async deleteUserByEmail(email: string) {
    const userToDelete = await this.usersRepository.findOneBy({ email });
    if (!userToDelete) return { message: 'User not found' };

    await this.usersRepository.remove(userToDelete);
    return { message: 'User has been deleted successfully' };
  }

  // Helper for AuthService
  async findOne(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
