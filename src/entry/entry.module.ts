import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entity/entry.entity';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), AuthModule],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}

