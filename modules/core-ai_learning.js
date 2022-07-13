return;
const nodejieba = require('nodejieba');
const fs = require('fs');
const path = require('path')
const log = require('log-to-file');
log('Some data');

const topN = 200; /* 找出100個關鍵詞 */
fs.readdirSync(path.resolve(__dirname, '../assets/ai_traning/')).forEach(function (file) {
    if (file.match(/\.txt$/)) {
        const sentence = fs.readFileSync(path.resolve(__dirname, '../assets/ai_traning/' + file), 'utf8')
        const result = nodejieba.textRankExtract(sentence, topN);
        console.log(result);
        log(JSON.stringify(result), '../assets/ai_traning/result/' + file + '.json');
    }
});


