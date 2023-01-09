'use strict';

var pt = require('express');
var dt = require('cors');
var Be = require('@trpc/server/adapters/express');
var K = require('zod');
var database = require('database');
var server = require('@trpc/server');
var ut = require('superjson');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var Be__namespace = /*#__PURE__*/_interopNamespaceDefault(Be);

var He=Object.create;var ee=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var Ie=Object.getOwnPropertyNames;var $e=Object.getPrototypeOf,Ge=Object.prototype.hasOwnProperty;var w=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(r,t)=>(typeof require!="undefined"?require:r)[t]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var v=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var Je=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of Ie(r))!Ge.call(e,o)&&o!==t&&ee(e,o,{get:()=>r[o],enumerable:!(n=Me(r,o))||n.enumerable});return e};var ze=(e,r,t)=>(t=e!=null?He($e(e)):{},Je(r||!e||!e.__esModule?ee(t,"default",{value:e,enumerable:!0}):t,e));var ne=v((H,te)=>{var F=w("buffer"),y=F.Buffer;function re(e,r){for(var t in e)r[t]=e[t];}y.from&&y.alloc&&y.allocUnsafe&&y.allocUnsafeSlow?te.exports=F:(re(F,H),H.Buffer=k);function k(e,r,t){return y(e,r,t)}re(y,k);k.from=function(e,r,t){if(typeof e=="number")throw new TypeError("Argument must not be a number");return y(e,r,t)};k.alloc=function(e,r,t){if(typeof e!="number")throw new TypeError("Argument must be a number");var n=y(e);return r!==void 0?typeof t=="string"?n.fill(r,t):n.fill(r):n.fill(0),n};k.allocUnsafe=function(e){if(typeof e!="number")throw new TypeError("Argument must be a number");return y(e)};k.allocUnsafeSlow=function(e){if(typeof e!="number")throw new TypeError("Argument must be a number");return F.SlowBuffer(e)};});var ae=v((ht,M)=>{var We=ne().Buffer;M.exports=Ve;M.exports.parse=oe;var Ze=/^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/,Qe=/^([^:]*):(.*)$/;function Ve(e){if(!e)throw new TypeError("argument req is required");if(typeof e!="object")throw new TypeError("argument req is required to be an object");var r=Xe(e);return oe(r)}function Ye(e){return We.from(e,"base64").toString()}function Xe(e){if(!e.headers||typeof e.headers!="object")throw new TypeError("argument req is required to have headers property");return e.headers.authorization}function oe(e){if(typeof e=="string"){var r=Ze.exec(e);if(!!r){var t=Qe.exec(Ye(r[1]));if(!!t)return new Ke(t[1],t[2])}}}function Ke(e,r){this.name=e,this.pass=r;}});var ie=v((yt,se)=>{var x=1e3,_=x*60,A=_*60,S=A*24,er=S*365.25;se.exports=function(e,r){r=r||{};var t=typeof e;if(t==="string"&&e.length>0)return rr(e);if(t==="number"&&isNaN(e)===!1)return r.long?nr(e):tr(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function rr(e){if(e=String(e),!(e.length>100)){var r=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!!r){var t=parseFloat(r[1]),n=(r[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return t*er;case"days":case"day":case"d":return t*S;case"hours":case"hour":case"hrs":case"hr":case"h":return t*A;case"minutes":case"minute":case"mins":case"min":case"m":return t*_;case"seconds":case"second":case"secs":case"sec":case"s":return t*x;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function tr(e){return e>=S?Math.round(e/S)+"d":e>=A?Math.round(e/A)+"h":e>=_?Math.round(e/_)+"m":e>=x?Math.round(e/x)+"s":e+"ms"}function nr(e){return P(e,S,"day")||P(e,A,"hour")||P(e,_,"minute")||P(e,x,"second")||e+" ms"}function P(e,r,t){if(!(e<r))return e<r*1.5?Math.floor(e/r)+" "+t:Math.ceil(e/r)+" "+t+"s"}});var G=v((u,ue)=>{u=ue.exports=$.debug=$.default=$;u.coerce=ur;u.disable=sr;u.enable=ar;u.enabled=ir;u.humanize=ie();u.names=[];u.skips=[];u.formatters={};var I;function or(e){var r=0,t;for(t in e)r=(r<<5)-r+e.charCodeAt(t),r|=0;return u.colors[Math.abs(r)%u.colors.length]}function $(e){function r(){if(!!r.enabled){var t=r,n=+new Date,o=n-(I||n);t.diff=o,t.prev=I,t.curr=n,I=n;for(var a=new Array(arguments.length),s=0;s<a.length;s++)a[s]=arguments[s];a[0]=u.coerce(a[0]),typeof a[0]!="string"&&a.unshift("%O");var i=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,function(p,h){if(p==="%%")return p;i++;var d=u.formatters[h];if(typeof d=="function"){var f=a[i];p=d.call(t,f),a.splice(i,1),i--;}return p}),u.formatArgs.call(t,a);var g=r.log||u.log||console.log.bind(console);g.apply(t,a);}}return r.namespace=e,r.enabled=u.enabled(e),r.useColors=u.useColors(),r.color=or(e),typeof u.init=="function"&&u.init(r),r}function ar(e){u.save(e),u.names=[],u.skips=[];for(var r=(typeof e=="string"?e:"").split(/[\s,]+/),t=r.length,n=0;n<t;n++)!r[n]||(e=r[n].replace(/\*/g,".*?"),e[0]==="-"?u.skips.push(new RegExp("^"+e.substr(1)+"$")):u.names.push(new RegExp("^"+e+"$")));}function sr(){u.enable("");}function ir(e){var r,t;for(r=0,t=u.skips.length;r<t;r++)if(u.skips[r].test(e))return !1;for(r=0,t=u.names.length;r<t;r++)if(u.names[r].test(e))return !0;return !1}function ur(e){return e instanceof Error?e.stack||e.message:e}});var le=v((m,fe)=>{m=fe.exports=G();m.log=lr;m.formatArgs=fr;m.save=pr;m.load=ce;m.useColors=cr;m.storage=typeof chrome!="undefined"&&typeof chrome.storage!="undefined"?chrome.storage.local:dr();m.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function cr(){return typeof window!="undefined"&&window.process&&window.process.type==="renderer"?!0:typeof document!="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}m.formatters.j=function(e){try{return JSON.stringify(e)}catch(r){return "[UnexpectedJSONParseError]: "+r.message}};function fr(e){var r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+m.humanize(this.diff),!!r){var t="color: "+this.color;e.splice(1,0,t,"color: inherit");var n=0,o=0;e[0].replace(/%[a-zA-Z%]/g,function(a){a!=="%%"&&(n++,a==="%c"&&(o=n));}),e.splice(o,0,t);}}function lr(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function pr(e){try{e==null?m.storage.removeItem("debug"):m.storage.debug=e;}catch(r){}}function ce(){var e;try{e=m.storage.debug;}catch(r){}return !e&&typeof process!="undefined"&&"env"in process&&(e=process.env.DEBUG),e}m.enable(ce());function dr(){try{return window.localStorage}catch(e){}}});var ge=v((l,me)=>{var pe=w("tty"),C=w("util");l=me.exports=G();l.init=wr;l.log=hr;l.formatArgs=vr;l.save=yr;l.load=de;l.useColors=gr;l.colors=[6,2,3,4,5,1];l.inspectOpts=Object.keys(process.env).filter(function(e){return /^debug_/i.test(e)}).reduce(function(e,r){var t=r.substring(6).toLowerCase().replace(/_([a-z])/g,function(o,a){return a.toUpperCase()}),n=process.env[r];return /^(yes|on|true|enabled)$/i.test(n)?n=!0:/^(no|off|false|disabled)$/i.test(n)?n=!1:n==="null"?n=null:n=Number(n),e[t]=n,e},{});var T=parseInt(process.env.DEBUG_FD,10)||2;T!==1&&T!==2&&C.deprecate(function(){},"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();var mr=T===1?process.stdout:T===2?process.stderr:br(T);function gr(){return "colors"in l.inspectOpts?Boolean(l.inspectOpts.colors):pe.isatty(T)}l.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,C.inspect(e,this.inspectOpts).split(`
`).map(function(r){return r.trim()}).join(" ")};l.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,C.inspect(e,this.inspectOpts)};function vr(e){var r=this.namespace,t=this.useColors;if(t){var n=this.color,o="  \x1B[3"+n+";1m"+r+" \x1B[0m";e[0]=o+e[0].split(`
`).join(`
`+o),e.push("\x1B[3"+n+"m+"+l.humanize(this.diff)+"\x1B[0m");}else e[0]=new Date().toUTCString()+" "+r+" "+e[0];}function hr(){return mr.write(C.format.apply(C,arguments)+`
`)}function yr(e){e==null?delete process.env.DEBUG:process.env.DEBUG=e;}function de(){return process.env.DEBUG}function br(e){var r,t=process.binding("tty_wrap");switch(t.guessHandleType(e)){case"TTY":r=new pe.WriteStream(e),r._type="tty",r._handle&&r._handle.unref&&r._handle.unref();break;case"FILE":var n=w("fs");r=new n.SyncWriteStream(e,{autoClose:!1}),r._type="fs";break;case"PIPE":case"TCP":var o=w("net");r=new o.Socket({fd:e,readable:!1,writable:!0}),r.readable=!1,r.read=null,r._type="pipe",r._handle&&r._handle.unref&&r._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return r.fd=e,r._isStdio=!0,r}function wr(e){e.inspectOpts={};for(var r=Object.keys(l.inspectOpts),t=0;t<r.length;t++)e.inspectOpts[r[t]]=l.inspectOpts[r[t]];}l.enable(de());});var ve=v((bt,J)=>{typeof process!="undefined"&&process.type==="renderer"?J.exports=le():J.exports=ge();});var ke=v((wt,we)=>{var kr=w("path").relative;we.exports=Ar;var Tr=process.cwd();function ye(e,r){for(var t=e.split(/[ ,]+/),n=String(r).toLowerCase(),o=0;o<t.length;o++){var a=t[o];if(a&&(a==="*"||a.toLowerCase()===n))return !0}return !1}function Er(e,r,t){var n=Object.getOwnPropertyDescriptor(e,r),o=n.value;return n.get=function(){return o},n.writable&&(n.set=function(s){return o=s}),delete n.value,delete n.writable,Object.defineProperty(e,r,n),n}function xr(e){for(var r="",t=0;t<e;t++)r+=", arg"+t;return r.substr(2)}function _r(e){var r=this.name+": "+this.namespace;this.message&&(r+=" deprecated "+this.message);for(var t=0;t<e.length;t++)r+=`
    at `+e[t].toString();return r}function Ar(e){if(!e)throw new TypeError("argument namespace is required");var r=j(),t=E(r[1]),n=t[0];function o(a){R.call(o,a);}return o._file=n,o._ignored=Cr(e),o._namespace=e,o._traced=Or(e),o._warned=Object.create(null),o.function=Pr,o.property=Rr,o}function Sr(e,r){var t=typeof e.listenerCount!="function"?e.listeners(r).length:e.listenerCount(r);return t>0}function Cr(e){if(process.noDeprecation)return !0;var r=process.env.NO_DEPRECATION||"";return ye(r,e)}function Or(e){if(process.traceDeprecation)return !0;var r=process.env.TRACE_DEPRECATION||"";return ye(r,e)}function R(e,r){var t=Sr(process,"deprecation");if(!(!t&&this._ignored)){var n,o,a,s,i=0,g=!1,p=j(),h=this._file;for(r?(s=r,a=E(p[1]),a.name=s.name,h=a[0]):(i=2,s=E(p[i]),a=s);i<p.length;i++)if(n=E(p[i]),o=n[0],o===h)g=!0;else if(o===this._file)h=this._file;else if(g)break;var d=n?s.join(":")+"__"+n.join(":"):void 0;if(!(d!==void 0&&d in this._warned)){this._warned[d]=!0;var f=e;if(f||(f=a===s||!a.name?he(s):he(a)),t){var b=be(this._namespace,f,p.slice(i));process.emit("deprecation",b);return}var U=process.stderr.isTTY?Dr:Ur,D=U.call(this,f,n,p.slice(i));process.stderr.write(D+`
`,"utf8");}}}function E(e){var r=e.getFileName()||"<anonymous>",t=e.getLineNumber(),n=e.getColumnNumber();e.isEval()&&(r=e.getEvalOrigin()+", "+r);var o=[r,t,n];return o.callSite=e,o.name=e.getFunctionName(),o}function he(e){var r=e.callSite,t=e.name;t||(t="<anonymous@"+z(e)+">");var n=r.getThis(),o=n&&r.getTypeName();return o==="Object"&&(o=void 0),o==="Function"&&(o=n.name||o),o&&r.getMethodName()?o+"."+t:t}function Ur(e,r,t){var n=new Date().toUTCString(),o=n+" "+this._namespace+" deprecated "+e;if(this._traced){for(var a=0;a<t.length;a++)o+=`
    at `+t[a].toString();return o}return r&&(o+=" at "+z(r)),o}function Dr(e,r,t){var n="\x1B[36;1m"+this._namespace+"\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m"+e+"\x1B[39m";if(this._traced){for(var o=0;o<t.length;o++)n+=`
    \x1B[36mat `+t[o].toString()+"\x1B[39m";return n}return r&&(n+=" \x1B[36m"+z(r)+"\x1B[39m"),n}function z(e){return kr(Tr,e[0])+":"+e[1]+":"+e[2]}function j(){var e=Error.stackTraceLimit,r={},t=Error.prepareStackTrace;Error.prepareStackTrace=Fr,Error.stackTraceLimit=Math.max(10,e),Error.captureStackTrace(r);var n=r.stack.slice(1);return Error.prepareStackTrace=t,Error.stackTraceLimit=e,n}function Fr(e,r){return r}function Pr(e,r){if(typeof e!="function")throw new TypeError("argument fn must be a function");var t=xr(e.length),n=j(),o=E(n[1]);o.name=e.name;var a=new Function("fn","log","deprecate","message","site",`"use strict"
return function (`+t+`) {log.call(deprecate, message, site)
return fn.apply(this, arguments)
}`)(e,R,this,r,o);return a}function Rr(e,r,t){if(!e||typeof e!="object"&&typeof e!="function")throw new TypeError("argument obj must be object");var n=Object.getOwnPropertyDescriptor(e,r);if(!n)throw new TypeError("must call property on owner object");if(!n.configurable)throw new TypeError("property must be configurable");var o=this,a=j(),s=E(a[1]);s.name=r,"value"in n&&(n=Er(e,r));var i=n.get,g=n.set;typeof i=="function"&&(n.get=function(){return R.call(o,t,s),i.apply(this,arguments)}),typeof g=="function"&&(n.set=function(){return R.call(o,t,s),g.apply(this,arguments)}),Object.defineProperty(e,r,n);}function be(e,r,t){var n=new Error,o;return Object.defineProperty(n,"constructor",{value:be}),Object.defineProperty(n,"message",{configurable:!0,enumerable:!1,value:r,writable:!0}),Object.defineProperty(n,"name",{enumerable:!1,configurable:!0,value:"DeprecationError",writable:!0}),Object.defineProperty(n,"namespace",{configurable:!0,enumerable:!1,value:e,writable:!0}),Object.defineProperty(n,"stack",{configurable:!0,enumerable:!1,get:function(){return o!==void 0?o:o=_r.call(this,t)},set:function(s){o=s;}}),n}});var Ee=v((kt,Te)=>{Te.exports=jr;function jr(e,r){if(!Array.isArray(e))throw new TypeError("arg must be an array of [ee, events...] arrays");for(var t=[],n=0;n<e.length;n++){var o=e[n];if(!Array.isArray(o)||o.length<2)throw new TypeError("each array member must be [ee, events...]");for(var a=o[0],s=1;s<o.length;s++){var i=o[s],g=Lr(i,p);a.on(i,g),t.push({ee:a,event:i,fn:g});}}function p(){h(),r.apply(null,arguments);}function h(){for(var f,b=0;b<t.length;b++)f=t[b],f.ee.removeListener(f.event,f.fn);}function d(f){r=f;}return d.cancel=h,d}function Lr(e,r){return function(n){for(var o=new Array(arguments.length),a=this,s=e==="error"?n:null,i=0;i<o.length;i++)o[i]=arguments[i];r(s,a,e,o);}}});var Ae=v((Tt,W)=>{W.exports=qr;W.exports.isFinished=_e;var xe=Ee(),Nr=typeof setImmediate=="function"?setImmediate:function(e){process.nextTick(e.bind.apply(e,arguments));};function qr(e,r){return _e(e)!==!1?(Nr(r,null,e),e):(Hr(e,r),e)}function _e(e){var r=e.socket;if(typeof e.finished=="boolean")return Boolean(e.finished||r&&!r.writable);if(typeof e.complete=="boolean")return Boolean(e.upgrade||!r||!r.readable||e.complete&&!e.readable)}function Br(e,r){var t,n,o=!1;function a(i){t.cancel(),n.cancel(),o=!0,r(i);}t=n=xe([[e,"end","finish"]],a);function s(i){e.removeListener("socket",s),!o&&t===n&&(n=xe([[i,"error","close"]],a));}if(e.socket){s(e.socket);return}e.on("socket",s),e.socket===void 0&&Ir(e,s);}function Hr(e,r){var t=e.__onFinished;(!t||!t.queue)&&(t=e.__onFinished=Mr(e),Br(e,t)),t.queue.push(r);}function Mr(e){function r(t){if(e.__onFinished===r&&(e.__onFinished=null),!!r.queue){var n=r.queue;r.queue=null;for(var o=0;o<n.length;o++)n[o](t,e);}}return r.queue=[],r}function Ir(e,r){var t=e.assignSocket;typeof t=="function"&&(e.assignSocket=function(o){t.call(this,o),r(o);});}});var Ce=v((Et,Se)=>{Se.exports=Gr;function $r(e,r){var t=!1;return function(o){var a=Wr.apply(this,arguments);return t||(t=!0,r.call(this),typeof a[0]=="number"&&this.statusCode!==a[0]&&(a[0]=this.statusCode,a.length=1)),e.apply(this,a)}}function Gr(e,r){if(!e)throw new TypeError("argument res is required");if(typeof r!="function")throw new TypeError("argument listener must be a function");e.writeHead=$r(e.writeHead,r);}function Jr(e,r){for(var t=0;t<r.length;t++)e.setHeader(r[t][0],r[t][1]);}function zr(e,r){for(var t=Object.keys(r),n=0;n<t.length;n++){var o=t[n];o&&e.setHeader(o,r[o]);}}function Wr(e){var r=arguments.length,t=r>1&&typeof arguments[1]=="string"?2:1,n=r>=t+1?arguments[t]:void 0;this.statusCode=e,Array.isArray(n)?Jr(this,n):n&&zr(this,n);for(var o=new Array(Math.min(r,t)),a=0;a<o.length;a++)o[a]=arguments[a];return o}});var De=v((xt,O)=>{O.exports=c;O.exports.compile=Q;O.exports.format=rt;O.exports.token=nt;var Zr=ae(),Z=ve()("morgan"),N=ke()("morgan"),Qr=Ae(),Vr=Ce(),Yr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Xr=1e3;function c(e,r){var t=e,n=r||{};e&&typeof e=="object"&&(n=e,t=n.format||"default",N("morgan(options): use morgan("+(typeof t=="string"?JSON.stringify(t):"format")+", options) instead")),t===void 0&&N("undefined format: specify a format");var o=n.immediate,a=n.skip||!1,s=typeof t!="function"?tt(t):t,i=n.buffer,g=n.stream||process.stdout;if(i){N("buffer option");var p=typeof i!="number"?Xr:i;g=et(g,p);}return function(d,f,b){d._startAt=void 0,d._startTime=void 0,d._remoteAddress=Ue(d),f._startAt=void 0,f._startTime=void 0,Oe.call(d);function U(){if(a!==!1&&a(d,f)){Z("skip request");return}var D=s(c,d,f);if(D==null){Z("skip line");return}Z("log request"),g.write(D+`
`);}o?U():(Vr(f,Oe),Qr(f,U)),b();}}c.format("combined",':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');c.format("common",':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]');c.format("default",':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');N.property(c,"default","default format: use combined format");c.format("short",":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms");c.format("tiny",":method :url :status :res[content-length] - :response-time ms");c.format("dev",function e(r,t,n){var o=V(n)?n.statusCode:void 0,a=o>=500?31:o>=400?33:o>=300?36:o>=200?32:0,s=e[a];return s||(s=e[a]=Q("\x1B[0m:method :url \x1B["+a+"m:status\x1B[0m :response-time ms - :res[content-length]\x1B[0m")),s(r,t,n)});c.token("url",function(r){return r.originalUrl||r.url});c.token("method",function(r){return r.method});c.token("response-time",function(r,t,n){if(!(!r._startAt||!t._startAt)){var o=(t._startAt[0]-r._startAt[0])*1e3+(t._startAt[1]-r._startAt[1])*1e-6;return o.toFixed(n===void 0?3:n)}});c.token("total-time",function(r,t,n){if(!(!r._startAt||!t._startAt)){var o=process.hrtime(r._startAt),a=o[0]*1e3+o[1]*1e-6;return a.toFixed(n===void 0?3:n)}});c.token("date",function(r,t,n){var o=new Date;switch(n||"web"){case"clf":return Kr(o);case"iso":return o.toISOString();case"web":return o.toUTCString()}});c.token("status",function(r,t){return V(t)?String(t.statusCode):void 0});c.token("referrer",function(r){return r.headers.referer||r.headers.referrer});c.token("remote-addr",Ue);c.token("remote-user",function(r){var t=Zr(r);return t?t.name:void 0});c.token("http-version",function(r){return r.httpVersionMajor+"."+r.httpVersionMinor});c.token("user-agent",function(r){return r.headers["user-agent"]});c.token("req",function(r,t,n){var o=r.headers[n.toLowerCase()];return Array.isArray(o)?o.join(", "):o});c.token("res",function(r,t,n){if(!!V(t)){var o=t.getHeader(n);return Array.isArray(o)?o.join(", "):o}});function Kr(e){var r=e.getUTCDate(),t=e.getUTCHours(),n=e.getUTCMinutes(),o=e.getUTCSeconds(),a=e.getUTCFullYear(),s=Yr[e.getUTCMonth()];return L(r)+"/"+s+"/"+a+":"+L(t)+":"+L(n)+":"+L(o)+" +0000"}function Q(e){if(typeof e!="string")throw new TypeError("argument format must be a string");var r=String(JSON.stringify(e)),t=`  "use strict"
  return `+r.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g,function(n,o,a){var s="req, res",i="tokens["+String(JSON.stringify(o))+"]";return a!==void 0&&(s+=", "+String(JSON.stringify(a))),`" +
    (`+i+"("+s+') || "-") + "'});return new Function("tokens, req, res",t)}function et(e,r){var t=[],n=null;function o(){n=null,e.write(t.join("")),t.length=0;}function a(s){n===null&&(n=setTimeout(o,r)),t.push(s);}return {write:a}}function rt(e,r){return c[e]=r,this}function tt(e){var r=c[e]||e||c.default;return typeof r!="function"?Q(r):r}function Ue(e){return e.ip||e._remoteAddress||e.connection&&e.connection.remoteAddress||void 0}function V(e){return typeof e.headersSent!="boolean"?Boolean(e._header):e.headersSent}function L(e){var r=String(e);return (r.length===1?"0":"")+r}function Oe(){this._startAt=process.hrtime(),this._startTime=new Date;}function nt(e,r){return c[e]=r,this}});var qe=ze(De());var ot={port:8e3,origin:process.env.API,dbUri:process.env.POSTGRESQLURL},Y=ot;var X=new database.PrismaClient;async function Fe(){console.log(process.env.POSTGRESQLURL);try{await X.$connect(),console.log("? Database connected successfully");}catch(e){console.log(e),process.exit(1);}finally{await X.$disconnect();}}var Pe=X;var Re=({req:e,res:r})=>({req:e,res:r}),q=server.initTRPC.context().create({transformer:ut,errorFormatter({shape:e,error:r}){return {...e,data:{...e.data,zodError:r.code==="BAD_REQUEST"&&r.cause instanceof K.ZodError?r.cause.flatten():null}}}}),ft=q.middleware;q.procedure;var je=q.router,lt=ft(({next:e,ctx:r})=>{if(!(r!=null&&r.req.headers.token))throw new server.TRPCError({code:"UNAUTHORIZED"});return e({ctx:{user:r.req.headers.token}})}),Le=q.procedure.use(lt);var gt=je({createUser:Le.input(K.object({name:K.string(),email:K.string().email()})).mutation(async({input:{email:e}})=>{try{return {...await Pe.celebrity.create({data:{email:e,password:"",username:""}})}}catch(r){throw new server.TRPCError({code:"BAD_REQUEST",message:"An unexpected error occurred, please try again later.",cause:r})}})}),B=pt();process.env.NODE_ENV!=="production"&&B.use((0, qe.default)("dev"));B.use(dt({origin:[Y.origin,"http://localhost:3000"],credentials:!0}));B.use("/api/trpc",Be__namespace.createExpressMiddleware({router:gt,createContext:Re}));var Ne=Y.port;B.listen(Ne,()=>{Fe(),console.log(`\u{1F680} Server listening on port ${Ne}`);});/*!
 * basic-auth
 * Copyright(c) 2013 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * morgan
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

exports.appRouter = gt;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=server.js.map