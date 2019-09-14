import indent from 'strip-indent';

export default ({
    html,
    state,
    main_js,
    main_css,
    pageMeta,
    node_modules,
    common_node_modules
}) => {
    const {$title} = pageMeta;
    return indent(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>${$title}</title>
                <link rel="Shortcut Icon" href="https://static.zhihu.com/heifetz/assets/apple-touch-icon-120.b3e6278d.png">
                <script src="https://cdn.jsdelivr.net/npm/vue"></script>
                <script src="https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js"></script>
                <script>window.__INITIAL_STATE__=${state}</script>
                ${main_css}
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
