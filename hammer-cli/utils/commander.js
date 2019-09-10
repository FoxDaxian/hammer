const parseArgs = require('minimist'); // https://github.com/substack/minimist

const commander = () => {
    const commanders = {};

    const api = {
        addCommander: (commanderName, cb) => {
            commanders[commanderName] = cb;
            return api;
        },
        invoke: () => {
            // parse arguments
            const args = parseArgs(process.argv.slice(2));
            const commanderName = args._[0];
            if (commanderName in commanders) {
                // 传递参数
                commanders[commanderName].call(null, args);
            } else {
                commanders['help']();
            }
        }
    };
    return api;
};

module.exports = commander;
