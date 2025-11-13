import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('entrada')
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'json', nullable: true })
  marcacoes: string[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}

