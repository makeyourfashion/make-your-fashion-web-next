const express = require('express');
const next = require('next');
const api = require('./server/api');
const mobxReact = require('mobx-react');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

mobxReact.useStaticRendering(true);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.disable('x-powered-by');
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(compression());
  server.use('/api', api);
  server.get('*', (req, res) => handle(req, res));
  server.listen(3000);
});
