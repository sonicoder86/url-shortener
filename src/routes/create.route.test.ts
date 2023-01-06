import supertest from 'supertest';
import { createServer } from '../server';
import { Url } from '../models/url.model';
import { connect, disconnect } from '../db';

const shortId = 'abcd';
const originalUrl = 'https://google.com';
jest.mock('nanoid', () => {
  return { nanoid: () => shortId };
});

describe('Create Route', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  afterEach(async () => {
    await Url.deleteMany({});
  });

  it('should create shortened url', async () => {
    const server = createServer({ logger: false });
    await server.ready();

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
    const server = createServer({ logger: false });
    await server.ready();

    await supertest(server.server)
      .post('/create')
      .send({ url: 'https://google.com' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    const result = await Url.findOne({ originalUrl });

    expect(result).toMatchObject({ originalUrl, shortId });
  });
});
