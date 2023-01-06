import supertest from 'supertest';
import { createServer } from '../server';
import { Url } from '../models/url.model';
import { connect, disconnect } from '../db';

const shortId = 'abcd';
const originalUrl = 'https://google.com';

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

    await Url.create({
      originalUrl,
      shortId,
    });

    await supertest(server.server)
      .get('/redirect/abcd')
      .expect(302)
      .expect('Location', originalUrl);
  });

  it('should return not found when url doesnt exist', async () => {
    const server = createServer({ logger: false });
    await server.ready();

    await supertest(server.server).get('/redirect/abcd').expect(404);
  });
});
