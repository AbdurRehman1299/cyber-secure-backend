import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(title: string, slug: string, content: string, author: string) {
    const newPost = this.blogsRepository.create({
      title,
      slug,
      content,
      author,
    });
    return await this.blogsRepository.save(newPost);
  }

  async findAll() {
    return await this.blogsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
