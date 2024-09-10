import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as moment from 'moment/moment';
import { ApiProperty } from '@nestjs/swagger';

export class PostDataDto {
  @ApiProperty({ description: '게시글 id' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: '게시글 타이틀' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 작성자' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: '게시글 작성 시간' })
  @Transform(({ value }) =>
    moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss'),
  )
  created_at: string;

  @ApiProperty({ description: '게시글 수정 시간' })
  @Transform(({ value }) => {
    return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
  })
  updated_at: string;
}

export class PageResponseDTO {
  @ApiProperty({ description: 'Current page number' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'Total number of items' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Number of items per page' })
  @IsNumber()
  pageSize: number;

  @ApiProperty({ description: 'Maximum number of pages' })
  @IsNumber()
  maxPage: number;

  @ApiProperty({ type: [PostDataDto], description: 'List of results' })
  @IsArray()
  results: PostDataDto[];
}

export class GetWorkDto {
  @ApiProperty({ description: '게시글 타이틀', required: false })
  @IsOptional()
  @Type(() => String)
  title?: string | null;

  @ApiProperty({ description: '게시글 타이틀', required: false })
  @IsOptional()
  @Type(() => String)
  title?: string | null;

  @ApiProperty({
    description: '작업상태 - ["전체", "작업중", "작업완료", "신규"]',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  option?: string | null;

  @ApiProperty({ description: '페이지', required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => value ?? 1)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: '페이지별 건수', required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => value ?? 10)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
