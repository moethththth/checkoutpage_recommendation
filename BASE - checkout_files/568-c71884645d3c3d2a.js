"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[568],{81643:function(e,t,n){n.d(t,{$:function(){return s},q:function(){return a}});var r=n(32522),i=n(77051),o=n(70384);function a(e){let{shopId:t,checkoutSessionId:n,customerToken:i,language:o,currency:a,payIDAppRunning:s}=e;return(0,r.assertIsDefined)(n),(0,r.assertIsDefined)(i),{shopId:t,checkoutSessionId:n,customerToken:i,language:o,currency:a,payIDAppRunning:s}}function s(e){var t,n,r;let a;let{inputEvent:s,checkoutResult:c}=e;if(s){let e=(0,o.lz)(s);a=null==e?void 0:e.data}return(0,i.isValidCheckoutResponse)(c)?null!==(n=c.checkout)&&void 0!==n?n:null===(r=a)||void 0===r?void 0:r.checkout:null===(t=a)||void 0===t?void 0:t.checkout}},69787:function(e,t,n){n.d(t,{Z:function(){return y}});var r={};n.r(r),n.d(r,{prepareRunning:function(){return p},setCheckoutResult:function(){return u},setPaymentResult:function(){return c}});var i=n(88497),o=n(72627);let a={checkoutSessionId:null,checkoutId:null,customerToken:null};var s=n(67798);let c=(0,s.assign)({paymentResult:(e,t)=>t.data}),u=(0,s.assign)({checkoutResult:(e,t)=>t.data}),l=(0,s.log)((e,t)=>"context: ".concat(e.checkoutSessionId,", event: ").concat(t.type)),p=l;function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let y=e=>(0,o.C)({predictableActionArguments:!0,id:"shopCheckoutDefaults",meta:{label:"PAY IDやPayPalの処理完了後、各種デフォルト設定を行い、それができない場合はフォームを表示するように通知する"},context:d(d({},a),{},{shopId:e}),initial:"pending",states:{pending:{meta:{label:"親Machineからイベントを取得し、デフォルト設定処理を開始させる"},always:"running"},running:{type:"parallel",entry:["prepareRunning"],states:{payment:{initial:"executing",meta:{label:"決済方法に関するデフォルト設定(PayPal, PAY IDなど)"},states:{executing:{invoke:{id:"setPaymentDefaults",src:"setPaymentDefaults",onError:{target:"finished",actions:["setPaymentResult"]},onDone:[{target:"finished",actions:["setPaymentResult"]}]}},finished:{type:"final"}}},checkout:{initial:"executing",meta:{label:"Checkoutリソースに関するデフォルト設定(PayPal, PAY IDなど)"},states:{executing:{invoke:{id:"setCheckoutDefaults",src:"setCheckoutDefaults",onError:{target:"finished",actions:["setCheckoutResult"]},onDone:[{target:"finished",actions:["setCheckoutResult"]}]}},finished:{type:"final"}}}},onDone:"complete"},complete:{type:"final",data:e=>e}}}).withConfig({actions:d({},r)})},25788:function(e,t,n){n.r(t),n.d(t,{setCheckoutDefaults:function(){return E},setPaymentDefaults:function(){return I}});var r=n(88497),i=n(77051),o=n(32522),a=n(29853),s=n(95047),c=n(44941),u=n(44014);let l=["customerToken","checkout"];function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}async function d(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],{customerToken:n,checkout:r}=e,p=(0,s.Z)(e,l);if(!r.requiresShipping)return;let{id:d,shippingAddress:y}=r;(0,o.assertIsDefined)(d),(0,o.assertIsDefined)(y);let h=y.country,b=y.prefecture,O=h===c.qp.name?{checkoutId:d,prefecture:b}:{checkoutId:d,country:h};try{let{availableShippingMethods:e}=await (0,a.fetcherWithRetry)(()=>(0,u.n)(f(f({},p),{},{area:O}),n,{payIDAppRunning:t}));if(!e||0===e.length)return;return(0,i.shippingMethodInputsFilteredDefaults)(e)}catch(e){return}}var y=n(80110),h=n(49710);n(25532),n(68824);var b=n(99281),O=n(90452),v=n(34160);async function g(e,t){let n,r,{shopId:o,checkoutSessionId:s}=e,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},u=await Promise.allSettled([(0,v.i)(o,s),(0,a.fetcherWithRetry)(()=>(0,O.F)({shopId:o,checkoutSessionId:s},t,c))]),[l,p]=u;return"rejected"===p.status?{error:p.reason}:("fulfilled"===l.status&&(0,b.isPaymentInfoList)(l.value)&&(n=l.value),"fulfilled"===p.status&&(0,i.isAvailablePaymentMethodsResponse)(p.value)&&(r=p.value),{availablePaymentMethodsResponse:r,payments:n})}var P=n(67163),m=n(39135),k=n(70384),D=n(81643);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let I=async e=>{var t,n,r;(0,o.assertIsDefined)(e.inputEvent);let{shopId:a,checkoutSessionId:s,customerToken:c,payIDAppRunning:u}=(0,D.q)(e),l=(0,k.lz)(e.inputEvent);(0,o.assertIsDefined)(l);let p=l.type,f=l.data;(0,o.assertIsDefined)(p),(0,o.assertIsDefined)(f);let{checkout:d}=f;(0,o.assertIsDefined)(d);let{availablePaymentMethodsResponse:y,payments:b,error:O}=await g({shopId:a,checkoutSessionId:s},c,{payIDAppRunning:u});if(O)throw O;if(!(null!=y&&y.availablePaymentMethods)||!(null!==(t=y.availablePaymentMethods)&&void 0!==t&&t.paymentMethods)||0===y.availablePaymentMethods.paymentMethods.length)throw new P.p("failed");let v=y.availablePaymentMethods,m=null!==(n=v.paymentMethods)&&void 0!==n?n:[];if("done.invoke.postAuthorizedAccountApply"===e.inputEvent.type){if("done.invoke.postPAYIDLinking"===p||"APPLY_AUTHORIZED_ACCOUNT_INFO"===p){let{paymentValue:e}=f;if(e)return{paymentValue:e,warning:(0,i.pickWebCartErrors)(y)};let t=m.reduce((e,t)=>(t.type&&e.push(t.type),e),[]),n="accountLoginInfo"in f?null===(r=f.accountLoginInfo)||void 0===r?void 0:r.isPasswordLogin:void 0;if(null!=b&&b.current&&t.some(e=>"".concat(e)===(null==b?void 0:b.current))){if("bnpl"===b.current&&n)throw new P.p("userInteractionIsRequired",(0,i.pickWebCartErrors)(y));return{warning:(0,i.pickWebCartErrors)(y)}}let o=(0,i.defaultPaymentMethod)(v);if(o&&!o.maintenance){let e=(0,h.Ad)(o);if(e&&!("bnpl"===e.paymentMethod&&n))return{paymentValue:e,warning:(0,i.pickWebCartErrors)(y)}}throw new P.p("userInteractionIsRequired",(0,i.pickWebCartErrors)(y))}if("done.invoke.postPayPalLinking"===p||"done.invoke.postAmazonPayLinking"===p)return{paymentValue:f.paymentValue,warning:(0,i.pickWebCartErrors)(y)}}},E=async e=>{var t,n,r,i;(0,o.assertIsDefined)(e.inputEvent);let{shopId:s,checkoutSessionId:c,customerToken:u,language:l,currency:p,payIDAppRunning:f}=(0,D.q)(e),h=(0,k.lz)(e.inputEvent);(0,o.assertIsDefined)(h);let{checkout:b}=h.data;(0,o.assertIsDefined)(b);let O=(0,m.AO)(b);O.annotate={remark:null!==(t=null!==(n=null===(r=e.restoreData)||void 0===r?void 0:r.remark)&&void 0!==n?n:null===(i=O.annotate)||void 0===i?void 0:i.remark)&&void 0!==t?t:"",customerAcceptsMarketing:(0,m.l7)(b),customerAcceptsMembership:"done.invoke.postPAYIDLinking"===h.type};{let e=await d({shopId:s,checkoutSessionId:c,customerToken:u,checkout:b},f);e&&e.length>0&&(O.shippingMethods=e)}let v=await (0,a.fetcherWithRetry)(()=>(0,y.tt)({shopId:s,checkoutSessionId:c,value:w(w({},O),{},{language:l,currency:p})},u,f));return v}},34160:function(e,t,n){n.d(t,{i:function(){return c}});var r=n(88497),i=n(99281),o=n(14380);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function c(e,t,n){let r=(0,i.createShopCartSessionPaymentsFetcher)(s(s({},(0,o.Z)()),n));return r({shopId:e,id:t})}}}]);