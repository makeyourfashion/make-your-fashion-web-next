const express = require('express');
const { getCatalog, getSpec, getDesigns, getProductsByCatalog } = require('../baseWebClient');

const router = express.Router();
const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;

const internalError = { error: 'internal server error' };

router.get('/category', (req, res) => {
  getCatalog(1).then((categories) => {
    res.json(categories);
  }).catch((e) => {
    console.error(e.stack);
    res.json(internalError);
  });
});

router.get('/category/:id', (req, res) => {
  getProductsByCatalog(req.params.id)
    .then((retVal) => {
      res.json(retVal);
    }).catch((e) => {
      console.error(e.stack);
      res.json(internalError);
    });
});

router.get('/spec/:id', (req, res) => {
  getSpec(req.params.id).then((spec) => {
    res.json(spec);
  }).catch((e) => {
    console.error(e.stack);
    res.json(internalError);
  });
});

router.get('/designs', (req, res) => {
  getDesigns().then((designs) => {
    res.json(designs);
  }).catch((e) => {
    console.error(e.stack);
    res.json(internalError);
  });
});

router.get('/account', (req, res) => {
  if (req.cookies.myf_token) {
    res.json({ phone: '13685312558', name: 'Puxuan' });
  } else {
    res.status(401).send('unauthorized');
  }
});

router.post('/login', (req, res) => {
  const { phone, password, rememberPassword } = req.body;
  if (phone && password) {
    res.cookie('myf_token', '1234', {
      maxAge: rememberPassword ? TEN_DAYS : null,
      httpOnly: true,
    });
    res.json({ phone: '13685312558', name: 'Puxuan' });
  } else {
    res.status(400).send('bad request');
  }
});

router.post('/account', (req, res) => {
  const { phone, password, passwordConfirm } = req.body;
  if (phone && password && password === passwordConfirm) {
    res.cookie('myf_token', '1234', { maxAge: TEN_DAYS, httpOnly: false });
    res.json({ phone: '13685312558', name: 'Puxuan' });
  } else {
    res.status(400).send('bad request');
  }
});

module.exports = router;
