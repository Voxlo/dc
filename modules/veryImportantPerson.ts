"use strict";
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'schema'.
const schema = require('./schema.js');
var viplevel: any;
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const DIYmode = (process.env.DIY) ? true : false;
var viplevelCheckGroup = async function (groupID: any) {
    let rply = 0;
    if (!viplevel) {
        viplevel = await schema.veryImportantPerson.find({}).catch((error: any) => console.error('vip #8 mongoDB error: ', error.name, error.reson));
    }
    var findGP = viplevel.find(function (item: any) {
        return item.gpid == groupID && item.switch !== false;
    });
    rply = (findGP) ? findGP.level : 0;
    rply = (DIYmode) ? 5 : rply;
    return rply;
}
var viplevelCheckUser = async function (userid: any) {
    let rply = 0;
    if (!viplevel) {
        viplevel = await schema.veryImportantPerson.find({}).catch((error: any) => console.error('vip #20 mongoDB error: ', error.name, error.reson));
    }
    var findUser = viplevel.find(function (item: any) {
        return item.id == userid && item.switch !== false; // 
    });
    rply = (findUser) ? findUser.level : 0;
    rply = (DIYmode) ? 5 : rply;
    return rply;
}
async function renew() {
    viplevel = await schema.veryImportantPerson.find({}).catch((error: any) => console.error('vip #30 mongoDB error: ', error.name, error.reson));
}

//每10分鐘更新;
setInterval(renew, 10 * 60 * 1000);

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
    viplevelCheckGroup: viplevelCheckGroup,
    viplevelCheckUser: viplevelCheckUser,
    renew: renew
}