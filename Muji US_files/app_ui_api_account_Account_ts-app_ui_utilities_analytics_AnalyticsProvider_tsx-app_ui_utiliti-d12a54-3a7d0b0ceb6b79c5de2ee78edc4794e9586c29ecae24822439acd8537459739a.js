"use strict";(self.webpackChunk_SK=self.webpackChunk_SK||[]).push([["app_ui_api_account_Account_ts-app_ui_utilities_analytics_AnalyticsProvider_tsx-app_ui_utiliti-d12a54"],{"./app/ui/api/account/Account.ts":function(t,e,n){n.d(e,{J6:function(){return p},L6:function(){return d},Lc:function(){return g},Mb:function(){return C},NY:function(){return w},W3:function(){return f},Wj:function(){return h},bN:function(){return b},do:function(){return E},oU:function(){return k},tg:function(){return v},u9:function(){return S},zk:function(){return y}});var o=n("./app/ui/api/utilities/ApiFetcher.ts"),i=n("./app/ui/api/utilities/index.ts"),r=n("./app/ui/api/utilities/types.ts"),s=n("./app/ui/types/account.ts"),a=n("./app/ui/utilities/url/url.ts"),c=n("./app/ui/utilities/env.ts"),u=n("./app/ui/api/account/errors.ts");const l=o.a.default;async function d(t,e="login"){const n=t?JSON.stringify(t):null;try{const t=await l.fetch(function(t){switch(t){case"sign_up":return a.HQ.authenticationSignUp();case"phone":return a.HQ.phoneVerification();default:return a.HQ.authenticationLoginStart()}}(e),{method:"POST",headers:i.cV,body:n});if(!t.ok)throw new u.Fu(t);return await t.json()}catch(o){return m(o)}}async function p(t){try{const e=await l.fetch(a.HQ.emailVerificationsComplete(t));if(!e.ok)throw new u._7(e)}catch(e){return m(e)}}async function h(t){let e;try{e=await l.fetch(a.HQ.appVerificationStatus(),{method:"PATCH",headers:i.cV,credentials:"same-origin",body:JSON.stringify(t)})}catch(n){return m(n)}return(await e.json()).status}async function f(t,e="login"){try{const o=await l.fetch(function(t){switch(t){case"sign_up":return a.HQ.authenticationSignUpComplete();case"phone":return a.HQ.phoneVerificationComplete();default:return a.HQ.authenticationLoginComplete()}}(e),{method:"POST",headers:i.cV,body:JSON.stringify(t)});if(!o.ok)throw new u.eq(o);try{return await o.json()}catch(n){return{redirect_url:a.HQ.account(t.utm_source)}}}catch(n){return m(n)}}async function y(t){try{const e=await l.fetch(a.HQ.emailVerifications(),{method:"POST",headers:i.cV,body:JSON.stringify({email:t})});if(!e.ok)throw new u.Fd(e)}catch(e){return _(e)}}async function m(t){switch(t.response.status){case 429:throw s.fu.THROTTLED;case 404:throw s.fu.RECORD_NOT_FOUND;default:return _(t)}}async function _(t){var e;const{errors:n}=await t.response.json();if(null!==(e=n[0])&&void 0!==e&&e.code)throw n[0].code}async function g(t){try{const e=await l.fetch(a.HQ.authenticationEmailSignIn(),{method:"POST",headers:i.cV,body:JSON.stringify({email:t})});if(!e.ok)throw new u.CZ(e)}catch(n){var e;const{errors:t}=await n.response.json();if(null!==(e=t[0])&&void 0!==e&&e.code)throw t[0].code}}async function w(t){try{const e=await l.fetch(a.HQ.walletAuthorize(),{method:"POST",headers:i.cV,body:JSON.stringify(t)});if(!e.ok)throw new u.$Y(e);return e.json()}catch(e){const t=await e.response.json();throw t.redirect_url?new r.W(t.redirect_url):e}}async function E(t){const e=await l.fetch(a.HQ.sdkAuthorizeConfirm(c.y),{method:"POST",credentials:"include",headers:i.cV,body:JSON.stringify(t)});if(!e.ok)throw new u.c2(e);return e.json()}async function S(t){try{const e=await l.fetch(a.HQ.discounts(c.y),{method:"POST",credentials:"include",headers:i.cV,body:JSON.stringify(t)});if(!e.ok)throw new u.qN(e);return e.json()}catch(e){return _(e)}}async function k(t){try{const e=await l.fetch(a.HQ.webauthn(),{method:"POST",headers:i.cV,body:JSON.stringify(t)});if(!e.ok)throw new u.FC(e);return e.json()}catch(e){return _(e)}}async function v(t){try{const e=await l.fetch(a.HQ.webauthnComplete(),{method:"POST",headers:i.cV,body:JSON.stringify(t)});if(!e.ok)throw new u.rz(e);return e.json()}catch(e){return _(e)}}async function C(){try{const t=await l.fetch(a.HQ.webauthn(),{method:"GET",headers:i.cV});if(!t.ok)throw new u.qq(t);return t.json()}catch(t){return _(t)}}async function b(t,e){try{const n=a.HQ.webauthn(t),o=e?`${n}?analytics_trace_id=${e}`:n,r=await l.fetch(o,{method:"DELETE",headers:i.cV});if(!r.ok)throw new u.oD(r);return r.json()}catch(n){return _(n)}}},"./app/ui/api/account/errors.ts":function(t,e,n){n.d(e,{$Y:function(){return h},CZ:function(){return c},FC:function(){return u},Fd:function(){return a},Fu:function(){return i},_7:function(){return r},c2:function(){return f},eq:function(){return s},oD:function(){return p},qN:function(){return y},qq:function(){return d},rz:function(){return l}});var o=n("./app/ui/api/utilities/types.ts");class i extends o.V{constructor(t){super(t,"start account session"),this.name="StartAccountSessionResponseError"}}class r extends o.V{constructor(t){super(t,"complete email verification"),this.name="CompleteEmailVerificationResponseError"}}class s extends o.V{constructor(t){super(t,"complete account session"),this.name="CompleteAccountSessionResponseError"}}class a extends o.V{constructor(t){super(t,"send verification email"),this.name="SendVerificationEmailResponseError"}}class c extends o.V{constructor(t){super(t,"send sign in email"),this.name="SendSignInEmailResponseError"}}class u extends o.V{constructor(t){super(t,"generate passkey"),this.name="GeneratePasskeyCredentialResponseError"}}class l extends o.V{constructor(t){super(t,"store passkey"),this.name="StorePasskeyCredentialResponseError"}}class d extends o.V{constructor(t){super(t,"list all the passkeys of a user"),this.name="GetPasskeyCredentialsListResponseError"}}class p extends o.V{constructor(t){super(t,"delete an specific passkey"),this.name="DeletePasskeyResponseError"}}class h extends o.V{constructor(t){super(t,"authorize details"),this.name="AuthorizeDetailsResponseError"}}class f extends o.V{constructor(t){super(t,"sdk authorize confirm"),this.name="SdkAuthorizeConfirmResponseError"}}class y extends o.V{constructor(t){super(t,"store user discount"),this.name="StoreUserDiscountResponseError"}}},"./app/ui/types/account.ts":function(t,e,n){let o;n.d(e,{Xf:function(){return a},Yu:function(){return s},fu:function(){return i},h1:function(){return o},pe:function(){return r},vQ:function(){return c}}),function(t){t.Payment="payment",t.Orders="orders"}(o||(o={}));const i={RECORD_NOT_FOUND:"record_not_found",CAPTCHA_NEEDED:"further_authorization_required",THROTTLED:"limit_exceeded",INVALID_TOKEN:"invalid_token",INVALID_CODE:"invalid_code",INVALID_EMAIL:"invalid_email",INVALID_PHONE:"invalid_phone",BLOCKED_PHONE:"phone_blocked",PHONE_LIMIT_REACHED:"phone_limit_reached",EXPIRED_TOKEN:"token_expired",REDIRECT_WITH_EMAIL_ONLY:"redirect_with_email_only"};let r,s,a,c;!function(t){t.Loading="loading",t.Success="success",t.Error="error"}(r||(r={})),function(t){t.ApiUnavailable="api_unavailable",t.InvalidApiKey="invalid_api_key",t.ServerError="server_error",t.UserBlocked="user_blocked",t.NoDiscountReceived="no_discount_received",t.InvalidAnalyticsContext="invalid_analytics_context",t.InstallmentsIneligible="installments_ineligible",t.CaptchaChallenge="captcha_challenge"}(s||(s={})),function(t){t.CaptchaChallenge="User encountered captcha challenge.",t.InvalidDiscount="Discount code is not valid.",t.DiscountSaveFailed="Failed to save discount."}(a||(a={})),function(t){t.Start="start",t.SignUp="signup",t.Verify="verify",t.Captcha="captcha",t.OneClick="one-click"}(c||(c={}))},"./app/ui/utilities/analytics/AnalyticsProvider.tsx":function(t,e,n){n.d(e,{Os:function(){return y},fC:function(){return p},ng:function(){return f},pW:function(){return d}});var o=n("../caches/app/node_modules/react/index.js"),i=n("../caches/app/node_modules/@bugsnag/js/browser/notifier.js"),r=n.n(i),s=n("../caches/app/node_modules/@shopify/monorail/lib/monorail.js"),a=n("./app/ui/types/checkout.ts"),c=n("./app/ui/utilities/context/hooks.ts"),u=n("./app/ui/utilities/analytics/sectionEvents/shopIdentityEvents.ts"),l=n("./app/ui/utilities/analytics/StatsD.ts");let d;!function(t){t.Account="account",t.AccountLogin="account_login",t.AuthorizeDefault="authorize_default",t.AuthorizeDiscount="authorize_discount",t.AuthorizeFollow="authorize_follow",t.AuthorizeThirdParty="authorize_third_party",t.Continue="continue",t.InstallmentsIframe="installments_iframe",t.Login="login",t.LoginSeamless="loginSeamless",t.ShopAuthInput="shop_auth_input",t.Modal="modal",t.PaymentPage="payment_page",t.Webauthn="webauthn"}(d||(d={}));const p=o.createContext(void 0),h=!1;function f({analyticsTraceId:t,authorizationFlowId:e,checkoutVersion:n=a.gS.Classic,children:i,clientUuid:c,parentPageLoadId:f,publicId:y,shopAccountUuid:m,shopifyDomain:_="",token:g,uiSection:w}){const E=(0,o.useMemo)((()=>{if(!window.ShopifyPay)return;const{isProduction:t}=window.ShopifyPay.Config;return t?s.hl.createHttpProducer({production:!0}):s.hl.createLogProducer({debugMode:h})}),[]),S=(0,o.useMemo)((()=>({...t&&{analyticsTraceId:t},...e&&{authorizationFlowId:e},...g&&{checkoutToken:g},...n&&{checkoutVersion:n},...c&&{clientUuid:c},...y&&{publicId:y},...m&&{shopAccountUuid:m},..._&&{shopifyDomain:_}})),[t,e,g,n,c,y,m,_]),k=(0,o.useCallback)((t=>[t===u.Q,null!=c&&w===d.AuthorizeDefault,w===d.AuthorizeDiscount,w===d.AuthorizeFollow,w===d.ShopAuthInput,null!=g,null!=c&&null!=e,null!=y||w===d.AccountLogin].some(Boolean)),[e,g,c,y,w]),v=(0,o.useCallback)((t=>{E&&(k(t.schemaId)?E.produce({schemaId:t.schemaId,payload:{...S,...t.payload}}):r().notify("Unexpected params for trackMonorail",(e=>{e.addMetadata("monorail",{schemaId:t.schemaId,payload:t.payload,globalPayload:S,uiSection:w})})))}),[S,k,E,w]),C=(0,o.useMemo)((()=>({checkoutVersion:n,parentPageLoadId:f,trackMonorail:v,trackStatsD:{increment:l.n,histogram:l.K},analyticsTraceId:t})),[n,f,v,t]);return o.createElement(p.Provider,{value:C},i)}function y(){return(0,c.U)(p,"useAnalyticsContext","AnalyticsProvider")}},"./app/ui/utilities/analytics/sectionEvents/shopIdentityEvents.ts":function(t,e,n){n.d(e,{Q:function(){return o}});const o="shop_accounts_identity_verification_ui_event/2.1"},"./app/ui/utilities/env.ts":function(t,e,n){n.d(e,{M:function(){return i},y:function(){return o}});const o=!1,i=!0},"./app/ui/utilities/error_boundary/ErrorBoundary.tsx":function(t,e,n){n.d(e,{Z:function(){return w}});var o=n("../caches/app/node_modules/react/index.js"),i=n("./app/ui/types/checkout.ts"),r=n("../caches/app/node_modules/@bugsnag/js/browser/notifier.js"),s=n.n(r),a=n("./app/ui/utilities/env.ts"),c=n("./app/ui/utilities/browser/browser.ts");const u=(0,c.mW)("configuration"),l=(0,c.mW)("store"),d=(0,c.mW)("user");function p(){const{checkout_token:t}=u;return{token:t}}function h(){const{id:t}=l;return{shopId:t}}const f="MISSING_ERROR_NAME",y=["shop.app","pay.shopify.com","cdn.shopify.com","cdn.shopifycloud.com"];function m(t,e,n,{releaseStage:o="production",autoDetectErrors:i=!1,onError:r=[],...a}={}){return s().start({enabledReleaseStages:[o],...a,autoDetectErrors:i,releaseStage:o,appType:"react",apiKey:t,context:e,onError:[(c={version:n},t=>{!function(t,e){t.addMetadata("checkout",{...p(),...h(),...e})}(t,c)}),g,_,...Array.isArray(r)?r:[r]]});var c}function _(t){if(function(t){const e=t.errors.map((({type:t,errorClass:e,errorMessage:n,stacktrace:o})=>`${t} ${e} ${n} ${o.map((({file:t,method:e})=>`${t} ${e}`)).join("\n")}`)).join("\n");return!y.some((t=>e.includes(t)))}(t))return a.y&&console.debug(`[bugsnag] ${t.context} error in development`,{error:t.originalError}),!1;t.groupingHash=function(){const e=t.context||s().getContext()||"UNKNOWN",n=t.originalError.name||f;return`${e} - ${n}`}()}function g(t){Object.assign(t.getUser(),function(){const{public_id:t,shop_account_uuid:e}=d;return{public_id:t,shop_account_uuid:e}}())}class w extends o.Component{constructor(t){var e,n;super(t),this.Bugsnag=void 0;const{checkoutVersion:o=i.gS.Classic}=t;this.Bugsnag=m(t.bugsnagApiKey,t.sectionName,o,{appVersion:(null===(e=window.ShopifyPay)||void 0===e||null===(n=e.Config)||void 0===n?void 0:n.appVersion)||void 0})}render(){return this.props.children}componentDidCatch(t,e){this.Bugsnag.notify(t,(t=>{t.addMetadata("react",e),t.context=`${this.props.sectionName} - Error in React tree`}))}}}}]);