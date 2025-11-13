import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EntrySerializeInterceptor } from './interceptors/entry-serialize.interceptor';
import { Entry } from './entity/entry.entity';

@Controller('entry')
@UseGuards(JwtAuthGuard)
@UseInterceptors(EntrySerializeInterceptor)
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() createEntryDto: CreateEntryDto, @Request() req): Promise<Entry> {
    return await this.entryService.criar(createEntryDto, req.user.userId);
  }

  @Get()
  async encontrarTodos(@Request() req, @Query('data') data?: string): Promise<Entry[]> {
    if (data) {
      return await this.entryService.encontrarPorData(data, req.user.userId);
    }
    return await this.entryService.encontrarTodos(req.user.userId);
  }

  @Get('marcacao/:marcacao')
  async encontrarPorMarcacao(@Param('marcacao') marcacao: string, @Request() req): Promise<Entry[]> {
    return await this.entryService.encontrarPorMarcacao(marcacao, req.user.userId);
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number, @Request() req): Promise<Entry> {
    return await this.entryService.encontrarPorId(id, req.user.userId);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() updateEntryDto: UpdateEntryDto,
    @Request() req,
  ): Promise<Entry> {
    return await this.entryService.atualizar(id, updateEntryDto, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(@Param('id') id: number, @Request() req): Promise<void> {
    return await this.entryService.remover(id, req.user.userId);
  }
}

