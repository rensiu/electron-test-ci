const fs = require('fs')
fs.writeFileSync('../vana-release/package.json', fs.readFileSync('./package.json'))