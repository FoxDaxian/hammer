const indent = require('strip-indent');
const path = require('path');
const utils = require('./utils');
const hammerConfig = require('./config');
const glob = require('glob');
const _require = utils.require;

const defaultRender = async config => {
    const {target = 'app', html = '', view = '', pageMeta = {}, state} = config;
    const {$title = 'undefined title'} = pageMeta;
    let render = path.join(hammerConfig.path.service, 'renderer.js');
    render = _require(render);
    const distDir = hammerConfig.path.dist;

    const requestBaseDir = path.join(distDir, view);
    const requestCommonDir = path.join(distDir, 'common');

    let node_modules = new RegExp(`.*(/${view}/vendors/node_modules.[^.]+.js)`);
    let main_css = new RegExp(`.*(/${view}/css/main.[^.]+.css)`);
    let main_js = new RegExp(`.*(/${view}/js/main.[^.]+.js)`);
    let common_node_modules = new RegExp(
        `.*(/common/vendors/node_modules.[^.]+.js)`
    );

    const files = glob.sync(`${requestBaseDir}/**/*.*`);
    for (let i = 0, len = files.length; i < len; i++) {
        if (node_modules.test && node_modules.test(files[i])) {
            node_modules = files[i].replace(node_modules, '$1');
            continue;
        }
        if (main_css.test && main_css.test(files[i])) {
            main_css = files[i].replace(main_css, '$1');
            continue;
        }
        if (main_js.test && main_js.test(files[i])) {
            main_js = files[i].replace(main_js, '$1');
            continue;
        }
    }
    const commonFiles = glob.sync(`${requestCommonDir}/**/*.*`);

    for (let i = 0, len = commonFiles.length; i < len; i++) {
        if (common_node_modules.test(commonFiles[i])) {
            common_node_modules = commonFiles[i].replace(
                common_node_modules,
                '$1'
            );
            break;
        }
    }

    node_modules = typeof node_modules === 'string' && utils.exist(path.join(distDir, node_modules))
        ? `<script src="${node_modules}" ></script>`
        : '';
    main_css = utils.exist(path.join(distDir, main_css))
        ? `<link rel="stylesheet" href="${main_css}" />`
        : '';
    main_js = utils.exist(path.join(distDir, main_js))
        ? `<script src="${main_js}" ></script>`
        : '';
    common_node_modules = typeof common_node_modules === 'string' && utils.exist(path.join(distDir, common_node_modules))
        ? `<script src="${common_node_modules}" ></script>`
        : '';

    if (typeof render === 'function') {
        return render({
            html,
            state,
            main_js,
            main_css,
            pageMeta,
            node_modules,
            common_node_modules
        });
    }

    return indent(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>${$title}</title>
                <script>window.__INITIAL_STATE__=${state}</script>
                ${main_css}
                <!-- vue或者react，需要进行判断 -->
                <!-- why use this below: https://cn.vuejs.org/v2/guide/installation.html -->
                <script src="https://cdn.jsdelivr.net/npm/vue"></script>
                <!-- npm vendor -->
                ${node_modules}
                ${common_node_modules}
            </head>
            <body>
                ${html}
                ${main_js}
            </body>
        </html>
    `);
};

module.exports = defaultRender;
