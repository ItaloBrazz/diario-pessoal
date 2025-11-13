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
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cadastro')
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.criar(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto.email, loginUserDto.senha);
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<User | null> {
    return await this.userService.encontrarPorId(id);
  }
}

