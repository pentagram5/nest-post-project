import { Injectable } from '@nestjs/common';
import { PostEntity } from '../entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindPostReturnDto } from './dto/read-post.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  create() {
    const newPost = new PostEntity();
    newPost.title = 'test';
    newPost.author = 'test';
    newPost.content = 'test';
    newPost.password = 'test';
    this.postRepo.save(newPost);
    return 'This action adds a new post';
  }

  async findAll() {
    return plainToInstance(FindPostReturnDto, await this.postRepo.find());
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
