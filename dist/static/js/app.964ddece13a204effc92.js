webpackJsonp([2],{0:function(e,n,s){e.exports=s("NHnr")},GHGh:function(e,n,s){var a=s("z/+d");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("rjj0")("08bac906",a,!1,{})},NHnr:function(e,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=s("7+uW"),t=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)};t._withStripped=!0;var r={render:t,staticRenderFns:[]},o=r;var c=!1;var p=s("VU/8")({name:"App"},o,!1,function(e){c||s("GHGh")},null,null);p.options.__file="src/App.vue";var i=p.exports,u=s("/ocq");a.a.use(u.a);var l=new u.a({routes:[{path:"/",name:"HelloWorld",component:function(){return s.e(0).then(s.bind(null,"Qt9A"))}}]}),f=s("woOf"),m=s.n(f),b=Object({a:1,assetsPublicPath:"/"}),d=s("//Fk"),g=s.n(d),v=s("mtWM"),h=s.n(v);h.a.interceptors.request.use(function(e){return e},function(e){return g.a.reject(e)}),h.a.interceptors.response.use(function(e){if(200==e.status&&e.data.errno)switch(e.data.errno){case 1999:break;case 1e4:console.log("正常时返回10000");break;case 20001:console.log("登陆超时处理逻辑");break;default:console.log("其他服务端错误处理逻辑")}return e},function(e){if(e&&e.response)switch(e.response.status){case 400:e.message="请求地址语法错误，请重试！";break;case 401:e.message="未授权，请登录！";break;case 403:e.message="服务器拒绝请求，请重试！";break;case 404:e.message="请求地址出错: "+e.response.config.url;break;case 408:e.message="请求超时！";break;case 500:e.message="服务器内部错误，请刷新页面或重试操作！";break;case 501:e.message="服务未实现！";break;case 502:e.message="服务器网关错误，请刷新页面或重试操作！";break;case 503:e.message="服务暂时不可用，请稍后重试！";break;case 504:e.message="服务器网关超时，请刷新页面或重试操作！";break;case 505:e.message="HTTP版本不受支持！"}return g.a.reject(e)});var k={axios:h.a},A={install:function(e){e.$c=b,e.prototype.$bus=new e,m()(e,k)}},w=A;s("hFnu");a.a.config.productionTip=!1,a.a.use(w),l.beforeEach(function(e,n,s){s()}),l.afterEach(function(e,n){}),new a.a({el:"#app",router:l,components:{App:i},template:"<App/>"})},hFnu:function(e,n){},"z/+d":function(e,n,s){(e.exports=s("FZ+f")(!0)).push([e.i,"\n#app {\n}\n","",{version:3,sources:["/Users/heliang/work_other/cli/test/worldcup/src/src/App.vue"],names:[],mappings:";AAaA;CAEA",file:"App.vue",sourcesContent:["<template>\n  <div id=\"app\">\n    <router-view/>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App'\n}\n<\/script>\n\n<style>\n#app {\n  \n}\n</style>\n"],sourceRoot:""}])}},[0]);
//# sourceMappingURL=app.964ddece13a204effc92.js.map