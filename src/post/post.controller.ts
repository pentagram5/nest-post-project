import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  PostDataResponseDto,
  PostSearchDto,
  PostSearchResponseDto,
} from './dto/read-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Http4XXDto, HttpError400Dto } from '../dto/http-error.dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Controller('post')
@ApiTags('게시판 API')
@ApiNotFoundResponse({
  description: '해당 리소스 없음',
  type: Http4XXDto,
})
@ApiBadRequestResponse({
  description: '잘못된 요청 인자.',
  type: HttpError400Dto,
})
export class PostController {
  constructor(@Inject() private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성 API',
    description:
      '게시글 생성 \n 패스워드는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수 문자를 각각 1개 이상 포함해야 합니다.',
  })
  @ApiCreatedResponse({
    description: '새로운 게시글 생성 성공.',
    type: CreatePostResponseDto,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: '게시글 조회 API',
    description:
      '검색어 기반 게시글 조회 - page default = 1, limit default = 10 ',
  })
  @ApiOkResponse({
    description: '검색어 기반 페이지 아이템 리턴',
    type: PostSearchResponseDto,
  })
  findAll(@Query() postSearchDto: PostSearchDto) {
    return this.postService.findAll(postSearchDto);
  }

  @Get(':postId')
  @ApiOperation({
    summary: '게시글 상세조회  API',
    description: 'postId 기반 게시글 내용 리턴',
  })
  @ApiOkResponse({
    description: '게시글 내용 리턴',
    type: PostDataResponseDto,
  })
  findOne(@Param('postId') postId: number) {
    return this.postService.findOne(postId);
  }

  @Put(':postId')
  @ApiOperation({
    summary: '게시글 업데이트 API',
    description: 'postId 기반 게시글 내용 업데이트, 비밀번호 필요',
  })
  @ApiOkResponse({
    description: '게시글 업데이트 성공',
    type: PostDataResponseDto,
  })
  @ApiForbiddenResponse({
    description: '게시글 비밀번호 오류',
    type: Http4XXDto,
  })
  update(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postId, updatePostDto);
  }

  @Delete(':postId')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description: 'postId 기반 게시글 삭제, 비밀번호 필요',
  })
  @ApiNoContentResponse({
    description: '게시글 삭제 완료',
  })
  @ApiForbiddenResponse({
    description: '게시글 비밀번호 오류',
    type: Http4XXDto,
  })
  @HttpCode(204)
  async remove(
    @Param('postId') postId: number,
    @Body() deletePostDto: DeletePostDto,
  ) {
    await this.postService.remove(postId, deletePostDto);
  }
}
