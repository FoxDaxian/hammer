const path = require('path');
const chalk = require('chalk');

module.exports = fileName => {
    try {
        const hammerPath = require.resolve(
            path.join(process.cwd(), 'node_modules', 'hammer', fileName)
        );
        return require(hammerPath);
    } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(
                chalk.red(
                    `can't find moudle: '${fileName}', please check your hammer version.`
                )
            );
        }
        process.exit(1);
    }
};
