import { FastifyInstance, FastifySchema } from 'fastify';
import { nanoid } from 'nanoid';
import { config } from '../config';
import { UrlModel } from '../models/url.model';
import { UrlStatModel } from '../models/url-stat.model';

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
      const shortId = nanoid(13);
      const shortUrl = `${config.baseUrl}/redirect/${shortId}`;
      const originalUrl = request.body.url;

      await UrlModel.create({ originalUrl, shortId });
      await UrlStatModel.create({ visits: 0, shortId });
      request.log.info('url created', { originalUrl, shortId });

      reply.status(200).send({ originalUrl, shortUrl });
    },
  );
};
