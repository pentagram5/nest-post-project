import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { DataSource, QueryRunner } from 'typeorm';

describe('Post e2e - 게시글 생성, 조회, 업데이트, 삭제 테스트', () => {
  let app: INestApplication;
  let createdPostId = null;
  let queryRunner: QueryRunner;
  const testPostItem = {
    title: 'Test Post',
    content: 'This is a test post',
    author: 'Test author',
    password: 'Test123!',
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const dbConnection = moduleFixture.get(DataSource);
    // const manager = moduleFixture.get(EntityManager);
    queryRunner = dbConnection.createQueryRunner('master');
  });
  beforeEach(async () => {
    await queryRunner.startTransaction();
  });
  it('/post (POST) - 게시글 생성', () => {
    return request(app.getHttpServer())
      .post('/post')
      .send(testPostItem)
      .expect(201)
      .then((response) => {
        createdPostId = response.body.postId; //
        expect(response.body.message).toBe('게시글 생성 성공');
      });
  });
  it('/post (GET) - 게시글 title 기준 검색 및 결과 포함 조회', () => {
    return request(app.getHttpServer())
      .get('/post')
      .query({ page: 1, limit: 10, title: 'Test' })
      .expect(200)
      .then((response) => {
        const searchItem = response.body.results.filter(
          (item) => item.postId == createdPostId,
        );
        expect(searchItem.length).toBeGreaterThan(0);
        expect(searchItem[0].title).toBe(testPostItem.title);
        expect(searchItem[0].author).toBe(testPostItem.author);
      });
  });

  it('/post/{postId} (GET) - 게시글 상세 조회', () => {
    return request(app.getHttpServer())
      .get(`/post/${createdPostId}`)
      .expect(200)
      .then((response) => {
        const searchItem = response.body;
        expect(searchItem.title).toBe(testPostItem.title);
        expect(searchItem.author).toBe(testPostItem.author);
        expect(searchItem.content).toBe(testPostItem.content);
      });
  });

  it('/post/:postId (PUT) - 게시글 업데이트', () => {
    return request(app.getHttpServer())
      .put(`/post/${createdPostId}`)
      .send({
        content: `${testPostItem.content}_update`,
        title: `${testPostItem.title}_update`,
        author: `${testPostItem.author}_update`,
        password: testPostItem.password,
      })
      .expect(200)
      .then((response) => {
        const updatedItem = response.body;
        expect(updatedItem.title).toBe(`${testPostItem.title}_update`);
        expect(updatedItem.author).toBe(`${testPostItem.author}_update`);
        expect(updatedItem.content).toBe(`${testPostItem.content}_update`);
      });
  });

  it('/post/:postId (DELETE) - 게시글 삭제', () => {
    return request(app.getHttpServer())
      .delete(`/post/${createdPostId}`)
      .send({ password: testPostItem.password })
      .expect(204);
  });

  afterAll(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });
});
