import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  nome: string;

  @IsString()
  @MinLength(6)
  senha: string;
}

