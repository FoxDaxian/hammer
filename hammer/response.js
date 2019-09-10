const path = require('path');
const config = require('./config');
const utils = require('./utils');
const cwd = process.cwd();
const Vue = utils.require(path.join(cwd, 'node_modules', 'vue'));

class Response {
    constructor({header = {}, status = 200, body = 'ok'} = {}) {
        this.header = header;
        this.status = status;
        this.body = body;
    }
    set(name, value) {
        this.header[name] = value;
        return this;
    }
    response(response) {
        const {status, header, body} = this;
        // https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
        response.writeHead(status, header);
        response.end(body);
        return this;
    }
}
Response.render = async (view, options = {}) => {
    return async ctx => {
        try {
            const viewPath = require.resolve(
                path.join(config.path.page, `${view}/index.js`)
            );
            const creactApp = utils.require(viewPath);
            if (!creactApp) {
                return console.error("Can't find app file, please check.");
            }
            const {app, router, store} = creactApp();
            app.$$clientName = view;
            app.$$options = options;
            if (router) {
                app.ferouter = router;
            }
            if (store) {
                app.festore = store;
            }
            return app;
        } catch (e) {
            return e;
        }
    };
};

Response.json = async data => {
    // 设置对象，那么转义为json，有的需要ctx上的，有的不需要
    return ctx => data;
};

Response.redirect = async (url, alt) => {
    // 设置对象，那么转义为json，有的需要ctx上的，有的不需要
    return ctx => {
        ctx.status = 302;
        ctx.redirect(url, alt)
    };
};

module.exports = Response;
