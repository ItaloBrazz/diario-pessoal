import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entity/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  async criar(createEntryDto: CreateEntryDto, userId: number): Promise<Entry> {
    // Garantir que a data seja tratada corretamente sem problemas de timezone
    let dataEntry: Date;
    
    if (createEntryDto.data) {
      // Se a data vier no formato YYYY-MM-DD, criar Date em UTC no meio do dia
      // Isso evita problemas de timezone ao salvar no MySQL
      const dateParts = createEntryDto.data.split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Mês é 0-indexed
        const day = parseInt(dateParts[2], 10);
        // Criar em UTC no meio do dia (12:00:00) para evitar problemas de timezone
        dataEntry = new Date(Date.UTC(year, month, day, 12, 0, 0));
      } else {
        dataEntry = new Date(createEntryDto.data);
      }
    } else {
      const now = new Date();
      // Usar UTC no meio do dia para a data atual
      dataEntry = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
    }
    
    const entry = this.entryRepository.create({
      conteudo: createEntryDto.conteudo,
      data: dataEntry,
      usuarioId: userId,
      marcacoes: createEntryDto.marcacoes && createEntryDto.marcacoes.length > 0 
        ? createEntryDto.marcacoes 
        : [],
    });

    return await this.entryRepository.save(entry);
  }

  async encontrarTodos(userId: number): Promise<Entry[]> {
    return await this.entryRepository.find({
      where: { usuarioId: userId },
      order: { data: 'DESC', criadoEm: 'DESC' },
    });
  }

  async encontrarPorData(data: string, userId: number): Promise<Entry[]> {
    // Tratar data corretamente sem problemas de timezone
    // Buscar todas as entradas do usuário e filtrar por data no código
    // para evitar problemas de timezone na query do MySQL
    const allEntries = await this.entryRepository.find({
      where: { usuarioId: userId },
      order: { criadoEm: 'DESC' },
    });

    const dateParts = data.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);
      
      return allEntries.filter(entry => {
        const entryDate = new Date(entry.data);
        return entryDate.getUTCFullYear() === year &&
               entryDate.getUTCMonth() + 1 === month &&
               entryDate.getUTCDate() === day;
      });
    }
    
    return allEntries;
  }

  async encontrarPorId(id: number, userId: number): Promise<Entry> {
    const entry = await this.entryRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!entry) {
      throw new NotFoundException('Anotação não encontrada');
    }

    if (entry.usuarioId !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta anotação');
    }

    return entry;
  }

  async atualizar(id: number, updateEntryDto: UpdateEntryDto, userId: number): Promise<Entry> {
    const entry = await this.encontrarPorId(id, userId);

    if (updateEntryDto.data) {
      // Tratar data corretamente sem problemas de timezone
      const dateParts = updateEntryDto.data.split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Mês é 0-indexed
        const day = parseInt(dateParts[2], 10);
        // Criar em UTC no meio do dia para evitar problemas de timezone
        entry.data = new Date(Date.UTC(year, month, day, 12, 0, 0));
      } else {
        entry.data = new Date(updateEntryDto.data);
      }
    }
    if (updateEntryDto.conteudo !== undefined) {
      entry.conteudo = updateEntryDto.conteudo;
    }
    if (updateEntryDto.marcacoes !== undefined) {
      entry.marcacoes = updateEntryDto.marcacoes;
    }

    return await this.entryRepository.save(entry);
  }

  async remover(id: number, userId: number): Promise<void> {
    const entry = await this.encontrarPorId(id, userId);
    await this.entryRepository.remove(entry);
  }

  async encontrarPorMarcacao(marcacao: string, userId: number): Promise<Entry[]> {
    const entries = await this.entryRepository.find({
      where: { usuarioId: userId },
      order: { data: 'DESC', criadoEm: 'DESC' },
    });

    return entries.filter(entry => 
      entry.marcacoes && entry.marcacoes.includes(marcacao)
    );
  }
}

