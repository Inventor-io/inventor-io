const fs = require('fs');

const readJSONFile = filename => JSON.parse(fs.readFileSync(filename, 'utf8'));

// export readJSONFile
module.exports = readJSONFile;
