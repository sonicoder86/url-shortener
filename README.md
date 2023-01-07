# Url Shortener

## Development

Start the server (Fastify) locally, it'll restart on file changes automatically.
The running application is available on [http://localhost:8080](http://localhost:8080)

```shell
cp .env.example .env
docker-compose up -d
npm run dev
```

Run all the tests (Jest).

```shell
npm test
```

Run specific test.

```shell
npm test -- create.route
```

Lint the files (ESLint).

```shell
npm run lint
```

Build project for production.

```shell
npm run build
```
