import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cadastro')
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.criar(createUserDto);
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<User | null> {
    return await this.userService.encontrarPorId(id);
  }
}

