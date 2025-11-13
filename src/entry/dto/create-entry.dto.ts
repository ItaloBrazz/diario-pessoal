import { IsString, IsNotEmpty, IsDateString, IsOptional, IsArray } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsDateString()
  @IsNotEmpty()
  data: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  marcacoes?: string[];
}

