import { FastifyInstance } from 'fastify';
import { Url } from '../models/url.model';

interface RedirectParams {
  shortId: string;
}

export const redirectRoute = (server: FastifyInstance): void => {
  server.get<{ Params: RedirectParams }>(
    '/redirect/:shortId',
    async (request, reply) => {
      const shortId = request.params.shortId;
      const url = await Url.findOne({ shortId });

      if (!url) {
        reply.code(404).send();
        request.log.warn({ msg: 'url not found', shortId });
        return;
      }

      request.log.warn({ msg: 'url redirected', shortId });
      reply.redirect(url.originalUrl);
    },
  );
};
