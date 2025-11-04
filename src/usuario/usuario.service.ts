import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(usuarioData: {
    email: string;
    nome: string;
    senha: string;
  }): Promise<Usuario> {
    const senhaHash = await bcrypt.hash(usuarioData.senha, 10);
    
    const usuario = this.usuarioRepository.create({
      ...usuarioData,
      senha: senhaHash,
    });

    return await this.usuarioRepository.save(usuario);
  }

  async encontrarPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  async encontrarPorId(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { id } });
  }

  async validarSenha(senha: string, senhaHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}

