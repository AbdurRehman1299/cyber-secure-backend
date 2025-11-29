import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from './inquiries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepo: Repository<Inquiry>,
  ) {}

  async createInquiry(name: string, email: string, message: string) {
    const inquiry = this.inquiryRepo.create({ name, email, message });
    return await this.inquiryRepo.save(inquiry);
  }

  async findAll(email?: string) {
    if (email) {
      return await this.inquiryRepo.find({
        where: { email },
        order: { createdAt: 'DESC' },
      });
    }
    return await this.inquiryRepo.find({ order: { createdAt: 'DESC' } });
  }
}
