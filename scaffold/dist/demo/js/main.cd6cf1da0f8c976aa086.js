!function(e){function t(t){for(var n,i,u=t[0],a=t[1],s=t[2],p=0,l=[];p<u.length;p++)i=u[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&l.push(o[i][0]),o[i]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(f&&f(t);l.length;)l.shift()();return c.push.apply(c,s||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,u=1;u<r.length;u++){var a=r[u];0!==o[a]&&(n=!1)}n&&(c.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={0:0},c=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[],r=o[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise(function(t,n){r=o[e]=[t,n]});t.push(r[2]=n);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=function(e){return i.p+""+({}[e]||e)+"."+{3:"be0a1ccdfe9c33bff029",4:"aaf34bd0a12de7ced268"}[e]+".js"}(e);var a=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(s);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+n+": "+c+")",a.name="ChunkLoadError",a.type=n,a.request=c,r[1](a)}o[e]=void 0}};var s=setTimeout(function(){c({type:"timeout",target:u})},12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var f=a;c.push([202,1]),r()}({115:function(e,t,r){},202:function(e,t,r){"use strict";r.r(t);r(94),r(103),r(105),r(107),r(108),r(109),r(110),r(112),r(113);var n=r(90),o=r.n(n),c=(r(115),{data:function(){return{test:"按钮"}},methods:{click:function(){console.log("点击按钮")}},render:function(){var e=arguments[0];return e("button",{class:"btnWrap",on:{click:this.click}},[this.test])}}),i=(r(116),r(16));function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(r,!0).forEach(function(t){o()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var s={data:function(){return{test:"demopage"}},components:{btn:c},computed:a({},Object(i.c)(["count"])),methods:a({onChange:function(e){},click:function(){this.test="跳转过去了",this.$router.push("/home/test")},click1:function(){this.$router.push("/home/test/profile")},testStore:function(){this.increment()}},Object(i.b)(["increment"])),mounted:function(){},render:function(){var e=arguments[0];return e("div",{attrs:{id:"app"},class:"appclass"},[this.test,e("btn"),e("btn"),e("div",{class:"routerviewwrap"},[e("router-view")]),e("button",{on:{click:this.click}},["跳转"]),e("button",{on:{click:this.click1}},["跳转1"]),e("button",{on:{click:this.testStore}},["store",this.count]),e("img",{attrs:{src:"/img/qrcode.png",alt:""}})])}},f=r(7),p=r.n(f),l=(r(92),r(93),r(51)),d=function(){return Promise.all([r.e(3),r.e(4)]).then(r.bind(null,236))};p.a.use(l.a);var h={template:"<div>foo<router-view></router-view></div>"};p.a.use(i.a);var b=function(){return new i.a.Store({state:{count:0},mutations:{increment:function(e){e.count++}}})},m=r(91),v=r.n(m)()(p.a,{entry:s,createRouter:function(){return new l.a({mode:"history",base:"/demopage",routes:[{path:"/home/test",component:h,children:[{path:"profile",component:d}]}]})},createStore:b,nodeBeforeCreate:function(e){e.store.commit("increment")}});v();t.default=v},7:function(e,t){e.exports=Vue},91:function(e,t){e.exports=function(e,t){var r=t.entry,n=t.createRouter,o=t.createStore,c=t.nodeBeforeCreate;return function(){var t=n(),i=o(),u=new e({render:e=>e(r),router:t,store:i,nodeBeforeCreate:c});return"undefined"!=typeof window&&(u.$mount("#app"),i.replaceState(window.__INITIAL_STATE__)),{app:u,router:t,store:i}}}}});