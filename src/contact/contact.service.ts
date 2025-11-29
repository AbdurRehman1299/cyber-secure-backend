import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async getAllContacts() {
    const allContacts = await this.contactRepository.find();
    return allContacts;
  }

  async getContactById(id: string) {
    const foundContact = await this.contactRepository.findOneBy({
      id: parseInt(id),
    });
    if (!foundContact) return { message: 'Contact not found' };

    return foundContact;
  }

  async createContact(
    first_name: string,
    last_name: string,
    email: string,
    message: string,
  ) {
    const newContact = this.contactRepository.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      message: message,
    });

    const response = await this.contactRepository.save(newContact);
    return response;
  }

  async updateContact(
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    message: string,
  ) {
    const contactToUpdate = await this.contactRepository.findOneBy({
      id: parseInt(id),
    });
    if (!contactToUpdate) return { message: 'Contact not found' };

    contactToUpdate.first_name = first_name;
    contactToUpdate.last_name = last_name;
    contactToUpdate.email = email;
    contactToUpdate.message = message;
    await this.contactRepository.save(contactToUpdate);
    return { message: 'Contact has been successfully updated' };
  }

  async deleteContact(id: string) {
    const contactToDelete = await this.contactRepository.findOneBy({
      id: parseInt(id),
    });
    if (!contactToDelete) return { message: 'Contact not found' };

    await this.contactRepository.delete(contactToDelete);
    return { message: 'Contact has been successfully deleted' };
  }
}
