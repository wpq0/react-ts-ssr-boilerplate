import * as Koa from 'koa';
import * as Router from 'koa-router';
import apolloServer from './apollo';

const app = new Koa();
const port = 5000;
const router = new Router();

apolloServer.applyMiddleware({ app });

router.get('/', async ctx => {
    ctx.response.body = 'heheh';
    ctx.response.type = 'text/html';
});

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(port);
