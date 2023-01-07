import supertest from 'supertest';
import { createServer } from '../server';
import { Url } from '../models/url.model';
import { FastifyInstance } from 'fastify';

const shortId = 'abcd';
const originalUrl = 'https://google.com';

describe('Create Route', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = createServer({ logger: false });
    await server.ready();
  });

  afterEach(async () => {
    await Url.deleteMany({});
    await server.close();
  });

  it('should create shortened url', async () => {
    await Url.create({ originalUrl, shortId });

    await supertest(server.server)
      .get('/redirect/abcd')
      .expect(302)
      .expect('Location', originalUrl);
  });

  it('should return not found when url doesnt exist', async () => {
    await supertest(server.server).get('/redirect/abcd').expect(404);
  });
});
