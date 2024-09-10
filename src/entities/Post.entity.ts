import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number; // 자동 증가 ID

  @Column({ type: 'varchar', length: 255 })
  title: string; // 게시글 제목

  @Index({ fulltext: true }) // 인덱싱 및 키워드 검색 최적화
  @Column({ type: 'text' })
  content: string; // 게시글 내용

  @Column({ type: 'varchar', length: 100 })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255 })
  password: string; // 비밀번호 - 해싱처리

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
