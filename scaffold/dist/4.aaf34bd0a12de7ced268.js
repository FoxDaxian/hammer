(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{236:function(n,e,t){"use strict";t.r(e);t(214),t(92),t(93),t(215);var o,r,c=t(216),s=t.n(c),a=(t(205),t(217)),i=t.n(a),u=t(218),f=t.n(u),l=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;return new Promise(function(e){setTimeout(function(){e()},n)})};e.default={nodeBeforeCreate:function(n){n.store.commit("increment")},data:function(){return{name:"fox"}},components:{},methods:{asyncFn:(r=i()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("啦啦啦"),n.next=3,l();case 3:console.log("斤斤计较");case 4:case"end":return n.stop()}},n)})),function(){return r.apply(this,arguments)})},mounted:(o=i()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return f()({method:"post",url:"/fox",data:{firstName:"Fred",lastName:"Flintstone"},params:{ID:12345}}).then(function(n){console.log(n)}).catch(function(n){console.log(n)}),console.log("开始"),n.next=4,l();case 4:this.name="测试async",console.log("结束");case 6:case"end":return n.stop()}},n,this)})),function(){return o.apply(this,arguments)}),render:function(){var n=arguments[0];return n("div",{attrs:{id:"singleWrap"},on:{click:this.asyncFn}},["改了啊",this.name])}}}}]);