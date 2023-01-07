import { FastifyInstance } from 'fastify';
import { UrlService } from '../services/url.service';

interface RedirectParams {
  shortId: string;
}

export const redirectRoute = (server: FastifyInstance): void => {
  server.get<{ Params: RedirectParams }>(
    '/redirect/:shortId',
    async (request, reply) => {
      const shortId = request.params.shortId;

      try {
        const originalUrl = await UrlService.redirect(shortId);
        request.log.info({ msg: 'url redirected', shortId });

        reply.redirect(originalUrl);
      } catch (e) {
        reply.code(404).send();
        request.log.warn({ msg: 'url not found', shortId });
      }
    },
  );
};
