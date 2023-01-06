import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { indexRoute } from './routes/index.route';
import { createRoute } from './routes/create.route';
import { redirectRoute } from './routes/redirect.route';

export const createServer = (opts?: FastifyServerOptions): FastifyInstance => {
  const server = fastify({
    logger: {
      level: 'info',
    },
    ...opts
  });

  indexRoute(server);
  createRoute(server);
  redirectRoute(server);

  return server;
}
