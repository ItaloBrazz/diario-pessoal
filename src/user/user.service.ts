import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async criar(userData: {
    email: string;
    nome: string;
    senha: string;
  }): Promise<User> {
    const senhaHash = await bcrypt.hash(userData.senha, 10);
    
    const user = this.userRepository.create({
      ...userData,
      senha: senhaHash,
    });

    return await this.userRepository.save(user);
  }

  async encontrarPorEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async encontrarPorId(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async validarSenha(senha: string, senhaHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }

  async login(email: string, senha: string): Promise<{ access_token: string; user: { id: number; email: string; nome: string } }> {
    const user = await this.encontrarPorEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida = await this.validarSenha(senha, user.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
      },
    };
  }
}

