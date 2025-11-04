import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entity/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioService.criar(createUsuarioDto);
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<Usuario | null> {
    return await this.usuarioService.encontrarPorId(id);
  }
}

