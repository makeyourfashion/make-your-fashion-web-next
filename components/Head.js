import Head from 'next/head';

const _Head = ({ scripts = [] }) => (
  <Head>
    <title>意栈网</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="/static/material-components-web.min.css" />
    <link rel="stylesheet" href="/static/global.css" />
    {
      scripts.map(src => <script key={src} src={src} />)
    }
  </Head>
);

export default _Head;
