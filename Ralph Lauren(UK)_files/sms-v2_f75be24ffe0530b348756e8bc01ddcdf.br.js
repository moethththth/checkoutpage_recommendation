(self.webpackChunksmart_tag=self.webpackChunksmart_tag||[]).push([[850],{9441:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{var _sms=__webpack_require__(4836)(__webpack_require__(1097));window.bouncex.products=window.bouncex.products||{},window.bouncex.products.sms={preCampaignFunctions:function(){bouncex.sms=_sms.default,bouncex.sms.init()}}},1097:(__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(4836);Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _scheduling=__webpack_require__(1915),_eventStream=_interopRequireDefault(__webpack_require__(7686)),_logger=_interopRequireDefault(__webpack_require__(5754)),_language=__webpack_require__(5295),_default={_constants:{product:"sms",optInMessage:"Send this text to sign-up for automated, recurring <BrandName> marketing texts, like cart reminders.",params:{source:"sms_source",click:"sms_click",uph:"sms_uph"}},_cache:{deviceId:""},init:function(){this.initialized=!0,this._clickthrough(),this._user(),this._cacheDeviceId()},_clickthrough:function(){var click=bouncex.utils.url.getParam(this._constants.params.click);if(click){var timestamp=Math.floor((new Date).getTime()/1e3);bouncex.updateBounceCookie((function(cookie){var clicks=cookie.sms||{};clicks[click]=timestamp,cookie.sms=clicks,cookie.ps=1}))}},_user:function(){var uph=bouncex.utils.url.getParam(this._constants.params.uph);if(uph){var event={"user:phone_sha256":uph,source:"web","user:source":"sms_clickthrough",agent:"js",channel:this._constants.product};this.report("user",event)}},_getOptInSlug:function(ca_id){var deviceId=bouncex.cookie&&bouncex.cookie.did?bouncex.cookie.did:this._cache.deviceId,slug="YES-"+bouncex.website.id+"-"+ca_id+"-"+deviceId,languageCode=(0,_language.getDeviceLanguage)();return languageCode&&(slug+="-"+languageCode.toUpperCase()),slug},_getOptInMessage:function(){var _bouncex$website$sms,message=(null===(_bouncex$website$sms=bouncex.website.sms)||void 0===_bouncex$website$sms?void 0:_bouncex$website$sms.optm)||this._constants.optInMessage.replace("<BrandName>",bouncex.website.brandName);if("samsung"===bouncex.browser.manufacturer&&message.includes("&")){var _customReplacementByC,customReplacementByClientID={default:" and ",3606:"et"},replacement=null!==(_customReplacementByC=customReplacementByClientID[bouncex.website.id])&&void 0!==_customReplacementByC?_customReplacementByC:customReplacementByClientID.default;message=message.replace(/ ?& ?/g,replacement)}return message=encodeURIComponent(message+"\n"),bouncex.browser.android&&bouncex.browser.android<10&&(message=message.replace(/%/g,"%25")),message},_getOptInShortCode:function(){var shortCodes=bouncex.website.smsShortCodes;return shortCodes&&shortCodes.length?shortCodes[0]:"29143"},_getOptInURI:function(ca_id){return"sms://"+this._getOptInShortCode()+"?&body="+this._getOptInMessage()+this._getOptInSlug(ca_id)},_triggerOptIn:function(ca_id){bouncex.close_ad(ca_id),window.location.href=this._getOptInURI(ca_id)},optIn:function(ca_id,mobile){if(!this.initialized)return this.log(ca_id,"sms not initialized. check that sms is enabled and required website settings are valid.",!0),!1;this.report("prompt",{campaignid:ca_id}),mobile&&(0,_scheduling.setTimeoutWrapper)(this._triggerOptIn.call(this,ca_id),300)},report:function(type,eventData){var data={agent:"user",source:this._constants.product};for(var key in eventData)eventData.hasOwnProperty(key)&&(data[key]=eventData[key]);_eventStream.default.report(type,data)},log:function(campaignId,message,isError){var data={group:this._constants.product,campaignId,message};isError?_logger.default.error(data):_logger.default.info(data)},_cacheDeviceId:function(){var errorText;bouncex.cookie?bouncex.cookie.did||(errorText="Device-Not-Found"):errorText="Cookie-Not-Found";var deviceId=bouncex.cookie&&bouncex.cookie.did?bouncex.cookie.did:errorText;this._cache.deviceId=deviceId}};exports.default=_default},5295:(__unused_webpack_module,exports)=>{function firstTwoCharacters(language){return language?language.length<=2?language:language.substring(0,2):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getDeviceLanguage=function(){return firstTwoCharacters(navigator.language)},exports.getDocumentLanguage=function(){var _document$documentEle;return firstTwoCharacters(null===(_document$documentEle=document.documentElement)||void 0===_document$documentEle?void 0:_document$documentEle.lang)}}},__webpack_require__=>{__webpack_require__.O(0,[179],(()=>{return moduleId=9441,__webpack_require__(__webpack_require__.s=moduleId);var moduleId}));__webpack_require__.O()}]);