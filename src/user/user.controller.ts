import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Body,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JoiValidationFilter } from 'src/joi-validation.filter';

@Controller('admin')
@UsePipes(ValidationPipe)
@UseFilters(JoiValidationFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
