const fs = require('fs');

const createNewDirectory = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
};

module.exports = createNewDirectory;
