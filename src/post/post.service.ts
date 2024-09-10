import { Injectable } from '@nestjs/common';
import { PostEntity } from '../entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import { hashingPassword } from '../util/bcryptUtil';
import {
  PostDataDto,
  PostSearchDto,
  PostSearchResponseDto,
} from './dto/read-post.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<CreatePostResponseDto> {
    const newPost = new PostEntity();
    newPost.title = createPostDto.title;
    newPost.author = createPostDto.author;
    newPost.content = createPostDto.content;
    newPost.password = await hashingPassword(createPostDto.password);
    const item = await this.postRepo.save(newPost);
    return { postId: item.postId, message: '게시글 생성 성공' };
  }

  async findAll(postSearchDto: PostSearchDto): Promise<PostSearchResponseDto> {
    const { author, title, page = 1, limit = 10 } = postSearchDto;
    const query = this.postRepo
      .createQueryBuilder('post')
      .orderBy('post.created_at', 'DESC');

    if (author) {
      query.andWhere('MATCH(post.author) AGAINST(:author IN BOOLEAN MODE)', {
        author,
      });
    }

    if (title) {
      query.andWhere('MATCH(post.title) AGAINST(:title IN BOOLEAN MODE)', {
        title,
      });
    }
    const count = await query.getCount();
    const item = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    const result = plainToInstance(PostDataDto, item, {
      excludeExtraneousValues: true,
    });
    return plainToInstance(PostSearchResponseDto, {
      page: Number(page),
      total: count,
      limit: Number(limit),
      maxPage: 10,
      results: result,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update() {
    // const post = await this.postRepo.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });
    // post.content = '1123123';
    const item = await this.postRepo.update(3, { title: 'testsets' });
    return `This action updates a  post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
