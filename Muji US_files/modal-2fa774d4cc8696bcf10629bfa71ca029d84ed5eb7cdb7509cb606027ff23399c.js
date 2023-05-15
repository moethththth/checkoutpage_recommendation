(self.webpackChunk_SK=self.webpackChunk_SK||[]).push([["modal"],{"./app/ui/sections/Modal/index.tsx":function(e,t,n){"use strict";n.r(t);var o=n("../caches/app/node_modules/react/index.js"),i=n("../caches/app/node_modules/react-dom/index.js"),a=n("./app/ui/types/checkout.ts"),r=n("./app/ui/utilities/analytics/AnalyticsProvider.tsx"),s=n("./app/ui/utilities/error_boundary/ErrorBoundary.tsx"),c=n("./app/ui/utilities/translation/TranslationProvider.tsx"),d=n("./app/ui/utilities/messenger/MessengerProvider.tsx"),u=n("./app/ui/utilities/browser/browser.ts"),_=n("./app/ui/utilities/ThemeProvider/ThemeProvider.tsx"),l=n("./app/ui/utilities/messenger/actions.ts");const p="shopify_pay_modal_state_change/1.3";var f=n("./app/ui/utilities/useUpdateHeight/useUpdateHeight.ts"),m="inXZY",h=n("./app/ui/components/Button/Button.tsx"),g=n("./app/ui/components/Icon/Icon.tsx"),b=n("./app/ui/components/PayLogo/PayLogo.tsx"),y=n("./app/ui/icons/cancel.svg"),E=n("./app/ui/sections/components/Identity/utilities/useIdentityTexts.tsx"),k=n("./app/ui/sections/components/Identity/Identity.tsx"),I=n("./app/ui/sections/utilities/constants.ts"),v=n("./app/ui/types/shared_api.ts"),R={"background--regular":"#fff","background--text":"#000","background--subdued":"#f9fbfd","background--placeholder":"#f0f2f4","background--primary":"#eeeaff","foreground--regular":"#121314","foreground--secondary":"#666","foreground--contrasting":"#fff","highlights--primary":"#5433eb","highlights--dangerous":"#d92a0f","highlights--primary-hover":"#7b61f0","highlights--dangerous-hover":"#f0452b","highlights--success":"#0b8938","dividers--regular":"#d9d9d9","dividers--inputs":"rgba(0,0,0,0.35)","background--primary-light":"#eeeaff","background--dangerous":"#ffece9","background-success":"#6fd493","notification-text":"rgba(0,0,0,0.7)","notification--dangerous-background":"#ffe6e4","notification--dangerous-border":"#f2dad9","notification--info-background":"#f0f2f4","notification--info-border":"#dfdaef","notification--info-light-background":"#ebe6fc","notification--success-background":"#d3fdf2","notification--success-border":"#c8f0e6","notification--disabled-background":"#fff","notification--disabled-border":"rgba(0,0,0,0.15)","discounts--color":"rgba(0,0,0,0.6)","discounts--background":"rgba(0,0,0,0.15)","discounts--border":"rgba(0,0,0,0)","buttons--primary-background":"#5433eb","buttons--primary-background-hover":"#7f68e9","buttons--secondary-hover":"#bdadfb","buttons--secondary-background":"#ebe6fc","buttons--secondary-background-hover":"#dbd1ff","buttons--secondary-color":"#3f22ab","buttons--secondary-color-hover":"#5433eb","buttons--disabled":"rgba(0,0,0,0.7)","buttons--disabled-background":"rgba(0,0,0,0.35)","buttons--transparent-hover":"#f0f2f4","buttons--transparent-hover-color":"#5433eb","buttons--subdued-background":"#f7f5ff","buttons--secondary-disabled-background":"#f3f3f5","buttons--secondary-disabled-color":"#cbcbca","autocomplete--option":"rgba(0,0,0,0.7)","autocomplete--selected":"rgba(0,0,0,0.03)","autocomplete--footer-background":"rgba(0,0,0,0.03)","autocomplete--footer-text":"#737373","radiobutton--background":"#fff","radiobutton--base-background":"rgba(0,0,0,0.35)","radiobutton--disabled-background":"rgba(0,0,0,0.03)","radiobutton--disabled-shadow":"rgba(0,0,0,0.15)","radiobutton--disabled-checked":"rgba(0,0,0,0.15)","affirm--disabled":"#bababa","affirm--regular":"#5a31f4","affirm--simple":"#000","link--background-hover":"rgba(0,0,0,0.03)","currency-pill--background":"#666","currency-pill--border":"#666","actions--background":"#f0f2f4","actions--background-hover":"#d3d9de","line-loading--background-start":"#c4c4c4","line-loading--background-end":"#dadada","icon--success-fill":"#11efb6","icon--white-stroke":"#fff","icon--tooptip-fill":"#a6a6a6","progress--background":"#ebe6fc","progress--line":"#5433eb","shop-cash--background":"#e4f6eb","shop-cash--foreground":"#004839","shop-promise--logo":"#0f1721","shop-promise--logo--accented":"#5632eb",LoginWrapper:"FVQXs",Footer:"W5Nja",ShopCash:"yGpix"};const C="identity-verification-code",O=new Set(["A","BUTTON","INPUT","LABEL","SELECT","TEXTINPUT"]);function S({email:e,shown:t,configuration:n,fromCheckoutOne:i,onError:a,onReady:r,onLoggedIn:s,onResize:d,onHidden:u,analyticsTraceId:_}){const l=(0,o.useRef)(),p=(0,o.useRef)(),[f,m]=(0,o.useState)(!1),[S,D]=(0,o.useState)(void 0),L=(0,o.useRef)(e);L.current=e;const N=(0,o.useCallback)((e=>{const t=document.getElementById(C);if(!t)return;const n=e.target;!n||O.has(n.tagName)||n.onclick||(e.preventDefault(),t.focus())}),[]);function A(){r(),d()}(0,o.useEffect)((()=>{var e;t&&(null===(e=document.getElementById(C))||void 0===e||e.focus())}),[t]);const{identityTexts:x}=(0,E.U)(),{translate:T}=(0,o.useContext)(c.OB),P={transaction_params:n.transaction_params,shopify_domain:n.shopify_domain,checkout_token:n.checkout_token,origin:n.origin||"modal",analytics_trace_id:_||""},w=(0,o.useMemo)((()=>({context:i?I.e.CheckoutOne:I.e.Checkout})),[i]),M=o.createElement(h.Z,{onClick:u,ariaLabel:T("modal.close_label")},o.createElement("span",{className:R.IconWrapper},o.createElement(g.Z,{size:14,svg:y.Z,role:"presentation","aria-hidden":"true",focusable:"false"}))),U={...e&&{email:e},trackingSetup:w,onVerificationSuccess:function(e){const t=null==e?void 0:e.token;s(t)},texts:(0,o.useMemo)((()=>{var e;let t=x.verificationStep.sms.title,n=x.verificationStep.sms.optOut,o=T("identity.checkout_modal.verification.sms.description");return null!==(e=l.current)&&void 0!==e&&e.unified_login_original_copy&&(t=T("modal.title"),n="",o=T("modal.content")),{...x,verificationStep:{...x.verificationStep,sms:{...x.verificationStep.sms,title:t,optOut:n,description:o},email:{...x.verificationStep.email,description:()=>T("identity.checkout_modal.verification.email.description")},customMessage:T("accounts.login.code_form.help_text")}}}),[T,x]),additionalApiPayload:P,onUserFound:function(e){const n=L.current;t||(null==e?void 0:e.email)!==n||(l.current=e,m(Boolean(e.shop_cash_cashback_enabled)),D(e.shop_cash_back_rate),n!==p.current&&(r(),d(),p.current=n))},onUserNotFound:function(){p.current=void 0,a(v.k4.USER_NOT_FOUND)},disallowUserChange:!0,userCardAction:M,layout:"modal",onCaptchaChallenge:A,onCaptchaLoad:A,signUpEnabled:!1,fastLogin:Boolean(n.fast_login)};return e?o.createElement(o.Fragment,null,o.createElement("div",{className:R.LoginWrapper,onMouseDown:N},o.createElement(k.Z,U)),o.createElement("div",{className:R.Footer},o.createElement(b.Z,{size:20})),f&&S&&o.createElement("div",{className:R.ShopCash},T("identity.checkout_modal.shop_cash.description",{cashBackRate:S.toString()}))):null}var D=n("./app/ui/utilities/url/url.ts"),L=n("./app/ui/utilities/env.ts"),N="Nxn9V";function A({configuration:e,fromCheckoutOne:t,sessionToken:n,analyticsTraceId:i,emailOptIn:a,smsOptIn:r},s){let c;if(t){let t="";if(e.dev){const n=new URLSearchParams;n.set("dev",e.dev),e["placement-reference"]&&n.set("placement-reference",e["placement-reference"]),t=`?${n.toString()}`}c=`https://${e.checkout_one_domain}/pay/session/create_and_redirect${t}`}else c=`https://${D.HQ.internal(L.y).Default}/pay/session`;const d=t?{verification_type:"sms",token:n,redirect_url:e.redirect_url,origin:"c1_modal",checkout_token:e.checkout_token,shopify_domain:e.shopify_domain,analytics_trace_id:i}:{authenticity_token:(0,u.mW)("csrf-token"),token:n,transaction_params:e.transaction_params,origin:"modal",checkout_token:e.checkout_token,shopify_domain:e.shopify_domain,analytics_trace_id:i};return t||null==a||(d.email_opt_in=`${a}`),t||null==r||(d.sms_opt_in=`${r}`),o.createElement("form",{target:"_top",method:"post",action:c,ref:s,className:N},Object.keys(d).map((e=>o.createElement("input",{key:e,name:e,type:"hidden",value:d[e]}))))}var x=(0,o.forwardRef)(A),T=n("./app/ui/utilities/analytics/events.ts");var P=function({configuration:e,analyticsTraceId:t}){const n=function(){const e=(0,d.Gk)(),{trackMonorail:t}=(0,r.Os)(),n=(0,o.useCallback)((()=>{e.hidden()}),[e]),i=(0,o.useCallback)((()=>{e.loaded(),t({schemaId:p,payload:{previousState:"",currentState:"loaded",clientTimestampMs:Date.now()}})}),[e,t]),a=(0,o.useCallback)((t=>{e.resized(t)}),[e]),s=(0,o.useCallback)((()=>{e.loggedIn()}),[e]),c=(0,o.useCallback)((()=>{e.closed()}),[e]),u=(0,o.useCallback)((n=>{Object.values(v.LI).includes(n)&&t({schemaId:T.Bz,payload:{errorType:n}}),e.error(n)}),[e,t]),_=(0,o.useCallback)((()=>{e.ready()}),[e]),l=(0,o.useCallback)(((t,n)=>{e.listen(t,n)}),[e]),f=(0,o.useCallback)((t=>{e.removeListener(t)}),[e]);return(0,o.useMemo)((()=>({onHidden:n,onLoaded:i,addListener:l,removeListener:f,onResized:a,onLoggedIn:s,onClosed:c,onError:u,onReady:_})),[n,i,l,f,a,s,c,u,_])}(),i=(0,o.useRef)(null),[a,s]=(0,o.useState)(!1),[c,u]=(0,o.useState)(""),[_,h]=(0,o.useState)(""),[g,b]=(0,o.useState)(),[y,E]=(0,o.useState)(),{updateHeight:k,modalContent:I}=(0,f.Z)(n.onResized,a),{trackMonorail:R}=(0,r.Os)(),C=(0,o.useMemo)((()=>"c1_modal"===e.origin||"c1_inline_modal"===e.origin),[e.origin]);(0,o.useEffect)((()=>{function e(e){"Escape"!==e.key&&"Esc"!==e.key||n.onHidden()}return n.addListener(l.Rc,(function(){s(!0),R({schemaId:p,payload:{currentState:"shown",previousState:"",clientTimestampMs:Date.now()}})})),n.addListener(l.A1,(function(){s(!1),R({schemaId:p,payload:{currentState:"hidden",previousState:"",clientTimestampMs:Date.now()}})})),n.addListener(l.JV,(e=>{h((null==e?void 0:e.email)||""),null!=e.emailOptIn&&b(e.emailOptIn),null!=e.smsOptIn&&E(e.smsOptIn)})),n.addListener(l.wb,(e=>{null!=e.emailOptIn&&b(e.emailOptIn),null!=e.smsOptIn&&E(e.smsOptIn)})),window.addEventListener("keydown",e),n.onLoaded(),()=>{window.removeEventListener("keydown",e),n.removeListener(l.Rc),n.removeListener(l.A1),n.removeListener(l.JV),n.removeListener(l.wb)}}),[n,R]),(0,o.useEffect)((()=>{var e;c&&(null===(e=i.current)||void 0===e||e.submit())}),[c]);const O={configuration:e,email:_,shown:a,fromCheckoutOne:C,onClose:n.onClosed,onError:n.onError,onHidden:n.onHidden,onLoggedIn:function(e){n.onLoggedIn(),e&&u(e),n.onClosed()},onReady:n.onReady,onResize:k,analyticsTraceId:t};return o.createElement("section",{className:m,"aria-labelledby":"modal-title",tabIndex:-1},o.createElement("div",{ref:I},!c&&o.createElement(S,O),c&&o.createElement(x,{configuration:e,fromCheckoutOne:C,emailOptIn:g,smsOptIn:y,ref:i,sessionToken:c,analyticsTraceId:t})))};const w=(0,u.mW)("configuration"),M=(0,u.mW)("dictionary"),U=(0,u.mW)("analytics-trace-id");!function(e){const{checkout_token:t,origin:n,shopify_domain:u}=w,l="c1_modal"===n||"c1_inline_modal"===n?a.gS.CheckoutOne:a.gS.Classic;i.render(o.createElement(s.Z,{bugsnagApiKey:window.ShopifyPay.Config.bugsnagApiKey,checkoutVersion:l,sectionName:"Modal"},o.createElement(d.S_,{targetWindow:window.parent,targetOrigin:"*"},o.createElement(r.ng,{analyticsTraceId:U,checkoutVersion:l,shopifyDomain:u,token:t,uiSection:r.pW.Modal},o.createElement(c.$j,{dictionary:M},o.createElement(_.f,null,o.createElement(P,{configuration:w,analyticsTraceId:U})))))),e)}(document.getElementById("app"))},"./app/ui/types/shared_api.ts":function(e,t,n){"use strict";n.d(t,{Cr:function(){return a},Jv:function(){return u},LI:function(){return s},WF:function(){return _},d6:function(){return i},gJ:function(){return c},gK:function(){return d},k4:function(){return o},ko:function(){return r}});const o={USER_NOT_FOUND:"shopify_pay_user_not_found",CODE_IS_INVALID:"shopify_pay_code_is_invalid",THROTTLED:"shopify_pay_throttled",SERVER:"shopify_pay_server",TIMEOUT:"shopify_pay_timeout",PHONE_IS_INVALID:"shopify_pay_phone_is_invalid",EMAIL_IS_INVALID:"shopify_pay_email_is_invalid",PHONE_LIMIT_REACHED:"phone_limit_reached"},i={EMAIL_VERIFIED:"email_verified",EMAIL_ALREADY_IN_USE:"email_already_in_use",LIMIT_EXCEEDED:"limit_exceeded"},a={MORE_THAN_ONCE_PASSKEY_PER_DEVICE_CHROME:"The user attempted to register an authenticator that contains one of the credentials already registered with the relying party.",MORE_THAN_ONCE_PASSKEY_PER_DEVICE_SAFARI:"At least one credential matches an entry of the excludeCredentials list in the platform attached authenticator."},r={EXPIRED_CARD:"expired_card",INCORRECT_CVC:"incorrect_cvc",PROCESSING_ERROR:"processing_error",CARD_DECLINED:"card_declined",BRAND_NOT_SUPPORTED:"BRAND_NOT_SUPPORTED",INVALID_EXPIRED:"INVALID_EXPIRED",INCORRECT_ZIP:"incorrect_zip"},s={PAYMENT_ERROR:"checkout_payment_error",SHIPPING_ADDRESS_ERROR:"checkout_shipping_address_errors",BILLING_ADDRESS_ERROR:"checkout_billing_address_errors",NO_SHIPPING_METHOD_ERROR:"checkout_no_shipping_method_error",CREDIT_CARD_ERROR:"checkout_credit_card_errors",SHIPPING_RATE_EXPIRED_ERROR:"checkout_shipping_expired_rate_error",SHIPPING_RATE_INVALID_ERROR:"checkout_shipping_invalid_rate_error",INVALID_DISCOUNTED_SHIPPING_ERROR:"checkout_invalid_discounted_shipping_error",PICKUP_FEATURE_DISABLED_ERROR:"checkout_pickup_feature_disabled_error",DISCOUNT_CODE_ERROR:"checkout_discount_code_error",DISCOUNT_ALREADY_APPLIED:"checkout_discount_already_applied",CONFLICT_ERROR:"checkout_conflict_error",UNKNOWN_ERROR:"checkout_unknown_error",GIFT_CARD_DEPLETED:"gift_card_depleted",GIFT_CARD_ALREADY_APPLIED:"gift_card_already_applied",...r},c={EXPIRED_CREDIT_CARD:"credit_card_is_expired",INVALID_VALUE_FOR_CARD_TYPE:"is_not_valid_for_this_card_type"};let d,u;!function(e){e.Name="name",e.Number="number",e.Expiry="expiry",e.Cvv="verification_value"}(d||(d={})),function(e){e.FirstName="first_name",e.LastName="last_name",e.Number="number",e.Cvv="verification_value",e.Month="month",e.Year="year",e.Base="base"}(u||(u={}));const _={american_express:"American Express",cartes_bancaires:"Cartes Bancaires",diners_club:"Diners Club",discover:"Discover",elo:"Elo",jcb:"JCB",master:"Mastercard",masterdebit:"Mastercard",unionpay:"UnionPay",visa:"Visa",visadebit:"Visa",maestro:"Maestro"}},"./app/ui/utilities/analytics/events.ts":function(e,t,n){"use strict";n.d(t,{Bz:function(){return o},ap:function(){return i},eN:function(){return r},oZ:function(){return a}});const o="shopify_pay_checkout_error/1.1",i="shopify_pay_transaction_error/1.0",a="shopify_pay_page_load/2.7",r=[...Array(50)].map((()=>(~~(36*Math.random())).toString(36))).join("")},"./app/ui/icons/cancel.svg":function(e,t,n){"use strict";var o=n("../caches/app/node_modules/react/index.js");function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i.apply(this,arguments)}t.Z=e=>o.createElement("svg",i({viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),o.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m8.547 6.77 5.322-5.086A.468.468 0 0 0 14 1.347a.662.662 0 0 0-.131-.379l-.875-.842A.725.725 0 0 0 12.6 0c-.175 0-.262.042-.35.126L7 5.136 1.75.127A.508.508 0 0 0 1.4 0c-.175 0-.306.042-.394.126L.131.968a.662.662 0 0 0-.131.38c0 .126.044.252.175.336L5.453 6.73.13 11.816a.468.468 0 0 0-.131.337c0 .126.044.252.131.379l.875.842a.724.724 0 0 0 .394.126c.175 0 .263-.042.35-.126L7 8.364l5.25 5.01a.508.508 0 0 0 .35.126c.175 0 .306-.042.394-.126l.875-.842a.662.662 0 0 0 .131-.38.378.378 0 0 0-.175-.336L8.547 6.77z",fill:"currentColor"}))}},function(e){var t=function(t){return e(e.s=t)};e.O(0,["vendors-caches_app_node_modules_shopify_polyfills_base_esnext-caches_app_node_modules_shopify-8d7459","vendors-caches_app_node_modules_bugsnag_js_browser_notifier_js","vendors-caches_app_node_modules_shopify_monorail_lib_monorail_js","vendors-caches_app_node_modules_shopify_browser_build_esnext_browser_esnext-caches_app_node_m-78954e","app_ui_api_utilities_ApiFetcher_ts-app_ui_components_Button_Button_tsx-app_ui_utilities_brows-b4876e","app_ui_components_DoubleSpinnerIcon_DoubleSpinnerIcon_tsx-app_ui_components_Spacing_Spacing_t-ca3419","app_ui_api_utilities_index_ts-app_ui_utilities_browser_cookies_ts-app_ui_utilities_context_ho-fe8c0c","app_ui_components_Input_Input_tsx-app_ui_components_Link_Link_tsx-app_ui_utilities_CountriesP-3f3e98","app_ui_api_account_Account_ts-app_ui_utilities_analytics_AnalyticsProvider_tsx-app_ui_utiliti-d12a54","app_ui_components_Heading_Heading_tsx-app_ui_components_Notification_Notification_tsx-app_ui_-073e7b","app_ui_components_CodeInput_CodeInput_tsx-app_ui_components_FlagInput_FlagInput_tsx-app_ui_ut-2430d1","app_ui_sections_components_Identity_Identity_tsx-app_ui_sections_components_Identity_utilitie-99cd5a","app_ui_components_PayLogo_PayLogo_tsx-app_ui_utilities_messenger_MessengerProvider_tsx-app_ui-d8fcb0"],(function(){return t("../caches/app/node_modules/@shopify/polyfills/base.esnext"),t("../caches/app/node_modules/@shopify/polyfills/noop.esnext"),t("./app/ui/styles/global.scss"),t("./app/ui/sections/Modal/index.tsx")}));var n=e.O();_SK=n}]);