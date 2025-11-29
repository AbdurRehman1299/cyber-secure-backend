import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiryService: InquiriesService) {}

  @Post()
  createInquiry(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    return this.inquiryService.createInquiry(name, email, message);
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.inquiryService.findAll(email);
  }
}
