import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsEntity } from '../entities/Keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordsEntity])],
  providers: [KeywordsService],
  exports: [KeywordsService],
})
export class KeywordsModule {}
