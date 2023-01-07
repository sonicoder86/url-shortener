import { config } from './config';
import { createServer } from './server';
import { connect, disconnect } from './db';

const server = createServer();

connect()
  .then(() => {
    server.listen({ port: config.port }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  })
  .catch(console.error);

process.once('SIGTERM', async () => {
  await server.close();
  await disconnect();
  console.log('SIGINT received');
});
