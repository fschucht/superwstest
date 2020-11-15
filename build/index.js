!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("superwstest",[],t):"object"==typeof exports?exports.superwstest=t():e.superwstest=t()}(global,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("supertest")},function(e,t){e.exports=require("blocking-queue")},function(e,t){e.exports=require("ws")},function(e,t){e.exports=require("fast-deep-equal")},function(e,t,n){e.exports=n(5)},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return S}));var r=n(0),o=n.n(r),s=n(1),c=n.n(s),i=n(3),u=n.n(i),a=n(2),f=n.n(a);const l=/^http/;function d(e){if("string"!=typeof e)throw new Error("Expected text message, got "+typeof e);return e}function p(e){return JSON.parse(d(e))}function w(e,t){e.send(t,e=>{if(e)throw e})}const g={send:(e,t)=>w(e,t),sendText:(e,t)=>w(e,String(t)),sendJson:(e,t)=>w(e,JSON.stringify(t)),wait:(e,t)=>new Promise(e=>setTimeout(e,t)),exec:async(e,t)=>t(e),expectMessage:async(e,t,n)=>{const r=await Promise.race([e.messages.pop(),e.closed.then(()=>{throw new Error(`Expected message ${JSON.stringify(n)}, but connection closed`)})]).then(t);if(void 0!==n)if("function"==typeof n){if(!1===n(r))throw new Error("Message expectation failed for "+JSON.stringify(r))}else if(!u()(r,n))throw new Error(`Expected message ${JSON.stringify(n)}, got ${JSON.stringify(r)}`)},expectText:(e,t)=>g.expectMessage(e,d,t),expectJson:(e,t)=>g.expectMessage(e,p,t),close:(e,t,n)=>e.close(t,n),expectClosed:async(e,t=null,n=null)=>{const{code:r,message:o}=await e.closed;if(null!==t&&r!==t)throw new Error(`Expected close code ${t}, got ${r}`);if(null!==n&&o!==n)throw new Error(`Expected close message "${n}", got "${o}"`)}};function h(e){throw e.close(),new Error("Expected connection failure, but succeeded")}function y(e){return e.readyState===f.a.CONNECTING||e.readyState===f.a.OPEN}const x=new Set;function m(e,t,n){let r=new Promise((r,o)=>{const s=new f.a(e,t,n);x.add(s);const i=s.close.bind(s);s.close=(...e)=>{i(...e),x.delete(s)},s.messages=new c.a;const u=new c.a,a=new c.a;s.closed=a.pop(),s.firstError=u.pop().then(e=>{throw e}),s.on("message",e=>s.messages.push(e)),s.on("error",o),s.on("close",(e,t)=>{x.delete(s),a.push({code:e,message:t})}),s.on("open",()=>{s.removeListener("error",o),s.on("error",e=>u.push(e)),r(s)})});const o={};function s(e){return Object.assign(e,o)}const i=e=>(...t)=>(r=r.then(n=>Promise.race([e(n,...t),n.firstError]).catch(function(e){return t=>{throw y(e)&&e.close(),t}}(n)).then(()=>n)),delete r.expectConnectionError,s(r));return Object.keys(g).forEach(e=>{o[e]=i(g[e])}),r.expectConnectionError=(e=null)=>(r=r.then(h,t=>function(e,t){if(!t)return;let n=t;"number"==typeof t&&(n="Unexpected server response: "+t);const r=e.message;if(r!==n)throw new Error(`Expected connection failure with message "${n}", got "${r}"`)}(t,e)),delete r.expectConnectionError,r),s(r)}const E=new WeakMap;function b(e,t){let n=E.get(e);if(n)return void(n.shutdownDelay=Math.max(n.shutdownDelay,t));n={shutdownDelay:t},E.set(e,n);const r=new Set;e.on("connection",e=>{r.add(e),e.on("close",()=>r.delete(e))});const o=e.close.bind(e);e.close=t=>{e.address()?(!function(e,t){if(t<=0)return void[...e].forEach(e=>e.end());const n=Date.now()+t;[...e].forEach(async t=>{for(;Date.now()<n&&e.has(t);)await new Promise(e=>setTimeout(e,20));e.has(t)&&t.end()})}(r,n.shutdownDelay),n.shutdownDelay=0,o(t)):t&&t()}}const v=(e,{shutdownDelay:t=0}={})=>{if("string"==typeof e){const t=o()(e);return t.ws=(t,...n)=>m(e+t,...n),t}if(!e.address())throw new Error("Server must be listening: beforeEach((done) => server.listen(0, done));");b(e,t);const n=o()(e);return n.ws=(t,...n)=>m(function(e,t){if(!e.address())throw new Error("Server was closed");return r.Test.prototype.serverAddress(e,t).replace(l,"ws")}(e,t),...n),n};v.closeAll=()=>{const e=[...x].filter(y);return x.clear(),e.forEach(e=>e.close()),e.length};var S=v}])}));
//# sourceMappingURL=index.js.map