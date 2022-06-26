// @ts-expect-error TS(6200): Definitions of the following identifiers conflict ... Remove this comment to see the full error message
"use strict";
//heroku labs:enable runtime-dyno-metadata -a <app name>
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'chineseCon... Remove this comment to see the full error message
var chineseConv = require('chinese-conv'); //繁簡轉換
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const duckImage = require("@zetetic/duckduckgo-images-api")
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'wiki'.
const wiki = require('wikijs').default;
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const rollbase = require('./rollbase.js');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'translate'... Remove this comment to see the full error message
const translate = require('@vitalets/google-translate-api');
var variables = {};
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'schema'.
const schema = require('../modules/schema.js');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'VIP'.
const VIP = require('../modules/veryImportantPerson');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'translateC... Remove this comment to see the full error message
const translateChannel = require('../modules/translate');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'limitArr'.
const limitArr = [0, 2, 4, 6, 8, 9, 9, 9];
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'opt'.
const opt = {
	upsert: true,
	runValidators: true
}
var gameName = function () {
	return '【Wiki查詢/圖片搜索】 .wiki .image .tran'
}

var gameType = function () {
	return 'funny:Wiki:hktrpg'
}
var prefixs = function () {
	return [{
		first: /^[.]wiki$|^[.]tran$|^[.]tran[.]\S+$|^[.]image$|^[.]imagee$|^[.]translate$/i,
		second: null
	}];

}

var getHelpMessage = async function () {
	return `【Wiki查詢/即時翻譯】.wiki .image .tran .tran.(目標語言)
Wiki功能		： .wiki (條目)  
EG: .wiki BATMAN  

圖片搜尋功能	： .Image (內容)  
從Google 得到相關隨機圖片Link
隨機YES NO: 如.image yesno 會得到yes 或NO 結果

即時翻譯功能	： .tran (內容)  
預設翻譯成正體中文 
EG: .tran BATMAN 

VIP功能:同步式頻道傳譯功能
.translate on
.translate off

可翻譯成其他語言 ： .tran.(語系) (內容)
EG: .tran.ja BATMAN  .tran.日 BATMAN
常用語言代碼: 英=en, 簡=zh-cn, 德=de, 日=ja
語系代碼 https://github.com/vitalets/google-translate-api/blob/master/languages.js

注: 翻譯使用Google Translate
`
}
var initialize = function () {
	return variables;
}

var rollDiceCommand = async function ({
// @ts-expect-error TS(7031): Binding element 'inputStr' implicitly has an 'any'... Remove this comment to see the full error message
	inputStr,
// @ts-expect-error TS(7031): Binding element 'mainMsg' implicitly has an 'any' ... Remove this comment to see the full error message
	mainMsg,
// @ts-expect-error TS(7031): Binding element 'groupid' implicitly has an 'any' ... Remove this comment to see the full error message
	groupid,
// @ts-expect-error TS(7031): Binding element 'channelid' implicitly has an 'any... Remove this comment to see the full error message
	channelid,
// @ts-expect-error TS(7031): Binding element 'botname' implicitly has an 'any' ... Remove this comment to see the full error message
	botname,
// @ts-expect-error TS(7031): Binding element 'userrole' implicitly has an 'any'... Remove this comment to see the full error message
	userrole
}) {
	let rply = {
		default: 'on',
		type: 'text',
		text: ''
	}; //type是必需的,但可以更改
	let lang = '',
		test = '';
	//let result = {};

	switch (true) {
		case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
// @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
			rply.text = await this.getHelpMessage();
			return rply;
		case /\S+/.test(mainMsg[1]) && /[.]wiki/i.test(mainMsg[0]):
			rply.text = await wiki({
				apiUrl: 'https://zh.wikipedia.org/w/api.php'
			}).page(mainMsg[1].toLowerCase())
// @ts-expect-error TS(7006): Parameter 'page' implicitly has an 'any' type.
				.then(async page => {
					return chineseConv.tify(await page.summary())
				})
// @ts-expect-error TS(7006): Parameter 'error' implicitly has an 'any' type.
				.catch(error => {
					if (error == 'Error: No article found')
						return '沒有此條目'
					else {
						return error
					}
				})
			return rply;
		case /\S+/.test(mainMsg[1]) && /^[.]tran$/i.test(mainMsg[0]):
			rply.text = await translate(inputStr.replace(mainMsg[0], ""), {
				to: 'zh-TW'
// @ts-expect-error TS(7006): Parameter 'res' implicitly has an 'any' type.
			}).then(res => {
				return res.text
// @ts-expect-error TS(7006): Parameter 'err' implicitly has an 'any' type.
			}).catch(err => {
				return err.message;
			});
			return rply;
		/**
	case /^[.]translate$/i.test(mainMsg[0]): {
		if (botname !== "Discord") {
			rply.text = '這是Discord 限定功能';
			return rply;
		}
		if (userrole < 3) {
			rply.text = '本功能只能由admin 啓動開關';
			return rply;
		}
		if (/^on$/i.test(mainMsg[1])) {
			let check = await schema.translateChannel.find({
				groupid: groupid,
				switch: true
			}).countDocuments().catch(error => console.error('translate #111 mongoDB error: ', error.name, error.reson));
			let gpLv = await VIP.viplevelCheckGroup(groupid);
			let limit = limitArr[gpLv];
			if (check.length >= limit) {
				rply.text = '此群組翻譯上限為' + limit + '條頻道' + '\n支援及解鎖上限 https://www.patreon.com/HKTRPG\n';
				return rply
			}
			await schema.translateChannel.findOneAndUpdate({
				groupid: groupid,
				channelid: channelid
			}, {
				switch: true
			}, opt);
			translateChannel.translateSwitchOn(channelid)
			rply.text = '此頻道已開啓翻譯功能。'
			return rply
		}
		if (/^off$/i.test(mainMsg[1])) {
			await schema.translateChannel.findOneAndUpdate({
				groupid: groupid,
				channelid: channelid
			}, {
				switch: false
			}, opt);
			translateChannel.translateSwitchOff(channelid)
			rply.text = '此頻道已關閉翻譯功能。'
			return rply
		}

		rply.text = '沒有正確指令，需要輸入.translate on 或.translate off 去啓動/關閉翻譯功能'

		return rply
	}
	 */
		case /\S+/.test(mainMsg[1]) && /^[.]tran[.]\S+$/.test(mainMsg[0]):
// @ts-expect-error TS(2322): Type 'RegExp' is not assignable to type 'string'.
			lang = /.tran.(\S+)/;
			test = mainMsg[0].match(lang)
			rply.text = await translate(inputStr.replace(mainMsg[0], ""), {
				to: test[1].replace(/簡體|簡中|簡|zh-cn/, "zh-CN").replace(/英文|英語|英/, "en").replace(/德文|德語|德/, "de").replace(/日文|日語|日/, "ja")
// @ts-expect-error TS(7006): Parameter 'res' implicitly has an 'any' type.
			}).then(res => {
				return res.text
// @ts-expect-error TS(7006): Parameter 'err' implicitly has an 'any' type.
			}).catch(err => {
				console.error('tran error:', err.message)
				return err.message + "\n常用語言代碼: 英=en, 簡=zh-cn, 德=de, 日=ja\n例子: .tran.英\n.tran.日\n.tran.de";
			});
			return rply;
		case /\S+/.test(mainMsg[1]) && /^[.]image$/i.test(mainMsg[0]):
			try {
				rply.text = await searchImage(inputStr, mainMsg, true)
				rply.type = 'image'
			} catch (error) {
				console.error('.image error #108')
				return rply;
			}
			return rply;

		case /\S+/.test(mainMsg[1]) && /^[.]imagee$/i.test(mainMsg[0]):
			//成人版
			try {
				rply.text = await searchImage(inputStr, mainMsg, false)
				rply.type = 'image'
			} catch (error) {
				console.error('.image error #119')
				return rply;
			}
			return rply;
		default:
			break;
	}
}

// @ts-expect-error TS(7006): Parameter 'inputStr' implicitly has an 'any' type.
async function searchImage(inputStr, mainMsg, safe) {
	let keyword = inputStr.replace(mainMsg[0] + " ", "")
	//let page = Math.floor((Math.random() * (10)) * 10) + 1;
	if (mainMsg[1].match(/^yesno$/i)) {
		//隨機YES NO
		let A = ['yes', 'no']
		keyword = A[rollbase.Dice(A.length) - 1] + " GIF";
	}
	return await duckImage.image_search({
		query: keyword,
		moderate: safe
	})
// @ts-expect-error TS(7006): Parameter 'images' implicitly has an 'any' type.
		.then(async images => {
			if (images[0] && images[0].image) {
				//let resultnum = Math.floor((Math.random() * (images.length)) + 0)
				let resultnum = rollbase.Dice(images.length) - 1;
				return images[resultnum].image;
			} else {
				return '沒有結果'
			}

// @ts-expect-error TS(7006): Parameter 'err' implicitly has an 'any' type.
		}).catch(err => {
			console.error('duckImage error: ', err & err.respone && err.respone.statusText)
		})
}


// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
	rollDiceCommand: rollDiceCommand,
	initialize: initialize,
	getHelpMessage: getHelpMessage,
	prefixs: prefixs,
	gameType: gameType,
	gameName: gameName
};