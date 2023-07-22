import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../src/common/auth/auth.module';
import { configureApp } from '../src/app.bootstrap';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nest'),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it(`/POST register`, () => {
    return request(app.getHttpServer()).post('/auth/register').expect(201);
    // .expect({
    //   data: catsService.findAll(),
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
