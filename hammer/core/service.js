const path = require('path');
const utils = require('../utils');
const fs = require('fs');
const chalk = require('chalk');
const glob = require('glob');

module.exports = hammer => {
    const servicePath = hammer.config.path.service;
    const coreServicePath = path.join(__dirname, '../services/');

    const services = {};

    glob.sync(`${servicePath}/**/*.js`).forEach(service => {
        const mod = utils.require(service);
        const key = path.basename(service).replace('.js', '');
        if (key !== 'renderer') {
            services[key] = mod;
        }
    });
    glob.sync(`${coreServicePath}/**/*.js`).forEach(coreService => {
        const mod = utils.require(coreService);
        const key = path.basename(coreService).replace('.js', '');
        services[key] = mod;
    });

    hammer.services = services;

    return async (ctx, next) => {
        const services = {...hammer.services};
        for (let serviceName in services) {
            // 返回一个绑定this的函数吧，不然每次都全部执行很浪费性能的
            services[serviceName] = services[serviceName](hammer).bind(null, ctx);
        }
        ctx.services = services;
        await next();
    };
};
