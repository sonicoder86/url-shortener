import { FastifyInstance } from 'fastify';

export const indexRoute = (server: FastifyInstance): void => {
  server.get('/', async () => {
    return 'Hello World';
  });
};
