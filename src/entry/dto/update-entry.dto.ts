import { IsString, IsOptional, IsDateString, IsArray } from 'class-validator';

export class UpdateEntryDto {
  @IsOptional()
  @IsString()
  conteudo?: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  marcacoes?: string[];
}

