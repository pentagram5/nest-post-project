import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: '게시글 작성자',
    example: 'test_author',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: '게시글 작성자명은 100글자를 넘길 수 없습니다.',
  })
  author: string;

  @ApiProperty({
    description: '게시글 제목',
    example: 'test_author',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: '게시글 제목은 255글자를 넘길 수 없습니다.',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: 'test_contents',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: '비밀번호 - 해싱처리 ',
    example: 'Qwer1234!@',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '패스워드는 최소 8자 이상이어야 합니다.' })
  @Matches(/(?=.*[A-Z])/, {
    message: '패스워드는 최소 1개의 대문자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: '패스워드는 최소 1개의 소문자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[0-9])/, {
    message: '패스워드는 최소 1개의 숫자를 포함해야 합니다.',
  })
  @Matches(/(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-])/, {
    message: '패스워드는 최소 1개의 특수 문자를 포함해야 합니다.',
  })
  password: string;
}

export class CreatePostResponseDto {
  @ApiProperty({ description: '게시글 ID', example: 1 })
  postId: number | null;

  @ApiProperty({ description: '메시지', example: '게시글 생성 성공' })
  message: string;
}
