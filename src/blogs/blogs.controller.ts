import { Controller, Post, Get, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blogs.entity';

@Controller('blogs')
export class BlogsController {
  constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) {}

  @Post()
  create(
    @Body('title') title: string,
    @Body('slug') slug: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ) {
    return this.blogRepo.save(
      this.blogRepo.create({ title, slug, content, author }),
    );
  }

  @Get()
  findAll() {
    return this.blogRepo.find({ order: { createdAt: 'DESC' } });
  }
}
