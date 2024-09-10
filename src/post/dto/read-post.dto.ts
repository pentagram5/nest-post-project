import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import * as moment from 'moment/moment';
import { ApiProperty } from '@nestjs/swagger';

export class PostDataDto {
  @ApiProperty({ description: '게시글 id' })
  @IsNumber()
  @Expose()
  postId: number;

  @ApiProperty({ description: '게시글 타이틀' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: '게시글 작성자' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  author: string;

  @ApiProperty({ description: '게시글 작성 시간' })
  @Expose()
  @IsString()
  @Transform(({ value }) =>
    moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss'),
  )
  createdAt: string;

  @ApiProperty({ description: '게시글 수정 시간' })
  @Expose()
  @IsString()
  @Transform(({ value }) => {
    return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
  })
  updatedAt: string;
}

export class PostSearchResponseDto {
  @ApiProperty({ description: 'Current page number' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'Total number of items' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Number of items per page' })
  @IsNumber()
  limit: number;

  @ApiProperty({ description: 'Maximum number of pages' })
  @IsNumber()
  maxPage: number;

  @ApiProperty({ type: [PostDataDto], description: 'List of results' })
  @IsArray()
  results: PostDataDto[] | null;
}

export class PostSearchDto {
  @ApiProperty({ description: '작성자 명 검색 키워드', required: false })
  @IsOptional()
  @IsString()
  readonly author?: string;

  @ApiProperty({ description: '제목 검색 키워드', required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ description: '페이지', required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => value ?? 1)
  @Type(() => Number)
  @IsInt({ message: '페이지는 정수형만 입력가능합니다.' })
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: '페이지별 건수', required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => value ?? 10)
  @Type(() => Number)
  @IsInt({ message: '페이지별 건수는 정수형만 입력가능합니다.' })
  @Min(1)
  limit?: number = 10;
}
