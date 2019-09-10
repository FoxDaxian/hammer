// 引入babel 解析es6+语法

const Koa = require('koa');
const http = require('http');

const config = require('./config');
const middleware = require('./core/middleware');
const response = require('./core/response');
const controller = require('./core/controller');
const Static = require('./core/static');
const service = require('./core/service.js');

class Hammer extends Koa {
    constructor(conf) {
        super();
        this.middlewares = [];
        this.config = {...config, ...conf};
        this.use(service(this));
        this.use(middleware(this));
        this.use(Static(this));
        this.use(controller(this));
        this.use(response(this));
    }
    start(cb) {
        this.server = http.createServer(this.callback());
        return this.server.listen(this.config.port, () => {
            this.emit('start')
            cb && cb()
        });
    }
    stop(cb) {
        const {server} = this;
        if (server && server.listening) {
            server.close(() => {
                this.emit('stop');
                cb && cb();
            });
        } else {
            this.emit('stop');
            cb && cb();
        }
    }
}
module.exports = Hammer;
