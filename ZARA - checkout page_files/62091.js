"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[62091],{62091:function(t,n,e){var o=e(95318);Object.defineProperty(n,"__esModule",{value:!0}),n.getFormatter=function(t){const n=c.config[t];if(!n)return c.defaultFormatter;return n[a.default.store.countryCode.toLowerCase()]||n.base};var c=e(51886),a=o(e(147))},51886:function(t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.defaultFormatter=n.config=void 0;const e=["Backspace","Delete","ArrowUp","ArrowLeft","ArrowRight","ArrowDown","Tab","Home","End"];function o(t){return~e.indexOf(t)}function c(t){return/^[0-9]$/.test(t)}const a={isValidInput:()=>!0,format:t=>t,unformat:t=>t};n.defaultFormatter=a;const r={isValidInput:(t,n)=>o(n)||t.length<10&&c(n),format:t=>{const n=t.replace(/\s/g,"");return n&&n.replace(/^(\d{2})(\d{0,7})$/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]," ").concat((arguments.length<=2?void 0:arguments[2])?"".concat(arguments.length<=2?void 0:arguments[2]):"")}))},unformat:t=>t.replace(/\s/g,"")},l={isValidInput:(t,n)=>o(n)||t.length<9&&c(n),format:t=>{const n=t.replace(/\s/g,"");return n&&n.replace(/^(\d{2})(\d{0,6})$/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]," ").concat((arguments.length<=2?void 0:arguments[2])?"".concat(arguments.length<=2?void 0:arguments[2]):"")}))},unformat:t=>t.replace(/\s/g,"")},d={zipcode:{base:a,br:{isValidInput:(t,n)=>o(n)||t.length<9&&c(n),format:t=>{const n=t&&t.replace(/-/g,"");return n&&n.replace(/^(\d{5})(\d{1,3})(\d*)$/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1],"-").concat(arguments.length<=2?void 0:arguments[2])}))},unformat:t=>t.replace(/-/g,"")}},nif:{base:a,br:{isValidInput:(t,n)=>o(n)||t.length<14&&c(n),format:t=>{const n=t&&t.replace(/[\.-]/g,"");return n&&n.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?".":"").concat(arguments.length<=2?void 0:arguments[2]).concat((arguments.length<=3?void 0:arguments[3])?".":"").concat(arguments.length<=3?void 0:arguments[3]).concat((arguments.length<=4?void 0:arguments[4])?"-":"").concat(arguments.length<=4?void 0:arguments[4])}))},unformat:t=>t.replace(/[\.-]/g,"")},gt:{isValidInput:(t,n)=>c(n),format:t=>{const n=t&&t.replace(/[\s-]/g,"");return n&&n.replace(/(\d{1,})(\d)/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?"-":"").concat(arguments.length<=2?void 0:arguments[2])}))},unformat:t=>t.replace(/[-]/g,"")},py:{isValidInput:(t,n)=>o(n)||t.length<14&&c(n),format:t=>{const n=t&&t.replace(/[\s-]/g,"");return n&&n.replace(/(\d{7})([a-zA-Z0-9])?/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?" - ".concat(arguments.length<=2?void 0:arguments[2]):"")}))},unformat:t=>t.replace(/[\s-]/g,"")},pe:{isValidInput:(t,n)=>o(n)||t.length<14&&c(n),format:t=>{const n=t&&t.replace(/[\s-]/g,"");return n&&n.replace(/(\d{8})([a-zA-Z0-9])?/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?" - ".concat(arguments.length<=2?void 0:arguments[2]):"")}))},unformat:t=>t.replace(/[\s-]/g,"")}},companyNif:{base:a,br:{isValidInput:(t,n)=>o(n)||t.length<18&&c(n),format:t=>{const n=t&&t.replace(/\./g,"").replace(/-/g,"").replace(/\//g,"");return n&&n.replace(/(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?".":"").concat(arguments.length<=2?void 0:arguments[2]).concat((arguments.length<=3?void 0:arguments[3])?".":"").concat(arguments.length<=3?void 0:arguments[3]).concat((arguments.length<=4?void 0:arguments[4])?"/":"").concat(arguments.length<=4?void 0:arguments[4]).concat((arguments.length<=5?void 0:arguments[5])?"-":"").concat(arguments.length<=5?void 0:arguments[5])}))},unformat:t=>t.replace(/[\.\-/]/g,"")},ph:{isValidInput:(t,n)=>o(n)||t.length<15&&c(n),format:t=>{const n=t&&t.replace(/-/g,"");return n&&n.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,3})/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?"-":"").concat(arguments.length<=2?void 0:arguments[2]).concat((arguments.length<=3?void 0:arguments[3])?"-":"").concat(arguments.length<=3?void 0:arguments[3]).concat((arguments.length<=4?void 0:arguments[4])?"-":"").concat(arguments.length<=4?void 0:arguments[4])}))},unformat:t=>t.replace(/-/g,"")}},phone:{base:a,br:{isValidInput:(t,n)=>o(n)||t.length<31&&c(n),format:t=>{const n=t.replace(/[\(\) \-]/g,"");return n&&n.replace(/^(\d{2})(\d{0,4}\d*?)(\d{4})?$/,(function(){return"".concat((arguments.length<=2?void 0:arguments[2])?"(".concat(arguments.length<=1?void 0:arguments[1],") ").concat(arguments.length<=2?void 0:arguments[2]):arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=3?void 0:arguments[3])?"-".concat(arguments.length<=3?void 0:arguments[3]):"")}))},unformat:t=>t.replace(/[\(\) \-]/g,"")},xk:l,al:r,ba:r,me:l},bban:{base:a,pe:{isValidInput:(t,n)=>o(n)||t.length<24&&c(n),format:t=>{const n=t.replace(/\-/g,"");return n&&n.replace(/^(\d{0,4})(\d{0,4})(\d{0,2})(\d{0,8})(\d{0,2})(\d{0,})$/,(function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return n.slice(1,6).filter((t=>t.length)).join("-")}))},unformat:t=>t.replace(/-/g,"")},me:{isValidInput:(t,n)=>o(n)||t.length<20&&c(n),format:t=>{const n=t.replace(/\-/g,"");return n&&n.replace(/^(\d{3})(\d{0,13})(\d{0,2})(\d{0,})$/,(function(){return"".concat(arguments.length<=1?void 0:arguments[1]).concat((arguments.length<=2?void 0:arguments[2])?"-":"").concat(arguments.length<=2?void 0:arguments[2]).concat((arguments.length<=3?void 0:arguments[3])?"-":"").concat(arguments.length<=3?void 0:arguments[3])}))},unformat:t=>t.replace(/-/g,"")}}};n.config=d}}]);