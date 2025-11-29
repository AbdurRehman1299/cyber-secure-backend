import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Get('email/:email')
  getAdminByEmail(@Param('email') email: string) {
    return this.adminService.getAdminByEmail(email);
  }

  @Post('signup')
  createAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.createAdmin(name, email, password);
  }

  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.adminService.signin(email, password);
  }

  @Put(':id')
  updateAdmin(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.updateAdmin(id, name, email, password);
  }

  @Delete(':id')
  deleteAdminById(@Param('id') id: string) {
    return this.adminService.deleteAdminById(id);
  }

  @Delete('email/:email')
  deleteAdminByEmail(@Param('email') email: string) {
    return this.adminService.deleteAdminByEmail(email);
  }
}
