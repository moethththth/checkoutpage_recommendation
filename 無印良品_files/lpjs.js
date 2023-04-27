var CREDITSAISON_LP = {
	LP_XUID_KEY: "admage_creditsaison_xuid",
	addOnloadEventAdmage: (function (func) {
		try {
			window.addEventListener("load", func, false);
		} catch (e) {
			// IE対応
			window.attachEvent("onload", func);
		}
	}
	),

	writeCookieAdmage: (function (name, addValue, oldCookie, rootDomainKy, domainArr, oldLsVal) {
		var COOKIE_EXPIRE = 90;
		var VAL_SEP_SPLIT = ",";
		var VAL_ADD_KEY = ",.";

		if (!addValue) return;

		var buyerXuidArr = addValue.split(VAL_SEP_SPLIT);
		if (buyerXuidArr.length != 4 && buyerXuidArr.length != 5) return;

		var cookieVal = addValue;
		if (oldCookie) {
			cookieVal = CREDITSAISON_LP.appendOldValue(oldCookie, buyerXuidArr, cookieVal)
		}
		if (oldLsVal) {
			cookieVal = CREDITSAISON_LP.appendOldValue(oldLsVal, buyerXuidArr, cookieVal)
		}

		var date = new Date();
		date.setTime(date.getTime() + (COOKIE_EXPIRE * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString(); // IE11 対応
		if (cookieVal) {
			if (rootDomainKy != '') {
				newCookieVal = cookieVal + VAL_ADD_KEY + rootDomainKy;
				CREDITSAISON_LP.setCookieAdmage(name, newCookieVal, expires, domainArr[rootDomainKy], COOKIE_EXPIRE);
			} else {
				for (var i = 0; i < domainArr.length; i++) {
					var newCookieVal = "";
					var newCookie = "";
					newCookieVal = cookieVal + VAL_ADD_KEY + i;
					CREDITSAISON_LP.setCookieAdmage(name, newCookieVal, expires, domainArr[i], COOKIE_EXPIRE);
					newCookie = CREDITSAISON_LP.readCookieAdmage(name);
					if (newCookieVal == newCookie) break;
				}
			}
		}
	}),

	setCookieAdmage: (function (name, cookieVal, expires, domain, cookie_expire) {
		document.cookie = name + "=" + cookieVal + expires + "; domain=" + domain + "; max-age=" + cookie_expire * 24 * 60 * 60 + "; path=/";
		try {
			localStorage.setItem(name, cookieVal);
		} catch (e) { }
	}),

	appendOldValue: (function (oldValue, buyerXuidArr, newValue) {
		var ELEM_SEP_SPLIT = "|";
		var VAL_SEP_SPLIT = ",";
		var SAVE_MAX = 10;
		var VAL_ADD_KEY = ",.";

		var cookieMap = new Map();
		var cookieArr = newValue.split(ELEM_SEP_SPLIT);
		var cookieLength = cookieArr.length;

		for (let index = 0; index < cookieLength; index++) {
			let prefix = cookieArr[index].split(VAL_SEP_SPLIT)[0] + VAL_SEP_SPLIT;
			cookieMap.set(prefix, cookieArr[index]);
		}

		var arr = oldValue.split(VAL_ADD_KEY);
		var arr = arr[0].split(ELEM_SEP_SPLIT);
		var prefix = buyerXuidArr[0] + VAL_SEP_SPLIT; 	//_buyer
		var length = arr.length;

		if (cookieLength == SAVE_MAX) {
			return newValue;
		}
		for (var i = 0, cnt = cookieLength; i < length; i++) {
			if (arr[i].startsWith(prefix)) continue; // same buyer
			var key = arr[i].split(VAL_SEP_SPLIT)[0] + VAL_SEP_SPLIT;
			if (cookieMap.get(key) != undefined) continue; // cookie exists
			cookieMap.set(key, arr[i]);
			newValue += ELEM_SEP_SPLIT;
			newValue += arr[i];
			cnt++;
			if (cnt >= SAVE_MAX) break;
		}

		return newValue;
	}),

	domainArrAdmage: (function () {
		var domainArr = new Array();
		var domain = document.domain;
		for (var i = Infinity; i != -1;) {
			i = domain.lastIndexOf(".", i - 1);
			domainArr.push(domain.substring(i + 1));
		}
		return domainArr;
	}),

	getRootDomainKyAdmage: (function (name) {
		var oldCookie = CREDITSAISON_LP.readCookieAdmage(name);

		var array = oldCookie.split(".");

		if (array.length <= 1) return "";
		var rootDomainKy = array[array.length - 1];

		return rootDomainKy;
	}),

	readCookieAdmage: (function (name) {
		var cookieVal = "";
		var nameEQ = name + "=";
		var hasCookie = false;
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) {
				hasCookie = true;
				if (c.indexOf(".") > 0) {
					cookieVal = c.substring(nameEQ.length, c.length);
					break;
				} else {
					cookieVal = c.substring(nameEQ.length, c.length);
				}
			}
		}
		if (hasCookie) return cookieVal;

		return "";
	}),

	readLocalStAdmage: (function (name) {
		var local_adm_uid = "";
		try {
			local_adm_uid = localStorage.getItem(name);
		} catch (e) { }
		return local_adm_uid;
	}),

	getQueryVariable: (function (variable, query) {
		if (!query || 0 === query.length) return "";
		query = decodeURIComponent(query);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return "";
	}),

	findXuidByBuyerAdmage: (function (lpXuidKey, buyerId, isAllvalueFlg) {
		var ELEM_SEP_SPLIT = "|";
		var VAL_SEP_SPLIT = ",";
		var LINE_XUID = 3;
		var LINE_LS_FLG = 4;

		if (typeof isAllvalueFlg === 'undefined') isAllvalueFlg = false;
		var isExistCookieVal = true;

		var readedCookieVal = CREDITSAISON_LP.readCookieAdmage(lpXuidKey);

		if (!readedCookieVal) {
			readedCookieVal = CREDITSAISON_LP.readLocalStAdmage(lpXuidKey);
			isExistCookieVal = false;
		}

		if (!readedCookieVal || !buyerId) return "";
		if (typeof (campaignId) == "undefined" || !campaignId) campaignId = 0;
		if (typeof (articleId) == "undefined" || !articleId) articleId = 0;
		if (typeof (cvpointId) == "undefined" || !cvpointId) cvpointId = 0;

		var checkVal = "";
		if (cvpointId) {
			if (campaignId > 0) {
				checkVal = buyerId + VAL_SEP_SPLIT + campaignId;
			} else {
				checkVal = buyerId + VAL_SEP_SPLIT;
			}
		} else if (articleId) {
			checkVal = buyerId + VAL_SEP_SPLIT + articleId;
		} else {
			checkVal = buyerId + VAL_SEP_SPLIT;
		}

		var arrElement = readedCookieVal.split(ELEM_SEP_SPLIT);
		for (var i = 0; i < arrElement.length; i++) {
			var arrVal = arrElement[i].split(VAL_SEP_SPLIT);
			var stringLinkedVal = "";
			for (var j = 0; j < arrVal.length; j++) {
				if (arrVal[j].indexOf(".") !== 0) {
					if (!isAllvalueFlg && (j != LINE_XUID && j != LINE_LS_FLG)) {
						continue;
					}
					stringLinkedVal += arrVal[j] + VAL_SEP_SPLIT;
				}
			}
			stringLinkedVal = stringLinkedVal.slice(0, -1);

			if (cvpointId) {
				var cookieCheckVal = "";
				if (campaignId > 0) {
					cookieCheckVal = arrVal[0] + VAL_SEP_SPLIT + arrVal[1]; // buyer+campaign
				} else {
					cookieCheckVal = arrVal[0] + VAL_SEP_SPLIT; // buyer
				}
				if (checkVal == cookieCheckVal) {
					return CREDITSAISON_LP.changeVal(stringLinkedVal, isExistCookieVal);
				}
				continue;
			} else if (articleId) {
				var cookieCheckVal = arrVal[0] + VAL_SEP_SPLIT + arrVal[2]; // buyer+article
				if (checkVal == cookieCheckVal) {
					return CREDITSAISON_LP.changeVal(stringLinkedVal, isExistCookieVal);
				}
				continue;
			} else {
				var cookieCheckVal = arrVal[0] + VAL_SEP_SPLIT; // buyer
				if (checkVal == cookieCheckVal) {
					return CREDITSAISON_LP.changeVal(stringLinkedVal, isExistCookieVal);
				}
				continue;
			}
		}
		return "";
	}),

	changeVal: (function (val, isExistCookieVal) {
		if (!val || 0 === val.length || isExistCookieVal) return val;
		if (val.indexOf(',_1') != -1) {
			return val;
		}
		return val + ",_1";
	})
};

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

CREDITSAISON_LP.addOnloadEventAdmage(CREDITSAISON_LP.writeCookieAdmage(CREDITSAISON_LP.LP_XUID_KEY, CREDITSAISON_LP.getQueryVariable(CREDITSAISON_LP.LP_XUID_KEY, window.location.href.split("?")[1]), CREDITSAISON_LP.readCookieAdmage(CREDITSAISON_LP.LP_XUID_KEY), CREDITSAISON_LP.getRootDomainKyAdmage(CREDITSAISON_LP.LP_XUID_KEY), CREDITSAISON_LP.domainArrAdmage(), CREDITSAISON_LP.readLocalStAdmage(CREDITSAISON_LP.LP_XUID_KEY)));