import Koa from 'koa';
import staticMiddleWare from 'koa-static';
import paths from '../../config/paths';
import apolloServer from './apollo';
import renderApp from './render';

const port = process.env.PORT || 5000;

const server = new Koa();
apolloServer.applyMiddleware({ app: server });
server.use(staticMiddleWare(paths.buildClient) as any);
server.use(renderApp);
// TODO: handle errors, 404...
server.listen(port);
