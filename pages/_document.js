import Document, { Main, NextScript, Head } from 'next/document';
import styles from '../components/global.css';

export default class MyDocument extends Document {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <html lang="en-US">
        <Head>
          <title>意栈网</title>
          {/*<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />*/}
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <style dangerouslySetInnerHTML={{ __html: styles }} />
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}