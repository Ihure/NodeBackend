# Backend API


## Features

 - [Docker](https://www.docker.com/) compose to build the application
 - [Nginx](https://www.nginx.com/) for Load balancing
 - Redis server for cache
 - CORS enabled
 - Uses [yarn](https://yarnpkg.com)
 - Express + Mysql using ([sequalize](http://docs.sequelizejs.com/))
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Uses [ratelimiter](https://github.com/tj/node-ratelimiter) to prevent Brute force Attacks
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
 - Logging with [morgan](https://github.com/expressjs/morgan)
 - Authentication and Authorization with [passport](http://passportjs.org)
 - API documentation geratorion with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## Requirements

 - [Node v8.0+](https://nodejs.org/en/download/current/) 
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Docker](https://www.docker.com/)

## Getting Started

Build Docker Containers:

```bash
docker-compose build
```

## Running Locally

```bash
docker-compose up
```

## Test

```bash
# run tests
cd api
yarn test
```


## Documentation

```bash
# generate and open api documentation
visit <yourip>/api/v1/docs
```
