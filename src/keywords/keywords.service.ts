import { Injectable } from '@nestjs/common';
import { KeywordsEntity } from '../entities/Keyword.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { PostEntity } from '../entities/Post.entity';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(KeywordsEntity)
    private keywordsRepository: Repository<KeywordsEntity>,
  ) {}

  private async searchKeywordOwnerByContents(content: string) {
    const query = this.keywordsRepository.createQueryBuilder('keywords');
    query.andWhere(":content LIKE CONCAT('%',keyword, '%')", {
      content: content,
    });
    return await query.getMany();
  }

  /**
   * create된 post객체를 전달받아
   * content 기반 키워드 조회 함수 호출
   * 조회된 결과는 로깅으로 알림기능 대체
   * @param {PostEntity} postItem create된 post객체
   * */
  async findKeywordOwnerByPost(postItem: PostEntity) {
    const items = await this.searchKeywordOwnerByContents(postItem.content);
    items.map((item) => {
      console.log(
        `-------------------------------------\n` + `*** 키워드 알림 ***\n`,
        `신규 게시글에 다음과 같은 키워드가 포함되어 있습니다\n`,
        `- **키워드 등록자**: [${item.author}]\n`,
        `- **키워드**: [${item.keyword}]\n`,
        `- **게시글 제목**: [${postItem.title}]`,
      );
    });
  }
}
