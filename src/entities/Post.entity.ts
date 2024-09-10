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
  @PrimaryGeneratedColumn({ name: 'post_id' })
  postId: number; // 자동 증가 ID

  @Index({ fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 255 })
  title: string; // 게시글 제목

  @Index({ fulltext: true, parser: 'ngram' })
  @Column({ type: 'text' })
  content: string; // 게시글 내용

  @Index({ fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', length: 100 })
  author: string; // 작성자 이름

  @Column({ type: 'varchar', length: 255 })
  password: string; // 비밀번호 - 해싱처리

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
