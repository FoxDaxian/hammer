const fs = require('fs');
const path = require('path');

const getFiles = async dirPath => {
    let res = [];
    return new Promise(resolve => {
        fs.readdir(dirPath, async (err, files) => {
            if (err) {
                process.exit(1);
            }
            for (let i = 0, len = files.length; i < len; i++) {
                const filePath = path.join(dirPath, files[i]);
                if (fs.statSync(filePath).isDirectory()) {
                    const tempRes = await getFiles(filePath);
                    res = [...res, ...tempRes];
                } else {
                    res = [...res, filePath];
                }
            }
            return resolve(res);
        });
    });
};

module.exports = getFiles;
