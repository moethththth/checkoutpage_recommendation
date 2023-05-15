(function(){"use strict";const g=(s,e)=>{const t=s.getElementById(e);try{return JSON.parse(t.innerHTML)}catch{return null}},h=(s,e,t,i={},n="after")=>{const a=Object.entries(i).reduce((o,c)=>{const[u,d]=c;return o.replace(new RegExp(`{{ ${u} }}`,"g"),d)},s.templates[t]),l=new DOMParser().parseFromString(a,"text/html").querySelector("body > *");return e[n](l),l},m="get",p={check_balance:{http_method:m,path:"/balance.json"},preauth:{http_method:m,path:"/preauth.json"}},C=(s,e)=>`${s}${p[e].path}`,b=s=>p[s].http_method,_=(s,e)=>Object.assign({},s,e),f=s=>`?${Object.keys(s).map(t=>`${encodeURIComponent(t)}=${encodeURIComponent(s[t])}`).join("&")}`;class S{constructor({authentication:e,endpoint:t}){this.authentication=e,this.endpoint=t}execute({method:e,params:t,onSuccess:i,onFailure:n}){const a=C(this.endpoint,e),r=b(e),l=_(this.authentication,t);return fetch(a+f(l),{method:r,mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8"}}).then(o=>o.json().then(c=>{if(c&&c.response)if(c.response.status==="OK"){i&&i(c.response);return}else{n&&n(c.response);return}if(o.status===400||o.status===422||o.status===500){n&&n(c);return}i&&i(c)}))}checkBalance({number:e,pin:t,onSuccess:i,onFailure:n}){return this.execute({method:"check_balance",params:{voucher_number:e,security_code:t},onSuccess:i,onFailure:n})}preauth({number:e,pin:t,amount:i,onSuccess:n,onFailure:a}){return this.execute({method:"preauth",params:{voucher_number:e,security_code:t,voucher_amount:i},onSuccess:n,onFailure:a})}}const v="contact_information",y="shipping_method",k="payment_method",T='[data-givex-balance-checker="form"]',P='[data-givex-balance-checker="number"]',O='[data-givex-balance-checker="pin"]',x='[data-givex-balance-checker="result"]',I='[data-givex-balance-checker="submit"]',R='[data-discount-field="true"]',L=".fieldset",B="form",G="[data-reduction-form]",N='[name="checkout[security_code]"]',A='[type="submit"]',E="security_code_is_required",D="security_code_is_optional";class U{constructor(e,t,i){this.formWrapperElement=e,this.api=t,this.config=i,this.potentialGivexCard=!1,this.initialise()}initialise(){this.debug("initialise()");const{formWrapperElement:e}=this;this.inputElement=e.querySelector(R),this.fieldsetElement=this.inputElement.closest(L),this.formElement=this.inputElement.closest(B),this.submitElement=e.querySelector(A),(this.config.security_code_policy===E||this.config.security_code_policy===D)&&(this.renderSecurityCode(),this.securityCodeInputElement=e.querySelector(N)),this.inputElement.addEventListener("input",this.handleInput.bind(this)),this.inputElement.addEventListener("keypress",this.handleKeypress.bind(this)),this.formElement.addEventListener("submit",this.handleSubmit.bind(this)),this.submitElement.addEventListener("click",this.handleClick.bind(this)),e.dataset.givex="true"}renderSecurityCode(){const{config:e}=this;h(e,this.fieldsetElement,"checkout_security_code")}handleInput(e){this.debug("handleInput()",e),this.potentialGivexCard=this.isPotentialGivexCard(this.inputElement.value),this.debug("potentialGivexCard",this.potentialGivexCard),this.formWrapperElement.classList.toggle("is-potential-givex-card",this.potentialGivexCard)}handleKeypress(e){this.debug("handleKeypress()",e),e.keyCode===13&&(this.potentialGivexCard=this.isPotentialGivexCard(this.inputElement.value),this.debug("potentialGivexCard",this.potentialGivexCard),this.potentialGivexCard&&(e.stopImmediatePropagation(),this.handleSubmit()))}handleClick(e){this.debug("handleClick()",e),this.potentialGivexCard&&(e.stopImmediatePropagation(),this.handleSubmit())}handleSubmit(e){this.debug("handleSubmit()",e);const{formWrapperElement:t,potentialGivexCard:i,inputElement:n,securityCodeInputElement:a,submitElement:r,api:l,config:o}=this;if(!i||t.dataset.forceSubmit==="true")return!0;if(e&&e.preventDefault(),e&&e.stopPropagation(),a&&a.value.trim().length===0)return a.focus(),!1;r.classList.add("btn--loading"),r.disabled=!0;const c=n.value,u=a?a.value:null,d=o.checkout.total_price;l.preauth({number:c,pin:u,amount:d,onSuccess:this.handlePreauthSuccess.bind(this),onFailure:this.handlePreauthFailure.bind(this)})}handlePreauthSuccess(e){this.debug("handlePreauthSuccess()",e);const{inputElement:t}=this,i=document.createElement("input");i.type="hidden",i.name="checkout[reduction_code]",i.value=e.voucher_number,t.after(i),t.disabled=!0,this.securityCodeInputElement&&(this.securityCodeInputElement.disabled=!0),this.handlePreauthComplete()}handlePreauthFailure(e){this.debug("handlePreauthFailure()",e),this.handlePreauthComplete()}handlePreauthComplete(){this.debug("handlePreauthComplete()");const{formWrapperElement:e,formElement:t}=this;e.dataset.forceSubmit="true",t.submit()}isPotentialGivexCard(e){return this.debug("isPotentialGivexCard()",e),e.replace(/\D/g,"").length>=this.config.card_code_length}debug(...e){!this.config.debug||console.log("[Givex CheckoutForm]",...e)}}const F=[v,y,k];class M{constructor(e,t,i,n){this.document=e,this.Shopify=t,this.api=i,this.config=n,this.initialise()}initialise(){this.debug("initialise()");const{document:e,Shopify:t,api:i,config:n}=this;if(!t||!t.Checkout||!F.includes(t.Checkout.step))return;this.debug("on supported step");const a=()=>{e.querySelectorAll(G).forEach(r=>{r.dataset.givex!=="true"&&new U(r,i,n)})};e.addEventListener("page:load",a),e.addEventListener("page:change",a),a()}debug(...e){!this.config.debug||console.log("[Givex Checkout]",...e)}}class q{constructor(e,t,i){this.formElement=e,this.api=t,this.config=i,this.initialise()}initialise(){this.debug("initialise()");const{formElement:e}=this;this.numberElement=e.querySelector(P),this.pinElement=e.querySelector(O),this.resultElement=e.querySelector(x),this.submitElement=e.querySelector(I),this.formElement.addEventListener("submit",this.handleSubmit.bind(this)),e.dataset.givex="true"}handleSubmit(e){this.debug("handleSubmit()",e);const{numberElement:t,pinElement:i,submitElement:n,resultElement:a,api:r,config:l}=this;if(e.preventDefault(),e.stopPropagation(),l.security_code_policy===E&&i&&i.value.trim().length===0)return i.focus(),!1;n.classList.add("btn--loading"),n.disabled=!0,this.resultElement=h(l,a,"balance_checker_loading",{},"replaceWith");const o=t.value,c=i?i.value:null;r.checkBalance({number:o,pin:c,onSuccess:this.handleBalanceCheckSuccess.bind(this),onFailure:this.handleBalanceCheckFailure.bind(this)})}handleBalanceCheckSuccess(e){this.debug("handleBalanceCheckSuccess",e);const{config:t,resultElement:i}=this;this.resultElement=h(t,i,"balance_checker_success",{message:e.message},"replaceWith"),this.handleBalanceCheckComplete()}handleBalanceCheckFailure(e){this.debug("handleBalanceCheckFailure",e);const{config:t,resultElement:i}=this;this.resultElement=h(t,i,"balance_checker_error",{message:e.message},"replaceWith"),this.handleBalanceCheckComplete()}handleBalanceCheckComplete(){const{submitElement:e}=this;e.classList.remove("btn--loading"),e.disabled=!1}debug(...e){!this.config.debug||console.log("[Givex BalanceCheckerForm]",...e)}}class w{constructor(e,t,i){this.document=e,this.api=t,this.config=i,this.initialise()}initialise(){this.debug("initialise()");const{document:e,api:t,config:i}=this;e.querySelectorAll(T).forEach(n=>{n.dataset.givex!=="true"&&new q(n,t,i)})}debug(...e){!this.config.debug||console.log("[Givex Balance Checker]",...e)}}class H{constructor(e,t,i={}){const n=new S(i);this.api=n,this.checkout=new M(e,t,n,i),this.balanceChecker=new w(e,n,i)}}(()=>{if(!window||!document)return;const s=window.Shopify,e=g(document,"givex-config");window.givex=new H(document,s,e)})()})();
