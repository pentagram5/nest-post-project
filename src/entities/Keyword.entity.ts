import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('keywords')
export class KeywordsEntity {
  @PrimaryGeneratedColumn({ name: 'keyword_id' })
  keywordId: number; // 자동 증가 ID

  @Column({ type: 'varchar', length: 100, unique: true })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255 })
  keyword: string;

  @CreateDateColumn({ name: 'created_at', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: 6 })
  updatedAt: Date;
}
