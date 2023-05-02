/*
 * 郵便番号から住所を取得する
 * 利用方法 メッセージ表示用のDIVタグを用意して、getZipAddress を呼び出すだけ
 * Dependencies ebisu_ajax_base_script.js, ebisu_utility.js, ebisu_indicator.js
 * Updated 2009.10.01
 */
var _nowSeq = 0;
var _addr1Text = null;
var _addr2Text = null;
var _addr3Text = null;
var _messagePanel = null;
function getZipAddress(zipText, addr1Text, addr2Text, messagePanel, isAdmin, addr3Text) {
	_addr1Text = addr1Text;
	_addr2Text = addr2Text;
	_addr3Text = addr3Text;
	_messagePanel = messagePanel;
	startIndicator(messagePanel);
	var urlData = new Object();
	urlData["ZIP"] = zipText.value;
	urlData["SEQ"] = _nowSeq;
	var url = './ajax_zip_address.html';
	if(isAdmin){
		url = './admin_ajax_zip_address.html';
	}	
	sendRequest(_callbackGetZipAddress, urlData, 'POST', url, true, true);
}
function _callbackGetZipAddress(oj) {
	stopIndicator();
    var res = oj.responseXML;
	var result = _getResultZipAddressXml(res);
	_nowSeq = result["NEW_SEQ"];
	if(_addr1Text){
		_addr1Text.value = result["ADDR1"];
	}
	if(_addr2Text){
		_addr2Text.value = result["ADDR2"];
	}
	if(_addr3Text){
		_addr3Text.value = result["ADDR3"];
	}
	ebisu_setMessage(_messagePanel, result["MESSAGE"], MESSAGE_TYPE_INFO);
	if (eb$('#SEND_HOPE_DATE').length > 0) {
		getSendHopeDate(null, _addr1Text.name);
	}
}
function _getResultZipAddressXml(xdoc) {
	var res = {"ADDR1":'', "ADDR2":'', "NEW_SEQ":'', "MESSAGE":'', "ADDR3":''};
	var root = xdoc.documentElement;
	for (var i = 0; i < root.childNodes.length; i++){
		for(var j = 0; j < root.childNodes[i].childNodes.length; j++){
			if (root.childNodes[i].childNodes[j].nodeName == 'ADDR1') {
				if (root.childNodes[i].childNodes[j].firstChild != null) {
					res["ADDR1"] = root.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
			if (root.childNodes[i].childNodes[j].nodeName == 'ADDR2') {
				if (root.childNodes[i].childNodes[j].firstChild != null) {
					res["ADDR2"] = root.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
			if (root.childNodes[i].childNodes[j].nodeName == 'ADDR3') {
				if (root.childNodes[i].childNodes[j].firstChild != null) {
					res["ADDR3"] = root.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
			if (root.childNodes[i].childNodes[j].nodeName == 'NEW_SEQ') {
				if (root.childNodes[i].childNodes[j].firstChild != null) {
					res["NEW_SEQ"] = root.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
			if (root.childNodes[i].childNodes[j].nodeName == 'MESSAGE') {
				if (root.childNodes[i].childNodes[j].firstChild != null) {
					res["MESSAGE"] = root.childNodes[i].childNodes[j].firstChild.nodeValue;
				}
			}
		}
	}
	return res;
}
