import supertest from 'supertest';
import { FastifyInstance } from 'fastify';
import { createServer } from '../server';
import { UrlModel } from '../models/url.model';
import { UrlStatModel } from '../models/url-stat.model';

const shortId = 'abcd';
const originalUrl = 'https://google.com';
jest.mock('nanoid', () => {
  return { nanoid: () => shortId };
});

describe('Create Route', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = createServer({ logger: false });
    await server.ready();
  });

  afterEach(async () => {
    await UrlModel.deleteMany({});
    await UrlStatModel.deleteMany({});
    await server.close();
  });

  it('should create shortened url', async () => {
    const response = await supertest(server.server)
      .post('/create')
      .send({ url: originalUrl })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toEqual({
      originalUrl,
      shortUrl: `http://localhost:8080/redirect/${shortId}`,
    });
  });

  it('should store redirect url into database', async () => {
    await supertest(server.server)
      .post('/create')
      .send({ url: 'https://google.com' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const result = await UrlModel.findOne({ shortId });

    expect(result).toMatchObject({ originalUrl, shortId });
  });

  it('should store empty stats into database', async () => {
    await supertest(server.server)
      .post('/create')
      .send({ url: 'https://google.com' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const result = await UrlStatModel.findOne({ shortId });

    expect(result).toMatchObject({ visits: 0, shortId });
  });

  it('should respond with 400 if payload is incorrect', async () => {
    const response = await supertest(server.server)
      .post('/create')
      .send({ name: 'https://google.com' })
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body.message).toEqual(
      "body must have required property 'url'",
    );
  });

  it('should not call database store if payload is incorrect', async () => {
    jest.spyOn(UrlModel, 'create');

    await supertest(server.server)
      .post('/create')
      .send({ name: 'https://google.com' })
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(UrlModel.create).not.toHaveBeenCalled();
  });
});
