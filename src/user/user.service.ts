import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}

