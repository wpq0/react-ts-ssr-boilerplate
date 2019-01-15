import * as Koa from 'koa';
import apolloServer from './apollo';

const app = new Koa();
const port = process.env.PORT || 5000;

apolloServer.applyMiddleware({ app });

app.listen(port);
