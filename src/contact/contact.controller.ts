import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  getContactById(@Param('id') id: string) {
    return this.contactService.getContactById(id);
  }

  @Post()
  createContact(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    return this.contactService.createContact(
      first_name,
      last_name,
      email,
      message,
    );
  }

  @Put(':id')
  updateContact(
    @Param('id') id: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    return this.contactService.updateContact(
      id,
      first_name,
      last_name,
      email,
      message,
    );
  }

  @Delete(':id')
  deleteContact(@Param('id') id: string) {
    return this.contactService.deleteContact(id);
  }
}
