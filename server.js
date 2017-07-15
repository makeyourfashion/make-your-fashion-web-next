const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');
const mobxReact = require('mobx-react');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const url = require('url');

mobxReact.useStaticRendering(true);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function getApiHost() {
  return 'localhost:9000';
}

app.prepare().then(() => {
  const server = express();

  server.disable('x-powered-by');
  server.use(cookieParser());
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(compression());
  server.use('/api', proxy(getApiHost(), {
    proxyReqPathResolver(req) {
      return `/api/${url.parse(req.url).path}`;
    },
  }));
  server.get('*', (req, res) => handle(req, res));
  server.listen(3000);
});
