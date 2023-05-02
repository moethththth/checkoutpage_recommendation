/*
 * ユーティリティＪＳメソッド
 * 
 * Dependencies none
 * Updated 2009.10.01
 */

// リスナーを登録するメソッド（クロスブラウザ）
function ebisu_registEventListener(target, type, listener) {
	if (target.addEventListener) {
		target.addEventListener(type, listener, false);
	} else if (target.attachEvent) {
		target.attachEvent('on' + type, function() {return listener.call(target, window.event); });
	} else target['on' + type] = function(e) {return listener.call(target, e || window.event); };
}

// クロスブラウザ対応のDIV位置指定
function ebisu_setDivPosition(div, left, top){
	if (document.layers){ div.moveTo(left,top); return; } // NN4
	// IE5+, Mozilla, Opera 7
	if (typeof div.style.left != "undefined" && typeof div.style.left == "string") { 
		div.style.left = left + 'px';
		div.style.top = top + 'px';
	} else if (typeof div.style.pixelLeft != "undefined"){ // IE4, Opera 6
		div.style.pixelLeft = left;
		div.style.pixelTop = top;
	}
}

// 自動的にクリアされる画面メッセージセット（１０秒後にクリアされます） 
var _ebisu_nowMessageClearMap = new Object();
var MESSAGE_TYPE_ERROR = 1;
var MESSAGE_TYPE_WARN = 2;
var MESSAGE_TYPE_INFO = 3;
function ebisu_setMessage(messageDiv, message, messagType) {
	// クリア時のキー
	var randomKey = Math.random();
	if (messagType != null) {
		if (messagType == MESSAGE_TYPE_ERROR) {
			document.getElementById(messageDiv).style.color="red"
		} else if (messagType == MESSAGE_TYPE_WARN) {
			document.getElementById(messageDiv).style.color="yellow"
		} else if (messagType == MESSAGE_TYPE_INFO) {
			document.getElementById(messageDiv).style.color="blue"
		}
	}
	document.getElementById(messageDiv).innerHTML = message;
	// タイマーでメッセージクリア
	(function(randomKey){
		window.setTimeout(function() { _ebisu_clearMessage(randomKey); }, 120000);
	})(randomKey);
	_ebisu_nowMessageClearMap[messageDiv] = randomKey;
}
// メッセージクリアされるコールバック関数
function _ebisu_clearMessage(randomKey) {
	// マップの中からにkeyがあるか調べる
	for (var key in _ebisu_nowMessageClearMap) {
		if (_ebisu_nowMessageClearMap[key] == randomKey) {
			document.getElementById(key).innerHTML = '';
		}
	}
}


//日時と日付のフォーマット
function ebisu_formatDateTime(control, isSecond) {
	//オリジナルのvalueを保持する
	var originalControlValue = control.value;
	
	//日時に分解する
	var splits = control.value.split(" ");
	
	//空文字を取り除く
	var notSpaceSplit = [];
	for (var i = 0; i < splits.length; ++i) {
		if (splits[i] !== "") {notSpaceSplit.push(splits[i])};
	}
	
	try {	
		//日付と時間があるか確認する
		if (notSpaceSplit.length != 2) {
			if (notSpaceSplit.length == 1) {
				ebisu_formatDate(control);
				var date = control.value;
				//値を挿入する
				control.value = (date + " 00:00").split("-").join("/");
			} else {
				control.value = originalControlValue;
			}
			return;
		}

		//フォーマットした日付取得
		control.value = notSpaceSplit[0];
		ebisu_formatDate(control);
		var date = control.value;
		
		//フォーマットした時間を取得
		control.value = notSpaceSplit[1];
		ebisu_formatTime(control, isSecond);
		var time = control.value;
		
		var timeSplit = time.split(":");
		if (isSecond) {
			//hh:mmならhh:mm:00にする
			if (timeSplit.length == 2) {
				time = time + ":00";
			}
		} else {
			//hh:mm:ssならhh:mmにする
			if (timeSplit.length == 3 ) {
				time = time.substr(0, time.length - ":".length - timeSplit[2].length);
			}
		}
		
		//値を挿入する
		control.value = (date + " " + time).split("-").join("/");
	} catch (e) {
		control.value = originalControlValue;
		throw e;
	}
	
}

// 日付フォーマット
function ebisu_formatDate(control) {
	var temp = control.value.toLowerCase();
	if (temp == '') {
		return;
	}
	if (!isNaN(temp) && temp.length == 8) {
		temp = temp.substring(0, 4) + "/" + temp.substring(4, 6) + "/" + temp.substring(6, 8);
	}
	// すでに日付の場合は何もしない
	if (!ebisu_validDate(control.value)) {
		// 固定のフォーマットの対応
		var today = new Date();
		if (temp == "today" || temp == "tod") {
			temp = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
		} else if (temp == "yesterday" || temp == "yes") {
			today.setDate(today.getDate()-1);
			temp = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
		} else if (temp == "tomorrow" || temp == "tom") {
			today.setDate(today.getDate()+1);
			temp = today.getFullYear() + "/" + (today.getMonth()+ 1) + "/" + today.getDate();
		} else {
			// スラッシュで分解して各フォーマットの対応
			var ymd = temp.split('/');
			if (ymd.length == 1) {
				if (!isNaN(ymd[0])) {
					temp = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + ymd[0];
				}
			} else if (ymd.length == 2) {
				if (!isNaN(ymd[0]) && !isNaN(ymd[1])) {
					temp = today.getFullYear() + "/" + ymd[0] + "/" + ymd[1];
				}
			} else if (ymd.length == 3) {
				if (!isNaN(ymd[0]) && !isNaN(ymd[1]) && !isNaN(ymd[2])) {
					if (ymd[0].length != 4) {
						ymd[0] = parseInt(ymd[0], 10) + 2000;
					}
					temp = ymd[0] + "/" + ymd[1] + "/" + ymd[2];
				}
			}
		}
	}
	var ymd = temp.split('/');
	if (ymd.length == 3) {
		// スペースに続けて時間がある場合は無視するように
		var elseString = "";
		var point = ymd[2].indexOf(" ", 0);
		if (point != -1) {
			elseString = ymd[2].substring(point);
			ymd[2] = ymd[2].substring(0, point);
		}
		temp = ymd[0] + "/" + ebisu_zeroFormat(ymd[1], 2) + "/" + ebisu_zeroFormat(ymd[2], 2) + elseString;
	}
	control.value = temp;
}

//時間フォーマット
function ebisu_formatTime(control, isSecond) {
	if (isSecond == 'undefined' || isSecond == null) {
		isSecond = false;
	}
	var temp = control.value.toLowerCase();
	if (temp == '') {
		return;
	}
	//hhmmをhh:mmに変換
	if (!isSecond && !isNaN(temp) && temp.length == 4) {
		temp = temp.substring(0, 2) + ":" + temp.substring(2, 4);
	}
	//hhmmssをhh:mm:ssに変換
	if (isSecond && !isNaN(temp)) {
		if (temp.length == 4) {
			temp = temp.substring(0, 2) + ":" + temp.substring(2, 4) + ":00";
		} else if (temp.length == 6) {
			temp = temp.substring(0, 2) + ":" + temp.substring(2, 4) + ":" + temp.substring(4, 6);
		}
	}
	// すでに時間の場合は何もしない
	if (!ebisu_validTime(temp, isSecond)) {
		// 固定のフォーマットの対応
		var today = new Date();
		if (temp == "now") {
			if (isSecond) {
				temp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			} else {
				temp = today.getHours() + ":" + today.getMinutes();
			}
		} else {
			// スラッシュで分解して各フォーマットの対応
			var hm = temp.split(':');
			if (hm.length == 1) {
				if (!isNaN(hm[0])) {
					if (!isSecond) {
						temp = today.getHours() + ":" + hm[0];
					} else {
						temp = today.getHours() + ":" + hm[0] + ":" + today.getSeconds();
					}
				}
			}
		}
	}
	// 前ゼロ編集
	var hm = temp.split(':');
	if (!isSecond && hm.length == 2) {
		temp = ebisu_zeroFormat(hm[0], 2) + ":" + ebisu_zeroFormat(hm[1], 2);
	}
	if (isSecond && hm.length == 3) {
		temp = ebisu_zeroFormat(hm[0], 2) + ":" + ebisu_zeroFormat(hm[1], 2) + ":" + ebisu_zeroFormat(hm[2], 2);
	}
	control.value = temp;
}

// ゼロ埋め
function ebisu_zeroFormat(num, max){
	var tmp = "" + num;
	// 先頭の不要な0排除
	while (tmp.indexOf("0", 0) == 0) {
		tmp = tmp.substring(1);
	}
	while (tmp.length < max) {
		tmp = "0" + tmp;
	}
	return tmp;
}

// 日付チェック
function ebisu_validDate(str) {
	var ymd = str.split('/'); // 年月日のデリミタでsplit.
	var y = ymd[0];
	var m = parseInt(ymd[1], 10) - 1; // 0 paddingされてる文字列を整数に. "09" => 9
	var d = parseInt(ymd[2], 10);
	var vd = new Date(y, m, d);
	if (vd.toString() != 'Invalid Date' && vd.getFullYear().toString().length != 3 && vd.getFullYear()== y && vd.getMonth() == m && vd.getDate() == d) {
		return true;
	}
	return false;
}

// 時間チェック（HH:MM or HH:MM:SS）
function ebisu_validTime(str, isSecond) {
	if (isSecond == 'undefined' || isSecond == null) {
		isSecond = false;
	}
	// 正規表現による書式チェック
	if (!isSecond && !str.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)) {
		return false;
	}
	if (isSecond && !str.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/)) {
		return false;
	}
	return true;
//	if (!str.match(/^\d{2}\:\d{2}$/)) {
//		return false;
//	}
//	var vHour = str.substr(0, 2) - 0;
//	var vMinutes = str.substr(3, 2) - 0;
//	if (vHour >= 0 && vHour <= 24 && vMinutes >= 0 && vMinutes <= 59) {
//		return true;
//	}
//	return false;
}

// フォーカス色変更
var ebisu_preColor = "";
function focusBgColorChange(obj) {
	ebisu_preColor = obj.style.backgroundColor;
	obj.style.backgroundColor = '#afeeee';
}
function unfocusBgColorChange(obj) {
	if(ebisu_preColor == obj.style.backgroundColor) {
		obj.style.backgroundColor = '#ffffff';
	} else {
		obj.style.backgroundColor = ebisu_preColor;
	}
}

// ユーティリティ：イベント中止
function ebisu_stopPropagation(e) {
	if (e == null) return;
	if(document.all)
		e.keyCode = null; // キー押下を無効に（IEで必要）
	e.cancelBubble = true;
	e.returnValue = false;
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.preventDefault = true;
}

// 配列のcontains関数
if(!Array.prototype.contains ){
	Array.prototype.contains = function( value ){
		for(var i in this){
			if( this.hasOwnProperty(i) && this[i] === value){
				return true;
			}
		}
		return false;
	}
}

function ebisu_endsWith(str, suffix) {
	return str.match(suffix+"$")==suffix;
}

// ラジオボタンの選択値を取得
function ebisu_getRadioValue(radio) {
	if (radio.length) {
		// ラジオボタンが複数個
		for (var i = 0 ; i < radio.length ; i++) {
			if (radio[i].checked == true) {
				return radio[i].value;
			}
		}
		// 一つもチェックされていない場合
		return "";
	} else if (radio.value) {
		// ラジオボタンが１個
		return radio.value;
	} else {
		// ラジオボタンがない
		return "";
	}
}

// チェックボックスの選択値を取得
function ebisu_getCheckboxValue(check) {
	var result = "";
	if (check.length) {
		// チェックボックスが複数個
		for (var i = 0; i < check.length; i++) {
			if(check[i].checked == true) {
				if (result.length > 0) {
					result += ",";
				}
				result += check[i].value;
			}
		}
	//} else if (check.value) {
		// チェックボックスが１個
		//return check.value;
	} else if(check.value){
		if(check.checked == true) {
			return check.value;
		}else{
			return "";
		}
	} else {
		// チェックボックスがない
		return "";
	}
	return result;
}

// カーソルのある入力項目のあるタブを選択する（商品入力と受注入力で利用）
function ebisu_selectTabIndex(value, tabsObject) {
	if (value == null || value.nodeName == null) {
		return;
	}
	// <div id='fragment-x'>までひたすら親を探す
	if (value.nodeName != 'DIV' || value.getAttribute('id') == null || value.getAttribute('id').indexOf('fragment',0) == -1) {
		return ebisu_selectTabIndex(value.parentNode, tabsObject);
	} else {
		var index = 0;
		var id = value.getAttribute('id');
		if (id != null) {
			index = id.replace("fragment-", "") - 1;
		}
		tabsObject.tabs('select', index);
		return index;
	}
}
// 画面に描画されている明細チェックの全てONとOFF
function ebisu_listCheckOrUncheckAll(checked) {
	for (var i = 0; i < document.f1.elements.length; i++) {
		var name = document.f1.elements[i].name;
		if (name == null) {
			continue;
		}
		if (name.indexOf('LIST_CHECK', 0) == 0) {
			document.f1.elements[i].checked = checked;
		}
	}
}
// クッキ－の操作
var _ebisu_Cookie = {
	set:function(name,value,days){
		if(!days){
			days=30;
		}else{}
		date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires="; expires="+date.toGMTString();

		document.cookie=name+"="+value+expires+"; path=/";

		return {"name":name,"value":value};
	},
	get:function(name){
		nameEQ=name + "=";
		ca=document.cookie.split(";");
		for(i=0;i<ca.length;i++){
			c=ca[i];
			while(c.charAt(0)==" "){
				c=c.substring(1,c.length);
			}
			if(c.indexOf(nameEQ)==0){
				return c.substring(nameEQ.length, c.length);
			}else{}
		}
		return "";
	},
	del:function(name){
		this.createCookie(name,"",-1);
		return {"name":name,"value":null};
	}
};
// 処理時間の開始時間保存
function ebisu_recordProcessStartTime() {
	// タイマー初期化（クッキーに保存する）
	_ebisu_Cookie.set("EBISU_PROCESS_START_TIME", new Date().getTime());
	// 時間表示欄のクリア
	if (window.parent.document.getElementById('EBISU_PROCESS_TIME_TOTAL') != null) {
		window.parent.document.getElementById('EBISU_PROCESS_TIME_TOTAL').innerHTML = '...';
	}
	if (window.parent.document.getElementById('EBISU_PROCESS_TIME_SERVER') != null) {
		window.parent.document.getElementById('EBISU_PROCESS_TIME_SERVER').innerHTML = '...';
	}
	if (window.parent.document.getElementById('EBISU_PROCESS_TIME_SERVER_VIEW') != null) {
		window.parent.document.getElementById('EBISU_PROCESS_TIME_SERVER_VIEW').innerHTML = '...';
	}
	if (window.parent.document.getElementById('EBISU_PROCESS_TIME_LOCAL') != null) {
		window.parent.document.getElementById('EBISU_PROCESS_TIME_LOCAL').innerHTML = '...';
	}
}
// 処理時間の開始時間保存（ローカルの処理時間）
function ebisu_recordProcessLocalStartTime() {
	// タイマー初期化（クッキーに保存する）
	_ebisu_Cookie.set("EBISU_PROCESS_START_TIME_LOCAL", new Date().getTime());
}
// 処理時間の表示
function ebisu_showProcessTime() {
	// クッキーから時間取得
	var startTime = _ebisu_Cookie.get("EBISU_PROCESS_START_TIME");
	if (startTime != null && startTime != "") {
		var time = new Date().getTime() - startTime;
		// 少数第２位までで四捨五入
		time = Math.round(time / 10) / 100;
		// 時間の表示
		if (window.parent.document.getElementById('EBISU_PROCESS_TIME_TOTAL') != null) {
			window.parent.document.getElementById('EBISU_PROCESS_TIME_TOTAL').innerHTML = time;
		}
	}
	// クッキーから時間取得
	var startTimeLocal = _ebisu_Cookie.get("EBISU_PROCESS_START_TIME_LOCAL");
	if (startTimeLocal != null && startTimeLocal != "") {
		var time = new Date().getTime() - startTimeLocal;
		// 少数第２位までで四捨五入
		time = Math.round(time / 10) / 100;
		// 時間の表示
		if (window.parent.document.getElementById('EBISU_PROCESS_TIME_LOCAL') != null) {
			window.parent.document.getElementById('EBISU_PROCESS_TIME_LOCAL').innerHTML = time;
		}
	}
}
function ebisu_parseXml(text) {
	var xmlDoc;
	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(text,"text/xml");
	} else {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(text);
	}
	return xmlDoc;
}
// SELECTを値で選択する
function ebisu_selectOptionByValue(control, value) {
	for (i = 0; i < control.options.length; i++) {
		if (control.options[i].value == value) {
			control.selectedIndex = i;
		}
	}
}
// ラジオボタンとチェックボックスを値で選択する
// 必要であればチェックボックスのために value のカンマ区切りに対応する
function ebisu_selectRadioCheckboxOptionByValue(control, value) {
	if (control.length) { // 選択肢が複数ある場合
		for (i = 0; i < control.length; i++) {
			if (control[i].value == value) {
				control[i].checked = true;
			}
		}
	} else { // 選択肢が1つだけの場合
		if (control.value == value) {
			control.checked = true;
		} else {
			// チェックすボックスでひとつだけの場合オフにする
			control.checked = false;
		}
	}
}

////////////////////////////////////////////////////
// 選択ボックスに選択肢を追加する関数
//	引数: ( selectオブジェクト, value値, text値)
function ebisu_addSelOption(selObj, myValue, myText) {
	selObj.length++;
	selObj.options[ selObj.length - 1].value = myValue ;
	selObj.options[ selObj.length - 1].text  = myText;

}
/////////////////////////////////////////////////////
//	選択リストを作る関数 
//	引数: ( selectオブジェクト, 見出し, value値配列 , text値配列 )
function ebisu_createSelection(selObj, aryValue, aryText) {
	// 選択されている値は復活させる
	var selectedValue = '';
	if (selObj.options.length > 0) {
		selectedValue = selObj.options[selObj.selectedIndex].value;
	}
	selObj.length = 0;
	// 初期化
	for( var i=0; i < aryValue.length; i++) {
		ebisu_addSelOption( selObj , aryValue[i], aryText[i]);
	}
	// 保存していた値を選択する
	ebisu_selectOptionByValue(selObj, selectedValue);
}
// 文字列を全て置換する
function ebisu_replaceAll(expression, org, dest) {
	return expression.split(org).join(dest);
}
// 値をHtmlのvalueで利用できる形にエスケープする（HtmlUtil.getPostDataと同一処理）
function ebisu_escapeHtml(expression) {
	expression = ebisu_replaceAll(expression, "&", "&#038;");
	expression = ebisu_replaceAll(expression, "<", "&#060;");
	expression = ebisu_replaceAll(expression, ">", "&#062;");
	expression = ebisu_replaceAll(expression, "\"", "&#034;");
	expression = ebisu_replaceAll(expression, "'", "&#039;");
	expression = ebisu_replaceAll(expression, "\\", "&#092;");
	return expression;
}
