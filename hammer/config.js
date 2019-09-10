const cwd = process.cwd();
const path = require('path');

module.exports = {
    port: 3000,
    path: {
        root: cwd,
        config: path.join(cwd, 'config/'),
        client: path.join(cwd, 'client/'),
        page: path.join(cwd, 'client', 'page/'),
        server: path.join(cwd, 'server/'),
        middleware: path.join(cwd, 'server', 'middleware/'),
        controller: path.join(cwd, 'server', 'controller/'),
        service: path.join(cwd, 'server', 'service/'),
        dist: path.join(cwd, 'dist'),
        static: path.join(cwd, 'static/')
    },
    middlewares: [],
    controllers: {}
};
