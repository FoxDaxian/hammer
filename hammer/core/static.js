const url = require('url');
const path = require('path');
const utils = require('../utils');
const mime = require('mime');
const fs = require('fs');
const chalk = require('chalk');


module.exports = hammer => {
    const distPath = hammer.config.path.dist;
    return async (ctx, next) => {
        const {pathname} = url.parse(ctx.url);
        // https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
        if (pathname === '/favicon.ico') {
            return ctx.status = 204;
        }
        let filename = path.join(distPath, pathname);

        if (filename.endsWith('/')) {
            filename += 'index.html';
        }
        const stat = await utils.fileType(filename);

        if (stat instanceof Error) {
            await next();
            if (!ctx.notNeedBody && !ctx.body) {
                // http://nodejs.cn/api/errors.html#errors_common_system_errors
                const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
                if (notfound.includes(stat.code)) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(chalk.red(`${pathname} is not found`));
                    }
                    ctx.status = 404;
                }
            }
            return;
        } else if (stat.isDirectory()) {
            ctx.res.writeHead(301, {Location: `${pathname}/`});
            ctx.res.end();
        }
        ctx.currentReqStatus = 'static';
        const contentType = mime.getType(filename);

        // https://harttle.land/2017/04/04/using-http-cache.html
        ctx.response.set('Cache-Control', 'public, max-age=604800');
        let etag = utils.getHash(`${stat.mtime}.${stat.size}`);
        ctx.response.set('etag', etag);
        if (ctx.request.get('if-none-match') === etag) {
            ctx.status = 304;
            return;
        }
        etag = utils.getHash(`${stat.mtime}.${stat.size}`);
        ctx.response.set('etag', etag);
        ctx.set('Content-Length', stat.size);
        ctx.set('Content-Type', contentType + `; charset=${'UTF-8'}`);
        ctx.body = fs.createReadStream(filename);
    };
};
