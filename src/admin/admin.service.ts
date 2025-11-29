import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getAllAdmins() {
    const allAdmin = await this.adminRepository.find();
    return allAdmin;
  }

  async getAdminById(id: string) {
    const foundAdmin = await this.adminRepository.findOneBy({
      id: parseInt(id),
    });
    if (!foundAdmin) return { message: 'Admin not found' };

    return foundAdmin;
  }

  async getAdminByEmail(email: string) {
    const foundAdmin = await this.adminRepository.findOneBy({ email });
    if (!foundAdmin) return { message: 'Admin not found' };

    return foundAdmin;
  }

  async createAdmin(name: string, email: string, password: string) {
    const existingAdmin = await this.adminRepository.findOneBy({ email });
    if (existingAdmin)
      return { message: 'Admin with this email already exist' };

    const newAdmin = this.adminRepository.create({ name, email, password });
    const response = await this.adminRepository.save(newAdmin);
    return response;
  }

  async signin(email: string, password: string) {
    const admin = await this.adminRepository.findOneBy({ email });
    if (!admin) return { message: 'Admin not found' };

    if (admin.email !== email || admin.password !== password)
      return { message: 'Invalid credentials' };

    return admin;
  }

  async updateAdmin(id: string, name: string, email: string, password: string) {
    const adminToUpdate = await this.adminRepository.findOneBy({
      id: parseInt(id),
    });
    if (!adminToUpdate) return { message: 'Admin not found' };

    adminToUpdate.name = name;
    adminToUpdate.email = email;

    if (password) {
      adminToUpdate.password = password;
    }

    await this.adminRepository.save(adminToUpdate);
    return { message: 'Admin has been successfully updated' };
  }

  async deleteAdminById(id: string) {
    const adminToDelete = await this.adminRepository.findOneBy({
      id: parseInt(id),
    });
    if (!adminToDelete) return { message: 'Admin not found' };

    await this.adminRepository.remove(adminToDelete);
    return { message: 'Admin has been deleted successfully' };
  }

  async deleteAdminByEmail(email: string) {
    const adminToDelete = await this.adminRepository.findOneBy({ email });
    if (!adminToDelete) return { message: 'Admin not found' };

    await this.adminRepository.remove(adminToDelete);
    return { message: 'Admin has been deleted successfully' };
  }

  // Helper for AuthService
  async findOne(email: string) {
    return this.adminRepository.findOneBy({ email });
  }
}
