import supertest from 'supertest';
import { createServer } from '../server';

describe('Index Route', () => {
  it('should print welcome message', async () => {
    const server = createServer({ logger: false });
    await server.ready();

    const response = await supertest(server.server)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8');
    expect(response.text).toEqual('Hello World');
  });
});
