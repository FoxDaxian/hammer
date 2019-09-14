const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

function fileType(path) {
    return new Promise(res => fs.stat(path, (err, stats) => res(err || stats)));
}

function exist(filePath) {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

async function readDir(dirPath) {
    return new Promise(res => {
        fs.readdir(dirPath, function(err, files) {
            if (err) {
                return res(err);
            }
            res(files);
        });
    });
}

module.exports = async (projectName) => {
    const cwd = process.cwd();
    async function copyAction(from, to, ignore) {
        await _copy(from, to, ignore);
        async function _copy(from, to, ignore) {
            if (!exist(to)) {
                fs.mkdirSync(to);
            }

            const files = await readDir(from);

            for (let i = 0, len = files.length; i < len; i++) {
                const curFile = files[i];
                if (ignore.indexOf(curFile) !== -1) {
                    continue;
                }
                const fromAbsolutePath = path.join(from, curFile);
                const type = await fileType(fromAbsolutePath);

                if (type instanceof Error) {
                    console.log('file type error');
                } else {
                    toAbsolutePath = path.join(to, curFile);
                    if (type.isFile()) {
                        fs.createReadStream(fromAbsolutePath).pipe(
                            fs.createWriteStream(toAbsolutePath)
                        );
                    } else if (type.isDirectory()) {
                        await _copy(fromAbsolutePath, toAbsolutePath, ignore);
                    }
                }
            }
        }
    }
    const spinner = ora('creating......').start();
    await copyAction(
        path.join(__dirname, 'template'),
        path.join(cwd, projectName),
        ['.DS_Store']
    );
    spinner.stop();
    console.log(chalk.cyan('template created!\n'));
    console.log(chalk.cyan('excuting an order:'));
    console.log(chalk.cyan(`    cd ${projectName}`));
    console.log(chalk.cyan('    npm i | yarn'));
    console.log(chalk.cyan('    npm run dev\n'));
    console.log(chalk.cyan('have a nice day!'));
    console.log(chalk.cyan('    (- v -)'));
};
