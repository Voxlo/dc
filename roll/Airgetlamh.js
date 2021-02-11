"use strict";
const {
    DynamicLoader
} = require('bcdice');

async function callDice(gameType, message) {
    const loader = new DynamicLoader();
    const GameSystem = await loader.dynamicLoad(gameType);
    const result = GameSystem.eval(message);
    return result.text;
}
var variables = {};

var gameName = function () {
    return '【朱の孤塔】 .al (nALx*p)'
}

var gameType = function () {
    return 'Dice:Airgetlamh'
}
var prefixs = function () {
    return [{
        first: /^[.]al$/i,
        second: null
    }]
}
var getHelpMessage = function () {
    return "【朱の孤塔のエアゲトラム】" + "\n\
・啓動語 .al (指令) 如 .al nALx*p\n\
・命中判定\n\
.al [n]AL[X]*[p]：「n」で連射数を指定、「X」で目標値を指定、「p」で威力を指定。\n\
「*」は「x」でも代用化。\n\
例：.al 3AL7*5 → 3連射で目標値7、威力5、5AL5x3 → 5連射で目標値5、威力3\n"
}
var initialize = function () {
    return variables;
}

var rollDiceCommand = async function ({
    mainMsg
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    let result = '';
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = this.getHelpMessage();
            return rply;
        default:
            result = await callDice("Airgetlamh", mainMsg[1])
            if (result)
                rply.text = mainMsg[1] + ' ' + result;
            return rply;
    }

}


module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};