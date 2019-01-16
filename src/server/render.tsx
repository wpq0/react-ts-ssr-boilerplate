import { readFileSync } from 'fs';
import { Context } from 'koa';
import MultiStream from 'multistream';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Readable } from 'stream';
import paths from '../../config/paths';
import App from '../shared/app/App';

const manifest = JSON.parse(
    readFileSync(`${paths.buildClient}/manifest.json`).toString()
) as { [key: string]: string };

const toStream = (input: string) => {
    return new Readable({
        read() {
            this.push(input);
            this.push(null);
        },
    });
};

export default async (ctx: Context, next: () => Promise<any>) => {
    //
    //
    const app = (
        <Router>
            <App />
        </Router>
    );
    const title = 'From server';
    // TODO: redux initial state, helmet, critical css, loadables...
    // TODO: hot module reloading
    const ms = new MultiStream([
        toStream(`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <link href="${manifest['app.css']}" rel="stylesheet">
    </head>
    <body>
        <div id="app">
`),
        renderToNodeStream(app),
        toStream(`
        </div>
        <script src="${manifest['app.js']}" type="text/javascript"></script>
    </body>
</html>
`),
    ]);
    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = ms;
};
