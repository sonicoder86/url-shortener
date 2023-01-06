import { config } from './config';
import { createServer } from './server';
import { connect } from './db';

const server = createServer();
connect().catch(console.error);

server.listen({ port: config.port }, (err) => {


  if (err) {
    console.error(err);
    process.exit(1);
  }
});
