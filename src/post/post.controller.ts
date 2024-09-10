import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostSearchDto, PostSearchResponseDto } from './dto/read-post.dto';

@Controller('post')
@ApiTags('게시판 API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 작성 API', description: '게시글 생성' })
  @ApiCreatedResponse({
    description: '새로운 게시글 생성 성공.',
    type: CreatePostResponseDto,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns paginated items',
    type: PostSearchResponseDto,
  })
  findAll(@Query() postSearchDto: PostSearchDto) {
    return this.postService.findAll(postSearchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.postService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
