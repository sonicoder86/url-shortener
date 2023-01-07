import { FastifyInstance, FastifySchema } from 'fastify';
import { UrlService } from '../services/url.service';

interface CreateBody {
  url: string;
}

interface CreateResponse {
  originalUrl: string;
  shortUrl: string;
}

const schema: FastifySchema = {
  body: {
    type: 'object',
    required: ['url'],
    properties: {
      url: { type: 'string' },
    },
  },
};

export const createRoute = (server: FastifyInstance): void => {
  server.post<{ Body: CreateBody; Reply: CreateResponse }>(
    '/create',
    { schema },
    async (request, reply) => {
      const { originalUrl, shortUrl, shortId } = await UrlService.create(
        request.body.url,
      );
      request.log.info('url created', { originalUrl, shortId });

      reply.status(200).send({ originalUrl, shortUrl });
    },
  );
};
