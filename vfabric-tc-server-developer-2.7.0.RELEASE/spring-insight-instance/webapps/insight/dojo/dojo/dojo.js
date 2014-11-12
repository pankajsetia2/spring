/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _7=_1[i];
_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";
_3+=(i==0?"":",")+_7[0];
_4+=(i==0?"":",")+_7[1];
_5[_7[0]]=_7[1];
_6[_7[1]]=_7[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _8=tn+"";
console[_8]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_8+":");
console["log"](a.join(" "));
}:function(){
};
console[_8]._fake=true;
})();
}
}
}
if(typeof dojo=="undefined"){
dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
var _9=typeof djConfig!="undefined"?djConfig:typeof dojoConfig!="undefined"?dojoConfig:null;
if(_9){
for(var c in _9){
d.config[c]=_9[c];
}
}
dojo.locale=d.config.locale;
var _a="$Rev: 24595 $".match(/\d+/);
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:_a?+_a[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _b,_c,_d={};
for(var i in {toString:1}){
_b=[];
break;
}
dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
_c=_b.length;
dojo._mixin=function(_e,_f){
var _10,s,i;
for(_10 in _f){
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
if(_c&&_f){
for(i=0;i<_c;++i){
_10=_b[i];
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
}
return _e;
};
dojo.mixin=function(obj,_11){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_12,_13,_14){
var obj=_14||d.global;
for(var i=0,p;obj&&(p=_12[i]);i++){
if(i==0&&d._scopeMap[p]){
p=d._scopeMap[p];
}
obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_15,_16,_17){
var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);
return obj&&p?(obj[p]=_16):undefined;
};
dojo.getObject=function(_19,_1a,_1b){
return d._getProp(_19.split("."),_1a,_1b);
};
dojo.exists=function(_1c,obj){
return d.getObject(_1c,false,obj)!==undefined;
};
dojo["eval"]=function(_1d){
return d.global.eval?d.global.eval(_1d):eval(_1d);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo,_1e;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1f){
var mp=d._modulePrefixes;
return !!(mp[_1f]&&mp[_1f].value);
},_getModulePrefix:function(_20){
var mp=d._modulePrefixes;
if(d._moduleHasPrefix(_20)){
return mp[_20].value;
}
return _20;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_21,_22,cb){
var uri=((_21.charAt(0)=="/"||_21.match(/^\w+:/))?"":d.baseUrl)+_21;
try{
_1e=_22;
return !_22?d._loadUri(uri,cb):d._loadUriAndCheck(uri,_22,cb);
}
catch(e){
console.error(e);
return false;
}
finally{
_1e=null;
}
};
dojo._loadUri=function(uri,cb){
if(d._loadedUrls[uri]){
return true;
}
d._inFlightCount++;
var _23=d._getText(uri,true);
if(_23){
d._loadedUrls[uri]=true;
d._loadedUrls.push(uri);
if(cb){
_23=/^define\(/.test(_23)?_23:"("+_23+")";
}else{
_23=d._scopePrefix+_23+d._scopeSuffix;
}
if(!d.isIE){
_23+="\r\n//@ sourceURL="+uri;
}
var _24=d["eval"](_23);
if(cb){
cb(_24);
}
}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){
setTimeout(function(){
if(d._inFlightCount==0){
d._callLoaded();
}
},0);
}
return !!_23;
};
dojo._loadUriAndCheck=function(uri,_25,cb){
var ok=false;
try{
ok=d._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&d._loadedModules[_25]);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var mll=d._loaders;
d._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
d._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _26=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_26.call(obj);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(obj,_27){
d._onto(d._loaders,obj,_27);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){
setTimeout(d.isAIR?function(){
d.loaded();
}:d._scopeName+".loaded();",0);
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_28){
var _29=_28.split(".");
for(var i=_29.length;i>0;i--){
var _2a=_29.slice(0,i).join(".");
if(i==1&&!d._moduleHasPrefix(_2a)){
_29[0]="../"+_29[0];
}else{
var _2b=d._getModulePrefix(_2a);
if(_2b!=_2a){
_29.splice(0,i,_2b);
break;
}
}
}
return _29;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_2c){
_2c();
};
dojo._loadModule=dojo.require=function(_2d,_2e){
_2e=d._global_omit_module_check||_2e;
var _2f=d._loadedModules[_2d];
if(_2f){
return _2f;
}
var _30=d._getModuleSymbols(_2d).join("/")+".js";
var _31=!_2e?_2d:null;
var ok=d._loadPath(_30,_31);
if(!ok&&!_2e){
throw new Error("Could not load '"+_2d+"'; last tried '"+_30+"'");
}
if(!_2e&&!d._isXDomain){
_2f=d._loadedModules[_2d];
if(!_2f){
throw new Error("symbol '"+_2d+"' is not defined after loading '"+_30+"'");
}
}
return _2f;
};
dojo.provide=function(_32){
_32=_32+"";
return (d._loadedModules[_32]=d.getObject(_32,true));
};
dojo.platformRequire=function(_33){
var _34=_33.common||[];
var _35=_34.concat(_33[d._name]||_33["default"]||[]);
for(var x=0;x<_35.length;x++){
var _36=_35[x];
if(_36.constructor==Array){
d._loadModule.apply(d,_36);
}else{
d._loadModule(_36);
}
}
};
dojo.requireIf=function(_37,_38){
if(_37===true){
var _39=[];
for(var i=1;i<arguments.length;i++){
_39.push(arguments[i]);
}
d.require.apply(d,_39);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_3a,_3b){
d._modulePrefixes[_3a]={name:_3a,value:_3b};
};
dojo.requireLocalization=function(_3c,_3d,_3e,_3f){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null,_40=arguments,uri=[_40[0]];
for(var i=1;i<_40.length;i++){
if(!_40[i]){
continue;
}
var _41=new d._Url(_40[i]+""),_42=new d._Url(uri[0]+"");
if(_41.path==""&&!_41.scheme&&!_41.authority&&!_41.query){
if(_41.fragment!=n){
_42.fragment=_41.fragment;
}
_41=_42;
}else{
if(!_41.scheme){
_41.scheme=_42.scheme;
if(!_41.authority){
_41.authority=_42.authority;
if(_41.path.charAt(0)!="/"){
var _43=_42.path.substring(0,_42.path.lastIndexOf("/")+1)+_41.path;
var _44=_43.split("/");
for(var j=0;j<_44.length;j++){
if(_44[j]=="."){
if(j==_44.length-1){
_44[j]="";
}else{
_44.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_44[0]=="")&&_44[j]==".."&&_44[j-1]!=".."){
if(j==(_44.length-1)){
_44.splice(j,1);
_44[j-1]="";
}else{
_44.splice(j-1,2);
j-=2;
}
}
}
}
_41.path=_44.join("/");
}
}
}
}
uri=[];
if(_41.scheme){
uri.push(_41.scheme,":");
}
if(_41.authority){
uri.push("//",_41.authority);
}
uri.push(_41.path);
if(_41.query){
uri.push("?",_41.query);
}
if(_41.fragment){
uri.push("#",_41.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_45,url){
var loc=d._getModuleSymbols(_45).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _46=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_46==-1||_46>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _47=document.getElementsByTagName("script");
var _48=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_47.length;i++){
var src=_47[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_48);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=(_47[i].getAttribute("djConfig")||_47[i].getAttribute("data-dojo-config"));
if(cfg){
var _49=eval("({ "+cfg+" })");
for(var x in _49){
dojo.config[x]=_49[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
d.isMac=dav.indexOf("Macintosh")>=0;
var _4a=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_4a&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_4a+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var _4b=document.documentMode;
if(_4b&&_4b!=5&&Math.floor(d.isIE)!=_4b){
d.isIE=_4b;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
d.isQuirks=document.compatMode=="BackCompat";
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _4c,_4d;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_4c=new XMLHttpRequest();
}
catch(e){
}
}
if(!_4c){
for(var i=0;i<3;++i){
var _4e=d._XMLHTTP_PROGIDS[i];
try{
_4c=new ActiveXObject(_4e);
}
catch(e){
_4d=e;
}
if(_4c){
d._XMLHTTP_PROGIDS=[_4e];
break;
}
}
}
if(!_4c){
throw new Error("XMLHTTP not available: "+_4d);
}
return _4c;
};
d._isDocumentOk=function(_4f){
var _50=_4f.status||0,lp=location.protocol;
return (_50>=200&&_50<300)||_50==304||_50==1223||(!_50&&(lp=="file:"||lp=="chrome:"||lp=="chrome-extension:"||lp=="app:"));
};
var _51=window.location+"";
var _52=document.getElementsByTagName("base");
var _53=(_52&&_52.length>0);
d._getText=function(uri,_54){
var _55=d._xhrObj();
if(!_53&&dojo._Url){
uri=(new dojo._Url(_51,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_55.open("GET",uri,false);
try{
_55.send(null);
if(!d._isDocumentOk(_55)){
var err=Error("Unable to load "+uri+" status:"+_55.status);
err.status=_55.status;
err.responseText=_55.responseText;
throw err;
}
}
catch(e){
if(_54){
return null;
}
throw e;
}
return _55.responseText;
};
var _56=window;
var _57=function(_58,fp){
var _59=_56.attachEvent||_56.addEventListener;
_58=_56.attachEvent?_58:_58.substring(2);
_59(_58,function(){
fp.apply(_56,arguments);
},false);
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
d=null;
};
var _5a=0;
d.addOnWindowUnload=function(obj,_5b){
d._onto(d._windowUnloaders,obj,_5b);
if(!_5a){
_5a=1;
_57("onunload",d.windowUnloaded);
}
};
var _5c=0;
d.addOnUnload=function(obj,_5d){
d._onto(d._unloaders,obj,_5d);
if(!_5c){
_5c=1;
_57("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
if(dojo._scrollIntervalId){
clearInterval(dojo._scrollIntervalId);
dojo._scrollIntervalId=0;
}
if(!dojo._initFired){
dojo._initFired=true;
if(!dojo.config.afterOnLoad&&window.detachEvent){
window.detachEvent("onload",dojo._loadInit);
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",dojo._loadInit,false);
window.addEventListener("load",dojo._loadInit,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",dojo._loadInit);
if(!dojo.config.skipIeDomLoaded&&self===self.top){
dojo._scrollIntervalId=setInterval(function(){
try{
if(document.body){
document.documentElement.doScroll("left");
dojo._loadInit();
}
}
catch(e){
}
},30);
}
}
}
}
if(dojo.isIE){
try{
(function(){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
var _5e=["*","group","roundrect","oval","shape","rect","imagedata","path","textpath","text"],i=0,l=1,s=document.createStyleSheet();
if(dojo.isIE>=8){
i=1;
l=_5e.length;
}
for(;i<l;++i){
s.addRule("v\\:"+_5e[i],"behavior:url(#default#VML); display:inline-block");
}
})();
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _5f in mp){
dojo.registerModulePath(_5f,mp[_5f]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.require("dojo._base._loader.loader_debug");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
(function(){
var d=dojo,_60=Object.prototype.toString;
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=function(it){
return _60.call(it)==="[object Function]";
};
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));
};
dojo.isArrayLike=function(it){
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_61,_62){
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_61.prototype,arguments[i]);
}
return _61;
};
dojo._hitchArgs=function(_63,_64){
var pre=d._toArray(arguments,2);
var _65=d.isString(_64);
return function(){
var _66=d._toArray(arguments);
var f=_65?(_63||d.global)[_64]:_64;
return f&&f.apply(_63||this,pre.concat(_66));
};
};
dojo.hitch=function(_67,_68){
if(arguments.length>2){
return d._hitchArgs.apply(d,arguments);
}
if(!_68){
_68=_67;
_67=null;
}
if(d.isString(_68)){
_67=_67||d.global;
if(!_67[_68]){
throw (["dojo.hitch: scope[\"",_68,"\"] is null (scope=\"",_67,"\")"].join(""));
}
return function(){
return _67[_68].apply(_67,arguments||[]);
};
}
return !_67?_68:function(){
return _68.apply(_67,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_69){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_69){
d._mixin(tmp,_69);
}
return tmp;
};
})();
var _6a=function(obj,_6b,_6c){
return (_6c||[]).concat(Array.prototype.slice.call(obj,_6b||0));
};
var _6d=function(obj,_6e,_6f){
var arr=_6f||[];
for(var x=_6e||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=d.isIE?function(obj){
return ((obj.item)?_6d:_6a).apply(this,arguments);
}:_6a;
dojo.partial=function(_70){
var arr=[null];
return d.hitch.apply(d,arr.concat(d._toArray(arguments)));
};
var _71=d._extraNames,_72=_71.length,_73={};
dojo.clone=function(o){
if(!o||typeof o!="object"||d.isFunction(o)){
return o;
}
if(o.nodeType&&"cloneNode" in o){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
if(o instanceof RegExp){
return new RegExp(o);
}
var r,i,l,s,_74;
if(d.isArray(o)){
r=[];
for(i=0,l=o.length;i<l;++i){
if(i in o){
r.push(d.clone(o[i]));
}
}
}else{
r=o.constructor?new o.constructor():{};
}
for(_74 in o){
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=d.clone(s);
}
}
if(_72){
for(i=0;i<_72;++i){
_74=_71[i];
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=s;
}
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
var _75=/\{([^\}]+)\}/g;
dojo.replace=function(_76,map,_77){
return _76.replace(_77||_75,d.isFunction(map)?map:function(_78,k){
return d.getObject(k,false,map);
});
};
})();
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _79=function(arr,obj,cb){
return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];
};
var _7a=function(_7b,arr,_7c,_7d){
var _7e=_79(arr,_7d,_7c);
arr=_7e[0];
for(var i=0,l=arr.length;i<l;++i){
var _7f=!!_7e[2].call(_7e[1],arr[i],i,arr);
if(_7b^_7f){
return _7f;
}
}
return _7b;
};
dojo.mixin(dojo,{indexOf:function(_80,_81,_82,_83){
var _84=1,end=_80.length||0,i=0;
if(_83){
i=end-1;
_84=end=-1;
}
if(_82!=undefined){
i=_82;
}
if((_83&&i>end)||i<end){
for(;i!=end;i+=_84){
if(_80[i]==_81){
return i;
}
}
}
return -1;
},lastIndexOf:function(_85,_86,_87){
return dojo.indexOf(_85,_86,_87,true);
},forEach:function(arr,_88,_89){
if(!arr||!arr.length){
return;
}
var _8a=_79(arr,_89,_88);
arr=_8a[0];
for(var i=0,l=arr.length;i<l;++i){
_8a[2].call(_8a[1],arr[i],i,arr);
}
},every:function(arr,_8b,_8c){
return _7a(true,arr,_8b,_8c);
},some:function(arr,_8d,_8e){
return _7a(false,arr,_8d,_8e);
},map:function(arr,_8f,_90){
var _91=_79(arr,_90,_8f);
arr=_91[0];
var _92=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_92.push(_91[2].call(_91[1],arr[i],i,arr));
}
return _92;
},filter:function(arr,_93,_94){
var _95=_79(arr,_94,_93);
arr=_95[0];
var _96=[];
for(var i=0,l=arr.length;i<l;++i){
if(_95[2].call(_95[1],arr[i],i,arr)){
_96.push(arr[i]);
}
}
return _96;
}});
})();
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
(function(){
var d=dojo,mix=d._mixin,op=Object.prototype,_97=op.toString,_98=new Function,_99=0,_9a="constructor";
function err(msg,cls){
throw new Error("declare"+(cls?" "+cls:"")+": "+msg);
};
function _9b(_9c,_9d){
var _9e=[],_9f=[{cls:0,refs:[]}],_a0={},_a1=1,l=_9c.length,i=0,j,lin,_a2,top,_a3,rec,_a4,_a5;
for(;i<l;++i){
_a2=_9c[i];
if(!_a2){
err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_9d);
}else{
if(_97.call(_a2)!="[object Function]"){
err("mixin #"+i+" is not a callable constructor.",_9d);
}
}
lin=_a2._meta?_a2._meta.bases:[_a2];
top=0;
for(j=lin.length-1;j>=0;--j){
_a3=lin[j].prototype;
if(!_a3.hasOwnProperty("declaredClass")){
_a3.declaredClass="uniqName_"+(_99++);
}
_a4=_a3.declaredClass;
if(!_a0.hasOwnProperty(_a4)){
_a0[_a4]={count:0,refs:[],cls:lin[j]};
++_a1;
}
rec=_a0[_a4];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_9f[0].refs.push(top);
}
while(_9f.length){
top=_9f.pop();
_9e.push(top.cls);
--_a1;
while(_a5=top.refs,_a5.length==1){
top=_a5[0];
if(!top||--top.count){
top=0;
break;
}
_9e.push(top.cls);
--_a1;
}
if(top){
for(i=0,l=_a5.length;i<l;++i){
top=_a5[i];
if(!--top.count){
_9f.push(top);
}
}
}
}
if(_a1){
err("can't build consistent linearization",_9d);
}
_a2=_9c[0];
_9e[0]=_a2?_a2._meta&&_a2===_9e[_9e.length-_a2._meta.bases.length]?_a2._meta.bases.length:1:0;
return _9e;
};
function _a6(_a7,a,f){
var _a8,_a9,_aa,_ab,_ac,_ad,_ae,opf,pos,_af=this._inherited=this._inherited||{};
if(typeof _a7=="string"){
_a8=_a7;
_a7=a;
a=f;
}
f=0;
_ab=_a7.callee;
_a8=_a8||_ab.nom;
if(!_a8){
err("can't deduce a name to call inherited()",this.declaredClass);
}
_ac=this.constructor._meta;
_aa=_ac.bases;
pos=_af.p;
if(_a8!=_9a){
if(_af.c!==_ab){
pos=0;
_ad=_aa[0];
_ac=_ad._meta;
if(_ac.hidden[_a8]!==_ab){
_a9=_ac.chains;
if(_a9&&typeof _a9[_a8]=="string"){
err("calling chained method with inherited: "+_a8,this.declaredClass);
}
do{
_ac=_ad._meta;
_ae=_ad.prototype;
if(_ac&&(_ae[_a8]===_ab&&_ae.hasOwnProperty(_a8)||_ac.hidden[_a8]===_ab)){
break;
}
}while(_ad=_aa[++pos]);
pos=_ad?pos:-1;
}
}
_ad=_aa[++pos];
if(_ad){
_ae=_ad.prototype;
if(_ad._meta&&_ae.hasOwnProperty(_a8)){
f=_ae[_a8];
}else{
opf=op[_a8];
do{
_ae=_ad.prototype;
f=_ae[_a8];
if(f&&(_ad._meta?_ae.hasOwnProperty(_a8):f!==opf)){
break;
}
}while(_ad=_aa[++pos]);
}
}
f=_ad&&f||op[_a8];
}else{
if(_af.c!==_ab){
pos=0;
_ac=_aa[0]._meta;
if(_ac&&_ac.ctor!==_ab){
_a9=_ac.chains;
if(!_a9||_a9.constructor!=="manual"){
err("calling chained constructor with inherited",this.declaredClass);
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
if(_ac&&_ac.ctor===_ab){
break;
}
}
pos=_ad?pos:-1;
}
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
f=_ac?_ac.ctor:_ad;
if(f){
break;
}
}
f=_ad&&f;
}
_af.c=f;
_af.p=pos;
if(f){
return a===true?f:f.apply(this,a||_a7);
}
};
function _b0(_b1,_b2){
if(typeof _b1=="string"){
return this.inherited(_b1,_b2,true);
}
return this.inherited(_b1,true);
};
function _b3(cls){
var _b4=this.constructor._meta.bases;
for(var i=0,l=_b4.length;i<l;++i){
if(_b4[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _b5(_b6,_b7){
var _b8,i=0,l=d._extraNames.length;
for(_b8 in _b7){
if(_b8!=_9a&&_b7.hasOwnProperty(_b8)){
_b6[_b8]=_b7[_b8];
}
}
for(;i<l;++i){
_b8=d._extraNames[i];
if(_b8!=_9a&&_b7.hasOwnProperty(_b8)){
_b6[_b8]=_b7[_b8];
}
}
};
function _b9(_ba,_bb){
var _bc,t,i=0,l=d._extraNames.length;
for(_bc in _bb){
t=_bb[_bc];
if((t!==op[_bc]||!(_bc in op))&&_bc!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_bc;
}
_ba[_bc]=t;
}
}
for(;i<l;++i){
_bc=d._extraNames[i];
t=_bb[_bc];
if((t!==op[_bc]||!(_bc in op))&&_bc!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_bc;
}
_ba[_bc]=t;
}
}
return _ba;
};
function _bd(_be){
_b9(this.prototype,_be);
return this;
};
function _bf(_c0,_c1){
return function(){
var a=arguments,_c2=a,a0=a[0],f,i,m,l=_c0.length,_c3;
if(!(this instanceof a.callee)){
return _c4(a);
}
if(_c1&&(a0&&a0.preamble||this.preamble)){
_c3=new Array(_c0.length);
_c3[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_c0[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_c3[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_c0[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_c3?_c3[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_c2);
}
};
};
function _c5(_c6,_c7){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _c4(a);
}
if(_c7){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_c6){
_c6.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _c8(_c9){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _c4(a);
}
for(;f=_c9[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _ca(_cb,_cc,_cd){
return function(){
var b,m,f,i=0,_ce=1;
if(_cd){
i=_cc.length-1;
_ce=-1;
}
for(;b=_cc[i];i+=_ce){
m=b._meta;
f=(m?m.hidden:b.prototype)[_cb];
if(f){
f.apply(this,arguments);
}
}
};
};
function _cf(_d0){
_98.prototype=_d0.prototype;
var t=new _98;
_98.prototype=null;
return t;
};
function _c4(_d1){
var _d2=_d1.callee,t=_cf(_d2);
_d2.apply(t,_d1);
return t;
};
d.declare=function(_d3,_d4,_d5){
if(typeof _d3!="string"){
_d5=_d4;
_d4=_d3;
_d3="";
}
_d5=_d5||{};
var _d6,i,t,_d7,_d8,_d9,_da,_db=1,_dc=_d4;
if(_97.call(_d4)=="[object Array]"){
_d9=_9b(_d4,_d3);
t=_d9[0];
_db=_d9.length-t;
_d4=_d9[_db];
}else{
_d9=[0];
if(_d4){
if(_97.call(_d4)=="[object Function]"){
t=_d4._meta;
_d9=_d9.concat(t?t.bases:_d4);
}else{
err("base class is not a callable constructor.",_d3);
}
}else{
if(_d4!==null){
err("unknown base class. Did you use dojo.require to pull it in?",_d3);
}
}
}
if(_d4){
for(i=_db-1;;--i){
_d6=_cf(_d4);
if(!i){
break;
}
t=_d9[i];
(t._meta?_b5:mix)(_d6,t.prototype);
_d7=new Function;
_d7.superclass=_d4;
_d7.prototype=_d6;
_d4=_d6.constructor=_d7;
}
}else{
_d6={};
}
_b9(_d6,_d5);
t=_d5.constructor;
if(t!==op.constructor){
t.nom=_9a;
_d6.constructor=t;
}
for(i=_db-1;i;--i){
t=_d9[i]._meta;
if(t&&t.chains){
_da=mix(_da||{},t.chains);
}
}
if(_d6["-chains-"]){
_da=mix(_da||{},_d6["-chains-"]);
}
t=!_da||!_da.hasOwnProperty(_9a);
_d9[0]=_d7=(_da&&_da.constructor==="manual")?_c8(_d9):(_d9.length==1?_c5(_d5.constructor,t):_bf(_d9,t));
_d7._meta={bases:_d9,hidden:_d5,chains:_da,parents:_dc,ctor:_d5.constructor};
_d7.superclass=_d4&&_d4.prototype;
_d7.extend=_bd;
_d7.prototype=_d6;
_d6.constructor=_d7;
_d6.getInherited=_b0;
_d6.inherited=_a6;
_d6.isInstanceOf=_b3;
if(_d3){
_d6.declaredClass=_d3;
d.setObject(_d3,_d7);
}
if(_da){
for(_d8 in _da){
if(_d6[_d8]&&typeof _da[_d8]=="string"&&_d8!=_9a){
t=_d6[_d8]=_ca(_d8,_d9,_da[_d8]==="after");
t.nom=_d8;
}
}
}
return _d7;
};
d.safeMixin=_b9;
})();
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target,r=t&&t.apply(this,arguments),i,lls=[].concat(ls);
for(i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_dd,_de,_df){
_dd=_dd||dojo.global;
var f=_dd[_de];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_dd[_de]=d;
}
return f._listeners.push(_df);
},remove:function(_e0,_e1,_e2){
var f=(_e0||dojo.global)[_e1];
if(f&&f._listeners&&_e2--){
delete f._listeners[_e2];
}
}};
dojo.connect=function(obj,_e3,_e4,_e5,_e6){
var a=arguments,_e7=[],i=0;
_e7.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_e7.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_e7.push(a[i]);
}
return dojo._connect.apply(this,_e7);
};
dojo._connect=function(obj,_e8,_e9,_ea){
var l=dojo._listener,h=l.add(obj,_e8,dojo.hitch(_e9,_ea));
return [obj,_e8,h,l];
};
dojo.disconnect=function(_eb){
if(_eb&&_eb[0]!==undefined){
dojo._disconnect.apply(this,_eb);
delete _eb[0];
}
};
dojo._disconnect=function(obj,_ec,_ed,_ee){
_ee.remove(obj,_ec,_ed);
};
dojo._topics={};
dojo.subscribe=function(_ef,_f0,_f1){
return [_ef,dojo._listener.add(dojo._topics,_ef,dojo.hitch(_f0,_f1))];
};
dojo.unsubscribe=function(_f2){
if(_f2){
dojo._listener.remove(dojo._topics,_f2[0],_f2[1]);
}
};
dojo.publish=function(_f3,_f4){
var f=dojo._topics[_f3];
if(f){
f.apply(this,_f4||[]);
}
};
dojo.connectPublisher=function(_f5,obj,_f6){
var pf=function(){
dojo.publish(_f5,arguments);
};
return _f6?dojo.connect(obj,_f6,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
(function(){
var _f7=function(){
};
var _f8=Object.freeze||function(){
};
dojo.Deferred=function(_f9){
var _fa,_fb,_fc,_fd,_fe;
var _ff=(this.promise={});
function _100(_101){
if(_fb){
return;
throw new Error("This deferred has already been resolved");
}
_fa=_101;
_fb=true;
_102();
};
function _102(){
var _103;
while(!_103&&_fe){
var _104=_fe;
_fe=_fe.next;
if((_103=(_104.progress==_f7))){
_fb=false;
}
var func=(_fc?_104.error:_104.resolved);
if(func){
try{
var _105=func(_fa);
if(_105&&typeof _105.then==="function"){
_105.then(dojo.hitch(_104.deferred,"resolve"),dojo.hitch(_104.deferred,"reject"));
continue;
}
var _106=_103&&_105===undefined;
if(_103&&!_106){
_fc=_105 instanceof Error;
}
_104.deferred[_106&&_fc?"reject":"resolve"](_106?_fa:_105);
}
catch(e){
_104.deferred.reject(e);
}
}else{
if(_fc){
_104.deferred.reject(_fa);
}else{
_104.deferred.resolve(_fa);
}
}
}
};
this.resolve=this.callback=function(_107){
this.fired=0;
this.results=[_107,null];
_100(_107);
};
this.reject=this.errback=function(_108){
_fc=true;
this.fired=1;
_100(_108);
this.results=[null,_108];
if(!_108||_108.log!==false){
(dojo.config.deferredOnError||function(x){
console.error(x);
})(_108);
}
};
this.progress=function(_109){
var _10a=_fe;
while(_10a){
var _10b=_10a.progress;
_10b&&_10b(_109);
_10a=_10a.next;
}
};
this.addCallbacks=function(_10c,_10d){
this.then(_10c,_10d,_f7);
return this;
};
this.then=_ff.then=function(_10e,_10f,_110){
var _111=_110==_f7?this:new dojo.Deferred(_ff.cancel);
var _112={resolved:_10e,error:_10f,progress:_110,deferred:_111};
if(_fe){
_fd=_fd.next=_112;
}else{
_fe=_fd=_112;
}
if(_fb){
_102();
}
return _111.promise;
};
var _113=this;
this.cancel=_ff.cancel=function(){
if(!_fb){
var _114=_f9&&_f9(_113);
if(!_fb){
if(!(_114 instanceof Error)){
_114=new Error(_114);
}
_114.log=false;
_113.reject(_114);
}
}
};
_f8(_ff);
};
dojo.extend(dojo.Deferred,{addCallback:function(_115){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(_116){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addBoth:function(_117){
var _118=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_118,_118);
},fired:-1});
})();
dojo.when=function(_119,_11a,_11b,_11c){
if(_119&&typeof _119.then==="function"){
return _119.then(_11a,_11b,_11c);
}
return _11a(_119);
};
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_11d,_11e){
if(it===undefined){
return "undefined";
}
var _11f=typeof it;
if(_11f=="number"||_11f=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _120=arguments.callee;
var _121;
_11e=_11e||"";
var _122=_11d?_11e+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_121=tf.call(it);
if(it!==_121){
return _120(_121,_11d,_122);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_11d?" ":"";
var _123=_11d?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_120(obj,_11d,_122);
if(typeof val!="string"){
val="undefined";
}
return _123+_122+val;
});
return "["+res.join(","+sep)+_123+_11e+"]";
}
if(_11f=="function"){
return null;
}
var _124=[],key;
for(key in it){
var _125,val;
if(typeof key=="number"){
_125="\""+key+"\"";
}else{
if(typeof key=="string"){
_125=dojo._escapeString(key);
}else{
continue;
}
}
val=_120(it[key],_11d,_122);
if(typeof val!="string"){
continue;
}
_124.push(_123+_122+_125+":"+sep+val);
}
return "{"+_124.join(","+sep)+_123+_11e+"}";
};
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_126){
if(_126){
this.setColor(_126);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_127){
if(d.isString(_127)){
d.colorFromString(_127,this);
}else{
if(d.isArray(_127)){
d.colorFromArray(_127,this);
}else{
this._set(_127.r,_127.g,_127.b,_127.a);
if(!(_127 instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_128){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_128?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_129,end,_12a,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_129[x]+(end[x]-_129[x])*_12a;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_12b,obj){
var m=_12b.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_12c,obj){
var t=obj||new d.Color(),bits=(_12c.length==4)?4:8,mask=(1<<bits)-1;
_12c=Number("0x"+_12c.substr(1));
if(isNaN(_12c)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_12c&mask;
_12c>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_12d,_12e){
dojo.global=_12d;
dojo.doc=_12e;
};
dojo.withGlobal=function(_12f,_130,_131,_132){
var _133=dojo.global;
try{
dojo.global=_12f;
return dojo.withDoc.call(null,_12f.document,_130,_131,_132);
}
finally{
dojo.global=_133;
}
};
dojo.withDoc=function(_134,_135,_136,_137){
var _138=dojo.doc,_139=dojo._bodyLtr,oldQ=dojo.isQuirks;
try{
dojo.doc=_134;
delete dojo._bodyLtr;
dojo.isQuirks=dojo.doc.compatMode=="BackCompat";
if(_136&&typeof _135=="string"){
_135=_136[_135];
}
return _135.apply(_136,_137||[]);
}
finally{
dojo.doc=_138;
delete dojo._bodyLtr;
if(_139!==undefined){
dojo._bodyLtr=_139;
}
dojo.isQuirks=oldQ;
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_13a,_13b){
if(node){
_13a=del._normalizeEventName(_13a);
if(!dojo.isIE&&(_13a=="mouseenter"||_13a=="mouseleave")){
_13a=(_13a=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_13a,_13b,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_13c){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode>=32?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_13d){
return del._fixEvent(evt,_13d);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _13e=dojo._listener;
dojo._connect=function(obj,_13f,_140,_141,_142){
var _143=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_143?(_142?2:1):0,l=[dojo._listener,del,_13e][lid];
var h=l.add(obj,_13f,dojo.hitch(_140,_141));
return [obj,_13f,h,lid];
};
dojo._disconnect=function(obj,_144,_145,_146){
([dojo._listener,del,_13e][_146]).remove(obj,_144,_145);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};
var _147=dojo.isMac?"metaKey":"ctrlKey";
dojo.isCopyKey=function(e){
return e[_147];
};
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_148){
return e.button&_148;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_149){
return e.button==_149;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
if(dojo.isIE){
var _14a=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _14b=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_13e=iel=dojo._ie_listener={handlers:[],add:function(_14c,_14d,_14e){
_14c=_14c||dojo.global;
var f=_14c[_14d];
if(!f||!f[_14b]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_14b]=[];
f=_14c[_14d]=d;
}
return f[_14b].push(ieh.push(_14e)-1);
},remove:function(_14f,_150,_151){
var f=(_14f||dojo.global)[_150],l=f&&f[_14b];
if(f&&l&&_151--){
delete ieh[l[_151]];
delete l[_151];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_152,fp){
if(!node){
return;
}
_152=del._normalizeEventName(_152);
if(_152=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_14b]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_152,del._fixCallback(fp));
},remove:function(node,_153,_154){
_153=del._normalizeEventName(_153);
iel.remove(node,_153,_154);
if(_153=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_155){
return _155.slice(0,2)!="on"?"on"+_155:_155;
},_nop:function(){
},_fixEvent:function(evt,_156){
if(!evt){
var w=_156&&(_156.ownerDocument||_156.document||_156).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_156||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _157=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _158=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_157.scrollLeft||0)-_158.x;
evt.pageY=evt.clientY+(_157.scrollTop||0)-_158.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(dojo.isIE<9||dojo.isQuirks){
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
}
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_14b]){
return;
}
var k=evt.keyCode;
var _159=(k!=13||(dojo.isIE>=9&&!dojo.isQuirks))&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_159||evt.ctrlKey){
var c=_159?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
evt.cancelBubble=faux.cancelBubble;
}
evt.returnValue=faux.returnValue;
_14a(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_14a(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=(dojo.isIE<9||dojo.isQuirks)?function(evt){
evt=evt||window.event;
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
}:dojo.stopEvent;
}
del._synthesizeEvent=function(evt,_15a){
var faux=dojo.mixin({},evt,_15a);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_15b){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_15c,fp){
if(!node){
return;
}
var _15d=del._add(node,_15c,fp);
if(del._normalizeEventName(_15c)=="keypress"){
_15d._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _15e=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_15e||evt.ctrlKey){
var c=_15e?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _15d;
},remove:function(node,_15f,_160){
if(node){
if(_160._stealthKeyDownHandle){
del._remove(node,"keydown",_160._stealthKeyDownHandle);
}
del._remove(node,_15f,_160);
}
},_fixEvent:function(evt,_161){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_162){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_162,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_162,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE){
dojo.byId=function(id,doc){
if(typeof id!="string"){
return id;
}
var _163=doc||dojo.doc,te=_163.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_163.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dojo.byId=function(id,doc){
return ((typeof id=="string")?(doc||dojo.doc).getElementById(id):id)||null;
};
}
(function(){
var d=dojo;
var byId=d.byId;
var _164=null,_165;
d.addOnWindowUnload(function(){
_164=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=byId(node);
try{
var doc=node.ownerDocument;
if(!_164||_165!=doc){
_164=doc.createElement("div");
_165=doc;
}
_164.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_164.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_166){
try{
node=byId(node);
_166=byId(_166);
while(node){
if(node==_166){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_167){
node=byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_167?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_167?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_167?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _168=function(node,ref){
var _169=ref.parentNode;
if(_169){
_169.insertBefore(node,ref);
}
};
var _16a=function(node,ref){
var _16b=ref.parentNode;
if(_16b){
if(_16b.lastChild==ref){
_16b.appendChild(node);
}else{
_16b.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_16c,_16d){
_16c=byId(_16c);
if(typeof node=="string"){
node=/^\s*</.test(node)?d._toDom(node,_16c.ownerDocument):byId(node);
}
if(typeof _16d=="number"){
var cn=_16c.childNodes;
if(!cn.length||cn.length<=_16d){
_16c.appendChild(node);
}else{
_168(node,cn[_16d<0?0:_16d]);
}
}else{
switch(_16d){
case "before":
_168(node,_16c);
break;
case "after":
_16a(node,_16c);
break;
case "replace":
_16c.parentNode.replaceChild(node,_16c);
break;
case "only":
d.empty(_16c);
_16c.appendChild(node);
break;
case "first":
if(_16c.firstChild){
_168(node,_16c.firstChild);
break;
}
default:
_16c.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_16e,_16f){
return parseFloat(_16f)||0;
};
}else{
d._toPixelValue=function(_170,_171){
if(!_171){
return 0;
}
if(_171=="medium"){
return 4;
}
if(_171.slice&&_171.slice(-2)=="px"){
return parseFloat(_171);
}
with(_170){
var _172=style.left;
var _173=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_171;
_171=style.pixelLeft;
}
catch(e){
_171=0;
}
style.left=_172;
runtimeStyle.left=_173;
}
return _171;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE<9?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE<9?function(node,_174){
var ov=_174*100,_175=_174==1;
node.style.zoom=_175?"":1;
if(!af(node)){
if(_175){
return _174;
}
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
af(node,1).Enabled=!_175;
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_174);
});
}
return _174;
}:function(node,_176){
return node.style.opacity=_176;
};
var _177={left:true,top:true};
var _178=/margin|padding|width|height|max|min|offset/;
var _179=function(node,type,_17a){
type=type.toLowerCase();
if(d.isIE){
if(_17a=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_17a){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _177)){
_177[type]=_178.test(type);
}
return _177[type]?px(node,_17a):_17a;
};
var _17b=d.isIE?"styleFloat":"cssFloat",_17c={"cssFloat":_17b,"styleFloat":_17b,"float":_17b};
dojo.style=function(node,_17d,_17e){
var n=byId(node),args=arguments.length,op=(_17d=="opacity");
_17d=_17c[_17d]||_17d;
if(args==3){
return op?d._setOpacity(n,_17e):n.style[_17d]=_17e;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&typeof _17d!="string"){
for(var x in _17d){
d.style(node,x,_17d[x]);
}
return s;
}
return (args==1)?s:_179(n,_17d,s[_17d]||n.style[_17d]);
};
dojo._getPadExtents=function(n,_17f){
var s=_17f||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_180){
var ne="none",s=_180||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_181){
var s=_181||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_182){
var s=_182||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_183){
var s=_183||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getMarginSize=function(node,_184){
node=byId(node);
var me=d._getMarginExtents(node,_184||gcs(node));
var size=node.getBoundingClientRect();
return {w:(size.right-size.left)+me.w,h:(size.bottom-size.top)+me.h};
};
dojo._getContentBox=function(node,_185){
var s=_185||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_186){
var s=_186||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_187,_188,_189){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_189);
if(_187>=0){
_187+=pb.w;
}
if(_188>=0){
_188+=pb.h;
}
}
d._setBox(node,NaN,NaN,_187,_188);
};
dojo._setMarginBox=function(node,_18a,_18b,_18c,_18d,_18e){
var s=_18e||gcs(node),bb=d._usesBorderBox(node),pb=bb?_18f:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_18c>=0&&!ns.width){
ns.width="4px";
}
if(_18d>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_18c>=0){
_18c=Math.max(_18c-pb.w-mb.w,0);
}
if(_18d>=0){
_18d=Math.max(_18d-pb.h-mb.h,0);
}
d._setBox(node,_18a,_18b,_18c,_18d);
};
var _18f={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _190=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_191=0,_192=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_191+=val-0;
if(node==_192){
break;
}
}
node=node.parentNode;
}
return _191;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(n.scrollLeft||0),y:n.scrollTop||0});
};
dojo._isBodyLtr=function(){
return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<8){
var r=de.getBoundingClientRect();
var l=r.left,t=r.top;
if(d.isIE<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
dojo._fixIeBiDiScrollLeft=function(_193){
var ie=d.isIE;
if(ie&&!d._isBodyLtr()){
var qk=d.isQuirks,de=qk?d.doc.body:d.doc.documentElement;
if(ie==6&&!qk&&d.global.frameElement&&de.scrollHeight>de.clientHeight){
_193+=de.clientLeft;
}
return (ie<8||qk)?(_193+de.clientWidth-de.scrollWidth):-_193;
}
return _193;
};
dojo._abs=dojo.position=function(node,_194){
node=byId(node);
var db=d.body(),dh=db.parentNode,ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _195=d._getIeDocumentElementOffset();
ret.x-=_195.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_195.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
if(_194){
var _196=d._docScroll();
ret.x+=_196.x;
ret.y+=_196.y;
}
return ret;
};
dojo.coords=function(node,_197){
var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_197);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _198={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_199={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_19a={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _19b=function(name){
return _199[name.toLowerCase()]||name;
};
var _19c=function(node,name){
var attr=node.getAttributeNode&&node.getAttributeNode(name);
return attr&&attr.specified;
};
dojo.hasAttr=function(node,name){
var lc=name.toLowerCase();
return _19a[_198[lc]||name]||_19c(byId(node),_199[lc]||name);
};
var _19d={},_19e=0,_19f=dojo._scopeName+"attrid",_1a0={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_1a1){
node=byId(node);
var args=arguments.length,prop;
if(args==2&&typeof name!="string"){
for(var x in name){
d.attr(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_1a2=_198[lc]||name,_1a3=_19a[_1a2],_1a4=_199[lc]||name;
if(args==3){
do{
if(_1a2=="style"&&typeof _1a1!="string"){
d.style(node,_1a1);
break;
}
if(_1a2=="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _1a0){
d.empty(node);
node.appendChild(d._toDom(_1a1,node.ownerDocument));
}else{
node[_1a2]=_1a1;
}
break;
}
if(d.isFunction(_1a1)){
var _1a5=d.attr(node,_19f);
if(!_1a5){
_1a5=_19e++;
d.attr(node,_19f,_1a5);
}
if(!_19d[_1a5]){
_19d[_1a5]={};
}
var h=_19d[_1a5][_1a2];
if(h){
d.disconnect(h);
}else{
try{
delete node[_1a2];
}
catch(e){
}
}
_19d[_1a5][_1a2]=d.connect(node,_1a2,_1a1);
break;
}
if(_1a3||typeof _1a1=="boolean"){
node[_1a2]=_1a1;
break;
}
node.setAttribute(_1a4,_1a1);
}while(false);
return node;
}
_1a1=node[_1a2];
if(_1a3&&typeof _1a1!="undefined"){
return _1a1;
}
if(_1a2!="href"&&(typeof _1a1=="boolean"||d.isFunction(_1a1))){
return _1a1;
}
return _19c(node,_1a4)?node.getAttribute(_1a4):null;
};
dojo.removeAttr=function(node,name){
byId(node).removeAttribute(_19b(name));
};
dojo.getNodeProp=function(node,name){
node=byId(node);
var lc=name.toLowerCase(),_1a6=_198[lc]||name;
if((_1a6 in node)&&_1a6!="href"){
return node[_1a6];
}
var _1a7=_199[lc]||name;
return _19c(node,_1a7)?node.getAttribute(_1a7):null;
};
dojo.create=function(tag,_1a8,_1a9,pos){
var doc=d.doc;
if(_1a9){
_1a9=byId(_1a9);
doc=_1a9.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_1a8){
d.attr(tag,_1a8);
}
if(_1a9){
d.place(tag,_1a9,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
byId(node).innerHTML="";
};
var _1aa={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1ab=/<\s*([\w\:]+)/,_1ac={},_1ad=0,_1ae="__"+d._scopeName+"ToDomId";
for(var _1af in _1aa){
if(_1aa.hasOwnProperty(_1af)){
var tw=_1aa[_1af];
tw.pre=_1af=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _1b0=doc[_1ae];
if(!_1b0){
doc[_1ae]=_1b0=++_1ad+"";
_1ac[_1b0]=doc.createElement("div");
}
frag+="";
var _1b1=frag.match(_1ab),tag=_1b1?_1b1[1].toLowerCase():"",_1b2=_1ac[_1b0],wrap,i,fc,df;
if(_1b1&&_1aa[tag]){
wrap=_1aa[tag];
_1b2.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_1b2=_1b2.firstChild;
}
}else{
_1b2.innerHTML=frag;
}
if(_1b2.childNodes.length==1){
return _1b2.removeChild(_1b2.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_1b2.firstChild){
df.appendChild(fc);
}
return df;
};
var _1b3="className";
dojo.hasClass=function(node,_1b4){
return ((" "+byId(node)[_1b3]+" ").indexOf(" "+_1b4+" ")>=0);
};
var _1b5=/\s+/,a1=[""],_1b6={},_1b7=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_1b5);
}
}
return s||"";
};
dojo.addClass=function(node,_1b8){
node=byId(node);
_1b8=_1b7(_1b8);
var cls=node[_1b3],_1b9;
cls=cls?" "+cls+" ":" ";
_1b9=cls.length;
for(var i=0,len=_1b8.length,c;i<len;++i){
c=_1b8[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_1b9<cls.length){
node[_1b3]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(node,_1ba){
node=byId(node);
var cls;
if(_1ba!==undefined){
_1ba=_1b7(_1ba);
cls=" "+node[_1b3]+" ";
for(var i=0,len=_1ba.length;i<len;++i){
cls=cls.replace(" "+_1ba[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(node[_1b3]!=cls){
node[_1b3]=cls;
}
};
dojo.replaceClass=function(node,_1bb,_1bc){
node=byId(node);
_1b6.className=node.className;
dojo.removeClass(_1b6,_1bc);
dojo.addClass(_1b6,_1bb);
if(node.className!==_1b6.className){
node.className=_1b6.className;
}
};
dojo.toggleClass=function(node,_1bd,_1be){
if(_1be===undefined){
_1be=!d.hasClass(node,_1bd);
}
d[_1be?"addClass":"removeClass"](node,_1bd);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a,_1bf,_1c0){
if(!a.sort){
a=aps.call(a,0);
}
var ctor=_1c0||this._NodeListCtor||d._NodeListCtor;
a.constructor=ctor;
dojo._mixin(a,ctor.prototype);
a._NodeListCtor=ctor;
return _1bf?a._stash(_1bf):a;
};
var _1c1=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _1c2=function(f,o){
return function(){
this.forEach(_1c1(f,arguments,o));
return this;
};
};
var _1c3=function(f,o){
return function(){
return this.map(_1c1(f,arguments,o));
};
};
var _1c4=function(f,o){
return function(){
return this.filter(_1c1(f,arguments,o));
};
};
var _1c5=function(f,g,o){
return function(){
var a=arguments,body=_1c1(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _1c6=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _1c7=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
d._NodeListCtor=d.NodeList;
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=nlp._wrap=tnl;
nl._adaptAsMap=_1c3;
nl._adaptAsForEach=_1c2;
nl._adaptAsFilter=_1c4;
nl._adaptWithCondition=_1c5;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return this._wrap(f.apply(this,arguments),name=="slice"?this:null);
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_1c5(d[name],_1c6);
});
d.forEach(["connect","addClass","removeClass","replaceClass","toggleClass","empty","removeAttr"],function(name){
nlp[name]=_1c2(d[name]);
});
dojo.extend(dojo.NodeList,{_normalize:function(_1c8,_1c9){
var _1ca=_1c8.parse===true?true:false;
if(typeof _1c8.template=="string"){
var _1cb=_1c8.templateFunc||(dojo.string&&dojo.string.substitute);
_1c8=_1cb?_1cb(_1c8.template,_1c8):_1c8;
}
var type=(typeof _1c8);
if(type=="string"||type=="number"){
_1c8=dojo._toDom(_1c8,(_1c9&&_1c9.ownerDocument));
if(_1c8.nodeType==11){
_1c8=dojo._toArray(_1c8.childNodes);
}else{
_1c8=[_1c8];
}
}else{
if(!dojo.isArrayLike(_1c8)){
_1c8=[_1c8];
}else{
if(!dojo.isArray(_1c8)){
_1c8=dojo._toArray(_1c8);
}
}
}
if(_1ca){
_1c8._runParse=true;
}
return _1c8;
},_cloneNode:function(node){
return node.cloneNode(true);
},_place:function(ary,_1cc,_1cd,_1ce){
if(_1cc.nodeType!=1&&_1cd=="only"){
return;
}
var _1cf=_1cc,_1d0;
var _1d1=ary.length;
for(var i=_1d1-1;i>=0;i--){
var node=(_1ce?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&dojo.parser&&dojo.parser.parse){
if(!_1d0){
_1d0=_1cf.ownerDocument.createElement("div");
}
_1d0.appendChild(node);
dojo.parser.parse(_1d0);
node=_1d0.firstChild;
while(_1d0.firstChild){
_1d0.removeChild(_1d0.firstChild);
}
}
if(i==_1d1-1){
dojo.place(node,_1cf,_1cd);
}else{
_1cf.parentNode.insertBefore(node,_1cf);
}
_1cf=node;
}
},_stash:function(_1d2){
this._parent=_1d2;
return this;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor();
}
},concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;
});
return this._wrap(apc.apply(t,m),this);
},map:function(func,obj){
return this._wrap(d.map(this,func,obj),this);
},forEach:function(_1d3,_1d4){
d.forEach(this,_1d3,_1d4);
return this;
},coords:_1c3(d.coords),position:_1c3(d.position),place:function(_1d5,_1d6){
var item=d.query(_1d5)[0];
return this.forEach(function(node){
d.place(node,item,_1d6);
});
},orphan:function(_1d7){
return (_1d7?d._filterQueryResult(this,_1d7):this).forEach(_1c7);
},adopt:function(_1d8,_1d9){
return d.query(_1d8).place(this[0],_1d9)._stash(this);
},query:function(_1da){
if(!_1da){
return this;
}
var ret=this.map(function(node){
return d.query(_1da,node).filter(function(_1db){
return _1db!==undefined;
});
});
return this._wrap(apc.apply([],ret),this);
},filter:function(_1dc){
var a=arguments,_1dd=this,_1de=0;
if(typeof _1dc=="string"){
_1dd=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _1dd._stash(this);
}
_1de=1;
}
return this._wrap(d.filter(_1dd,a[_1de],a[_1de+1]),this);
},addContent:function(_1df,_1e0){
_1df=this._normalize(_1df,this[0]);
for(var i=0,node;(node=this[i]);i++){
this._place(_1df,node,_1e0,i>0);
}
return this;
},instantiate:function(_1e1,_1e2){
var c=d.isFunction(_1e1)?_1e1:d.getObject(_1e1);
_1e2=_1e2||{};
return this.forEach(function(node){
new c(_1e2,node);
});
},at:function(){
var t=new this._NodeListCtor();
d.forEach(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
d.forEach(nl.events,function(evt){
var _1e3="on"+evt;
nlp[_1e3]=function(a,b){
return this.connect(_1e3,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
(function(){
var _1e4=function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=(d._NodeListCtor=d.NodeList);
var _1e5=function(){
return d.doc;
};
var _1e6=((d.isWebKit||d.isMozilla)&&((_1e5().compatMode)=="BackCompat"));
var _1e7=!!_1e5().firstChild["children"]?"children":"childNodes";
var _1e8=">~+";
var _1e9=false;
var _1ea=function(){
return true;
};
var _1eb=function(_1ec){
if(_1e8.indexOf(_1ec.slice(-1))>=0){
_1ec+=" * ";
}else{
_1ec+=" ";
}
var ts=function(s,e){
return trim(_1ec.slice(s,e));
};
var _1ed=[];
var _1ee=-1,_1ef=-1,_1f0=-1,_1f1=-1,_1f2=-1,inId=-1,_1f3=-1,lc="",cc="",_1f4;
var x=0,ql=_1ec.length,_1f5=null,_1f6=null;
var _1f7=function(){
if(_1f3>=0){
var tv=(_1f3==x)?null:ts(_1f3,x);
_1f5[(_1e8.indexOf(tv)<0)?"tag":"oper"]=tv;
_1f3=-1;
}
};
var _1f8=function(){
if(inId>=0){
_1f5.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _1f9=function(){
if(_1f2>=0){
_1f5.classes.push(ts(_1f2+1,x).replace(/\\/g,""));
_1f2=-1;
}
};
var _1fa=function(){
_1f8();
_1f7();
_1f9();
};
var _1fb=function(){
_1fa();
if(_1f1>=0){
_1f5.pseudos.push({name:ts(_1f1+1,x)});
}
_1f5.loops=(_1f5.pseudos.length||_1f5.attrs.length||_1f5.classes.length);
_1f5.oquery=_1f5.query=ts(_1f4,x);
_1f5.otag=_1f5.tag=(_1f5["oper"])?null:(_1f5.tag||"*");
if(_1f5.tag){
_1f5.tag=_1f5.tag.toUpperCase();
}
if(_1ed.length&&(_1ed[_1ed.length-1].oper)){
_1f5.infixOper=_1ed.pop();
_1f5.query=_1f5.infixOper.query+" "+_1f5.query;
}
_1ed.push(_1f5);
_1f5=null;
};
for(;lc=cc,cc=_1ec.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_1f5){
_1f4=x;
_1f5={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_1e9)?this.otag:this.tag;
}};
_1f3=x;
}
if(_1ee>=0){
if(cc=="]"){
if(!_1f6.attr){
_1f6.attr=ts(_1ee+1,x);
}else{
_1f6.matchFor=ts((_1f0||_1ee+1),x);
}
var cmf=_1f6.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1f6.matchFor=cmf.slice(1,-1);
}
}
_1f5.attrs.push(_1f6);
_1f6=null;
_1ee=_1f0=-1;
}else{
if(cc=="="){
var _1fc=("|~^$*".indexOf(lc)>=0)?lc:"";
_1f6.type=_1fc+cc;
_1f6.attr=ts(_1ee+1,x-_1fc.length);
_1f0=x+1;
}
}
}else{
if(_1ef>=0){
if(cc==")"){
if(_1f1>=0){
_1f6.value=ts(_1ef+1,x);
}
_1f1=_1ef=-1;
}
}else{
if(cc=="#"){
_1fa();
inId=x+1;
}else{
if(cc=="."){
_1fa();
_1f2=x;
}else{
if(cc==":"){
_1fa();
_1f1=x;
}else{
if(cc=="["){
_1fa();
_1ee=x;
_1f6={};
}else{
if(cc=="("){
if(_1f1>=0){
_1f6={name:ts(_1f1+1,x),value:null};
_1f5.pseudos.push(_1f6);
}
_1ef=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1fb();
}
}
}
}
}
}
}
}
}
return _1ed;
};
var _1fd=function(_1fe,_1ff){
if(!_1fe){
return _1ff;
}
if(!_1ff){
return _1fe;
}
return function(){
return _1fe.apply(window,arguments)&&_1ff.apply(window,arguments);
};
};
var _200=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _201=function(n){
return (1==n.nodeType);
};
var _202="";
var _203=function(elem,attr){
if(!elem){
return _202;
}
if(attr=="class"){
return elem.className||_202;
}
if(attr=="for"){
return elem.htmlFor||_202;
}
if(attr=="style"){
return elem.style.cssText||_202;
}
return (_1e9?elem.getAttribute(attr):elem.getAttribute(attr,2))||_202;
};
var _204={"*=":function(attr,_205){
return function(elem){
return (_203(elem,attr).indexOf(_205)>=0);
};
},"^=":function(attr,_206){
return function(elem){
return (_203(elem,attr).indexOf(_206)==0);
};
},"$=":function(attr,_207){
var tval=" "+_207;
return function(elem){
var ea=" "+_203(elem,attr);
return (ea.lastIndexOf(_207)==(ea.length-_207.length));
};
},"~=":function(attr,_208){
var tval=" "+_208+" ";
return function(elem){
var ea=" "+_203(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_209){
var _20a=" "+_209+"-";
return function(elem){
var ea=" "+_203(elem,attr);
return ((ea==_209)||(ea.indexOf(_20a)==0));
};
},"=":function(attr,_20b){
return function(elem){
return (_203(elem,attr)==_20b);
};
}};
var _20c=(typeof _1e5().firstChild.nextElementSibling=="undefined");
var _20d=!_20c?"nextElementSibling":"nextSibling";
var _20e=!_20c?"previousElementSibling":"previousSibling";
var _20f=(_20c?_201:_1ea);
var _210=function(node){
while(node=node[_20e]){
if(_20f(node)){
return false;
}
}
return true;
};
var _211=function(node){
while(node=node[_20d]){
if(_20f(node)){
return false;
}
}
return true;
};
var _212=function(node){
var root=node.parentNode;
var i=0,tret=root[_1e7],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_20d]){
if(_20f(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _213=function(elem){
return !((_212(elem))%2);
};
var _214=function(elem){
return ((_212(elem))%2);
};
var _215={"checked":function(name,_216){
return function(elem){
return !!("checked" in elem?elem.checked:elem.selected);
};
},"first-child":function(){
return _210;
},"last-child":function(){
return _211;
},"only-child":function(name,_217){
return function(node){
if(!_210(node)){
return false;
}
if(!_211(node)){
return false;
}
return true;
};
},"empty":function(name,_218){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_219){
var cz=_219.charAt(0);
if(cz=="\""||cz=="'"){
_219=_219.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_219)>=0);
};
},"not":function(name,_21a){
var p=_1eb(_21a)[0];
var _21b={el:1};
if(p.tag!="*"){
_21b.tag=1;
}
if(!p.classes.length){
_21b.classes=1;
}
var ntf=_21c(p,_21b);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_21d){
var pi=parseInt;
if(_21d=="odd"){
return _214;
}else{
if(_21d=="even"){
return _213;
}
}
if(_21d.indexOf("n")!=-1){
var _21e=_21d.split("n",2);
var pred=_21e[0]?((_21e[0]=="-")?-1:pi(_21e[0])):1;
var idx=_21e[1]?pi(_21e[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_212(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_21d=idx;
}
}
var _21f=pi(_21d);
return function(elem){
return (_212(elem)==_21f);
};
}};
var _220=(d.isIE<9||(dojo.isIE&&dojo.isQuirks))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_1e9?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _21c=function(_221,_222){
if(!_221){
return _1ea;
}
_222=_222||{};
var ff=null;
if(!("el" in _222)){
ff=_1fd(ff,_201);
}
if(!("tag" in _222)){
if(_221.tag!="*"){
ff=_1fd(ff,function(elem){
return (elem&&(elem.tagName==_221.getTag()));
});
}
}
if(!("classes" in _222)){
each(_221.classes,function(_223,idx,arr){
var re=new RegExp("(?:^|\\s)"+_223+"(?:\\s|$)");
ff=_1fd(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _222)){
each(_221.pseudos,function(_224){
var pn=_224.name;
if(_215[pn]){
ff=_1fd(ff,_215[pn](pn,_224.value));
}
});
}
if(!("attrs" in _222)){
each(_221.attrs,function(attr){
var _225;
var a=attr.attr;
if(attr.type&&_204[attr.type]){
_225=_204[attr.type](a,attr.matchFor);
}else{
if(a.length){
_225=_220(a);
}
}
if(_225){
ff=_1fd(ff,_225);
}
});
}
if(!("id" in _222)){
if(_221.id){
ff=_1fd(ff,function(elem){
return (!!elem&&(elem.id==_221.id));
});
}
}
if(!ff){
if(!("default" in _222)){
ff=_1ea;
}
}
return ff;
};
var _226=function(_227){
return function(node,ret,bag){
while(node=node[_20d]){
if(_20c&&(!_201(node))){
continue;
}
if((!bag||_228(node,bag))&&_227(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _229=function(_22a){
return function(root,ret,bag){
var te=root[_20d];
while(te){
if(_20f(te)){
if(bag&&!_228(te,bag)){
break;
}
if(_22a(te)){
ret.push(te);
}
}
te=te[_20d];
}
return ret;
};
};
var _22b=function(_22c){
_22c=_22c||_1ea;
return function(root,ret,bag){
var te,x=0,tret=root[_1e7];
while(te=tret[x++]){
if(_20f(te)&&(!bag||_228(te,bag))&&(_22c(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _22d=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _22e={};
var _22f=function(_230){
var _231=_22e[_230.query];
if(_231){
return _231;
}
var io=_230.infixOper;
var oper=(io?io.oper:"");
var _232=_21c(_230,{el:1});
var qt=_230.tag;
var _233=("*"==qt);
var ecs=_1e5()["getElementsByClassName"];
if(!oper){
if(_230.id){
_232=(!_230.loops&&_233)?_1ea:_21c(_230,{el:1,id:1});
_231=function(root,arr){
var te=d.byId(_230.id,(root.ownerDocument||root));
if(!te||!_232(te)){
return;
}
if(9==root.nodeType){
return _200(te,arr);
}else{
if(_22d(te,root)){
return _200(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_230.classes.length&&!_1e6){
_232=_21c(_230,{el:1,classes:1,id:1});
var _234=_230.classes.join(" ");
_231=function(root,arr,bag){
var ret=_200(0,arr),te,x=0;
var tret=root.getElementsByClassName(_234);
while((te=tret[x++])){
if(_232(te,root)&&_228(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_233&&!_230.loops){
_231=function(root,arr,bag){
var ret=_200(0,arr),te,x=0;
var tret=root.getElementsByTagName(_230.getTag());
while((te=tret[x++])){
if(_228(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_232=_21c(_230,{el:1,tag:1,id:1});
_231=function(root,arr,bag){
var ret=_200(0,arr),te,x=0;
var tret=root.getElementsByTagName(_230.getTag());
while((te=tret[x++])){
if(_232(te,root)&&_228(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _235={el:1};
if(_233){
_235.tag=1;
}
_232=_21c(_230,_235);
if("+"==oper){
_231=_226(_232);
}else{
if("~"==oper){
_231=_229(_232);
}else{
if(">"==oper){
_231=_22b(_232);
}
}
}
}
return _22e[_230.query]=_231;
};
var _236=function(root,_237){
var _238=_200(root),qp,x,te,qpl=_237.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_237[i];
x=_238.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_22f(qp);
for(var j=0;(te=_238[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_238=ret;
}
return ret;
};
var _239={},_23a={};
var _23b=function(_23c){
var _23d=_1eb(trim(_23c));
if(_23d.length==1){
var tef=_22f(_23d[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _236(root,_23d);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _23e=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _23f=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _240=(!!_1e5()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_23e));
var _241=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _242=function(_243,pre,ch,post){
return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_243;
};
var _244=function(_245,_246){
_245=_245.replace(_241,_242);
if(_240){
var _247=_23a[_245];
if(_247&&!_246){
return _247;
}
}
var _248=_239[_245];
if(_248){
return _248;
}
var qcz=_245.charAt(0);
var _249=(-1==_245.indexOf(" "));
if((_245.indexOf("#")>=0)&&(_249)){
_246=true;
}
var _24a=(_240&&(!_246)&&(_1e8.indexOf(qcz)==-1)&&(!d.isIE||(_245.indexOf(":")==-1))&&(!(_1e6&&(_245.indexOf(".")>=0)))&&(_245.indexOf(":contains")==-1)&&(_245.indexOf(":checked")==-1)&&(_245.indexOf("|=")==-1));
if(_24a){
var tq=(_1e8.indexOf(_245.charAt(_245.length-1))>=0)?(_245+" *"):_245;
return _23a[_245]=function(root){
try{
if(!((9==root.nodeType)||_249)){
throw "";
}
var r=root[qsa](tq);
r[_23f]=true;
return r;
}
catch(e){
return _244(_245,true)(root);
}
};
}else{
var _24b=_245.split(/\s*,\s*/);
return _239[_245]=((_24b.length<2)?_23b(_245):function(root){
var _24c=0,ret=[],tp;
while((tp=_24b[_24c++])){
ret=ret.concat(_23b(tp)(root));
}
return ret;
});
}
};
var _24d=0;
var _24e=d.isIE?function(node){
if(_1e9){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_24d)||_24d);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_24d));
};
var _228=function(node,bag){
if(!bag){
return 1;
}
var id=_24e(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _24f="_zipIdx";
var _250=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_24d++;
if(d.isIE&&_1e9){
var _251=_24d+"";
arr[0].setAttribute(_24f,_251);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_24f)!=_251){
ret.push(te);
}
te.setAttribute(_24f,_251);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_201(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_24f]=_24d;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_24f]!=_24d){
ret.push(te);
}
te[_24f]=_24d;
}
}
}
return ret;
};
d.query=function(_252,root){
qlc=d._NodeListCtor;
if(!_252){
return new qlc();
}
if(_252.constructor==qlc){
return _252;
}
if(typeof _252!="string"){
return new qlc(_252);
}
if(typeof root=="string"){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_1e5();
var od=root.ownerDocument||root.documentElement;
_1e9=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_244(_252)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _250(r);
};
d.query.pseudos=_215;
d._filterQueryResult=function(_253,_254,root){
var _255=new d._NodeListCtor(),_256=_1eb(_254),_257=(_256.length==1&&!/[^\w#\.]/.test(_254))?_21c(_256[0]):function(node){
return dojo.query(_254,root).indexOf(node)!=-1;
};
for(var x=0,te;te=_253[x];x++){
if(_257(te)){
_255.push(te);
}
}
return _255;
};
};
var _258=function(){
acme={trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
},forEach:function(arr,_259,_25a){
if(!arr||!arr.length){
return;
}
for(var i=0,l=arr.length;i<l;++i){
_259.call(_25a||window,arr[i],i,arr);
}
},byId:function(id,doc){
if(typeof id=="string"){
return (doc||document).getElementById(id);
}else{
return id;
}
},doc:document,NodeList:Array};
var n=navigator;
var dua=n.userAgent;
var dav=n.appVersion;
var tv=parseFloat(dav);
acme.isOpera=(dua.indexOf("Opera")>=0)?tv:undefined;
acme.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:undefined;
acme.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
acme.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _25b=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_25b&&!acme.isChrome){
acme.isSafari=parseFloat(dav.split("Version/")[1]);
if(!acme.isSafari||parseFloat(dav.substr(_25b+7))<=419.3){
acme.isSafari=2;
}
}
if(document.all&&!acme.isOpera){
acme.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
}
Array._wrap=function(arr){
return arr;
};
return acme;
};
if(this["dojo"]){
dojo.provide("dojo._base.query");
_1e4(this["queryPortability"]||this["acme"]||dojo);
}else{
_1e4(this["queryPortability"]||this["acme"]||_258());
}
})();
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _25c=dojo,cfg=_25c.config;
function _25d(obj,name,_25e){
if(_25e===null){
return;
}
var val=obj[name];
if(typeof val=="string"){
obj[name]=[val,_25e];
}else{
if(_25c.isArray(val)){
val.push(_25e);
}else{
obj[name]=_25e;
}
}
};
dojo.fieldToObject=function(_25f){
var ret=null;
var item=_25c.byId(_25f);
if(item){
var _260=item.name;
var type=(item.type||"").toLowerCase();
if(_260&&type&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
ret=item.value;
}
}else{
if(item.multiple){
ret=[];
_25c.query("option",item).forEach(function(opt){
if(opt.selected){
ret.push(opt.value);
}
});
}else{
ret=item.value;
}
}
}
}
return ret;
};
dojo.formToObject=function(_261){
var ret={};
var _262="file|submit|image|reset|button|";
_25c.forEach(dojo.byId(_261).elements,function(item){
var _263=item.name;
var type=(item.type||"").toLowerCase();
if(_263&&type&&_262.indexOf(type)==-1&&!item.disabled){
_25d(ret,_263,_25c.fieldToObject(item));
if(type=="image"){
ret[_263+".x"]=ret[_263+".y"]=ret[_263].x=ret[_263].y=0;
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _264=[];
var _265={};
for(var name in map){
var _266=map[name];
if(_266!=_265[name]){
var _267=enc(name)+"=";
if(_25c.isArray(_266)){
for(var i=0;i<_266.length;i++){
_264.push(_267+enc(_266[i]));
}
}else{
_264.push(_267+enc(_266));
}
}
}
return _264.join("&");
};
dojo.formToQuery=function(_268){
return _25c.objectToQuery(_25c.formToObject(_268));
};
dojo.formToJson=function(_269,_26a){
return _25c.toJson(_25c.formToObject(_269),_26a);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_25c.forEach(qp,function(item){
if(item.length){
var _26b=item.split("=");
var name=dec(_26b.shift());
var val=dec(_26b.join("="));
if(typeof ret[name]=="string"){
ret[name]=[ret[name]];
}
if(_25c.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
var _26c=_25c._contentHandlers=dojo.contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _25c.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _26d=xhr.responseText;
var _26e=_26d.indexOf("/*");
var _26f=_26d.lastIndexOf("*/");
if(_26e==-1||_26f==-1){
throw new Error("JSON was not comment filtered");
}
return _25c.fromJson(_26d.substring(_26e+2,_26f));
},javascript:function(xhr){
return _25c.eval(xhr.responseText);
},xml:function(xhr){
var _270=xhr.responseXML;
if(_25c.isIE&&(!_270||!_270.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_25c.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_270=dom;
}
catch(e){
return false;
}
return true;
});
}
return _270;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _26c["json-comment-filtered"](xhr);
}else{
return _26c["json"](xhr);
}
}};
dojo._ioSetArgs=function(args,_271,_272,_273){
var _274={args:args,url:args.url};
var _275=null;
if(args.form){
var form=_25c.byId(args.form);
var _276=form.getAttributeNode("action");
_274.url=_274.url||(_276?_276.value:null);
_275=_25c.formToObject(form);
}
var _277=[{}];
if(_275){
_277.push(_275);
}
if(args.content){
_277.push(args.content);
}
if(args.preventCache){
_277.push({"dojo.preventCache":new Date().valueOf()});
}
_274.query=_25c.objectToQuery(_25c.mixin.apply(null,_277));
_274.handleAs=args.handleAs||"text";
var d=new _25c.Deferred(_271);
d.addCallbacks(_272,function(_278){
return _273(_278,d);
});
var ld=args.load;
if(ld&&_25c.isFunction(ld)){
d.addCallback(function(_279){
return ld.call(args,_279,_274);
});
}
var err=args.error;
if(err&&_25c.isFunction(err)){
d.addErrback(function(_27a){
return err.call(args,_27a,_274);
});
}
var _27b=args.handle;
if(_27b&&_25c.isFunction(_27b)){
d.addBoth(function(_27c){
return _27b.call(args,_27c,_274);
});
}
if(cfg.ioPublish&&_25c.publish&&_274.args.ioPublish!==false){
d.addCallbacks(function(res){
_25c.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
_25c.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
_25c.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_274;
return d;
};
var _27d=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _27e=typeof xhr.abort;
if(_27e=="function"||_27e=="object"||_27e=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _27f=function(dfd){
var ret=_26c[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _280=function(_281,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_281);
}
return _281;
};
var _282=null;
var _283=[];
var _284=0;
var _285=function(dfd){
if(_284<=0){
_284=0;
if(cfg.ioPublish&&_25c.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
_25c.publish("/dojo/io/stop");
}
}
};
var _286=function(){
var now=(new Date()).getTime();
if(!_25c._blockAsync){
for(var i=0,tif;i<_283.length&&(tif=_283[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_283.splice(i--,1);
_284-=1;
}else{
if(tif.ioCheck(dfd)){
_283.splice(i--,1);
tif.resHandle(dfd);
_284-=1;
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_283.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
_284-=1;
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
_285(dfd);
if(!_283.length){
clearInterval(_282);
_282=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_25c.forEach(_283,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_25c.isIE){
_25c.addOnWindowUnload(_25c._ioCancelAll);
}
_25c._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&_25c.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_284){
_25c.publish("/dojo/io/start");
}
_284+=1;
_25c.publish("/dojo/io/send",[dfd]);
}
};
_25c._ioWatch=function(dfd,_287,_288,_289){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_283.push({dfd:dfd,validCheck:_287,ioCheck:_288,resHandle:_289});
if(!_282){
_282=setInterval(_286,50);
}
if(args.sync){
_286();
}
};
var _28a="application/x-www-form-urlencoded";
var _28b=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _28c=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _28d=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_25c._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_28e){
if(_28e.query.length){
_28e.url+=(_28e.url.indexOf("?")==-1?"?":"&")+_28e.query;
_28e.query=null;
}
};
dojo.xhr=function(_28f,args,_290){
var dfd=_25c._ioSetArgs(args,_27d,_27f,_280);
var _291=dfd.ioArgs;
var xhr=_291.xhr=_25c._xhrObj(_291.args);
if(!xhr){
dfd.cancel();
return dfd;
}
if("postData" in args){
_291.query=args.postData;
}else{
if("putData" in args){
_291.query=args.putData;
}else{
if("rawBody" in args){
_291.query=args.rawBody;
}else{
if((arguments.length>2&&!_290)||"POST|PUT".indexOf(_28f.toUpperCase())==-1){
_25c._ioAddQueryToUrl(_291);
}
}
}
}
xhr.open(_28f,_291.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
if(args.headers[hdr]){
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_28a);
if(!args.headers||!("X-Requested-With" in args.headers)){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
_25c._ioNotifyStart(dfd);
if(dojo.config.debugAtAllCosts){
xhr.send(_291.query);
}else{
try{
xhr.send(_291.query);
}
catch(e){
_291.error=e;
dfd.cancel();
}
}
_25c._ioWatch(dfd,_28b,_28c,_28d);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _25c.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _25c.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _25c.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _25c.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _292=d._mixin;
dojo._Line=function(_293,end){
this.start=_293;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
dojo.Animation=function(args){
_292(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
};
d._Animation=d.Animation;
d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _294=this._percent,_295=this.easing;
return _295?_295(_294):_294;
},_fire:function(evt,args){
var a=args||[];
if(this[evt]){
if(d.config.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_296,_297){
var _298=this;
if(_298._delayTimer){
_298._clearTimer();
}
if(_297){
_298._stopTimer();
_298._active=_298._paused=false;
_298._percent=0;
}else{
if(_298._active&&!_298._paused){
return _298;
}
}
_298._fire("beforeBegin",[_298.node]);
var de=_296||_298.delay,_299=dojo.hitch(_298,"_play",_297);
if(de>0){
_298._delayTimer=setTimeout(_299,de);
return _298;
}
_299();
return _298;
},_play:function(_29a){
var _29b=this;
if(_29b._delayTimer){
_29b._clearTimer();
}
_29b._startTime=new Date().valueOf();
if(_29b._paused){
_29b._startTime-=_29b.duration*_29b._percent;
}
_29b._active=true;
_29b._paused=false;
var _29c=_29b.curve.getValue(_29b._getStep());
if(!_29b._percent){
if(!_29b._startRepeatCount){
_29b._startRepeatCount=_29b.repeat;
}
_29b._fire("onBegin",[_29c]);
}
_29b._fire("onPlay",[_29c]);
_29b._cycle();
return _29b;
},pause:function(){
var _29d=this;
if(_29d._delayTimer){
_29d._clearTimer();
}
_29d._stopTimer();
if(!_29d._active){
return _29d;
}
_29d._paused=true;
_29d._fire("onPause",[_29d.curve.getValue(_29d._getStep())]);
return _29d;
},gotoPercent:function(_29e,_29f){
var _2a0=this;
_2a0._stopTimer();
_2a0._active=_2a0._paused=true;
_2a0._percent=_29e;
if(_29f){
_2a0.play();
}
return _2a0;
},stop:function(_2a1){
var _2a2=this;
if(_2a2._delayTimer){
_2a2._clearTimer();
}
if(!_2a2._timer){
return _2a2;
}
_2a2._stopTimer();
if(_2a1){
_2a2._percent=1;
}
_2a2._fire("onStop",[_2a2.curve.getValue(_2a2._getStep())]);
_2a2._active=_2a2._paused=false;
return _2a2;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _2a3=this;
if(_2a3._active){
var curr=new Date().valueOf();
var step=(curr-_2a3._startTime)/(_2a3.duration);
if(step>=1){
step=1;
}
_2a3._percent=step;
if(_2a3.easing){
step=_2a3.easing(step);
}
_2a3._fire("onAnimate",[_2a3.curve.getValue(step)]);
if(_2a3._percent<1){
_2a3._startTimer();
}else{
_2a3._active=false;
if(_2a3.repeat>0){
_2a3.repeat--;
_2a3.play(null,true);
}else{
if(_2a3.repeat==-1){
_2a3.play(null,true);
}else{
if(_2a3._startRepeatCount){
_2a3.repeat=_2a3._startRepeatCount;
_2a3._startRepeatCount=0;
}
}
}
_2a3._percent=0;
_2a3._fire("onEnd",[_2a3.node]);
!_2a3.repeat&&_2a3._stopTimer();
}
}
return _2a3;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_2a4=null,_2a5={run:function(){
}};
d.extend(d.Animation,{_startTimer:function(){
if(!this._timer){
this._timer=d.connect(_2a5,"run",this,"_cycle");
ctr++;
}
if(!_2a4){
_2a4=setInterval(d.hitch(_2a5,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_2a4);
_2a4=null;
ctr=0;
}
}});
var _2a6=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _2a7=_292({properties:{}},args),_2a8=(_2a7.properties.opacity={});
_2a8.start=!("start" in _2a7)?function(){
return +d.style(_2a7.node,"opacity")||0;
}:_2a7.start;
_2a8.end=_2a7.end;
var anim=d.animateProperty(_2a7);
d.connect(anim,"beforeBegin",d.partial(_2a6,_2a7.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_292({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_292({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _2a9=function(_2aa){
this._properties=_2aa;
for(var p in _2aa){
var prop=_2aa[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_2a9.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_2ab=prop.start;
if(_2ab instanceof d.Color){
ret[p]=d.blendColors(_2ab,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_2ab)){
ret[p]=((prop.end-_2ab)*r)+_2ab+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
var n=args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
if(d.isFunction(prop)){
prop=prop(n);
}
prop=pm[p]=_292({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start(n);
}
if(d.isFunction(prop.end)){
prop.end=prop.end(n);
}
var _2ac=(p.toLowerCase().indexOf("color")>=0);
function _2ad(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_2ac?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_2ad(n,p);
}else{
if(!("start" in prop)){
prop.start=_2ad(n,p);
}
}
if(_2ac){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _2a9(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_2ae,_2af,_2b0,_2b1,_2b2){
return d.animateProperty({node:node,duration:_2af||d.Animation.prototype.duration,properties:_2ae,easing:_2b0,onEnd:_2b1}).play(_2b2||0);
};
})();
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _2b3=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _2b4=dojo._docScroll();
return {w:_2b3.clientWidth,h:_2b3.clientHeight,l:_2b4.x,t:_2b4.y};
};
dojo.window.get=function(doc){
if(dojo.isIE&&window!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
dojo.window.scrollIntoView=function(node,pos){
try{
node=dojo.byId(node);
var doc=node.ownerDocument||dojo.doc,body=doc.body||dojo.body(),html=doc.documentElement||body.parentNode,isIE=dojo.isIE,isWK=dojo.isWebKit;
if((!(dojo.isMoz||isIE||isWK||dojo.isOpera)||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _2b5=doc.compatMode=="BackCompat",_2b6=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_2b5?body:html),_2b7=isWK?body:_2b6,_2b8=_2b6.clientWidth,_2b9=_2b6.clientHeight,rtl=!dojo._isBodyLtr(),_2ba=pos||dojo.position(node),el=node.parentNode,_2bb=function(el){
return ((isIE<=6||(isIE&&_2b5))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_2bb(node)){
return;
}
while(el){
if(el==body){
el=_2b7;
}
var _2bc=dojo.position(el),_2bd=_2bb(el);
if(el==_2b7){
_2bc.w=_2b8;
_2bc.h=_2b9;
if(_2b7==html&&isIE&&rtl){
_2bc.x+=_2b7.offsetWidth-_2bc.w;
}
if(_2bc.x<0||!isIE){
_2bc.x=0;
}
if(_2bc.y<0||!isIE){
_2bc.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_2bc.w-=pb.w;
_2bc.h-=pb.h;
_2bc.x+=pb.l;
_2bc.y+=pb.t;
var _2be=el.clientWidth,_2bf=_2bc.w-_2be;
if(_2be>0&&_2bf>0){
_2bc.w=_2be;
_2bc.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_2bf:0;
}
_2be=el.clientHeight;
_2bf=_2bc.h-_2be;
if(_2be>0&&_2bf>0){
_2bc.h=_2be;
}
}
if(_2bd){
if(_2bc.y<0){
_2bc.h+=_2bc.y;
_2bc.y=0;
}
if(_2bc.x<0){
_2bc.w+=_2bc.x;
_2bc.x=0;
}
if(_2bc.y+_2bc.h>_2b9){
_2bc.h=_2b9-_2bc.y;
}
if(_2bc.x+_2bc.w>_2b8){
_2bc.w=_2b8-_2bc.x;
}
}
var l=_2ba.x-_2bc.x,t=_2ba.y-Math.max(_2bc.y,0),r=l+_2ba.w-_2bc.w,bot=t+_2ba.h-_2bc.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_2b5)||isIE>=9)){
s=-s;
}
_2ba.x+=el.scrollLeft;
el.scrollLeft+=s;
_2ba.x-=el.scrollLeft;
}
if(bot*t>0){
_2ba.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_2ba.y-=el.scrollTop;
}
el=(el!=_2b7)&&!_2bd&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_2c0){
if(this._hash[_2c0.id]){
throw new Error("Tried to register widget with id=="+_2c0.id+" but that id is already registered");
}
this._hash[_2c0.id]=_2c0;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_2c1){
_2c1=_2c1||dojo.global;
var i=0,id;
for(id in this._hash){
func.call(_2c1,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_2c2,_2c3){
_2c3=_2c3||dojo.global;
var res=new dijit.WidgetSet(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_2c2.call(_2c3,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new dijit.WidgetSet(),id,_2c4;
for(id in this._hash){
_2c4=this._hash[id];
if(_2c4.declaredClass==cls){
res.add(_2c4);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_2c5){
return dojo.map(this.toArray(),func,_2c5);
},every:function(func,_2c6){
_2c6=_2c6||dojo.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_2c6,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_2c7){
_2c7=_2c7||dojo.global;
var x=0,i;
for(i in this._hash){
if(func.call(_2c7,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
(function(){
dijit.registry=new dijit.WidgetSet();
var hash=dijit.registry._hash,attr=dojo.attr,_2c8=dojo.hasAttr,_2c9=dojo.style;
dijit.byId=function(id){
return typeof id=="string"?hash[id]:id;
};
var _2ca={};
dijit.getUniqueId=function(_2cb){
var id;
do{
id=_2cb+"_"+(_2cb in _2ca?++_2ca[_2cb]:_2ca[_2cb]=0);
}while(hash[id]);
return dijit._scopeName=="dijit"?id:dijit._scopeName+"_"+id;
};
dijit.findWidgets=function(root){
var _2cc=[];
function _2cd(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _2ce=node.getAttribute("widgetId");
if(_2ce){
var _2cf=hash[_2ce];
if(_2cf){
_2cc.push(_2cf);
}
}else{
_2cd(node);
}
}
}
};
_2cd(root);
return _2cc;
};
dijit._destroyAll=function(){
dijit._curFocus=null;
dijit._prevFocus=null;
dijit._activeStack=[];
dojo.forEach(dijit.findWidgets(dojo.body()),function(_2d0){
if(!_2d0._destroyed){
if(_2d0.destroyRecursive){
_2d0.destroyRecursive();
}else{
if(_2d0.destroy){
_2d0.destroy();
}
}
}
});
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit._destroyAll();
});
}
dijit.byNode=function(node){
return hash[node.getAttribute("widgetId")];
};
dijit.getEnclosingWidget=function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
};
var _2d1=(dijit._isElementShown=function(elem){
var s=_2c9(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(attr(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _2c8(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _2d2=elem.contentDocument;
if("designMode" in _2d2&&_2d2.designMode=="on"){
return true;
}
body=_2d2.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true");
default:
return elem.contentEditable=="true";
}
};
var _2d3=(dijit.isTabNavigable=function(elem){
if(attr(elem,"disabled")){
return false;
}else{
if(_2c8(elem,"tabIndex")){
return attr(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var _2d4,last,_2d5,_2d6,_2d7,_2d8,_2d9={};
function _2da(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _2db=function(_2dc){
dojo.query("> *",_2dc).forEach(function(_2dd){
if((dojo.isIE&&_2dd.scopeName!=="HTML")||!_2d1(_2dd)){
return;
}
if(_2d3(_2dd)){
var _2de=attr(_2dd,"tabIndex");
if(!_2c8(_2dd,"tabIndex")||_2de==0){
if(!_2d4){
_2d4=_2dd;
}
last=_2dd;
}else{
if(_2de>0){
if(!_2d5||_2de<_2d6){
_2d6=_2de;
_2d5=_2dd;
}
if(!_2d7||_2de>=_2d8){
_2d8=_2de;
_2d7=_2dd;
}
}
}
var rn=_2da(_2dd);
if(dojo.attr(_2dd,"checked")&&rn){
_2d9[rn]=_2dd;
}
}
if(_2dd.nodeName.toUpperCase()!="SELECT"){
_2db(_2dd);
}
});
};
if(_2d1(root)){
_2db(root);
}
function rs(node){
return _2d9[_2da(node)]||node;
};
return {first:rs(_2d4),last:rs(last),lowest:rs(_2d5),highest:rs(_2d7)};
};
dijit.getFirstInTabbingOrder=function(root){
var _2df=dijit._getTabNavigable(dojo.byId(root));
return _2df.lowest?_2df.lowest:_2df.first;
};
dijit.getLastInTabbingOrder=function(root){
var _2e0=dijit._getTabNavigable(dojo.byId(root));
return _2e0.last?_2e0.last:_2e0.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
})();
}
if(!dojo._hasResource["dojo.Stateful"]){
dojo._hasResource["dojo.Stateful"]=true;
dojo.provide("dojo.Stateful");
dojo.declare("dojo.Stateful",null,{postscript:function(_2e1){
if(_2e1){
dojo.mixin(this,_2e1);
}
},get:function(name){
return this[name];
},set:function(name,_2e2){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _2e3=this[name];
this[name]=_2e2;
if(this._watchCallbacks){
this._watchCallbacks(name,_2e3,_2e2);
}
return this;
},watch:function(name,_2e4){
var _2e5=this._watchCallbacks;
if(!_2e5){
var self=this;
_2e5=this._watchCallbacks=function(name,_2e6,_2e7,_2e8){
var _2e9=function(_2ea){
if(_2ea){
_2ea=_2ea.slice();
for(var i=0,l=_2ea.length;i<l;i++){
try{
_2ea[i].call(self,name,_2e6,_2e7);
}
catch(e){
console.error(e);
}
}
}
};
_2e9(_2e5["_"+name]);
if(!_2e8){
_2e9(_2e5["*"]);
}
};
}
if(!_2e4&&typeof name==="function"){
_2e4=name;
name="*";
}else{
name="_"+name;
}
var _2eb=_2e5[name];
if(typeof _2eb!=="object"){
_2eb=_2e5[name]=[];
}
_2eb.push(_2e4);
return {unwatch:function(){
_2eb.splice(dojo.indexOf(_2eb,_2e4),1);
}};
}});
}
if(!dojo._hasResource["dijit._WidgetBase"]){
dojo._hasResource["dijit._WidgetBase"]=true;
dojo.provide("dijit._WidgetBase");
(function(){
dojo.declare("dijit._WidgetBase",dojo.Stateful,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),postscript:function(_2ec,_2ed){
this.create(_2ec,_2ed);
},create:function(_2ee,_2ef){
this.srcNodeRef=dojo.byId(_2ef);
this._connects=[];
this._subscribes=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_2ee){
this.params=_2ee;
dojo._mixin(this,_2ee);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _2f0=this.srcNodeRef;
if(_2f0&&_2f0.parentNode&&this.domNode!==_2f0){
_2f0.parentNode.replaceChild(this.domNode,_2f0);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _2f1=function(attr,_2f2){
if((_2f2.params&&attr in _2f2.params)||_2f2[attr]){
_2f2.set(attr,_2f2[attr]);
}
};
for(var attr in this.attributeMap){
_2f1(attr,this);
}
dojo.forEach(this._getSetterAttributes(),function(a){
if(!(a in this.attributeMap)){
_2f1(a,this);
}
},this);
},_getSetterAttributes:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var r=(ctor._setterAttrs=[]),_2f3,_2f4=ctor.prototype;
for(var _2f5 in _2f4){
if(dojo.isFunction(_2f4[_2f5])&&(_2f3=_2f5.match(/^_set([a-zA-Z]*)Attr$/))&&_2f3[1]){
r.push(_2f3[1].charAt(0).toLowerCase()+_2f3[1].substr(1));
}
}
}
return ctor._setterAttrs;
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||dojo.create("div");
}
if(this.baseClass){
var _2f6=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_2f6=_2f6.concat(dojo.map(_2f6,function(name){
return name+"Rtl";
}));
}
dojo.addClass(this.domNode,_2f6);
}
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_2f7){
this._beingDestroyed=true;
this.destroyDescendants(_2f7);
this.destroy(_2f7);
},destroy:function(_2f8){
this._beingDestroyed=true;
this.uninitialize();
var d=dojo,dfe=d.forEach,dun=d.unsubscribe;
dfe(this._connects,function(_2f9){
dfe(_2f9,d.disconnect);
});
dfe(this._subscribes,function(_2fa){
dun(_2fa);
});
dfe(this._supportingWidgets||[],function(w){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
});
this.destroyRendering(_2f8);
dijit.registry.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2fb){
if(this.bgIframe){
this.bgIframe.destroy(_2fb);
delete this.bgIframe;
}
if(this.domNode){
if(_2fb){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2fb){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2fc){
dojo.forEach(this.getChildren(),function(_2fd){
if(_2fd.destroyRecursive){
_2fd.destroyRecursive(_2fc);
}
});
},uninitialize:function(){
return false;
},_setClassAttr:function(_2fe){
var _2ff=this[this.attributeMap["class"]||"domNode"];
dojo.replaceClass(_2ff,_2fe,this["class"]);
this._set("class",_2fe);
},_setStyleAttr:function(_300){
var _301=this[this.attributeMap.style||"domNode"];
if(dojo.isObject(_300)){
dojo.style(_301,_300);
}else{
if(_301.style.cssText){
_301.style.cssText+="; "+_300;
}else{
_301.style.cssText=_300;
}
}
this._set("style",_300);
},_attrToDom:function(attr,_302){
var _303=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_303)?_303:[_303],function(_304){
var _305=this[_304.node||_304||"domNode"];
var type=_304.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_302)){
_302=dojo.hitch(this,_302);
}
var _306=_304.attribute?_304.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
dojo.attr(_305,_306,_302);
break;
case "innerText":
_305.innerHTML="";
_305.appendChild(dojo.doc.createTextNode(_302));
break;
case "innerHTML":
_305.innerHTML=_302;
break;
case "class":
dojo.replaceClass(_305,_302,this[attr]);
break;
}
},this);
},get:function(name){
var _307=this._getAttrNames(name);
return this[_307.g]?this[_307.g]():this[name];
},set:function(name,_308){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _309=this._getAttrNames(name);
if(this[_309.s]){
var _30a=this[_309.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(name in this.attributeMap){
this._attrToDom(name,_308);
}
this._set(name,_308);
}
return _30a||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_30b){
var _30c=this[name];
this[name]=_30b;
if(this._watchCallbacks&&this._created&&_30b!==_30c){
this._watchCallbacks(name,_30c,_30b);
}
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[];
},getChildren:function(){
return this.containerNode?dijit.findWidgets(this.containerNode):[];
},connect:function(obj,_30d,_30e){
var _30f=[dojo._connect(obj,_30d,this,_30e)];
this._connects.push(_30f);
return _30f;
},disconnect:function(_310){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_310){
dojo.forEach(_310,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},subscribe:function(_311,_312){
var _313=dojo.subscribe(_311,this,_312);
this._subscribes.push(_313);
return _313;
},unsubscribe:function(_314){
for(var i=0;i<this._subscribes.length;i++){
if(this._subscribes[i]==_314){
dojo.unsubscribe(_314);
this._subscribes.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):dojo._isBodyLtr();
},placeAt:function(_315,_316){
if(_315.declaredClass&&_315.addChild){
_315.addChild(this,_316);
}else{
dojo.place(this.domNode,_315,_316);
}
return this;
}});
})();
}
if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return dijit.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=dojo.doc.selection,cf=dijit._curFocus;
if(dojo.global.getSelection){
sel=dojo.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_317){
var _318=dojo.doc,mark=_317.mark;
if(mark){
if(dojo.global.getSelection){
var sel=dojo.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var r=mark;
var n=r.node;
n.selectionStart=r.start;
n.selectionEnd=r.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_318.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(dojo.isArray(mark)){
rg=_318.body.createControlRange();
dojo.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_318.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_319){
var node=!dijit._curFocus||(menu&&dojo.isDescendant(dijit._curFocus,menu.domNode))?dijit._prevFocus:dijit._curFocus;
return {node:node,bookmark:(node==dijit._curFocus)&&dojo.withGlobal(_319||dojo.global,dijit.getBookmark),openedForWindow:_319};
},focus:function(_31a){
if(!_31a){
return;
}
var node="node" in _31a?_31a.node:_31a,_31b=_31a.bookmark,_31c=_31a.openedForWindow,_31d=_31b?_31b.isCollapsed:false;
if(node){
var _31e=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_31e&&_31e.focus){
try{
_31e.focus();
}
catch(e){
}
}
dijit._onFocusNode(node);
}
if(_31b&&dojo.withGlobal(_31c||dojo.global,dijit.isCollapsed)&&!_31d){
if(_31c){
_31c.focus();
}
try{
dojo.withGlobal(_31c||dojo.global,dijit.moveToBookmark,null,[_31b]);
}
catch(e2){
}
}
},_activeStack:[],registerIframe:function(_31f){
return dijit.registerWin(_31f.contentWindow,_31f);
},unregisterIframe:function(_320){
dijit.unregisterWin(_320);
},registerWin:function(_321,_322){
var _323=function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
if(dojo.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
dijit._onTouchNode(_322||evt.target||evt.srcElement,"mouse");
};
var doc=dojo.isIE?_321.document.documentElement:_321.document;
if(doc){
if(dojo.isIE){
_321.document.body.attachEvent("onmousedown",_323);
var _324=function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(evt.srcElement)){
dijit._onFocusNode(_322||evt.srcElement);
}else{
dijit._onTouchNode(_322||evt.srcElement);
}
};
doc.attachEvent("onactivate",_324);
var _325=function(evt){
dijit._onBlurNode(_322||evt.srcElement);
};
doc.attachEvent("ondeactivate",_325);
return function(){
_321.document.detachEvent("onmousedown",_323);
doc.detachEvent("onactivate",_324);
doc.detachEvent("ondeactivate",_325);
doc=null;
};
}else{
doc.body.addEventListener("mousedown",_323,true);
var _326=function(evt){
dijit._onFocusNode(_322||evt.target);
};
doc.addEventListener("focus",_326,true);
var _327=function(evt){
dijit._onBlurNode(_322||evt.target);
};
doc.addEventListener("blur",_327,true);
return function(){
doc.body.removeEventListener("mousedown",_323,true);
doc.removeEventListener("focus",_326,true);
doc.removeEventListener("blur",_327,true);
doc=null;
};
}
}
},unregisterWin:function(_328){
_328&&_328();
},_onBlurNode:function(node){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(node,by){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _329=[];
try{
while(node){
var _32a=dojo.attr(node,"dijitPopupParent");
if(_32a){
node=dijit.byId(_32a).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===dojo.body()){
break;
}
node=dojo.window.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_32b=id&&dijit.byId(id);
if(_32b&&!(by=="mouse"&&_32b.get("disabled"))){
_329.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_329,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
dijit._onTouchNode(node);
if(node==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
},_setStack:function(_32c,by){
var _32d=dijit._activeStack;
dijit._activeStack=_32c;
for(var _32e=0;_32e<Math.min(_32d.length,_32c.length);_32e++){
if(_32d[_32e]!=_32c[_32e]){
break;
}
}
var _32f;
for(var i=_32d.length-1;i>=_32e;i--){
_32f=dijit.byId(_32d[i]);
if(_32f){
_32f._focused=false;
_32f.set("focused",false);
_32f._hasBeenBlurred=true;
if(_32f._onBlur){
_32f._onBlur(by);
}
dojo.publish("widgetBlur",[_32f,by]);
}
}
for(i=_32e;i<_32c.length;i++){
_32f=dijit.byId(_32c[i]);
if(_32f){
_32f._focused=true;
_32f.set("focused",true);
if(_32f._onFocus){
_32f._onFocus(by);
}
dojo.publish("widgetFocus",[_32f,by]);
}
}
}});
dojo.addOnLoad(function(){
var _330=dijit.registerWin(window);
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit.unregisterWin(_330);
_330=null;
});
}
});
}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_331){
this.pairs=[];
this.returnWrappers=_331||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(name,_332,wrap,_333,_334){
this.pairs[((_334)?"unshift":"push")]([name,_332,wrap,_333]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
return dojo.window.getBox();
};
dijit.placeOnScreen=function(node,pos,_335,_336){
var _337=dojo.map(_335,function(_338){
var c={corner:_338,pos:{x:pos.x,y:pos.y}};
if(_336){
c.pos.x+=_338.charAt(1)=="L"?_336.x:-_336.x;
c.pos.y+=_338.charAt(0)=="T"?_336.y:-_336.y;
}
return c;
});
return dijit._place(node,_337);
};
dijit._place=function(node,_339,_33a,_33b){
var view=dojo.window.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(node);
}
var best=null;
dojo.some(_339,function(_33c){
var _33d=_33c.corner;
var pos=_33c.pos;
var _33e=0;
var _33f={w:_33d.charAt(1)=="L"?(view.l+view.w)-pos.x:pos.x-view.l,h:_33d.charAt(1)=="T"?(view.t+view.h)-pos.y:pos.y-view.t};
if(_33a){
var res=_33a(node,_33c.aroundCorner,_33d,_33f,_33b);
_33e=typeof res=="undefined"?0:res;
}
var _340=node.style;
var _341=_340.display;
var _342=_340.visibility;
_340.visibility="hidden";
_340.display="";
var mb=dojo.marginBox(node);
_340.display=_341;
_340.visibility=_342;
var _343=Math.max(view.l,_33d.charAt(1)=="L"?pos.x:(pos.x-mb.w)),_344=Math.max(view.t,_33d.charAt(0)=="T"?pos.y:(pos.y-mb.h)),endX=Math.min(view.l+view.w,_33d.charAt(1)=="L"?(_343+mb.w):pos.x),endY=Math.min(view.t+view.h,_33d.charAt(0)=="T"?(_344+mb.h):pos.y),_345=endX-_343,_346=endY-_344;
_33e+=(mb.w-_345)+(mb.h-_346);
if(best==null||_33e<best.overflow){
best={corner:_33d,aroundCorner:_33c.aroundCorner,x:_343,y:_344,w:_345,h:_346,overflow:_33e,spaceAvailable:_33f};
}
return !_33e;
});
if(best.overflow&&_33a){
_33a(node,best.aroundCorner,best.corner,best.spaceAvailable,_33b);
}
var l=dojo._isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
return best;
};
dijit.placeOnScreenAroundNode=function(node,_347,_348,_349){
_347=dojo.byId(_347);
var _34a=dojo.position(_347,true);
return dijit._placeOnScreenAroundRect(node,_34a.x,_34a.y,_34a.w,_34a.h,_348,_349);
};
dijit.placeOnScreenAroundRectangle=function(node,_34b,_34c,_34d){
return dijit._placeOnScreenAroundRect(node,_34b.x,_34b.y,_34b.width,_34b.height,_34c,_34d);
};
dijit._placeOnScreenAroundRect=function(node,x,y,_34e,_34f,_350,_351){
var _352=[];
for(var _353 in _350){
_352.push({aroundCorner:_353,corner:_350[_353],pos:{x:x+(_353.charAt(1)=="L"?0:_34e),y:y+(_353.charAt(0)=="T"?0:_34f)}});
}
return dijit._place(node,_352,_351,{w:_34e,h:_34f});
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(node,_354,_355,_356){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
dijit.getPopupAroundAlignment=function(_357,_358){
var _359={};
dojo.forEach(_357,function(pos){
switch(pos){
case "after":
_359[_358?"BR":"BL"]=_358?"BL":"BR";
break;
case "before":
_359[_358?"BL":"BR"]=_358?"BR":"BL";
break;
case "below-alt":
_358=!_358;
case "below":
_359[_358?"BL":"BR"]=_358?"TL":"TR";
_359[_358?"BR":"BL"]=_358?"TR":"TL";
break;
case "above-alt":
_358=!_358;
case "above":
default:
_359[_358?"TL":"TR"]=_358?"BL":"BR";
_359[_358?"TR":"TL"]=_358?"BR":"BL";
break;
}
});
return _359;
};
}
if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
return dojo.window.get(doc);
};
}
if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup={_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_35a){
var _35b=_35a.declaredClass?_35a._popupWrapper:(_35a.parentNode&&dojo.hasClass(_35a.parentNode,"dijitPopup")),node=_35a.domNode||_35a;
if(!_35b){
_35b=dojo.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},dojo.body());
_35b.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
if(_35a.declaredClass){
_35a._popupWrapper=_35b;
dojo.connect(_35a,"destroy",function(){
dojo.destroy(_35b);
delete _35a._popupWrapper;
});
}
}
return _35b;
},moveOffScreen:function(_35c){
var _35d=this._createWrapper(_35c);
dojo.style(_35d,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_35e){
var _35f=this._createWrapper(_35e);
dojo.style(_35f,"display","none");
},getTopPopup:function(){
var _360=this._stack;
for(var pi=_360.length-1;pi>0&&_360[pi].parent===_360[pi-1].widget;pi--){
}
return _360[pi];
},open:function(args){
var _361=this._stack,_362=args.popup,_363=args.orient||((args.parent?args.parent.isLeftToRight():dojo._isBodyLtr())?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"}),_364=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_361.length&&(!args.parent||!dojo.isDescendant(args.parent.domNode,_361[_361.length-1].widget.domNode))){
dijit.popup.close(_361[_361.length-1].widget);
}
var _365=this._createWrapper(_362);
dojo.attr(_365,{id:id,style:{zIndex:this._beginZIndex+_361.length},"class":"dijitPopup "+(_362.baseClass||_362["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(dojo.isIE||dojo.isMoz){
if(!_362.bgIframe){
_362.bgIframe=new dijit.BackgroundIframe(_365);
}
}
var best=_364?dijit.placeOnScreenAroundElement(_365,_364,_363,_362.orient?dojo.hitch(_362,"orient"):null):dijit.placeOnScreen(_365,args,_363=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_365.style.display="";
_365.style.visibility="visible";
_362.domNode.style.visibility="visible";
var _366=[];
_366.push(dojo.connect(_365,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&args.onCancel){
dojo.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _367=this.getTopPopup();
if(_367&&_367.onCancel){
_367.onCancel();
}
}
}
}));
if(_362.onCancel){
_366.push(dojo.connect(_362,"onCancel",args.onCancel));
}
_366.push(dojo.connect(_362,_362.onExecute?"onExecute":"onChange",this,function(){
var _368=this.getTopPopup();
if(_368&&_368.onExecute){
_368.onExecute();
}
}));
_361.push({widget:_362,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_366});
if(_362.onOpen){
_362.onOpen(best);
}
return best;
},close:function(_369){
var _36a=this._stack;
while((_369&&dojo.some(_36a,function(elem){
return elem.widget==_369;
}))||(!_369&&_36a.length)){
var top=_36a.pop(),_36b=top.widget,_36c=top.onClose;
if(_36b.onClose){
_36b.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(_36b&&_36b.domNode){
this.hide(_36b);
}
if(_36c){
_36c();
}
}
}};
dijit._frames=new function(){
var _36d=[];
this.pop=function(){
var _36e;
if(_36d.length){
_36e=_36d.pop();
_36e.style.display="";
}else{
if(dojo.isIE<9){
var burl=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_36e=dojo.doc.createElement(html);
}else{
_36e=dojo.create("iframe");
_36e.src="javascript:\"\"";
_36e.className="dijitBackgroundIframe";
dojo.style(_36e,"opacity",0.1);
}
_36e.tabIndex=-1;
dijit.setWaiRole(_36e,"presentation");
}
return _36e;
};
this.push=function(_36f){
_36f.style.display="none";
_36d.push(_36f);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE||dojo.isMoz){
var _370=(this.iframe=dijit._frames.pop());
node.appendChild(_370);
if(dojo.isIE<7||dojo.isQuirks){
this.resize(node);
this._conn=dojo.connect(node,"onresize",this,function(){
this.resize(node);
});
}else{
dojo.style(_370,{width:"100%",height:"100%"});
}
}
};
dojo.extend(dijit.BackgroundIframe,{resize:function(node){
if(this.iframe){
dojo.style(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
dojo.disconnect(this._conn);
this._conn=null;
}
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node,pos){
dojo.window.scrollIntoView(node,pos);
};
}
if(!dojo._hasResource["dojo.uacss"]){
dojo._hasResource["dojo.uacss"]=true;
dojo.provide("dojo.uacss");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_371=d.isOpera,maj=Math.floor,ff=d.isFF,_372=d.boxModel.replace(/-/,""),_373={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_ie8:maj(ie)==8,dj_ie9:maj(ie)==9,dj_quirks:d.isQuirks,dj_iequirks:ie&&d.isQuirks,dj_opera:_371,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla,dj_ff3:maj(ff)==3};
_373["dj_"+_372]=true;
var _374="";
for(var clz in _373){
if(_373[clz]){
_374+=clz+" ";
}
}
html.className=d.trim(html.className+" "+_374);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _375="dj_rtl dijitRtl "+_374.replace(/ /g,"-rtl ");
html.className=d.trim(html.className+" "+_375);
}
});
})();
}
if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
}
if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_376,node,_377,obj,_378,_379,_37a){
if(obj!=this._obj){
this.stop();
this._initialDelay=_379||500;
this._subsequentDelay=_378||0.9;
this._minDelay=_37a||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_376,_377);
this._fireEventAndReload();
this._evt=dojo.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_37b,_37c,_37d,_37e,_37f,_380){
if(_37b.keyCode){
_37b.charOrCode=_37b.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_37b.charCode){
_37b.charOrCode=String.fromCharCode(_37b.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_37b.charOrCode&&(_37b.ctrlKey===undefined||_37b.ctrlKey==evt.ctrlKey)&&(_37b.altKey===undefined||_37b.altKey==evt.altKey)&&(_37b.metaKey===undefined||_37b.metaKey==(evt.metaKey||false))&&(_37b.shiftKey===undefined||_37b.shiftKey==evt.shiftKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_37c,node,_37d,_37b,_37e,_37f,_380);
}else{
if(dijit.typematic._obj==_37b){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_37b){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_381,_382,_383,_384,_385){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_381,node,_382,node,_383,_384,_385);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
evt.preventDefault();
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_381,node,_382,node,_383,_384,_385);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_386,_387,_388,_389,_38a,_38b,_38c,_38d){
return this.addKeyListener(_387,_388,_389,_38a,_38b,_38c,_38d).concat(this.addMouseListener(_386,_389,_38a,_38b,_38c,_38d));
}};
}
if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _38e=cs.backgroundImage;
var _38f=(cs.borderTopColor==cs.borderRightColor)||(_38e!=null&&(_38e=="none"||_38e=="url(invalid-url:)"));
dojo[_38f?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{hasWaiRole:function(elem,role){
var _390=this.getWaiRole(elem);
return role?(_390.indexOf(role)>-1):(_390.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
dojo.attr(elem,"role",role);
},removeWaiRole:function(elem,role){
var _391=dojo.attr(elem,"role");
if(!_391){
return;
}
if(role){
var t=dojo.trim((" "+_391+" ").replace(" "+role+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_392){
return elem.hasAttribute?elem.hasAttribute("aria-"+_392):!!elem.getAttribute("aria-"+_392);
},getWaiState:function(elem,_393){
return elem.getAttribute("aria-"+_393)||"";
},setWaiState:function(elem,_394,_395){
elem.setAttribute("aria-"+_394,_395);
},removeWaiState:function(elem,_396){
elem.removeAttribute("aria-"+_396);
}});
}
if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
}
if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.connect(dojo,"_connect",function(_397,_398){
if(_397&&dojo.isFunction(_397._onConnect)){
_397._onConnect(_398);
}
});
dijit._connectOnUseEventHandler=function(_399){
};
dijit._lastKeyDownNode=null;
if(dojo.isIE){
(function(){
var _39a=function(evt){
dijit._lastKeyDownNode=evt.srcElement;
};
dojo.doc.attachEvent("onkeydown",_39a);
dojo.addOnWindowUnload(function(){
dojo.doc.detachEvent("onkeydown",_39a);
});
})();
}else{
dojo.doc.addEventListener("keydown",function(evt){
dijit._lastKeyDownNode=evt.target;
},true);
}
(function(){
dojo.declare("dijit._Widget",dijit._WidgetBase,{_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,create:function(_39b,_39c){
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
this.inherited(arguments);
if(this.domNode){
for(attr in this.params){
this._onConnect(attr);
}
}
},_onConnect:function(_39d){
if(_39d in this._deferredConnects){
var _39e=this[this._deferredConnects[_39d]||"domNode"];
this.connect(_39e,_39d.toLowerCase(),_39d);
delete this._deferredConnects[_39d];
}
},focused:false,isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},setAttribute:function(attr,_39f){
dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_39f);
},attr:function(name,_3a0){
if(dojo.config.isDebug){
var _3a1=arguments.callee._ach||(arguments.callee._ach={}),_3a2=(arguments.callee.caller||"unknown caller").toString();
if(!_3a1[_3a2]){
dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_3a2,"","2.0");
_3a1[_3a2]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_3a3,_3a4){
var d=dojo,dc=d._connect,_3a5=this.inherited(arguments,[obj,_3a3=="ondijitclick"?"onclick":_3a3,_3a4]);
if(_3a3=="ondijitclick"){
if(d.indexOf(this.nodesWithKeyClick,obj.nodeName.toLowerCase())==-1){
var m=d.hitch(this,_3a4);
_3a5.push(dc(obj,"onkeydown",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=e.target;
if(!("openDropDown" in this&&obj==this._buttonNode)){
e.preventDefault();
}
}
}),dc(obj,"onkeyup",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&e.target==dijit._lastKeyDownNode&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=null;
return m(e);
}
}));
}
}
return _3a5;
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
})();
}
if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_3a6,map,_3a7,_3a8){
_3a8=_3a8||dojo.global;
_3a7=_3a7?dojo.hitch(_3a8,_3a7):function(v){
return v;
};
return _3a6.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3a9,key,_3aa){
var _3ab=dojo.getObject(key,false,map);
if(_3aa){
_3ab=dojo.getObject(_3aa,false,_3a8).call(_3a8,_3ab,key);
}
return _3a7(_3ab,key).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_3ac,_3ad){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _3ae=dojo.date.stamp._isoRegExp.exec(_3ac),_3af=null;
if(_3ae){
_3ae.shift();
if(_3ae[1]){
_3ae[1]--;
}
if(_3ae[6]){
_3ae[6]*=1000;
}
if(_3ad){
_3ad=new Date(_3ad);
dojo.forEach(dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _3ad["get"+prop]();
}),function(_3b0,_3b1){
_3ae[_3b1]=_3ae[_3b1]||_3b0;
});
}
_3af=new Date(_3ae[0]||1970,_3ae[1]||0,_3ae[2]||1,_3ae[3]||0,_3ae[4]||0,_3ae[5]||0,_3ae[6]||0);
if(_3ae[0]<100){
_3af.setFullYear(_3ae[0]||1970);
}
var _3b2=0,_3b3=_3ae[7]&&_3ae[7].charAt(0);
if(_3b3!="Z"){
_3b2=((_3ae[8]||0)*60)+(Number(_3ae[9])||0);
if(_3b3!="-"){
_3b2*=-1;
}
}
if(_3b3){
_3b2-=_3af.getTimezoneOffset();
}
if(_3b2){
_3af.setTime(_3af.getTime()+_3b2*60000);
}
}
return _3af;
};
dojo.date.stamp.toISOString=function(_3b4,_3b5){
var _3b6=function(n){
return (n<10)?"0"+n:n;
};
_3b5=_3b5||{};
var _3b7=[],_3b8=_3b5.zulu?"getUTC":"get",date="";
if(_3b5.selector!="time"){
var year=_3b4[_3b8+"FullYear"]();
date=["0000".substr((year+"").length)+year,_3b6(_3b4[_3b8+"Month"]()+1),_3b6(_3b4[_3b8+"Date"]())].join("-");
}
_3b7.push(date);
if(_3b5.selector!="date"){
var time=[_3b6(_3b4[_3b8+"Hours"]()),_3b6(_3b4[_3b8+"Minutes"]()),_3b6(_3b4[_3b8+"Seconds"]())].join(":");
var _3b9=_3b4[_3b8+"Milliseconds"]();
if(_3b5.milliseconds){
time+="."+(_3b9<100?"0":"")+_3b6(_3b9);
}
if(_3b5.zulu){
time+="Z";
}else{
if(_3b5.selector!="time"){
var _3ba=_3b4.getTimezoneOffset();
var _3bb=Math.abs(_3ba);
time+=(_3ba>0?"-":"+")+_3b6(Math.floor(_3bb/60))+":"+_3b6(_3bb%60);
}
}
_3b7.push(time);
}
return _3b7.join("T");
};
}
if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
new Date("X");
dojo.parser=new function(){
var d=dojo;
function _3bc(_3bd){
if(d.isString(_3bd)){
return "string";
}
if(typeof _3bd=="number"){
return "number";
}
if(typeof _3bd=="boolean"){
return "boolean";
}
if(d.isFunction(_3bd)){
return "function";
}
if(d.isArray(_3bd)){
return "array";
}
if(_3bd instanceof Date){
return "date";
}
if(_3bd instanceof d._Url){
return "url";
}
return "object";
};
function _3be(_3bf,type){
switch(type){
case "string":
return _3bf;
case "number":
return _3bf.length?Number(_3bf):NaN;
case "boolean":
return typeof _3bf=="boolean"?_3bf:!(_3bf.toLowerCase()=="false");
case "function":
if(d.isFunction(_3bf)){
_3bf=_3bf.toString();
_3bf=d.trim(_3bf.substring(_3bf.indexOf("{")+1,_3bf.length-1));
}
try{
if(_3bf===""||_3bf.search(/[^\w\.]+/i)!=-1){
return new Function(_3bf);
}else{
return d.getObject(_3bf,false)||new Function(_3bf);
}
}
catch(e){
return new Function();
}
case "array":
return _3bf?_3bf.split(/\s*,\s*/):[];
case "date":
switch(_3bf){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_3bf);
}
case "url":
return d.baseUrl+_3bf;
default:
return d.fromJson(_3bf);
}
};
var _3c0={},_3c1={};
d.connect(d,"extend",function(){
_3c1={};
});
function _3c2(cls,_3c3){
for(var name in cls){
if(name.charAt(0)=="_"){
continue;
}
if(name in _3c0){
continue;
}
_3c3[name]=_3bc(cls[name]);
}
return _3c3;
};
function _3c4(_3c5,_3c6){
var c=_3c1[_3c5];
if(!c){
var cls=d.getObject(_3c5),_3c7=null;
if(!cls){
return null;
}
if(!_3c6){
_3c7=_3c2(cls.prototype,{});
}
c={cls:cls,params:_3c7};
}else{
if(!_3c6&&!c.params){
c.params=_3c2(c.cls.prototype,{});
}
}
return c;
};
this._functionFromScript=function(_3c8,_3c9){
var _3ca="";
var _3cb="";
var _3cc=(_3c8.getAttribute(_3c9+"args")||_3c8.getAttribute("args"));
if(_3cc){
d.forEach(_3cc.split(/\s*,\s*/),function(part,idx){
_3ca+="var "+part+" = arguments["+idx+"]; ";
});
}
var _3cd=_3c8.getAttribute("with");
if(_3cd&&_3cd.length){
d.forEach(_3cd.split(/\s*,\s*/),function(part){
_3ca+="with("+part+"){";
_3cb+="}";
});
}
return new Function(_3ca+_3c8.innerHTML+_3cb);
};
this.instantiate=function(_3ce,_3cf,args){
var _3d0=[],_3cf=_3cf||{};
args=args||{};
var _3d1=(args.scope||d._scopeName)+"Type",_3d2="data-"+(args.scope||d._scopeName)+"-";
d.forEach(_3ce,function(obj){
if(!obj){
return;
}
var node,type,_3d3,_3d4,_3d5,_3d6;
if(obj.node){
node=obj.node;
type=obj.type;
_3d6=obj.fastpath;
_3d3=obj.clsInfo||(type&&_3c4(type,_3d6));
_3d4=_3d3&&_3d3.cls;
_3d5=obj.scripts;
}else{
node=obj;
type=_3d1 in _3cf?_3cf[_3d1]:node.getAttribute(_3d1);
_3d3=type&&_3c4(type);
_3d4=_3d3&&_3d3.cls;
_3d5=(_3d4&&(_3d4._noScript||_3d4.prototype._noScript)?[]:d.query("> script[type^='dojo/']",node));
}
if(!_3d3){
throw new Error("Could not load class '"+type);
}
var _3d7={};
if(args.defaults){
d._mixin(_3d7,args.defaults);
}
if(obj.inherited){
d._mixin(_3d7,obj.inherited);
}
if(_3d6){
var _3d8=node.getAttribute(_3d2+"props");
if(_3d8&&_3d8.length){
try{
_3d8=d.fromJson.call(args.propsThis,"{"+_3d8+"}");
d._mixin(_3d7,_3d8);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_3d8+"'");
}
}
var _3d9=node.getAttribute(_3d2+"attach-point");
if(_3d9){
_3d7.dojoAttachPoint=_3d9;
}
var _3da=node.getAttribute(_3d2+"attach-event");
if(_3da){
_3d7.dojoAttachEvent=_3da;
}
dojo.mixin(_3d7,_3cf);
}else{
var _3db=node.attributes;
for(var name in _3d3.params){
var item=name in _3cf?{value:_3cf[name],specified:true}:_3db.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){
continue;
}
var _3dc=item.value;
switch(name){
case "class":
_3dc="className" in _3cf?_3cf.className:node.className;
break;
case "style":
_3dc="style" in _3cf?_3cf.style:(node.style&&node.style.cssText);
}
var _3dd=_3d3.params[name];
if(typeof _3dc=="string"){
_3d7[name]=_3be(_3dc,_3dd);
}else{
_3d7[name]=_3dc;
}
}
}
var _3de=[],_3df=[];
d.forEach(_3d5,function(_3e0){
node.removeChild(_3e0);
var _3e1=(_3e0.getAttribute(_3d2+"event")||_3e0.getAttribute("event")),type=_3e0.getAttribute("type"),nf=d.parser._functionFromScript(_3e0,_3d2);
if(_3e1){
if(type=="dojo/connect"){
_3de.push({event:_3e1,func:nf});
}else{
_3d7[_3e1]=nf;
}
}else{
_3df.push(nf);
}
});
var _3e2=_3d4.markupFactory||_3d4.prototype&&_3d4.prototype.markupFactory;
var _3e3=_3e2?_3e2(_3d7,node,_3d4):new _3d4(_3d7,node);
_3d0.push(_3e3);
var _3e4=(node.getAttribute(_3d2+"id")||node.getAttribute("jsId"));
if(_3e4){
d.setObject(_3e4,_3e3);
}
d.forEach(_3de,function(_3e5){
d.connect(_3e3,_3e5.event,null,_3e5.func);
});
d.forEach(_3df,function(func){
func.call(_3e3);
});
});
if(!_3cf._started){
d.forEach(_3d0,function(_3e6){
if(!args.noStart&&_3e6&&dojo.isFunction(_3e6.startup)&&!_3e6._started&&(!_3e6.getParent||!_3e6.getParent())){
_3e6.startup();
}
});
}
return _3d0;
};
this.parse=function(_3e7,args){
var root;
if(!args&&_3e7&&_3e7.rootNode){
args=_3e7;
root=args.rootNode;
}else{
root=_3e7;
}
root=root?dojo.byId(root):dojo.body();
args=args||{};
var _3e8=(args.scope||d._scopeName)+"Type",_3e9="data-"+(args.scope||d._scopeName)+"-";
function scan(_3ea,list){
var _3eb=dojo.clone(_3ea.inherited);
dojo.forEach(["dir","lang"],function(name){
var val=_3ea.node.getAttribute(name);
if(val){
_3eb[name]=val;
}
});
var _3ec=_3ea.clsInfo&&!_3ea.clsInfo.cls.prototype._noScript?_3ea.scripts:null;
var _3ed=(!_3ea.clsInfo||!_3ea.clsInfo.cls.prototype.stopParser)||(args&&args.template);
for(var _3ee=_3ea.node.firstChild;_3ee;_3ee=_3ee.nextSibling){
if(_3ee.nodeType==1){
var type,_3ef=_3ed&&_3ee.getAttribute(_3e9+"type");
if(_3ef){
type=_3ef;
}else{
type=_3ed&&_3ee.getAttribute(_3e8);
}
var _3f0=_3ef==type;
if(type){
var _3f1={"type":type,fastpath:_3f0,clsInfo:_3c4(type,_3f0),node:_3ee,scripts:[],inherited:_3eb};
list.push(_3f1);
scan(_3f1,list);
}else{
if(_3ec&&_3ee.nodeName.toLowerCase()=="script"){
type=_3ee.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_3ec.push(_3ee);
}
}else{
if(_3ed){
scan({node:_3ee,inherited:_3eb},list);
}
}
}
}
}
};
var _3f2={};
if(args&&args.inherited){
for(var key in args.inherited){
if(args.inherited[key]){
_3f2[key]=args.inherited[key];
}
}
}
var list=[];
scan({node:root,inherited:_3f2},list);
var _3f3=args&&args.template?{template:true}:null;
return this.instantiate(list,_3f3,args);
};
}();
(function(){
var _3f4=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.getObject("dijit.wai.onload")===dojo._loaders[0]){
dojo._loaders.splice(1,0,_3f4);
}else{
dojo._loaders.unshift(_3f4);
}
})();
}
if(!dojo._hasResource["dojo.cache"]){
dojo._hasResource["dojo.cache"]=true;
dojo.provide("dojo.cache");
var _3f5={};
dojo.cache=function(_3f6,url,_3f7){
if(typeof _3f6=="string"){
var _3f8=dojo.moduleUrl(_3f6,url);
}else{
_3f8=_3f6;
_3f7=url;
}
var key=_3f8.toString();
var val=_3f7;
if(_3f7!=undefined&&!dojo.isString(_3f7)){
val=("value" in _3f7?_3f7.value:undefined);
}
var _3f9=_3f7&&_3f7.sanitize?true:false;
if(typeof val=="string"){
val=_3f5[key]=_3f9?dojo.cache._sanitize(val):val;
}else{
if(val===null){
delete _3f5[key];
}else{
if(!(key in _3f5)){
val=dojo._getText(key);
_3f5[key]=_3f9?dojo.cache._sanitize(val):val;
}
val=_3f5[key];
}
}
return val;
};
dojo.cache._sanitize=function(val){
if(val){
val=val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _3fa=val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_3fa){
val=_3fa[1];
}
}else{
val="";
}
return val;
};
}
if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _3fb=this.declaredClass,_3fc=this;
return dojo.string.substitute(tmpl,this,function(_3fd,key){
if(key.charAt(0)=="!"){
_3fd=dojo.getObject(key.substr(1),false,_3fc);
}
if(typeof _3fd=="undefined"){
throw new Error(_3fb+" template:"+key);
}
if(_3fd==null){
return "";
}
return key.charAt(0)=="!"?_3fd:_3fd.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _3fe=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_3fe)){
node=dojo._toDom(this._stringRepl(_3fe));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_3fe);
}
}else{
node=_3fe.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._startupWidgets=dojo.parser.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang},propsThis:this,scope:"dojo"}));
this._supportingWidgets=dijit.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_3ff){
var dest=this.containerNode;
if(_3ff&&dest){
while(_3ff.hasChildNodes()){
dest.appendChild(_3ff.firstChild);
}
}
},_attachTemplateNodes:function(_400,_401){
_401=_401||function(n,p){
return n.getAttribute(p);
};
var _402=dojo.isArray(_400)?_400:(_400.all||_400.getElementsByTagName("*"));
var x=dojo.isArray(_400)?0:-1;
for(;x<_402.length;x++){
var _403=(x==-1)?_400:_402[x];
if(this.widgetsInTemplate&&(_401(_403,"dojoType")||_401(_403,"data-dojo-type"))){
continue;
}
var _404=_401(_403,"dojoAttachPoint")||_401(_403,"data-dojo-attach-point");
if(_404){
var _405,_406=_404.split(/\s*,\s*/);
while((_405=_406.shift())){
if(dojo.isArray(this[_405])){
this[_405].push(_403);
}else{
this[_405]=_403;
}
this._attachPoints.push(_405);
}
}
var _407=_401(_403,"dojoAttachEvent")||_401(_403,"data-dojo-attach-event");
if(_407){
var _408,_409=_407.split(/\s*,\s*/);
var trim=dojo.trim;
while((_408=_409.shift())){
if(_408){
var _40a=null;
if(_408.indexOf(":")!=-1){
var _40b=_408.split(":");
_408=trim(_40b[0]);
_40a=trim(_40b[1]);
}else{
_408=trim(_408);
}
if(!_40a){
_40a=_408;
}
this._attachEvents.push(this.connect(_403,_408,_40a));
}
}
}
var role=_401(_403,"waiRole");
if(role){
dijit.setWaiRole(_403,role);
}
var _40c=_401(_403,"waiState");
if(_40c){
dojo.forEach(_40c.split(/\s*,\s*/),function(_40d){
if(_40d.indexOf("-")!=-1){
var pair=_40d.split("-");
dijit.setWaiState(_403,pair[0],pair[1]);
}
});
}
}
},startup:function(){
dojo.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
},destroyRendering:function(){
dojo.forEach(this._attachPoints,function(_40e){
delete this[_40e];
},this);
this._attachPoints=[];
dojo.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_40f,_410,_411){
var _412=dijit._Templated._templateCache;
var key=_410||_40f;
var _413=_412[key];
if(_413){
try{
if(!_413.ownerDocument||_413.ownerDocument==dojo.doc){
return _413;
}
}
catch(e){
}
dojo.destroy(_413);
}
if(!_410){
_410=dojo.cache(_40f,{sanitize:true});
}
_410=dojo.string.trim(_410);
if(_411||_410.match(/\$\{([^\}]+)\}/g)){
return (_412[key]=_410);
}else{
var node=dojo._toDom(_410);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_410);
}
return (_412[key]=node);
}
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _414=dijit._Templated._templateCache;
for(var key in _414){
var _415=_414[key];
if(typeof _415=="object"){
dojo.destroy(_415);
}
delete _414[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!dojo._hasResource["dijit._CssStateMixin"]){
dojo._hasResource["dijit._CssStateMixin"]=true;
dojo.provide("dijit._CssStateMixin");
dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,dojo.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_416){
if(!this.disabled){
switch(_416.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
this._set("active",true);
this._mouseDown=true;
var _417=this.connect(dojo.body(),"onmouseup",function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_417);
});
break;
}
}
},_setStateClass:function(){
var _418=this.baseClass.split(" ");
function _419(_41a){
_418=_418.concat(dojo.map(_418,function(c){
return c+_41a;
}),"dijit"+_41a);
};
if(!this.isLeftToRight()){
_419("Rtl");
}
if(this.checked){
_419("Checked");
}
if(this.state){
_419(this.state);
}
if(this.selected){
_419("Selected");
}
if(this.disabled){
_419("Disabled");
}else{
if(this.readOnly){
_419("ReadOnly");
}else{
if(this.active){
_419("Active");
}else{
if(this.hovering){
_419("Hover");
}
}
}
}
if(this._focused){
_419("Focused");
}
var tn=this.stateNode||this.domNode,_41b={};
dojo.forEach(tn.className.split(" "),function(c){
_41b[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _41b[c];
});
}
dojo.forEach(_418,function(c){
_41b[c]=true;
});
var _41c=[];
for(var c in _41b){
_41c.push(c);
}
tn.className=_41c.join(" ");
this._stateClasses=_418;
},_trackMouseState:function(node,_41d){
var _41e=false,_41f=false,_420=false;
var self=this,cn=dojo.hitch(this,"connect",node);
function _421(){
var _422=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
dojo.toggleClass(node,_41d+"Hover",_41e&&!_41f&&!_422);
dojo.toggleClass(node,_41d+"Active",_41f&&!_422);
dojo.toggleClass(node,_41d+"Focused",_420&&!_422);
};
cn("onmouseenter",function(){
_41e=true;
_421();
});
cn("onmouseleave",function(){
_41e=false;
_41f=false;
_421();
});
cn("onmousedown",function(){
_41f=true;
_421();
});
cn("onmouseup",function(){
_41f=false;
_421();
});
cn("onfocus",function(){
_420=true;
_421();
});
cn("onblur",function(){
_420=false;
_421();
});
this.watch("disabled",_421);
this.watch("readOnly",_421);
}});
}
if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_423){
this._set("disabled",_423);
dojo.attr(this.focusNode,"disabled",_423);
if(this.valueNode){
dojo.attr(this.valueNode,"disabled",_423);
}
dijit.setWaiState(this.focusNode,"disabled",_423);
if(_423){
this._set("hovering",false);
this._set("active",false);
var _424="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:"focusNode";
dojo.forEach(dojo.isArray(_424)?_424:[_424],function(_425){
var node=this[_425];
if(dojo.isWebKit||dijit.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
}
},setDisabled:function(_426){
dojo.deprecated("setDisabled("+_426+") is deprecated. Use set('disabled',"+_426+") instead.","","2.0");
this.set("disabled",_426);
},_onFocus:function(e){
if(this.scrollOnFocus){
dojo.window.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled){
dijit.focus(this.focusNode);
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_427){
},_onChangeActive:false,_handleOnChange:function(_428,_429){
if(this._lastValueReported==undefined&&(_429===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_428;
}
this._pendingOnChange=this._pendingOnChange||(typeof _428!=typeof this._lastValueReported)||(this.compare(_428,this._lastValueReported)!=0);
if((this.intermediateChanges||_429||_429===undefined)&&this._pendingOnChange){
this._lastValueReported=_428;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(dojo.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_428);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},setValue:function(_42a){
dojo.deprecated("dijit.form._FormWidget:setValue("+_42a+") is deprecated.  Use set('value',"+_42a+") instead.","","2.0");
this.set("value",_42a);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_onMouseDown:function(e){
if(!e.ctrlKey&&dojo.mouseButtons.isLeft(e)&&this.isFocusable()){
var _42b=this.connect(dojo.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_42b);
});
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(_42c){
dojo.attr(this.focusNode,"readOnly",_42c);
dijit.setWaiState(this.focusNode,"readonly",_42c);
this._set("readOnly",_42c);
},postCreate:function(){
this.inherited(arguments);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_42d,_42e){
this._handleOnChange(_42d,_42e);
},_handleOnChange:function(_42f,_430){
this._set("value",_42f);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
},_layoutHackIE7:function(){
if(dojo.isIE==7){
var _431=this.domNode;
var _432=_431.parentNode;
var _433=_431.firstChild||_431;
var _434=_433.style.filter;
var _435=this;
while(_432&&_432.clientHeight==0){
(function ping(){
var _436=_435.connect(_432,"onscroll",function(e){
_435.disconnect(_436);
_433.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_433.style.filter=_434;
},0);
});
})();
_432=_432.parentNode;
}
}
}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_437,_438){
var _439=this.containerNode;
if(_438&&typeof _438=="number"){
var _43a=this.getChildren();
if(_43a&&_43a.length>=_438){
_439=_43a[_438-1].domNode;
_438="after";
}
}
dojo.place(_437.domNode,_439,_438);
if(this._started&&!_437._started){
_437.startup();
}
},removeChild:function(_43b){
if(typeof _43b=="number"){
_43b=this.getChildren()[_43b];
}
if(_43b){
var node=_43b.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_43c){
dojo.forEach(this.getChildren(),function(_43d){
_43d.destroyRecursive(_43c);
});
},_getSiblingOfChild:function(_43e,dir){
var node=_43e.domNode,_43f=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_43f];
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node&&dijit.byNode(node);
},getIndexOfChild:function(_440){
return dojo.indexOf(this.getChildren(),_440);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_441){
_441.startup();
});
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit._HasDropDown"]){
dojo._hasResource["dijit._HasDropDown"]=true;
dojo.provide("dijit._HasDropDown");
dojo.declare("dijit._HasDropDown",null,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
dojo.stopEvent(e);
this._docHandler=this.connect(dojo.doc,"onmouseup","_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _442=this.dropDown,_443=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_443){
if(dojo.hasClass(t,"dijitPopup")){
_443=true;
}else{
t=t.parentNode;
}
}
if(_443){
t=e.target;
if(_442.onItemClick){
var _444;
while(t&&!(_444=dijit.byNode(t))){
t=t.parentNode;
}
if(_444&&_444.onClick&&_444.getParent){
_444.getParent().onItemClick(_444,e);
}
}
return;
}
}
}
if(this._opened&&_442.focus&&_442.autoFocus!==false){
window.setTimeout(dojo.hitch(_442,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _445={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_445+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_446=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
dojo.stopEvent(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==dojo.keys.ESCAPE){
this.closeDropDown();
dojo.stopEvent(e);
}else{
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_446.tagName||"").toLowerCase()!=="input"||(_446.type&&_446.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
dojo.stopEvent(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
setTimeout(dojo.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _447=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_447);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_448){
_448();
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
if(!this.isLoaded()){
this.loadDropDown(dojo.hitch(this,"openDropDown"));
return;
}else{
this.openDropDown();
}
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _449=this.dropDown,_44a=_449.domNode,_44b=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_44a.style.width){
this._explicitDDWidth=true;
}
if(_44a.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _44c={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_44c.width="";
}
if(!this._explicitDDHeight){
_44c.height="";
}
dojo.style(_44a,_44c);
var _44d=this.maxHeight;
if(_44d==-1){
var _44e=dojo.window.getBox(),_44f=dojo.position(_44b,false);
_44d=Math.floor(Math.max(_44f.y,_44e.h-(_44f.y+_44f.h)));
}
if(_449.startup&&!_449._started){
_449.startup();
}
dijit.popup.moveOffScreen(_449);
var mb=dojo._getMarginSize(_44a);
var _450=(_44d&&mb.h>_44d);
dojo.style(_44a,{overflowX:"hidden",overflowY:_450?"auto":"hidden"});
if(_450){
mb.h=_44d;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_44b.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_44b.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_449.resize)){
_449.resize(mb);
}else{
dojo.marginBox(_44a,mb);
}
}
var _451=dijit.popup.open({parent:this,popup:_449,around:_44b,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
dojo.attr(self._popupStateNode,"popupActive",false);
dojo.removeClass(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _451;
},closeDropDown:function(_452){
if(this._opened){
if(_452){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
}
if(!dojo._hasResource["dijit.form.Button"]){
dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdojoAttachPoint=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode"}),_onClick:function(e){
if(this.disabled){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _453=dijit.byNode(node);
if(_453&&typeof _453._onSubmit=="function"){
_453._onSubmit(e);
break;
}
}
}else{
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
}
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.focusNode,false);
},_fillContent:function(_454){
if(_454&&(!this.params||!("label" in this.params))){
this.set("label",_454.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_455){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_455);
},_setLabelAttr:function(_456){
this._set("label",_456);
this.containerNode.innerHTML=_456;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _457=this.iconClass||"dijitNoIcon",_458=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_458,_457);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdojoAttachPoint=\"valueNode\"\n/></span>\n"),_fillContent:function(){
if(this.srcNodeRef){
var _459=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_459[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _45a=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_45a);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _45b=this.dropDown;
return (!!_45b&&(!_45b.href||_45b.isLoaded));
},loadDropDown:function(){
var _45c=this.dropDown;
if(!_45c){
return;
}
if(!this.isLoaded()){
var _45d=dojo.connect(_45c,"onLoad",this,function(){
dojo.disconnect(_45d);
this.openDropDown();
});
_45c.refresh();
}else{
this.openDropDown();
}
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" dojoAttachPoint=\"buttonNode\" dojoAttachEvent=\"ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdojoAttachPoint=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdojoAttachPoint=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdojoAttachEvent=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" dojoAttachPoint=\"valueNode\"\n\t\t/></td></tr></tbody\n></table>\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
dijit.focus(this._popupStateNode);
dojo.stopEvent(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
dijit.focus(this.titleNode);
dojo.stopEvent(evt);
}
},focus:function(_45e){
if(!this.disabled){
dijit.focus(_45e=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_45f,_460){
this._set("checked",_45f);
dojo.attr(this.focusNode||this.domNode,"checked",_45f);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_45f);
this._handleOnChange(_45f,_460);
},setChecked:function(_461){
dojo.deprecated("setChecked("+_461+") is deprecated. Use set('checked',"+_461+") instead.","","2.0");
this.set("checked",_461);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dijit.form.DropDownButton"]){
dojo._hasResource["dijit.form.DropDownButton"]=true;
dojo.provide("dijit.form.DropDownButton");
}
if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
}
if(!dojo._hasResource["dijit.form.TextBox"]){
dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",templateString:dojo.cache("dijit.form","templates/TextBox.html","<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"),_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" dojoAttachPoint=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:dojo.isIE?"disabled":"",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==dijit.form.TextBox.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this._focused&&!this.textbox.value)?"":"none";
}
},_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_462,_463,_464){
var _465;
if(_462!==undefined){
_465=this.filter(_462);
if(typeof _464!="string"){
if(_465!==null&&((typeof _465!="number")||!isNaN(_465))){
_464=this.filter(this.format(_465,this.constraints));
}else{
_464="";
}
}
}
if(_464!=null&&_464!=undefined&&((typeof _464)!="number"||!isNaN(_464))&&this.textbox.value!=_464){
this.textbox.value=_464;
this._set("displayedValue",this.get("displayedValue"));
}
this._updatePlaceHolder();
this.inherited(arguments,[_465,_463]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_466){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_466);
},_setDisplayedValueAttr:function(_467){
if(_467===null||_467===undefined){
_467="";
}else{
if(typeof _467!="string"){
_467=String(_467);
}
}
this.textbox.value=_467;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_468,_469){
return ((_468==null||_468==undefined)?"":(_468.toString?_468.toString():_468));
},parse:function(_46a,_46b){
return _46a;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _46c=this;
setTimeout(function(){
_46c._handleOnChange(_46c.get("value"),false);
},0);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
if(dojo.isIE){
setTimeout(dojo.hitch(this,function(){
var s=dojo.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _46d=this.domNode.getElementsByTagName("INPUT");
if(_46d){
for(var i=0;i<_46d.length;i++){
_46d[i].style.fontFamily=ff;
}
}
}
}
}),0);
}
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput","_onInput");
}else{
this.connect(this.textbox,"onkeydown","_onInput");
this.connect(this.textbox,"onkeyup","_onInput");
this.connect(this.textbox,"onpaste","_onInput");
this.connect(this.textbox,"oncut","_onInput");
}
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=dojo.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
if(this.selectOnClick&&dojo.isMoz){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
var _46e;
if(dojo.isIE){
var _46f=dojo.doc.selection.createRange();
var _470=_46f.parentElement();
_46e=_470==this.textbox&&_46f.text.length==0;
}else{
_46e=this.textbox.selectionStart==this.textbox.selectionEnd;
}
if(_46e){
dijit.selectInputText(this.textbox);
}
});
}
this._updatePlaceHolder();
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_471,_472,stop){
var _473=dojo.global;
var _474=dojo.doc;
_471=dojo.byId(_471);
if(isNaN(_472)){
_472=0;
}
if(isNaN(stop)){
stop=_471.value?_471.value.length:0;
}
dijit.focus(_471);
if(_474["selection"]&&dojo.body()["createTextRange"]){
if(_471.createTextRange){
var r=_471.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_472);
r.moveEnd("character",stop-_472);
r.select();
}
}else{
if(_473["getSelection"]){
if(_471.setSelectionRange){
_471.setSelectionRange(_472,stop);
}
}
}
};
}
if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
}
if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo.position(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _475=n.scrollLeft,_476=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_475!=n.scrollLeft||_476!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}
if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){
this.node=dojo.byId(node);
var pos=e.touches?e.touches[0]:e;
this.marginBox={l:pos.pageX,t:pos.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,"onmousemove",this,"onFirstMove"),dojo.connect(d,"ontouchmove",this,"onFirstMove"),dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"ontouchmove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ontouchend",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,pos=e.touches?e.touches[0]:e;
this.host.onMove(this,{l:m.l+pos.pageX,t:m.t+pos.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}
if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,_477){
this.node=dojo.byId(node);
if(!_477){
_477={};
}
this.handle=_477.handle?dojo.byId(_477.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_477.delay>0?_477.delay:0;
this.skip=_477.skip;
this.mover=_477.mover?_477.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ontouchstart",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_478,node){
return new dojo.dnd.Moveable(node,_478);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"ontouchmove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"),dojo.connect(this.handle,"ontouchend",this,"onMouseUp"));
var pos=e.touches?e.touches[0]:e;
this._lastX=pos.pageX;
this._lastY=pos.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
var pos=e.touches?e.touches[0]:e;
if(Math.abs(pos.pageX-this._lastX)>this.delay||Math.abs(pos.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_479){
dojo.publish("/dnd/move/start",[_479]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_47a){
dojo.publish("/dnd/move/stop",[_47a]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_47b,e){
},onMove:function(_47c,_47d,e){
this.onMoving(_47c,_47d);
var s=_47c.node.style;
s.left=_47d.l+"px";
s.top=_47d.t+"px";
this.onMoved(_47c,_47d);
},onMoving:function(_47e,_47f){
},onMoved:function(_480,_481){
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_482,node){
return new dojo.dnd.move.constrainedMoveable(node,_482);
},constructor:function(node,_483){
if(!_483){
_483={};
}
this.constraints=_483.constraints;
this.within=_483.within;
},onFirstMove:function(_484){
var c=this.constraintBox=this.constraints.call(this,_484);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_484.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_485,_486){
var c=this.constraintBox,s=_485.node.style;
this.onMoving(_485,_486);
_486.l=_486.l<c.l?c.l:c.r<_486.l?c.r:_486.l;
_486.t=_486.t<c.t?c.t:c.b<_486.t?c.b:_486.t;
s.left=_486.l+"px";
s.top=_486.t+"px";
this.onMoved(_485,_486);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_487,node){
return new dojo.dnd.move.boxConstrainedMoveable(node,_487);
},constructor:function(node,_488){
var box=_488&&_488.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_489,node){
return new dojo.dnd.move.parentConstrainedMoveable(node,_489);
},constructor:function(node,_48a){
var area=_48a&&_48a.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
if(!dojo._hasResource["dojo.dnd.TimedMoveable"]){
dojo._hasResource["dojo.dnd.TimedMoveable"]=true;
dojo.provide("dojo.dnd.TimedMoveable");
(function(){
var _48b=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_48c){
if(!_48c){
_48c={};
}
if(_48c.timeout&&typeof _48c.timeout=="number"&&_48c.timeout>=0){
this.timeout=_48c.timeout;
}
},markupFactory:function(_48d,node){
return new dojo.dnd.TimedMoveable(node,_48d);
},onMoveStop:function(_48e){
if(_48e._timer){
clearTimeout(_48e._timer);
_48b.call(this,_48e,_48e._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_48f,_490){
_48f._leftTop=_490;
if(!_48f._timer){
var _491=this;
_48f._timer=setTimeout(function(){
_48f._timer=null;
_48b.call(_491,_48f,_48f._leftTop);
},this.timeout);
}
}});
})();
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _492=this;
dojo.mixin(_492,args);
_492.node=args.node;
_492._showArgs=dojo.mixin({},args);
_492._showArgs.node=_492.node;
_492._showArgs.duration=_492.showDuration;
_492.showAnim=_492.showFunc(_492._showArgs);
_492._hideArgs=dojo.mixin({},args);
_492._hideArgs.node=_492.node;
_492._hideArgs.duration=_492.hideDuration;
_492.hideAnim=_492.hideFunc(_492._hideArgs);
dojo.connect(_492.showAnim,"beforeBegin",dojo.hitch(_492.hideAnim,"stop",true));
dojo.connect(_492.hideAnim,"beforeBegin",dojo.hitch(_492.showAnim,"stop",true));
},show:function(_493){
return this.showAnim.play(_493||0);
},hide:function(_494){
return this.hideAnim.play(_494||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_495={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _496=function(_497){
this._index=-1;
this._animations=_497||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_496,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_498,_499){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_499&&this._current.status()=="playing"){
return this;
}
var _49a=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_49b=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_49c=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_49a);
d.disconnect(_49b);
d.disconnect(_49c);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_49d,_49e){
this.pause();
var _49f=this.duration*_49d;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_49f){
this._current=a;
return true;
}
_49f-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_49f/this._current.duration,_49e);
}
return this;
},stop:function(_4a0){
if(this._current){
if(_4a0){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_496,_495);
dojo.fx.chain=function(_4a1){
return new _496(_4a1);
};
var _4a2=function(_4a3){
this._animations=_4a3||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_4a3,function(a){
var _4a4=a.duration;
if(a.delay){
_4a4+=a.delay;
}
if(this.duration<_4a4){
this.duration=_4a4;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var self=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(d.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
d.extend(_4a2,{_doAction:function(_4a5,args){
d.forEach(this._animations,function(a){
a[_4a5].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_4a6,args){
var t=this._pseudoAnimation;
t[_4a6].apply(t,args);
},play:function(_4a7,_4a8){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_4a9,_4aa){
var ms=this.duration*_4a9;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_4aa);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_4ab){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_4a2,_495);
dojo.fx.combine=function(_4ac){
return new _4a2(_4ac);
};
dojo.fx.wipeIn=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _4ad=d.style(node,"height");
return Math.max(_4ad,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
}
if(!dojo._hasResource["dijit.form._FormMixin"]){
dojo._hasResource["dijit.form._FormMixin"]=true;
dojo.provide("dijit.form._FormMixin");
dojo.declare("dijit.form._FormMixin",null,{state:"",reset:function(){
dojo.forEach(this.getDescendants(),function(_4ae){
if(_4ae.reset){
_4ae.reset();
}
});
},validate:function(){
var _4af=false;
return dojo.every(dojo.map(this.getDescendants(),function(_4b0){
_4b0._hasBeenBlurred=true;
var _4b1=_4b0.disabled||!_4b0.validate||_4b0.validate();
if(!_4b1&&!_4af){
dojo.window.scrollIntoView(_4b0.containerNode||_4b0.domNode);
_4b0.focus();
_4af=true;
}
return _4b1;
}),function(item){
return item;
});
},setValues:function(val){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
dojo.forEach(this.getDescendants(),function(_4b2){
if(!_4b2.name){
return;
}
var _4b3=map[_4b2.name]||(map[_4b2.name]=[]);
_4b3.push(_4b2);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _4b4=map[name],_4b5=dojo.getObject(name,false,obj);
if(_4b5===undefined){
continue;
}
if(!dojo.isArray(_4b5)){
_4b5=[_4b5];
}
if(typeof _4b4[0].checked=="boolean"){
dojo.forEach(_4b4,function(w,i){
w.set("value",dojo.indexOf(_4b5,w.value)!=-1);
});
}else{
if(_4b4[0].multiple){
_4b4[0].set("value",_4b5);
}else{
dojo.forEach(_4b4,function(w,i){
w.set("value",_4b5[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
dojo.forEach(this.getDescendants(),function(_4b6){
var name=_4b6.name;
if(!name||_4b6.disabled){
return;
}
var _4b7=_4b6.get("value");
if(typeof _4b6.checked=="boolean"){
if(/Radio/.test(_4b6.declaredClass)){
if(_4b7!==false){
dojo.setObject(name,_4b7,obj);
}else{
_4b7=dojo.getObject(name,false,obj);
if(_4b7===undefined){
dojo.setObject(name,null,obj);
}
}
}else{
var ary=dojo.getObject(name,false,obj);
if(!ary){
ary=[];
dojo.setObject(name,ary,obj);
}
if(_4b7!==false){
ary.push(_4b7);
}
}
}else{
var prev=dojo.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(dojo.isArray(prev)){
prev.push(_4b7);
}else{
dojo.setObject(name,[prev,_4b7],obj);
}
}else{
dojo.setObject(name,_4b7,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(_4b8){
},_getState:function(){
var _4b9=dojo.map(this._descendants,function(w){
return w.get("state")||"";
});
return dojo.indexOf(_4b9,"Error")>=0?"Error":dojo.indexOf(_4b9,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
dojo.forEach(this._childConnections||[],dojo.hitch(this,"disconnect"));
dojo.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_4ba){
var _4bb=this;
this.disconnectChildren();
this._descendants=this.getDescendants();
var set=_4ba?function(name,val){
_4bb[name]=val;
}:dojo.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _4bc=(this._childConnections=[]),_4bd=(this._childWatches=[]);
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.validate;
}),function(_4be){
dojo.forEach(["state","disabled"],function(attr){
_4bd.push(_4be.watch(attr,function(attr,_4bf,_4c0){
_4bb.set("state",_4bb._getState());
}));
});
});
var _4c1=function(){
if(_4bb._onChangeDelayTimer){
clearTimeout(_4bb._onChangeDelayTimer);
}
_4bb._onChangeDelayTimer=setTimeout(function(){
delete _4bb._onChangeDelayTimer;
_4bb._set("value",_4bb.get("value"));
},10);
};
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.onChange;
}),function(_4c2){
_4bc.push(_4bb.connect(_4c2,"onChange",_4c1));
_4bd.push(_4c2.watch("disabled",_4c1));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_4c3,_4c4){
this.onValidStateChange(_4c4=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit._DialogMixin"]){
dojo._hasResource["dijit._DialogMixin"]=true;
dojo.provide("dijit._DialogMixin");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_4c5){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _4c6=dijit._getTabNavigable(this.containerNode);
this._firstFocusItem=_4c6.lowest||_4c6.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_4c6.last||_4c6.highest||this._firstFocusItem;
}});
}
if(!dojo._hasResource["dijit.DialogUnderlay"]){
dojo._hasResource["dijit.DialogUnderlay"]=true;
dojo.provide("dijit.DialogUnderlay");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' dojoAttachPoint='node'></div></div>",dialogId:"","class":"",attributeMap:{id:"domNode"},_setDialogIdAttr:function(id){
dojo.attr(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_4c7){
this.node.className="dijitDialogUnderlay "+_4c7;
this._set("class",_4c7);
},postCreate:function(){
dojo.body().appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _4c8=dojo.window.getBox();
os.top=_4c8.t+"px";
os.left=_4c8.l+"px";
is.width=_4c8.w+"px";
is.height=_4c8.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
}
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _4c9=dijit.getEnclosingWidget(this.domNode.parentNode);
return _4c9&&_4c9.isContainer?_4c9:null;
},_getSibling:function(_4ca){
var node=this.domNode;
do{
node=node[_4ca+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&dijit.byNode(node);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}
if(!dojo._hasResource["dijit.layout._LayoutWidget"]){
dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _4cb=this.getParent&&this.getParent();
if(!(_4cb&&_4cb.isLayoutContainer)){
this.resize();
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this.resize();
});
}
},resize:function(_4cc,_4cd){
var node=this.domNode;
if(_4cc){
dojo.marginBox(node,_4cc);
if(_4cc.t){
node.style.top=_4cc.t+"px";
}
if(_4cc.l){
node.style.left=_4cc.l+"px";
}
}
var mb=_4cd||{};
dojo.mixin(mb,_4cc||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(node),mb);
}
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var be=dojo._getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(node,cs);
this._contentBox={l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_4ce){
var cls=this.baseClass+"-child "+(_4ce.baseClass?this.baseClass+"-"+_4ce.baseClass:"");
dojo.addClass(_4ce.domNode,cls);
},addChild:function(_4cf,_4d0){
this.inherited(arguments);
if(this._started){
this._setupChild(_4cf);
}
},removeChild:function(_4d1){
var cls=this.baseClass+"-child"+(_4d1.baseClass?" "+this.baseClass+"-"+_4d1.baseClass:"");
dojo.removeClass(_4d1.domNode,cls);
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(node,mb){
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return {l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _4d2=function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
var size=function(_4d3,dim){
var _4d4=_4d3.resize?_4d3.resize(dim):dojo.marginBox(_4d3.domNode,dim);
if(_4d4){
dojo.mixin(_4d3,_4d4);
}else{
dojo.mixin(_4d3,dojo.marginBox(_4d3.domNode));
dojo.mixin(_4d3,dim);
}
};
dijit.layout.layoutChildren=function(_4d5,dim,_4d6,_4d7,_4d8){
dim=dojo.mixin({},dim);
dojo.addClass(_4d5,"dijitLayoutContainer");
_4d6=dojo.filter(_4d6,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(dojo.filter(_4d6,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
dojo.forEach(_4d6,function(_4d9){
var elm=_4d9.domNode,pos=(_4d9.region||_4d9.layoutAlign);
var _4da=elm.style;
_4da.left=dim.l+"px";
_4da.top=dim.t+"px";
_4da.position="absolute";
dojo.addClass(elm,"dijitAlign"+_4d2(pos));
var _4db={};
if(_4d7&&_4d7==_4d9.id){
_4db[_4d9.region=="top"||_4d9.region=="bottom"?"h":"w"]=_4d8;
}
if(pos=="top"||pos=="bottom"){
_4db.w=dim.w;
size(_4d9,_4db);
dim.h-=_4d9.h;
if(pos=="top"){
dim.t+=_4d9.h;
}else{
_4da.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_4db.h=dim.h;
size(_4d9,_4db);
dim.w-=_4d9.w;
if(pos=="left"){
dim.l+=_4d9.w;
}else{
_4da.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_4d9,dim);
}
}
}
});
};
})();
}
if(!dojo._hasResource["dijit.layout._ContentPaneResizeMixin"]){
dojo._hasResource["dijit.layout._ContentPaneResizeMixin"]=true;
dojo.provide("dijit.layout._ContentPaneResizeMixin");
dojo.declare("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isContainer:true,isLayoutContainer:true,_startChildren:function(){
dojo.forEach(this.getChildren(),function(_4dc){
_4dc.startup();
_4dc._started=true;
});
},startup:function(){
if(this._started){
return;
}
var _4dd=dijit._Contained.prototype.getParent.call(this);
this._childOfLayoutWidget=_4dd&&_4dd.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
this._startChildren();
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this._needLayout=!this._childOfLayoutWidget;
this.resize();
});
}
},_checkIfSingleChild:function(){
var _4de=dojo.query("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_4df=_4de.filter(function(node){
return dojo.hasAttr(node,"data-dojo-type")||dojo.hasAttr(node,"dojoType")||dojo.hasAttr(node,"widgetId");
}),_4e0=dojo.filter(_4df.map(dijit.byNode),function(_4e1){
return _4e1&&_4e1.domNode&&_4e1.resize;
});
if(_4de.length==_4df.length&&_4e0.length==1){
this._singleChild=_4e0[0];
}else{
delete this._singleChild;
}
dojo.toggleClass(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_4e2,_4e3){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_4e2,_4e3);
},_scheduleLayout:function(_4e4,_4e5){
if(this._isShown()){
this._layout(_4e4,_4e5);
}else{
this._needLayout=true;
this._changeSize=_4e4;
this._resultSize=_4e5;
}
},_layout:function(_4e6,_4e7){
if(_4e6){
dojo.marginBox(this.domNode,_4e6);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_4e7||{};
dojo.mixin(mb,_4e6||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(cn),mb);
}
this._contentBox=dijit.layout.marginBox2contentBox(cn,mb);
}else{
this._contentBox=dojo.contentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_4e8){
if(_4e8.resize){
_4e8.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_4e9=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!dojo.hasClass(node,"dijitHidden")&&_4e9&&_4e9.style&&(_4e9.style.display!="none");
}
}
},_onShow:function(){
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
this._wasShown=true;
}});
}
if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
dojo.getObject("html",true,dojo);
(function(){
var _4ea=0,d=dojo;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(node,cont){
d.empty(node);
if(cont){
if(typeof cont=="string"){
cont=d._toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&d.isArrayLike(cont)){
for(var _4eb=cont.length,i=0;i<cont.length;i=_4eb==cont.length?i+1:0){
d.place(cont[i],node,"last");
}
}else{
d.place(cont,node,"last");
}
}
return node;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_4ec,node){
dojo.mixin(this,_4ec||{});
node=this.node=dojo.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_4ea++].join("_");
}
},set:function(cont,_4ed){
if(undefined!==cont){
this.content=cont;
}
if(_4ed){
this._mixin(_4ed);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _4ee=this.onContentError(e);
try{
node.innerHTML=_4ee;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(dojo.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _4ef=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4ef){
cont=_4ef[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_4f0){
var _4f1={},key;
for(key in _4f0){
if(key in _4f1){
continue;
}
this[key]=_4f0[key];
}
},_parse:function(){
var _4f2=this.node;
try{
var _4f3={};
dojo.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_4f3[name]=this[name];
}
},this);
this.parseResults=dojo.parser.parse({rootNode:_4f2,noStart:!this.startup,inherited:_4f3,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_4f4){
var _4f5=this["on"+type+"Error"].call(this,err);
if(_4f4){
console.error(_4f4,err);
}else{
if(_4f5){
dojo.html._setNodeContent(this.node,_4f5,true);
}
}
}});
dojo.html.set=function(node,cont,_4f6){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_4f6){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_4f6,{content:cont,node:node}));
return op.set();
}
};
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.getObject("i18n",true,dojo);
dojo.i18n.getLocalization=dojo.i18n.getLocalization||function(_4f7,_4f8,_4f9){
_4f9=dojo.i18n.normalizeLocale(_4f9);
var _4fa=_4f9.split("-");
var _4fb=[_4f7,"nls",_4f8].join(".");
var _4fc=dojo._loadedModules[_4fb];
if(_4fc){
var _4fd;
for(var i=_4fa.length;i>0;i--){
var loc=_4fa.slice(0,i).join("_");
if(_4fc[loc]){
_4fd=_4fc[loc];
break;
}
}
if(!_4fd){
_4fd=_4fc.ROOT;
}
if(_4fd){
var _4fe=function(){
};
_4fe.prototype=_4fd;
return new _4fe();
}
}
throw new Error("Bundle not found: "+_4f8+" in "+_4f7+" , locale="+_4f9);
};
dojo.i18n.normalizeLocale=function(_4ff){
var _500=_4ff?_4ff.toLowerCase():dojo.locale;
if(_500=="root"){
_500="ROOT";
}
return _500;
};
dojo.i18n._requireLocalization=function(_501,_502,_503,_504){
var _505=dojo.i18n.normalizeLocale(_503);
var _506=[_501,"nls",_502].join(".");
var _507="";
if(_504){
var _508=_504.split(",");
for(var i=0;i<_508.length;i++){
if(_505["indexOf"](_508[i])==0){
if(_508[i].length>_507.length){
_507=_508[i];
}
}
}
if(!_507){
_507="ROOT";
}
}
var _509=_504?_507:_505;
var _50a=dojo._loadedModules[_506];
var _50b=null;
if(_50a){
if(dojo.config.localizationComplete&&_50a._built){
return;
}
var _50c=_509.replace(/-/g,"_");
var _50d=_506+"."+_50c;
_50b=dojo._loadedModules[_50d];
}
if(!_50b){
_50a=dojo["provide"](_506);
var syms=dojo._getModuleSymbols(_501);
var _50e=syms.concat("nls").join("/");
var _50f;
dojo.i18n._searchLocalePath(_509,_504,function(loc){
var _510=loc.replace(/-/g,"_");
var _511=_506+"."+_510;
var _512=false;
if(!dojo._loadedModules[_511]){
dojo["provide"](_511);
var _513=[_50e];
if(loc!="ROOT"){
_513.push(loc);
}
_513.push(_502);
var _514=_513.join("/")+".js";
_512=dojo._loadPath(_514,null,function(hash){
hash=hash.root||hash;
var _515=function(){
};
_515.prototype=_50f;
_50a[_510]=new _515();
for(var j in hash){
_50a[_510][j]=hash[j];
}
});
}else{
_512=true;
}
if(_512&&_50a[_510]){
_50f=_50a[_510];
}else{
_50a[_510]=_50f;
}
if(_504){
return true;
}
});
}
if(_504&&_505!=_507){
_50a[_505.replace(/-/g,"_")]=_50a[_507.replace(/-/g,"_")];
}
};
(function(){
var _516=dojo.config.extraLocale;
if(_516){
if(!_516 instanceof Array){
_516=[_516];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_517,_518){
req(m,b,_517,_518);
if(_517){
return;
}
for(var i=0;i<_516.length;i++){
req(m,b,_516[i],_518);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_519,down,_51a){
_519=dojo.i18n.normalizeLocale(_519);
var _51b=_519.split("-");
var _51c=[];
for(var i=_51b.length;i>0;i--){
_51c.push(_51b.slice(0,i).join("-"));
}
_51c.push(false);
if(down){
_51c.reverse();
}
for(var j=_51c.length-1;j>=0;j--){
var loc=_51c[j]||"ROOT";
var stop=_51a(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_51d,_51e){
function _51f(_520){
_520=dojo.i18n.normalizeLocale(_520);
dojo.i18n._searchLocalePath(_520,true,function(loc){
for(var i=0;i<_51e.length;i++){
if(_51e[i]==loc){
dojo["require"](_51d+"_"+loc);
return true;
}
}
return false;
});
};
_51f();
var _521=dojo.config.extraLocale||[];
for(var i=0;i<_521.length;i++){
_51f(_521[i]);
}
};
}
if(!dojo._hasResource["dijit.layout.ContentPane"]){
dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",[dijit._Widget,dijit.layout._ContentPaneResizeMixin],{href:"",extractContent:false,parseOnLoad:true,parserScope:dojo._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[]}),stopParser:true,template:false,create:function(_522,_523){
if((!_522||!_522.template)&&_523&&!("href" in _522)&&!("content" in _522)){
var df=dojo.doc.createDocumentFragment();
_523=dojo.byId(_523);
while(_523.firstChild){
df.appendChild(_523.firstChild);
}
_522=dojo.delegate(_522,{content:df});
}
this.inherited(arguments,[_522,_523]);
},postMixInProperties:function(){
this.inherited(arguments);
var _524=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_524);
this.errorMessage=dojo.string.substitute(this.errorMessage,_524);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
},_startChildren:function(){
this.inherited(arguments);
if(this._contentSetter){
dojo.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&dojo.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_525){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _526={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_526,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_526));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.callback(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _527=this._contentSetter;
dojo.forEach(this.getChildren(),function(_528){
if(_528.destroyRecursive){
_528.destroyRecursive();
}
});
if(_527){
dojo.forEach(_527.parseResults,function(_529){
if(_529.destroyRecursive&&_529.domNode&&_529.domNode.parentNode==dojo.body()){
_529.destroyRecursive();
}
});
delete _527.parseResults;
}
dojo.html._emptyNode(this.containerNode);
delete this._singleChild;
},_setContent:function(cont,_52a){
this.destroyDescendants();
var _52b=this._contentSetter;
if(!(_52b&&_52b instanceof dojo.html._ContentSetter)){
_52b=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _52c=this.onContentError(e);
try{
this.containerNode.innerHTML=_52c;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _52d=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang},this._contentSetterParams||{});
_52b.set((dojo.isObject(cont)&&cont.domNode)?cont.domNode:cont,_52d);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_52a){
if(this._started){
this._startChildren();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_52e){
this.onLoadDeferred.errback(err);
var _52f=this["on"+type+"Error"].call(this,err);
if(_52e){
console.error(_52e,err);
}else{
if(_52f){
this._setContent(_52f,true);
}
}
},onLoad:function(data){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_530){
},onDownloadError:function(_531){
return this.errorMessage;
},onDownloadEnd:function(){
}});
}
if(!dojo._hasResource["dijit.TooltipDialog"]){
dojo._hasResource["dijit.TooltipDialog"]=true;
dojo.provide("dijit.TooltipDialog");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:dojo.cache("dijit","templates/TooltipDialog.html","<div role=\"presentation\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" role=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\n</div>\n"),_setTitleAttr:function(_532){
this.containerNode.title=_532;
this._set("title",_532);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_533,_534){
var newC="dijitTooltipAB"+(_534.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_534.charAt(0)=="T"?"Below":"Above");
dojo.replaceClass(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
var dk=dojo.keys;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _535=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==dk.ESCAPE){
setTimeout(dojo.hitch(this,"onCancel"),0);
dojo.stopEvent(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_535){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_535){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
if(evt.charOrCode===dk.TAB){
evt.stopPropagation();
}
}
}
}
}});
}
if(!dojo._hasResource["dijit.Dialog"]){
dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit._DialogBase",[dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Dialog.html","<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"),baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),open:false,duration:dijit.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,"aria-describedby":"",postMixInProperties:function(){
var _536=dojo.i18n.getLocalization("dijit","common");
dojo.mixin(this,_536);
this.inherited(arguments);
},postCreate:function(){
dojo.style(this.domNode,{display:"none",position:"absolute"});
dojo.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&dijit._DialogLevelManager.isTop(this)){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(e){
if(e&&e.node&&e.node===this.domNode){
this._relativePosition=dojo.position(e.node);
}
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(node,{handle:this.titleBar}):new dojo.dnd.Moveable(node,{handle:this.titleBar,timeout:0});
this._dndListener=dojo.subscribe("/dnd/move/stop",this,"_endDrag");
}else{
dojo.addClass(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":dojo.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(this._singleChildOriginalStyle){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
}
delete this._singleChildOriginalStyle;
}else{
dojo.style(this.containerNode,{width:"auto",height:"auto"});
}
var mb=dojo._getMarginSize(this.domNode);
var _537=dojo.window.getBox();
if(mb.w>=_537.w||mb.h>=_537.h){
var w=Math.min(mb.w,Math.floor(_537.w*0.75)),h=Math.min(mb.h,Math.floor(_537.h*0.75));
if(this._singleChild&&this._singleChild.resize){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
this._singleChild.resize({w:w,h:h});
}else{
dojo.style(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode,_538=dojo.window.getBox(),p=this._relativePosition,bb=p?null:dojo._getBorderBox(node),l=Math.floor(_538.l+(p?p.x:(_538.w-bb.w)/2)),t=Math.floor(_538.t+(p?p.y:(_538.h-bb.h)/2));
dojo.style(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var dk=dojo.keys;
var node=evt.target;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.domNode);
}
var _539=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_539){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_539){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
while(node){
if(node==this.domNode||dojo.hasClass(node,"dijitPopup")){
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==dk.TAB){
dojo.stopEvent(evt);
}else{
if(!dojo.isOpera){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(window,"onresize",this,function(){
var _53a=dojo.window.getBox();
if(!this._oldViewport||_53a.h!=this._oldViewport.h||_53a.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_53a;
}
}));
this._modalconnects.push(dojo.connect(this.domNode,"onkeypress",this,"_onKey"));
dojo.style(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _53b;
this._fadeInDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_53b.stop();
delete this._fadeInDeferred;
}));
_53b=dojo.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:dojo.hitch(this,function(){
dijit._DialogLevelManager.show(this,this.underlayAttrs);
}),onEnd:dojo.hitch(this,function(){
if(this.autofocus&&dijit._DialogLevelManager.isTop(this)){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
this._fadeInDeferred.callback(true);
delete this._fadeInDeferred;
})}).play();
return this._fadeInDeferred;
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _53c;
this._fadeOutDeferred=new dojo.Deferred(dojo.hitch(this,function(){
_53c.stop();
delete this._fadeOutDeferred;
}));
_53c=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){
this.domNode.style.display="none";
dijit._DialogLevelManager.hide(this);
this.onHide();
this._fadeOutDeferred.callback(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},layout:function(){
if(this.domNode.style.display!="none"){
if(dijit._underlay){
dijit._underlay.layout();
}
this._position();
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
if(this._dndListener){
dojo.unsubscribe(this._dndListener);
}
dojo.forEach(this._modalconnects,dojo.disconnect);
dijit._DialogLevelManager.hide(this);
this.inherited(arguments);
}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._DialogBase],{});
dijit._DialogLevelManager={show:function(_53d,_53e){
var ds=dijit._dialogStack;
ds[ds.length-1].focus=dijit.getFocus(_53d);
var _53f=dijit._underlay;
if(!_53f||_53f._destroyed){
_53f=dijit._underlay=new dijit.DialogUnderlay(_53e);
}else{
_53f.set(_53d.underlayAttrs);
}
var _540=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:950;
if(ds.length==1){
_53f.show();
}
dojo.style(dijit._underlay.domNode,"zIndex",_540-1);
dojo.style(_53d.domNode,"zIndex",_540);
ds.push({dialog:_53d,underlayAttrs:_53e,zIndex:_540});
},hide:function(_541){
var ds=dijit._dialogStack;
if(ds[ds.length-1].dialog==_541){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
if(!dijit._underlay._destroyed){
dijit._underlay.hide();
}
}else{
dojo.style(dijit._underlay.domNode,"zIndex",pd.zIndex-1);
dijit._underlay.set(pd.underlayAttrs);
}
if(_541.refocus){
var _542=pd.focus;
if(!_542||(pd.dialog&&!dojo.isDescendant(_542.node,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_542=pd.dialog._firstFocusItem;
}
try{
dijit.focus(_542);
}
catch(e){
}
}
}else{
var idx=dojo.indexOf(dojo.map(ds,function(elem){
return elem.dialog;
}),_541);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_543){
var ds=dijit._dialogStack;
return ds[ds.length-1].dialog==_543;
}};
dijit._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
}
if(!dojo._hasResource["dijit._KeyNavContainer"]){
dojo._hasResource["dijit._KeyNavContainer"]=true;
dojo.provide("dijit._KeyNavContainer");
dojo.declare("dijit._KeyNavContainer",dijit._Container,{tabIndex:"0",_keyNavCodes:{},connectKeyNavHandlers:function(_544,_545){
var _546=(this._keyNavCodes={});
var prev=dojo.hitch(this,this.focusPrev);
var next=dojo.hitch(this,this.focusNext);
dojo.forEach(_544,function(code){
_546[code]=prev;
});
dojo.forEach(_545,function(code){
_546[code]=next;
});
_546[dojo.keys.HOME]=dojo.hitch(this,"focusFirstChild");
_546[dojo.keys.END]=dojo.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
dojo.forEach(this.getChildren(),dojo.hitch(this,"_startupChild"));
},addChild:function(_547,_548){
dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._startupChild(_547);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
var _549=this._getFirstFocusableChild();
if(_549){
this.focusChild(_549);
}
},focusLastChild:function(){
var _54a=this._getLastFocusableChild();
if(_54a){
this.focusChild(_54a);
}
},focusNext:function(){
var _54b=this._getNextFocusableChild(this.focusedChild,1);
this.focusChild(_54b);
},focusPrev:function(){
var _54c=this._getNextFocusableChild(this.focusedChild,-1);
this.focusChild(_54c,true);
},focusChild:function(_54d,last){
if(this.focusedChild&&_54d!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_54d.set("tabIndex",this.tabIndex);
_54d.focus(last?"end":"start");
this._set("focusedChild",_54d);
},_startupChild:function(_54e){
_54e.set("tabIndex","-1");
this.connect(_54e,"_onFocus",function(){
_54e.set("tabIndex",this.tabIndex);
});
this.connect(_54e,"_onBlur",function(){
_54e.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode){
return;
}
this.focusFirstChild();
dojo.attr(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
dojo.attr(this.domNode,"tabIndex",this.tabIndex);
}
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
dojo.stopEvent(evt);
}
},_onChildBlur:function(_54f){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_550,dir){
if(_550){
_550=this._getSiblingOfChild(_550,dir);
}
var _551=this.getChildren();
for(var i=0;i<_551.length;i++){
if(!_550){
_550=_551[(dir>0)?0:(_551.length-1)];
}
if(_550.isFocusable()){
return _550;
}
_550=this._getSiblingOfChild(_550,dir);
}
return null;
}});
}
if(!dojo._hasResource["dijit.MenuItem"]){
dojo._hasResource["dijit.MenuItem"]=true;
dojo.provide("dijit.MenuItem");
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/MenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"),attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"},iconClass:{node:"iconNode",type:"class"}}),baseClass:"dijitMenuItem",label:"",iconClass:"",accelKey:"",disabled:false,_fillContent:function(_552){
if(_552&&!("label" in this.params)){
this.set("label",_552.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _553=this.id+"_text";
dojo.attr(this.containerNode,"id",_553);
if(this.accelKeyNode){
dojo.attr(this.accelKeyNode,"id",this.id+"_accel");
_553+=" "+this.id+"_accel";
}
dijit.setWaiState(this.domNode,"labelledby",_553);
dojo.setSelectable(this.domNode,false);
},_onHover:function(){
this.getParent().onItemHover(this);
},_onUnhover:function(){
this.getParent().onItemUnhover(this);
this._set("hovering",false);
},_onClick:function(evt){
this.getParent().onItemClick(this,evt);
dojo.stopEvent(evt);
},onClick:function(evt){
},focus:function(){
try{
if(dojo.isIE==8){
this.containerNode.focus();
}
dijit.focus(this.focusNode);
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_554){
dojo.toggleClass(this.domNode,"dijitMenuItemSelected",_554);
},setLabel:function(_555){
dojo.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_555);
},setDisabled:function(_556){
dojo.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_556);
},_setDisabledAttr:function(_557){
dijit.setWaiState(this.focusNode,"disabled",_557?"true":"false");
this._set("disabled",_557);
},_setAccelKeyAttr:function(_558){
this.accelKeyNode.style.display=_558?"":"none";
this.accelKeyNode.innerHTML=_558;
dojo.attr(this.containerNode,"colSpan",_558?"1":"2");
this._set("accelKey",_558);
}});
}
if(!dojo._hasResource["dijit.PopupMenuItem"]){
dojo._hasResource["dijit.PopupMenuItem"]=true;
dojo.provide("dijit.PopupMenuItem");
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){
if(this.srcNodeRef){
var _559=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,_559[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node);
}
dojo.body().appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
dojo.style(this.arrowWrapper,"visibility","");
}
dijit.setWaiState(this.focusNode,"haspopup","true");
},destroyDescendants:function(){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive();
}
delete this.popup;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.CheckedMenuItem"]){
dojo._hasResource["dijit.CheckedMenuItem"]=true;
dojo.provide("dijit.CheckedMenuItem");
dojo.declare("dijit.CheckedMenuItem",dijit.MenuItem,{templateString:dojo.cache("dijit","templates/CheckedMenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&nbsp;</td>\n</tr>\n"),checked:false,_setCheckedAttr:function(_55a){
dojo.toggleClass(this.domNode,"dijitCheckedMenuItemChecked",_55a);
dijit.setWaiState(this.domNode,"checked",_55a);
this._set("checked",_55a);
},onChange:function(_55b){
},_onClick:function(e){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.MenuSeparator"]){
dojo._hasResource["dijit.MenuSeparator"]=true;
dojo.provide("dijit.MenuSeparator");
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:dojo.cache("dijit","templates/MenuSeparator.html","<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"),buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
}
if(!dojo._hasResource["dijit.Menu"]){
dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit._MenuBase",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{parentMenu:null,popupDelay:500,startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_55c){
_55c.startup();
});
this.startupKeyNavChildren();
this.inherited(arguments);
},onExecute:function(){
},onCancel:function(_55d){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.focusedChild._onClick(evt);
}else{
var _55e=this._getTopMenu();
if(_55e&&_55e._isMenuBar){
_55e.focusNext();
}
}
},_onPopupHover:function(evt){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _55f=this.currentPopup.parentMenu;
if(_55f.focusedChild){
_55f.focusedChild._setSelected(false);
}
_55f.focusedChild=this.currentPopup.from_item;
_55f.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _560=item.popup;
if(_560){
this._stopPendingCloseTimer(_560);
_560._pendingClose_timer=setTimeout(function(){
_560._pendingClose_timer=null;
if(_560.parentMenu){
_560.parentMenu.currentPopup=null;
}
dijit.popup.close(_560);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
},_stopPopupTimer:function(){
if(this.hover_timer){
clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_stopPendingCloseTimer:function(_561){
if(_561._pendingClose_timer){
clearTimeout(_561._pendingClose_timer);
_561._pendingClose_timer=null;
}
},_stopFocusTimer:function(){
if(this._focus_timer){
clearTimeout(this._focus_timer);
this._focus_timer=null;
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup();
}else{
this.onExecute();
item.onClick(evt);
}
},_openPopup:function(){
this._stopPopupTimer();
var _562=this.focusedChild;
if(!_562){
return;
}
var _563=_562.popup;
if(_563.isShowingNow){
return;
}
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
dijit.popup.close(this.currentPopup);
}
_563.parentMenu=this;
_563.from_item=_562;
var self=this;
dijit.popup.open({parent:this,popup:_563,around:_562.domNode,orient:this._orient||(this.isLeftToRight()?{"TR":"TL","TL":"TR","BR":"BL","BL":"BR"}:{"TL":"TR","TR":"TL","BL":"BR","BR":"BL"}),onCancel:function(){
self.focusChild(_562);
self._cleanUp();
_562._setSelected(true);
self.focusedChild=_562;
},onExecute:dojo.hitch(this,"_cleanUp")});
this.currentPopup=_563;
_563.connect(_563.domNode,"onmouseenter",dojo.hitch(self,"_onPopupHover"));
if(_563.focus){
_563._focus_timer=setTimeout(dojo.hitch(_563,function(){
this._focus_timer=null;
this.focus();
}),0);
}
},_markActive:function(){
this.isActive=true;
dojo.replaceClass(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(e){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
dojo.replaceClass(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
var _564=this.focusedChild&&this.focusedChild.from_item;
if(this.currentPopup){
if(dijit._curFocus&&dojo.isDescendant(dijit._curFocus,this.currentPopup.domNode)){
this.focusedChild.focusNode.focus();
}
dijit.popup.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.focusedChild._onUnhover();
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this._hoveredChild._onUnhover();
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
dojo.declare("dijit.Menu",dijit._MenuBase,{constructor:function(){
this._bindings=[];
},templateString:dojo.cache("dijit","templates/Menu.html","<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" dojoAttachPoint=\"containerNode\"></tbody>\n</table>\n"),baseClass:"dijitMenu",targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(dojo.body());
}else{
dojo.forEach(this.targetNodeIds,this.bindDomNode,this);
}
var k=dojo.keys,l=this.isLeftToRight();
this._openSubMenuKey=l?k.RIGHT_ARROW:k.LEFT_ARROW;
this._closeSubMenuKey=l?k.LEFT_ARROW:k.RIGHT_ARROW;
this.connectKeyNavHandlers([k.UP_ARROW],[k.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
dojo.stopEvent(evt);
}
break;
}
},_iframeContentWindow:function(_565){
var win=dojo.window.get(this._iframeContentDocument(_565))||this._iframeContentDocument(_565)["__parent__"]||(_565.name&&dojo.doc.frames[_565.name])||null;
return win;
},_iframeContentDocument:function(_566){
var doc=_566.contentDocument||(_566.contentWindow&&_566.contentWindow.document)||(_566.name&&dojo.doc.frames[_566.name]&&dojo.doc.frames[_566.name].document)||null;
return doc;
},bindDomNode:function(node){
node=dojo.byId(node);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _567=node,win=this._iframeContentWindow(_567);
cn=dojo.withGlobal(win,dojo.body);
}else{
cn=(node==dojo.body()?dojo.doc.documentElement:node);
}
var _568={node:node,iframe:_567};
dojo.attr(node,"_dijitMenu"+this.id,this._bindings.push(_568));
var _569=dojo.hitch(this,function(cn){
return [dojo.connect(cn,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(evt){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_567,{x:evt.pageX,y:evt.pageY});
}),dojo.connect(cn,"onkeydown",this,function(evt){
if(evt.shiftKey&&evt.keyCode==dojo.keys.F10){
dojo.stopEvent(evt);
this._scheduleOpen(evt.target,_567);
}
})];
});
_568.connects=cn?_569(cn):[];
if(_567){
_568.onloadHandler=dojo.hitch(this,function(){
var win=this._iframeContentWindow(_567);
cn=dojo.withGlobal(win,dojo.body);
_568.connects=_569(cn);
});
if(_567.addEventListener){
_567.addEventListener("load",_568.onloadHandler,false);
}else{
_567.attachEvent("onload",_568.onloadHandler);
}
}
},unBindDomNode:function(_56a){
var node;
try{
node=dojo.byId(_56a);
}
catch(e){
return;
}
var _56b="_dijitMenu"+this.id;
if(node&&dojo.hasAttr(node,_56b)){
var bid=dojo.attr(node,_56b)-1,b=this._bindings[bid];
dojo.forEach(b.connects,dojo.disconnect);
var _56c=b.iframe;
if(_56c){
if(_56c.removeEventListener){
_56c.removeEventListener("load",b.onloadHandler,false);
}else{
_56c.detachEvent("onload",b.onloadHandler);
}
}
dojo.removeAttr(node,_56b);
delete this._bindings[bid];
}
},_scheduleOpen:function(_56d,_56e,_56f){
if(!this._openTimer){
this._openTimer=setTimeout(dojo.hitch(this,function(){
delete this._openTimer;
this._openMyself({target:_56d,iframe:_56e,coords:_56f});
}),1);
}
},_openMyself:function(args){
var _570=args.target,_571=args.iframe,_572=args.coords;
if(_572){
if(_571){
var od=_570.ownerDocument,ifc=dojo.position(_571,true),win=this._iframeContentWindow(_571),_573=dojo.withGlobal(win,"_docScroll",dojo);
var cs=dojo.getComputedStyle(_571),tp=dojo._toPixelValue,left=(dojo.isIE&&dojo.isQuirks?0:tp(_571,cs.paddingLeft))+(dojo.isIE&&dojo.isQuirks?tp(_571,cs.borderLeftWidth):0),top=(dojo.isIE&&dojo.isQuirks?0:tp(_571,cs.paddingTop))+(dojo.isIE&&dojo.isQuirks?tp(_571,cs.borderTopWidth):0);
_572.x+=ifc.x+left-_573.x;
_572.y+=ifc.y+top-_573.y;
}
}else{
_572=dojo.position(_570,true);
_572.x+=10;
_572.y+=10;
}
var self=this;
var _574=dijit.getFocus(this);
function _575(){
if(self.refocus){
dijit.focus(_574);
}
dijit.popup.close(self);
};
dijit.popup.open({popup:this,x:_572.x,y:_572.y,onExecute:_575,onCancel:_575,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
dijit.popup.close(this);
};
},uninitialize:function(){
dojo.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.MenuBar"]){
dojo._hasResource["dijit.MenuBar"]=true;
dojo.provide("dijit.MenuBar");
dojo.declare("dijit.MenuBar",dijit._MenuBase,{templateString:dojo.cache("dijit","templates/MenuBar.html","<div class=\"dijitMenuBar dijitMenuPassive\" dojoAttachPoint=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onkeypress: _onKeyPress\"></div>\n"),baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
var k=dojo.keys,l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[k.LEFT_ARROW]:[k.RIGHT_ARROW],l?[k.RIGHT_ARROW]:[k.LEFT_ARROW]);
this._orient=this.isLeftToRight()?{BL:"TL"}:{BR:"TR"};
},focusChild:function(item){
var _576=this.focusedChild,_577=_576&&_576.popup&&_576.popup.isShowingNow;
this.inherited(arguments);
if(_577&&item.popup&&!item.disabled){
this._openPopup();
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case dojo.keys.DOWN_ARROW:
this._moveToPopup(evt);
dojo.stopEvent(evt);
}
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow){
item.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
}
if(!dojo._hasResource["dijit.TitlePane"]){
dojo._hasResource["dijit.TitlePane"]=true;
dojo.provide("dijit.TitlePane");
dojo.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated,dijit._CssStateMixin],{title:"",open:true,toggleable:true,tabIndex:"0",duration:dijit.defaultDuration,baseClass:"dijitTitlePane",templateString:dojo.cache("dijit","templates/TitlePane.html","<div>\n\t<div dojoAttachEvent=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" dojoAttachPoint=\"titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" dojoAttachPoint=\"focusNode\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\n\t\t\t/><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span dojoAttachPoint=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" role=\"region\" id=\"${id}_pane\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"),attributeMap:dojo.delegate(dijit.layout.ContentPane.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"},tooltip:{node:"focusNode",type:"attribute",attribute:"title"},id:""}),buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _578=this.hideNode,_579=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){
_578.style.display="";
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){
_578.style.display="none";
}});
},_setOpenAttr:function(open,_57a){
dojo.forEach([this._wipeIn,this._wipeOut],function(_57b){
if(_57b&&_57b.status()=="playing"){
_57b.stop();
}
});
if(_57a){
var anim=this[open?"_wipeIn":"_wipeOut"];
anim.play();
}else{
this.hideNode.style.display=this.wipeNode.style.display=open?"":"none";
}
if(this._started){
if(open){
this._onShow();
}else{
this.onHide();
}
}
this.arrowNodeInner.innerHTML=open?"-":"+";
dijit.setWaiState(this.containerNode,"hidden",open?"false":"true");
dijit.setWaiState(this.focusNode,"pressed",open?"true":"false");
this._set("open",open);
this._setCss();
},_setToggleableAttr:function(_57c){
dijit.setWaiRole(this.focusNode,_57c?"button":"heading");
if(_57c){
dijit.setWaiState(this.focusNode,"controls",this.id+"_pane");
dojo.attr(this.focusNode,"tabIndex",this.tabIndex);
}else{
dojo.removeAttr(this.focusNode,"tabIndex");
}
this._set("toggleable",_57c);
this._setCss();
},_setContentAttr:function(_57d){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited(arguments);
if(this._wipeIn){
this._wipeIn.play();
}else{
this.hideNode.style.display="";
}
}
},toggle:function(){
this._setOpenAttr(!this.open,true);
},_setCss:function(){
var node=this.titleBarNode||this.focusNode;
var _57e=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
dojo.replaceClass(node,this._titleBarClass,_57e||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==dojo.keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
dojo.stopEvent(e);
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW&&this.open){
this.containerNode.focus();
e.preventDefault();
}
}
},_onTitleClick:function(){
if(this.toggleable){
this.toggle();
}
},setTitle:function(_57f){
dojo.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_57f);
}});
}
if(!dojo._hasResource["dijit.tree.TreeStoreModel"]){
dojo._hasResource["dijit.tree.TreeStoreModel"]=true;
dojo.provide("dijit.tree.TreeStoreModel");
dojo.declare("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
dojo.mixin(this,args);
this.connects=[];
var _580=this.store;
if(!_580.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.Tree: store must support dojo.data.Identity");
}
if(_580.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([dojo.connect(_580,"onNew",this,"onNewItem"),dojo.connect(_580,"onDelete",this,"onDeleteItem"),dojo.connect(_580,"onSet",this,"onSetItem")]);
}
},destroy:function(){
dojo.forEach(this.connects,dojo.disconnect);
},getRoot:function(_581,_582){
if(this.root){
_581(this.root);
}else{
this.store.fetch({query:this.query,onComplete:dojo.hitch(this,function(_583){
if(_583.length!=1){
throw new Error(this.declaredClass+": query "+dojo.toJson(this.query)+" returned "+_583.length+" items, but must return exactly one item");
}
this.root=_583[0];
_581(this.root);
}),onError:_582});
}
},mayHaveChildren:function(item){
return dojo.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_584,_585,_586){
var _587=this.store;
if(!_587.isItemLoaded(_584)){
var _588=dojo.hitch(this,arguments.callee);
_587.loadItem({item:_584,onItem:function(_589){
_588(_589,_585,_586);
},onError:_586});
return;
}
var _58a=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_587.getValues(_584,this.childrenAttrs[i]);
_58a=_58a.concat(vals);
}
var _58b=0;
if(!this.deferItemLoadingUntilExpand){
dojo.forEach(_58a,function(item){
if(!_587.isItemLoaded(item)){
_58b++;
}
});
}
if(_58b==0){
_585(_58a);
}else{
dojo.forEach(_58a,function(item,idx){
if(!_587.isItemLoaded(item)){
_587.loadItem({item:item,onItem:function(item){
_58a[idx]=item;
if(--_58b==0){
_585(_58a);
}
},onError:_586});
}
});
}
},isItem:function(_58c){
return this.store.isItem(_58c);
},fetchItemByIdentity:function(_58d){
this.store.fetchItemByIdentity(_58d);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_58e,_58f){
var _590={parent:_58e,attribute:this.childrenAttrs[0]},_591;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_58e,true,_58f);
}else{
_591=this.store.newItem(args,_590);
if(_591&&(_58f!=undefined)){
this.pasteItem(_591,_58e,_58e,false,_58f);
}
}
}});
}else{
_591=this.store.newItem(args,_590);
if(_591&&(_58f!=undefined)){
this.pasteItem(_591,_58e,_58e,false,_58f);
}
}
},pasteItem:function(_592,_593,_594,_595,_596){
var _597=this.store,_598=this.childrenAttrs[0];
if(_593){
dojo.forEach(this.childrenAttrs,function(attr){
if(_597.containsValue(_593,attr,_592)){
if(!_595){
var _599=dojo.filter(_597.getValues(_593,attr),function(x){
return x!=_592;
});
_597.setValues(_593,attr,_599);
}
_598=attr;
}
});
}
if(_594){
if(typeof _596=="number"){
var _59a=_597.getValues(_594,_598).slice();
_59a.splice(_596,0,_592);
_597.setValues(_594,_598,_59a);
}else{
_597.setValues(_594,_598,_597.getValues(_594,_598).concat(_592));
}
}
},onChange:function(item){
},onChildrenChange:function(_59b,_59c){
},onDelete:function(_59d,_59e){
},onNewItem:function(item,_59f){
if(!_59f){
return;
}
this.getChildren(_59f.item,dojo.hitch(this,function(_5a0){
this.onChildrenChange(_59f.item,_5a0);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_5a1,_5a2,_5a3){
if(dojo.indexOf(this.childrenAttrs,_5a1)!=-1){
this.getChildren(item,dojo.hitch(this,function(_5a4){
this.onChildrenChange(item,_5a4);
}));
}else{
this.onChange(item);
}
}});
}
if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_5a5){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_5a5&&_5a5.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_5a6){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_5a6);
};
dojo.regexp.group=function(_5a7,_5a8){
return "("+(_5a8?"?:":"")+_5a7+")";
};
}
if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(name,_5a9,_5aa){
var c=document.cookie;
if(arguments.length==1){
var _5ab=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(name)+"=([^;]*)"));
return _5ab?decodeURIComponent(_5ab[1]):undefined;
}else{
_5aa=_5aa||{};
var exp=_5aa.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_5aa.expires=d;
}
if(exp&&exp.toUTCString){
_5aa.expires=exp.toUTCString();
}
_5a9=encodeURIComponent(_5a9);
var _5ac=name+"="+_5a9,_5ad;
for(_5ad in _5aa){
_5ac+="; "+_5ad;
var _5ae=_5aa[_5ad];
if(_5ae!==true){
_5ac+="="+_5ae;
}
}
document.cookie=_5ac;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
if(!dojo._hasResource["dijit.layout.StackController"]){
dojo._hasResource["dijit.layout.StackController"]=true;
dojo.provide("dijit.layout.StackController");
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span role='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",constructor:function(){
this.pane2button={};
this.pane2connects={};
this.pane2watches={};
},buildRendering:function(){
this.inherited(arguments);
dijit.setWaiRole(this.domNode,"tablist");
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
},onStartup:function(info){
dojo.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(dijit.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_5af){
var cls=dojo.getObject(this.buttonWidget);
var _5b0=new cls({id:this.id+"_"+page.id,label:page.title,dir:page.dir,lang:page.lang,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip});
dijit.setWaiState(_5b0.focusNode,"selected","false");
var _5b1=["title","showTitle","iconClass","closable","tooltip"],_5b2=["label","showLabel","iconClass","closeButton","title"];
this.pane2watches[page.id]=dojo.map(_5b1,function(_5b3,idx){
return page.watch(_5b3,function(name,_5b4,_5b5){
_5b0.set(_5b2[idx],_5b5);
});
});
this.pane2connects[page.id]=[this.connect(_5b0,"onClick",dojo.hitch(this,"onButtonClick",page)),this.connect(_5b0,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",page))];
this.addChild(_5b0,_5af);
this.pane2button[page.id]=_5b0;
page.controlButton=_5b0;
if(!this._currentChild){
_5b0.focusNode.setAttribute("tabIndex","0");
dijit.setWaiState(_5b0.focusNode,"selected","true");
this._currentChild=page;
}
if(!this.isLeftToRight()&&dojo.isIE&&this._rectifyRtlTabList){
this._rectifyRtlTabList();
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
dojo.forEach(this.pane2connects[page.id],dojo.hitch(this,"disconnect"));
delete this.pane2connects[page.id];
dojo.forEach(this.pane2watches[page.id],function(w){
w.unwatch();
});
delete this.pane2watches[page.id];
var _5b6=this.pane2button[page.id];
if(_5b6){
this.removeChild(_5b6);
delete this.pane2button[page.id];
_5b6.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _5b7=this.pane2button[this._currentChild.id];
_5b7.set("checked",false);
dijit.setWaiState(_5b7.focusNode,"selected","false");
_5b7.focusNode.setAttribute("tabIndex","-1");
}
var _5b8=this.pane2button[page.id];
_5b8.set("checked",true);
dijit.setWaiState(_5b8.focusNode,"selected","true");
this._currentChild=page;
_5b8.focusNode.setAttribute("tabIndex","0");
var _5b9=dijit.byId(this.containerId);
dijit.setWaiState(_5b9.containerNode,"labelledby",_5b8.id);
},onButtonClick:function(page){
var _5ba=dijit.byId(this.containerId);
_5ba.selectChild(page);
},onCloseButtonClick:function(page){
var _5bb=dijit.byId(this.containerId);
_5bb.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
dijit.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_5bc){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_5bc=!_5bc;
}
var _5bd=this.getChildren();
var _5be=dojo.indexOf(_5bd,this.pane2button[this._currentChild.id]);
var _5bf=_5bc?1:_5bd.length-1;
return _5bd[(_5be+_5bf)%_5bd.length];
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _5c0=null;
if(e.ctrlKey||!e._djpage){
var k=dojo.keys;
switch(e.charOrCode){
case k.LEFT_ARROW:
case k.UP_ARROW:
if(!e._djpage){
_5c0=false;
}
break;
case k.PAGE_UP:
if(e.ctrlKey){
_5c0=false;
}
break;
case k.RIGHT_ARROW:
case k.DOWN_ARROW:
if(!e._djpage){
_5c0=true;
}
break;
case k.PAGE_DOWN:
if(e.ctrlKey){
_5c0=true;
}
break;
case k.HOME:
case k.END:
var _5c1=this.getChildren();
if(_5c1&&_5c1.length){
_5c1[e.charOrCode==k.HOME?0:_5c1.length-1].onClick();
}
dojo.stopEvent(e);
break;
case k.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===k.TAB){
this.adjacent(!e.shiftKey).onClick();
dojo.stopEvent(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
dojo.stopEvent(e);
}
}
}
}
if(_5c0!==null){
this.adjacent(_5c0).onClick();
dojo.stopEvent(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",buildRendering:function(evt){
this.inherited(arguments);
dijit.setWaiRole((this.focusNode||this.domNode),"tab");
},onClick:function(evt){
dijit.focus(this.focusNode);
},onClickCloseButton:function(evt){
evt.stopPropagation();
}});
}
if(!dojo._hasResource["dijit.layout.StackContainer"]){
dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitLayoutContainer");
dijit.setWaiRole(this.containerNode,"tabpanel");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _5c2=this.getChildren();
dojo.forEach(_5c2,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=dijit.byId(dojo.cookie(this.id+"_selectedChild"));
}else{
dojo.some(_5c2,function(_5c3){
if(_5c3.selected){
this.selectedChildWidget=_5c3;
}
return _5c3.selected;
},this);
}
var _5c4=this.selectedChildWidget;
if(!_5c4&&_5c2[0]){
_5c4=this.selectedChildWidget=_5c2[0];
_5c4.selected=true;
}
dojo.publish(this.id+"-startup",[{children:_5c2,selected:_5c4}]);
this.inherited(arguments);
},resize:function(){
var _5c5=this.selectedChildWidget;
if(_5c5&&!this._hasBeenShown){
this._hasBeenShown=true;
this._showChild(_5c5);
}
this.inherited(arguments);
},_setupChild:function(_5c6){
this.inherited(arguments);
dojo.replaceClass(_5c6.domNode,"dijitHidden","dijitVisible");
_5c6.domNode.title="";
},addChild:function(_5c7,_5c8){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-addChild",[_5c7,_5c8]);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_5c7);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
dojo.publish(this.id+"-removeChild",[page]);
}
if(this._beingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _5c9=this.getChildren();
if(_5c9.length){
this.selectChild(_5c9[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_5ca){
page=dijit.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_5ca);
this._set("selectedChildWidget",page);
dojo.publish(this.id+"-selectChild",[page]);
if(this.persist){
dojo.cookie(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return d;
},_transition:function(_5cb,_5cc,_5cd){
if(_5cc){
this._hideChild(_5cc);
}
var d=this._showChild(_5cb);
if(_5cb.resize){
if(this.doLayout){
_5cb.resize(this._containerContentBox||this._contentBox);
}else{
_5cb.resize();
}
}
return d;
},_adjacent:function(_5ce){
var _5cf=this.getChildren();
var _5d0=dojo.indexOf(_5cf,this.selectedChildWidget);
_5d0+=_5ce?1:_5cf.length-1;
return _5cf[_5d0%_5cf.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
dojo.publish(this.id+"-containerKeyPress",[{e:e,page:this}]);
},layout:function(){
if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){
this.selectedChildWidget.resize(this._containerContentBox||this._contentBox);
}
},_showChild:function(page){
var _5d1=this.getChildren();
page.isFirstChild=(page==_5d1[0]);
page.isLastChild=(page==_5d1[_5d1.length-1]);
page._set("selected",true);
dojo.replaceClass(page.domNode,"dijitVisible","dijitHidden");
return page._onShow()||true;
},_hideChild:function(page){
page._set("selected",false);
dojo.replaceClass(page.domNode,"dijitHidden","dijitVisible");
page.onHide();
},closeChild:function(page){
var _5d2=page.onClose(this,page);
if(_5d2){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_5d3){
dojo.forEach(this.getChildren(),function(_5d4){
this.removeChild(_5d4);
_5d4.destroyRecursive(_5d3);
},this);
}});
dojo.extend(dijit._Widget,{selected:false,closable:false,iconClass:"",showTitle:true});
}
if(!dojo._hasResource["dijit.layout._TabContainerBase"]){
dojo._hasResource["dijit.layout._TabContainerBase"]=true;
dojo.provide("dijit.layout._TabContainerBase");
dojo.declare("dijit.layout._TabContainerBase",[dijit.layout.StackContainer,dijit._Templated],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:dojo.cache("dijit.layout","templates/TabContainer.html","<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" dojoAttachPoint=\"tablistNode\"></div>\n\t<div dojoAttachPoint=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"),postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&dojo.style(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
dojo.addClass(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
dojo.addClass(this.domNode,"dijitTabContainerNested");
dojo.addClass(this.tablist.containerNode,"dijitTabContainerTabListNested");
dojo.addClass(this.tablistSpacer,"dijitTabContainerSpacerNested");
dojo.addClass(this.containerNode,"dijitTabPaneWrapperNested");
}else{
dojo.addClass(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
dojo.addClass(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _5d5=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_5d5;
var _5d6=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_5d5},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_5d6);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_5d6[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _5d7=dojo.contentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_5d7});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.layout.TabController"]){
dojo._hasResource["dijit.layout.TabController"]=true;
dojo.provide("dijit.layout.TabController");
dojo.declare("dijit.layout.TabController",dijit.layout.StackController,{templateString:"<div role='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:"dijit.layout._TabButton",_rectifyRtlTabList:function(){
if(0>=this.tabPosition.indexOf("-h")){
return;
}
if(!this.pane2button){
return;
}
var _5d8=0;
for(var pane in this.pane2button){
var ow=this.pane2button[pane].innerDiv.scrollWidth;
_5d8=Math.max(_5d8,ow);
}
for(pane in this.pane2button){
this.pane2button[pane].innerDiv.style.width=_5d8+"px";
}
}});
dojo.declare("dijit.layout._TabButton",dijit.layout._StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:dojo.cache("dijit.layout","templates/_TabButton.html","<div role=\"presentation\" dojoAttachPoint=\"titleNode\" dojoAttachEvent='onclick:onClick'>\n    <div role=\"presentation\" class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\n        <div role=\"presentation\" class='dijitTabContent' dojoAttachPoint='tabContent'>\n        \t<div role=\"presentation\" dojoAttachPoint='focusNode'>\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" dojoAttachPoint='iconNode' />\n\t\t        <span dojoAttachPoint='containerNode' class='tabLabel'></span>\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" dojoAttachPoint='closeNode'\n\t\t        \t\tdojoAttachEvent='onclick: onClickCloseButton' role=\"presentation\">\n\t\t            <span dojoAttachPoint='closeText' class='dijitTabCloseText'>[x]</span\n\t\t        ></span>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n"),scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
setTimeout(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
dojo.toggleClass(this.innerDiv,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _5d9=dojo.i18n.getLocalization("dijit","common");
if(this.closeNode){
dojo.attr(this.closeNode,"title",_5d9.itemClose);
}
var _5d9=dojo.i18n.getLocalization("dijit","common");
this._closeMenu=new dijit.Menu({id:this.id+"_Menu",dir:this.dir,lang:this.lang,targetNodeIds:[this.domNode]});
this._closeMenu.addChild(new dijit.MenuItem({label:_5d9.itemClose,dir:this.dir,lang:this.lang,onClick:dojo.hitch(this,"onClickCloseButton")}));
}else{
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
}
},_setLabelAttr:function(_5da){
this.inherited(arguments);
if(this.showLabel==false&&!this.params.title){
this.iconNode.alt=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},destroy:function(){
if(this._closeMenu){
this._closeMenu.destroyRecursive();
delete this._closeMenu;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.layout.ScrollingTabController"]){
dojo._hasResource["dijit.layout.ScrollingTabController"]=true;
dojo.provide("dijit.layout.ScrollingTabController");
dojo.declare("dijit.layout.ScrollingTabController",dijit.layout.TabController,{templateString:dojo.cache("dijit.layout","templates/ScrollingTabController.html","<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\" containerId=\"${containerId}\" iconClass=\"dijitTabStripMenuIcon\"\n\t\t\tdropDownPosition=\"below-alt, above-alt\"\n\t\t\tdojoAttachPoint=\"_menuBtn\" showLabel=\"false\">&#9660;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\" iconClass=\"dijitTabStripSlideLeftIcon\"\n\t\t\tdojoAttachPoint=\"_leftBtn\" dojoAttachEvent=\"onClick: doSlideLeft\" showLabel=\"false\">&#9664;</div>\n\t<div dojoType=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\" iconClass=\"dijitTabStripSlideRightIcon\"\n\t\t\tdojoAttachPoint=\"_rightBtn\" dojoAttachEvent=\"onClick: doSlideRight\" showLabel=\"false\">&#9654;</div>\n\t<div class='dijitTabListWrapper' dojoAttachPoint='tablistWrapper'>\n\t\t<div role='tablist' dojoAttachEvent='onkeypress:onkeypress'\n\t\t\t\tdojoAttachPoint='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>\n"),useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{"class":"containerNode"}),buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
dojo.addClass(n,"tabStrip-disabled");
}
dojo.addClass(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
dojo.style(this.domNode,"visibility","visible");
this._postStartup=true;
},onAddChild:function(page,_5db){
this.inherited(arguments);
dojo.forEach(["label","iconClass"],function(attr){
this.pane2watches[page.id].push(this.pane2button[page.id].watch(attr,dojo.hitch(this,function(name,_5dc,_5dd){
if(this._postStartup&&this._dim){
this.resize(this._dim);
}
})));
},this);
dojo.style(this.containerNode,"width",(dojo.style(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(page,_5de){
var _5df=this.pane2button[page.id];
if(this._selectedTab===_5df.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=dojo.query("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=dojo._getMarginSize(btn).w;
return true;
}else{
dojo.style(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _5e0=this.getChildren();
if(_5e0.length){
var _5e1=_5e0[this.isLeftToRight()?0:_5e0.length-1].domNode,_5e2=_5e0[this.isLeftToRight()?_5e0.length-1:0].domNode;
return _5e2.offsetLeft+dojo.style(_5e2,"width")-_5e1.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_5e3){
var _5e4=this._getTabsWidth();
_5e3=_5e3||dojo.style(this.scrollNode,"width");
return _5e4>0&&_5e3<_5e4;
},resize:function(dim){
if(this.domNode.offsetWidth==0){
return;
}
this._dim=dim;
this.scrollNode.style.height="auto";
this._contentBox=dijit.layout.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
this._contentBox.h=this.scrollNode.offsetHeight;
dojo.contentBox(this.domNode,this._contentBox);
var _5e5=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_5e5?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
dijit.layout.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var w=this.scrollNode,sl=this._convertToScrollLeft(this._getScrollForSelectedTab());
w.scrollLeft=sl;
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
var sl=(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit)?this.scrollNode.scrollLeft:dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width")+(dojo.isIE==8?-1:1)*this.scrollNode.scrollLeft;
return sl;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||dojo.isIE<8||(dojo.isIE&&dojo.isQuirks)||dojo.isWebKit){
return val;
}else{
var _5e6=dojo.style(this.containerNode,"width")-dojo.style(this.scrollNode,"width");
return (dojo.isIE==8?-1:1)*(val-_5e6);
}
},onSelectChild:function(page){
var tab=this.pane2button[page.id];
if(!tab||!page){
return;
}
var node=tab.domNode;
if(this._postResize&&node!=this._selectedTab){
this._selectedTab=node;
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+dojo.style(this.scrollNode,"width")<node.offsetLeft+dojo.style(node,"width")){
this.createSmoothScroll().play();
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _5e7=this.getChildren(),_5e8=dojo.style(this.scrollNode,"width"),_5e9=dojo.style(this.containerNode,"width"),_5ea=_5e9-_5e8,_5eb=this._getTabsWidth();
if(_5e7.length&&_5eb>_5e8){
return {min:this.isLeftToRight()?0:_5e7[_5e7.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_5e7[_5e7.length-1].domNode.offsetLeft+dojo.style(_5e7[_5e7.length-1].domNode,"width"))-_5e8:_5ea};
}else{
var _5ec=this.isLeftToRight()?0:_5ea;
return {min:_5ec,max:_5ec};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_5ed=dojo.style(this.scrollNode,"width"),_5ee=this._getScrollBounds();
var pos=(n.offsetLeft+dojo.style(n,"width")/2)-_5ed/2;
pos=Math.min(Math.max(pos,_5ee.min),_5ee.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _5ef=this._getScrollBounds();
x=Math.min(Math.max(x,_5ef.min),_5ef.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var self=this,w=this.scrollNode,anim=new dojo._Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var oldS=w.scrollLeft,newS=self._convertToScrollLeft(x);
anim.curve=new dojo._Line(oldS,newS);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=anim;
this._setButtonClass(x);
return anim;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!dojo.hasClass(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_5f0,node){
if(node&&dojo.hasClass(node,"dijitTabDisabled")){
return;
}
var _5f1=dojo.style(this.scrollNode,"width");
var d=(_5f1*0.75)*_5f0;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_5f2){
var _5f3=this._getScrollBounds();
this._leftBtn.set("disabled",_5f2<=_5f3.min);
this._rightBtn.set("disabled",_5f2>=_5f3.max);
}});
dojo.declare("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:dojo.cache("dijit.layout","templates/_ScrollingTabControllerButton.html","<div dojoAttachEvent=\"onclick:_onButtonClick\">\n\t<div role=\"presentation\" class=\"dijitTabInnerDiv\" dojoattachpoint=\"innerDiv,focusNode\">\n\t\t<div role=\"presentation\" class=\"dijitTabContent dijitButtonContents\" dojoattachpoint=\"tabContent\">\n\t\t\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t\t<span dojoAttachPoint=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n\t\t</div>\n\t</div>\n</div>\n"),tabIndex:"",isFocusable:function(){
return false;
}});
dojo.declare("dijit.layout._ScrollingTabControllerButton",[dijit.form.Button,dijit.layout._ScrollingTabControllerButtonMixin]);
dojo.declare("dijit.layout._ScrollingTabControllerMenuButton",[dijit.form.Button,dijit._HasDropDown,dijit.layout._ScrollingTabControllerButtonMixin],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_5f4){
this.dropDown=new dijit.Menu({id:this.containerId+"_menu",dir:this.dir,lang:this.lang});
var _5f5=dijit.byId(this.containerId);
dojo.forEach(_5f5.getChildren(),function(page){
var _5f6=new dijit.MenuItem({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,dir:page.dir,lang:page.lang,onClick:function(){
_5f5.selectChild(page);
}});
this.dropDown.addChild(_5f6);
},this);
_5f4();
},closeDropDown:function(_5f7){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
}
if(!dojo._hasResource["dijit.layout.TabContainer"]){
dojo._hasResource["dijit.layout.TabContainer"]=true;
dojo.provide("dijit.layout.TabContainer");
dojo.declare("dijit.layout.TabContainer",dijit.layout._TabContainerBase,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_5f8){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_5f9=dojo.getObject(this.controllerWidget);
return new _5f9({id:this.id+"_tablist",dir:this.dir,lang:this.lang,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_5f8);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?"dijit.layout.ScrollingTabController":"dijit.layout.TabController";
}
}});
}
if(!dojo._hasResource["dojo.data.util.filter"]){
dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.getObject("data.util.filter",true,dojo);
dojo.data.util.filter.patternToRegExp=function(_5fa,_5fb){
var rxp="^";
var c=null;
for(var i=0;i<_5fa.length;i++){
c=_5fa.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_5fa.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_5fb){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
}
if(!dojo._hasResource["dojo.data.util.sorter"]){
dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.getObject("data.util.sorter",true,dojo);
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_5fc,_5fd){
var _5fe=[];
function _5ff(attr,dir,comp,s){
return function(_600,_601){
var a=s.getValue(_600,attr);
var b=s.getValue(_601,attr);
return dir*comp(a,b);
};
};
var _602;
var map=_5fd.comparatorMap;
var bc=dojo.data.util.sorter.basicComparator;
for(var i=0;i<_5fc.length;i++){
_602=_5fc[i];
var attr=_602.attribute;
if(attr){
var dir=(_602.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_5fe.push(_5ff(attr,dir,comp,_5fd));
}
}
return function(rowA,rowB){
var i=0;
while(i<_5fe.length){
var ret=_5fe[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
}
if(!dojo._hasResource["dojo.data.util.simpleFetch"]){
dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.getObject("data.util.simpleFetch",true,dojo);
dojo.data.util.simpleFetch.fetch=function(_603){
_603=_603||{};
if(!_603.store){
_603.store=this;
}
var self=this;
var _604=function(_605,_606){
if(_606.onError){
var _607=_606.scope||dojo.global;
_606.onError.call(_607,_605,_606);
}
};
var _608=function(_609,_60a){
var _60b=_60a.abort||null;
var _60c=false;
var _60d=_60a.start?_60a.start:0;
var _60e=(_60a.count&&(_60a.count!==Infinity))?(_60d+_60a.count):_609.length;
_60a.abort=function(){
_60c=true;
if(_60b){
_60b.call(_60a);
}
};
var _60f=_60a.scope||dojo.global;
if(!_60a.store){
_60a.store=self;
}
if(_60a.onBegin){
_60a.onBegin.call(_60f,_609.length,_60a);
}
if(_60a.sort){
_609.sort(dojo.data.util.sorter.createSortFunction(_60a.sort,self));
}
if(_60a.onItem){
for(var i=_60d;(i<_609.length)&&(i<_60e);++i){
var item=_609[i];
if(!_60c){
_60a.onItem.call(_60f,item,_60a);
}
}
}
if(_60a.onComplete&&!_60c){
var _610=null;
if(!_60a.onItem){
_610=_609.slice(_60d,_60e);
}
_60a.onComplete.call(_60f,_610,_60a);
}
};
this._fetchItems(_603,_608,_604);
return _603;
};
}
if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){
dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(_611){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_611.url;
this._ccUrl=_611.url;
this.url=_611.url;
this._jsonData=_611.data;
this.data=null;
this._datatypeMap=_611.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_612){
return dojo.date.stamp.fromISOString(_612);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_611.urlPreventCache!==undefined){
this.urlPreventCache=_611.urlPreventCache?true:false;
}
if(_611.hierarchical!==undefined){
this.hierarchical=_611.hierarchical?true:false;
}
if(_611.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _611){
this.failOk=_611.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_613){
if(typeof _613!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(item,_614,_615){
var _616=this.getValues(item,_614);
return (_616.length>0)?_616[0]:_615;
},getValues:function(item,_617){
this._assertIsItem(item);
this._assertIsAttribute(_617);
return (item[_617]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _618=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_618.push(key);
}
}
return _618;
},hasAttribute:function(item,_619){
this._assertIsItem(item);
this._assertIsAttribute(_619);
return (_619 in item);
},containsValue:function(item,_61a,_61b){
var _61c=undefined;
if(typeof _61b==="string"){
_61c=dojo.data.util.filter.patternToRegExp(_61b,false);
}
return this._containsValue(item,_61a,_61b,_61c);
},_containsValue:function(item,_61d,_61e,_61f){
return dojo.some(this.getValues(item,_61d),function(_620){
if(_620!==null&&!dojo.isObject(_620)&&_61f){
if(_620.toString().match(_61f)){
return true;
}
}else{
if(_61e===_620){
return true;
}
}
});
},isItem:function(_621){
if(_621&&_621[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_621[this._itemNumPropName]]===_621){
return true;
}
}
return false;
},isItemLoaded:function(_622){
return this.isItem(_622);
},loadItem:function(_623){
this._assertIsItem(_623.item);
},getFeatures:function(){
return this._features;
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_fetchItems:function(_624,_625,_626){
var self=this,_627=function(_628,_629){
var _62a=[],i,key;
if(_628.query){
var _62b,_62c=_628.queryOptions?_628.queryOptions.ignoreCase:false;
var _62d={};
for(key in _628.query){
_62b=_628.query[key];
if(typeof _62b==="string"){
_62d[key]=dojo.data.util.filter.patternToRegExp(_62b,_62c);
}else{
if(_62b instanceof RegExp){
_62d[key]=_62b;
}
}
}
for(i=0;i<_629.length;++i){
var _62e=true;
var _62f=_629[i];
if(_62f===null){
_62e=false;
}else{
for(key in _628.query){
_62b=_628.query[key];
if(!self._containsValue(_62f,key,_62b,_62d[key])){
_62e=false;
}
}
}
if(_62e){
_62a.push(_62f);
}
}
_625(_62a,_628);
}else{
for(i=0;i<_629.length;++i){
var item=_629[i];
if(item!==null){
_62a.push(item);
}
}
_625(_62a,_628);
}
};
if(this._loadFinished){
_627(_624,this._getItemsArray(_624.queryOptions));
}else{
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_624,filter:_627});
}else{
this._loadInProgress=true;
var _630={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _631=dojo.xhrGet(_630);
_631.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
_627(_624,self._getItemsArray(_624.queryOptions));
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_626(e,_624);
}
});
_631.addErrback(function(_632){
self._loadInProgress=false;
_626(_632,_624);
});
var _633=null;
if(_624.abort){
_633=_624.abort;
}
_624.abort=function(){
var df=_631;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_633){
_633.call(_624);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_627(_624,this._getItemsArray(_624.queryOptions));
}
catch(e){
_626(e,_624);
}
}else{
_626(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_624);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _634=this._queuedFetches[i],_635=_634.args,_636=_634.filter;
if(_636){
_636(_635,this._getItemsArray(_635.queryOptions));
}else{
this.fetchItemByIdentity(_635);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_637){
if(_637&&_637.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_638){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_639){
var _63a=false,self=this;
function _63b(_63c){
var _63d=((_63c!==null)&&(typeof _63c==="object")&&(!dojo.isArray(_63c)||_63a)&&(!dojo.isFunction(_63c))&&(_63c.constructor==Object||dojo.isArray(_63c))&&(typeof _63c._reference==="undefined")&&(typeof _63c._type==="undefined")&&(typeof _63c._value==="undefined")&&self.hierarchical);
return _63d;
};
function _63e(_63f){
self._arrayOfAllItems.push(_63f);
for(var _640 in _63f){
var _641=_63f[_640];
if(_641){
if(dojo.isArray(_641)){
var _642=_641;
for(var k=0;k<_642.length;++k){
var _643=_642[k];
if(_63b(_643)){
_63e(_643);
}
}
}else{
if(_63b(_641)){
_63e(_641);
}
}
}
}
};
this._labelAttr=_639.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_639.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(dojo.isArray(item)){
_63a=true;
}
_63e(item);
item[this._rootItemPropName]=true;
}
var _644={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _645=item[key];
if(_645!==null){
if(!dojo.isArray(_645)){
item[key]=[_645];
}
}else{
item[key]=[null];
}
}
_644[key]=key;
}
}
while(_644[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_644[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_644[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _646;
var _647=_639.identifier;
if(_647){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_647;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_646=item[_647];
var _648=_646[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_648)){
this._itemsByIdentity[_648]=item;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_647+"].  Value collided: ["+_648+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_647+"].  Value collided: ["+_648+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
_646=item[key];
for(var j=0;j<_646.length;++j){
_645=_646[j];
if(_645!==null&&typeof _645=="object"){
if(("_type" in _645)&&("_value" in _645)){
var type=_645._type;
var _649=this._datatypeMap[type];
if(!_649){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(dojo.isFunction(_649)){
_646[j]=new _649(_645._value);
}else{
if(dojo.isFunction(_649.deserialize)){
_646[j]=_649.deserialize(_645._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_645._reference){
var _64a=_645._reference;
if(!dojo.isObject(_64a)){
_646[j]=this._getItemByIdentity(_64a);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _64b=this._arrayOfAllItems[k],_64c=true;
for(var _64d in _64a){
if(_64b[_64d]!=_64a[_64d]){
_64c=false;
}
}
if(_64c){
_646[j]=_64b;
}
}
}
if(this.referenceIntegrity){
var _64e=_646[j];
if(this.isItem(_64e)){
this._addReferenceToMap(_64e,item,key);
}
}
}else{
if(this.isItem(_645)){
if(this.referenceIntegrity){
this._addReferenceToMap(_645,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_64f,_650,_651){
},getIdentity:function(item){
var _652=this._features["dojo.data.api.Identity"];
if(_652===Number){
return item[this._itemNumPropName];
}else{
var _653=item[_652];
if(_653){
return _653[0];
}
}
return null;
},fetchItemByIdentity:function(_654){
var item,_655;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_654});
}else{
this._loadInProgress=true;
var _656={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _657=dojo.xhrGet(_656);
_657.addCallback(function(data){
var _658=_654.scope?_654.scope:dojo.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_654.identity);
if(_654.onItem){
_654.onItem.call(_658,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_654.onError){
_654.onError.call(_658,error);
}
}
});
_657.addErrback(function(_659){
self._loadInProgress=false;
if(_654.onError){
var _65a=_654.scope?_654.scope:dojo.global;
_654.onError.call(_65a,_659);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_654.identity);
if(_654.onItem){
_655=_654.scope?_654.scope:dojo.global;
_654.onItem.call(_655,item);
}
}
}
}else{
item=this._getItemByIdentity(_654.identity);
if(_654.onItem){
_655=_654.scope?_654.scope:dojo.global;
_654.onItem.call(_655,item);
}
}
},_getItemByIdentity:function(_65b){
var item=null;
if(this._itemsByIdentity&&Object.hasOwnProperty.call(this._itemsByIdentity,_65b)){
item=this._itemsByIdentity[_65b];
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_65b)){
item=this._arrayOfAllItems[_65b];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _65c=this._features["dojo.data.api.Identity"];
if(_65c===Number){
return null;
}else{
return [_65c];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
dojo.deprecated("dojo.data.ItemFileReadStore: ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _65d={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _65e=dojo.xhrGet(_65d);
_65e.addCallback(function(data){
try{
if(self._loadInProgress!==true&&!self._loadFinished){
self._getItemsFromLoadedData(data);
self._loadFinished=true;
}else{
if(self._loadInProgress){
throw new Error("dojo.data.ItemFileReadStore:  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
throw e;
}
});
_65e.addErrback(function(_65f){
throw _65f;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){
dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(_660){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(obj){
return dojo.date.stamp.toISOString(obj,{zulu:true});
};
}
if(_660&&(_660.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_661){
if(!_661){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
var _662=this.getFeatures()["dojo.data.api.Identity"];
return _662;
},newItem:function(_663,_664){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _663!="object"&&typeof _663!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _665=null;
var _666=this._getIdentifierAttribute();
if(_666===Number){
_665=this._arrayOfAllItems.length;
}else{
_665=_663[_666];
if(typeof _665==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(dojo.isArray(_665)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_665]==="undefined");
}
this._assert(typeof this._pending._newItems[_665]==="undefined");
this._assert(typeof this._pending._deletedItems[_665]==="undefined");
var _667={};
_667[this._storeRefPropName]=this;
_667[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_665]=_667;
_667[_666]=[_665];
}
this._arrayOfAllItems.push(_667);
var _668=null;
if(_664&&_664.parent&&_664.attribute){
_668={item:_664.parent,attribute:_664.attribute,oldValue:undefined};
var _669=this.getValues(_664.parent,_664.attribute);
if(_669&&_669.length>0){
var _66a=_669.slice(0,_669.length);
if(_669.length===1){
_668.oldValue=_669[0];
}else{
_668.oldValue=_669.slice(0,_669.length);
}
_66a.push(_667);
this._setValueOrValues(_664.parent,_664.attribute,_66a,false);
_668.newValue=this.getValues(_664.parent,_664.attribute);
}else{
this._setValueOrValues(_664.parent,_664.attribute,_667,false);
_668.newValue=_667;
}
}else{
_667[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_667);
}
this._pending._newItems[_665]=_667;
for(var key in _663){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _66b=_663[key];
if(!dojo.isArray(_66b)){
_66b=[_66b];
}
_667[key]=_66b;
if(this.referenceIntegrity){
for(var i=0;i<_66b.length;i++){
var val=_66b[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_667,key);
}
}
}
}
this.onNew(_667,_668);
return _667;
},_removeArrayElement:function(_66c,_66d){
var _66e=dojo.indexOf(_66c,_66d);
if(_66e!=-1){
_66c.splice(_66e,1);
return true;
}
return false;
},deleteItem:function(item){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
var _66f=item[this._itemNumPropName];
var _670=this.getIdentity(item);
if(this.referenceIntegrity){
var _671=this.getAttributes(item);
if(item[this._reverseRefMap]){
item["backup_"+this._reverseRefMap]=dojo.clone(item[this._reverseRefMap]);
}
dojo.forEach(_671,function(_672){
dojo.forEach(this.getValues(item,_672),function(_673){
if(this.isItem(_673)){
if(!item["backupRefs_"+this._reverseRefMap]){
item["backupRefs_"+this._reverseRefMap]=[];
}
item["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_673),attr:_672});
this._removeReferenceFromMap(_673,item,_672);
}
},this);
},this);
var _674=item[this._reverseRefMap];
if(_674){
for(var _675 in _674){
var _676=null;
if(this._itemsByIdentity){
_676=this._itemsByIdentity[_675];
}else{
_676=this._arrayOfAllItems[_675];
}
if(_676){
for(var _677 in _674[_675]){
var _678=this.getValues(_676,_677)||[];
var _679=dojo.filter(_678,function(_67a){
return !(this.isItem(_67a)&&this.getIdentity(_67a)==_670);
},this);
this._removeReferenceFromMap(item,_676,_677);
if(_679.length<_678.length){
this._setValueOrValues(_676,_677,_679,true);
}
}
}
}
}
}
this._arrayOfAllItems[_66f]=null;
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_670];
}
this._pending._deletedItems[_670]=item;
if(item[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,item);
}
this.onDelete(item);
return true;
},setValue:function(item,_67b,_67c){
return this._setValueOrValues(item,_67b,_67c,true);
},setValues:function(item,_67d,_67e){
return this._setValueOrValues(item,_67d,_67e,true);
},unsetAttribute:function(item,_67f){
return this._setValueOrValues(item,_67f,[],true);
},_setValueOrValues:function(item,_680,_681,_682){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(dojo.isString(_680));
this._assert(typeof _681!=="undefined");
var _683=this._getIdentifierAttribute();
if(_680==_683){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _684=this._getValueOrValues(item,_680);
var _685=this.getIdentity(item);
if(!this._pending._modifiedItems[_685]){
var _686={};
for(var key in item){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_686[key]=item[key];
}else{
if(key===this._reverseRefMap){
_686[key]=dojo.clone(item[key]);
}else{
_686[key]=item[key].slice(0,item[key].length);
}
}
}
this._pending._modifiedItems[_685]=_686;
}
var _687=false;
if(dojo.isArray(_681)&&_681.length===0){
_687=delete item[_680];
_681=undefined;
if(this.referenceIntegrity&&_684){
var _688=_684;
if(!dojo.isArray(_688)){
_688=[_688];
}
for(var i=0;i<_688.length;i++){
var _689=_688[i];
if(this.isItem(_689)){
this._removeReferenceFromMap(_689,item,_680);
}
}
}
}else{
var _68a;
if(dojo.isArray(_681)){
var _68b=_681;
_68a=_681.slice(0,_681.length);
}else{
_68a=[_681];
}
if(this.referenceIntegrity){
if(_684){
var _688=_684;
if(!dojo.isArray(_688)){
_688=[_688];
}
var map={};
dojo.forEach(_688,function(_68c){
if(this.isItem(_68c)){
var id=this.getIdentity(_68c);
map[id.toString()]=true;
}
},this);
dojo.forEach(_68a,function(_68d){
if(this.isItem(_68d)){
var id=this.getIdentity(_68d);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_68d,item,_680);
}
}
},this);
for(var rId in map){
var _68e;
if(this._itemsByIdentity){
_68e=this._itemsByIdentity[rId];
}else{
_68e=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_68e,item,_680);
}
}else{
for(var i=0;i<_68a.length;i++){
var _689=_68a[i];
if(this.isItem(_689)){
this._addReferenceToMap(_689,item,_680);
}
}
}
}
item[_680]=_68a;
_687=true;
}
if(_682){
this.onSet(item,_680,_684,_681);
}
return _687;
},_addReferenceToMap:function(_68f,_690,_691){
var _692=this.getIdentity(_690);
var _693=_68f[this._reverseRefMap];
if(!_693){
_693=_68f[this._reverseRefMap]={};
}
var _694=_693[_692];
if(!_694){
_694=_693[_692]={};
}
_694[_691]=true;
},_removeReferenceFromMap:function(_695,_696,_697){
var _698=this.getIdentity(_696);
var _699=_695[this._reverseRefMap];
var _69a;
if(_699){
for(_69a in _699){
if(_69a==_698){
delete _699[_69a][_697];
if(this._isEmpty(_699[_69a])){
delete _699[_69a];
}
}
}
if(this._isEmpty(_699)){
delete _695[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var item=this._arrayOfAllItems[i];
if(item&&item[this._reverseRefMap]){
}
}
},_getValueOrValues:function(item,_69b){
var _69c=undefined;
if(this.hasAttribute(item,_69b)){
var _69d=this.getValues(item,_69b);
if(_69d.length==1){
_69c=_69d[0];
}else{
_69c=_69d;
}
}
return _69c;
},_flatten:function(_69e){
if(this.isItem(_69e)){
var item=_69e;
var _69f=this.getIdentity(item);
var _6a0={_reference:_69f};
return _6a0;
}else{
if(typeof _69e==="object"){
for(var type in this._datatypeMap){
var _6a1=this._datatypeMap[type];
if(dojo.isObject(_6a1)&&!dojo.isFunction(_6a1)){
if(_69e instanceof _6a1.type){
if(!_6a1.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]");
}
return {_type:type,_value:_6a1.serialize(_69e)};
}
}else{
if(_69e instanceof _6a1){
return {_type:type,_value:_69e.toString()};
}
}
}
}
return _69e;
}
},_getNewFileContentString:function(){
var _6a2={};
var _6a3=this._getIdentifierAttribute();
if(_6a3!==Number){
_6a2.identifier=_6a3;
}
if(this._labelAttr){
_6a2.label=this._labelAttr;
}
_6a2.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var item=this._arrayOfAllItems[i];
if(item!==null){
var _6a4={};
for(var key in item){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _6a5=key;
var _6a6=this.getValues(item,_6a5);
if(_6a6.length==1){
_6a4[_6a5]=this._flatten(_6a6[0]);
}else{
var _6a7=[];
for(var j=0;j<_6a6.length;++j){
_6a7.push(this._flatten(_6a6[j]));
_6a4[_6a5]=_6a7;
}
}
}
}
_6a2.items.push(_6a4);
}
}
var _6a8=true;
return dojo.toJson(_6a2,_6a8);
},_isEmpty:function(_6a9){
var _6aa=true;
if(dojo.isObject(_6a9)){
var i;
for(i in _6a9){
_6aa=false;
break;
}
}else{
if(dojo.isArray(_6a9)){
if(_6a9.length>0){
_6aa=false;
}
}
}
return _6aa;
},save:function(_6ab){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var _6ac=function(){
self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(_6ab&&_6ab.onComplete){
var _6ad=_6ab.scope||dojo.global;
_6ab.onComplete.call(_6ad);
}
};
var _6ae=function(err){
self._saveInProgress=false;
if(_6ab&&_6ab.onError){
var _6af=_6ab.scope||dojo.global;
_6ab.onError.call(_6af,err);
}
};
if(this._saveEverything){
var _6b0=this._getNewFileContentString();
this._saveEverything(_6ac,_6ae,_6b0);
}
if(this._saveCustom){
this._saveCustom(_6ac,_6ae);
}
if(!this._saveEverything&&!this._saveCustom){
_6ac();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _6b1;
for(_6b1 in this._pending._modifiedItems){
var _6b2=this._pending._modifiedItems[_6b1];
var _6b3=null;
if(this._itemsByIdentity){
_6b3=this._itemsByIdentity[_6b1];
}else{
_6b3=this._arrayOfAllItems[_6b1];
}
_6b2[this._storeRefPropName]=this;
for(key in _6b3){
delete _6b3[key];
}
dojo.mixin(_6b3,_6b2);
}
var _6b4;
for(_6b1 in this._pending._deletedItems){
_6b4=this._pending._deletedItems[_6b1];
_6b4[this._storeRefPropName]=this;
var _6b5=_6b4[this._itemNumPropName];
if(_6b4["backup_"+this._reverseRefMap]){
_6b4[this._reverseRefMap]=_6b4["backup_"+this._reverseRefMap];
delete _6b4["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_6b5]=_6b4;
if(this._itemsByIdentity){
this._itemsByIdentity[_6b1]=_6b4;
}
if(_6b4[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_6b4);
}
}
for(_6b1 in this._pending._deletedItems){
_6b4=this._pending._deletedItems[_6b1];
if(_6b4["backupRefs_"+this._reverseRefMap]){
dojo.forEach(_6b4["backupRefs_"+this._reverseRefMap],function(_6b6){
var _6b7;
if(this._itemsByIdentity){
_6b7=this._itemsByIdentity[_6b6.id];
}else{
_6b7=this._arrayOfAllItems[_6b6.id];
}
this._addReferenceToMap(_6b7,_6b4,_6b6.attr);
},this);
delete _6b4["backupRefs_"+this._reverseRefMap];
}
}
for(_6b1 in this._pending._newItems){
var _6b8=this._pending._newItems[_6b1];
_6b8[this._storeRefPropName]=null;
this._arrayOfAllItems[_6b8[this._itemNumPropName]]=null;
if(_6b8[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_6b8);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_6b1];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(item){
if(item){
var _6b9=this.getIdentity(item);
return new Boolean(this._pending._newItems[_6b9]||this._pending._modifiedItems[_6b9]||this._pending._deletedItems[_6b9]).valueOf();
}else{
if(!this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems)){
return true;
}
return false;
}
},onSet:function(item,_6ba,_6bb,_6bc){
},onNew:function(_6bd,_6be){
},onDelete:function(_6bf){
},close:function(_6c0){
if(this.clearOnClose){
if(!this.isDirty()){
this.inherited(arguments);
}else{
throw new Error("dojo.data.ItemFileWriteStore: There are unsaved changes present in the store.  Please save or revert the changes before invoking close.");
}
}
}});
}
if(!dojo._hasResource["dojox.charting.scaler.common"]){
dojo._hasResource["dojox.charting.scaler.common"]=true;
dojo.provide("dojox.charting.scaler.common");
(function(){
var eq=function(a,b){
return Math.abs(a-b)<=0.000001*(Math.abs(a)+Math.abs(b));
};
dojo.mixin(dojox.charting.scaler.common,{findString:function(val,text){
val=val.toLowerCase();
for(var i=0;i<text.length;++i){
if(val==text[i]){
return true;
}
}
return false;
},getNumericLabel:function(_6c1,_6c2,_6c3){
var def="";
if(dojo.number){
def=(_6c3.fixed?dojo.number.format(_6c1,{places:_6c2<0?-_6c2:0}):dojo.number.format(_6c1))||"";
}else{
def=_6c3.fixed?_6c1.toFixed(_6c2<0?-_6c2:0):_6c1.toString();
}
if(_6c3.labelFunc){
var r=_6c3.labelFunc(def,_6c1,_6c2);
if(r){
return r;
}
}
if(_6c3.labels){
var l=_6c3.labels,lo=0,hi=l.length;
while(lo<hi){
var mid=Math.floor((lo+hi)/2),val=l[mid].value;
if(val<_6c1){
lo=mid+1;
}else{
hi=mid;
}
}
if(lo<l.length&&eq(l[lo].value,_6c1)){
return l[lo].text;
}
--lo;
if(lo>=0&&lo<l.length&&eq(l[lo].value,_6c1)){
return l[lo].text;
}
lo+=2;
if(lo<l.length&&eq(l[lo].value,_6c1)){
return l[lo].text;
}
}
return def;
}});
})();
}
if(!dojo._hasResource["dojox.charting.scaler.linear"]){
dojo._hasResource["dojox.charting.scaler.linear"]=true;
dojo.provide("dojox.charting.scaler.linear");
(function(){
var _6c4=3,dc=dojox.charting,dcs=dc.scaler,dcsc=dcs.common,_6c5=dcsc.findString,_6c6=dcsc.getNumericLabel;
var _6c7=function(min,max,_6c8,_6c9,_6ca,_6cb,span){
_6c8=dojo.delegate(_6c8);
if(!_6c9){
if(_6c8.fixUpper=="major"){
_6c8.fixUpper="minor";
}
if(_6c8.fixLower=="major"){
_6c8.fixLower="minor";
}
}
if(!_6ca){
if(_6c8.fixUpper=="minor"){
_6c8.fixUpper="micro";
}
if(_6c8.fixLower=="minor"){
_6c8.fixLower="micro";
}
}
if(!_6cb){
if(_6c8.fixUpper=="micro"){
_6c8.fixUpper="none";
}
if(_6c8.fixLower=="micro"){
_6c8.fixLower="none";
}
}
var _6cc=_6c5(_6c8.fixLower,["major"])?Math.floor(_6c8.min/_6c9)*_6c9:_6c5(_6c8.fixLower,["minor"])?Math.floor(_6c8.min/_6ca)*_6ca:_6c5(_6c8.fixLower,["micro"])?Math.floor(_6c8.min/_6cb)*_6cb:_6c8.min,_6cd=_6c5(_6c8.fixUpper,["major"])?Math.ceil(_6c8.max/_6c9)*_6c9:_6c5(_6c8.fixUpper,["minor"])?Math.ceil(_6c8.max/_6ca)*_6ca:_6c5(_6c8.fixUpper,["micro"])?Math.ceil(_6c8.max/_6cb)*_6cb:_6c8.max;
if(_6c8.useMin){
min=_6cc;
}
if(_6c8.useMax){
max=_6cd;
}
var _6ce=(!_6c9||_6c8.useMin&&_6c5(_6c8.fixLower,["major"]))?min:Math.ceil(min/_6c9)*_6c9,_6cf=(!_6ca||_6c8.useMin&&_6c5(_6c8.fixLower,["major","minor"]))?min:Math.ceil(min/_6ca)*_6ca,_6d0=(!_6cb||_6c8.useMin&&_6c5(_6c8.fixLower,["major","minor","micro"]))?min:Math.ceil(min/_6cb)*_6cb,_6d1=!_6c9?0:(_6c8.useMax&&_6c5(_6c8.fixUpper,["major"])?Math.round((max-_6ce)/_6c9):Math.floor((max-_6ce)/_6c9))+1,_6d2=!_6ca?0:(_6c8.useMax&&_6c5(_6c8.fixUpper,["major","minor"])?Math.round((max-_6cf)/_6ca):Math.floor((max-_6cf)/_6ca))+1,_6d3=!_6cb?0:(_6c8.useMax&&_6c5(_6c8.fixUpper,["major","minor","micro"])?Math.round((max-_6d0)/_6cb):Math.floor((max-_6d0)/_6cb))+1,_6d4=_6ca?Math.round(_6c9/_6ca):0,_6d5=_6cb?Math.round(_6ca/_6cb):0,_6d6=_6c9?Math.floor(Math.log(_6c9)/Math.LN10):0,_6d7=_6ca?Math.floor(Math.log(_6ca)/Math.LN10):0,_6d8=span/(max-min);
if(!isFinite(_6d8)){
_6d8=1;
}
return {bounds:{lower:_6cc,upper:_6cd,from:min,to:max,scale:_6d8,span:span},major:{tick:_6c9,start:_6ce,count:_6d1,prec:_6d6},minor:{tick:_6ca,start:_6cf,count:_6d2,prec:_6d7},micro:{tick:_6cb,start:_6d0,count:_6d3,prec:0},minorPerMajor:_6d4,microPerMinor:_6d5,scaler:dcs.linear};
};
dojo.mixin(dojox.charting.scaler.linear,{buildScaler:function(min,max,span,_6d9){
var h={fixUpper:"none",fixLower:"none",natural:false};
if(_6d9){
if("fixUpper" in _6d9){
h.fixUpper=String(_6d9.fixUpper);
}
if("fixLower" in _6d9){
h.fixLower=String(_6d9.fixLower);
}
if("natural" in _6d9){
h.natural=Boolean(_6d9.natural);
}
}
if("min" in _6d9){
min=_6d9.min;
}
if("max" in _6d9){
max=_6d9.max;
}
if(_6d9.includeZero){
if(min>0){
min=0;
}
if(max<0){
max=0;
}
}
h.min=min;
h.useMin=true;
h.max=max;
h.useMax=true;
if("from" in _6d9){
min=_6d9.from;
h.useMin=false;
}
if("to" in _6d9){
max=_6d9.to;
h.useMax=false;
}
if(max<=min){
return _6c7(min,max,h,0,0,0,span);
}
var mag=Math.floor(Math.log(max-min)/Math.LN10),_6da=_6d9&&("majorTickStep" in _6d9)?_6d9.majorTickStep:Math.pow(10,mag),_6db=0,_6dc=0,_6dd;
if(_6d9&&("minorTickStep" in _6d9)){
_6db=_6d9.minorTickStep;
}else{
do{
_6db=_6da/10;
if(!h.natural||_6db>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,0,span);
if(_6dd.bounds.scale*_6dd.minor.tick>_6c4){
break;
}
}
_6db=_6da/5;
if(!h.natural||_6db>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,0,span);
if(_6dd.bounds.scale*_6dd.minor.tick>_6c4){
break;
}
}
_6db=_6da/2;
if(!h.natural||_6db>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,0,span);
if(_6dd.bounds.scale*_6dd.minor.tick>_6c4){
break;
}
}
return _6c7(min,max,h,_6da,0,0,span);
}while(false);
}
if(_6d9&&("microTickStep" in _6d9)){
_6dc=_6d9.microTickStep;
_6dd=_6c7(min,max,h,_6da,_6db,_6dc,span);
}else{
do{
_6dc=_6db/10;
if(!h.natural||_6dc>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,_6dc,span);
if(_6dd.bounds.scale*_6dd.micro.tick>_6c4){
break;
}
}
_6dc=_6db/5;
if(!h.natural||_6dc>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,_6dc,span);
if(_6dd.bounds.scale*_6dd.micro.tick>_6c4){
break;
}
}
_6dc=_6db/2;
if(!h.natural||_6dc>0.9){
_6dd=_6c7(min,max,h,_6da,_6db,_6dc,span);
if(_6dd.bounds.scale*_6dd.micro.tick>_6c4){
break;
}
}
_6dc=0;
}while(false);
}
return _6dc?_6dd:_6c7(min,max,h,_6da,_6db,0,span);
},buildTicks:function(_6de,_6df){
var step,next,tick,_6e0=_6de.major.start,_6e1=_6de.minor.start,_6e2=_6de.micro.start;
if(_6df.microTicks&&_6de.micro.tick){
step=_6de.micro.tick,next=_6e2;
}else{
if(_6df.minorTicks&&_6de.minor.tick){
step=_6de.minor.tick,next=_6e1;
}else{
if(_6de.major.tick){
step=_6de.major.tick,next=_6e0;
}else{
return null;
}
}
}
var _6e3=1/_6de.bounds.scale;
if(_6de.bounds.to<=_6de.bounds.from||isNaN(_6e3)||!isFinite(_6e3)||step<=0||isNaN(step)||!isFinite(step)){
return null;
}
var _6e4=[],_6e5=[],_6e6=[];
while(next<=_6de.bounds.to+_6e3){
if(Math.abs(_6e0-next)<step/2){
tick={value:_6e0};
if(_6df.majorLabels){
tick.label=_6c6(_6e0,_6de.major.prec,_6df);
}
_6e4.push(tick);
_6e0+=_6de.major.tick;
_6e1+=_6de.minor.tick;
_6e2+=_6de.micro.tick;
}else{
if(Math.abs(_6e1-next)<step/2){
if(_6df.minorTicks){
tick={value:_6e1};
if(_6df.minorLabels&&(_6de.minMinorStep<=_6de.minor.tick*_6de.bounds.scale)){
tick.label=_6c6(_6e1,_6de.minor.prec,_6df);
}
_6e5.push(tick);
}
_6e1+=_6de.minor.tick;
_6e2+=_6de.micro.tick;
}else{
if(_6df.microTicks){
_6e6.push({value:_6e2});
}
_6e2+=_6de.micro.tick;
}
}
next+=step;
}
return {major:_6e4,minor:_6e5,micro:_6e6};
},getTransformerFromModel:function(_6e7){
var _6e8=_6e7.bounds.from,_6e9=_6e7.bounds.scale;
return function(x){
return (x-_6e8)*_6e9;
};
},getTransformerFromPlot:function(_6ea){
var _6eb=_6ea.bounds.from,_6ec=_6ea.bounds.scale;
return function(x){
return x/_6ec+_6eb;
};
}});
})();
}
if(!dojo._hasResource["dojox.gfx.matrix"]){
dojo._hasResource["dojox.gfx.matrix"]=true;
dojo.provide("dojox.gfx.matrix");
(function(){
var m=dojox.gfx.matrix;
var _6ed={};
m._degToRad=function(_6ee){
return _6ed[_6ee]||(_6ed[_6ee]=(Math.PI*_6ee/180));
};
m._radToDeg=function(_6ef){
return _6ef/Math.PI*180;
};
m.Matrix2D=function(arg){
if(arg){
if(typeof arg=="number"){
this.xx=this.yy=arg;
}else{
if(arg instanceof Array){
if(arg.length>0){
var _6f0=m.normalize(arg[0]);
for(var i=1;i<arg.length;++i){
var l=_6f0,r=dojox.gfx.matrix.normalize(arg[i]);
_6f0=new m.Matrix2D();
_6f0.xx=l.xx*r.xx+l.xy*r.yx;
_6f0.xy=l.xx*r.xy+l.xy*r.yy;
_6f0.yx=l.yx*r.xx+l.yy*r.yx;
_6f0.yy=l.yx*r.xy+l.yy*r.yy;
_6f0.dx=l.xx*r.dx+l.xy*r.dy+l.dx;
_6f0.dy=l.yx*r.dx+l.yy*r.dy+l.dy;
}
dojo.mixin(this,_6f0);
}
}else{
dojo.mixin(this,arg);
}
}
}
};
dojo.extend(m.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
dojo.mixin(m,{identity:new m.Matrix2D(),flipX:new m.Matrix2D({xx:-1}),flipY:new m.Matrix2D({yy:-1}),flipXY:new m.Matrix2D({xx:-1,yy:-1}),translate:function(a,b){
if(arguments.length>1){
return new m.Matrix2D({dx:a,dy:b});
}
return new m.Matrix2D({dx:a.x,dy:a.y});
},scale:function(a,b){
if(arguments.length>1){
return new m.Matrix2D({xx:a,yy:b});
}
if(typeof a=="number"){
return new m.Matrix2D({xx:a,yy:a});
}
return new m.Matrix2D({xx:a.x,yy:a.y});
},rotate:function(_6f1){
var c=Math.cos(_6f1);
var s=Math.sin(_6f1);
return new m.Matrix2D({xx:c,xy:-s,yx:s,yy:c});
},rotateg:function(_6f2){
return m.rotate(m._degToRad(_6f2));
},skewX:function(_6f3){
return new m.Matrix2D({xy:Math.tan(_6f3)});
},skewXg:function(_6f4){
return m.skewX(m._degToRad(_6f4));
},skewY:function(_6f5){
return new m.Matrix2D({yx:Math.tan(_6f5)});
},skewYg:function(_6f6){
return m.skewY(m._degToRad(_6f6));
},reflect:function(a,b){
if(arguments.length==1){
b=a.y;
a=a.x;
}
var a2=a*a,b2=b*b,n2=a2+b2,xy=2*a*b/n2;
return new m.Matrix2D({xx:2*a2/n2-1,xy:xy,yx:xy,yy:2*b2/n2-1});
},project:function(a,b){
if(arguments.length==1){
b=a.y;
a=a.x;
}
var a2=a*a,b2=b*b,n2=a2+b2,xy=a*b/n2;
return new m.Matrix2D({xx:a2/n2,xy:xy,yx:xy,yy:b2/n2});
},normalize:function(_6f7){
return (_6f7 instanceof m.Matrix2D)?_6f7:new m.Matrix2D(_6f7);
},clone:function(_6f8){
var obj=new m.Matrix2D();
for(var i in _6f8){
if(typeof (_6f8[i])=="number"&&typeof (obj[i])=="number"&&obj[i]!=_6f8[i]){
obj[i]=_6f8[i];
}
}
return obj;
},invert:function(_6f9){
var M=m.normalize(_6f9),D=M.xx*M.yy-M.xy*M.yx,M=new m.Matrix2D({xx:M.yy/D,xy:-M.xy/D,yx:-M.yx/D,yy:M.xx/D,dx:(M.xy*M.dy-M.yy*M.dx)/D,dy:(M.yx*M.dx-M.xx*M.dy)/D});
return M;
},_multiplyPoint:function(_6fa,x,y){
return {x:_6fa.xx*x+_6fa.xy*y+_6fa.dx,y:_6fa.yx*x+_6fa.yy*y+_6fa.dy};
},multiplyPoint:function(_6fb,a,b){
var M=m.normalize(_6fb);
if(typeof a=="number"&&typeof b=="number"){
return m._multiplyPoint(M,a,b);
}
return m._multiplyPoint(M,a.x,a.y);
},multiply:function(_6fc){
var M=m.normalize(_6fc);
for(var i=1;i<arguments.length;++i){
var l=M,r=m.normalize(arguments[i]);
M=new m.Matrix2D();
M.xx=l.xx*r.xx+l.xy*r.yx;
M.xy=l.xx*r.xy+l.xy*r.yy;
M.yx=l.yx*r.xx+l.yy*r.yx;
M.yy=l.yx*r.xy+l.yy*r.yy;
M.dx=l.xx*r.dx+l.xy*r.dy+l.dx;
M.dy=l.yx*r.dx+l.yy*r.dy+l.dy;
}
return M;
},_sandwich:function(_6fd,x,y){
return m.multiply(m.translate(x,y),_6fd,m.translate(-x,-y));
},scaleAt:function(a,b,c,d){
switch(arguments.length){
case 4:
return m._sandwich(m.scale(a,b),c,d);
case 3:
if(typeof c=="number"){
return m._sandwich(m.scale(a),b,c);
}
return m._sandwich(m.scale(a,b),c.x,c.y);
}
return m._sandwich(m.scale(a),b.x,b.y);
},rotateAt:function(_6fe,a,b){
if(arguments.length>2){
return m._sandwich(m.rotate(_6fe),a,b);
}
return m._sandwich(m.rotate(_6fe),a.x,a.y);
},rotategAt:function(_6ff,a,b){
if(arguments.length>2){
return m._sandwich(m.rotateg(_6ff),a,b);
}
return m._sandwich(m.rotateg(_6ff),a.x,a.y);
},skewXAt:function(_700,a,b){
if(arguments.length>2){
return m._sandwich(m.skewX(_700),a,b);
}
return m._sandwich(m.skewX(_700),a.x,a.y);
},skewXgAt:function(_701,a,b){
if(arguments.length>2){
return m._sandwich(m.skewXg(_701),a,b);
}
return m._sandwich(m.skewXg(_701),a.x,a.y);
},skewYAt:function(_702,a,b){
if(arguments.length>2){
return m._sandwich(m.skewY(_702),a,b);
}
return m._sandwich(m.skewY(_702),a.x,a.y);
},skewYgAt:function(_703,a,b){
if(arguments.length>2){
return m._sandwich(m.skewYg(_703),a,b);
}
return m._sandwich(m.skewYg(_703),a.x,a.y);
}});
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D;
}
if(!dojo._hasResource["dojox.gfx._base"]){
dojo._hasResource["dojox.gfx._base"]=true;
dojo.provide("dojox.gfx._base");
(function(){
var g=dojox.gfx,b=g._base;
g._hasClass=function(node,_704){
var cls=node.getAttribute("className");
return cls&&(" "+cls+" ").indexOf(" "+_704+" ")>=0;
};
g._addClass=function(node,_705){
var cls=node.getAttribute("className")||"";
if(!cls||(" "+cls+" ").indexOf(" "+_705+" ")<0){
node.setAttribute("className",cls+(cls?" ":"")+_705);
}
};
g._removeClass=function(node,_706){
var cls=node.getAttribute("className");
if(cls){
node.setAttribute("className",cls.replace(new RegExp("(^|\\s+)"+_706+"(\\s+|$)"),"$1$2"));
}
};
b._getFontMeasurements=function(){
var _707={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(dojo.isIE){
dojo.doc.documentElement.style.fontSize="100%";
}
var div=dojo.create("div",{style:{position:"absolute",left:"0",top:"-100px",width:"30px",height:"1000em",borderWidth:"0",margin:"0",padding:"0",outline:"none",lineHeight:"1",overflow:"hidden"}},dojo.body());
for(var p in _707){
div.style.fontSize=p;
_707[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
dojo.body().removeChild(div);
return _707;
};
var _708=null;
b._getCachedFontMeasurements=function(_709){
if(_709||!_708){
_708=b._getFontMeasurements();
}
return _708;
};
var _70a=null,_70b={};
b._getTextBox=function(text,_70c,_70d){
var m,s,al=arguments.length;
if(!_70a){
_70a=dojo.create("div",{style:{position:"absolute",top:"-10000px",left:"0"}},dojo.body());
}
m=_70a;
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(al>1&&_70c){
for(var i in _70c){
if(i in _70b){
continue;
}
s[i]=_70c[i];
}
}
if(al>2&&_70d){
m.className=_70d;
}
m.innerHTML=text;
if(m["getBoundingClientRect"]){
var bcr=m.getBoundingClientRect();
return {l:bcr.left,t:bcr.top,w:bcr.width||(bcr.right-bcr.left),h:bcr.height||(bcr.bottom-bcr.top)};
}else{
return dojo.marginBox(m);
}
};
var _70e=0;
b._getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++_70e);
}while(dojo.byId(id));
return id;
};
})();
dojo.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},getDefault:(function(){
var _70f={};
return function(type){
var t=_70f[type];
if(t){
return new t();
}
t=_70f[type]=new Function;
t.prototype=dojox.gfx["default"+type];
return new t();
};
})(),normalizeColor:function(_710){
return (_710 instanceof dojo.Color)?_710:new dojo.Color(_710);
},normalizeParameters:function(_711,_712){
if(_712){
var _713={};
for(var x in _711){
if(x in _712&&!(x in _713)){
_711[x]=_712[x];
}
}
}
return _711;
},makeParameters:function(_714,_715){
if(!_715){
return dojo.delegate(_714);
}
var _716={};
for(var i in _714){
if(!(i in _716)){
_716[i]=dojo.clone((i in _715)?_715[i]:_714[i]);
}
}
return _716;
},formatNumber:function(x,_717){
var val=x.toString();
if(val.indexOf("e")>=0){
val=x.toFixed(4);
}else{
var _718=val.indexOf(".");
if(_718>=0&&val.length-_718>5){
val=x.toFixed(4);
}
}
if(x<0){
return val;
}
return _717?" "+val:val;
},makeFontString:function(font){
return font.style+" "+font.variant+" "+font.weight+" "+font.size+" "+font.family;
},splitFontString:function(str){
var font=dojox.gfx.getDefault("Font");
var t=str.split(/\s+/);
do{
if(t.length<5){
break;
}
font.style=t[0];
font.variant=t[1];
font.weight=t[2];
var i=t[3].indexOf("/");
font.size=i<0?t[3]:t[3].substring(0,i);
var j=4;
if(i<0){
if(t[4]=="/"){
j=6;
}else{
if(t[4].charAt(0)=="/"){
j=5;
}
}
}
if(j<t.length){
font.family=t.slice(j).join(" ");
}
}while(false);
return font;
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){
return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12;
},pt2px:function(len){
return len*dojox.gfx.px_in_pt();
},px2pt:function(len){
return len/dojox.gfx.px_in_pt();
},normalizedLength:function(len){
if(len.length==0){
return 0;
}
if(len.length>2){
var _719=dojox.gfx.px_in_pt();
var val=parseFloat(len);
switch(len.slice(-2)){
case "px":
return val;
case "pt":
return val*_719;
case "in":
return val*72*_719;
case "pc":
return val*12*_719;
case "mm":
return val*dojox.gfx.mm_in_pt*_719;
case "cm":
return val*dojox.gfx.cm_in_pt*_719;
}
}
return parseFloat(len);
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(a,b){
return a&&b&&a==b;
},switchTo:function(_71a){
var ns=dojox.gfx[_71a];
if(ns){
dojo.forEach(["Group","Rect","Ellipse","Circle","Line","Polyline","Image","Text","Path","TextPath","Surface","createSurface"],function(name){
dojox.gfx[name]=ns[name];
});
}
}});
}
if(!dojo._hasResource["dojox.gfx"]){
dojo._hasResource["dojox.gfx"]=true;
dojo.provide("dojox.gfx");
dojo.loadInit(function(){
var gfx=dojo.getObject("dojox.gfx",true),sl,flag,_71b;
while(!gfx.renderer){
if(dojo.config.forceGfxRenderer){
dojox.gfx.renderer=dojo.config.forceGfxRenderer;
break;
}
var _71c=(typeof dojo.config.gfxRenderer=="string"?dojo.config.gfxRenderer:"svg,vml,canvas,silverlight").split(",");
for(var i=0;i<_71c.length;++i){
switch(_71c[i]){
case "svg":
if("SVGAngle" in dojo.global){
dojox.gfx.renderer="svg";
}
break;
case "vml":
if(dojo.isIE){
dojox.gfx.renderer="vml";
}
break;
case "silverlight":
try{
if(dojo.isIE){
sl=new ActiveXObject("AgControl.AgControl");
if(sl&&sl.IsVersionSupported("1.0")){
flag=true;
}
}else{
if(navigator.plugins["Silverlight Plug-In"]){
flag=true;
}
}
}
catch(e){
flag=false;
}
finally{
sl=null;
}
if(flag){
dojox.gfx.renderer="silverlight";
}
break;
case "canvas":
if(dojo.global.CanvasRenderingContext2D){
dojox.gfx.renderer="canvas";
}
break;
}
if(gfx.renderer){
break;
}
}
break;
}
if(dojo.config.isDebug){
}
if(gfx[gfx.renderer]){
gfx.switchTo(gfx.renderer);
}else{
gfx.loadAndSwitch=gfx.renderer;
dojo["require"]("dojox.gfx."+gfx.renderer);
}
});
}
if(!dojo._hasResource["dojox.charting.axis2d.common"]){
dojo._hasResource["dojox.charting.axis2d.common"]=true;
dojo.provide("dojox.charting.axis2d.common");
(function(){
var g=dojox.gfx;
var _71d=function(s){
s.marginLeft="0px";
s.marginTop="0px";
s.marginRight="0px";
s.marginBottom="0px";
s.paddingLeft="0px";
s.paddingTop="0px";
s.paddingRight="0px";
s.paddingBottom="0px";
s.borderLeftWidth="0px";
s.borderTopWidth="0px";
s.borderRightWidth="0px";
s.borderBottomWidth="0px";
};
var _71e=function(n){
if(n["getBoundingClientRect"]){
var bcr=n.getBoundingClientRect();
return bcr.width||(bcr.right-bcr.left);
}else{
return dojo.marginBox(n).w;
}
};
dojo.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(_71f,_720,x,y,_721,text,font,_722){
return _720.createText({x:x,y:y,text:text,align:_721}).setFont(font).setFill(_722);
},html:function(_723,_724,x,y,_725,text,font,_726,_727){
var p=dojo.doc.createElement("div"),s=p.style,_728;
_71d(s);
s.font=font;
p.innerHTML=String(text).replace(/\s/g,"&nbsp;");
s.color=_726;
s.position="absolute";
s.left="-10000px";
dojo.body().appendChild(p);
var size=g.normalizedLength(g.splitFontString(font).size);
if(!_727){
_728=_71e(p);
}
dojo.body().removeChild(p);
s.position="relative";
if(_727){
s.width=_727+"px";
switch(_725){
case "middle":
s.textAlign="center";
s.left=(x-_727/2)+"px";
break;
case "end":
s.textAlign="right";
s.left=(x-_727)+"px";
break;
default:
s.left=x+"px";
s.textAlign="left";
break;
}
}else{
switch(_725){
case "middle":
s.left=Math.floor(x-_728/2)+"px";
break;
case "end":
s.left=Math.floor(x-_728)+"px";
break;
default:
s.left=Math.floor(x)+"px";
break;
}
}
s.top=Math.floor(y-size)+"px";
s.whiteSpace="nowrap";
var wrap=dojo.doc.createElement("div"),w=wrap.style;
_71d(w);
w.width="0px";
w.height="0px";
wrap.appendChild(p);
_723.node.insertBefore(wrap,_723.node.firstChild);
return wrap;
}}});
})();
}
if(!dojo._hasResource["dojox.charting.Element"]){
dojo._hasResource["dojox.charting.Element"]=true;
dojo.provide("dojox.charting.Element");
dojo.declare("dojox.charting.Element",null,{chart:null,group:null,htmlElements:null,dirty:true,constructor:function(_729){
this.chart=_729;
this.group=null;
this.htmlElements=[];
this.dirty=true;
this.trailingSymbol="...";
this._events=[];
},createGroup:function(_72a){
if(!_72a){
_72a=this.chart.surface;
}
if(!this.group){
this.group=_72a.createGroup();
}
return this;
},purgeGroup:function(){
this.destroyHtmlElements();
if(this.group){
this.group.clear();
this.group.removeShape();
this.group=null;
}
this.dirty=true;
if(this._events.length){
dojo.forEach(this._events,function(item){
item.shape.disconnect(item.handle);
});
this._events=[];
}
return this;
},cleanGroup:function(_72b){
this.destroyHtmlElements();
if(!_72b){
_72b=this.chart.surface;
}
if(this.group){
this.group.clear();
}else{
this.group=_72b.createGroup();
}
this.dirty=true;
return this;
},destroyHtmlElements:function(){
if(this.htmlElements.length){
dojo.forEach(this.htmlElements,dojo.destroy);
this.htmlElements=[];
}
},destroy:function(){
this.purgeGroup();
},getTextWidth:function(s,font){
return dojox.gfx._base._getTextBox(s,{font:font}).w||0;
},getTextWithLimitLength:function(s,font,_72c,_72d){
if(!s||s.length<=0){
return {text:"",truncated:_72d||false};
}
if(!_72c||_72c<=0){
return {text:s,truncated:_72d||false};
}
var _72e=2,_72f=0.618,_730=s.substring(0,1)+this.trailingSymbol,_731=this.getTextWidth(_730,font);
if(_72c<=_731){
return {text:_730,truncated:true};
}
var _732=this.getTextWidth(s,font);
if(_732<=_72c){
return {text:s,truncated:_72d||false};
}else{
var _733=0,end=s.length;
while(_733<end){
if(end-_733<=_72e){
while(this.getTextWidth(s.substring(0,_733)+this.trailingSymbol,font)>_72c){
_733-=1;
}
return {text:(s.substring(0,_733)+this.trailingSymbol),truncated:true};
}
var _734=_733+Math.round((end-_733)*_72f),_735=this.getTextWidth(s.substring(0,_734),font);
if(_735<_72c){
_733=_734;
end=end;
}else{
_733=_733;
end=_734;
}
}
}
},getTextWithLimitCharCount:function(s,font,_736,_737){
if(!s||s.length<=0){
return {text:"",truncated:_737||false};
}
if(!_736||_736<=0||s.length<=_736){
return {text:s,truncated:_737||false};
}
return {text:s.substring(0,_736)+this.trailingSymbol,truncated:true};
},_plotFill:function(fill,dim,_738){
if(!fill||!fill.type||!fill.space){
return fill;
}
var _739=fill.space;
switch(fill.type){
case "linear":
if(_739==="plot"||_739==="shapeX"||_739==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,fill);
fill.space=_739;
if(_739==="plot"||_739==="shapeX"){
var span=dim.height-_738.t-_738.b;
fill.y1=_738.t+span*fill.y1/100;
fill.y2=_738.t+span*fill.y2/100;
}
if(_739==="plot"||_739==="shapeY"){
var span=dim.width-_738.l-_738.r;
fill.x1=_738.l+span*fill.x1/100;
fill.x2=_738.l+span*fill.x2/100;
}
}
break;
case "radial":
if(_739==="plot"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_739;
var _73a=dim.width-_738.l-_738.r,_73b=dim.height-_738.t-_738.b;
fill.cx=_738.l+_73a*fill.cx/100;
fill.cy=_738.t+_73b*fill.cy/100;
fill.r=fill.r*Math.sqrt(_73a*_73a+_73b*_73b)/200;
}
break;
case "pattern":
if(_739==="plot"||_739==="shapeX"||_739==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,fill);
fill.space=_739;
if(_739==="plot"||_739==="shapeX"){
var span=dim.height-_738.t-_738.b;
fill.y=_738.t+span*fill.y/100;
fill.height=span*fill.height/100;
}
if(_739==="plot"||_739==="shapeY"){
var span=dim.width-_738.l-_738.r;
fill.x=_738.l+span*fill.x/100;
fill.width=span*fill.width/100;
}
}
break;
}
return fill;
},_shapeFill:function(fill,bbox){
if(!fill||!fill.space){
return fill;
}
var _73c=fill.space;
switch(fill.type){
case "linear":
if(_73c==="shape"||_73c==="shapeX"||_73c==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,fill);
fill.space=_73c;
if(_73c==="shape"||_73c==="shapeX"){
var span=bbox.width;
fill.x1=bbox.x+span*fill.x1/100;
fill.x2=bbox.x+span*fill.x2/100;
}
if(_73c==="shape"||_73c==="shapeY"){
var span=bbox.height;
fill.y1=bbox.y+span*fill.y1/100;
fill.y2=bbox.y+span*fill.y2/100;
}
}
break;
case "radial":
if(_73c==="shape"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_73c;
fill.cx=bbox.x+bbox.width/2;
fill.cy=bbox.y+bbox.height/2;
fill.r=fill.r*bbox.width/200;
}
break;
case "pattern":
if(_73c==="shape"||_73c==="shapeX"||_73c==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,fill);
fill.space=_73c;
if(_73c==="shape"||_73c==="shapeX"){
var span=bbox.width;
fill.x=bbox.x+span*fill.x/100;
fill.width=span*fill.width/100;
}
if(_73c==="shape"||_73c==="shapeY"){
var span=bbox.height;
fill.y=bbox.y+span*fill.y/100;
fill.height=span*fill.height/100;
}
}
break;
}
return fill;
},_pseudoRadialFill:function(fill,_73d,_73e,_73f,end){
if(!fill||fill.type!=="radial"||fill.space!=="shape"){
return fill;
}
var _740=fill.space;
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_740;
if(arguments.length<4){
fill.cx=_73d.x;
fill.cy=_73d.y;
fill.r=fill.r*_73e/100;
return fill;
}
var _741=arguments.length<5?_73f:(end+_73f)/2;
return {type:"linear",x1:_73d.x,y1:_73d.y,x2:_73d.x+fill.r*_73e*Math.cos(_741)/100,y2:_73d.y+fill.r*_73e*Math.sin(_741)/100,colors:fill.colors};
return fill;
}});
}
if(!dojo._hasResource["dojox.charting.axis2d.Base"]){
dojo._hasResource["dojox.charting.axis2d.Base"]=true;
dojo.provide("dojox.charting.axis2d.Base");
dojo.declare("dojox.charting.axis2d.Base",dojox.charting.Element,{constructor:function(_742,_743){
this.vertical=_743&&_743.vertical;
},clear:function(){
return this;
},initialized:function(){
return false;
},calculate:function(min,max,span){
return this;
},getScaler:function(){
return null;
},getTicks:function(){
return null;
},getOffsets:function(){
return {l:0,r:0,t:0,b:0};
},render:function(dim,_744){
this.dirty=false;
return this;
}});
}
if(!dojo._hasResource["dojox.lang.functional.lambda"]){
dojo._hasResource["dojox.lang.functional.lambda"]=true;
dojo.provide("dojox.lang.functional.lambda");
(function(){
var df=dojox.lang.functional,_745={};
var _746="ab".split(/a*/).length>1?String.prototype.split:function(sep){
var r=this.split.call(this,sep),m=sep.exec(this);
if(m&&m.index==0){
r.unshift("");
}
return r;
};
var _747=function(s){
var args=[],_748=_746.call(s,/\s*->\s*/m);
if(_748.length>1){
while(_748.length){
s=_748.pop();
args=_748.pop().split(/\s*,\s*|\s+/m);
if(_748.length){
_748.push("(function("+args+"){return ("+s+")})");
}
}
}else{
if(s.match(/\b_\b/)){
args=["_"];
}else{
var l=s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),r=s.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(l||r){
if(l){
args.push("$1");
s="$1"+s;
}
if(r){
args.push("$2");
s=s+"$2";
}
}else{
var vars=s.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|window|document|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[],t={};
dojo.forEach(vars,function(v){
if(!(v in t)){
args.push(v);
t[v]=1;
}
});
}
}
}
return {args:args,body:s};
};
var _749=function(a){
return a.length?function(){
var i=a.length-1,x=df.lambda(a[i]).apply(this,arguments);
for(--i;i>=0;--i){
x=df.lambda(a[i]).call(this,x);
}
return x;
}:function(x){
return x;
};
};
dojo.mixin(df,{rawLambda:function(s){
return _747(s);
},buildLambda:function(s){
s=_747(s);
return "function("+s.args.join(",")+"){return ("+s.body+");}";
},lambda:function(s){
if(typeof s=="function"){
return s;
}
if(s instanceof Array){
return _749(s);
}
if(s in _745){
return _745[s];
}
s=_747(s);
return _745[s]=new Function(s.args,"return ("+s.body+");");
},clearLambdaCache:function(){
_745={};
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.array"]){
dojo._hasResource["dojox.lang.functional.array"]=true;
dojo.provide("dojox.lang.functional.array");
(function(){
var d=dojo,df=dojox.lang.functional,_74a={};
d.mixin(df,{filter:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t=[],v,i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
v=a.next();
if(f.call(o,v,i++,a)){
t.push(v);
}
}
}else{
for(i in a){
if(!(i in _74a)){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
}
}
}
return t;
},forEach:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;f.call(o,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();f.call(o,a.next(),i++,a)){
}
}else{
for(i in a){
if(!(i in _74a)){
f.call(o,a[i],i,a);
}
}
}
}
return o;
},map:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,i;
if(d.isArray(a)){
t=new Array(n=a.length);
for(i=0;i<n;t[i]=f.call(o,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
t=[];
for(i=0;a.hasNext();t.push(f.call(o,a.next(),i++,a))){
}
}else{
t=[];
for(i in a){
if(!(i in _74a)){
t.push(f.call(o,a[i],i,a));
}
}
}
}
return t;
},every:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
if(!f.call(o,a[i],i,a)){
return false;
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
if(!f.call(o,a.next(),i++,a)){
return false;
}
}
}else{
for(i in a){
if(!(i in _74a)){
if(!f.call(o,a[i],i,a)){
return false;
}
}
}
}
}
return true;
},some:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
if(f.call(o,a[i],i,a)){
return true;
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
if(f.call(o,a.next(),i++,a)){
return true;
}
}
}else{
for(i in a){
if(!(i in _74a)){
if(f.call(o,a[i],i,a)){
return true;
}
}
}
}
}
return false;
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.object"]){
dojo._hasResource["dojox.lang.functional.object"]=true;
dojo.provide("dojox.lang.functional.object");
(function(){
var d=dojo,df=dojox.lang.functional,_74b={};
d.mixin(df,{keys:function(obj){
var t=[];
for(var i in obj){
if(!(i in _74b)){
t.push(i);
}
}
return t;
},values:function(obj){
var t=[];
for(var i in obj){
if(!(i in _74b)){
t.push(obj[i]);
}
}
return t;
},filterIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
var t={},v,i;
for(i in obj){
if(!(i in _74b)){
v=obj[i];
if(f.call(o,v,i,obj)){
t[i]=v;
}
}
}
return t;
},forIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
for(var i in obj){
if(!(i in _74b)){
f.call(o,obj[i],i,obj);
}
}
return o;
},mapIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
var t={},i;
for(i in obj){
if(!(i in _74b)){
t[i]=f.call(o,obj[i],i,obj);
}
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional"]){
dojo._hasResource["dojox.lang.functional"]=true;
dojo.provide("dojox.lang.functional");
}
if(!dojo._hasResource["dojox.lang.utils"]){
dojo._hasResource["dojox.lang.utils"]=true;
dojo.provide("dojox.lang.utils");
(function(){
var _74c={},du=dojox.lang.utils,opts=Object.prototype.toString;
var _74d=function(o){
if(o){
switch(opts.call(o)){
case "[object Array]":
return o.slice(0);
case "[object Object]":
return dojo.delegate(o);
}
}
return o;
};
dojo.mixin(du,{coerceType:function(_74e,_74f){
switch(typeof _74e){
case "number":
return Number(eval("("+_74f+")"));
case "string":
return String(_74f);
case "boolean":
return Boolean(eval("("+_74f+")"));
}
return eval("("+_74f+")");
},updateWithObject:function(_750,_751,conv){
if(!_751){
return _750;
}
for(var x in _750){
if(x in _751&&!(x in _74c)){
var t=_750[x];
if(t&&typeof t=="object"){
du.updateWithObject(t,_751[x],conv);
}else{
_750[x]=conv?du.coerceType(t,_751[x]):_74d(_751[x]);
}
}
}
return _750;
},updateWithPattern:function(_752,_753,_754,conv){
if(!_753||!_754){
return _752;
}
for(var x in _754){
if(x in _753&&!(x in _74c)){
_752[x]=conv?du.coerceType(_754[x],_753[x]):_74d(_753[x]);
}
}
return _752;
},merge:function(_755,_756){
if(_756){
var _757=opts.call(_755),_758=opts.call(_756),t,i,l,m;
switch(_758){
case "[object Array]":
if(_758==_757){
t=new Array(Math.max(_755.length,_756.length));
for(i=0,l=t.length;i<l;++i){
t[i]=du.merge(_755[i],_756[i]);
}
return t;
}
return _756.slice(0);
case "[object Object]":
if(_758==_757&&_755){
t=dojo.delegate(_755);
for(i in _756){
if(i in _755){
l=_755[i];
m=_756[i];
if(m!==l){
t[i]=du.merge(l,m);
}
}else{
t[i]=dojo.clone(_756[i]);
}
}
return t;
}
return dojo.clone(_756);
}
}
return _756;
}});
})();
}
if(!dojo._hasResource["dojox.charting.axis2d.Invisible"]){
dojo._hasResource["dojox.charting.axis2d.Invisible"]=true;
dojo.provide("dojox.charting.axis2d.Invisible");
(function(){
var dc=dojox.charting,df=dojox.lang.functional,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_759=du.merge,_75a=4,_75b=45;
dojo.declare("dojox.charting.axis2d.Invisible",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,rotation:0},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null},constructor:function(_75c,_75d){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_75d);
du.updateWithPattern(this.opt,_75d,this.optionalParams);
},dependOnData:function(){
return !("min" in this.opt)||!("max" in this.opt);
},clear:function(){
delete this.scaler;
delete this.ticks;
this.dirty=true;
return this;
},initialized:function(){
return "scaler" in this&&!(this.dirty&&this.dependOnData());
},setWindow:function(_75e,_75f){
this.scale=_75e;
this.offset=_75f;
return this.clear();
},getWindowScale:function(){
return "scale" in this?this.scale:1;
},getWindowOffset:function(){
return "offset" in this?this.offset:0;
},_groupLabelWidth:function(_760,font,_761){
if(!_760.length){
return 0;
}
if(dojo.isObject(_760[0])){
_760=df.map(_760,function(_762){
return _762.text;
});
}
if(_761){
_760=df.map(_760,function(_763){
return dojo.trim(_763).length==0?"":_763.substring(0,_761)+this.trailingSymbol;
},this);
}
var s=_760.join("<br>");
return dojox.gfx._base._getTextBox(s,{font:font}).w||0;
},calculate:function(min,max,span,_764){
if(this.initialized()){
return this;
}
var o=this.opt;
this.labels="labels" in o?o.labels:_764;
this.scaler=lin.buildScaler(min,max,span,o);
var tsb=this.scaler.bounds;
if("scale" in this){
o.from=tsb.lower+this.offset;
o.to=(tsb.upper-tsb.lower)/this.scale+o.from;
if(!isFinite(o.from)||isNaN(o.from)||!isFinite(o.to)||isNaN(o.to)||o.to-o.from>=tsb.upper-tsb.lower){
delete o.from;
delete o.to;
delete this.scale;
delete this.offset;
}else{
if(o.from<tsb.lower){
o.to+=tsb.lower-o.from;
o.from=tsb.lower;
}else{
if(o.to>tsb.upper){
o.from+=tsb.upper-o.to;
o.to=tsb.upper;
}
}
this.offset=o.from-tsb.lower;
}
this.scaler=lin.buildScaler(min,max,span,o);
tsb=this.scaler.bounds;
if(this.scale==1&&this.offset==0){
delete this.scale;
delete this.offset;
}
}
var ta=this.chart.theme.axis,_765=0,_766=o.rotation%360,_767=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_767?g.normalizedLength(g.splitFontString(_767).size):0,cosr=Math.abs(Math.cos(_766*Math.PI/180)),sinr=Math.abs(Math.sin(_766*Math.PI/180));
if(_766<0){
_766+=360;
}
if(size){
if(this.vertical?_766!=0&&_766!=180:_766!=90&&_766!=270){
if(this.labels){
_765=this._groupLabelWidth(this.labels,_767,o.maxLabelCharCount);
}else{
var _768=Math.ceil(Math.log(Math.max(Math.abs(tsb.from),Math.abs(tsb.to)))/Math.LN10),t=[];
if(tsb.from<0||tsb.to<0){
t.push("-");
}
t.push(dojo.string.rep("9",_768));
var _769=Math.floor(Math.log(tsb.to-tsb.from)/Math.LN10);
if(_769>0){
t.push(".");
t.push(dojo.string.rep("9",_769));
}
_765=dojox.gfx._base._getTextBox(t.join(""),{font:_767}).w;
}
_765=o.maxLabelSize?Math.min(o.maxLabelSize,_765):_765;
}else{
_765=size;
}
switch(_766){
case 0:
case 90:
case 180:
case 270:
break;
default:
var gap1=Math.sqrt(_765*_765+size*size),gap2=this.vertical?size*cosr+_765*sinr:_765*cosr+size*sinr;
_765=Math.min(gap1,gap2);
break;
}
}
this.scaler.minMinorStep=_765+_75a;
this.ticks=lin.buildTicks(this.scaler,o);
return this;
},getScaler:function(){
return this.scaler;
},getTicks:function(){
return this.ticks;
}});
})();
}
if(!dojo._hasResource["dojo.colors"]){
dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
dojo.getObject("colors",true,dojo);
(function(){
var _76a=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=function(_76b,obj){
var m=_76b.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=dojo.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
return dojo.colorFromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_76a(m1,m2,H+1/3)*256,_76a(m1,m2,H)*256,_76a(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
}
return null;
};
var _76c=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
dojo.Color.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_76c(t.r,0,255));
t.g=Math.round(_76c(t.g,0,255));
t.b=Math.round(_76c(t.b,0,255));
t.a=_76c(t.a,0,1);
return this;
};
})();
dojo.colors.makeGrey=function(g,a){
return dojo.colorFromArray([g,g,g,a]);
};
dojo.mixin(dojo.Color.named,{aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]});
}
if(!dojo._hasResource["dojox.charting.plot2d.common"]){
dojo._hasResource["dojox.charting.plot2d.common"]=true;
dojo.provide("dojox.charting.plot2d.common");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common;
dojo.mixin(dojox.charting.plot2d.common,{makeStroke:function(_76d){
if(!_76d){
return _76d;
}
if(typeof _76d=="string"||_76d instanceof dojo.Color){
_76d={color:_76d};
}
return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,_76d);
},augmentColor:function(_76e,_76f){
var t=new dojo.Color(_76e),c=new dojo.Color(_76f);
c.a=t.a;
return c;
},augmentStroke:function(_770,_771){
var s=dc.makeStroke(_770);
if(s){
s.color=dc.augmentColor(s.color,_771);
}
return s;
},augmentFill:function(fill,_772){
var fc,c=new dojo.Color(_772);
if(typeof fill=="string"||fill instanceof dojo.Color){
return dc.augmentColor(fill,_772);
}
return fill;
},defaultStats:{vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY,hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(_773){
var _774=dojo.delegate(dc.defaultStats);
for(var i=0;i<_773.length;++i){
var run=_773[i];
for(var j=0;j<run.data.length;j++){
if(run.data[j]!==null){
if(typeof run.data[j]=="number"){
var _775=_774.vmin,_776=_774.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,i){
if(val!==null){
var x=i+1,y=val;
if(isNaN(y)){
y=0;
}
_774.hmin=Math.min(_774.hmin,x);
_774.hmax=Math.max(_774.hmax,x);
_774.vmin=Math.min(_774.vmin,y);
_774.vmax=Math.max(_774.vmax,y);
}
});
}
if("ymin" in run){
_774.vmin=Math.min(_775,run.ymin);
}
if("ymax" in run){
_774.vmax=Math.max(_776,run.ymax);
}
}else{
var _777=_774.hmin,_778=_774.hmax,_775=_774.vmin,_776=_774.vmax;
if(!("xmin" in run)||!("xmax" in run)||!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,i){
if(val!==null){
var x="x" in val?val.x:i+1,y=val.y;
if(isNaN(x)){
x=0;
}
if(isNaN(y)){
y=0;
}
_774.hmin=Math.min(_774.hmin,x);
_774.hmax=Math.max(_774.hmax,x);
_774.vmin=Math.min(_774.vmin,y);
_774.vmax=Math.max(_774.vmax,y);
}
});
}
if("xmin" in run){
_774.hmin=Math.min(_777,run.xmin);
}
if("xmax" in run){
_774.hmax=Math.max(_778,run.xmax);
}
if("ymin" in run){
_774.vmin=Math.min(_775,run.ymin);
}
if("ymax" in run){
_774.vmax=Math.max(_776,run.ymax);
}
}
break;
}
}
}
return _774;
},calculateBarSize:function(_779,opt,_77a){
if(!_77a){
_77a=1;
}
var gap=opt.gap,size=(_779-2*gap)/_77a;
if("minBarSize" in opt){
size=Math.max(size,opt.minBarSize);
}
if("maxBarSize" in opt){
size=Math.min(size,opt.maxBarSize);
}
size=Math.max(size,1);
gap=(_779-size*_77a)/2;
return {size:size,gap:gap};
},collectStackedStats:function(_77b){
var _77c=dojo.clone(dc.defaultStats);
if(_77b.length){
_77c.hmin=Math.min(_77c.hmin,1);
_77c.hmax=df.foldl(_77b,"seed, run -> Math.max(seed, run.data.length)",_77c.hmax);
for(var i=0;i<_77c.hmax;++i){
var v=_77b[0].data[i];
v=v&&(typeof v=="number"?v:v.y);
if(isNaN(v)){
v=0;
}
_77c.vmin=Math.min(_77c.vmin,v);
for(var j=1;j<_77b.length;++j){
var t=_77b[j].data[i];
t=t&&(typeof t=="number"?t:t.y);
if(isNaN(t)){
t=0;
}
v+=t;
}
_77c.vmax=Math.max(_77c.vmax,v);
}
}
return _77c;
},curve:function(a,_77d){
var arr=a.slice(0);
if(_77d=="x"){
arr[arr.length]=arr[0];
}
var p=dojo.map(arr,function(item,i){
if(i==0){
return "M"+item.x+","+item.y;
}
if(!isNaN(_77d)){
var dx=item.x-arr[i-1].x,dy=arr[i-1].y;
return "C"+(item.x-(_77d-1)*(dx/_77d))+","+dy+" "+(item.x-(dx/_77d))+","+item.y+" "+item.x+","+item.y;
}else{
if(_77d=="X"||_77d=="x"||_77d=="S"){
var p0,p1=arr[i-1],p2=arr[i],p3;
var bz1x,bz1y,bz2x,bz2y;
var f=1/6;
if(i==1){
if(_77d=="x"){
p0=arr[arr.length-2];
}else{
p0=p1;
}
f=1/3;
}else{
p0=arr[i-2];
}
if(i==(arr.length-1)){
if(_77d=="x"){
p3=arr[1];
}else{
p3=p2;
}
f=1/3;
}else{
p3=arr[i+1];
}
var p1p2=Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
var p0p2=Math.sqrt((p2.x-p0.x)*(p2.x-p0.x)+(p2.y-p0.y)*(p2.y-p0.y));
var p1p3=Math.sqrt((p3.x-p1.x)*(p3.x-p1.x)+(p3.y-p1.y)*(p3.y-p1.y));
var _77e=p0p2*f;
var _77f=p1p3*f;
if(_77e>p1p2/2&&_77f>p1p2/2){
_77e=p1p2/2;
_77f=p1p2/2;
}else{
if(_77e>p1p2/2){
_77e=p1p2/2;
_77f=p1p2/2*p1p3/p0p2;
}else{
if(_77f>p1p2/2){
_77f=p1p2/2;
_77e=p1p2/2*p0p2/p1p3;
}
}
}
if(_77d=="S"){
if(p0==p1){
_77e=0;
}
if(p2==p3){
_77f=0;
}
}
bz1x=p1.x+_77e*(p2.x-p0.x)/p0p2;
bz1y=p1.y+_77e*(p2.y-p0.y)/p0p2;
bz2x=p2.x-_77f*(p3.x-p1.x)/p1p3;
bz2y=p2.y-_77f*(p3.y-p1.y)/p1p3;
}
}
return "C"+(bz1x+","+bz1y+" "+bz2x+","+bz2y+" "+p2.x+","+p2.y);
});
return p.join(" ");
},getLabel:function(_780,_781,_782){
if(dojo.number){
return (_781?dojo.number.format(_780,{places:_782}):dojo.number.format(_780))||"";
}
return _781?_780.toFixed(_782):_780.toString();
}});
})();
}
if(!dojo._hasResource["dojox.charting.scaler.primitive"]){
dojo._hasResource["dojox.charting.scaler.primitive"]=true;
dojo.provide("dojox.charting.scaler.primitive");
dojox.charting.scaler.primitive={buildScaler:function(min,max,span,_783){
if(min==max){
min-=0.5;
max+=0.5;
}
return {bounds:{lower:min,upper:max,from:min,to:max,scale:span/(max-min),span:span},scaler:dojox.charting.scaler.primitive};
},buildTicks:function(_784,_785){
return {major:[],minor:[],micro:[]};
},getTransformerFromModel:function(_786){
var _787=_786.bounds.from,_788=_786.bounds.scale;
return function(x){
return (x-_787)*_788;
};
},getTransformerFromPlot:function(_789){
var _78a=_789.bounds.from,_78b=_789.bounds.scale;
return function(x){
return x/_78b+_78a;
};
}};
}
if(!dojo._hasResource["dojox.charting.plot2d._PlotEvents"]){
dojo._hasResource["dojox.charting.plot2d._PlotEvents"]=true;
dojo.provide("dojox.charting.plot2d._PlotEvents");
dojo.declare("dojox.charting.plot2d._PlotEvents",null,{constructor:function(){
this._shapeEvents=[];
this._eventSeries={};
},destroy:function(){
this.resetEvents();
this.inherited(arguments);
},plotEvent:function(o){
},raiseEvent:function(o){
this.plotEvent(o);
var t=dojo.delegate(o);
t.originalEvent=o.type;
t.originalPlot=o.plot;
t.type="onindirect";
dojo.forEach(this.chart.stack,function(plot){
if(plot!==this&&plot.plotEvent){
t.plot=plot;
plot.plotEvent(t);
}
},this);
},connect:function(_78c,_78d){
this.dirty=true;
return dojo.connect(this,"plotEvent",_78c,_78d);
},events:function(){
var ls=this.plotEvent._listeners;
if(!ls||!ls.length){
return false;
}
for(var i in ls){
if(!(i in Array.prototype)){
return true;
}
}
return false;
},resetEvents:function(){
if(this._shapeEvents.length){
dojo.forEach(this._shapeEvents,function(item){
item.shape.disconnect(item.handle);
});
this._shapeEvents=[];
}
this.raiseEvent({type:"onplotreset",plot:this});
},_connectSingleEvent:function(o,_78e){
this._shapeEvents.push({shape:o.eventMask,handle:o.eventMask.connect(_78e,this,function(e){
o.type=_78e;
o.event=e;
this.raiseEvent(o);
o.event=null;
})});
},_connectEvents:function(o){
if(o){
o.chart=this.chart;
o.plot=this;
o.hAxis=this.hAxis||null;
o.vAxis=this.vAxis||null;
o.eventMask=o.eventMask||o.shape;
this._connectSingleEvent(o,"onmouseover");
this._connectSingleEvent(o,"onmouseout");
this._connectSingleEvent(o,"onclick");
}
},_reconnectEvents:function(_78f){
var a=this._eventSeries[_78f];
if(a){
dojo.forEach(a,this._connectEvents,this);
}
},fireEvent:function(_790,_791,_792,_793){
var s=this._eventSeries[_790];
if(s&&s.length&&_792<s.length){
var o=s[_792];
o.type=_791;
o.event=_793||null;
this.raiseEvent(o);
o.event=null;
}
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Base"]){
dojo._hasResource["dojox.charting.plot2d.Base"]=true;
dojo.provide("dojox.charting.plot2d.Base");
dojo.declare("dojox.charting.plot2d.Base",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{constructor:function(_794,_795){
this.zoom=null,this.zoomQueue=[];
this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0};
},clear:function(){
this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this;
},setAxis:function(axis){
if(axis){
this[axis.vertical?"_vAxis":"_hAxis"]=axis;
}
return this;
},addSeries:function(run){
this.series.push(run);
return this;
},getSeriesStats:function(){
return dojox.charting.plot2d.common.collectSimpleStats(this.series);
},calculateAxes:function(dim){
this.initializeScalers(dim,this.getSeriesStats());
return this;
},isDirty:function(){
return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty;
},isDataDirty:function(){
return dojo.some(this.series,function(item){
return item.dirty;
});
},performZoom:function(dim,_796){
var vs=this._vAxis.scale||1,hs=this._hAxis.scale||1,_797=dim.height-_796.b,_798=this._hScaler.bounds,_799=(_798.from-_798.lower)*_798.scale,_79a=this._vScaler.bounds,_79b=(_79a.from-_79a.lower)*_79a.scale;
rVScale=vs/this.lastWindow.vscale,rHScale=hs/this.lastWindow.hscale,rXOffset=(this.lastWindow.xoffset-_799)/((this.lastWindow.hscale==1)?hs:this.lastWindow.hscale),rYOffset=(_79b-this.lastWindow.yoffset)/((this.lastWindow.vscale==1)?vs:this.lastWindow.vscale),shape=this.group,anim=dojox.gfx.fx.animateTransform(dojo.delegate({shape:shape,duration:1200,transform:[{name:"translate",start:[0,0],end:[_796.l*(1-rHScale),_797*(1-rVScale)]},{name:"scale",start:[1,1],end:[rHScale,rVScale]},{name:"original"},{name:"translate",start:[0,0],end:[rXOffset,rYOffset]}]},this.zoom));
dojo.mixin(this.lastWindow,{vscale:vs,hscale:hs,xoffset:_799,yoffset:_79b});
this.zoomQueue.push(anim);
dojo.connect(anim,"onEnd",this,function(){
this.zoom=null;
this.zoomQueue.shift();
if(this.zoomQueue.length>0){
this.zoomQueue[0].play();
}
});
if(this.zoomQueue.length==1){
this.zoomQueue[0].play();
}
return this;
},render:function(dim,_79c){
return this;
},getRequiredColors:function(){
return this.series.length;
},initializeScalers:function(dim,_79d){
if(this._hAxis){
if(!this._hAxis.initialized()){
this._hAxis.calculate(_79d.hmin,_79d.hmax,dim.width);
}
this._hScaler=this._hAxis.getScaler();
}else{
this._hScaler=dojox.charting.scaler.primitive.buildScaler(_79d.hmin,_79d.hmax,dim.width);
}
if(this._vAxis){
if(!this._vAxis.initialized()){
this._vAxis.calculate(_79d.vmin,_79d.vmax,dim.height);
}
this._vScaler=this._vAxis.getScaler();
}else{
this._vScaler=dojox.charting.scaler.primitive.buildScaler(_79d.vmin,_79d.vmax,dim.height);
}
return this;
}});
}
if(!dojo._hasResource["dojox.lang.functional.reversed"]){
dojo._hasResource["dojox.lang.functional.reversed"]=true;
dojo.provide("dojox.lang.functional.reversed");
(function(){
var d=dojo,df=dojox.lang.functional;
d.mixin(df,{filterRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t=[],v,i=a.length-1;
for(;i>=0;--i){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
return t;
},forEachRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;f.call(o,a[i],i,a),--i){
}
},mapRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n),i=n-1,j=0;
for(;i>=0;t[j++]=f.call(o,a[i],i,a),--i){
}
return t;
},everyRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;--i){
if(!f.call(o,a[i],i,a)){
return false;
}
}
return true;
},someRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;--i){
if(f.call(o,a[i],i,a)){
return true;
}
}
return false;
}});
})();
}
if(!dojo._hasResource["dojox.gfx.fx"]){
dojo._hasResource["dojox.gfx.fx"]=true;
dojo.provide("dojox.gfx.fx");
(function(){
var d=dojo,g=dojox.gfx,m=g.matrix;
function _79e(_79f,end){
this.start=_79f,this.end=end;
};
_79e.prototype.getValue=function(r){
return (this.end-this.start)*r+this.start;
};
function _7a0(_7a1,end,_7a2){
this.start=_7a1,this.end=end;
this.units=_7a2;
};
_7a0.prototype.getValue=function(r){
return (this.end-this.start)*r+this.start+this.units;
};
function _7a3(_7a4,end){
this.start=_7a4,this.end=end;
this.temp=new dojo.Color();
};
_7a3.prototype.getValue=function(r){
return d.blendColors(this.start,this.end,r,this.temp);
};
function _7a5(_7a6){
this.values=_7a6;
this.length=_7a6.length;
};
_7a5.prototype.getValue=function(r){
return this.values[Math.min(Math.floor(r*this.length),this.length-1)];
};
function _7a7(_7a8,def){
this.values=_7a8;
this.def=def?def:{};
};
_7a7.prototype.getValue=function(r){
var ret=dojo.clone(this.def);
for(var i in this.values){
ret[i]=this.values[i].getValue(r);
}
return ret;
};
function _7a9(_7aa,_7ab){
this.stack=_7aa;
this.original=_7ab;
};
_7a9.prototype.getValue=function(r){
var ret=[];
dojo.forEach(this.stack,function(t){
if(t instanceof m.Matrix2D){
ret.push(t);
return;
}
if(t.name=="original"&&this.original){
ret.push(this.original);
return;
}
if(!(t.name in m)){
return;
}
var f=m[t.name];
if(typeof f!="function"){
ret.push(f);
return;
}
var val=dojo.map(t.start,function(v,i){
return (t.end[i]-v)*r+v;
}),_7ac=f.apply(m,val);
if(_7ac instanceof m.Matrix2D){
ret.push(_7ac);
}
},this);
return ret;
};
var _7ad=new d.Color(0,0,0,0);
function _7ae(prop,obj,name,def){
if(prop.values){
return new _7a5(prop.values);
}
var _7af,_7b0,end;
if(prop.start){
_7b0=g.normalizeColor(prop.start);
}else{
_7b0=_7af=obj?(name?obj[name]:obj):def;
}
if(prop.end){
end=g.normalizeColor(prop.end);
}else{
if(!_7af){
_7af=obj?(name?obj[name]:obj):def;
}
end=_7af;
}
return new _7a3(_7b0,end);
};
function _7b1(prop,obj,name,def){
if(prop.values){
return new _7a5(prop.values);
}
var _7b2,_7b3,end;
if(prop.start){
_7b3=prop.start;
}else{
_7b3=_7b2=obj?obj[name]:def;
}
if(prop.end){
end=prop.end;
}else{
if(typeof _7b2!="number"){
_7b2=obj?obj[name]:def;
}
end=_7b2;
}
return new _79e(_7b3,end);
};
g.fx.animateStroke=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_7b4=args.shape,_7b5;
d.connect(anim,"beforeBegin",anim,function(){
_7b5=_7b4.getStroke();
var prop=args.color,_7b6={},_7b7,_7b8,end;
if(prop){
_7b6.color=_7ae(prop,_7b5,"color",_7ad);
}
prop=args.style;
if(prop&&prop.values){
_7b6.style=new _7a5(prop.values);
}
prop=args.width;
if(prop){
_7b6.width=_7b1(prop,_7b5,"width",1);
}
prop=args.cap;
if(prop&&prop.values){
_7b6.cap=new _7a5(prop.values);
}
prop=args.join;
if(prop){
if(prop.values){
_7b6.join=new _7a5(prop.values);
}else{
_7b8=prop.start?prop.start:(_7b5&&_7b5.join||0);
end=prop.end?prop.end:(_7b5&&_7b5.join||0);
if(typeof _7b8=="number"&&typeof end=="number"){
_7b6.join=new _79e(_7b8,end);
}
}
}
this.curve=new _7a7(_7b6,_7b5);
});
d.connect(anim,"onAnimate",_7b4,"setStroke");
return anim;
};
g.fx.animateFill=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_7b9=args.shape,fill;
d.connect(anim,"beforeBegin",anim,function(){
fill=_7b9.getFill();
var prop=args.color,_7ba={};
if(prop){
this.curve=_7ae(prop,fill,"",_7ad);
}
});
d.connect(anim,"onAnimate",_7b9,"setFill");
return anim;
};
g.fx.animateFont=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_7bb=args.shape,font;
d.connect(anim,"beforeBegin",anim,function(){
font=_7bb.getFont();
var prop=args.style,_7bc={},_7bd,_7be,end;
if(prop&&prop.values){
_7bc.style=new _7a5(prop.values);
}
prop=args.variant;
if(prop&&prop.values){
_7bc.variant=new _7a5(prop.values);
}
prop=args.weight;
if(prop&&prop.values){
_7bc.weight=new _7a5(prop.values);
}
prop=args.family;
if(prop&&prop.values){
_7bc.family=new _7a5(prop.values);
}
prop=args.size;
if(prop&&prop.units){
_7be=parseFloat(prop.start?prop.start:(_7bb.font&&_7bb.font.size||"0"));
end=parseFloat(prop.end?prop.end:(_7bb.font&&_7bb.font.size||"0"));
_7bc.size=new _7a0(_7be,end,prop.units);
}
this.curve=new _7a7(_7bc,font);
});
d.connect(anim,"onAnimate",_7bb,"setFont");
return anim;
};
g.fx.animateTransform=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_7bf=args.shape,_7c0;
d.connect(anim,"beforeBegin",anim,function(){
_7c0=_7bf.getTransform();
this.curve=new _7a9(args.transform,_7c0);
});
d.connect(anim,"onAnimate",_7bf,"setTransform");
return anim;
};
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Default"]){
dojo._hasResource["dojox.charting.plot2d.Default"]=true;
dojo.provide("dojox.charting.plot2d.Default");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_7c1=df.lambda("item.purgeGroup()");
var _7c2=1200;
dojo.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,tension:"",animate:false},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(_7c3,_7c4){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_7c4);
du.updateWithPattern(this.opt,_7c4,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_7c5){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_7c5);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_7c1);
this._eventSeries={};
this.cleanGroup();
this.group.setTransform(null);
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_7c6,_7c7,_7c8,_7c9=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
var _7ca=t.next(this.opt.areas?"area":"line",[this.opt,run],true),s=run.group,_7cb=[],_7cc=[],rseg=null,_7cd,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_7ce=this._eventSeries[run.name]=new Array(run.data.length);
for(var j=0;j<run.data.length;j++){
if(run.data[j]!=null){
if(!rseg){
rseg=[];
_7cc.push(j);
_7cb.push(rseg);
}
rseg.push(run.data[j]);
}else{
rseg=null;
}
}
for(var seg=0;seg<_7cb.length;seg++){
if(typeof _7cb[seg][0]=="number"){
_7cd=dojo.map(_7cb[seg],function(v,i){
return {x:ht(i+_7cc[seg]+1)+_7c5.l,y:dim.height-_7c5.b-vt(v)};
},this);
}else{
_7cd=dojo.map(_7cb[seg],function(v,i){
return {x:ht(v.x)+_7c5.l,y:dim.height-_7c5.b-vt(v.y)};
},this);
}
var _7cf=this.opt.tension?dc.curve(_7cd,this.opt.tension):"";
if(this.opt.areas&&_7cd.length>1){
var fill=_7ca.series.fill;
var _7d0=dojo.clone(_7cd);
if(this.opt.tension){
var _7d1="L"+_7d0[_7d0.length-1].x+","+(dim.height-_7c5.b)+" L"+_7d0[0].x+","+(dim.height-_7c5.b)+" L"+_7d0[0].x+","+_7d0[0].y;
run.dyn.fill=s.createPath(_7cf+" "+_7d1).setFill(fill).getFill();
}else{
_7d0.push({x:_7cd[_7cd.length-1].x,y:dim.height-_7c5.b});
_7d0.push({x:_7cd[0].x,y:dim.height-_7c5.b});
_7d0.push(_7cd[0]);
run.dyn.fill=s.createPolyline(_7d0).setFill(fill).getFill();
}
}
if(this.opt.lines||this.opt.markers){
_7c6=_7ca.series.stroke;
if(_7ca.series.outline){
_7c7=run.dyn.outline=dc.makeStroke(_7ca.series.outline);
_7c7.width=2*_7c7.width+_7c6.width;
}
}
if(this.opt.markers){
run.dyn.marker=_7ca.symbol;
}
var _7d2=null,_7d3=null,_7d4=null;
if(_7c6&&_7ca.series.shadow&&_7cd.length>1){
var _7d5=_7ca.series.shadow,_7d6=dojo.map(_7cd,function(c){
return {x:c.x+_7d5.dx,y:c.y+_7d5.dy};
});
if(this.opt.lines){
if(this.opt.tension){
run.dyn.shadow=s.createPath(dc.curve(_7d6,this.opt.tension)).setStroke(_7d5).getStroke();
}else{
run.dyn.shadow=s.createPolyline(_7d6).setStroke(_7d5).getStroke();
}
}
if(this.opt.markers&&_7ca.marker.shadow){
_7d5=_7ca.marker.shadow;
_7d4=dojo.map(_7d6,function(c){
return s.createPath("M"+c.x+" "+c.y+" "+_7ca.symbol).setStroke(_7d5).setFill(_7d5.color);
},this);
}
}
if(this.opt.lines&&_7cd.length>1){
if(_7c7){
if(this.opt.tension){
run.dyn.outline=s.createPath(_7cf).setStroke(_7c7).getStroke();
}else{
run.dyn.outline=s.createPolyline(_7cd).setStroke(_7c7).getStroke();
}
}
if(this.opt.tension){
run.dyn.stroke=s.createPath(_7cf).setStroke(_7c6).getStroke();
}else{
run.dyn.stroke=s.createPolyline(_7cd).setStroke(_7c6).getStroke();
}
}
if(this.opt.markers){
_7d2=new Array(_7cd.length);
_7d3=new Array(_7cd.length);
_7c7=null;
if(_7ca.marker.outline){
_7c7=dc.makeStroke(_7ca.marker.outline);
_7c7.width=2*_7c7.width+(_7ca.marker.stroke?_7ca.marker.stroke.width:0);
}
dojo.forEach(_7cd,function(c,i){
var path="M"+c.x+" "+c.y+" "+_7ca.symbol;
if(_7c7){
_7d3[i]=s.createPath(path).setStroke(_7c7);
}
_7d2[i]=s.createPath(path).setStroke(_7ca.marker.stroke).setFill(_7ca.marker.fill);
},this);
run.dyn.markerFill=_7ca.marker.fill;
run.dyn.markerStroke=_7ca.marker.stroke;
if(_7c9){
dojo.forEach(_7d2,function(s,i){
var o={element:"marker",index:i+_7cc[seg],run:run,shape:s,outline:_7d3[i]||null,shadow:_7d4&&_7d4[i]||null,cx:_7cd[i].x,cy:_7cd[i].y};
if(typeof _7cb[seg][0]=="number"){
o.x=i+_7cc[seg]+1;
o.y=_7cb[seg][i];
}else{
o.x=_7cb[seg][i].x;
o.y=_7cb[seg][i].y;
}
this._connectEvents(o);
_7ce[i+_7cc[seg]]=o;
},this);
}else{
delete this._eventSeries[run.name];
}
}
}
run.dirty=false;
}
if(this.animate){
var _7d7=this.group;
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_7d7,duration:_7c2,transform:[{name:"translate",start:[0,dim.height-_7c5.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play();
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Areas"]){
dojo._hasResource["dojox.charting.plot2d.Areas"]=true;
dojo.provide("dojox.charting.plot2d.Areas");
dojo.declare("dojox.charting.plot2d.Areas",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=true;
this.opt.areas=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Lines"]){
dojo._hasResource["dojox.charting.plot2d.Lines"]=true;
dojo.provide("dojox.charting.plot2d.Lines");
dojo.declare("dojox.charting.plot2d.Lines",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=true;
}});
}
if(!dojo._hasResource["dijit.dijit"]){
dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit");
}
if(!dojo._hasResource["dojox.html.metrics"]){
dojo._hasResource["dojox.html.metrics"]=true;
dojo.provide("dojox.html.metrics");
(function(){
var dhm=dojox.html.metrics;
dhm.getFontMeasurements=function(){
var _7d8={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(dojo.isIE){
dojo.doc.documentElement.style.fontSize="100%";
}
var div=dojo.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
dojo.body().appendChild(div);
for(var p in _7d8){
ds.fontSize=p;
_7d8[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
dojo.body().removeChild(div);
div=null;
return _7d8;
};
var _7d9=null;
dhm.getCachedFontMeasurements=function(_7da){
if(_7da||!_7d9){
_7d9=dhm.getFontMeasurements();
}
return _7d9;
};
var _7db=null,_7dc={};
dhm.getTextBox=function(text,_7dd,_7de){
var m,s;
if(!_7db){
m=_7db=dojo.doc.createElement("div");
var c=dojo.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
dojo.body().appendChild(c);
}else{
m=_7db;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_7dd){
for(var i in _7dd){
if(i in _7dc){
continue;
}
s[i]=_7dd[i];
}
}
if(arguments.length>2&&_7de){
m.className=_7de;
}
m.innerHTML=text;
var box=dojo.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _7df={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_7df.w,h:_7df.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_7e0){
var f=dhm._fontResizeNode=dojo.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
if(dojo.isIE){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[dojox._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[dojox._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
dojo.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
dojo.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(dojo.isIE&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
dojo.addOnLoad(function(){
try{
var n=dojo.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
dojo.body().appendChild(n);
_7df.w=n.offsetWidth-n.clientWidth;
_7df.h=n.offsetHeight-n.clientHeight;
dojo.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in dojo.config&&!!dojo.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
})();
}
if(!dojo._hasResource["dojox.grid.util"]){
dojo._hasResource["dojox.grid.util"]=true;
dojo.provide("dojox.grid.util");
(function(){
var dgu=dojox.grid.util;
dgu.na="...";
dgu.rowIndexTag="gridRowIndex";
dgu.gridViewTag="gridView";
dgu.fire=function(ob,ev,args){
var fn=ob&&ev&&ob[ev];
return fn&&(args?fn.apply(ob,args):ob[ev]());
};
dgu.setStyleHeightPx=function(_7e1,_7e2){
if(_7e2>=0){
var s=_7e1.style;
var v=_7e2+"px";
if(_7e1&&s["height"]!=v){
s["height"]=v;
}
}
};
dgu.mouseEvents=["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];
dgu.keyEvents=["keyup","keydown","keypress"];
dgu.funnelEvents=function(_7e3,_7e4,_7e5,_7e6){
var evts=(_7e6?_7e6:dgu.mouseEvents.concat(dgu.keyEvents));
for(var i=0,l=evts.length;i<l;i++){
_7e4.connect(_7e3,"on"+evts[i],_7e5);
}
};
dgu.removeNode=function(_7e7){
_7e7=dojo.byId(_7e7);
_7e7&&_7e7.parentNode&&_7e7.parentNode.removeChild(_7e7);
return _7e7;
};
dgu.arrayCompare=function(inA,inB){
for(var i=0,l=inA.length;i<l;i++){
if(inA[i]!=inB[i]){
return false;
}
}
return (inA.length==inB.length);
};
dgu.arrayInsert=function(_7e8,_7e9,_7ea){
if(_7e8.length<=_7e9){
_7e8[_7e9]=_7ea;
}else{
_7e8.splice(_7e9,0,_7ea);
}
};
dgu.arrayRemove=function(_7eb,_7ec){
_7eb.splice(_7ec,1);
};
dgu.arraySwap=function(_7ed,inI,inJ){
var _7ee=_7ed[inI];
_7ed[inI]=_7ed[inJ];
_7ed[inJ]=_7ee;
};
})();
}
if(!dojo._hasResource["dojox.grid._Scroller"]){
dojo._hasResource["dojox.grid._Scroller"]=true;
dojo.provide("dojox.grid._Scroller");
(function(){
var _7ef=function(_7f0){
var i=0,n,p=_7f0.parentNode;
while((n=p.childNodes[i++])){
if(n==_7f0){
return i-1;
}
}
return -1;
};
var _7f1=function(_7f2){
if(!_7f2){
return;
}
var _7f3=function(inW){
return inW.domNode&&dojo.isDescendant(inW.domNode,_7f2,true);
};
var ws=dijit.registry.filter(_7f3);
for(var i=0,w;(w=ws[i]);i++){
w.destroy();
}
delete ws;
};
var _7f4=function(_7f5){
var node=dojo.byId(_7f5);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _7f6=function(_7f7,_7f8){
var _7f9=[];
var i=0,n;
while((n=_7f7.childNodes[i])){
i++;
if(_7f4(n)==_7f8){
_7f9.push(n);
}
}
return _7f9;
};
var _7fa=function(_7fb){
return _7f6(_7fb,"div");
};
dojo.declare("dojox.grid._Scroller",null,{constructor:function(_7fc){
this.setContentNodes(_7fc);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_7fd,_7fe,_7ff){
switch(arguments.length){
case 3:
this.rowsPerPage=_7ff;
case 2:
this.keepRows=_7fe;
case 1:
this.rowCount=_7fd;
default:
break;
}
this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
this.setKeepInfo(this.keepRows);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=dojo.hitch(this,"onscroll");
}
},_getPageCount:function(_800,_801){
return _800?(Math.ceil(_800/_801)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_802){
this.keepRows=_802;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_803){
this.contentNodes=_803;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0]||[];
},invalidate:function(){
this._invalidating=true;
this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize();
this._invalidating=false;
},updateRowCount:function(_804){
this.invalidateNodes();
this.rowCount=_804;
var _805=this.pageCount;
if(_805===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_805){
for(var i=_805-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_805){
this.height+=this.defaultPageHeight*(this.pageCount-_805-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_806){
return Boolean(this.getDefaultPageNode(_806));
},measurePage:function(_807){
if(this.grid.rowHeight){
var _808=this.grid.rowHeight+1;
return ((_807+1)*this.rowsPerPage>this.rowCount?this.rowCount-_807*this.rowsPerPage:this.rowsPerPage)*_808;
}
var n=this.getDefaultPageNode(_807);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_809,_80a){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_809].style.top=_80a+"px";
}
},repositionPages:function(_80b){
var _80c=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_80c[_80b];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_80b):0);
for(var p=_80b+1;p<=last;p++){
n=_80c[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_80d){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_80d]);
}
},preparePage:function(_80e,_80f){
var p=(_80f?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _810=this.pageNodes[i];
var _811=(p===null?this.createPageNode():this.invalidatePageNode(p,_810));
_811.pageIndex=_80e;
_810[_80e]=_811;
}
},renderPage:function(_812){
var _813=[];
var i,j;
for(i=0;i<this.colCount;i++){
_813[i]=this.pageNodes[i][_812];
}
for(i=0,j=_812*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_813);
}
},removePage:function(_814){
for(var i=0,j=_814*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_815){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_815,this.pageNodes[i]);
if(n){
dojo.destroy(n);
}
}
},pacify:function(_816){
},pacifying:false,pacifyTicks:200,setPacifying:function(_817){
if(this.pacifying!=_817){
this.pacifying=_817;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _818=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _818;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
dojox.grid.util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _819=(!this._invalidating);
if(!_819){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_819=true;
}
}
if(_819){
this.needPage(this.page,this.pageTop);
}
var _81a=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _81b=this.getPageHeight(this.page);
this.averageRowHeight=(_81b>0&&_81a>0)?(_81b/_81a):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _81c=this.pageCount-1;
var _81d=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_81c]=_81d;
return _81d;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_81e,_81f,_820){
if(this.pageExists(_81e)){
var oh=this.getPageHeight(_81e);
var h=(this.measurePage(_81e));
if(h===undefined){
h=oh;
}
this.pageHeights[_81e]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_81f)){
if(!_820){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_81e);
}
}else{
this.repositionPages(_81e);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_821,_822){
this.updatePageHeight(Math.floor(_821/this.rowsPerPage),false,_822);
},invalidateNodes:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
},createPageNode:function(){
var p=document.createElement("div");
dojo.attr(p,"role","presentation");
p.style.position="absolute";
p.style[dojo._isBodyLtr()?"left":"right"]="0";
return p;
},getPageHeight:function(_823){
var ph=this.pageHeights[_823];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_824){
return this.stack.push(_824);
},popPage:function(){
return this.stack.shift();
},findPage:function(_825){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_825){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_826,_827,_828){
this.preparePage(_826,_827);
this.positionPage(_826,_828);
this.installPage(_826);
this.renderPage(_826);
this.pushPage(_826);
},needPage:function(_829,_82a){
var h=this.getPageHeight(_829),oh=h;
if(!this.pageExists(_829)){
this.buildPage(_829,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_82a);
h=this.updatePageHeight(_829,true);
}else{
this.positionPage(_829,_82a);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_82b){
this.grid.scrollTop=_82b;
if(this.colCount){
this.startPacify();
this.findPage(_82b);
var h=this.height;
var b=this.getScrollBottom(_82b);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_82b);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_82c){
return (this.windowHeight>=0?_82c+this.windowHeight:-1);
},processNodeEvent:function(e,_82d){
var t=e.target;
while(t&&(t!=_82d)&&t.parentNode&&(t.parentNode.parentNode!=_82d)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_82d)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_7ef(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_82e,_82f){
},removeRow:function(_830){
},getDefaultPageNode:function(_831){
return this.getDefaultNodes()[_831];
},positionPageNode:function(_832,_833){
},getPageNodePosition:function(_834){
return _834.offsetTop;
},invalidatePageNode:function(_835,_836){
var p=_836[_835];
if(p){
delete _836[_835];
this.removePage(_835,p);
_7f1(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_837){
return _837*this.rowsPerPage;
},getLastPageRow:function(_838){
return Math.min(this.rowCount,this.getPageRow(_838+1))-1;
},getFirstVisibleRow:function(_839,_83a,_83b){
if(!this.pageExists(_839)){
return 0;
}
var row=this.getPageRow(_839);
var _83c=this.getDefaultNodes();
var rows=_7fa(_83c[_839]);
for(var i=0,l=rows.length;i<l&&_83a<_83b;i++,row++){
_83a+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_83d,_83e,_83f){
if(!this.pageExists(_83d)){
return 0;
}
var _840=this.getDefaultNodes();
var row=this.getLastPageRow(_83d);
var rows=_7fa(_840[_83d]);
for(var i=rows.length-1;i>=0&&_83e>_83f;i--,row--){
_83e-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_841){
var _842=this.getDefaultNodes();
var rows=_7fa(_842[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_841){
this.offset=h-(t-_841);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_843){
var _844=Math.floor(_843/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_844;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_844;
this.needPage(_844,this.pageTop);
var _845=this.getDefaultNodes();
var rows=_7fa(_845[_844]);
var r=_843-this.rowsPerPage*_844;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
})();
}
if(!dojo._hasResource["dojox.grid.cells._base"]){
dojo._hasResource["dojox.grid.cells._base"]=true;
dojo.provide("dojox.grid.cells._base");
dojo.declare("dojox.grid._DeferredTextWidget",dijit._Widget,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(dojo.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
(function(){
var _846=function(_847){
try{
dojox.grid.util.fire(_847,"focus");
dojox.grid.util.fire(_847,"select");
}
catch(e){
}
};
var _848=function(){
setTimeout(dojo.hitch.apply(dojo,arguments),0);
};
var dgc=dojox.grid.cells;
dojo.declare("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_849){
this._props=_849||{};
dojo.mixin(this,_849);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_84a,_84b){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_84a!=this.defaultValue&&f)?f.apply(s,_84b):_84a;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new dojox.grid._DeferredTextWidget({deferred:v},dojo.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_84c,_84d){
var f,i=this.grid.edit.info,d=this.get?this.get(_84c,_84d):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_84c&&i.cell==this))){
return this.formatEditing(d,_84c);
}else{
return this._defaultFormat(d,[d,_84c,this]);
}
},formatEditing:function(_84e,_84f){
},getNode:function(_850){
return this.view.getCellNode(_850,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_851){
return (this.getNode(_851)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&dojo.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_852,_853){
this.grid.edit.applyCellEdit(_852,this,_853);
},cancelEdit:function(_854){
this.grid.doCancelEdit(_854);
},_onEditBlur:function(_855){
if(this.grid.edit.isEditCell(_855,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_856,_857){
if(this.commitOnBlur){
dojo.connect(_856,"onblur",function(e){
setTimeout(dojo.hitch(this,"_onEditBlur",_857),250);
});
}
},needFormatNode:function(_858,_859){
this._formatPending=true;
_848(this,"_formatNode",_858,_859);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_85a,_85b){
if(this._formatPending){
this._formatPending=false;
dojo.setSelectable(this.grid.domNode,true);
this.formatNode(this.getEditNode(_85b),_85a,_85b);
}
},formatNode:function(_85c,_85d,_85e){
if(dojo.isIE){
_848(this,"focus",_85e,_85c);
}else{
this.focus(_85e,_85c);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_85f){
return this.getEditNode(_85f)[this._valueProp];
},setValue:function(_860,_861){
var n=this.getEditNode(_860);
if(n){
n[this._valueProp]=_861;
}
},focus:function(_862,_863){
_846(_863||this.getEditNode(_862));
},save:function(_864){
this.value=this.value||this.getValue(_864);
},restore:function(_865){
this.setValue(_865,this.value);
},_finish:function(_866){
dojo.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_867){
this.applyEdit(this.getValue(_867),_867);
this._finish(_867);
},cancel:function(_868){
this.cancelEdit(_868);
this._finish(_868);
}});
dgc._Base.markupFactory=function(node,_869){
var d=dojo;
var _86a=d.trim(d.attr(node,"formatter")||"");
if(_86a){
_869.formatter=dojo.getObject(_86a)||_86a;
}
var get=d.trim(d.attr(node,"get")||"");
if(get){
_869.get=dojo.getObject(get);
}
var _86b=function(attr,cell,_86c){
var _86d=d.trim(d.attr(node,attr)||"");
if(_86d){
cell[_86c||attr]=!(_86d.toLowerCase()=="false");
}
};
_86b("sortDesc",_869);
_86b("editable",_869);
_86b("alwaysEditing",_869);
_86b("noresize",_869);
_86b("draggable",_869);
var _86e=d.trim(d.attr(node,"loadingText")||d.attr(node,"defaultValue")||"");
if(_86e){
_869.defaultValue=_86e;
}
var _86f=function(attr,cell,_870){
var _871=d.trim(d.attr(node,attr)||"")||undefined;
if(_871){
cell[_870||attr]=_871;
}
};
_86f("styles",_869);
_86f("headerStyles",_869);
_86f("cellStyles",_869);
_86f("classes",_869);
_86f("headerClasses",_869);
_86f("cellClasses",_869);
};
dojo.declare("dojox.grid.cells.Cell",dgc._Base,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_872,_873){
this.needFormatNode(_872,_873);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_872+"\">";
},formatNode:function(_874,_875,_876){
this.inherited(arguments);
this.registerOnBlur(_874,_876);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
dojo.stopEvent(e);
}
}
},_finish:function(_877){
this.inherited(arguments);
var n=this.getEditNode(_877);
try{
dojox.grid.util.fire(n,"blur");
}
catch(e){
}
}});
dgc.Cell.markupFactory=function(node,_878){
dgc._Base.markupFactory(node,_878);
var d=dojo;
var _879=d.trim(d.attr(node,"keyFilter")||"");
if(_879){
_878.keyFilter=new RegExp(_879);
}
};
dojo.declare("dojox.grid.cells.RowIndex",dgc.Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_87a){
return _87a+1;
}});
dgc.RowIndex.markupFactory=function(node,_87b){
dgc.Cell.markupFactory(node,_87b);
};
dojo.declare("dojox.grid.cells.Select",dgc.Cell,{options:null,values:null,returnIndex:-1,constructor:function(_87c){
this.values=this.values||this.options;
},formatEditing:function(_87d,_87e){
this.needFormatNode(_87d,_87e);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
h.push("<option",(_87d==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},getValue:function(_87f){
var n=this.getEditNode(_87f);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
dgc.Select.markupFactory=function(node,cell){
dgc.Cell.markupFactory(node,cell);
var d=dojo;
var _880=d.trim(d.attr(node,"options")||"");
if(_880){
var o=_880.split(",");
if(o[0]!=_880){
cell.options=o;
}
}
var _881=d.trim(d.attr(node,"values")||"");
if(_881){
var v=_881.split(",");
if(v[0]!=_881){
cell.values=v;
}
}
};
dojo.declare("dojox.grid.cells.AlwaysEdit",dgc.Cell,{alwaysEditing:true,_formatNode:function(_882,_883){
this.formatNode(this.getEditNode(_883),_882,_883);
},applyStaticValue:function(_884){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_884),this,_884);
e.start(this,_884,true);
}});
dgc.AlwaysEdit.markupFactory=function(node,cell){
dgc.Cell.markupFactory(node,cell);
};
dojo.declare("dojox.grid.cells.Bool",dgc.AlwaysEdit,{_valueProp:"checked",formatEditing:function(_885,_886){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_885?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
dgc.Bool.markupFactory=function(node,cell){
dgc.AlwaysEdit.markupFactory(node,cell);
};
})();
}
if(!dojo._hasResource["dojox.grid.cells"]){
dojo._hasResource["dojox.grid.cells"]=true;
dojo.provide("dojox.grid.cells");
}
if(!dojo._hasResource["dojox.grid._Builder"]){
dojo._hasResource["dojox.grid._Builder"]=true;
dojo.provide("dojox.grid._Builder");
(function(){
var dg=dojox.grid;
var _887=function(td){
return td.cellIndex>=0?td.cellIndex:dojo.indexOf(td.parentNode.cells,td);
};
var _888=function(tr){
return tr.rowIndex>=0?tr.rowIndex:dojo.indexOf(tr.parentNode.childNodes,tr);
};
var _889=function(_88a,_88b){
return _88a&&((_88a.rows||0)[_88b]||_88a.childNodes[_88b]);
};
var _88c=function(node){
for(var n=node;n&&n.tagName!="TABLE";n=n.parentNode){
}
return n;
};
var _88d=function(_88e,_88f){
for(var n=_88e;n&&_88f(n);n=n.parentNode){
}
return n;
};
var _890=function(_891){
var name=_891.toUpperCase();
return function(node){
return node.tagName!=name;
};
};
var _892=dojox.grid.util.rowIndexTag;
var _893=dojox.grid.util.gridViewTag;
dg._Builder=dojo.extend(function(view){
if(view){
this.view=view;
this.grid=view.grid;
}
},{view:null,_table:"<table class=\"dojoxGridRowTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"",getTableArray:function(){
var html=[this._table];
if(this.view.viewWidth){
html.push([" style=\"width:",this.view.viewWidth,";\""].join(""));
}
html.push(">");
return html;
},generateCellMarkup:function(_894,_895,_896,_897){
var _898=[],html;
if(_897){
var _899=_894.index!=_894.grid.getSortIndex()?"":_894.grid.sortInfo>0?"aria-sort=\"ascending\"":"aria-sort=\"descending\"";
if(!_894.id){
_894.id=this.grid.id+"Hdr"+_894.index;
}
html=["<th tabIndex=\"-1\" aria-readonly=\"true\" role=\"columnheader\"",_899,"id=\"",_894.id,"\""];
}else{
var _89a=this.grid.editable&&!_894.editable?"aria-readonly=\"true\"":"";
html=["<td tabIndex=\"-1\" role=\"gridcell\"",_89a];
}
if(_894.colSpan){
html.push(" colspan=\"",_894.colSpan,"\"");
}
if(_894.rowSpan){
html.push(" rowspan=\"",_894.rowSpan,"\"");
}
html.push(" class=\"dojoxGridCell ");
if(_894.classes){
html.push(_894.classes," ");
}
if(_896){
html.push(_896," ");
}
_898.push(html.join(""));
_898.push("");
html=["\" idx=\"",_894.index,"\" style=\""];
if(_895&&_895[_895.length-1]!=";"){
_895+=";";
}
html.push(_894.styles,_895||"",_894.hidden?"display:none;":"");
if(_894.unitWidth){
html.push("width:",_894.unitWidth,";");
}
_898.push(html.join(""));
_898.push("");
html=["\""];
if(_894.attrs){
html.push(" ",_894.attrs);
}
html.push(">");
_898.push(html.join(""));
_898.push("");
_898.push(_897?"</th>":"</td>");
return _898;
},isCellNode:function(_89b){
return Boolean(_89b&&_89b!=dojo.doc&&dojo.attr(_89b,"idx"));
},getCellNodeIndex:function(_89c){
return _89c?Number(dojo.attr(_89c,"idx")):-1;
},getCellNode:function(_89d,_89e){
for(var i=0,row;((row=_889(_89d.firstChild,i))&&row.cells);i++){
for(var j=0,cell;(cell=row.cells[j]);j++){
if(this.getCellNodeIndex(cell)==_89e){
return cell;
}
}
}
return null;
},findCellTarget:function(_89f,_8a0){
var n=_89f;
while(n&&(!this.isCellNode(n)||(n.offsetParent&&_893 in n.offsetParent.parentNode&&n.offsetParent.parentNode[_893]!=this.view.id))&&(n!=_8a0)){
n=n.parentNode;
}
return n!=_8a0?n:null;
},baseDecorateEvent:function(e){
e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
},findTarget:function(_8a1,_8a2){
var n=_8a1;
while(n&&(n!=this.domNode)&&(!(_8a2 in n)||(_893 in n&&n[_893]!=this.view.id))){
n=n.parentNode;
}
return (n!=this.domNode)?n:null;
},findRowTarget:function(_8a3){
return this.findTarget(_8a3,_892);
},isIntraNodeEvent:function(e){
try{
return (e.cellNode&&e.relatedTarget&&dojo.isDescendant(e.relatedTarget,e.cellNode));
}
catch(x){
return false;
}
},isIntraRowEvent:function(e){
try{
var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex);
}
catch(x){
return false;
}
},dispatchEvent:function(e){
if(e.dispatch in this){
return this[e.dispatch](e);
}
return false;
},domouseover:function(e){
if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){
this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e);
}
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){
this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}
},domousedown:function(e){
if(e.cellNode){
this.grid.onMouseDown(e);
}
this.grid.onMouseDownRow(e);
}});
dg._ContentBuilder=dojo.extend(function(view){
dg._Builder.call(this,view);
},dg._Builder.prototype,{update:function(){
this.prepareHtml();
},prepareHtml:function(){
var _8a4=this.grid.get,_8a5=this.view.structure.cells;
for(var j=0,row;(row=_8a5[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.get=cell.get||(cell.value==undefined)&&_8a4;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false);
if(!this.grid.editable&&cell.editable){
this.grid.editable=true;
}
}
}
},generateHtml:function(_8a6,_8a7){
var html=this.getTableArray(),v=this.view,_8a8=v.structure.cells,item=this.grid.getItem(_8a7);
dojox.grid.util.fire(this.view,"onBeforeRow",[_8a7,_8a8]);
for(var j=0,row;(row=_8a8[j]);j++){
if(row.hidden||row.header){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,m,cc,cs;(cell=row[i]);i++){
m=cell.markup;
cc=cell.customClasses=[];
cs=cell.customStyles=[];
m[5]=cell.format(_8a7,item);
m[1]=cc.join(" ");
m[3]=cs.join(";");
html.push.apply(html,m);
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},decorateEvent:function(e){
e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){
return false;
}
e.rowIndex=e.rowNode[_892];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true;
}});
dg._HeaderBuilder=dojo.extend(function(view){
this.moveable=null;
dg._Builder.call(this,view);
},dg._Builder.prototype,{_skipBogusClicks:false,overResizeWidth:4,minColWidth:1,update:function(){
if(this.tableMap){
this.tableMap.mapRows(this.view.structure.cells);
}else{
this.tableMap=new dg._TableMap(this.view.structure.cells);
}
},generateHtml:function(_8a9,_8aa){
var html=this.getTableArray(),_8ab=this.view.structure.cells;
dojox.grid.util.fire(this.view,"onBeforeRow",[-1,_8ab]);
for(var j=0,row;(row=_8ab[j]);j++){
if(row.hidden){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,_8ac;(cell=row[i]);i++){
cell.customClasses=[];
cell.customStyles=[];
if(this.view.simpleStructure){
if(cell.draggable){
if(cell.headerClasses){
if(cell.headerClasses.indexOf("dojoDndItem")==-1){
cell.headerClasses+=" dojoDndItem";
}
}else{
cell.headerClasses="dojoDndItem";
}
}
if(cell.attrs){
if(cell.attrs.indexOf("dndType='gridColumn_")==-1){
cell.attrs+=" dndType='gridColumn_"+this.grid.id+"'";
}
}else{
cell.attrs="dndType='gridColumn_"+this.grid.id+"'";
}
}
_8ac=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
_8ac[5]=(_8aa!=undefined?_8aa:_8a9(cell));
_8ac[3]=cell.customStyles.join(";");
_8ac[1]=cell.customClasses.join(" ");
html.push(_8ac.join(""));
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},getCellX:function(e){
var n,x=e.layerX;
if(dojo.isMoz||dojo.isIE>=9){
n=_88d(e.target,_890("th"));
x-=(n&&n.offsetLeft)||0;
var t=e.sourceView.getScrollbarWidth();
if(!dojo._isBodyLtr()){
table=_88d(n,_890("table"));
x-=(table&&table.offsetLeft)||0;
}
}
n=_88d(e.target,function(){
if(!n||n==e.cellNode){
return false;
}
x+=(n.offsetLeft<0?0:n.offsetLeft);
return true;
});
return x;
},decorateEvent:function(e){
this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true;
},prepareResize:function(e,mod){
do{
var i=_887(e.cellNode);
e.cellNode=(i?e.cellNode.parentNode.cells[i+mod]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
}while(e.cellNode&&e.cellNode.style.display=="none");
return Boolean(e.cellNode);
},canResize:function(e){
if(!e.cellNode||e.cellNode.colSpan>1){
return false;
}
var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&cell.canResize();
},overLeftResizeArea:function(e){
if(dojo.hasClass(dojo.body(),"dojoDndMove")){
return false;
}
if(dojo.isIE){
var tN=e.target;
if(dojo.hasClass(tN,"dojoxGridArrowButtonNode")||dojo.hasClass(tN,"dojoxGridArrowButtonChar")){
return false;
}
}
if(dojo._isBodyLtr()){
return (e.cellIndex>0)&&(e.cellX>0&&e.cellX<this.overResizeWidth)&&this.prepareResize(e,-1);
}
var t=e.cellNode&&(e.cellX>0&&e.cellX<this.overResizeWidth);
return t;
},overRightResizeArea:function(e){
if(dojo.hasClass(dojo.body(),"dojoDndMove")){
return false;
}
if(dojo.isIE){
var tN=e.target;
if(dojo.hasClass(tN,"dojoxGridArrowButtonNode")||dojo.hasClass(tN,"dojoxGridArrowButtonChar")){
return false;
}
}
if(dojo._isBodyLtr()){
return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth);
}
return (e.cellIndex>0)&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)&&this.prepareResize(e,-1);
},domousemove:function(e){
if(!this.moveable){
var c=(this.overRightResizeArea(e)?"dojoxGridColResize":(this.overLeftResizeArea(e)?"dojoxGridColResize":""));
if(c&&!this.canResize(e)){
c="dojoxGridColNoResize";
}
dojo.toggleClass(e.sourceView.headerNode,"dojoxGridColNoResize",(c=="dojoxGridColNoResize"));
dojo.toggleClass(e.sourceView.headerNode,"dojoxGridColResize",(c=="dojoxGridColResize"));
if(dojo.isIE){
var t=e.sourceView.headerNode.scrollLeft;
e.sourceView.headerNode.scrollLeft=t;
}
if(c){
dojo.stopEvent(e);
}
}
},domousedown:function(e){
if(!this.moveable){
if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){
this.beginColumnResize(e);
}else{
this.grid.onMouseDown(e);
this.grid.onMouseOverRow(e);
}
}
},doclick:function(e){
if(this._skipBogusClicks){
dojo.stopEvent(e);
return true;
}
return false;
},colResizeSetup:function(e,_8ad){
var _8ae=dojo.contentBox(e.sourceView.headerNode);
if(_8ad){
this.lineDiv=document.createElement("div");
var vw=(dojo.position||dojo._abs)(e.sourceView.headerNode,true);
var _8af=dojo.contentBox(e.sourceView.domNode);
var l=e.pageX;
if(!dojo._isBodyLtr()&&dojo.isIE<8){
l-=dojox.html.metrics.getScrollbar().w;
}
dojo.style(this.lineDiv,{top:vw.y+"px",left:l+"px",height:(_8af.h+_8ae.h)+"px"});
dojo.addClass(this.lineDiv,"dojoxGridResizeColLine");
this.lineDiv._origLeft=l;
dojo.body().appendChild(this.lineDiv);
}
var _8b0=[],_8b1=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;(cell=_8b1[i]);i++){
_8b0.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth});
}
var view=e.sourceView;
var adj=dojo._isBodyLtr()?1:-1;
var _8b2=e.grid.views.views;
var _8b3=[];
for(var j=view.idx+adj,_8b4;(_8b4=_8b2[j]);j=j+adj){
_8b3.push({node:_8b4.headerNode,left:window.parseInt(_8b4.headerNode.style.left)});
}
var _8b5=view.headerContentNode.firstChild;
var drag={scrollLeft:e.sourceView.headerNode.scrollLeft,view:view,node:e.cellNode,index:e.cellIndex,w:dojo.contentBox(e.cellNode).w,vw:_8ae.w,table:_8b5,tw:dojo.contentBox(_8b5).w,spanners:_8b0,followers:_8b3};
return drag;
},beginColumnResize:function(e){
this.moverDiv=document.createElement("div");
dojo.style(this.moverDiv,{position:"absolute",left:0});
dojo.body().appendChild(this.moverDiv);
dojo.addClass(this.grid.domNode,"dojoxGridColumnResizing");
var m=(this.moveable=new dojo.dnd.Moveable(this.moverDiv));
var drag=this.colResizeSetup(e,true);
m.onMove=dojo.hitch(this,"doResizeColumn",drag);
dojo.connect(m,"onMoveStop",dojo.hitch(this,function(){
this.endResizeColumn(drag);
if(drag.node.releaseCapture){
drag.node.releaseCapture();
}
this.moveable.destroy();
delete this.moveable;
this.moveable=null;
dojo.removeClass(this.grid.domNode,"dojoxGridColumnResizing");
}));
if(e.cellNode.setCapture){
e.cellNode.setCapture();
}
m.onMouseDown(e);
},doResizeColumn:function(_8b6,_8b7,_8b8){
var _8b9=_8b8.l;
var data={deltaX:_8b9,w:_8b6.w+(dojo._isBodyLtr()?_8b9:-_8b9),vw:_8b6.vw+_8b9,tw:_8b6.tw+_8b9};
this.dragRecord={inDrag:_8b6,mover:_8b7,leftTop:_8b8};
if(data.w>=this.minColWidth){
if(!_8b7){
this.doResizeNow(_8b6,data);
}else{
dojo.style(this.lineDiv,"left",(this.lineDiv._origLeft+data.deltaX)+"px");
}
}
},endResizeColumn:function(_8ba){
if(this.dragRecord){
var _8bb=this.dragRecord.leftTop;
var _8bc=dojo._isBodyLtr()?_8bb.l:-_8bb.l;
_8bc+=Math.max(_8ba.w+_8bc,this.minColWidth)-(_8ba.w+_8bc);
if(dojo.isWebKit&&_8ba.spanners.length){
_8bc+=dojo._getPadBorderExtents(_8ba.spanners[0].node).w;
}
var data={deltaX:_8bc,w:_8ba.w+_8bc,vw:_8ba.vw+_8bc,tw:_8ba.tw+_8bc};
this.doResizeNow(_8ba,data);
delete this.dragRecord;
}
dojo.destroy(this.lineDiv);
dojo.destroy(this.moverDiv);
dojo.destroy(this.moverDiv);
delete this.moverDiv;
this._skipBogusClicks=true;
_8ba.view.update();
this._skipBogusClicks=false;
this.grid.onResizeColumn(_8ba.index);
},doResizeNow:function(_8bd,data){
_8bd.view.convertColPctToFixed();
if(_8bd.view.flexCells&&!_8bd.view.testFlexCells()){
var t=_88c(_8bd.node);
if(t){
(t.style.width="");
}
}
var i,s,sw,f,fl;
for(i=0;(s=_8bd.spanners[i]);i++){
sw=s.width+data.deltaX;
if(sw>0){
s.node.style.width=sw+"px";
_8bd.view.setColWidth(s.index,sw);
}
}
if(dojo._isBodyLtr()||!dojo.isIE){
for(i=0;(f=_8bd.followers[i]);i++){
fl=f.left+data.deltaX;
f.node.style.left=fl+"px";
}
}
_8bd.node.style.width=data.w+"px";
_8bd.view.setColWidth(_8bd.index,data.w);
_8bd.view.headerNode.style.width=data.vw+"px";
_8bd.view.setColumnsWidth(data.tw);
if(!dojo._isBodyLtr()){
_8bd.view.headerNode.scrollLeft=_8bd.scrollLeft+data.deltaX;
}
}});
dg._TableMap=dojo.extend(function(rows){
this.mapRows(rows);
},{map:null,mapRows:function(_8be){
var _8bf=_8be.length;
if(!_8bf){
return;
}
this.map=[];
var row;
for(var k=0;(row=_8be[k]);k++){
this.map[k]=[];
}
for(var j=0;(row=_8be[j]);j++){
for(var i=0,x=0,cell,_8c0,_8c1;(cell=row[i]);i++){
while(this.map[j][x]){
x++;
}
this.map[j][x]={c:i,r:j};
_8c1=cell.rowSpan||1;
_8c0=cell.colSpan||1;
for(var y=0;y<_8c1;y++){
for(var s=0;s<_8c0;s++){
this.map[j+y][x+s]=this.map[j][x];
}
}
x+=_8c0;
}
}
},dumpMap:function(){
for(var j=0,row,h="";(row=this.map[j]);j++,h=""){
for(var i=0,cell;(cell=row[i]);i++){
h+=cell.r+","+cell.c+"   ";
}
}
},getMapCoords:function(_8c2,_8c3){
for(var j=0,row;(row=this.map[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
if(cell.c==_8c3&&cell.r==_8c2){
return {j:j,i:i};
}
}
}
return {j:-1,i:-1};
},getNode:function(_8c4,_8c5,_8c6){
var row=_8c4&&_8c4.rows[_8c5];
return row&&row.cells[_8c6];
},_findOverlappingNodes:function(_8c7,_8c8,_8c9){
var _8ca=[];
var m=this.getMapCoords(_8c8,_8c9);
for(var j=0,row;(row=this.map[j]);j++){
if(j==m.j){
continue;
}
var rw=row[m.i];
var n=(rw?this.getNode(_8c7,rw.r,rw.c):null);
if(n){
_8ca.push(n);
}
}
return _8ca;
},findOverlappingNodes:function(_8cb){
return this._findOverlappingNodes(_88c(_8cb),_888(_8cb.parentNode),_887(_8cb));
}});
})();
}
if(!dojo._hasResource["dojo.dnd.Container"]){
dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(node,_8cc){
this.node=dojo.byId(node);
if(!_8cc){
_8cc={};
}
this.creator=_8cc.creator||null;
this.skipForm=_8cc.skipForm;
this.parent=_8cc.dropParent&&dojo.byId(_8cc.dropParent);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(_8cc&&_8cc._skipStartup)){
this.startup();
}
this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return dojo.query("> .dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dojo.dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_8cd,_8ce){
if(!this.parent.firstChild){
_8ce=null;
}else{
if(_8cd){
if(!_8ce){
_8ce=this.parent.firstChild;
}
}else{
if(_8ce){
_8ce=_8ce.nextSibling;
}
}
}
if(_8ce){
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_8ce);
}
}else{
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_8cf,node){
_8cf._skipStartup=true;
return new dojo.dnd.Container(node,_8cf);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dojo.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_8d0){
var _8d1="dojoDnd"+type;
var _8d2=type.toLowerCase()+"State";
dojo.replaceClass(this.node,_8d1+_8d0,_8d1+this[_8d2]);
this[_8d2]=_8d0;
},_addItemClass:function(node,type){
dojo.addClass(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
dojo.removeClass(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _8d3=node.parentNode;_8d3;node=_8d3,_8d3=node.parentNode){
if(_8d3==this.parent&&dojo.hasClass(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!dojo.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dojo.dnd.getUniqueId();
}
dojo.addClass(t.node,"dojoDndItem");
return t;
}});
dojo.dnd._createNode=function(tag){
if(!tag){
return dojo.dnd._createSpan;
}
return function(text){
return dojo.create(tag,{innerHTML:text});
};
};
dojo.dnd._createTrTd=function(text){
var tr=dojo.create("tr");
dojo.create("td",{innerHTML:text},tr);
return tr;
};
dojo.dnd._createSpan=function(text){
return dojo.create("span",{innerHTML:text});
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _8d4=item&&dojo.isObject(item),data,type,n;
if(_8d4&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_8d4&&item.data)?item.data:item;
type=(_8d4&&item.type)?item.type:["text"];
n=(hint=="avatar"?dojo.dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dojo.dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
}
if(!dojo._hasResource["dojo.dnd.Selector"]){
dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(node,_8d5){
if(!_8d5){
_8d5={};
}
this.singular=_8d5.singular;
this.autoSync=_8d5.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"));
},singular:false,getSelectedNodes:function(){
var t=new dojo.NodeList();
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dojo.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dojo.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dojo.byId(i);
this.delItem(i);
dojo.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||dojo.global;
var s=this.selection,e=dojo.dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
dojo.dnd.Selector.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
dojo.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_8d6,data,_8d7,_8d8){
var _8d9=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_8d9.call(this,item,hint);
if(_8d6){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
dojo.dnd.Selector.superclass.insertNodes.call(this,data,_8d7,_8d8);
this._normalizedCreator=_8d9;
return this;
},destroy:function(){
dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null;
},markupFactory:function(_8da,node){
_8da._skipStartup=true;
return new dojo.dnd.Selector(node,_8da);
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dojo.isCopyKey(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(e.button===dojo.mouseButtons.LEFT){
dojo.stopEvent(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dojo.isCopyKey(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0;
for(;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dojo.isCopyKey(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dojo.isCopyKey(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
dojo.stopEvent(e);
},onMouseUp:function(e){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(e){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove");
},onOutEvent:function(){
dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent;
},_removeSelection:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dojo.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
}
if(!dojo._hasResource["dojo.dnd.Avatar"]){
dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.declare("dojo.dnd.Avatar",null,{constructor:function(_8db){
this.manager=_8db;
this.construct();
},construct:function(){
this.isA11y=dojo.hasClass(dojo.body(),"dijit_a11y");
var a=dojo.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_8dc=this.manager.source,node,b=dojo.create("tbody",null,a),tr=dojo.create("tr",null,b),td=dojo.create("td",null,tr),icon=this.isA11y?dojo.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td):null,span=dojo.create("span",{innerHTML:_8dc.generateText?this._generateText():""},td),k=Math.min(5,this.manager.nodes.length),i=0;
dojo.attr(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_8dc.creator){
node=_8dc._normalizedCreator(_8dc.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _8dd=dojo.create("table"),_8de=dojo.create("tbody",null,_8dd);
_8de.appendChild(node);
node=_8dd;
}
}
node.id="";
tr=dojo.create("tr",null,b);
td=dojo.create("td",null,tr);
td.appendChild(node);
dojo.attr(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
dojo.destroy(this.node);
this.node=false;
},update:function(){
dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
if(this.isA11y){
var icon=dojo.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
dojo.query(("tr.dojoDndAvatarHeader td span"+(this.isA11y?" span":"")),this.node).forEach(function(node){
node.innerHTML=this._generateText();
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
}
if(!dojo._hasResource["dojo.dnd.Manager"]){
dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Manager",null,{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:16,OFFSET_Y:16,overSource:function(_8df){
if(this.avatar){
this.target=(_8df&&_8df.targetState!="Disabled")?_8df:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
dojo.publish("/dnd/source/over",[_8df]);
},outSource:function(_8e0){
if(this.avatar){
if(this.target==_8e0){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null]);
}
}else{
dojo.publish("/dnd/source/over",[null]);
}
},startDrag:function(_8e1,_8e2,copy){
this.source=_8e1;
this.nodes=_8e2;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[_8e1,_8e2,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp"),dojo.connect(dojo.doc,"ondragstart",dojo.stopEvent),dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent)];
var c="dojoDnd"+(copy?"Copy":"Move");
dojo.addClass(dojo.body(),c);
},canDrop:function(flag){
var _8e3=Boolean(this.target&&flag);
if(this.canDropFlag!=_8e3){
this.canDropFlag=_8e3;
this.avatar.update();
}
},stopDrag:function(){
dojo.removeClass(dojo.body(),["dojoDndCopy","dojoDndMove"]);
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new dojo.dnd.Avatar(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
dojo.dnd.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e))),_8e4=[this.source,this.nodes,copy,this.target,e];
dojo.publish("/dnd/drop/before",_8e4);
dojo.publish("/dnd/drop",_8e4);
}else{
dojo.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case dojo.keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case dojo.keys.ESCAPE:
dojo.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==dojo.keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.replaceClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){
if(!dojo.dnd._manager){
dojo.dnd._manager=new dojo.dnd.Manager();
}
return dojo.dnd._manager;
};
}
if(!dojo._hasResource["dojo.dnd.Source"]){
dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_8e5){
dojo.mixin(this,dojo.mixin({},_8e5));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
dojo.addClass(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
dojo.addClass(this.node,"dojoDndTarget");
}
if(this.horizontal){
dojo.addClass(this.node,"dojoDndHorizontal");
}
this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")];
},checkAcceptance:function(_8e6,_8e7){
if(this==_8e6){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_8e7.length;++i){
var type=_8e6.getItem(_8e7[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_8e8,self){
if(_8e8){
return true;
}
if(arguments.length<2){
self=this==dojo.dnd.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null;
},markupFactory:function(_8e9,node){
_8e9._skipStartup=true;
return new dojo.dnd.Source(node,_8e9);
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _8ea=this.getSelectedNodes();
if(_8ea.length){
m.startDrag(this,_8ea,this.copyState(dojo.isCopyKey(e),true));
}
}
}
if(this.isDragging){
var _8eb=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=dojo.position(this.current,true);
}
if(this.horizontal){
_8eb=(e.pageX-this.targetBox.x)<(this.targetBox.w/2);
}else{
_8eb=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_8eb!=this.before){
this._markTargetAnchor(_8eb);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
dojo.dnd.Source.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_8ec){
if(this!=_8ec){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_8ed,_8ee,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_8ed?(copy?"Copied":"Moved"):"");
}
var _8ef=this.accept&&this.checkAcceptance(_8ed,_8ee);
this._changeState("Target",_8ef?"":"Disabled");
if(this==_8ed){
dojo.dnd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_8f0,_8f1,copy,_8f2){
if(this==_8f2){
this.onDrop(_8f0,_8f1,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_8f3,_8f4,copy){
if(this!=_8f3){
this.onDropExternal(_8f3,_8f4,copy);
}else{
this.onDropInternal(_8f4,copy);
}
},onDropExternal:function(_8f5,_8f6,copy){
var _8f7=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _8f7.call(this,_8f5.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node,hint){
var t=_8f5.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node,hint){
var t=_8f5.getItem(node.id);
_8f5.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_8f5.selectNone();
}
this.insertNodes(true,_8f6,this.before,this.current);
if(!copy&&this.creator){
_8f5.deleteSelectedNodes();
}
this._normalizedCreator=_8f7;
},onDropInternal:function(_8f8,copy){
var _8f9=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _8f9.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_8f8,this.before,this.current);
this._normalizedCreator=_8f9;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_8fa){
if(this.current==this.targetAnchor&&this.before==_8fa){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_8fa;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(!dojo.mouseButtons.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(dojo.hasClass(node,"dojoDndHandle")){
return true;
}
if(dojo.hasClass(node,"dojoDndItem")||dojo.hasClass(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(node,_8fb){
this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource");
},markupFactory:function(_8fc,node){
_8fc._skipStartup=true;
return new dojo.dnd.Target(node,_8fc);
}});
dojo.declare("dojo.dnd.AutoSource",dojo.dnd.Source,{constructor:function(node,_8fd){
this.autoSync=true;
},markupFactory:function(_8fe,node){
_8fe._skipStartup=true;
return new dojo.dnd.AutoSource(node,_8fe);
}});
}
if(!dojo._hasResource["dojox.grid._View"]){
dojo._hasResource["dojox.grid._View"]=true;
dojo.provide("dojox.grid._View");
(function(){
var _8ff=function(_900,_901){
return _900.style.cssText==undefined?_900.getAttribute("style"):_900.style.cssText;
};
dojo.declare("dojox.grid._View",[dijit._Widget,dijit._Templated],{defaultWidth:"18em",viewWidth:"",templateString:"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n",themeable:false,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:dojox.grid._HeaderBuilder,_contentBuilderClass:dojox.grid._ContentBuilder,postMixInProperties:function(){
this.rowNodes={};
},postCreate:function(){
this.connect(this.scrollboxNode,"onscroll","doscroll");
dojox.grid.util.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);
dojox.grid.util.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new this._contentBuilderClass(this);
this.header=new this._headerBuilderClass(this);
if(!dojo._isBodyLtr()){
this.headerNodeContainer.style.width="";
}
},destroy:function(){
dojo.destroy(this.headerNode);
delete this.headerNode;
for(var i in this.rowNodes){
dojo.destroy(this.rowNodes[i]);
}
this.rowNodes={};
if(this.source){
this.source.destroy();
}
this.inherited(arguments);
},focus:function(){
if(dojo.isIE||dojo.isWebKit||dojo.isOpera){
this.hiddenFocusNode.focus();
}else{
this.scrollboxNode.focus();
}
},setStructure:function(_902){
var vs=(this.structure=_902);
if(vs.width&&!isNaN(vs.width)){
this.viewWidth=vs.width+"em";
}else{
this.viewWidth=vs.width||(vs.noscroll?"auto":this.viewWidth);
}
this._onBeforeRow=vs.onBeforeRow||function(){
};
this._onAfterRow=vs.onAfterRow||function(){
};
this.noscroll=vs.noscroll;
if(this.noscroll){
this.scrollboxNode.style.overflow="hidden";
}
this.simpleStructure=Boolean(vs.cells.length==1);
this.testFlexCells();
this.updateStructure();
},_cleanupRowWidgets:function(_903){
if(_903){
dojo.forEach(dojo.query("[widgetId]",_903).map(dijit.byNode),function(w){
if(w._destroyOnRemove){
w.destroy();
delete w;
}else{
if(w.domNode&&w.domNode.parentNode){
w.domNode.parentNode.removeChild(w.domNode);
}
}
});
}
},onBeforeRow:function(_904,_905){
this._onBeforeRow(_904,_905);
if(_904>=0){
this._cleanupRowWidgets(this.getRowNode(_904));
}
},onAfterRow:function(_906,_907,_908){
this._onAfterRow(_906,_907,_908);
var g=this.grid;
dojo.forEach(dojo.query(".dojoxGridStubNode",_908),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _909=window.parseInt(dojo.attr(n,"cellIdx"),10);
var _90a=g.getCell(_909);
var w=dijit.byId(lw);
if(w){
n.parentNode.replaceChild(w.domNode,n);
if(!w._started){
w.startup();
}
}else{
n.innerHTML="";
}
}
},this);
},testFlexCells:function(){
this.flexCells=false;
for(var j=0,row;(row=this.structure.cells[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.view=this;
this.flexCells=this.flexCells||cell.isFlex();
}
}
return this.flexCells;
},updateStructure:function(){
this.header.update();
this.content.update();
},getScrollbarWidth:function(){
var _90b=this.hasVScrollbar();
var _90c=dojo.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_90c||_90c=="hidden"){
_90b=false;
}else{
if(_90c=="scroll"){
_90b=true;
}
}
return (_90b?dojox.html.metrics.getScrollbar().w:0);
},getColumnsWidth:function(){
var h=this.headerContentNode;
return h&&h.firstChild?h.firstChild.offsetWidth:0;
},setColumnsWidth:function(_90d){
this.headerContentNode.firstChild.style.width=_90d+"px";
if(this.viewWidth){
this.viewWidth=_90d+"px";
}
},getWidth:function(){
return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px";
},getContentWidth:function(){
return Math.max(0,dojo._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px";
},render:function(){
this.scrollboxNode.style.height="";
this.renderHeader();
if(this._togglingColumn>=0){
this.setColumnsWidth(this.getColumnsWidth()-this._togglingColumn);
this._togglingColumn=-1;
}
var _90e=this.grid.layout.cells;
var _90f=dojo.hitch(this,function(node,_910){
!dojo._isBodyLtr()&&(_910=!_910);
var inc=_910?-1:1;
var idx=this.header.getCellNodeIndex(node)+inc;
var cell=_90e[idx];
while(cell&&cell.getHeaderNode()&&cell.getHeaderNode().style.display=="none"){
idx+=inc;
cell=_90e[idx];
}
if(cell){
return cell.getHeaderNode();
}
return null;
});
if(this.grid.columnReordering&&this.simpleStructure){
if(this.source){
this.source.destroy();
}
var _911="dojoxGrid_bottomMarker";
var _912="dojoxGrid_topMarker";
if(this.bottomMarker){
dojo.destroy(this.bottomMarker);
}
this.bottomMarker=dojo.byId(_911);
if(this.topMarker){
dojo.destroy(this.topMarker);
}
this.topMarker=dojo.byId(_912);
if(!this.bottomMarker){
this.bottomMarker=dojo.create("div",{"id":_911,"class":"dojoxGridColPlaceBottom"},dojo.body());
this._hide(this.bottomMarker);
this.topMarker=dojo.create("div",{"id":_912,"class":"dojoxGridColPlaceTop"},dojo.body());
this._hide(this.topMarker);
}
this.arrowDim=dojo.contentBox(this.bottomMarker);
var _913=dojo.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new dojo.dnd.Source(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:dojo.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(dojo.isIE?1:0)){
dojo.dnd.Source.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:dojo.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
dojo.dnd.Source.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:dojo.hitch(this,function(_914){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_914){
return;
}
if(src.targetAnchor&&_90f(src.targetAnchor,src.before)){
src._removeItemClass(_90f(src.targetAnchor,src.before),src.before?"After":"Before");
}
dojo.dnd.Source.prototype._markTargetAnchor.call(src,_914);
var _915=_914?src.targetAnchor:_90f(src.targetAnchor,src.before);
var _916=0;
if(!_915){
_915=src.targetAnchor;
_916=dojo.contentBox(_915).w+this.arrowDim.w/2+2;
}
var pos=(dojo.position||dojo._abs)(_915,true);
var left=Math.floor(pos.x-this.arrowDim.w/2+_916);
dojo.style(this.bottomMarker,"visibility","visible");
dojo.style(this.topMarker,"visibility","visible");
dojo.style(this.bottomMarker,{"left":left+"px","top":(_913+pos.y)+"px"});
dojo.style(this.topMarker,{"left":left+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_90f(src.targetAnchor,src.before)){
src._addItemClass(_90f(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:dojo.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_90f(src.targetAnchor,src.before)){
src._removeItemClass(_90f(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
dojo.dnd.Source.prototype._unmarkTargetAnchor.call(src);
}),destroy:dojo.hitch(this,function(){
dojo.disconnect(this._source_conn);
dojo.unsubscribe(this._source_sub);
dojo.dnd.Source.prototype.destroy.call(this.source);
if(this.bottomMarker){
dojo.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
dojo.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:dojo.hitch(this,function(){
dojo.dnd.Source.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=dojo.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=dojo.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(node){
dojo.style(node,{left:"-10000px",top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_917,_918,copy){
if(dojo.dnd.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var _919=this.grid.views.views;
var _91a=_919[_917.viewIndex];
var _91b=_919[this.index];
if(_91b!=_91a){
_91a.convertColPctToFixed();
_91b.convertColPctToFixed();
}
},_onDndDrop:function(_91c,_91d,copy){
if(dojo.dnd.manager().target!==this.source){
if(dojo.dnd.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _91e=function(n){
return n?dojo.attr(n,"idx"):null;
};
var w=dojo.marginBox(_91d[0]).w;
if(_91c.viewIndex!==this.index){
var _91f=this.grid.views.views;
var _920=_91f[_91c.viewIndex];
var _921=_91f[this.index];
if(_920.viewWidth&&_920.viewWidth!="auto"){
_920.setColumnsWidth(_920.getColumnsWidth()-w);
}
if(_921.viewWidth&&_921.viewWidth!="auto"){
_921.setColumnsWidth(_921.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!dojo._isBodyLtr()&&(stb=!stb);
var _922=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_922.moveColumn(_91c.viewIndex,idx,_91e(_91d[0]),_91e(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
dojox.grid.util.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_923){
var n=_923.name||_923.grid.getCellName(_923);
var ret=["<div class=\"dojoxGridSortNode"];
if(_923.index!=_923.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_923.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_923.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(_924){
var _925=this._hasHScroll||false;
if(this._hasHScroll==undefined||_924){
if(this.noscroll){
this._hasHScroll=false;
}else{
var _926=dojo.style(this.scrollboxNode,"overflow");
if(_926=="hidden"){
this._hasHScroll=false;
}else{
if(_926=="scroll"){
this._hasHScroll=true;
}else{
this._hasHScroll=(this.scrollboxNode.offsetWidth-this.getScrollbarWidth()<this.contentNode.offsetWidth);
}
}
}
}
if(_925!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(_927){
var _928=this._hasVScroll||false;
if(this._hasVScroll==undefined||_927){
if(this.noscroll){
this._hasVScroll=false;
}else{
var _929=dojo.style(this.scrollboxNode,"overflow");
if(_929=="hidden"){
this._hasVScroll=false;
}else{
if(_929=="scroll"){
this._hasVScroll=true;
}else{
this._hasVScroll=(this.scrollboxNode.scrollHeight>this.scrollboxNode.clientHeight);
}
}
}
}
if(_928!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _92a=false;
this.grid.initialWidth="";
var _92b=dojo.query("th",this.headerContentNode);
var _92c=dojo.map(_92b,function(c,vIdx){
var w=c.style.width;
dojo.attr(c,"vIdx",vIdx);
if(w&&w.slice(-1)=="%"){
_92a=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return dojo.contentBox(c).w;
});
if(_92a){
dojo.forEach(this.grid.layout.cells,function(cell,idx){
if(cell.view==this){
var _92d=cell.view.getHeaderCellNode(cell.index);
if(_92d&&dojo.hasAttr(_92d,"vIdx")){
var vIdx=window.parseInt(dojo.attr(_92d,"vIdx"));
this.setColWidth(idx,_92c[vIdx]);
dojo.removeAttr(_92d,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_92e){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var self=this;
var _92f=function(){
var v;
for(var i in self.grid.views.views){
v=self.grid.views.views[i];
if(v!==self&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_92e||(this.noscroll&&_92f())){
h-=dojox.html.metrics.getScrollbar().h;
}
dojox.grid.util.setStyleHeightPx(this.scrollboxNode,h);
}
this.hasVScrollbar(true);
},adaptWidth:function(){
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
if(!this._removingColumn){
w=Math.max(w,this.getColumnsWidth())+"px";
}else{
w=Math.min(w,this.getColumnsWidth())+"px";
this._removingColumn=false;
}
var cn=this.contentNode;
cn.style.width=w;
this.hasHScrollbar(true);
},setSize:function(w,h){
var ds=this.domNode.style;
var hs=this.headerNode.style;
if(w){
ds.width=w;
hs.width=w;
}
ds.height=(h>=0?h+"px":"");
},renderRow:function(_930){
var _931=this.createRowNode(_930);
this.buildRow(_930,_931);
this.grid.edit.restore(this,_930);
return _931;
},createRowNode:function(_932){
var node=document.createElement("div");
node.className=this.classTag+"Row";
if(this instanceof dojox.grid._RowSelector){
dojo.attr(node,"role","presentation");
}else{
dojo.attr(node,"role","row");
if(this.grid.selectionMode!="none"){
dojo.attr(node,"aria-selected","false");
}
}
node[dojox.grid.util.gridViewTag]=this.id;
node[dojox.grid.util.rowIndexTag]=_932;
this.rowNodes[_932]=node;
return node;
},buildRow:function(_933,_934){
this.buildRowContent(_933,_934);
this.styleRow(_933,_934);
},buildRowContent:function(_935,_936){
_936.innerHTML=this.content.generateHtml(_935,_935);
if(this.flexCells&&this.contentWidth){
_936.firstChild.style.width=this.contentWidth;
}
dojox.grid.util.fire(this,"onAfterRow",[_935,this.structure.cells,_936]);
},rowRemoved:function(_937){
if(_937>=0){
this._cleanupRowWidgets(this.getRowNode(_937));
}
this.grid.edit.save(this,_937);
delete this.rowNodes[_937];
},getRowNode:function(_938){
return this.rowNodes[_938];
},getCellNode:function(_939,_93a){
var row=this.getRowNode(_939);
if(row){
return this.content.getCellNode(row,_93a);
}
},getHeaderCellNode:function(_93b){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_93b);
}
},styleRow:function(_93c,_93d){
_93d._style=_8ff(_93d);
this.styleRowNode(_93c,_93d);
},styleRowNode:function(_93e,_93f){
if(_93f){
this.doStyleRowNode(_93e,_93f);
}
},doStyleRowNode:function(_940,_941){
this.grid.styleRowNode(_940,_941);
},updateRow:function(_942){
var _943=this.getRowNode(_942);
if(_943){
_943.style.height="";
this.buildRow(_942,_943);
}
return _943;
},updateRowStyles:function(_944){
this.styleRowNode(_944,this.getRowNode(_944));
},lastTop:0,firstScroll:0,doscroll:function(_945){
var _946=dojo._isBodyLtr();
if(this.firstScroll<2){
if((!_946&&this.firstScroll==1)||(_946&&this.firstScroll===0)){
var s=dojo.marginBox(this.headerNodeContainer);
if(dojo.isIE){
this.headerNodeContainer.style.width=s.w+this.getScrollbarWidth()+"px";
}else{
if(dojo.isMoz){
this.headerNodeContainer.style.width=s.w-this.getScrollbarWidth()+"px";
this.scrollboxNode.scrollLeft=_946?this.scrollboxNode.clientWidth-this.scrollboxNode.scrollWidth:this.scrollboxNode.scrollWidth-this.scrollboxNode.clientWidth;
}
}
}
this.firstScroll++;
}
this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!==this.lastTop){
this.grid.scrollTo(top);
}
},setScrollTop:function(_947){
this.lastTop=_947;
this.scrollboxNode.scrollTop=_947;
return this.scrollboxNode.scrollTop;
},doContentEvent:function(e){
if(this.content.decorateEvent(e)){
this.grid.onContentEvent(e);
}
},doHeaderEvent:function(e){
if(this.header.decorateEvent(e)){
this.grid.onHeaderEvent(e);
}
},dispatchContentEvent:function(e){
return this.content.dispatchEvent(e);
},dispatchHeaderEvent:function(e){
return this.header.dispatchEvent(e);
},setColWidth:function(_948,_949){
this.grid.setCellWidth(_948,_949+"px");
},update:function(){
if(!this.domNode){
return;
}
this.content.update();
this.grid.update();
var left=this.scrollboxNode.scrollLeft;
this.scrollboxNode.scrollLeft=left;
this.headerNode.scrollLeft=left;
}});
dojo.declare("dojox.grid._GridAvatar",dojo.dnd.Avatar,{construct:function(){
var dd=dojo.doc;
var a=dd.createElement("table");
a.cellPadding=a.cellSpacing="0";
a.className="dojoxGridDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dd.createElement("tbody");
var tr=dd.createElement("tr");
var td=dd.createElement("td");
var img=dd.createElement("td");
tr.className="dojoxGridDndAvatarItem";
img.className="dojoxGridDndAvatarItemImage";
img.style.width="16px";
var _94a=this.manager.source,node;
if(_94a.creator){
node=_94a._normalizedCreator(_94a.getItem(this.manager.nodes[0].id).data,"avatar").node;
}else{
node=this.manager.nodes[0].cloneNode(true);
var _94b,_94c;
if(node.tagName.toLowerCase()=="tr"){
_94b=dd.createElement("table");
_94c=dd.createElement("tbody");
_94c.appendChild(node);
_94b.appendChild(_94c);
node=_94b;
}else{
if(node.tagName.toLowerCase()=="th"){
_94b=dd.createElement("table");
_94c=dd.createElement("tbody");
var r=dd.createElement("tr");
_94b.cellPadding=_94b.cellSpacing="0";
r.appendChild(node);
_94c.appendChild(r);
_94b.appendChild(_94c);
node=_94b;
}
}
}
node.id="";
td.appendChild(node);
tr.appendChild(img);
tr.appendChild(td);
dojo.style(tr,"opacity",0.9);
b.appendChild(tr);
a.appendChild(b);
this.node=a;
var m=dojo.dnd.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
dojo.dnd.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _94d=dojo.dnd.manager().makeAvatar;
dojo.dnd.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!dojo.hasClass(dojo.body(),"dijit_a11y")){
return new dojox.grid._GridAvatar(this);
}
return _94d.call(dojo.dnd.manager());
};
})();
}
if(!dojo._hasResource["dojox.grid._RowSelector"]){
dojo._hasResource["dojox.grid._RowSelector"]=true;
dojo.provide("dojox.grid._RowSelector");
dojo.declare("dojox.grid._RowSelector",dojox.grid._View,{defaultWidth:"2em",noscroll:true,padBorderWidth:2,buildRendering:function(){
this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden";
},getWidth:function(){
return this.viewWidth||this.defaultWidth;
},buildRowContent:function(_94e,_94f){
var w=this.contentWidth||0;
_94f.innerHTML="<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;height:1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr><td class=\"dojoxGridRowbarInner\">&nbsp;</td></tr></table>";
},renderHeader:function(){
},updateRow:function(){
},resize:function(){
this.adaptHeight();
},adaptWidth:function(){
if(!("contentWidth" in this)&&this.contentNode){
this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;
}
},doStyleRowNode:function(_950,_951){
var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];
if(this.grid.rows.isOver(_950)){
n.push("dojoxGridRowbarOver");
}
if(this.grid.selection.isSelected(_950)){
n.push("dojoxGridRowbarSelected");
}
_951.className=n.join(" ");
},domouseover:function(e){
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}});
}
if(!dojo._hasResource["dojox.grid._Layout"]){
dojo._hasResource["dojox.grid._Layout"]=true;
dojo.provide("dojox.grid._Layout");
dojo.declare("dojox.grid._Layout",null,{constructor:function(_952){
this.grid=_952;
},cells:[],structure:null,defaultWidth:"6em",moveColumn:function(_953,_954,_955,_956,_957){
var _958=this.structure[_953].cells[0];
var _959=this.structure[_954].cells[0];
var cell=null;
var _95a=0;
var _95b=0;
for(var i=0,c;c=_958[i];i++){
if(c.index==_955){
_95a=i;
break;
}
}
cell=_958.splice(_95a,1)[0];
cell.view=this.grid.views.views[_954];
for(i=0,c=null;c=_959[i];i++){
if(c.index==_956){
_95b=i;
break;
}
}
if(!_957){
_95b+=1;
}
_959.splice(_95b,0,cell);
var _95c=this.grid.getCell(this.grid.getSortIndex());
if(_95c){
_95c._currentlySorted=this.grid.getSortAsc();
}
this.cells=[];
_955=0;
var v;
for(i=0;v=this.structure[i];i++){
for(var j=0,cs;cs=v.cells[j];j++){
for(var k=0;c=cs[k];k++){
c.index=_955;
this.cells.push(c);
if("_currentlySorted" in c){
var si=_955+1;
si*=c._currentlySorted?1:-1;
this.grid.sortInfo=si;
delete c._currentlySorted;
}
_955++;
}
}
}
dojo.forEach(this.cells,function(c){
var _95d=c.markup[2].split(" ");
var _95e=parseInt(_95d[1].substring(5));
if(_95e!=c.index){
_95d[1]="idx=\""+c.index+"\"";
c.markup[2]=_95d.join(" ");
}
});
this.grid.setupHeaderMenu();
},setColumnVisibility:function(_95f,_960){
var cell=this.cells[_95f];
if(cell.hidden==_960){
cell.hidden=!_960;
var v=cell.view,w=v.viewWidth;
if(w&&w!="auto"){
v._togglingColumn=dojo.marginBox(cell.getHeaderNode()).w||0;
}
v.update();
return true;
}else{
return false;
}
},addCellDef:function(_961,_962,_963){
var self=this;
var _964=function(_965){
var w=0;
if(_965.colSpan>1){
w=0;
}else{
w=_965.width||self._defaultCellProps.width||self.defaultWidth;
if(!isNaN(w)){
w=w+"em";
}
}
return w;
};
var _966={grid:this.grid,subrow:_961,layoutIndex:_962,index:this.cells.length};
if(_963&&_963 instanceof dojox.grid.cells._Base){
var _967=dojo.clone(_963);
_966.unitWidth=_964(_967._props);
_967=dojo.mixin(_967,this._defaultCellProps,_963._props,_966);
return _967;
}
var _968=_963.type||_963.cellType||this._defaultCellProps.type||this._defaultCellProps.cellType||dojox.grid.cells.Cell;
_966.unitWidth=_964(_963);
return new _968(dojo.mixin({},this._defaultCellProps,_963,_966));
},addRowDef:function(_969,_96a){
var _96b=[];
var _96c=0,_96d=0,_96e=true;
for(var i=0,def,cell;(def=_96a[i]);i++){
cell=this.addCellDef(_969,i,def);
_96b.push(cell);
this.cells.push(cell);
if(_96e&&cell.relWidth){
_96c+=cell.relWidth;
}else{
if(cell.width){
var w=cell.width;
if(typeof w=="string"&&w.slice(-1)=="%"){
_96d+=window.parseInt(w,10);
}else{
if(w=="auto"){
_96e=false;
}
}
}
}
}
if(_96c&&_96e){
dojo.forEach(_96b,function(cell){
if(cell.relWidth){
cell.width=cell.unitWidth=((cell.relWidth/_96c)*(100-_96d))+"%";
}
});
}
return _96b;
},addRowsDef:function(_96f){
var _970=[];
if(dojo.isArray(_96f)){
if(dojo.isArray(_96f[0])){
for(var i=0,row;_96f&&(row=_96f[i]);i++){
_970.push(this.addRowDef(i,row));
}
}else{
_970.push(this.addRowDef(0,_96f));
}
}
return _970;
},addViewDef:function(_971){
this._defaultCellProps=_971.defaultCell||{};
if(_971.width&&_971.width=="auto"){
delete _971.width;
}
return dojo.mixin({},_971,{cells:this.addRowsDef(_971.rows||_971.cells)});
},setStructure:function(_972){
this.fieldIndex=0;
this.cells=[];
var s=this.structure=[];
if(this.grid.rowSelector){
var sel={type:dojox._scopeName+".grid._RowSelector"};
if(dojo.isString(this.grid.rowSelector)){
var _973=this.grid.rowSelector;
if(_973=="false"){
sel=null;
}else{
if(_973!="true"){
sel["width"]=_973;
}
}
}else{
if(!this.grid.rowSelector){
sel=null;
}
}
if(sel){
s.push(this.addViewDef(sel));
}
}
var _974=function(def){
return ("name" in def||"field" in def||"get" in def);
};
var _975=function(def){
if(dojo.isArray(def)){
if(dojo.isArray(def[0])||_974(def[0])){
return true;
}
}
return false;
};
var _976=function(def){
return (def!==null&&dojo.isObject(def)&&("cells" in def||"rows" in def||("type" in def&&!_974(def))));
};
if(dojo.isArray(_972)){
var _977=false;
for(var i=0,st;(st=_972[i]);i++){
if(_976(st)){
_977=true;
break;
}
}
if(!_977){
s.push(this.addViewDef({cells:_972}));
}else{
for(i=0;(st=_972[i]);i++){
if(_975(st)){
s.push(this.addViewDef({cells:st}));
}else{
if(_976(st)){
s.push(this.addViewDef(st));
}
}
}
}
}else{
if(_976(_972)){
s.push(this.addViewDef(_972));
}
}
this.cellCount=this.cells.length;
this.grid.setupHeaderMenu();
}});
}
if(!dojo._hasResource["dojox.grid._ViewManager"]){
dojo._hasResource["dojox.grid._ViewManager"]=true;
dojo.provide("dojox.grid._ViewManager");
dojo.declare("dojox.grid._ViewManager",null,{constructor:function(_978){
this.grid=_978;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_979){
_979.idx=this.views.length;
this.views.push(_979);
},destroyViews:function(){
for(var i=0,v;v=this.views[i];i++){
v.destroy();
}
this.views=[];
},getContentNodes:function(){
var _97a=[];
for(var i=0,v;v=this.views[i];i++){
_97a.push(v.contentNode);
}
return _97a;
},forEach:function(_97b){
for(var i=0,v;v=this.views[i];i++){
_97b(v,i);
}
},onEach:function(_97c,_97d){
_97d=_97d||[];
for(var i=0,v;v=this.views[i];i++){
if(_97c in v){
v[_97c].apply(v,_97d);
}
}
},normalizeHeaderNodeHeight:function(){
var _97e=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_97e.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_97e);
},normalizeRowNodeHeights:function(_97f){
var h=0;
var _980=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_97f.length<=1){
return;
}
for(var i=0,n;(n=_97f[i]);i++){
if(!dojo.hasClass(n,"dojoxGridNonNormalizedCell")){
_980[i]=n.firstChild.offsetHeight;
h=Math.max(h,_980[i]);
}
}
h=(h>=0?h:0);
if(dojo.isMoz&&h){
h++;
}
}
for(i=0;(n=_97f[i]);i++){
if(_980[i]!=h){
n.firstChild.style.height=h+"px";
}
}
},resetHeaderNodeHeight:function(){
for(var i=0,v,n;(v=this.views[i]);i++){
n=v.headerContentNode.firstChild;
if(n){
n.style.height="";
}
}
},renormalizeRow:function(_981){
var _982=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_981));i++){
n.firstChild.style.height="";
_982.push(n);
}
this.normalizeRowNodeHeights(_982);
},getViewWidth:function(_983){
return this.views[_983].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_984){
_984.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_985){
h=Math.max(_985.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_986){
h=Math.max(_986.domNode.offsetHeight,h);
});
return h;
},findClient:function(_987){
var c=this.grid.elasticView||-1;
if(c<0){
for(var i=1,v;(v=this.views[i]);i++){
if(v.viewWidth){
for(i=1;(v=this.views[i]);i++){
if(!v.viewWidth){
c=i;
break;
}
}
break;
}
}
}
if(c<0){
c=Math.floor(this.views.length/2);
}
return c;
},arrange:function(l,w){
var i,v,vw,len=this.views.length;
var c=(w<=0?len:this.findClient());
var _988=function(v,l){
var ds=v.domNode.style;
var hs=v.headerNode.style;
if(!dojo._isBodyLtr()){
ds.right=l+"px";
if(dojo.isMoz){
hs.right=l+v.getScrollbarWidth()+"px";
hs.width=parseInt(hs.width,10)-v.getScrollbarWidth()+"px";
}else{
hs.right=l+"px";
}
}else{
ds.left=l+"px";
hs.left=l+"px";
}
ds.top=0+"px";
hs.top=0;
};
for(i=0;(v=this.views[i])&&(i<c);i++){
vw=this.getViewWidth(i);
v.setSize(vw,0);
_988(v,l);
if(v.headerContentNode&&v.headerContentNode.firstChild){
vw=v.getColumnsWidth()+v.getScrollbarWidth();
}else{
vw=v.domNode.offsetWidth;
}
l+=vw;
}
i++;
var r=w;
for(var j=len-1;(v=this.views[j])&&(i<=j);j--){
vw=this.getViewWidth(j);
v.setSize(vw,0);
vw=v.domNode.offsetWidth;
r-=vw;
_988(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_988(v,l);
}
return l;
},renderRow:function(_989,_98a,_98b){
var _98c=[];
for(var i=0,v,n,_98d;(v=this.views[i])&&(n=_98a[i]);i++){
_98d=v.renderRow(_989);
n.appendChild(_98d);
_98c.push(_98d);
}
if(!_98b){
this.normalizeRowNodeHeights(_98c);
}
},rowRemoved:function(_98e){
this.onEach("rowRemoved",[_98e]);
},updateRow:function(_98f,_990){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_98f);
}
if(!_990){
this.renormalizeRow(_98f);
}
},updateRowStyles:function(_991){
this.onEach("updateRowStyles",[_991]);
},setScrollTop:function(_992){
var top=_992;
for(var i=0,v;v=this.views[i];i++){
top=v.setScrollTop(_992);
if(dojo.isIE&&v.headerNode&&v.scrollboxNode){
v.headerNode.scrollLeft=v.scrollboxNode.scrollLeft;
}
}
return top;
},getFirstScrollingView:function(){
for(var i=0,v;(v=this.views[i]);i++){
if(v.hasHScrollbar()||v.hasVScrollbar()){
return v;
}
}
return null;
}});
}
if(!dojo._hasResource["dojox.grid._RowManager"]){
dojo._hasResource["dojox.grid._RowManager"]=true;
dojo.provide("dojox.grid._RowManager");
(function(){
var _993=function(_994,_995){
if(_994.style.cssText==undefined){
_994.setAttribute("style",_995);
}else{
_994.style.cssText=_995;
}
};
dojo.declare("dojox.grid._RowManager",null,{constructor:function(_996){
this.grid=_996;
},linesToEms:2,overRow:-2,prepareStylingRow:function(_997,_998){
return {index:_997,node:_998,odd:Boolean(_997&1),selected:!!this.grid.selection.isSelected(_997),over:this.isOver(_997),customStyles:"",customClasses:"dojoxGridRow"};
},styleRowNode:function(_999,_99a){
var row=this.prepareStylingRow(_999,_99a);
this.grid.onStyleRow(row);
this.applyStyles(row);
},applyStyles:function(_99b){
var i=_99b;
i.node.className=i.customClasses;
var h=i.node.style.height;
_993(i.node,i.customStyles+";"+(i.node._style||""));
i.node.style.height=h;
},updateStyles:function(_99c){
this.grid.updateRowStyles(_99c);
},setOverRow:function(_99d){
var last=this.overRow;
this.overRow=_99d;
if((last!=this.overRow)&&(dojo.isString(last)||last>=0)){
this.updateStyles(last);
}
this.updateStyles(this.overRow);
},isOver:function(_99e){
return (this.overRow==_99e&&!dojo.hasClass(this.grid.domNode,"dojoxGridColumnResizing"));
}});
})();
}
if(!dojo._hasResource["dojox.grid._FocusManager"]){
dojo._hasResource["dojox.grid._FocusManager"]=true;
dojo.provide("dojox.grid._FocusManager");
dojo.declare("dojox.grid._FocusManager",null,{constructor:function(_99f){
this.grid=_99f;
this.cell=null;
this.rowIndex=-1;
this._connects=[];
this._headerConnects=[];
this.headerMenu=this.grid.headerMenu;
this._connects.push(dojo.connect(this.grid.domNode,"onfocus",this,"doFocus"));
this._connects.push(dojo.connect(this.grid.domNode,"onblur",this,"doBlur"));
this._connects.push(dojo.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));
this._connects.push(dojo.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));
this._connects.push(dojo.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));
this._connects.push(dojo.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(dojo.connect(this.grid,"postrender",this,"_delayedHeaderFocus"));
},destroy:function(){
dojo.forEach(this._connects,dojo.disconnect);
dojo.forEach(this._headerConnects,dojo.disconnect);
delete this.grid;
delete this.cell;
},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:false,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){
this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];
this._initColumnHeaders();
},isFocusCell:function(_9a0,_9a1){
return (this.cell==_9a0)&&(this.rowIndex==_9a1);
},isLastFocusCell:function(){
if(this.cell){
return (this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1);
}
return false;
},isFirstFocusCell:function(){
if(this.cell){
return (this.rowIndex===0)&&(this.cell.index===0);
}
return false;
},isNoFocusCell:function(){
return (this.rowIndex<0)||!this.cell;
},isNavHeader:function(){
return (!!this._colHeadNode);
},getHeaderIndex:function(){
if(this._colHeadNode){
return dojo.indexOf(this._findHeaderCells(),this._colHeadNode);
}else{
return -1;
}
},_focusifyCellNode:function(_9a2){
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
dojo.toggleClass(n,this.focusClass,_9a2);
if(_9a2){
var sl=this.scrollIntoView();
try{
if(!this.grid.edit.isEditing()){
dojox.grid.util.fire(n,"focus");
if(sl){
this.cell.view.scrollboxNode.scrollLeft=sl;
}
}
}
catch(e){
}
}
}
},_delayedCellFocus:function(){
if(this.isNavHeader()||!this.grid._focused){
return;
}
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
try{
if(!this.grid.edit.isEditing()){
dojo.toggleClass(n,this.focusClass,true);
this.blurHeader();
dojox.grid.util.fire(n,"focus");
}
}
catch(e){
}
}
},_delayedHeaderFocus:function(){
if(this.isNavHeader()){
this.focusHeader();
this.grid.domNode.focus();
}
},_initColumnHeaders:function(){
dojo.forEach(this._headerConnects,dojo.disconnect);
this._headerConnects=[];
var _9a3=this._findHeaderCells();
for(var i=0;i<_9a3.length;i++){
this._headerConnects.push(dojo.connect(_9a3[i],"onfocus",this,"doColHeaderFocus"));
this._headerConnects.push(dojo.connect(_9a3[i],"onblur",this,"doColHeaderBlur"));
}
},_findHeaderCells:function(){
var _9a4=dojo.query("th",this.grid.viewsHeaderNode);
var _9a5=[];
for(var i=0;i<_9a4.length;i++){
var _9a6=_9a4[i];
var _9a7=dojo.hasAttr(_9a6,"tabIndex");
var _9a8=dojo.attr(_9a6,"tabIndex");
if(_9a7&&_9a8<0){
_9a5.push(_9a6);
}
}
return _9a5;
},_setActiveColHeader:function(_9a9,_9aa,_9ab){
dojo.attr(this.grid.domNode,"aria-activedescendant",_9a9.id);
if(_9ab!=null&&_9ab>=0&&_9ab!=_9aa){
dojo.toggleClass(this._findHeaderCells()[_9ab],this.focusClass,false);
}
dojo.toggleClass(_9a9,this.focusClass,true);
this._colHeadNode=_9a9;
this._colHeadFocusIdx=_9aa;
this._scrollHeader(this._colHeadFocusIdx);
},scrollIntoView:function(){
var info=(this.cell?this._scrollInfo(this.cell):null);
if(!info||!info.s){
return null;
}
var rt=this.grid.scroller.findScrollTop(this.rowIndex);
if(info.n&&info.sr){
if(info.n.offsetLeft+info.n.offsetWidth>info.sr.l+info.sr.w){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}
}
}
if(info.r&&info.sr){
if(rt+info.r.offsetHeight>info.sr.t+info.sr.h){
this.grid.setScrollTop(rt+info.r.offsetHeight-info.sr.h);
}else{
if(rt<info.sr.t){
this.grid.setScrollTop(rt);
}
}
}
return info.s.scrollLeft;
},_scrollInfo:function(cell,_9ac){
if(cell){
var cl=cell,sbn=cl.view.scrollboxNode,sbnr={w:sbn.clientWidth,l:sbn.scrollLeft,t:sbn.scrollTop,h:sbn.clientHeight},rn=cl.view.getRowNode(this.rowIndex);
return {c:cl,s:sbn,sr:sbnr,n:(_9ac?_9ac:cell.getNode(this.rowIndex)),r:rn};
}
return null;
},_scrollHeader:function(_9ad){
var info=null;
if(this._colHeadNode){
var cell=this.grid.getCell(_9ad);
info=this._scrollInfo(cell,cell.getNode(0));
}
if(info&&info.s&&info.sr&&info.n){
var _9ae=info.sr.l+info.sr.w;
if(info.n.offsetLeft+info.n.offsetWidth>_9ae){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}else{
if(dojo.isIE<=7&&cell&&cell.view.headerNode){
cell.view.headerNode.scrollLeft=info.s.scrollLeft;
}
}
}
}
},_isHeaderHidden:function(){
var _9af=this.focusView;
if(!_9af){
for(var i=0,_9b0;(_9b0=this.grid.views.views[i]);i++){
if(_9b0.headerNode){
_9af=_9b0;
break;
}
}
}
return (_9af&&dojo.getComputedStyle(_9af.headerNode).display=="none");
},colSizeAdjust:function(e,_9b1,_9b2){
var _9b3=this._findHeaderCells();
var view=this.focusView;
if(!view){
for(var i=0,_9b4;(_9b4=this.grid.views.views[i]);i++){
if(_9b4.header.tableMap.map){
view=_9b4;
break;
}
}
}
var _9b5=_9b3[_9b1];
if(!view||(_9b1==_9b3.length-1&&_9b1===0)){
return;
}
view.content.baseDecorateEvent(e);
e.cellNode=_9b5;
e.cellIndex=view.content.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
if(view.header.canResize(e)){
var _9b6={l:_9b2};
var drag=view.header.colResizeSetup(e,false);
view.header.doResizeColumn(drag,null,_9b6);
view.update();
}
},styleRow:function(_9b7){
return;
},setFocusIndex:function(_9b8,_9b9){
this.setFocusCell(this.grid.getCell(_9b9),_9b8);
},setFocusCell:function(_9ba,_9bb){
if(_9ba&&!this.isFocusCell(_9ba,_9bb)){
this.tabbingOut=false;
if(this._colHeadNode){
this.blurHeader();
}
this._colHeadNode=this._colHeadFocusIdx=null;
this.focusGridView();
this._focusifyCellNode(false);
this.cell=_9ba;
this.rowIndex=_9bb;
this._focusifyCellNode(true);
}
if(dojo.isOpera){
setTimeout(dojo.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1);
}else{
this.grid.onCellFocus(this.cell,this.rowIndex);
}
},next:function(){
if(this.cell){
var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1,rc=this.grid.rowCount-1;
if(col>cc){
col=0;
row++;
}
if(row>rc){
col=cc;
row=rc;
}
if(this.grid.edit.isEditing()){
var _9bc=this.grid.getCell(col);
if(!this.isLastFocusCell()&&(!_9bc.editable||this.grid.canEdit&&!this.grid.canEdit(_9bc,row))){
this.cell=_9bc;
this.rowIndex=row;
this.next();
return;
}
}
this.setFocusIndex(row,col);
}
},previous:function(){
if(this.cell){
var row=(this.rowIndex||0),col=(this.cell.index||0)-1;
if(col<0){
col=this.grid.layout.cellCount-1;
row--;
}
if(row<0){
row=0;
col=0;
}
if(this.grid.edit.isEditing()){
var _9bd=this.grid.getCell(col);
if(!this.isFirstFocusCell()&&!_9bd.editable){
this.cell=_9bd;
this.rowIndex=row;
this.previous();
return;
}
}
this.setFocusIndex(row,col);
}
},move:function(_9be,_9bf){
var _9c0=_9bf<0?-1:1;
if(this.isNavHeader()){
var _9c1=this._findHeaderCells();
var _9c2=currentIdx=dojo.indexOf(_9c1,this._colHeadNode);
currentIdx+=_9bf;
while(currentIdx>=0&&currentIdx<_9c1.length&&_9c1[currentIdx].style.display=="none"){
currentIdx+=_9c0;
}
if((currentIdx>=0)&&(currentIdx<_9c1.length)){
this._setActiveColHeader(_9c1[currentIdx],currentIdx,_9c2);
}
}else{
if(this.cell){
var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,row=Math.min(rc,Math.max(0,r+_9be));
if(_9be){
if(_9be>0){
if(row>sc.getLastPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));
}
}else{
if(_9be<0){
if(row<=sc.getPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));
}
}
}
}
var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_9bf));
var cell=this.grid.getCell(col);
while(col>=0&&col<cc&&cell&&cell.hidden===true){
col+=_9c0;
cell=this.grid.getCell(col);
}
if(!cell||cell.hidden===true){
col=i;
}
var n=cell.getNode(row);
if(!n&&_9be){
if((row+_9be)>=0&&(row+_9be)<=rc){
this.move(_9be>0?++_9be:--_9be,_9bf);
}
return;
}else{
if((!n||dojo.style(n,"display")==="none")&&_9bf){
if((col+_9be)>=0&&(col+_9be)<=cc){
this.move(_9be,_9bf>0?++_9bf:--_9bf);
}
return;
}
}
this.setFocusIndex(row,col);
if(_9be){
this.grid.updateRow(r);
}
}
}
},previousKey:function(e){
if(this.grid.edit.isEditing()){
dojo.stopEvent(e);
this.previous();
}else{
if(!this.isNavHeader()&&!this._isHeaderHidden()){
this.grid.domNode.focus();
dojo.stopEvent(e);
}else{
this.tabOut(this.grid.domNode);
if(this._colHeadFocusIdx!=null){
dojo.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],this.focusClass,false);
this._colHeadFocusIdx=null;
}
this._focusifyCellNode(false);
}
}
},nextKey:function(e){
var _9c3=(this.grid.rowCount===0);
if(e.target===this.grid.domNode&&this._colHeadFocusIdx==null){
this.focusHeader();
dojo.stopEvent(e);
}else{
if(this.isNavHeader()){
this.blurHeader();
if(!this.findAndFocusGridCell()){
this.tabOut(this.grid.lastFocusNode);
}
this._colHeadNode=this._colHeadFocusIdx=null;
}else{
if(this.grid.edit.isEditing()){
dojo.stopEvent(e);
this.next();
}else{
this.tabOut(this.grid.lastFocusNode);
}
}
}
},tabOut:function(_9c4){
this.tabbingOut=true;
_9c4.focus();
},focusGridView:function(){
dojox.grid.util.fire(this.focusView,"focus");
},focusGrid:function(_9c5){
this.focusGridView();
this._focusifyCellNode(true);
},findAndFocusGridCell:function(){
var _9c6=true;
var _9c7=(this.grid.rowCount===0);
if(this.isNoFocusCell()&&!_9c7){
var _9c8=0;
var cell=this.grid.getCell(_9c8);
if(cell.hidden){
_9c8=this.isNavHeader()?this._colHeadFocusIdx:0;
}
this.setFocusIndex(0,_9c8);
}else{
if(this.cell&&!_9c7){
if(this.focusView&&!this.focusView.rowNodes[this.rowIndex]){
this.grid.scrollToRow(this.rowIndex);
}
this.focusGrid();
}else{
_9c6=false;
}
}
this._colHeadNode=this._colHeadFocusIdx=null;
return _9c6;
},focusHeader:function(){
var _9c9=this._findHeaderCells();
var _9ca=this._colHeadFocusIdx;
if(this._isHeaderHidden()){
this.findAndFocusGridCell();
}else{
if(!this._colHeadFocusIdx){
if(this.isNoFocusCell()){
this._colHeadFocusIdx=0;
}else{
this._colHeadFocusIdx=this.cell.index;
}
}
}
this._colHeadNode=_9c9[this._colHeadFocusIdx];
while(this._colHeadNode&&this._colHeadFocusIdx>=0&&this._colHeadFocusIdx<_9c9.length&&this._colHeadNode.style.display=="none"){
this._colHeadFocusIdx++;
this._colHeadNode=_9c9[this._colHeadFocusIdx];
}
if(this._colHeadNode&&this._colHeadNode.style.display!="none"){
if(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode){
this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode);
this.headerMenu.bindDomNode(this.grid.domNode);
this._contextMenuBindNode=this.grid.domNode;
}
this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,_9ca);
this._scrollHeader(this._colHeadFocusIdx);
this._focusifyCellNode(false);
}else{
this.findAndFocusGridCell();
}
},blurHeader:function(){
dojo.removeClass(this._colHeadNode,this.focusClass);
dojo.removeAttr(this.grid.domNode,"aria-activedescendant");
if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){
var _9cb=this.grid.viewsHeaderNode;
this.headerMenu.unBindDomNode(this.grid.domNode);
this.headerMenu.bindDomNode(_9cb);
this._contextMenuBindNode=_9cb;
}
},doFocus:function(e){
if(e&&e.target!=e.currentTarget){
dojo.stopEvent(e);
return;
}
if(!this.tabbingOut){
this.focusHeader();
}
this.tabbingOut=false;
dojo.stopEvent(e);
},doBlur:function(e){
dojo.stopEvent(e);
},doContextMenu:function(e){
if(!this.headerMenu){
dojo.stopEvent(e);
}
},doLastNodeFocus:function(e){
if(this.tabbingOut){
this._focusifyCellNode(false);
}else{
if(this.grid.rowCount>0){
if(this.isNoFocusCell()){
this.setFocusIndex(0,0);
}
this._focusifyCellNode(true);
}else{
this.focusHeader();
}
}
this.tabbingOut=false;
dojo.stopEvent(e);
},doLastNodeBlur:function(e){
dojo.stopEvent(e);
},doColHeaderFocus:function(e){
this._setActiveColHeader(e.target,dojo.attr(e.target,"idx"),this._colHeadFocusIdx);
this._scrollHeader(this.getHeaderIndex());
dojo.stopEvent(e);
},doColHeaderBlur:function(e){
dojo.toggleClass(e.target,this.focusClass,false);
}});
}
if(!dojo._hasResource["dojox.grid._EditManager"]){
dojo._hasResource["dojox.grid._EditManager"]=true;
dojo.provide("dojox.grid._EditManager");
dojo.declare("dojox.grid._EditManager",null,{constructor:function(_9cc){
this.grid=_9cc;
if(dojo.isIE){
this.connections=[dojo.connect(document.body,"onfocus",dojo.hitch(this,"_boomerangFocus"))];
}else{
this.connections=[dojo.connect(this.grid,"onBlur",this,"apply")];
}
},info:{},destroy:function(){
dojo.forEach(this.connections,dojo.disconnect);
},cellFocus:function(_9cd,_9ce){
if(this.grid.singleClickEdit||this.isEditRow(_9ce)){
this.setEditCell(_9cd,_9ce);
}else{
this.apply();
}
if(this.isEditing()||(_9cd&&_9cd.editable&&_9cd.alwaysEditing)){
this._focusEditor(_9cd,_9ce);
}
},rowClick:function(e){
if(this.isEditing()&&!this.isEditRow(e.rowIndex)){
this.apply();
}
},styleRow:function(_9cf){
if(_9cf.index==this.info.rowIndex){
_9cf.customClasses+=" dojoxGridRowEditing";
}
},dispatchEvent:function(e){
var c=e.cell,ed=(c&&c["editable"])?c:0;
return ed&&ed.dispatchEvent(e.dispatch,e);
},isEditing:function(){
return this.info.rowIndex!==undefined;
},isEditCell:function(_9d0,_9d1){
return (this.info.rowIndex===_9d0)&&(this.info.cell.index==_9d1);
},isEditRow:function(_9d2){
return this.info.rowIndex===_9d2;
},setEditCell:function(_9d3,_9d4){
if(!this.isEditCell(_9d4,_9d3.index)&&this.grid.canEdit&&this.grid.canEdit(_9d3,_9d4)){
this.start(_9d3,_9d4,this.isEditRow(_9d4)||_9d3.editable);
}
},_focusEditor:function(_9d5,_9d6){
dojox.grid.util.fire(_9d5,"focus",[_9d6]);
},focusEditor:function(){
if(this.isEditing()){
this._focusEditor(this.info.cell,this.info.rowIndex);
}
},_boomerangWindow:500,_shouldCatchBoomerang:function(){
return this._catchBoomerang>new Date().getTime();
},_boomerangFocus:function(){
if(this._shouldCatchBoomerang()){
this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0;
}
},_doCatchBoomerang:function(){
if(dojo.isIE){
this._catchBoomerang=new Date().getTime()+this._boomerangWindow;
}
},start:function(_9d7,_9d8,_9d9){
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_9d8)){
this.applyRowEdit();
this.grid.updateRow(_9d8);
}
if(_9d9){
this.info={cell:_9d7,rowIndex:_9d8};
this.grid.doStartEdit(_9d7,_9d8);
this.grid.updateRow(_9d8);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_9d7,_9d8);
this._doCatchBoomerang();
},_editorDo:function(_9da){
var c=this.info.cell;
if(c&&c.editable){
c[_9da](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_9db,_9dc,_9dd){
if(this.grid.canEdit(_9dc,_9dd)){
this.grid.doApplyCellEdit(_9db,_9dd,_9dc.field);
}
},applyRowEdit:function(){
this.grid.doApplyEdit(this.info.rowIndex,this.info.cell.field);
},apply:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},cancel:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},save:function(_9de,_9df){
var c=this.info.cell;
if(this.isEditRow(_9de)&&(!_9df||c.view==_9df)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_9e0,_9e1){
var c=this.info.cell;
if(this.isEditRow(_9e1)&&c.view==_9e0&&c.editable){
c.restore(c,this.info.rowIndex);
}
}});
}
if(!dojo._hasResource["dojox.grid.Selection"]){
dojo._hasResource["dojox.grid.Selection"]=true;
dojo.provide("dojox.grid.Selection");
dojo.declare("dojox.grid.Selection",null,{constructor:function(_9e2){
this.grid=_9e2;
this.selected=[];
this.setMode(_9e2.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_9e3){
return this.grid.onCanSelect(_9e3);
},onCanDeselect:function(_9e4){
return this.grid.onCanDeselect(_9e4);
},onSelected:function(_9e5){
},onDeselected:function(_9e6){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_9e7){
if(this.mode=="none"){
return false;
}
return this.selected[_9e7];
},getFirstSelected:function(){
if(!this.selected.length||this.mode=="none"){
return -1;
}
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getNextSelected:function(_9e8){
if(this.mode=="none"){
return -1;
}
for(var i=_9e8+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _9e9=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_9e9.push(i);
}
}
return _9e9;
},getSelectedCount:function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
},_beginUpdate:function(){
if(this.updating===0){
this.onChanging();
}
this.updating++;
},_endUpdate:function(){
this.updating--;
if(this.updating===0){
this.onChanged();
}
},select:function(_9ea){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_9ea);
this.addToSelection(_9ea);
}else{
this.toggleSelect(_9ea);
}
},addToSelection:function(_9eb){
if(this.mode=="none"){
return;
}
if(dojo.isArray(_9eb)){
dojo.forEach(_9eb,this.addToSelection,this);
return;
}
_9eb=Number(_9eb);
if(this.selected[_9eb]){
this.selectedIndex=_9eb;
}else{
if(this.onCanSelect(_9eb)!==false){
this.selectedIndex=_9eb;
var _9ec=this.grid.getRowNode(_9eb);
if(_9ec){
dojo.attr(_9ec,"aria-selected","true");
}
this._beginUpdate();
this.selected[_9eb]=true;
this.onSelected(_9eb);
this._endUpdate();
}
}
},deselect:function(_9ed){
if(this.mode=="none"){
return;
}
if(dojo.isArray(_9ed)){
dojo.forEach(_9ed,this.deselect,this);
return;
}
_9ed=Number(_9ed);
if(this.selectedIndex==_9ed){
this.selectedIndex=-1;
}
if(this.selected[_9ed]){
if(this.onCanDeselect(_9ed)===false){
return;
}
var _9ee=this.grid.getRowNode(_9ed);
if(_9ee){
dojo.attr(_9ee,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_9ed];
this.onDeselected(_9ed);
this._endUpdate();
}
},setSelected:function(_9ef,_9f0){
this[(_9f0?"addToSelection":"deselect")](_9ef);
},toggleSelect:function(_9f1){
if(dojo.isArray(_9f1)){
dojo.forEach(_9f1,this.toggleSelect,this);
return;
}
this.setSelected(_9f1,!this.selected[_9f1]);
},_range:function(_9f2,inTo,func){
var s=(_9f2>=0?_9f2:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_9f3,inTo){
this._range(_9f3,inTo,dojo.hitch(this,"addToSelection"));
},deselectRange:function(_9f4,inTo){
this._range(_9f4,inTo,dojo.hitch(this,"deselect"));
},insert:function(_9f5){
this.selected.splice(_9f5,0,false);
if(this.selectedIndex>=_9f5){
this.selectedIndex++;
}
},remove:function(_9f6){
this.selected.splice(_9f6,1);
if(this.selectedIndex>=_9f6){
this.selectedIndex--;
}
},deselectAll:function(_9f7){
for(var i in this.selected){
if((i!=_9f7)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_9f8,_9f9,_9fa){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_9f8);
}else{
var _9fb=this.selectedIndex;
if(!_9f9){
this.deselectAll(_9f8);
}
if(_9fa){
this.selectRange(_9fb,_9f8);
}else{
if(_9f9){
this.toggleSelect(_9f8);
}else{
this.addToSelection(_9f8);
}
}
}
this._endUpdate();
},clickSelectEvent:function(e){
this.clickSelect(e.rowIndex,dojo.isCopyKey(e),e.shiftKey);
},clear:function(){
this._beginUpdate();
this.deselectAll();
this._endUpdate();
}});
}
if(!dojo._hasResource["dojox.grid._Events"]){
dojo._hasResource["dojox.grid._Events"]=true;
dojo.provide("dojox.grid._Events");
dojo.declare("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
this.dispatchKeyEvent(e);
},onContentEvent:function(e){
this.dispatchContentEvent(e);
},onHeaderEvent:function(e){
this.dispatchHeaderEvent(e);
},onStyleRow:function(_9fc){
var i=_9fc;
i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");
this.focus.styleRow(_9fc);
this.edit.styleRow(_9fc);
},onKeyDown:function(e){
if(e.altKey||e.metaKey){
return;
}
var dk=dojo.keys;
var _9fd;
switch(e.keyCode){
case dk.ESCAPE:
this.edit.cancel();
break;
case dk.ENTER:
if(!this.edit.isEditing()){
_9fd=this.focus.getHeaderIndex();
if(_9fd>=0){
this.setSortIndex(_9fd);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
dojo.stopEvent(e);
}
if(!e.shiftKey){
var _9fe=this.edit.isEditing();
this.edit.apply();
if(!_9fe){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _9ff=this.focus.focusView||this.views.views[0];
_9ff.content.decorateEvent(e);
this.onRowClick(e);
dojo.stopEvent(e);
}
break;
case dk.SPACE:
if(!this.edit.isEditing()){
_9fd=this.focus.getHeaderIndex();
if(_9fd>=0){
this.setSortIndex(_9fd);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
dojo.stopEvent(e);
}
break;
case dk.TAB:
this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case dk.LEFT_ARROW:
case dk.RIGHT_ARROW:
if(!this.edit.isEditing()){
var _a00=e.keyCode;
dojo.stopEvent(e);
_9fd=this.focus.getHeaderIndex();
if(_9fd>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_9fd,(_a00==dk.LEFT_ARROW?-1:1)*5);
}else{
var _a01=(_a00==dk.LEFT_ARROW)?1:-1;
if(dojo._isBodyLtr()){
_a01*=-1;
}
this.focus.move(0,_a01);
}
}
break;
case dk.UP_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
dojo.stopEvent(e);
this.focus.move(-1,0);
}
break;
case dk.DOWN_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
dojo.stopEvent(e);
this.focus.move(1,0);
}
break;
case dk.PAGE_UP:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
dojo.stopEvent(e);
if(this.focus.rowIndex!=this.scroller.firstVisibleRow+1){
this.focus.move(this.scroller.firstVisibleRow-this.focus.rowIndex,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex-1));
this.focus.move(this.scroller.firstVisibleRow-this.scroller.lastVisibleRow+1,0);
}
}
break;
case dk.PAGE_DOWN:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
dojo.stopEvent(e);
if(this.focus.rowIndex!=this.scroller.lastVisibleRow-1){
this.focus.move(this.scroller.lastVisibleRow-this.focus.rowIndex-1,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex+1));
this.focus.move(this.scroller.lastVisibleRow-this.scroller.firstVisibleRow-1,0);
}
}
break;
default:
break;
}
},onMouseOver:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e);
},onMouseOut:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e);
},onMouseDown:function(e){
e.rowIndex==-1?this.onHeaderCellMouseDown(e):this.onCellMouseDown(e);
},onMouseOverRow:function(e){
if(!this.rows.isOver(e.rowIndex)){
this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e);
}
},onMouseOutRow:function(e){
if(this.rows.isOver(-1)){
this.onHeaderMouseOut(e);
}else{
if(!this.rows.isOver(-2)){
this.rows.setOverRow(-2);
this.onRowMouseOut(e);
}
}
},onMouseDownRow:function(e){
if(e.rowIndex!=-1){
this.onRowMouseDown(e);
}
},onCellMouseOver:function(e){
if(e.cellNode){
dojo.addClass(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
dojo.removeClass(e.cellNode,this.cellOverClass);
}
},onCellMouseDown:function(e){
},onCellClick:function(e){
this._click[0]=this._click[1];
this._click[1]=e;
if(!this.edit.isEditCell(e.rowIndex,e.cellIndex)){
this.focus.setFocusCell(e.cell,e.rowIndex);
}
this.onRowClick(e);
},onCellDblClick:function(e){
if(this._click.length>1&&dojo.isIE){
this.edit.setEditCell(this._click[1].cell,this._click[1].rowIndex);
}else{
if(this._click.length>1&&this._click[0].rowIndex!=this._click[1].rowIndex){
this.edit.setEditCell(this._click[0].cell,this._click[0].rowIndex);
}else{
this.edit.setEditCell(e.cell,e.rowIndex);
}
}
this.onRowDblClick(e);
},onCellContextMenu:function(e){
this.onRowContextMenu(e);
},onCellFocus:function(_a02,_a03){
this.edit.cellFocus(_a02,_a03);
},onRowClick:function(e){
this.edit.rowClick(e);
this.selection.clickSelectEvent(e);
},onRowDblClick:function(e){
},onRowMouseOver:function(e){
},onRowMouseOut:function(e){
},onRowMouseDown:function(e){
},onRowContextMenu:function(e){
dojo.stopEvent(e);
},onHeaderMouseOver:function(e){
},onHeaderMouseOut:function(e){
},onHeaderCellMouseOver:function(e){
if(e.cellNode){
dojo.addClass(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
dojo.removeClass(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseDown:function(e){
},onHeaderClick:function(e){
},onHeaderCellClick:function(e){
this.setSortIndex(e.cell.index);
this.onHeaderClick(e);
},onHeaderDblClick:function(e){
},onHeaderCellDblClick:function(e){
this.onHeaderDblClick(e);
},onHeaderCellContextMenu:function(e){
this.onHeaderContextMenu(e);
},onHeaderContextMenu:function(e){
if(!this.headerMenu){
dojo.stopEvent(e);
}
},onStartEdit:function(_a04,_a05){
},onApplyCellEdit:function(_a06,_a07,_a08){
},onCancelEdit:function(_a09){
},onApplyEdit:function(_a0a){
},onCanSelect:function(_a0b){
return true;
},onCanDeselect:function(_a0c){
return true;
},onSelected:function(_a0d){
this.updateRowStyles(_a0d);
},onDeselected:function(_a0e){
this.updateRowStyles(_a0e);
},onSelectionChanged:function(){
}});
}
if(!dojo._hasResource["dojox.grid._Grid"]){
dojo._hasResource["dojox.grid._Grid"]=true;
dojo.provide("dojox.grid._Grid");
(function(){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
dojo.declare("dojox.grid._Grid",[dijit._Widget,dijit._Templated,dojox.grid._Events],{templateString:"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n",classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,sortInfo:0,themeable:true,_placeholders:null,_layoutClass:dojox.grid._Layout,buildRendering:function(){
this.inherited(arguments);
if(!this.domNode.getAttribute("tabIndex")){
this.domNode.tabIndex="0";
}
this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
this.createSelection();
this.connect(this.selection,"onSelected","onSelected");
this.connect(this.selection,"onDeselected","onDeselected");
this.connect(this.selection,"onChanged","onSelectionChanged");
dojox.html.metrics.initOnFontResize();
this.connect(dojox.html.metrics,"onFontResize","textSizeChanged");
dojox.grid.util.funnelEvents(this.domNode,this,"doKeyEvent",dojox.grid.util.keyEvents);
if(this.selectionMode!="none"){
dojo.attr(this.domNode,"aria-multiselectable",this.selectionMode=="single"?"false":"true");
}
dojo.addClass(this.domNode,this.classTag);
if(!this.isLeftToRight()){
dojo.addClass(this.domNode,this.classTag+"Rtl");
}
},postMixInProperties:function(){
this.inherited(arguments);
var _a0f=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_a0f);
this.errorMessage=dojo.string.substitute(this.errorMessage,_a0f);
if(this.srcNodeRef&&this.srcNodeRef.style.height){
this.height=this.srcNodeRef.style.height;
}
this._setAutoHeightAttr(this.autoHeight,true);
this.lastScrollTop=this.scrollTop=0;
},postCreate:function(){
this._placeholders=[];
this._setHeaderMenuAttr(this.headerMenu);
this._setStructureAttr(this.structure);
this._click=[];
this.inherited(arguments);
if(this.domNode&&this.autoWidth&&this.initialWidth){
this.domNode.style.width=this.initialWidth;
}
if(this.domNode&&!this.editable){
dojo.attr(this.domNode,"aria-readonly","true");
}
},destroy:function(){
this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
delete this._click;
this.edit.destroy();
delete this.edit;
this.views.destroyViews();
if(this.scroller){
this.scroller.destroy();
delete this.scroller;
}
if(this.focus){
this.focus.destroy();
delete this.focus;
}
if(this.headerMenu&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.inherited(arguments);
},_setAutoHeightAttr:function(ah,_a10){
if(typeof ah=="string"){
if(!ah||ah=="false"){
ah=false;
}else{
if(ah=="true"){
ah=true;
}else{
ah=window.parseInt(ah,10);
}
}
}
if(typeof ah=="number"){
if(isNaN(ah)){
ah=false;
}
if(ah<0){
ah=true;
}else{
if(ah===0){
ah=false;
}
}
}
this.autoHeight=ah;
if(typeof ah=="boolean"){
this._autoHeight=ah;
}else{
if(typeof ah=="number"){
this._autoHeight=(ah>=this.get("rowCount"));
}else{
this._autoHeight=false;
}
}
if(this._started&&!_a10){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new dojox.grid._RowManager(this);
this.focus=new dojox.grid._FocusManager(this);
this.edit=new dojox.grid._EditManager(this);
},createSelection:function(){
this.selection=new dojox.grid.Selection(this);
},createScroller:function(){
this.scroller=new dojox.grid._Scroller();
this.scroller.grid=this;
this.scroller.renderRow=dojo.hitch(this,"renderRow");
this.scroller.removeRow=dojo.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.render();
},onResizeColumn:function(_a11){
},createViews:function(){
this.views=new dojox.grid._ViewManager(this);
this.views.createView=dojo.hitch(this,"createView");
},createView:function(_a12,idx){
var c=dojo.getObject(_a12);
var view=new c({grid:this,index:idx});
this.viewsNode.appendChild(view.domNode);
this.viewsHeaderNode.appendChild(view.headerNode);
this.views.addView(view);
dojo.attr(this.domNode,"align",dojo._isBodyLtr()?"left":"right");
return view;
},buildViews:function(){
for(var i=0,vs;(vs=this.layout.structure[i]);i++){
this.createView(vs.type||dojox._scopeName+".grid._View",i).setStructure(vs);
}
this.scroller.setContentNodes(this.views.getContentNodes());
},_setStructureAttr:function(_a13){
var s=_a13;
if(s&&dojo.isString(s)){
dojo.deprecated("dojox.grid._Grid.set('structure', 'objVar')","use dojox.grid._Grid.set('structure', objVar) instead","2.0");
s=dojo.getObject(s);
}
this.structure=s;
if(!s){
if(this.layout.structure){
s=this.layout.structure;
}else{
return;
}
}
this.views.destroyViews();
this.focus.focusView=null;
if(s!==this.layout.structure){
this.layout.setStructure(s);
}
this._structureChanged();
},setStructure:function(_a14){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_a14);
},getColumnTogglingItems:function(){
return dojo.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new dijit.CheckedMenuItem({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_a15){
if(self.layout.setColumnVisibility(this._gridCell.index,_a15)){
var _a16=this._gridCell.menuItems;
if(_a16.length>1){
dojo.forEach(_a16,function(item){
if(item!==this){
item.setAttribute("checked",_a15);
}
},this);
}
_a15=dojo.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
dojo.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_a15.length==1){
dojo.forEach(_a15[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var _a17=dojo.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(_a17,1);
delete this._gridCell;
dijit.CheckedMenuItem.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
return item;
},this);
},_setHeaderMenuAttr:function(menu){
if(this._placeholders&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this._placeholders=[];
}
if(this.headerMenu){
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.headerMenu=menu;
if(!menu){
return;
}
this.headerMenu.bindDomNode(this.viewsHeaderNode);
if(this.headerMenu.getPlaceholders){
this._placeholders=this.headerMenu.getPlaceholders(this.placeholderLabel);
}
},setHeaderMenu:function(menu){
dojo.deprecated("dojox.grid._Grid.setHeaderMenu(obj)","use dojox.grid._Grid.set('headerMenu', obj) instead.","2.0");
this._setHeaderMenuAttr(menu);
},setupHeaderMenu:function(){
if(this._placeholders&&this._placeholders.length){
dojo.forEach(this._placeholders,function(p){
if(p._replaced){
p.unReplace(true);
}
p.replace(this.getColumnTogglingItems());
},this);
}
},_fetch:function(_a18){
this.setScrollTop(0);
},getItem:function(_a19){
return null;
},showMessage:function(_a1a){
if(_a1a){
this.messagesNode.innerHTML=_a1a;
this.messagesNode.style.display="";
}else{
this.messagesNode.innerHTML="";
this.messagesNode.style.display="none";
}
},_structureChanged:function(){
this.buildViews();
if(this.autoRender&&this._started){
this.render();
}
},hasLayout:function(){
return this.layout.cells.length;
},resize:function(_a1b,_a1c){
this._pendingChangeSize=_a1b;
this._pendingResultSize=_a1c;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||dojo._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_a1d,_a1e){
_a1d=_a1d||this._pendingChangeSize;
_a1e=_a1e||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _a1f=this._getPadBorder();
var hh=undefined;
var h;
if(this._autoHeight){
this.domNode.style.height="auto";
}else{
if(typeof this.autoHeight=="number"){
h=hh=this._getHeaderHeight();
h+=(this.scroller.averageRowHeight*this.autoHeight);
this.domNode.style.height=h+"px";
}else{
if(this.domNode.clientHeight<=_a1f.h){
if(pn==document.body){
this.domNode.style.height=this.defaultHeight;
}else{
if(this.height){
this.domNode.style.height=this.height;
}else{
this.fitTo="parent";
}
}
}
}
}
if(_a1e){
_a1d=_a1e;
}
if(_a1d){
dojo.marginBox(this.domNode,_a1d);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=this._parentContentBoxHeight||dojo._getContentBox(pn).h;
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _a20=dojo.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||dojo._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_a20&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_a20){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _a21=(!this.initialWidth&&this.autoWidth);
var w=_a21?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_a21){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_a22){
var t=_a22===undefined?this._getHeaderHeight():_a22;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _a23=0,_a24=0;
var _a25=dojo.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_a23++;
}else{
_a24++;
}
return (!has);
});
if(_a23>0&&_a24>0){
dojo.forEach(_a25,function(v){
v.adaptHeight(true);
});
}
}
if(this.autoHeight===true||h!=-1||(typeof this.autoHeight=="number"&&this.autoHeight>=this.get("rowCount"))){
this.scroller.windowHeight=h;
}else{
this.scroller.windowHeight=Math.max(this.domNode.clientHeight-t,0);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.autoRender){
this.render();
}
},render:function(){
if(!this.domNode){
return;
}
if(!this._started){
return;
}
if(!this.hasLayout()){
this.scroller.init(0,this.keepRows,this.rowsPerPage);
return;
}
this.update=this.defaultUpdate;
this._render();
},_render:function(){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender();
},prerender:function(){
this.keepRows=this._autoHeight?0:this.keepRows;
this.scroller.setKeepInfo(this.keepRows);
this.views.render();
this._resize();
},postrender:function(){
this.postresize();
this.focus.initFocusView();
dojo.setSelectable(this.domNode,this.selectable);
},postresize:function(){
if(this._autoHeight){
var size=Math.max(this.views.measureContent())+"px";
this.viewsNode.style.height=size;
}
},renderRow:function(_a26,_a27){
this.views.renderRow(_a26,_a27,this._skipRowRenormalize);
},rowRemoved:function(_a28){
this.views.rowRemoved(_a28);
},invalidated:null,updating:false,beginUpdate:function(){
this.invalidated=[];
this.updating=true;
},endUpdate:function(){
this.updating=false;
var i=this.invalidated,r;
if(i.all){
this.update();
}else{
if(i.rowCount!=undefined){
this.updateRowCount(i.rowCount);
}else{
for(r in i){
this.updateRow(Number(r));
}
}
}
this.invalidated=[];
},defaultUpdate:function(){
if(!this.domNode){
return;
}
if(this.updating){
this.invalidated.all=true;
return;
}
this.lastScrollTop=this.scrollTop;
this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.lastScrollTop);
this.postrender();
},update:function(){
this.render();
},updateRow:function(_a29){
_a29=Number(_a29);
if(this.updating){
this.invalidated[_a29]=true;
}else{
this.views.updateRow(_a29);
this.scroller.rowHeightChanged(_a29);
}
},updateRows:function(_a2a,_a2b){
_a2a=Number(_a2a);
_a2b=Number(_a2b);
var i;
if(this.updating){
for(i=0;i<_a2b;i++){
this.invalidated[i+_a2a]=true;
}
}else{
for(i=0;i<_a2b;i++){
this.views.updateRow(i+_a2a,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_a2a);
}
},updateRowCount:function(_a2c){
if(this.updating){
this.invalidated.rowCount=_a2c;
}else{
this.rowCount=_a2c;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_a2c);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_a2d){
this.views.updateRowStyles(_a2d);
},getRowNode:function(_a2e){
if(this.focus.focusView&&!(this.focus.focusView instanceof dojox.grid._RowSelector)){
return this.focus.focusView.rowNodes[_a2e];
}else{
for(var i=0,_a2f;(_a2f=this.views.views[i]);i++){
if(!(_a2f instanceof dojox.grid._RowSelector)){
return _a2f.rowNodes[_a2e];
}
}
}
return null;
},rowHeightChanged:function(_a30){
this.views.renormalizeRow(_a30);
this.scroller.rowHeightChanged(_a30);
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(dojo.isIE?100:50),scrollTo:function(_a31){
if(!this.fastScroll){
this.setScrollTop(_a31);
return;
}
var _a32=Math.abs(this.lastScrollTop-_a31);
this.lastScrollTop=_a31;
if(_a32>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.scrollTop=_a31;
this.views.setScrollTop(_a31);
if(this._pendingScroll){
window.clearTimeout(this._pendingScroll);
}
var _a33=this;
this._pendingScroll=window.setTimeout(function(){
delete _a33._pendingScroll;
_a33.finishScrollJob();
},200);
}else{
this.setScrollTop(_a31);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(_a34){
this.scroller.scroll(this.views.setScrollTop(_a34));
},scrollToRow:function(_a35){
this.setScrollTop(this.scroller.findScrollTop(_a35)+1);
},styleRowNode:function(_a36,_a37){
if(_a37){
this.rows.styleRowNode(_a36,_a37);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_a38){
return this.layout.cells[_a38];
},setCellWidth:function(_a39,_a3a){
this.getCell(_a39).unitWidth=_a3a;
},getCellName:function(_a3b){
return "Cell "+_a3b.index;
},canSort:function(_a3c){
},sort:function(){
},getSortAsc:function(_a3d){
_a3d=_a3d==undefined?this.sortInfo:_a3d;
return Boolean(_a3d>0);
},getSortIndex:function(_a3e){
_a3e=_a3e==undefined?this.sortInfo:_a3e;
return Math.abs(_a3e)-1;
},setSortIndex:function(_a3f,_a40){
var si=_a3f+1;
if(_a40!=undefined){
si*=(_a40?1:-1);
}else{
if(this.getSortIndex()==_a3f){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_a41){
if(this.canSort(_a41)){
this.sortInfo=_a41;
this.sort();
this.update();
}
},doKeyEvent:function(e){
e.dispatch="do"+e.type;
this.onKeyEvent(e);
},_dispatch:function(m,e){
if(m in this){
return this[m](e);
}
return false;
},dispatchKeyEvent:function(e){
this._dispatch(e.dispatch,e);
},dispatchContentEvent:function(e){
this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e);
},dispatchHeaderEvent:function(e){
e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e);
},dokeydown:function(e){
this.onKeyDown(e);
},doclick:function(e){
if(e.cellNode){
this.onCellClick(e);
}else{
this.onRowClick(e);
}
},dodblclick:function(e){
if(e.cellNode){
this.onCellDblClick(e);
}else{
this.onRowDblClick(e);
}
},docontextmenu:function(e){
if(e.cellNode){
this.onCellContextMenu(e);
}else{
this.onRowContextMenu(e);
}
},doheaderclick:function(e){
if(e.cellNode){
this.onHeaderCellClick(e);
}else{
this.onHeaderClick(e);
}
},doheaderdblclick:function(e){
if(e.cellNode){
this.onHeaderCellDblClick(e);
}else{
this.onHeaderDblClick(e);
}
},doheadercontextmenu:function(e){
if(e.cellNode){
this.onHeaderCellContextMenu(e);
}else{
this.onHeaderContextMenu(e);
}
},doStartEdit:function(_a42,_a43){
this.onStartEdit(_a42,_a43);
},doApplyCellEdit:function(_a44,_a45,_a46){
this.onApplyCellEdit(_a44,_a45,_a46);
},doCancelEdit:function(_a47){
this.onCancelEdit(_a47);
},doApplyEdit:function(_a48){
this.onApplyEdit(_a48);
},addRow:function(){
this.updateRowCount(this.get("rowCount")+1);
},removeSelectedRows:function(){
if(this.allItemsSelected){
this.updateRowCount(0);
}else{
this.updateRowCount(Math.max(0,this.get("rowCount")-this.selection.getSelected().length));
}
this.selection.clear();
}});
dojox.grid._Grid.markupFactory=function(_a49,node,ctor,_a4a){
var d=dojo;
var _a4b=function(n){
var w=d.attr(n,"width")||"auto";
if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){
w=parseInt(w,10)+"px";
}
return w;
};
if(!_a49.structure&&node.nodeName.toLowerCase()=="table"){
_a49.structure=d.query("> colgroup",node).map(function(cg){
var sv=d.attr(cg,"span");
var v={noscroll:(d.attr(cg,"noscroll")=="true")?true:false,__span:(!!sv?parseInt(sv,10):1),cells:[]};
if(d.hasAttr(cg,"width")){
v.width=_a4b(cg);
}
return v;
});
if(!_a49.structure.length){
_a49.structure.push({__span:Infinity,cells:[]});
}
d.query("thead > tr",node).forEach(function(tr,_a4c){
var _a4d=0;
var _a4e=0;
var _a4f;
var _a50=null;
d.query("> th",tr).map(function(th){
if(!_a50){
_a4f=0;
_a50=_a49.structure[0];
}else{
if(_a4d>=(_a4f+_a50.__span)){
_a4e++;
_a4f+=_a50.__span;
var _a51=_a50;
_a50=_a49.structure[_a4e];
}
}
var cell={name:d.trim(d.attr(th,"name")||th.innerHTML),colSpan:parseInt(d.attr(th,"colspan")||1,10),type:d.trim(d.attr(th,"cellType")||""),id:d.trim(d.attr(th,"id")||"")};
_a4d+=cell.colSpan;
var _a52=d.attr(th,"rowspan");
if(_a52){
cell.rowSpan=_a52;
}
if(d.hasAttr(th,"width")){
cell.width=_a4b(th);
}
if(d.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(dojo.attr(th,"relWidth"),10);
}
if(d.hasAttr(th,"hidden")){
cell.hidden=(d.attr(th,"hidden")=="true"||d.attr(th,"hidden")===true);
}
if(_a4a){
_a4a(th,cell);
}
cell.type=cell.type?dojo.getObject(cell.type):dojox.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!_a50.cells[_a4c]){
_a50.cells[_a4c]=[];
}
_a50.cells[_a4c].push(cell);
});
});
}
return new ctor(_a49,node);
};
})();
}
if(!dojo._hasResource["dojox.grid.DataSelection"]){
dojo._hasResource["dojox.grid.DataSelection"]=true;
dojo.provide("dojox.grid.DataSelection");
dojo.declare("dojox.grid.DataSelection",dojox.grid.Selection,{getFirstSelected:function(){
var idx=dojox.grid.Selection.prototype.getFirstSelected.call(this);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getNextSelected:function(_a53){
var _a54=this.grid.getItemIndex(_a53);
var idx=dojox.grid.Selection.prototype.getNextSelected.call(this,_a54);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getSelected:function(){
var _a55=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_a55.push(this.grid.getItem(i));
}
}
return _a55;
},addToSelection:function(_a56){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _a56=="number"||typeof _a56=="string"){
idx=_a56;
}else{
idx=this.grid.getItemIndex(_a56);
}
dojox.grid.Selection.prototype.addToSelection.call(this,idx);
},deselect:function(_a57){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _a57=="number"||typeof _a57=="string"){
idx=_a57;
}else{
idx=this.grid.getItemIndex(_a57);
}
dojox.grid.Selection.prototype.deselect.call(this,idx);
},deselectAll:function(_a58){
var idx=null;
if(_a58||typeof _a58=="number"){
if(typeof _a58=="number"||typeof _a58=="string"){
idx=_a58;
}else{
idx=this.grid.getItemIndex(_a58);
}
dojox.grid.Selection.prototype.deselectAll.call(this,idx);
}else{
this.inherited(arguments);
}
}});
}
if(!dojo._hasResource["dojox.grid.DataGrid"]){
dojo._hasResource["dojox.grid.DataGrid"]=true;
dojo.provide("dojox.grid.DataGrid");
dojo.declare("dojox.grid.DataGrid",dojox.grid._Grid,{store:null,query:null,queryOptions:null,fetchText:"...",sortFields:null,updateDelay:1,items:null,_store_connects:null,_by_idty:null,_by_idx:null,_cache:null,_pages:null,_pending_requests:null,_bop:-1,_eop:-1,_requests:0,rowCount:0,_isLoaded:false,_isLoading:false,postCreate:function(){
this._pages=[];
this._store_connects=[];
this._by_idty={};
this._by_idx=[];
this._cache=[];
this._pending_requests={};
this._setStore(this.store);
this.inherited(arguments);
},createSelection:function(){
this.selection=new dojox.grid.DataSelection(this);
},get:function(_a59,_a5a){
if(_a5a&&this.field=="_item"&&!this.fields){
return _a5a;
}else{
if(_a5a&&this.fields){
var ret=[];
var s=this.grid.store;
dojo.forEach(this.fields,function(f){
ret=ret.concat(s.getValues(_a5a,f));
});
return ret;
}else{
if(!_a5a&&typeof _a59==="string"){
return this.inherited(arguments);
}
}
}
return (!_a5a?this.defaultValue:(!this.field?this.value:(this.field=="_item"?_a5a:this.grid.store.getValue(_a5a,this.field))));
},_checkUpdateStatus:function(){
if(this.updateDelay>0){
var _a5b=false;
if(this._endUpdateDelay){
clearTimeout(this._endUpdateDelay);
delete this._endUpdateDelay;
_a5b=true;
}
if(!this.updating){
this.beginUpdate();
_a5b=true;
}
if(_a5b){
var _a5c=this;
this._endUpdateDelay=setTimeout(function(){
delete _a5c._endUpdateDelay;
_a5c.endUpdate();
},this.updateDelay);
}
}
},_onSet:function(item,_a5d,_a5e,_a5f){
this._checkUpdateStatus();
var idx=this.getItemIndex(item);
if(idx>-1){
this.updateRow(idx);
}
},_createItem:function(item,_a60){
var idty=this._hasIdentity?this.store.getIdentity(item):dojo.toJson(this.query)+":idx:"+_a60+":sort:"+dojo.toJson(this.getSortProps());
var o=this._by_idty[idty]={idty:idty,item:item};
return o;
},_addItem:function(item,_a61,_a62){
this._by_idx[_a61]=this._createItem(item,_a61);
if(!_a62){
this.updateRow(_a61);
}
},_onNew:function(item,_a63){
this._checkUpdateStatus();
var _a64=this.get("rowCount");
this._addingItem=true;
this.updateRowCount(_a64+1);
this._addingItem=false;
this._addItem(item,_a64);
this.showMessage();
},_onDelete:function(item){
this._checkUpdateStatus();
var idx=this._getItemIndex(item,true);
if(idx>=0){
this._pages=[];
this._bop=-1;
this._eop=-1;
var o=this._by_idx[idx];
this._by_idx.splice(idx,1);
delete this._by_idty[o.idty];
this.updateRowCount(this.get("rowCount")-1);
if(this.get("rowCount")===0){
this.showMessage(this.noDataMessage);
}
}
},_onRevert:function(){
this._refresh();
},setStore:function(_a65,_a66,_a67){
this._setQuery(_a66,_a67);
this._setStore(_a65);
this._refresh(true);
},setQuery:function(_a68,_a69){
this._setQuery(_a68,_a69);
this._refresh(true);
},setItems:function(_a6a){
this.items=_a6a;
this._setStore(this.store);
this._refresh(true);
},_setQuery:function(_a6b,_a6c){
this.query=_a6b;
this.queryOptions=_a6c||this.queryOptions;
},_setStore:function(_a6d){
if(this.store&&this._store_connects){
dojo.forEach(this._store_connects,this.disconnect,this);
}
this.store=_a6d;
if(this.store){
var f=this.store.getFeatures();
var h=[];
this._canEdit=!!f["dojo.data.api.Write"]&&!!f["dojo.data.api.Identity"];
this._hasIdentity=!!f["dojo.data.api.Identity"];
if(!!f["dojo.data.api.Notification"]&&!this.items){
h.push(this.connect(this.store,"onSet","_onSet"));
h.push(this.connect(this.store,"onNew","_onNew"));
h.push(this.connect(this.store,"onDelete","_onDelete"));
}
if(this._canEdit){
h.push(this.connect(this.store,"revert","_onRevert"));
}
this._store_connects=h;
}
},_onFetchBegin:function(size,req){
if(!this.scroller){
return;
}
if(this.rowCount!=size){
if(req.isRender){
this.scroller.init(size,this.keepRows,this.rowsPerPage);
this.rowCount=size;
this._setAutoHeightAttr(this.autoHeight,true);
this._skipRowRenormalize=true;
this.prerender();
this._skipRowRenormalize=false;
}else{
this.updateRowCount(size);
}
}
if(!size){
this.views.render();
this._resize();
this.showMessage(this.noDataMessage);
this.focus.initFocusView();
}else{
this.showMessage();
}
},_onFetchComplete:function(_a6e,req){
if(!this.scroller){
return;
}
if(_a6e&&_a6e.length>0){
dojo.forEach(_a6e,function(item,idx){
this._addItem(item,req.start+idx,true);
},this);
this.updateRows(req.start,_a6e.length);
if(req.isRender){
this.setScrollTop(0);
this.postrender();
}else{
if(this._lastScrollTop){
this.setScrollTop(this._lastScrollTop);
}
}
}
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
}
this._pending_requests[req.start]=false;
},_onFetchError:function(err,req){
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
this.showMessage(this.errorMessage);
}
this._pending_requests[req.start]=false;
this.onFetchError(err,req);
},onFetchError:function(err,req){
},_fetch:function(_a6f,_a70){
_a6f=_a6f||0;
if(this.store&&!this._pending_requests[_a6f]){
if(!this._isLoaded&&!this._isLoading){
this._isLoading=true;
this.showMessage(this.loadingMessage);
}
this._pending_requests[_a6f]=true;
try{
if(this.items){
var _a71=this.items;
var _a72=this.store;
this.rowsPerPage=_a71.length;
var req={start:_a6f,count:this.rowsPerPage,isRender:_a70};
this._onFetchBegin(_a71.length,req);
var _a73=0;
dojo.forEach(_a71,function(i){
if(!_a72.isItemLoaded(i)){
_a73++;
}
});
if(_a73===0){
this._onFetchComplete(_a71,req);
}else{
var _a74=function(item){
_a73--;
if(_a73===0){
this._onFetchComplete(_a71,req);
}
};
dojo.forEach(_a71,function(i){
if(!_a72.isItemLoaded(i)){
_a72.loadItem({item:i,onItem:_a74,scope:this});
}
},this);
}
}else{
this.store.fetch({start:_a6f,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:_a70,onBegin:dojo.hitch(this,"_onFetchBegin"),onComplete:dojo.hitch(this,"_onFetchComplete"),onError:dojo.hitch(this,"_onFetchError")});
}
}
catch(e){
this._onFetchError(e,{start:_a6f,count:this.rowsPerPage});
}
}
},_clearData:function(){
this.updateRowCount(0);
this._by_idty={};
this._by_idx=[];
this._pages=[];
this._bop=this._eop=-1;
this._isLoaded=false;
this._isLoading=false;
},getItem:function(idx){
var data=this._by_idx[idx];
if(!data||(data&&!data.item)){
this._preparePage(idx);
return null;
}
return data.item;
},getItemIndex:function(item){
return this._getItemIndex(item,false);
},_getItemIndex:function(item,_a75){
if(!_a75&&!this.store.isItem(item)){
return -1;
}
var idty=this._hasIdentity?this.store.getIdentity(item):null;
for(var i=0,l=this._by_idx.length;i<l;i++){
var d=this._by_idx[i];
if(d&&((idty&&d.idty==idty)||(d.item===item))){
return i;
}
}
return -1;
},filter:function(_a76,_a77){
this.query=_a76;
if(_a77){
this._clearData();
}
this._fetch();
},_getItemAttr:function(idx,attr){
var item=this.getItem(idx);
return (!item?this.fetchText:this.store.getValue(item,attr));
},_render:function(){
if(this.domNode.parentNode){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this._fetch(0,true);
}
},_requestsPending:function(_a78){
return this._pending_requests[_a78];
},_rowToPage:function(_a79){
return (this.rowsPerPage?Math.floor(_a79/this.rowsPerPage):_a79);
},_pageToRow:function(_a7a){
return (this.rowsPerPage?this.rowsPerPage*_a7a:_a7a);
},_preparePage:function(_a7b){
if((_a7b<this._bop||_a7b>=this._eop)&&!this._addingItem){
var _a7c=this._rowToPage(_a7b);
this._needPage(_a7c);
this._bop=_a7c*this.rowsPerPage;
this._eop=this._bop+(this.rowsPerPage||this.get("rowCount"));
}
},_needPage:function(_a7d){
if(!this._pages[_a7d]){
this._pages[_a7d]=true;
this._requestPage(_a7d);
}
},_requestPage:function(_a7e){
var row=this._pageToRow(_a7e);
var _a7f=Math.min(this.rowsPerPage,this.get("rowCount")-row);
if(_a7f>0){
this._requests++;
if(!this._requestsPending(row)){
setTimeout(dojo.hitch(this,"_fetch",row,false),1);
}
}
},getCellName:function(_a80){
return _a80.field;
},_refresh:function(_a81){
this._clearData();
this._fetch(0,_a81);
},sort:function(){
this.edit.apply();
this._lastScrollTop=this.scrollTop;
this._refresh();
},canSort:function(){
return (!this._isLoading);
},getSortProps:function(){
var c=this.getCell(this.getSortIndex());
if(!c){
if(this.sortFields){
return this.sortFields;
}
return null;
}else{
var desc=c["sortDesc"];
var si=!(this.sortInfo>0);
if(typeof desc=="undefined"){
desc=si;
}else{
desc=si?!desc:desc;
}
return [{attribute:c.field,descending:desc}];
}
},styleRowState:function(_a82){
if(this.store&&this.store.getState){
var _a83=this.store.getState(_a82.index),c="";
for(var i=0,ss=["inflight","error","inserting"],s;s=ss[i];i++){
if(_a83[s]){
c=" dojoxGridRow-"+s;
break;
}
}
_a82.customClasses+=c;
}
},onStyleRow:function(_a84){
this.styleRowState(_a84);
this.inherited(arguments);
},canEdit:function(_a85,_a86){
return this._canEdit;
},_copyAttr:function(idx,attr){
var row={};
var _a87={};
var src=this.getItem(idx);
return this.store.getValue(src,attr);
},doStartEdit:function(_a88,_a89){
if(!this._cache[_a89]){
this._cache[_a89]=this._copyAttr(_a89,_a88.field);
}
this.onStartEdit(_a88,_a89);
},doApplyCellEdit:function(_a8a,_a8b,_a8c){
this.store.fetchItemByIdentity({identity:this._by_idx[_a8b].idty,onItem:dojo.hitch(this,function(item){
var _a8d=this.store.getValue(item,_a8c);
if(typeof _a8d=="number"){
_a8a=isNaN(_a8a)?_a8a:parseFloat(_a8a);
}else{
if(typeof _a8d=="boolean"){
_a8a=_a8a=="true"?true:_a8a=="false"?false:_a8a;
}else{
if(_a8d instanceof Date){
var _a8e=new Date(_a8a);
_a8a=isNaN(_a8e.getTime())?_a8a:_a8e;
}
}
}
this.store.setValue(item,_a8c,_a8a);
this.onApplyCellEdit(_a8a,_a8b,_a8c);
})});
},doCancelEdit:function(_a8f){
var _a90=this._cache[_a8f];
if(_a90){
this.updateRow(_a8f);
delete this._cache[_a8f];
}
this.onCancelEdit.apply(this,arguments);
},doApplyEdit:function(_a91,_a92){
var _a93=this._cache[_a91];
this.onApplyEdit(_a91);
},removeSelectedRows:function(){
if(this._canEdit){
this.edit.apply();
var fx=dojo.hitch(this,function(_a94){
if(_a94.length){
dojo.forEach(_a94,this.store.deleteItem,this.store);
this.selection.clear();
}
});
if(this.allItemsSelected){
this.store.fetch({query:this.query,queryOptions:this.queryOptions,onComplete:fx});
}else{
fx(this.selection.getSelected());
}
}
}});
dojox.grid.DataGrid.cell_markupFactory=function(_a95,node,_a96){
var _a97=dojo.trim(dojo.attr(node,"field")||"");
if(_a97){
_a96.field=_a97;
}
_a96.field=_a96.field||_a96.name;
var _a98=dojo.trim(dojo.attr(node,"fields")||"");
if(_a98){
_a96.fields=_a98.split(",");
}
if(_a95){
_a95(node,_a96);
}
};
dojox.grid.DataGrid.markupFactory=function(_a99,node,ctor,_a9a){
return dojox.grid._Grid.markupFactory(_a99,node,ctor,dojo.partial(dojox.grid.DataGrid.cell_markupFactory,_a9a));
};
}
if(!dojo._hasResource["dojox.widget.Standby"]){
dojo._hasResource["dojox.widget.Standby"]=true;
dojo.provide("dojox.widget.Standby");
dojo.experimental("dojox.widget.Standby");
dojo.declare("dojox.widget.Standby",[dijit._Widget,dijit._Templated],{templateString:"<div>"+"<div style=\"display: none; opacity: 0; z-index: 9999; "+"position: absolute; cursor:wait;\" dojoAttachPoint=\"_underlayNode\"></div>"+"<img src=\"${image}\" style=\"opacity: 0; display: none; z-index: -10000; "+"position: absolute; top: 0px; left: 0px; cursor:wait;\" "+"dojoAttachPoint=\"_imageNode\">"+"<div style=\"opacity: 0; display: none; z-index: -10000; position: absolute; "+"top: 0px;\" dojoAttachPoint=\"_textNode\"></div>"+"</div>",_underlayNode:null,_imageNode:null,_textNode:null,_centerNode:null,image:dojo.moduleUrl("dojox","widget/Standby/images/loading.gif").toString(),imageText:"Please Wait...",text:"Please wait...",centerIndicator:"image",_displayed:false,_resizeCheck:null,target:"",color:"#C0C0C0",duration:500,_started:false,_parent:null,zIndex:"auto",startup:function(args){
if(!this._started){
if(typeof this.target==="string"){
var w=dijit.byId(this.target);
if(w){
this.target=w.domNode;
}else{
this.target=dojo.byId(this.target);
}
}
if(this.text){
this._textNode.innerHTML=this.text;
}
if(this.centerIndicator==="image"){
this._centerNode=this._imageNode;
dojo.attr(this._imageNode,"src",this.image);
dojo.attr(this._imageNode,"alt",this.imageText);
}else{
this._centerNode=this._textNode;
}
dojo.style(this._underlayNode,{display:"none",backgroundColor:this.color});
dojo.style(this._centerNode,"display","none");
this.connect(this._underlayNode,"onclick","_ignore");
if(this.domNode.parentNode&&this.domNode.parentNode!=dojo.body()){
dojo.body().appendChild(this.domNode);
}
if(dojo.isIE==7){
this._ieFixNode=dojo.doc.createElement("div");
dojo.style(this._ieFixNode,{opacity:"0",zIndex:"-1000",position:"absolute",top:"-1000px"});
dojo.body().appendChild(this._ieFixNode);
}
}
},show:function(){
if(!this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._displayed=true;
this._size();
this._disableOverflow();
this._fadeIn();
}
},hide:function(){
if(this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._size();
this._fadeOut();
this._displayed=false;
if(this._resizeCheck!==null){
clearInterval(this._resizeCheck);
this._resizeCheck=null;
}
}
},isVisible:function(){
return this._displayed;
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this._displayed=false;
if(this._resizeCheck){
clearInterval(this._resizeCheck);
}
dojo.style(this._centerNode,"display","none");
dojo.style(this._underlayNode,"display","none");
if(dojo.isIE==7){
dojo.body().removeChild(this._ieFixNode);
delete this._ieFixNode;
}
if(this._anim){
this._anim.stop();
delete this._anim;
}
this.target=null;
this._imageNode=null;
this._textNode=null;
this._centerNode=null;
this.inherited(arguments);
},_size:function(){
if(this._displayed){
var dir=dojo.attr(dojo.body(),"dir");
if(dir){
dir=dir.toLowerCase();
}
var _a9b;
var _a9c=this._scrollerWidths();
var _a9d=this.target;
var _a9e=dojo.style(this._centerNode,"display");
dojo.style(this._centerNode,"display","block");
var box=dojo.position(_a9d,true);
if(_a9d===dojo.body()||_a9d===dojo.doc){
box=dojo.window.getBox();
box.x=box.l;
box.y=box.t;
}
var _a9f=dojo.marginBox(this._centerNode);
dojo.style(this._centerNode,"display",_a9e);
if(this._ieFixNode){
_a9b=-this._ieFixNode.offsetTop/1000;
box.x=Math.floor((box.x+0.9)/_a9b);
box.y=Math.floor((box.y+0.9)/_a9b);
box.w=Math.floor((box.w+0.9)/_a9b);
box.h=Math.floor((box.h+0.9)/_a9b);
}
var zi=dojo.style(_a9d,"zIndex");
var ziUl=zi;
var ziIn=zi;
if(this.zIndex==="auto"){
if(zi!="auto"){
ziUl=parseInt(ziUl,10)+1;
ziIn=parseInt(ziIn,10)+2;
}else{
var _aa0=_a9d.parentNode;
var _aa1=-100000;
while(_aa0&&_aa0!==dojo.body()){
zi=dojo.style(_aa0,"zIndex");
if(!zi||zi==="auto"){
_aa0=_aa0.parentNode;
}else{
var _aa2=parseInt(zi,10);
if(_aa1<_aa2){
_aa1=_aa2;
ziUl=_aa2+1;
ziIn=_aa2+2;
}
_aa0=_aa0.parentNode;
}
}
}
}else{
ziUl=parseInt(this.zIndex,10)+1;
ziIn=parseInt(this.zIndex,10)+2;
}
dojo.style(this._centerNode,"zIndex",ziIn);
dojo.style(this._underlayNode,"zIndex",ziUl);
var pn=_a9d.parentNode;
if(pn&&pn!==dojo.body()&&_a9d!==dojo.body()&&_a9d!==dojo.doc){
var obh=box.h;
var obw=box.w;
var _aa3=dojo.position(pn,true);
if(this._ieFixNode){
_a9b=-this._ieFixNode.offsetTop/1000;
_aa3.x=Math.floor((_aa3.x+0.9)/_a9b);
_aa3.y=Math.floor((_aa3.y+0.9)/_a9b);
_aa3.w=Math.floor((_aa3.w+0.9)/_a9b);
_aa3.h=Math.floor((_aa3.h+0.9)/_a9b);
}
_aa3.w-=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_a9c.v:0;
_aa3.h-=pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_a9c.h:0;
if(dir==="rtl"){
if(dojo.isOpera){
box.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_a9c.v:0;
_aa3.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_a9c.v:0;
}else{
if(dojo.isIE){
_aa3.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_a9c.v:0;
}else{
if(dojo.isWebKit){
}
}
}
}
if(_aa3.w<box.w){
box.w=box.w-_aa3.w;
}
if(_aa3.h<box.h){
box.h=box.h-_aa3.h;
}
var _aa4=_aa3.y;
var _aa5=_aa3.y+_aa3.h;
var bTop=box.y;
var _aa6=box.y+obh;
var _aa7=_aa3.x;
var _aa8=_aa3.x+_aa3.w;
var _aa9=box.x;
var _aaa=box.x+obw;
var _aab;
if(_aa6>_aa4&&bTop<_aa4){
box.y=_aa3.y;
_aab=_aa4-bTop;
var _aac=obh-_aab;
if(_aac<_aa3.h){
box.h=_aac;
}else{
box.h-=2*(pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_a9c.h:0);
}
}else{
if(bTop<_aa5&&_aa6>_aa5){
box.h=_aa5-bTop;
}else{
if(_aa6<=_aa4||bTop>=_aa5){
box.h=0;
}
}
}
if(_aaa>_aa7&&_aa9<_aa7){
box.x=_aa3.x;
_aab=_aa7-_aa9;
var _aad=obw-_aab;
if(_aad<_aa3.w){
box.w=_aad;
}else{
box.w-=2*(pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_a9c.w:0);
}
}else{
if(_aa9<_aa8&&_aaa>_aa8){
box.w=_aa8-_aa9;
}else{
if(_aaa<=_aa7||_aa9>=_aa8){
box.w=0;
}
}
}
}
if(box.h>0&&box.w>0){
dojo.style(this._underlayNode,{display:"block",width:box.w+"px",height:box.h+"px",top:box.y+"px",left:box.x+"px"});
var _aae=["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"];
this._cloneStyles(_aae);
if(!dojo.isIE){
_aae=["MozBorderRadius","MozBorderRadiusTopleft","MozBorderRadiusTopright","MozBorderRadiusBottomleft","MozBorderRadiusBottomright","WebkitBorderRadius","WebkitBorderTopLeftRadius","WebkitBorderTopRightRadius","WebkitBorderBottomLeftRadius","WebkitBorderBottomRightRadius"];
this._cloneStyles(_aae,this);
}
var _aaf=(box.h/2)-(_a9f.h/2);
var _ab0=(box.w/2)-(_a9f.w/2);
if(box.h>=_a9f.h&&box.w>=_a9f.w){
dojo.style(this._centerNode,{top:(_aaf+box.y)+"px",left:(_ab0+box.x)+"px",display:"block"});
}else{
dojo.style(this._centerNode,"display","none");
}
}else{
dojo.style(this._underlayNode,"display","none");
dojo.style(this._centerNode,"display","none");
}
if(this._resizeCheck===null){
var self=this;
this._resizeCheck=setInterval(function(){
self._size();
},100);
}
}
},_cloneStyles:function(list){
dojo.forEach(list,function(_ab1){
dojo.style(this._underlayNode,_ab1,dojo.style(this.target,_ab1));
},this);
},_fadeIn:function(){
var self=this;
var _ab2=dojo.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0,end:0.75}}});
var _ab3=dojo.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:0,end:1}},onEnd:function(){
self.onShow();
delete self._anim;
}});
this._anim=dojo.fx.combine([_ab2,_ab3]);
this._anim.play();
},_fadeOut:function(){
var self=this;
var _ab4=dojo.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0.75,end:0}},onEnd:function(){
dojo.style(this.node,{"display":"none","zIndex":"-1000"});
}});
var _ab5=dojo.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:1,end:0}},onEnd:function(){
dojo.style(this.node,{"display":"none","zIndex":"-1000"});
self.onHide();
self._enableOverflow();
delete self._anim;
}});
this._anim=dojo.fx.combine([_ab4,_ab5]);
this._anim.play();
},_ignore:function(_ab6){
if(_ab6){
dojo.stopEvent(_ab6);
}
},_scrollerWidths:function(){
var div=dojo.doc.createElement("div");
dojo.style(div,{position:"absolute",opacity:0,overflow:"hidden",width:"50px",height:"50px",zIndex:"-100",top:"-200px",left:"-200px",padding:"0px",margin:"0px"});
var iDiv=dojo.doc.createElement("div");
dojo.style(iDiv,{width:"200px",height:"10px"});
div.appendChild(iDiv);
dojo.body().appendChild(div);
var b=dojo.contentBox(div);
dojo.style(div,"overflow","scroll");
var a=dojo.contentBox(div);
dojo.body().removeChild(div);
return {v:b.w-a.w,h:b.h-a.h};
},_setTextAttr:function(text){
this._textNode.innerHTML=text;
this.text=text;
},_setColorAttr:function(c){
dojo.style(this._underlayNode,"backgroundColor",c);
this.color=c;
},_setImageTextAttr:function(text){
dojo.attr(this._imageNode,"alt",text);
this.imageText=text;
},_setImageAttr:function(url){
dojo.attr(this._imageNode,"src",url);
this.image=url;
},_setCenterIndicatorAttr:function(_ab7){
this.centerIndicator=_ab7;
if(_ab7==="image"){
this._centerNode=this._imageNode;
dojo.style(this._textNode,"display","none");
}else{
this._centerNode=this._textNode;
dojo.style(this._imageNode,"display","none");
}
},_disableOverflow:function(){
if(this.target===dojo.body()||this.target===dojo.doc){
this._overflowDisabled=true;
var body=dojo.body();
if(body.style&&body.style.overflow){
this._oldOverflow=dojo.style(body,"overflow");
}else{
this._oldOverflow="";
}
if(dojo.isIE&&!dojo.isQuirks){
if(body.parentNode&&body.parentNode.style&&body.parentNode.style.overflow){
this._oldBodyParentOverflow=body.parentNode.style.overflow;
}else{
try{
this._oldBodyParentOverflow=dojo.style(body.parentNode,"overflow");
}
catch(e){
this._oldBodyParentOverflow="scroll";
}
}
dojo.style(body.parentNode,"overflow","hidden");
}
dojo.style(body,"overflow","hidden");
}
},_enableOverflow:function(){
if(this._overflowDisabled){
delete this._overflowDisabled;
var body=dojo.body();
if(dojo.isIE&&!dojo.isQuirks){
body.parentNode.style.overflow=this._oldBodyParentOverflow;
delete this._oldBodyParentOverflow;
}
dojo.style(body,"overflow",this._oldOverflow);
if(dojo.isWebKit){
var div=dojo.create("div",{style:{height:"2px"}});
body.appendChild(div);
setTimeout(function(){
body.removeChild(div);
},0);
}
delete this._oldOverflow;
}
}});
}
if(!dojo._hasResource["dojo.fx.easing"]){
dojo._hasResource["dojo.fx.easing"]=true;
dojo.provide("dojo.fx.easing");
dojo.getObject("fx.easing",true,dojo);
dojo.fx.easing={linear:function(n){
return n;
},quadIn:function(n){
return Math.pow(n,2);
},quadOut:function(n){
return n*(n-2)*-1;
},quadInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,2)/2;
}
return -1*((--n)*(n-2)-1)/2;
},cubicIn:function(n){
return Math.pow(n,3);
},cubicOut:function(n){
return Math.pow(n-1,3)+1;
},cubicInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,3)/2;
}
n-=2;
return (Math.pow(n,3)+2)/2;
},quartIn:function(n){
return Math.pow(n,4);
},quartOut:function(n){
return -1*(Math.pow(n-1,4)-1);
},quartInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,4)/2;
}
n-=2;
return -1/2*(Math.pow(n,4)-2);
},quintIn:function(n){
return Math.pow(n,5);
},quintOut:function(n){
return Math.pow(n-1,5)+1;
},quintInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,5)/2;
}
n-=2;
return (Math.pow(n,5)+2)/2;
},sineIn:function(n){
return -1*Math.cos(n*(Math.PI/2))+1;
},sineOut:function(n){
return Math.sin(n*(Math.PI/2));
},sineInOut:function(n){
return -1*(Math.cos(Math.PI*n)-1)/2;
},expoIn:function(n){
return (n==0)?0:Math.pow(2,10*(n-1));
},expoOut:function(n){
return (n==1)?1:(-1*Math.pow(2,-10*n)+1);
},expoInOut:function(n){
if(n==0){
return 0;
}
if(n==1){
return 1;
}
n=n*2;
if(n<1){
return Math.pow(2,10*(n-1))/2;
}
--n;
return (-1*Math.pow(2,-10*n)+2)/2;
},circIn:function(n){
return -1*(Math.sqrt(1-Math.pow(n,2))-1);
},circOut:function(n){
n=n-1;
return Math.sqrt(1-Math.pow(n,2));
},circInOut:function(n){
n=n*2;
if(n<1){
return -1/2*(Math.sqrt(1-Math.pow(n,2))-1);
}
n-=2;
return 1/2*(Math.sqrt(1-Math.pow(n,2))+1);
},backIn:function(n){
var s=1.70158;
return Math.pow(n,2)*((s+1)*n-s);
},backOut:function(n){
n=n-1;
var s=1.70158;
return Math.pow(n,2)*((s+1)*n+s)+1;
},backInOut:function(n){
var s=1.70158*1.525;
n=n*2;
if(n<1){
return (Math.pow(n,2)*((s+1)*n-s))/2;
}
n-=2;
return (Math.pow(n,2)*((s+1)*n+s)+2)/2;
},elasticIn:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
n=n-1;
return -1*Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p);
},elasticOut:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
return Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1;
},elasticInOut:function(n){
if(n==0){
return 0;
}
n=n*2;
if(n==2){
return 1;
}
var p=0.3*1.5;
var s=p/4;
if(n<1){
n-=1;
return -0.5*(Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p));
}
n-=1;
return 0.5*(Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p))+1;
},bounceIn:function(n){
return (1-dojo.fx.easing.bounceOut(1-n));
},bounceOut:function(n){
var s=7.5625;
var p=2.75;
var l;
if(n<(1/p)){
l=s*Math.pow(n,2);
}else{
if(n<(2/p)){
n-=(1.5/p);
l=s*Math.pow(n,2)+0.75;
}else{
if(n<(2.5/p)){
n-=(2.25/p);
l=s*Math.pow(n,2)+0.9375;
}else{
n-=(2.625/p);
l=s*Math.pow(n,2)+0.984375;
}
}
}
return l;
},bounceInOut:function(n){
if(n<0.5){
return dojo.fx.easing.bounceIn(n*2)/2;
}
return (dojo.fx.easing.bounceOut(n*2-1)/2)+0.5;
}};
}
if(!dojo._hasResource["dojox.charting.action2d.Base"]){
dojo._hasResource["dojox.charting.action2d.Base"]=true;
dojo.provide("dojox.charting.action2d.Base");
(function(){
var _ab8=400,_ab9=dojo.fx.easing.backOut,df=dojox.lang.functional;
dojo.declare("dojox.charting.action2d.Base",null,{overOutEvents:{onmouseover:1,onmouseout:1},constructor:function(_aba,plot,_abb){
this.chart=_aba;
this.plot=plot||"default";
this.anim={};
if(!_abb){
_abb={};
}
this.duration=_abb.duration?_abb.duration:_ab8;
this.easing=_abb.easing?_abb.easing:_ab9;
},connect:function(){
this.handle=this.chart.connectToPlot(this.plot,this,"process");
},disconnect:function(){
if(this.handle){
dojo.disconnect(this.handle);
this.handle=null;
}
},reset:function(){
},destroy:function(){
this.disconnect();
df.forIn(this.anim,function(o){
df.forIn(o,function(anim){
anim.action.stop(true);
});
});
this.anim={};
}});
})();
}
if(!dojo._hasResource["dojox.color._base"]){
dojo._hasResource["dojox.color._base"]=true;
dojo.provide("dojox.color._base");
dojox.color.Color=dojo.Color;
dojox.color.blend=dojo.blendColors;
dojox.color.fromRgb=dojo.colorFromRgb;
dojox.color.fromHex=dojo.colorFromHex;
dojox.color.fromArray=dojo.colorFromArray;
dojox.color.fromString=dojo.colorFromString;
dojox.color.greyscale=dojo.colors.makeGrey;
dojo.mixin(dojox.color,{fromCmy:function(cyan,_abc,_abd){
if(dojo.isArray(cyan)){
_abc=cyan[1],_abd=cyan[2],cyan=cyan[0];
}else{
if(dojo.isObject(cyan)){
_abc=cyan.m,_abd=cyan.y,cyan=cyan.c;
}
}
cyan/=100,_abc/=100,_abd/=100;
var r=1-cyan,g=1-_abc,b=1-_abd;
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromCmyk:function(cyan,_abe,_abf,_ac0){
if(dojo.isArray(cyan)){
_abe=cyan[1],_abf=cyan[2],_ac0=cyan[3],cyan=cyan[0];
}else{
if(dojo.isObject(cyan)){
_abe=cyan.m,_abf=cyan.y,_ac0=cyan.b,cyan=cyan.c;
}
}
cyan/=100,_abe/=100,_abf/=100,_ac0/=100;
var r,g,b;
r=1-Math.min(1,cyan*(1-_ac0)+_ac0);
g=1-Math.min(1,_abe*(1-_ac0)+_ac0);
b=1-Math.min(1,_abf*(1-_ac0)+_ac0);
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsl:function(hue,_ac1,_ac2){
if(dojo.isArray(hue)){
_ac1=hue[1],_ac2=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_ac1=hue.s,_ac2=hue.l,hue=hue.h;
}
}
_ac1/=100;
_ac2/=100;
while(hue<0){
hue+=360;
}
while(hue>=360){
hue-=360;
}
var r,g,b;
if(hue<120){
r=(120-hue)/60,g=hue/60,b=0;
}else{
if(hue<240){
r=0,g=(240-hue)/60,b=(hue-120)/60;
}else{
r=(hue-240)/60,g=0,b=(360-hue)/60;
}
}
r=2*_ac1*Math.min(r,1)+(1-_ac1);
g=2*_ac1*Math.min(g,1)+(1-_ac1);
b=2*_ac1*Math.min(b,1)+(1-_ac1);
if(_ac2<0.5){
r*=_ac2,g*=_ac2,b*=_ac2;
}else{
r=(1-_ac2)*r+2*_ac2-1;
g=(1-_ac2)*g+2*_ac2-1;
b=(1-_ac2)*b+2*_ac2-1;
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsv:function(hue,_ac3,_ac4){
if(dojo.isArray(hue)){
_ac3=hue[1],_ac4=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_ac3=hue.s,_ac4=hue.v,hue=hue.h;
}
}
if(hue==360){
hue=0;
}
_ac3/=100;
_ac4/=100;
var r,g,b;
if(_ac3==0){
r=_ac4,b=_ac4,g=_ac4;
}else{
var _ac5=hue/60,i=Math.floor(_ac5),f=_ac5-i;
var p=_ac4*(1-_ac3);
var q=_ac4*(1-(_ac3*f));
var t=_ac4*(1-(_ac3*(1-f)));
switch(i){
case 0:
r=_ac4,g=t,b=p;
break;
case 1:
r=q,g=_ac4,b=p;
break;
case 2:
r=p,g=_ac4,b=t;
break;
case 3:
r=p,g=q,b=_ac4;
break;
case 4:
r=t,g=p,b=_ac4;
break;
case 5:
r=_ac4,g=p,b=q;
break;
}
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
}});
dojo.extend(dojox.color.Color,{toCmy:function(){
var cyan=1-(this.r/255),_ac6=1-(this.g/255),_ac7=1-(this.b/255);
return {c:Math.round(cyan*100),m:Math.round(_ac6*100),y:Math.round(_ac7*100)};
},toCmyk:function(){
var cyan,_ac8,_ac9,_aca;
var r=this.r/255,g=this.g/255,b=this.b/255;
_aca=Math.min(1-r,1-g,1-b);
cyan=(1-r-_aca)/(1-_aca);
_ac8=(1-g-_aca)/(1-_aca);
_ac9=(1-b-_aca)/(1-_aca);
return {c:Math.round(cyan*100),m:Math.round(_ac8*100),y:Math.round(_ac9*100),b:Math.round(_aca*100)};
},toHsl:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _acb=max-min;
var h=0,s=0,l=(min+max)/2;
if(l>0&&l<1){
s=_acb/((l<0.5)?(2*l):(2-2*l));
}
if(_acb>0){
if(max==r&&max!=g){
h+=(g-b)/_acb;
}
if(max==g&&max!=b){
h+=(2+(b-r)/_acb);
}
if(max==b&&max!=r){
h+=(4+(r-g)/_acb);
}
h*=60;
}
return {h:h,s:Math.round(s*100),l:Math.round(l*100)};
},toHsv:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _acc=max-min;
var h=null,s=(max==0)?0:(_acc/max);
if(s==0){
h=0;
}else{
if(r==max){
h=60*(g-b)/_acc;
}else{
if(g==max){
h=120+60*(b-r)/_acc;
}else{
h=240+60*(r-g)/_acc;
}
}
if(h<0){
h+=360;
}
}
return {h:h,s:Math.round(s*100),v:Math.round(max*100)};
}});
}
if(!dojo._hasResource["dojox.color"]){
dojo._hasResource["dojox.color"]=true;
dojo.provide("dojox.color");
}
if(!dojo._hasResource["insight.charting.action2d.StrokeHighlight"]){
dojo._hasResource["insight.charting.action2d.StrokeHighlight"]=true;
dojo.provide("insight.charting.action2d.StrokeHighlight");
(function(){
var _acd=100,_ace=75,_acf=50,c=dojox.color,cc=function(_ad0){
return function(){
return _ad0;
};
},hl=function(_ad1){
var a=new c.Color(_ad1),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=_acd;
if(x.l<_acf){
x.l=_ace;
}else{
if(x.l>_ace){
x.l=_acf;
}else{
x.l=x.l-_acf>_ace-x.l?_acf:_ace;
}
}
}
return c.fromHsl(x);
};
dojo.declare("insight.charting.action2d.StrokeHighlight",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut},optionalParams:{highlight:"red"},constructor:function(_ad2,plot,_ad3){
var a=_ad3&&_ad3.highlight;
this.colorFun=a?(dojo.isFunction(a)?a:cc(a)):hl;
this.connect();
},process:function(o){
if(!o.shape||!(o.type in this.overOutEvents||o.originalEvent in this.overOutEvents)){
return;
}
dojo.forEach(o.plot.series,function(_ad4){
var i=o.plot._eventSeries[_ad4.name]&&o.plot._eventSeries[_ad4.name][o.index];
if(i){
this._process(dojo.delegate(o,{run:i.run,shape:i.shape}));
}
},this);
},_process:function(o){
var _ad5=o.run.name,_ad6=o.index,anim,_ad7,_ad8;
if(_ad5 in this.anim){
anim=this.anim[_ad5][_ad6];
}else{
this.anim[_ad5]={};
}
if(anim){
anim.action.stop(true);
}else{
var _ad9=o.shape.getStroke().color;
if(!_ad9||!(_ad9 instanceof dojo.Color)){
return;
}
this.anim[_ad5][_ad6]=anim={start:_ad9,end:this.colorFun(_ad9)};
}
var _ada=anim.start,end=anim.end;
if(o.type=="onmouseout"||o.originalEvent=="onmouseout"){
var t=_ada;
_ada=end;
end=t;
}
anim.action=dojox.gfx.fx.animateStroke({shape:o.shape,duration:this.duration,easing:this.easing,color:{start:_ada,end:end}});
if(o.type=="onmouseout"||o.originalEvent=="onmouseout"){
var _adb=dojo.connect(anim.action,"onEnd",this,function(){
dojo.disconnect(_adb);
if(this.anim[_ad5]){
delete this.anim[_ad5][_ad6];
}
});
}
anim.action.play();
}});
})();
}
if(!dojo._hasResource["insight.charting.axis2d.Fixed"]){
dojo._hasResource["insight.charting.axis2d.Fixed"]=true;
dojo.provide("insight.charting.axis2d.Fixed");
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_adc=4,_add=45;
dojo.declare("insight.charting.axis2d.Fixed",dojox.charting.axis2d.Invisible,{defaultParams:{vertical:false,natural:false,leftBottom:true,includeZero:false,fixed:true,rotation:0,labels:[],htmlLabels:true},optionalParams:{min:0,max:1,from:0,to:1,labelFunc:null,maxLabelSize:0,stroke:{},tick:{},font:"",fontColor:""},constructor:function(_ade,_adf){
this.opt=dojo.delegate(this.defaultParams,_adf);
du.updateWithPattern(this.opt,_adf,this.optionalParams);
},getOffsets:function(){
var s=this.scaler,_ae0={l:0,r:0,t:0,b:0};
if(!s){
return _ae0;
}
var o=this.opt,_ae1=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_ae2=0,ma=s.major,mi=s.minor,ta=this.chart.theme.axis,_ae3=o.font||(ta.tick&&ta.tick.font),_ae4=this.chart.theme.getTick("major",o),size=_ae3?g.normalizedLength(g.splitFontString(_ae3).size):0,_ae5=o.rotation%360,_ae6=o.leftBottom,cosr=Math.abs(Math.cos(_ae5*Math.PI/180)),sinr=Math.abs(Math.sin(_ae5*Math.PI/180));
if(_ae5<0){
_ae5+=360;
}
if(size){
if(o.maxLabelSize){
_ae1=o.maxLabelSize;
}else{
_ae1=this._groupLabelWidth(this.labels,_ae3);
}
if(this.vertical){
var side=_ae6?"l":"r";
switch(_ae5){
case 0:
case 180:
_ae0[side]=_ae1;
_ae0.t=_ae0.b=size/2;
break;
case 90:
case 270:
_ae0[side]=size;
_ae0.t=_ae0.b=_ae1/2;
break;
default:
if(_ae5<=_add||(180<_ae5&&_ae5<=(180+_add))){
_ae0[side]=size*sinr/2+_ae1*cosr;
_ae0[_ae6?"t":"b"]=size*cosr/2+_ae1*sinr;
_ae0[_ae6?"b":"t"]=size*cosr/2;
}else{
if(_ae5>(360-_add)||(180>_ae5&&_ae5>(180-_add))){
_ae0[side]=size*sinr/2+_ae1*cosr;
_ae0[_ae6?"b":"t"]=size*cosr/2+_ae1*sinr;
_ae0[_ae6?"t":"b"]=size*cosr/2;
}else{
if(_ae5<90||(180<_ae5&&_ae5<270)){
_ae0[side]=size*sinr+_ae1*cosr;
_ae0[_ae6?"t":"b"]=size*cosr+_ae1*sinr;
}else{
_ae0[side]=size*sinr+_ae1*cosr;
_ae0[_ae6?"b":"t"]=size*cosr+_ae1*sinr;
}
}
}
break;
}
_ae0[side]+=_adc+_ae4.length;
}else{
var side=_ae6?"b":"t";
switch(_ae5){
case 0:
case 180:
_ae0[side]=size;
_ae0.l=_ae0.r=_ae1/2;
break;
case 90:
case 270:
_ae0[side]=_ae1;
_ae0.l=_ae0.r=size/2;
break;
default:
if((90-_add)<=_ae5&&_ae5<=90||(270-_add)<=_ae5&&_ae5<=270){
_ae0[side]=size*sinr/2+_ae1*cosr;
_ae0[_ae6?"r":"l"]=size*cosr/2+_ae1*sinr;
_ae0[_ae6?"l":"r"]=size*cosr/2;
}else{
if(90<=_ae5&&_ae5<=(90+_add)||270<=_ae5&&_ae5<=(270+_add)){
_ae0[side]=size*sinr/2+_ae1*cosr;
_ae0[_ae6?"l":"r"]=size*cosr/2+_ae1*sinr;
_ae0[_ae6?"r":"l"]=size*cosr/2;
}else{
if(_ae5<_add||(180<_ae5&&_ae5<(180-_add))){
_ae0[side]=size*sinr+_ae1*cosr;
_ae0[_ae6?"r":"l"]=size*cosr+_ae1*sinr;
}else{
_ae0[side]=size*sinr+_ae1*cosr;
_ae0[_ae6?"l":"r"]=size*cosr+_ae1*sinr;
}
}
}
break;
}
_ae0[side]+=_adc+_ae4.length;
}
}
if(_ae1){
this._cachedLabelWidth=_ae1;
}
return _ae0;
},render:function(dim,_ae7){
if(!this.dirty){
return this;
}
var o=this.opt,ta=this.chart.theme.axis,_ae8=o.leftBottom,_ae9=o.rotation%360,_aea,stop,_aeb,_aec,_aed,_aee,_aef,_af0=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_af1=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_af2=this.chart.theme.getTick("major",o),_af3=_af2.length,_af4="stroke" in o?o.stroke:ta.stroke,size=_af0?g.normalizedLength(g.splitFontString(_af0).size):0;
if(_ae9<0){
_ae9+=360;
}
if(this.vertical){
_aea={y:dim.height-_ae7.b};
stop={y:_ae7.t};
_aeb={x:0,y:-1};
_aee={x:0,y:0};
_aec={x:1,y:0};
_aed={x:_adc,y:0};
switch(_ae9){
case 0:
_aef="end";
_aee.y=size*0.4;
break;
case 90:
_aef="middle";
_aee.x=-size;
break;
case 180:
_aef="start";
_aee.y=-size*0.4;
break;
case 270:
_aef="middle";
break;
default:
if(_ae9<_add){
_aef="end";
_aee.y=size*0.4;
}else{
if(_ae9<90){
_aef="end";
_aee.y=size*0.4;
}else{
if(_ae9<(180-_add)){
_aef="start";
}else{
if(_ae9<(180+_add)){
_aef="start";
_aee.y=-size*0.4;
}else{
if(_ae9<270){
_aef="start";
_aee.x=_ae8?0:size*0.4;
}else{
if(_ae9<(360-_add)){
_aef="end";
_aee.x=_ae8?0:size*0.4;
}else{
_aef="end";
_aee.y=size*0.4;
}
}
}
}
}
}
}
if(_ae8){
_aea.x=stop.x=_ae7.l;
_aec.x=-1;
_aed.x=-_aed.x;
}else{
_aea.x=stop.x=dim.width-_ae7.r;
switch(_aef){
case "start":
_aef="end";
break;
case "end":
_aef="start";
break;
case "middle":
_aee.x+=size;
break;
}
}
}else{
_aea={x:_ae7.l};
stop={x:dim.width-_ae7.r};
_aeb={x:1,y:0};
_aee={x:0,y:0};
_aec={x:0,y:1};
_aed={x:0,y:_adc};
switch(_ae9){
case 0:
_aef="middle";
_aee.y=size;
break;
case 90:
_aef="start";
_aee.x=-size*0.4;
break;
case 180:
_aef="middle";
break;
case 270:
_aef="end";
_aee.x=size*0.4;
break;
default:
if(_ae9<(90-_add)){
_aef="start";
_aee.y=_ae8?size:0;
}else{
if(_ae9<(90+_add)){
_aef="start";
_aee.x=-size*0.4;
}else{
if(_ae9<180){
_aef="start";
_aee.y=_ae8?0:-size;
}else{
if(_ae9<(270-_add)){
_aef="end";
_aee.y=_ae8?0:-size;
}else{
if(_ae9<(270+_add)){
_aef="end";
_aee.y=_ae8?size*0.4:0;
}else{
_aef="end";
_aee.y=_ae8?size:0;
}
}
}
}
}
}
if(_ae8){
_aea.y=stop.y=dim.height-_ae7.b;
}else{
_aea.y=stop.y=_ae7.t;
_aec.y=-1;
_aed.y=-_aed.y;
switch(_aef){
case "start":
_aef="end";
break;
case "end":
_aef="start";
break;
case "middle":
_aee.y-=size;
break;
}
}
}
this.cleanGroup();
try{
var s=this.group,c=this.scaler,t=this.ticks,_af5,f=lin.getTransformerFromModel(this.scaler),_af6=(dojox.gfx.renderer=="canvas"),_af7=_af6||!_ae9&&this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",dx=_aec.x*_af2.length,dy=_aec.y*_af2.length;
s.createLine({x1:_aea.x,y1:_aea.y,x2:stop.x,y2:stop.y}).setStroke(_af4);
dojo.forEach(this.labels,function(_af8){
var _af9=f(_af8.value),elem,x=_aea.x+_aeb.x*_af9,y=_aea.y+_aeb.y*_af9;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_af2);
if(_af8.text){
elem=dc.axis2d.common.createText[_af7](this.chart,s,x+dx+_aed.x+(_ae9?0:_aee.x),y+dy+_aed.y+(_ae9?0:_aee.y),_aef,_af8.text,_af0,_af1);
if(_af7=="html"){
this.htmlElements.push(elem);
}else{
if(_ae9){
elem.setTransform([{dx:_aee.x,dy:_aee.y},g.matrix.rotategAt(_ae9,x+dx+_aed.x,y+dy+_aed.y)]);
}
}
}
},this);
}
catch(e){
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.axis2d.Legend"]){
dojo._hasResource["insight.charting.axis2d.Legend"]=true;
dojo.provide("insight.charting.axis2d.Legend");
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_afa=4,_afb=45;
dojo.declare("insight.charting.axis2d.Legend",dojox.charting.axis2d.Base,{opt:null,dirty:true,offset:0,defaultParams:{vertical:false,leftBottom:true,htmlLabels:true,series:[]},optionalParams:{labels:[],maxLabelSize:0,font:"",fontColor:""},constructor:function(_afc,_afd){
this.opt=dojo.delegate(this.defaultParams,_afd);
du.updateWithPattern(this.opt,_afd,this.optionalParams);
},clear:function(){
this.dirty=true;
return this;
},initialized:function(){
return !this.dirty;
},getOffsets:function(){
var _afe={l:0,r:0,t:0,b:0},o=this.opt,_aff=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_b00=0,ta=this.chart.theme.axis,_b01=o.leftBottom,_b02=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_b02?g.normalizedLength(g.splitFontString(_b02).size):0;
if(size){
if(o.maxLabelSize){
_aff=o.maxLabelSize;
}else{
if(this.labels){
_aff=this._groupLabelWidth(this.labels,_b02);
}else{
_aff=0;
}
}
if(this.vertical){
_afe[_b01?"l":"r"]=_aff+_afa;
}else{
_afe[_b01?"b":"t"]=size+_afa;
_afe.l=_afe.r=_aff/2;
}
}
if(_aff){
this._cachedLabelWidth=_aff;
}
return _afe;
},render:function(dim,_b03){
if(!this.dirty){
return this;
}
var o=this.opt,ta=this.chart.theme.axis,_b04=o.leftBottom,_b05,stop,_b06,_b07,_b08,_b09,_b0a=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_b0b=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_b0c="stroke" in o?o.stroke:ta.stroke,size=_b0a?g.normalizedLength(g.splitFontString(_b0a).size):0;
if(this.vertical){
_b05={y:dim.height-_b03.b};
stop={y:_b03.t};
_b06={x:0,y:-1};
_b08={x:0,y:0};
_b07={x:_afa,y:0};
_b09="end";
_b08.y=size*0.4;
if(_b04){
_b05.x=stop.x=_b03.l;
_b07.x=-_b07.x;
}else{
_b05.x=stop.x=dim.width-_b03.r;
switch(_b09){
case "start":
_b09="end";
break;
case "end":
_b09="start";
break;
case "middle":
_b08.x+=size;
break;
}
}
}else{
_b05={x:_b03.l};
stop={x:dim.width-_b03.r};
_b06={x:1,y:0};
_b08={x:0,y:0};
_b07={x:0,y:_afa};
_b09="middle";
_b08.y=size;
if(_b04){
_b05.y=stop.y=dim.height-_b03.b;
}else{
_b05.y=stop.y=_b03.t;
_b07.y=-_b07.y;
switch(_b09){
case "start":
_b09="end";
break;
case "end":
_b09="start";
break;
case "middle":
_b08.y-=size;
break;
}
}
}
this.cleanGroup();
try{
var s=this.group,_b0d=(dojox.gfx.renderer=="canvas"),_b0e=_b0d||this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx";
dojo.forEach(o.series,function(_b0f,pos,arr){
var _b10=this.chart.series[this.chart.runs[_b0f]],_b11=s.createGroup(),_b12=_b11.createGroup(),_b13=_b10.label,elem,x,y,_b14=this._makeIcon(_b12,_b10),_b08={x:0,y:0},_b15={x:0,y:0};
if(pos===0){
_b09="start";
x=_b05.x;
y=_b05.y;
_b08.x+=_b14.w+2;
_b15.y-=_b14.h-2;
}else{
if(pos===arr.length-1){
_b09="end";
x=stop.x;
y=stop.y;
_b08.x-=_b14.w+2;
_b15.x-=_b14.w;
_b15.y-=_b14.h-2;
}else{
_b09="middle";
x=((stop.x-_b05.x)/(arr.length-1)*pos)+_b05.x;
y=((stop.y-_b05.y)/(arr.length-1)*pos)+_b05.y;
_b08.x+=(_b14.w/2)-2;
_b15.x-=(this._groupLabelWidth([_b13],_b0a)/2)+_b14.w;
_b15.y-=_b14.h-2;
}
}
_b12.setTransform([{dx:x+_b07.x+_b15.x,dy:y+_b07.y+_b15.y}]);
elem=dc.axis2d.common.createText[_b0e](this.chart,_b11,x+_b07.x+_b08.x,y+_b07.y+_b08.y,_b09,_b13,_b0a,_b0b);
if(_b0e=="html"){
this.htmlElements.push(elem);
}
},this);
}
catch(e){
}
this.dirty=false;
return this;
},_makeIcon:function(_b16,_b17){
var ta=this.chart.theme.axis,_b18=this.opt.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_b18?g.normalizedLength(g.splitFontString(_b18).size):0,mb={h:size,w:size},dyn=_b17.dyn;
if(dyn.fill){
_b16.createRect({x:2,y:2,width:mb.w-4,height:mb.h-4}).setFill(dyn.fill);
}else{
if(dyn.stroke||dyn.marker){
var line={x1:0,y1:mb.h/2,x2:mb.w,y2:mb.h/2};
if(dyn.stroke||dyn.bstroke){
_b16.createLine(line).setStroke(dyn.stroke||dyn.bstroke);
}
if(dyn.marker){
var c={x:mb.w/2,y:mb.h/2};
if(_b17.markerStroke){
_b16.createPath({path:"M"+c.x+" "+c.y+" "+dyn.marker}).setFill(_b17.markerStroke.color).setStroke(_b17.markerStroke);
}else{
if(dyn.stroke){
_b16.createPath({path:"M"+c.x+" "+c.y+" "+dyn.marker}).setFill(dyn.stroke.color).setStroke(dyn.stroke);
}else{
_b16.createPath({path:"M"+c.x+" "+c.y+" "+dyn.marker}).setFill(dyn.color).setStroke(dyn.color);
}
}
}
}else{
}
}
return {h:mb.h,w:mb.w};
},_groupLabelWidth:function(_b19,font){
if(!_b19.length){
return 0;
}
if(dojo.isObject(_b19[0])){
_b19=df.map(_b19,function(_b1a){
return _b1a.text;
});
}
var s=_b19.join("<br>");
return dojox.gfx._base._getTextBox(s,{font:font}).w||0;
}});
})();
}
if(!dojo._hasResource["dojox.charting.DataSeries"]){
dojo._hasResource["dojox.charting.DataSeries"]=true;
dojo.provide("dojox.charting.DataSeries");
dojo.declare("dojox.charting.DataSeries",null,{constructor:function(_b1b,_b1c,_b1d){
this.store=_b1b;
this.kwArgs=_b1c;
if(_b1d){
if(dojo.isFunction(_b1d)){
this.value=_b1d;
}else{
if(dojo.isObject(_b1d)){
this.value=dojo.hitch(this,"_dictValue",dojox.lang.functional.keys(_b1d),_b1d);
}else{
this.value=dojo.hitch(this,"_fieldValue",_b1d);
}
}
}else{
this.value=dojo.hitch(this,"_defaultValue");
}
this.data=[];
this._events=[];
if(this.store.getFeatures()["dojo.data.api.Notification"]){
this._events.push(dojo.connect(this.store,"onNew",this,"_onStoreNew"),dojo.connect(this.store,"onDelete",this,"_onStoreDelete"),dojo.connect(this.store,"onSet",this,"_onStoreSet"));
}
this.fetch();
},destroy:function(){
dojo.forEach(this._events,dojo.disconnect);
},setSeriesObject:function(_b1e){
this.series=_b1e;
},_dictValue:function(keys,dict,_b1f,item){
var o={};
dojo.forEach(keys,function(key){
o[key]=_b1f.getValue(item,dict[key]);
});
return o;
},_fieldValue:function(_b20,_b21,item){
return _b21.getValue(item,_b20);
},_defaultValue:function(_b22,item){
return _b22.getValue(item,"value");
},fetch:function(){
if(!this._inFlight){
this._inFlight=true;
var _b23=dojo.delegate(this.kwArgs);
_b23.onComplete=dojo.hitch(this,"_onFetchComplete");
_b23.onError=dojo.hitch(this,"onFetchError");
this.store.fetch(_b23);
}
},_onFetchComplete:function(_b24,_b25){
this.items=_b24;
this._buildItemMap();
this.data=dojo.map(this.items,function(item){
return this.value(this.store,item);
},this);
this._pushDataChanges();
this._inFlight=false;
},onFetchError:function(_b26,_b27){
this._inFlight=false;
},_buildItemMap:function(){
if(this.store.getFeatures()["dojo.data.api.Identity"]){
var _b28={};
dojo.forEach(this.items,function(item,_b29){
_b28[this.store.getIdentity(item)]=_b29;
},this);
this.itemMap=_b28;
}
},_pushDataChanges:function(){
if(this.series){
this.series.chart.updateSeries(this.series.name,this);
this.series.chart.delayedRender();
}
},_onStoreNew:function(){
this.fetch();
},_onStoreDelete:function(item){
if(this.items){
var flag=dojo.some(this.items,function(it,_b2a){
if(it===item){
this.items.splice(_b2a,1);
this._buildItemMap();
this.data.splice(_b2a,1);
return true;
}
return false;
},this);
if(flag){
this._pushDataChanges();
}
}
},_onStoreSet:function(item){
if(this.itemMap){
var id=this.store.getIdentity(item),_b2b=this.itemMap[id];
if(typeof _b2b=="number"){
this.data[_b2b]=this.value(this.store,this.items[_b2b]);
this._pushDataChanges();
}
}else{
if(this.items){
var flag=dojo.some(this.items,function(it,_b2c){
if(it===item){
this.data[_b2c]=this.value(this.store,it);
return true;
}
return false;
},this);
if(flag){
this._pushDataChanges();
}
}
}
}});
}
if(!dojo._hasResource["dojox.charting.axis2d.Default"]){
dojo._hasResource["dojox.charting.axis2d.Default"]=true;
dojo.provide("dojox.charting.axis2d.Default");
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_b2d=4,_b2e=45;
dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Invisible,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,rotation:0,htmlLabels:true},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null,stroke:{},majorTick:{},minorTick:{},microTick:{},tick:{},font:"",fontColor:"",title:"",titleGap:0,titleFont:"",titleFontColor:"",titleOrientation:""},constructor:function(_b2f,_b30){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_b30);
du.updateWithPattern(this.opt,_b30,this.optionalParams);
},getOffsets:function(){
var s=this.scaler,_b31={l:0,r:0,t:0,b:0};
if(!s){
return _b31;
}
var o=this.opt,_b32=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_b33=0,ma=s.major,mi=s.minor,ta=this.chart.theme.axis,_b34=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_b35=o.titleFont||(ta.tick&&ta.tick.titleFont),_b36=(o.titleGap==0)?0:o.titleGap||(ta.tick&&ta.tick.titleGap)||15,_b37=this.chart.theme.getTick("major",o),_b38=this.chart.theme.getTick("minor",o),size=_b34?g.normalizedLength(g.splitFontString(_b34).size):0,_b39=_b35?g.normalizedLength(g.splitFontString(_b35).size):0,_b3a=o.rotation%360,_b3b=o.leftBottom,cosr=Math.abs(Math.cos(_b3a*Math.PI/180)),sinr=Math.abs(Math.sin(_b3a*Math.PI/180));
this.trailingSymbol=(o.trailingSymbol===undefined||o.trailingSymbol===null)?this.trailingSymbol:o.trailingSymbol;
if(_b3a<0){
_b3a+=360;
}
if(size){
if(this.labels){
_b32=this._groupLabelWidth(this.labels,_b34,o.maxLabelCharCount);
}else{
_b32=this._groupLabelWidth([gl(ma.start,ma.prec,o),gl(ma.start+ma.count*ma.tick,ma.prec,o),gl(mi.start,mi.prec,o),gl(mi.start+mi.count*mi.tick,mi.prec,o)],_b34,o.maxLabelCharCount);
}
_b32=o.maxLabelSize?Math.min(o.maxLabelSize,_b32):_b32;
if(this.vertical){
var side=_b3b?"l":"r";
switch(_b3a){
case 0:
case 180:
_b31[side]=_b32;
_b31.t=_b31.b=size/2;
break;
case 90:
case 270:
_b31[side]=size;
_b31.t=_b31.b=_b32/2;
break;
default:
if(_b3a<=_b2e||(180<_b3a&&_b3a<=(180+_b2e))){
_b31[side]=size*sinr/2+_b32*cosr;
_b31[_b3b?"t":"b"]=size*cosr/2+_b32*sinr;
_b31[_b3b?"b":"t"]=size*cosr/2;
}else{
if(_b3a>(360-_b2e)||(180>_b3a&&_b3a>(180-_b2e))){
_b31[side]=size*sinr/2+_b32*cosr;
_b31[_b3b?"b":"t"]=size*cosr/2+_b32*sinr;
_b31[_b3b?"t":"b"]=size*cosr/2;
}else{
if(_b3a<90||(180<_b3a&&_b3a<270)){
_b31[side]=size*sinr+_b32*cosr;
_b31[_b3b?"t":"b"]=size*cosr+_b32*sinr;
}else{
_b31[side]=size*sinr+_b32*cosr;
_b31[_b3b?"b":"t"]=size*cosr+_b32*sinr;
}
}
}
break;
}
_b31[side]+=_b2d+Math.max(_b37.length,_b38.length)+(o.title?(_b39+_b36):0);
}else{
var side=_b3b?"b":"t";
switch(_b3a){
case 0:
case 180:
_b31[side]=size;
_b31.l=_b31.r=_b32/2;
break;
case 90:
case 270:
_b31[side]=_b32;
_b31.l=_b31.r=size/2;
break;
default:
if((90-_b2e)<=_b3a&&_b3a<=90||(270-_b2e)<=_b3a&&_b3a<=270){
_b31[side]=size*sinr/2+_b32*cosr;
_b31[_b3b?"r":"l"]=size*cosr/2+_b32*sinr;
_b31[_b3b?"l":"r"]=size*cosr/2;
}else{
if(90<=_b3a&&_b3a<=(90+_b2e)||270<=_b3a&&_b3a<=(270+_b2e)){
_b31[side]=size*sinr/2+_b32*cosr;
_b31[_b3b?"l":"r"]=size*cosr/2+_b32*sinr;
_b31[_b3b?"r":"l"]=size*cosr/2;
}else{
if(_b3a<_b2e||(180<_b3a&&_b3a<(180-_b2e))){
_b31[side]=size*sinr+_b32*cosr;
_b31[_b3b?"r":"l"]=size*cosr+_b32*sinr;
}else{
_b31[side]=size*sinr+_b32*cosr;
_b31[_b3b?"l":"r"]=size*cosr+_b32*sinr;
}
}
}
break;
}
_b31[side]+=_b2d+Math.max(_b37.length,_b38.length)+(o.title?(_b39+_b36):0);
}
}
if(_b32){
this._cachedLabelWidth=_b32;
}
return _b31;
},render:function(dim,_b3c){
if(!this.dirty){
return this;
}
var o=this.opt,ta=this.chart.theme.axis,_b3d=o.leftBottom,_b3e=o.rotation%360,_b3f,stop,_b40,_b41=0,_b42,_b43,_b44,_b45,_b46,_b47,_b48=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_b49=o.titleFont||(ta.tick&&ta.tick.titleFont),_b4a=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_b4b=o.titleFontColor||(ta.tick&&ta.tick.titleFontColor)||"black",_b4c=(o.titleGap==0)?0:o.titleGap||(ta.tick&&ta.tick.titleGap)||15,_b4d=o.titleOrientation||(ta.tick&&ta.tick.titleOrientation)||"axis",_b4e=this.chart.theme.getTick("major",o),_b4f=this.chart.theme.getTick("minor",o),_b50=this.chart.theme.getTick("micro",o),_b51=Math.max(_b4e.length,_b4f.length,_b50.length),_b52="stroke" in o?o.stroke:ta.stroke,size=_b48?g.normalizedLength(g.splitFontString(_b48).size):0,cosr=Math.abs(Math.cos(_b3e*Math.PI/180)),sinr=Math.abs(Math.sin(_b3e*Math.PI/180)),_b53=_b49?g.normalizedLength(g.splitFontString(_b49).size):0;
if(_b3e<0){
_b3e+=360;
}
if(this.vertical){
_b3f={y:dim.height-_b3c.b};
stop={y:_b3c.t};
_b40={y:(dim.height-_b3c.b+_b3c.t)/2};
_b42=size*sinr+(this._cachedLabelWidth||0)*cosr+_b2d+Math.max(_b4e.length,_b4f.length)+_b53+_b4c;
_b43={x:0,y:-1};
_b46={x:0,y:0};
_b44={x:1,y:0};
_b45={x:_b2d,y:0};
switch(_b3e){
case 0:
_b47="end";
_b46.y=size*0.4;
break;
case 90:
_b47="middle";
_b46.x=-size;
break;
case 180:
_b47="start";
_b46.y=-size*0.4;
break;
case 270:
_b47="middle";
break;
default:
if(_b3e<_b2e){
_b47="end";
_b46.y=size*0.4;
}else{
if(_b3e<90){
_b47="end";
_b46.y=size*0.4;
}else{
if(_b3e<(180-_b2e)){
_b47="start";
}else{
if(_b3e<(180+_b2e)){
_b47="start";
_b46.y=-size*0.4;
}else{
if(_b3e<270){
_b47="start";
_b46.x=_b3d?0:size*0.4;
}else{
if(_b3e<(360-_b2e)){
_b47="end";
_b46.x=_b3d?0:size*0.4;
}else{
_b47="end";
_b46.y=size*0.4;
}
}
}
}
}
}
}
if(_b3d){
_b3f.x=stop.x=_b3c.l;
_b41=(_b4d&&_b4d=="away")?90:270;
_b40.x=_b3c.l-_b42+(_b41==270?_b53:0);
_b44.x=-1;
_b45.x=-_b45.x;
}else{
_b3f.x=stop.x=dim.width-_b3c.r;
_b41=(_b4d&&_b4d=="axis")?90:270;
_b40.x=dim.width-_b3c.r+_b42-(_b41==270?0:_b53);
switch(_b47){
case "start":
_b47="end";
break;
case "end":
_b47="start";
break;
case "middle":
_b46.x+=size;
break;
}
}
}else{
_b3f={x:_b3c.l};
stop={x:dim.width-_b3c.r};
_b40={x:(dim.width-_b3c.r+_b3c.l)/2};
_b42=size*cosr+(this._cachedLabelWidth||0)*sinr+_b2d+Math.max(_b4e.length,_b4f.length)+_b53+_b4c;
_b43={x:1,y:0};
_b46={x:0,y:0};
_b44={x:0,y:1};
_b45={x:0,y:_b2d};
switch(_b3e){
case 0:
_b47="middle";
_b46.y=size;
break;
case 90:
_b47="start";
_b46.x=-size*0.4;
break;
case 180:
_b47="middle";
break;
case 270:
_b47="end";
_b46.x=size*0.4;
break;
default:
if(_b3e<(90-_b2e)){
_b47="start";
_b46.y=_b3d?size:0;
}else{
if(_b3e<(90+_b2e)){
_b47="start";
_b46.x=-size*0.4;
}else{
if(_b3e<180){
_b47="start";
_b46.y=_b3d?0:-size;
}else{
if(_b3e<(270-_b2e)){
_b47="end";
_b46.y=_b3d?0:-size;
}else{
if(_b3e<(270+_b2e)){
_b47="end";
_b46.y=_b3d?size*0.4:0;
}else{
_b47="end";
_b46.y=_b3d?size:0;
}
}
}
}
}
}
if(_b3d){
_b3f.y=stop.y=dim.height-_b3c.b;
_b41=(_b4d&&_b4d=="axis")?180:0;
_b40.y=dim.height-_b3c.b+_b42-(_b41?_b53:0);
}else{
_b3f.y=stop.y=_b3c.t;
_b41=(_b4d&&_b4d=="away")?180:0;
_b40.y=_b3c.t-_b42+(_b41?0:_b53);
_b44.y=-1;
_b45.y=-_b45.y;
switch(_b47){
case "start":
_b47="end";
break;
case "end":
_b47="start";
break;
case "middle":
_b46.y-=size;
break;
}
}
}
this.cleanGroup();
try{
var s=this.group,c=this.scaler,t=this.ticks,_b54,f=lin.getTransformerFromModel(this.scaler),_b55=!_b41&&!_b3e&&this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",dx=_b44.x*_b4e.length,dy=_b44.y*_b4e.length;
s.createLine({x1:_b3f.x,y1:_b3f.y,x2:stop.x,y2:stop.y}).setStroke(_b52);
if(o.title){
var _b56=dc.axis2d.common.createText[_b55](this.chart,s,_b40.x,_b40.y,"middle",o.title,_b49,_b4b);
if(_b55=="html"){
this.htmlElements.push(_b56);
}else{
_b56.setTransform(g.matrix.rotategAt(_b41,_b40.x,_b40.y));
}
}
dojo.forEach(t.major,function(tick){
var _b57=f(tick.value),elem,x=_b3f.x+_b43.x*_b57,y=_b3f.y+_b43.y*_b57;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_b4e);
if(tick.label){
var _b58=o.maxLabelCharCount?this.getTextWithLimitCharCount(tick.label,_b48,o.maxLabelCharCount):{text:tick.label,truncated:false};
_b58=o.maxLabelSize?this.getTextWithLimitLength(_b58.text,_b48,o.maxLabelSize,_b58.truncated):_b58;
elem=dc.axis2d.common.createText[_b55](this.chart,s,x+dx+_b45.x+(_b3e?0:_b46.x),y+dy+_b45.y+(_b3e?0:_b46.y),_b47,_b58.text,_b48,_b4a);
_b58.truncated&&this.labelTooltip(elem,this.chart,tick.label,_b58.text,_b48,_b55);
if(_b55=="html"){
this.htmlElements.push(elem);
}else{
if(_b3e){
elem.setTransform([{dx:_b46.x,dy:_b46.y},g.matrix.rotategAt(_b3e,x+dx+_b45.x,y+dy+_b45.y)]);
}
}
}
},this);
dx=_b44.x*_b4f.length;
dy=_b44.y*_b4f.length;
_b54=c.minMinorStep<=c.minor.tick*c.bounds.scale;
dojo.forEach(t.minor,function(tick){
var _b59=f(tick.value),elem,x=_b3f.x+_b43.x*_b59,y=_b3f.y+_b43.y*_b59;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_b4f);
if(_b54&&tick.label){
var _b5a=o.maxLabelCharCount?this.getTextWithLimitCharCount(tick.label,_b48,o.maxLabelCharCount):{text:tick.label,truncated:false};
_b5a=o.maxLabelSize?this.getTextWithLimitLength(_b5a.text,_b48,o.maxLabelSize,_b5a.truncated):_b5a;
elem=dc.axis2d.common.createText[_b55](this.chart,s,x+dx+_b45.x+(_b3e?0:_b46.x),y+dy+_b45.y+(_b3e?0:_b46.y),_b47,_b5a.text,_b48,_b4a);
_b5a.truncated&&this.labelTooltip(elem,this.chart,tick.label,_b5a.text,_b48,_b55);
if(_b55=="html"){
this.htmlElements.push(elem);
}else{
if(_b3e){
elem.setTransform([{dx:_b46.x,dy:_b46.y},g.matrix.rotategAt(_b3e,x+dx+_b45.x,y+dy+_b45.y)]);
}
}
}
},this);
dx=_b44.x*_b50.length;
dy=_b44.y*_b50.length;
dojo.forEach(t.micro,function(tick){
var _b5b=f(tick.value),elem,x=_b3f.x+_b43.x*_b5b,y=_b3f.y+_b43.y*_b5b;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_b50);
},this);
}
catch(e){
}
this.dirty=false;
return this;
},labelTooltip:function(elem,_b5c,_b5d,_b5e,font,_b5f){
if(!dijit||!dijit.Tooltip){
return;
}
var _b60={type:"rect"},_b61=["above","below"],_b62=dojox.gfx._base._getTextBox(_b5e,{font:font}).w||0;
fontHeight=font?g.normalizedLength(g.splitFontString(font).size):0;
if(_b5f=="html"){
dojo.mixin(_b60,dojo.coords(elem.firstChild,true));
_b60.width=Math.ceil(_b62);
_b60.height=Math.ceil(fontHeight);
this._events.push({shape:dojo,handle:dojo.connect(elem.firstChild,"onmouseover",this,function(e){
dijit.showTooltip(_b5d,_b60,_b61);
})});
this._events.push({shape:dojo,handle:dojo.connect(elem.firstChild,"onmouseout",this,function(e){
dijit.hideTooltip(_b60);
})});
}else{
var shp=elem.getShape(),lt=dojo.coords(_b5c.node,true);
_b60=dojo.mixin(_b60,{x:shp.x-_b62/2,y:shp.y});
_b60.x+=lt.x;
_b60.y+=lt.y;
_b60.x=Math.round(_b60.x);
_b60.y=Math.round(_b60.y);
_b60.width=Math.ceil(_b62);
_b60.height=Math.ceil(fontHeight);
this._events.push({shape:elem,handle:elem.connect("onmouseenter",this,function(e){
dijit.showTooltip(_b5d,_b60,_b61);
})});
this._events.push({shape:elem,handle:elem.connect("onmouseleave",this,function(e){
dijit.hideTooltip(_b60);
})});
}
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Markers"]){
dojo._hasResource["dojox.charting.plot2d.Markers"]=true;
dojo.provide("dojox.charting.plot2d.Markers");
dojo.declare("dojox.charting.plot2d.Markers",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.markers=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.MarkersOnly"]){
dojo._hasResource["dojox.charting.plot2d.MarkersOnly"]=true;
dojo.provide("dojox.charting.plot2d.MarkersOnly");
dojo.declare("dojox.charting.plot2d.MarkersOnly",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=false;
this.opt.markers=true;
}});
}
if(!dojo._hasResource["dojox.gfx.gradutils"]){
dojo._hasResource["dojox.gfx.gradutils"]=true;
dojo.provide("dojox.gfx.gradutils");
(function(){
var d=dojo,m=dojox.gfx.matrix,C=d.Color;
function _b63(o,c){
if(o<=0){
return c[0].color;
}
var len=c.length;
if(o>=1){
return c[len-1].color;
}
for(var i=0;i<len;++i){
var stop=c[i];
if(stop.offset>=o){
if(i){
var prev=c[i-1];
return d.blendColors(new C(prev.color),new C(stop.color),(o-prev.offset)/(stop.offset-prev.offset));
}
return stop.color;
}
}
return c[len-1].color;
};
dojox.gfx.gradutils.getColor=function(fill,pt){
var o;
if(fill){
switch(fill.type){
case "linear":
var _b64=Math.atan2(fill.y2-fill.y1,fill.x2-fill.x1),_b65=m.rotate(-_b64),_b66=m.project(fill.x2-fill.x1,fill.y2-fill.y1),p=m.multiplyPoint(_b66,pt),pf1=m.multiplyPoint(_b66,fill.x1,fill.y1),pf2=m.multiplyPoint(_b66,fill.x2,fill.y2),_b67=m.multiplyPoint(_b65,pf2.x-pf1.x,pf2.y-pf1.y).x,o=m.multiplyPoint(_b65,p.x-pf1.x,p.y-pf1.y).x/_b67;
break;
case "radial":
var dx=pt.x-fill.cx,dy=pt.y-fill.cy,o=Math.sqrt(dx*dx+dy*dy)/fill.r;
break;
}
return _b63(o,fill.colors);
}
return new C(fill||[0,0,0,0]);
};
dojox.gfx.gradutils.reverse=function(fill){
if(fill){
switch(fill.type){
case "linear":
case "radial":
fill=dojo.delegate(fill);
if(fill.colors){
var c=fill.colors,l=c.length,i=0,stop,n=fill.colors=new Array(c.length);
for(;i<l;++i){
stop=c[i];
n[i]={offset:1-stop.offset,color:stop.color};
}
n.sort(function(a,b){
return a.offset-b.offset;
});
}
break;
}
}
return fill;
};
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Scatter"]){
dojo._hasResource["dojox.charting.plot2d.Scatter"]=true;
dojo.provide("dojox.charting.plot2d.Scatter");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_b68=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Scatter",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",shadows:null,animate:null},optionalParams:{markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(_b69,_b6a){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_b6a);
du.updateWithPattern(this.opt,_b6a,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_b6b){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_b6b);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_b68);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_b6c=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
var _b6d=t.next("marker",[this.opt,run]),s=run.group,_b6e,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler);
if(typeof run.data[0]=="number"){
_b6e=dojo.map(run.data,function(v,i){
return {x:ht(i+1)+_b6b.l,y:dim.height-_b6b.b-vt(v)};
},this);
}else{
_b6e=dojo.map(run.data,function(v,i){
return {x:ht(v.x)+_b6b.l,y:dim.height-_b6b.b-vt(v.y)};
},this);
}
var _b6f=new Array(_b6e.length),_b70=new Array(_b6e.length),_b71=new Array(_b6e.length);
dojo.forEach(_b6e,function(c,i){
var _b72=typeof run.data[i]=="number"?t.post(_b6d,"marker"):t.addMixin(_b6d,"marker",run.data[i],true),path="M"+c.x+" "+c.y+" "+_b72.symbol;
if(_b72.marker.shadow){
_b6f[i]=s.createPath("M"+(c.x+_b72.marker.shadow.dx)+" "+(c.y+_b72.marker.shadow.dy)+" "+_b72.symbol).setStroke(_b72.marker.shadow).setFill(_b72.marker.shadow.color);
if(this.animate){
this._animateScatter(_b6f[i],dim.height-_b6b.b);
}
}
if(_b72.marker.outline){
var _b73=dc.makeStroke(_b72.marker.outline);
_b73.width=2*_b73.width+_b72.marker.stroke.width;
_b71[i]=s.createPath(path).setStroke(_b73);
if(this.animate){
this._animateScatter(_b71[i],dim.height-_b6b.b);
}
}
var _b74=dc.makeStroke(_b72.marker.stroke),fill=this._plotFill(_b72.marker.fill,dim,_b6b);
if(fill&&(fill.type==="linear"||fill.type=="radial")){
var _b75=dojox.gfx.gradutils.getColor(fill,{x:c.x,y:c.y});
if(_b74){
_b74.color=_b75;
}
_b70[i]=s.createPath(path).setStroke(_b74).setFill(_b75);
}else{
_b70[i]=s.createPath(path).setStroke(_b74).setFill(fill);
}
if(this.animate){
this._animateScatter(_b70[i],dim.height-_b6b.b);
}
},this);
if(_b70.length){
run.dyn.stroke=_b70[_b70.length-1].getStroke();
run.dyn.fill=_b70[_b70.length-1].getFill();
}
if(_b6c){
var _b76=new Array(_b70.length);
dojo.forEach(_b70,function(s,i){
var o={element:"marker",index:i,run:run,shape:s,outline:_b71&&_b71[i]||null,shadow:_b6f&&_b6f[i]||null,cx:_b6e[i].x,cy:_b6e[i].y};
if(typeof run.data[0]=="number"){
o.x=i+1;
o.y=run.data[i];
}else{
o.x=run.data[i].x;
o.y=run.data[i].y;
}
this._connectEvents(o);
_b76[i]=o;
},this);
this._eventSeries[run.name]=_b76;
}else{
delete this._eventSeries[run.name];
}
run.dirty=false;
}
this.dirty=false;
return this;
},_animateScatter:function(_b77,_b78){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_b77,duration:1200,transform:[{name:"translate",start:[0,_b78],end:[0,0]},{name:"scale",start:[0,0],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.sequence"]){
dojo._hasResource["dojox.lang.functional.sequence"]=true;
dojo.provide("dojox.lang.functional.sequence");
(function(){
var d=dojo,df=dojox.lang.functional;
d.mixin(df,{repeat:function(n,f,z,o){
o=o||d.global;
f=df.lambda(f);
var t=new Array(n),i=1;
t[0]=z;
for(;i<n;t[i]=z=f.call(o,z),++i){
}
return t;
},until:function(pr,f,z,o){
o=o||d.global;
f=df.lambda(f);
pr=df.lambda(pr);
var t=[];
for(;!pr.call(o,z);t.push(z),z=f.call(o,z)){
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Stacked"]){
dojo._hasResource["dojox.charting.plot2d.Stacked"]=true;
dojo.provide("dojox.charting.plot2d.Stacked");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_b79=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{getSeriesStats:function(){
var _b7a=dc.collectStackedStats(this.series);
this._maxRunLength=_b7a.hmax;
return _b7a;
},render:function(dim,_b7b){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_b7b);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_b79);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_b7c=this.events(),ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler);
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _b7d=t.next(this.opt.areas?"area":"line",[this.opt,run],true),s=run.group,_b7e,_b7f=dojo.map(acc,function(v,i){
return {x:ht(i+1)+_b7b.l,y:dim.height-_b7b.b-vt(v)};
},this);
var _b80=this.opt.tension?dc.curve(_b7f,this.opt.tension):"";
if(this.opt.areas){
var _b81=dojo.clone(_b7f);
if(this.opt.tension){
var p=dc.curve(_b81,this.opt.tension);
p+=" L"+_b7f[_b7f.length-1].x+","+(dim.height-_b7b.b)+" L"+_b7f[0].x+","+(dim.height-_b7b.b)+" L"+_b7f[0].x+","+_b7f[0].y;
run.dyn.fill=s.createPath(p).setFill(_b7d.series.fill).getFill();
}else{
_b81.push({x:_b7f[_b7f.length-1].x,y:dim.height-_b7b.b});
_b81.push({x:_b7f[0].x,y:dim.height-_b7b.b});
_b81.push(_b7f[0]);
run.dyn.fill=s.createPolyline(_b81).setFill(_b7d.series.fill).getFill();
}
}
if(this.opt.lines||this.opt.markers){
if(_b7d.series.outline){
_b7e=dc.makeStroke(_b7d.series.outline);
_b7e.width=2*_b7e.width+_b7d.series.stroke.width;
}
}
if(this.opt.markers){
run.dyn.marker=_b7d.symbol;
}
var _b82,_b83,_b84;
if(_b7d.series.shadow&&_b7d.series.stroke){
var _b85=_b7d.series.shadow,_b86=dojo.map(_b7f,function(c){
return {x:c.x+_b85.dx,y:c.y+_b85.dy};
});
if(this.opt.lines){
if(this.opt.tension){
run.dyn.shadow=s.createPath(dc.curve(_b86,this.opt.tension)).setStroke(_b85).getStroke();
}else{
run.dyn.shadow=s.createPolyline(_b86).setStroke(_b85).getStroke();
}
}
if(this.opt.markers){
_b85=_b7d.marker.shadow;
_b84=dojo.map(_b86,function(c){
return s.createPath("M"+c.x+" "+c.y+" "+_b7d.symbol).setStroke(_b85).setFill(_b85.color);
},this);
}
}
if(this.opt.lines){
if(_b7e){
if(this.opt.tension){
run.dyn.outline=s.createPath(_b80).setStroke(_b7e).getStroke();
}else{
run.dyn.outline=s.createPolyline(_b7f).setStroke(_b7e).getStroke();
}
}
if(this.opt.tension){
run.dyn.stroke=s.createPath(_b80).setStroke(_b7d.series.stroke).getStroke();
}else{
run.dyn.stroke=s.createPolyline(_b7f).setStroke(_b7d.series.stroke).getStroke();
}
}
if(this.opt.markers){
_b82=new Array(_b7f.length);
_b83=new Array(_b7f.length);
_b7e=null;
if(_b7d.marker.outline){
_b7e=dc.makeStroke(_b7d.marker.outline);
_b7e.width=2*_b7e.width+(_b7d.marker.stroke?_b7d.marker.stroke.width:0);
}
dojo.forEach(_b7f,function(c,i){
var path="M"+c.x+" "+c.y+" "+_b7d.symbol;
if(_b7e){
_b83[i]=s.createPath(path).setStroke(_b7e);
}
_b82[i]=s.createPath(path).setStroke(_b7d.marker.stroke).setFill(_b7d.marker.fill);
},this);
if(_b7c){
var _b87=new Array(_b82.length);
dojo.forEach(_b82,function(s,i){
var o={element:"marker",index:i,run:run,shape:s,outline:_b83[i]||null,shadow:_b84&&_b84[i]||null,cx:_b7f[i].x,cy:_b7f[i].y,x:i+1,y:run.data[i]};
this._connectEvents(o);
_b87[i]=o;
},this);
this._eventSeries[run.name]=_b87;
}else{
delete this._eventSeries[run.name];
}
}
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedLines"]){
dojo._hasResource["dojox.charting.plot2d.StackedLines"]=true;
dojo.provide("dojox.charting.plot2d.StackedLines");
dojo.declare("dojox.charting.plot2d.StackedLines",dojox.charting.plot2d.Stacked,{constructor:function(){
this.opt.lines=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedAreas"]){
dojo._hasResource["dojox.charting.plot2d.StackedAreas"]=true;
dojo.provide("dojox.charting.plot2d.StackedAreas");
dojo.declare("dojox.charting.plot2d.StackedAreas",dojox.charting.plot2d.Stacked,{constructor:function(){
this.opt.lines=true;
this.opt.areas=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Columns"]){
dojo._hasResource["dojox.charting.plot2d.Columns"]=true;
dojo.provide("dojox.charting.plot2d.Columns");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_b88=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_b89,_b8a){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_b8a);
du.updateWithPattern(this.opt,_b8a,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
var _b8b=dc.collectSimpleStats(this.series);
_b8b.hmin-=0.5;
_b8b.hmax+=0.5;
return _b8b;
},render:function(dim,_b8c){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_b8c);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_b88);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_b8d,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_b8e=Math.max(0,this._vScaler.bounds.lower),_b8f=vt(_b8e),_b90=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_b8d=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _b91=t.next("column",[this.opt,run]),s=run.group,_b92=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _b93=run.data[j];
if(_b93!==null){
var v=typeof _b93=="number"?_b93:_b93.y,vv=vt(v),_b94=vv-_b8f,h=Math.abs(_b94),_b95=typeof _b93!="number"?t.addMixin(_b91,"column",_b93,true):t.post(_b91,"column");
if(_b8d>=1&&h>=1){
var rect={x:_b8c.l+ht(j+0.5)+gap,y:dim.height-_b8c.b-(v>_b8e?vv:_b8f),width:_b8d,height:h};
var _b96=this._plotFill(_b95.series.fill,dim,_b8c);
_b96=this._shapeFill(_b96,rect);
var _b97=s.createRect(rect).setFill(_b96).setStroke(_b95.series.stroke);
run.dyn.fill=_b97.getFill();
run.dyn.stroke=_b97.getStroke();
if(_b90){
var o={element:"column",index:j,run:run,shape:_b97,x:j+0.5,y:v};
this._connectEvents(o);
_b92[j]=o;
}
if(this.animate){
this._animateColumn(_b97,dim.height-_b8c.b-_b8f,h);
}
}
}
}
this._eventSeries[run.name]=_b92;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateColumn:function(_b98,_b99,_b9a){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_b98,duration:1200,transform:[{name:"translate",start:[0,_b99-(_b99/_b9a)],end:[0,0]},{name:"scale",start:[1,1/_b9a],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedColumns"]){
dojo._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
dojo.provide("dojox.charting.plot2d.StackedColumns");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_b9b=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{getSeriesStats:function(){
var _b9c=dc.collectStackedStats(this.series);
this._maxRunLength=_b9c.hmax;
_b9c.hmin-=0.5;
_b9c.hmax+=0.5;
return _b9c;
},render:function(dim,_b9d){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var _b9e=run.data[j];
if(_b9e!==null){
var v=typeof _b9e=="number"?_b9e:_b9e.y;
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_b9d);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_b9b);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_b9f,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_ba0=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_b9f=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _ba1=t.next("column",[this.opt,run]),s=run.group,_ba2=new Array(acc.length);
for(var j=0;j<acc.length;++j){
var _b9e=run.data[j];
if(_b9e!==null){
var v=acc[j],_ba3=vt(v),_ba4=typeof _b9e!="number"?t.addMixin(_ba1,"column",_b9e,true):t.post(_ba1,"column");
if(_b9f>=1&&_ba3>=1){
var rect={x:_b9d.l+ht(j+0.5)+gap,y:dim.height-_b9d.b-vt(v),width:_b9f,height:_ba3};
var _ba5=this._plotFill(_ba4.series.fill,dim,_b9d);
_ba5=this._shapeFill(_ba5,rect);
var _ba6=s.createRect(rect).setFill(_ba5).setStroke(_ba4.series.stroke);
run.dyn.fill=_ba6.getFill();
run.dyn.stroke=_ba6.getStroke();
if(_ba0){
var o={element:"column",index:j,run:run,shape:_ba6,x:j+0.5,y:v};
this._connectEvents(o);
_ba2[j]=o;
}
if(this.animate){
this._animateColumn(_ba6,dim.height-_b9d.b,_ba3);
}
}
}
}
this._eventSeries[run.name]=_ba2;
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var _b9e=run.data[j];
if(_b9e!==null){
var v=typeof _b9e=="number"?_b9e:_b9e.y;
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]){
dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredColumns");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_ba7=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(dim,_ba8){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_ba8);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_ba7);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_ba9,_baa,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_bab=Math.max(0,this._vScaler.bounds.lower),_bac=vt(_bab),_bad=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt,this.series.length);
gap=f.gap;
_ba9=_baa=f.size;
for(var i=0;i<this.series.length;++i){
var run=this.series[i],_bae=_baa*i;
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _baf=t.next("column",[this.opt,run]),s=run.group,_bb0=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _bb1=run.data[j];
if(_bb1!==null){
var v=typeof _bb1=="number"?_bb1:_bb1.y,vv=vt(v),_bb2=vv-_bac,h=Math.abs(_bb2),_bb3=typeof _bb1!="number"?t.addMixin(_baf,"column",_bb1,true):t.post(_baf,"column");
if(_ba9>=1&&h>=1){
var rect={x:_ba8.l+ht(j+0.5)+gap+_bae,y:dim.height-_ba8.b-(v>_bab?vv:_bac),width:_ba9,height:h};
var _bb4=this._plotFill(_bb3.series.fill,dim,_ba8);
_bb4=this._shapeFill(_bb4,rect);
var _bb5=s.createRect(rect).setFill(_bb4).setStroke(_bb3.series.stroke);
run.dyn.fill=_bb5.getFill();
run.dyn.stroke=_bb5.getStroke();
if(_bad){
var o={element:"column",index:j,run:run,shape:_bb5,x:j+0.5,y:v};
this._connectEvents(o);
_bb0[j]=o;
}
if(this.animate){
this._animateColumn(_bb5,dim.height-_ba8.b-_bac,h);
}
}
}
}
this._eventSeries[run.name]=_bb0;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Bars"]){
dojo._hasResource["dojox.charting.plot2d.Bars"]=true;
dojo.provide("dojox.charting.plot2d.Bars");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_bb6=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_bb7,_bb8){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_bb8);
du.updateWithPattern(this.opt,_bb8,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
var _bb9=dc.collectSimpleStats(this.series),t;
_bb9.hmin-=0.5;
_bb9.hmax+=0.5;
t=_bb9.hmin,_bb9.hmin=_bb9.vmin,_bb9.vmin=t;
t=_bb9.hmax,_bb9.hmax=_bb9.vmax,_bb9.vmax=t;
return _bb9;
},render:function(dim,_bba){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_bba);
}
this.dirty=this.isDirty();
this.resetEvents();
if(this.dirty){
dojo.forEach(this.series,_bb6);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_bbb,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_bbc=Math.max(0,this._hScaler.bounds.lower),_bbd=ht(_bbc),_bbe=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt);
gap=f.gap;
_bbb=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _bbf=t.next("bar",[this.opt,run]),s=run.group,_bc0=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _bc1=run.data[j];
if(_bc1!==null){
var v=typeof _bc1=="number"?_bc1:_bc1.y,hv=ht(v),_bc2=hv-_bbd,w=Math.abs(_bc2),_bc3=typeof _bc1!="number"?t.addMixin(_bbf,"bar",_bc1,true):t.post(_bbf,"bar");
if(w>=1&&_bbb>=1){
var rect={x:_bba.l+(v<_bbc?hv:_bbd),y:dim.height-_bba.b-vt(j+1.5)+gap,width:w,height:_bbb};
var _bc4=this._plotFill(_bc3.series.fill,dim,_bba);
_bc4=this._shapeFill(_bc4,rect);
var _bc5=s.createRect(rect).setFill(_bc4).setStroke(_bc3.series.stroke);
run.dyn.fill=_bc5.getFill();
run.dyn.stroke=_bc5.getStroke();
if(_bbe){
var o={element:"bar",index:j,run:run,shape:_bc5,x:v,y:j+1.5};
this._connectEvents(o);
_bc0[j]=o;
}
if(this.animate){
this._animateBar(_bc5,_bba.l+_bbd,-w);
}
}
}
}
this._eventSeries[run.name]=_bc0;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateBar:function(_bc6,_bc7,_bc8){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_bc6,duration:1200,transform:[{name:"translate",start:[_bc7-(_bc7/_bc8),0],end:[0,0]},{name:"scale",start:[1/_bc8,1],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedBars"]){
dojo._hasResource["dojox.charting.plot2d.StackedBars"]=true;
dojo.provide("dojox.charting.plot2d.StackedBars");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_bc9=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedBars",dojox.charting.plot2d.Bars,{getSeriesStats:function(){
var _bca=dc.collectStackedStats(this.series),t;
this._maxRunLength=_bca.hmax;
_bca.hmin-=0.5;
_bca.hmax+=0.5;
t=_bca.hmin,_bca.hmin=_bca.vmin,_bca.vmin=t;
t=_bca.hmax,_bca.hmax=_bca.vmax,_bca.vmax=t;
return _bca;
},render:function(dim,_bcb){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var _bcc=run.data[j];
if(_bcc!==null){
var v=typeof _bcc=="number"?_bcc:_bcc.y;
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_bcb);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_bc9);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_bcd,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_bce=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt);
gap=f.gap;
_bcd=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _bcf=t.next("bar",[this.opt,run]),s=run.group,_bd0=new Array(acc.length);
for(var j=0;j<acc.length;++j){
var _bcc=run.data[j];
if(_bcc!==null){
var v=acc[j],_bd1=ht(v),_bd2=typeof _bcc!="number"?t.addMixin(_bcf,"bar",_bcc,true):t.post(_bcf,"bar");
if(_bd1>=1&&_bcd>=1){
var rect={x:_bcb.l,y:dim.height-_bcb.b-vt(j+1.5)+gap,width:_bd1,height:_bcd};
var _bd3=this._plotFill(_bd2.series.fill,dim,_bcb);
_bd3=this._shapeFill(_bd3,rect);
var _bd4=s.createRect(rect).setFill(_bd3).setStroke(_bd2.series.stroke);
run.dyn.fill=_bd4.getFill();
run.dyn.stroke=_bd4.getStroke();
if(_bce){
var o={element:"bar",index:j,run:run,shape:_bd4,x:v,y:j+1.5};
this._connectEvents(o);
_bd0[j]=o;
}
if(this.animate){
this._animateBar(_bd4,_bcb.l,-_bd1);
}
}
}
}
this._eventSeries[run.name]=_bd0;
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var _bcc=run.data[j];
if(_bcc!==null){
var v=typeof _bcc=="number"?_bcc:_bcc.y;
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]){
dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredBars");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_bd5=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(dim,_bd6){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_bd6);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_bd5);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_bd7,_bd8,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_bd9=Math.max(0,this._hScaler.bounds.lower),_bda=ht(_bd9),_bdb=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt,this.series.length);
gap=f.gap;
_bd7=_bd8=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i],_bdc=_bd8*(this.series.length-i-1);
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _bdd=t.next("bar",[this.opt,run]),s=run.group,_bde=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _bdf=run.data[j];
if(_bdf!==null){
var v=typeof _bdf=="number"?_bdf:_bdf.y,hv=ht(v),_be0=hv-_bda,w=Math.abs(_be0),_be1=typeof _bdf!="number"?t.addMixin(_bdd,"bar",_bdf,true):t.post(_bdd,"bar");
if(w>=1&&_bd7>=1){
var rect={x:_bd6.l+(v<_bd9?hv:_bda),y:dim.height-_bd6.b-vt(j+1.5)+gap+_bdc,width:w,height:_bd7};
var _be2=this._plotFill(_be1.series.fill,dim,_bd6);
_be2=this._shapeFill(_be2,rect);
var _be3=s.createRect(rect).setFill(_be2).setStroke(_be1.series.stroke);
run.dyn.fill=_be3.getFill();
run.dyn.stroke=_be3.getStroke();
if(_bdb){
var o={element:"bar",index:j,run:run,shape:_be3,x:v,y:j+1.5};
this._connectEvents(o);
_bde[j]=o;
}
if(this.animate){
this._animateBar(_be3,_bd6.l+_bda,-_be0);
}
}
}
}
this._eventSeries[run.name]=_bde;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Grid"]){
dojo._hasResource["dojox.charting.plot2d.Grid"]=true;
dojo.provide("dojox.charting.plot2d.Grid");
(function(){
var du=dojox.lang.utils,dc=dojox.charting.plot2d.common;
dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none",animate:null},optionalParams:{},constructor:function(_be4,_be5){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_be5);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.dirty=true;
this.animate=this.opt.animate;
this.zoom=null,this.zoomQueue=[];
this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0};
},clear:function(){
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this;
},setAxis:function(axis){
if(axis){
this[axis.vertical?"_vAxis":"_hAxis"]=axis;
}
return this;
},addSeries:function(run){
return this;
},getSeriesStats:function(){
return dojo.delegate(dc.defaultStats);
},initializeScalers:function(){
return this;
},isDirty:function(){
return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty;
},performZoom:function(dim,_be6){
var vs=this._vAxis.scale||1,hs=this._hAxis.scale||1,_be7=dim.height-_be6.b,_be8=this._hAxis.getScaler().bounds,_be9=(_be8.from-_be8.lower)*_be8.scale,_bea=this._vAxis.getScaler().bounds,_beb=(_bea.from-_bea.lower)*_bea.scale;
rVScale=vs/this.lastWindow.vscale,rHScale=hs/this.lastWindow.hscale,rXOffset=(this.lastWindow.xoffset-_be9)/((this.lastWindow.hscale==1)?hs:this.lastWindow.hscale),rYOffset=(_beb-this.lastWindow.yoffset)/((this.lastWindow.vscale==1)?vs:this.lastWindow.vscale),shape=this.group,anim=dojox.gfx.fx.animateTransform(dojo.delegate({shape:shape,duration:1200,transform:[{name:"translate",start:[0,0],end:[_be6.l*(1-rHScale),_be7*(1-rVScale)]},{name:"scale",start:[1,1],end:[rHScale,rVScale]},{name:"original"},{name:"translate",start:[0,0],end:[rXOffset,rYOffset]}]},this.zoom));
dojo.mixin(this.lastWindow,{vscale:vs,hscale:hs,xoffset:_be9,yoffset:_beb});
this.zoomQueue.push(anim);
dojo.connect(anim,"onEnd",this,function(){
this.zoom=null;
this.zoomQueue.shift();
if(this.zoomQueue.length>0){
this.zoomQueue[0].play();
}
});
if(this.zoomQueue.length==1){
this.zoomQueue[0].play();
}
return this;
},getRequiredColors:function(){
return 0;
},render:function(dim,_bec){
if(this.zoom){
return this.performZoom(dim,_bec);
}
this.dirty=this.isDirty();
if(!this.dirty){
return this;
}
this.cleanGroup();
var s=this.group,ta=this.chart.theme.axis;
try{
var _bed=this._vAxis.getScaler(),vt=_bed.scaler.getTransformerFromModel(_bed),_bee=this._vAxis.getTicks();
if(this.opt.hMinorLines){
dojo.forEach(_bee.minor,function(tick){
var y=dim.height-_bec.b-vt(tick.value);
var _bef=s.createLine({x1:_bec.l,y1:y,x2:dim.width-_bec.r,y2:y}).setStroke(ta.minorTick);
if(this.animate){
this._animateGrid(_bef,"h",_bec.l,_bec.r+_bec.l-dim.width);
}
},this);
}
if(this.opt.hMajorLines){
dojo.forEach(_bee.major,function(tick){
var y=dim.height-_bec.b-vt(tick.value);
var _bf0=s.createLine({x1:_bec.l,y1:y,x2:dim.width-_bec.r,y2:y}).setStroke(ta.majorTick);
if(this.animate){
this._animateGrid(_bf0,"h",_bec.l,_bec.r+_bec.l-dim.width);
}
},this);
}
}
catch(e){
}
try{
var _bf1=this._hAxis.getScaler(),ht=_bf1.scaler.getTransformerFromModel(_bf1),_bee=this._hAxis.getTicks();
if(_bee&&this.opt.vMinorLines){
dojo.forEach(_bee.minor,function(tick){
var x=_bec.l+ht(tick.value);
var _bf2=s.createLine({x1:x,y1:_bec.t,x2:x,y2:dim.height-_bec.b}).setStroke(ta.minorTick);
if(this.animate){
this._animateGrid(_bf2,"v",dim.height-_bec.b,dim.height-_bec.b-_bec.t);
}
},this);
}
if(_bee&&this.opt.vMajorLines){
dojo.forEach(_bee.major,function(tick){
var x=_bec.l+ht(tick.value);
var _bf3=s.createLine({x1:x,y1:_bec.t,x2:x,y2:dim.height-_bec.b}).setStroke(ta.majorTick);
if(this.animate){
this._animateGrid(_bf3,"v",dim.height-_bec.b,dim.height-_bec.b-_bec.t);
}
},this);
}
}
catch(e){
}
this.dirty=false;
return this;
},_animateGrid:function(_bf4,type,_bf5,size){
var _bf6=type=="h"?[_bf5,0]:[0,_bf5];
var _bf7=type=="h"?[1/size,1]:[1,1/size];
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_bf4,duration:1200,transform:[{name:"translate",start:_bf6,end:[0,0]},{name:"scale",start:_bf7,end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Pie"]){
dojo._hasResource["dojox.charting.plot2d.Pie"]=true;
dojo.provide("dojox.charting.plot2d.Pie");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,da=dojox.charting.axis2d.common,g=dojox.gfx,m=g.matrix,_bf8=0.2;
dojo.declare("dojox.charting.plot2d.Pie",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true,radGrad:"native",fanSize:5,startAngle:0},optionalParams:{radius:0,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:"",labelWiring:{}},constructor:function(_bf9,_bfa){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_bfa);
du.updateWithPattern(this.opt,_bfa,this.optionalParams);
this.run=null;
this.dyn=[];
},clear:function(){
this.dirty=true;
this.dyn=[];
this.run=null;
return this;
},setAxis:function(axis){
return this;
},addSeries:function(run){
this.run=run;
return this;
},getSeriesStats:function(){
return dojo.delegate(dc.defaultStats);
},initializeScalers:function(){
return this;
},getRequiredColors:function(){
return this.run?this.run.data.length:0;
},render:function(dim,_bfb){
if(!this.dirty){
return this;
}
this.resetEvents();
this.dirty=false;
this._eventSeries={};
this.cleanGroup();
var s=this.group,t=this.chart.theme;
if(!this.run||!this.run.data.length){
return this;
}
var rx=(dim.width-_bfb.l-_bfb.r)/2,ry=(dim.height-_bfb.t-_bfb.b)/2,r=Math.min(rx,ry),_bfc="font" in this.opt?this.opt.font:t.axis.font,size=_bfc?g.normalizedLength(g.splitFontString(_bfc).size):0,_bfd="fontColor" in this.opt?this.opt.fontColor:t.axis.fontColor,_bfe=m._degToRad(this.opt.startAngle),_bff=_bfe,step,_c00,_c01,_c02,_c03,_c04,run=this.run.data,_c05=this.events();
if(typeof run[0]=="number"){
_c00=df.map(run,"x ? Math.max(x, 0) : 0");
if(df.every(_c00,"<= 0")){
return this;
}
_c01=df.map(_c00,"/this",df.foldl(_c00,"+",0));
if(this.opt.labels){
_c02=dojo.map(_c01,function(x){
return x>0?this._getLabel(x*100)+"%":"";
},this);
}
}else{
_c00=df.map(run,"x ? Math.max(x.y, 0) : 0");
if(df.every(_c00,"<= 0")){
return this;
}
_c01=df.map(_c00,"/this",df.foldl(_c00,"+",0));
if(this.opt.labels){
_c02=dojo.map(_c01,function(x,i){
if(x<=0){
return "";
}
var v=run[i];
return "text" in v?v.text:this._getLabel(x*100)+"%";
},this);
}
}
var _c06=df.map(run,function(v,i){
if(v===null||typeof v=="number"){
return t.next("slice",[this.opt,this.run],true);
}
return t.next("slice",[this.opt,this.run,v],true);
},this);
if(this.opt.labels){
_c03=df.foldl1(df.map(_c02,function(_c07,i){
var font=_c06[i].series.font;
return dojox.gfx._base._getTextBox(_c07,{font:font}).w;
},this),"Math.max(a, b)")/2;
if(this.opt.labelOffset<0){
r=Math.min(rx-2*_c03,ry-size)+this.opt.labelOffset;
}
_c04=r-this.opt.labelOffset;
}
if("radius" in this.opt){
r=this.opt.radius;
_c04=r-this.opt.labelOffset;
}
var _c08={cx:_bfb.l+rx,cy:_bfb.t+ry,r:r};
this.dyn=[];
var _c09=new Array(_c01.length);
dojo.some(_c01,function(_c0a,i){
if(_c0a<=0){
return false;
}
var v=run[i],_c0b=_c06[i],_c0c;
if(_c0a>=1){
_c0c=this._plotFill(_c0b.series.fill,dim,_bfb);
_c0c=this._shapeFill(_c0c,{x:_c08.cx-_c08.r,y:_c08.cy-_c08.r,width:2*_c08.r,height:2*_c08.r});
_c0c=this._pseudoRadialFill(_c0c,{x:_c08.cx,y:_c08.cy},_c08.r);
var _c0d=s.createCircle(_c08).setFill(_c0c).setStroke(_c0b.series.stroke);
this.dyn.push({fill:_c0c,stroke:_c0b.series.stroke});
if(_c05){
var o={element:"slice",index:i,run:this.run,shape:_c0d,x:i,y:typeof v=="number"?v:v.y,cx:_c08.cx,cy:_c08.cy,cr:r};
this._connectEvents(o);
_c09[i]=o;
}
return true;
}
var end=_bff+_c0a*2*Math.PI;
if(i+1==_c01.length){
end=_bfe+2*Math.PI;
}
var step=end-_bff,x1=_c08.cx+r*Math.cos(_bff),y1=_c08.cy+r*Math.sin(_bff),x2=_c08.cx+r*Math.cos(end),y2=_c08.cy+r*Math.sin(end);
var _c0e=m._degToRad(this.opt.fanSize);
if(_c0b.series.fill&&_c0b.series.fill.type==="radial"&&this.opt.radGrad==="fan"&&step>_c0e){
var _c0f=s.createGroup(),_c10=Math.ceil(step/_c0e),_c11=step/_c10;
_c0c=this._shapeFill(_c0b.series.fill,{x:_c08.cx-_c08.r,y:_c08.cy-_c08.r,width:2*_c08.r,height:2*_c08.r});
for(var j=0;j<_c10;++j){
var _c12=j==0?x1:_c08.cx+r*Math.cos(_bff+(j-_bf8)*_c11),_c13=j==0?y1:_c08.cy+r*Math.sin(_bff+(j-_bf8)*_c11),_c14=j==_c10-1?x2:_c08.cx+r*Math.cos(_bff+(j+1+_bf8)*_c11),_c15=j==_c10-1?y2:_c08.cy+r*Math.sin(_bff+(j+1+_bf8)*_c11),fan=_c0f.createPath({}).moveTo(_c08.cx,_c08.cy).lineTo(_c12,_c13).arcTo(r,r,0,_c11>Math.PI,true,_c14,_c15).lineTo(_c08.cx,_c08.cy).closePath().setFill(this._pseudoRadialFill(_c0c,{x:_c08.cx,y:_c08.cy},r,_bff+(j+0.5)*_c11,_bff+(j+0.5)*_c11));
}
_c0f.createPath({}).moveTo(_c08.cx,_c08.cy).lineTo(x1,y1).arcTo(r,r,0,step>Math.PI,true,x2,y2).lineTo(_c08.cx,_c08.cy).closePath().setStroke(_c0b.series.stroke);
_c0d=_c0f;
}else{
_c0d=s.createPath({}).moveTo(_c08.cx,_c08.cy).lineTo(x1,y1).arcTo(r,r,0,step>Math.PI,true,x2,y2).lineTo(_c08.cx,_c08.cy).closePath().setStroke(_c0b.series.stroke);
var _c0c=_c0b.series.fill;
if(_c0c&&_c0c.type==="radial"){
_c0c=this._shapeFill(_c0c,{x:_c08.cx-_c08.r,y:_c08.cy-_c08.r,width:2*_c08.r,height:2*_c08.r});
if(this.opt.radGrad==="linear"){
_c0c=this._pseudoRadialFill(_c0c,{x:_c08.cx,y:_c08.cy},r,_bff,end);
}
}else{
if(_c0c&&_c0c.type==="linear"){
_c0c=this._plotFill(_c0c,dim,_bfb);
_c0c=this._shapeFill(_c0c,_c0d.getBoundingBox());
}
}
_c0d.setFill(_c0c);
}
this.dyn.push({fill:_c0c,stroke:_c0b.series.stroke});
if(_c05){
var o={element:"slice",index:i,run:this.run,shape:_c0d,x:i,y:typeof v=="number"?v:v.y,cx:_c08.cx,cy:_c08.cy,cr:r};
this._connectEvents(o);
_c09[i]=o;
}
_bff=end;
return false;
},this);
if(this.opt.labels){
if(this.opt.labelStyle=="default"){
_bff=_bfe;
dojo.some(_c01,function(_c16,i){
if(_c16<=0){
return false;
}
var _c17=_c06[i];
if(_c16>=1){
var v=run[i],elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,_c08.cx,_c08.cy+size/2,"middle",_c02[i],_c17.series.font,_c17.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
return true;
}
var end=_bff+_c16*2*Math.PI,v=run[i];
if(i+1==_c01.length){
end=_bfe+2*Math.PI;
}
var _c18=(_bff+end)/2,x=_c08.cx+_c04*Math.cos(_c18),y=_c08.cy+_c04*Math.sin(_c18)+size/2;
var elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,x,y,"middle",_c02[i],_c17.series.font,_c17.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
_bff=end;
return false;
},this);
}else{
if(this.opt.labelStyle=="columns"){
_bff=_bfe;
var _c19=[];
dojo.forEach(_c01,function(_c1a,i){
var end=_bff+_c1a*2*Math.PI;
if(i+1==_c01.length){
end=_bfe+2*Math.PI;
}
var _c1b=(_bff+end)/2;
_c19.push({angle:_c1b,left:Math.cos(_c1b)<0,theme:_c06[i],index:i,omit:end-_bff<0.001});
_bff=end;
});
var _c1c=dojox.gfx._base._getTextBox("a",{font:_bfc}).h;
this._getProperLabelRadius(_c19,_c1c,_c08.r*1.1);
dojo.forEach(_c19,function(_c1d,i){
if(!_c1d.omit){
var _c1e=_c08.cx-_c08.r*2,_c1f=_c08.cx+_c08.r*2,_c20=dojox.gfx._base._getTextBox(_c02[i],{font:_bfc}).w,x=_c08.cx+_c1d.labelR*Math.cos(_c1d.angle),y=_c08.cy+_c1d.labelR*Math.sin(_c1d.angle),_c21=(_c1d.left)?(_c1e+_c20):(_c1f-_c20),_c22=(_c1d.left)?_c1e:_c21;
var _c23=s.createPath().moveTo(_c08.cx+_c08.r*Math.cos(_c1d.angle),_c08.cy+_c08.r*Math.sin(_c1d.angle));
if(Math.abs(_c1d.labelR*Math.cos(_c1d.angle))<_c08.r*2-_c20){
_c23.lineTo(x,y);
}
_c23.lineTo(_c21,y).setStroke(_c1d.theme.series.labelWiring);
var elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,_c22,y,"left",_c02[i],_c1d.theme.series.font,_c1d.theme.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
}
},this);
}
}
}
var esi=0;
this._eventSeries[this.run.name]=df.map(run,function(v){
return v<=0?null:_c09[esi++];
});
return this;
},_getProperLabelRadius:function(_c24,_c25,_c26){
var _c27={},_c28={},_c29=1,_c2a=1;
if(_c24.length==1){
_c24[0].labelR=_c26;
return;
}
for(var i=0;i<_c24.length;i++){
var _c2b=Math.abs(Math.sin(_c24[i].angle));
if(_c24[i].left){
if(_c29>_c2b){
_c29=_c2b;
_c27=_c24[i];
}
}else{
if(_c2a>_c2b){
_c2a=_c2b;
_c28=_c24[i];
}
}
}
_c27.labelR=_c28.labelR=_c26;
this._caculateLabelR(_c27,_c24,_c25);
this._caculateLabelR(_c28,_c24,_c25);
},_caculateLabelR:function(_c2c,_c2d,_c2e){
var i=_c2c.index,_c2f=_c2d.length,_c30=_c2c.labelR;
while(!(_c2d[i%_c2f].left^_c2d[(i+1)%_c2f].left)){
if(!_c2d[(i+1)%_c2f].omit){
var _c31=(Math.sin(_c2d[i%_c2f].angle)*_c30+((_c2d[i%_c2f].left)?(-_c2e):_c2e))/Math.sin(_c2d[(i+1)%_c2f].angle);
_c30=(_c31<_c2c.labelR)?_c2c.labelR:_c31;
_c2d[(i+1)%_c2f].labelR=_c30;
}
i++;
}
i=_c2c.index,j=(i==0)?_c2f-1:i-1;
while(!(_c2d[i].left^_c2d[j].left)){
if(!_c2d[j].omit){
var _c31=(Math.sin(_c2d[i].angle)*_c30+((_c2d[i].left)?_c2e:(-_c2e)))/Math.sin(_c2d[j].angle);
_c30=(_c31<_c2c.labelR)?_c2c.labelR:_c31;
_c2d[j].labelR=_c30;
}
i--;
j--;
i=(i<0)?i+_c2d.length:i;
j=(j<0)?j+_c2d.length:j;
}
},_getLabel:function(_c32){
return dc.getLabel(_c32,this.opt.fixed,this.opt.precision);
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Bubble"]){
dojo._hasResource["dojox.charting.plot2d.Bubble"]=true;
dojo.provide("dojox.charting.plot2d.Bubble");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_c33=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bubble",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",animate:null},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_c34,_c35){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_c35);
du.updateWithPattern(this.opt,_c35,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_c36){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_c36);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_c33);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_c37=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
if(typeof run.data[0]=="number"){
console.warn("dojox.charting.plot2d.Bubble: the data in the following series cannot be rendered as a bubble chart; ",run);
continue;
}
var _c38=t.next("circle",[this.opt,run]),s=run.group,_c39=dojo.map(run.data,function(v,i){
return v?{x:ht(v.x)+_c36.l,y:dim.height-_c36.b-vt(v.y),radius:this._vScaler.bounds.scale*(v.size/2)}:null;
},this);
var _c3a=null,_c3b=null,_c3c=null;
if(_c38.series.shadow){
_c3c=dojo.map(_c39,function(item){
if(item!==null){
var _c3d=t.addMixin(_c38,"circle",item,true),_c3e=_c3d.series.shadow;
var _c3f=s.createCircle({cx:item.x+_c3e.dx,cy:item.y+_c3e.dy,r:item.radius}).setStroke(_c3e).setFill(_c3e.color);
if(this.animate){
this._animateBubble(_c3f,dim.height-_c36.b,item.radius);
}
return _c3f;
}
return null;
},this);
if(_c3c.length){
run.dyn.shadow=_c3c[_c3c.length-1].getStroke();
}
}
if(_c38.series.outline){
_c3b=dojo.map(_c39,function(item){
if(item!==null){
var _c40=t.addMixin(_c38,"circle",item,true),_c41=dc.makeStroke(_c40.series.outline);
_c41.width=2*_c41.width+_c38.series.stroke.width;
var _c42=s.createCircle({cx:item.x,cy:item.y,r:item.radius}).setStroke(_c41);
if(this.animate){
this._animateBubble(_c42,dim.height-_c36.b,item.radius);
}
return _c42;
}
return null;
},this);
if(_c3b.length){
run.dyn.outline=_c3b[_c3b.length-1].getStroke();
}
}
_c3a=dojo.map(_c39,function(item){
if(item!==null){
var _c43=t.addMixin(_c38,"circle",item,true),rect={x:item.x-item.radius,y:item.y-item.radius,width:2*item.radius,height:2*item.radius};
var _c44=this._plotFill(_c43.series.fill,dim,_c36);
_c44=this._shapeFill(_c44,rect);
var _c45=s.createCircle({cx:item.x,cy:item.y,r:item.radius}).setFill(_c44).setStroke(_c43.series.stroke);
if(this.animate){
this._animateBubble(_c45,dim.height-_c36.b,item.radius);
}
return _c45;
}
return null;
},this);
if(_c3a.length){
run.dyn.fill=_c3a[_c3a.length-1].getFill();
run.dyn.stroke=_c3a[_c3a.length-1].getStroke();
}
if(_c37){
var _c46=new Array(_c3a.length);
dojo.forEach(_c3a,function(s,i){
if(s!==null){
var o={element:"circle",index:i,run:run,shape:s,outline:_c3b&&_c3b[i]||null,shadow:_c3c&&_c3c[i]||null,x:run.data[i].x,y:run.data[i].y,r:run.data[i].size/2,cx:_c39[i].x,cy:_c39[i].y,cr:_c39[i].radius};
this._connectEvents(o);
_c46[i]=o;
}
},this);
this._eventSeries[run.name]=_c46;
}else{
delete this._eventSeries[run.name];
}
run.dirty=false;
}
this.dirty=false;
return this;
},_animateBubble:function(_c47,_c48,size){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_c47,duration:1200,transform:[{name:"translate",start:[0,_c48],end:[0,0]},{name:"scale",start:[0,1/size],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Candlesticks"]){
dojo._hasResource["dojox.charting.plot2d.Candlesticks"]=true;
dojo.provide("dojox.charting.plot2d.Candlesticks");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_c49=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Candlesticks",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_c4a,_c4b){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_c4b);
du.updateWithPattern(this.opt,_c4b,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},collectStats:function(_c4c){
var _c4d=dojo.delegate(dc.defaultStats);
for(var i=0;i<_c4c.length;i++){
var run=_c4c[i];
if(!run.data.length){
continue;
}
var _c4e=_c4d.vmin,_c4f=_c4d.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,idx){
if(val!==null){
var x=val.x||idx+1;
_c4d.hmin=Math.min(_c4d.hmin,x);
_c4d.hmax=Math.max(_c4d.hmax,x);
_c4d.vmin=Math.min(_c4d.vmin,val.open,val.close,val.high,val.low);
_c4d.vmax=Math.max(_c4d.vmax,val.open,val.close,val.high,val.low);
}
});
}
if("ymin" in run){
_c4d.vmin=Math.min(_c4e,run.ymin);
}
if("ymax" in run){
_c4d.vmax=Math.max(_c4f,run.ymax);
}
}
return _c4d;
},getSeriesStats:function(){
var _c50=this.collectStats(this.series);
_c50.hmin-=0.5;
_c50.hmax+=0.5;
return _c50;
},render:function(dim,_c51){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_c51);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_c49);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_c52,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_c53=Math.max(0,this._vScaler.bounds.lower),_c54=vt(_c53),_c55=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_c52=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _c56=t.next("candlestick",[this.opt,run]),s=run.group,_c57=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
var _c58=t.addMixin(_c56,"candlestick",v,true);
var x=ht(v.x||(j+0.5))+_c51.l+gap,y=dim.height-_c51.b,open=vt(v.open),_c59=vt(v.close),high=vt(v.high),low=vt(v.low);
if("mid" in v){
var mid=vt(v.mid);
}
if(low>high){
var tmp=high;
high=low;
low=tmp;
}
if(_c52>=1){
var _c5a=open>_c59;
var line={x1:_c52/2,x2:_c52/2,y1:y-high,y2:y-low},rect={x:0,y:y-Math.max(open,_c59),width:_c52,height:Math.max(_c5a?open-_c59:_c59-open,1)};
shape=s.createGroup();
shape.setTransform({dx:x,dy:0});
var _c5b=shape.createGroup();
_c5b.createLine(line).setStroke(_c58.series.stroke);
_c5b.createRect(rect).setStroke(_c58.series.stroke).setFill(_c5a?_c58.series.fill:"white");
if("mid" in v){
_c5b.createLine({x1:(_c58.series.stroke.width||1),x2:_c52-(_c58.series.stroke.width||1),y1:y-mid,y2:y-mid}).setStroke(_c5a?"white":_c58.series.stroke);
}
run.dyn.fill=_c58.series.fill;
run.dyn.stroke=_c58.series.stroke;
if(_c55){
var o={element:"candlestick",index:j,run:run,shape:_c5b,x:x,y:y-Math.max(open,_c59),cx:_c52/2,cy:(y-Math.max(open,_c59))+(Math.max(_c5a?open-_c59:_c59-open,1)/2),width:_c52,height:Math.max(_c5a?open-_c59:_c59-open,1),data:v};
this._connectEvents(o);
_c57[j]=o;
}
}
if(this.animate){
this._animateCandlesticks(shape,y-low,high-low);
}
}
}
this._eventSeries[run.name]=_c57;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateCandlesticks:function(_c5c,_c5d,_c5e){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_c5c,duration:1200,transform:[{name:"translate",start:[0,_c5d-(_c5d/_c5e)],end:[0,0]},{name:"scale",start:[1,1/_c5e],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.OHLC"]){
dojo._hasResource["dojox.charting.plot2d.OHLC"]=true;
dojo.provide("dojox.charting.plot2d.OHLC");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_c5f=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.OHLC",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_c60,_c61){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_c61);
du.updateWithPattern(this.opt,_c61,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},collectStats:function(_c62){
var _c63=dojo.delegate(dc.defaultStats);
for(var i=0;i<_c62.length;i++){
var run=_c62[i];
if(!run.data.length){
continue;
}
var _c64=_c63.vmin,_c65=_c63.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,idx){
if(val!==null){
var x=val.x||idx+1;
_c63.hmin=Math.min(_c63.hmin,x);
_c63.hmax=Math.max(_c63.hmax,x);
_c63.vmin=Math.min(_c63.vmin,val.open,val.close,val.high,val.low);
_c63.vmax=Math.max(_c63.vmax,val.open,val.close,val.high,val.low);
}
});
}
if("ymin" in run){
_c63.vmin=Math.min(_c64,run.ymin);
}
if("ymax" in run){
_c63.vmax=Math.max(_c65,run.ymax);
}
}
return _c63;
},getSeriesStats:function(){
var _c66=this.collectStats(this.series);
_c66.hmin-=0.5;
_c66.hmax+=0.5;
return _c66;
},render:function(dim,_c67){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_c67);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_c5f);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_c68,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_c69=Math.max(0,this._vScaler.bounds.lower),_c6a=vt(_c69),_c6b=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_c68=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _c6c=t.next("candlestick",[this.opt,run]),s=run.group,_c6d=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
var _c6e=t.addMixin(_c6c,"candlestick",v,true);
var x=ht(v.x||(j+0.5))+_c67.l+gap,y=dim.height-_c67.b,open=vt(v.open),_c6f=vt(v.close),high=vt(v.high),low=vt(v.low);
if(low>high){
var tmp=high;
high=low;
low=tmp;
}
if(_c68>=1){
var hl={x1:_c68/2,x2:_c68/2,y1:y-high,y2:y-low},op={x1:0,x2:((_c68/2)+((_c6e.series.stroke.width||1)/2)),y1:y-open,y2:y-open},cl={x1:((_c68/2)-((_c6e.series.stroke.width||1)/2)),x2:_c68,y1:y-_c6f,y2:y-_c6f};
shape=s.createGroup();
shape.setTransform({dx:x,dy:0});
var _c70=shape.createGroup();
_c70.createLine(hl).setStroke(_c6e.series.stroke);
_c70.createLine(op).setStroke(_c6e.series.stroke);
_c70.createLine(cl).setStroke(_c6e.series.stroke);
run.dyn.stroke=_c6e.series.stroke;
if(_c6b){
var o={element:"candlestick",index:j,run:run,shape:_c70,x:x,y:y-Math.max(open,_c6f),cx:_c68/2,cy:(y-Math.max(open,_c6f))+(Math.max(open>_c6f?open-_c6f:_c6f-open,1)/2),width:_c68,height:Math.max(open>_c6f?open-_c6f:_c6f-open,1),data:v};
this._connectEvents(o);
_c6d[j]=o;
}
}
if(this.animate){
this._animateOHLC(shape,y-low,high-low);
}
}
}
this._eventSeries[run.name]=_c6d;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateOHLC:function(_c71,_c72,_c73){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_c71,duration:1200,transform:[{name:"translate",start:[0,_c72-(_c72/_c73)],end:[0,0]},{name:"scale",start:[1,1/_c73],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Spider"]){
dojo._hasResource["dojox.charting.plot2d.Spider"]=true;
dojo.provide("dojox.charting.plot2d.Spider");
dojo.experimental("dojox.charting.plot2d.Spider");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,da=dojox.charting.axis2d.common,g=dojox.gfx,m=g.matrix,_c74=0.2;
dojo.declare("dojox.charting.plot2d.Spider",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:-10,labelStyle:"default",htmlLabels:true,startAngle:-90,divisions:3,axisColor:"",axisWidth:0,spiderColor:"",spiderWidth:0,seriesWidth:0,seriesFillAlpha:0.2,spiderOrigin:0.16,markerSize:3,spiderType:"polygon",animationType:dojo.fx.easing.backOut,axisTickFont:"",axisTickFontColor:"",axisFont:"",axisFontColor:""},optionalParams:{radius:0,font:"",fontColor:""},constructor:function(_c75,_c76){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_c76);
du.updateWithPattern(this.opt,_c76,this.optionalParams);
this.series=[];
this.dyn=[];
this.datas={};
this.labelKey=[];
this.oldSeriePoints={};
this.animations={};
},clear:function(){
this.dirty=true;
this.dyn=[];
this.series=[];
this.datas={};
this.labelKey=[];
this.oldSeriePoints={};
this.animations={};
return this;
},setAxis:function(axis){
return this;
},addSeries:function(run){
var _c77=false;
this.series.push(run);
for(var key in run.data){
var val=run.data[key],data=this.datas[key];
if(data){
data.vlist.push(val);
data.min=Math.min(data.min,val);
data.max=Math.max(data.max,val);
}else{
this.datas[key]={min:val,max:val,vlist:[val]};
}
}
if(this.labelKey.length<=0){
for(var key in run.data){
this.labelKey.push(key);
}
}
return this;
},getSeriesStats:function(){
return dojox.charting.plot2d.common.collectSimpleStats(this.series);
},calculateAxes:function(dim){
this.initializeScalers(dim,this.getSeriesStats());
return this;
},getRequiredColors:function(){
return this.series.length;
},initializeScalers:function(dim,_c78){
if(this._hAxis){
if(!this._hAxis.initialized()){
this._hAxis.calculate(_c78.hmin,_c78.hmax,dim.width);
}
this._hScaler=this._hAxis.getScaler();
}else{
this._hScaler=dojox.charting.scaler.primitive.buildScaler(_c78.hmin,_c78.hmax,dim.width);
}
if(this._vAxis){
if(!this._vAxis.initialized()){
this._vAxis.calculate(_c78.vmin,_c78.vmax,dim.height);
}
this._vScaler=this._vAxis.getScaler();
}else{
this._vScaler=dojox.charting.scaler.primitive.buildScaler(_c78.vmin,_c78.vmax,dim.height);
}
return this;
},render:function(dim,_c79){
if(!this.dirty){
return this;
}
this.dirty=false;
this.cleanGroup();
var s=this.group,t=this.chart.theme;
this.resetEvents();
if(!this.series||!this.series.length){
return this;
}
var o=this.opt,ta=t.axis,rx=(dim.width-_c79.l-_c79.r)/2,ry=(dim.height-_c79.t-_c79.b)/2,r=Math.min(rx,ry),_c7a=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font)||"normal normal normal 7pt Tahoma",_c7b=o.axisFont||(ta.tick&&ta.tick.titleFont)||"normal normal normal 11pt Tahoma",_c7c=o.axisTickFontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"silver",_c7d=o.axisFontColor||(ta.tick&&ta.tick.titleFontColor)||"black",_c7e=o.axisColor||(ta.tick&&ta.tick.axisColor)||"silver",_c7f=o.spiderColor||(ta.tick&&ta.tick.spiderColor)||"silver",_c80=o.axisWidth||(ta.stroke&&ta.stroke.width)||2,_c81=o.spiderWidth||(ta.stroke&&ta.stroke.width)||2,_c82=o.seriesWidth||(ta.stroke&&ta.stroke.width)||2,_c83=g.normalizedLength(g.splitFontString(_c7b).size),_c84=m._degToRad(o.startAngle),_c85=_c84,step,_c86,_c87,_c88,_c89,_c8a,_c8b,_c8c,_c8d,_c8e,_c8f,ro=o.spiderOrigin,dv=o.divisions>=3?o.divisions:3,ms=o.markerSize,spt=o.spiderType,at=o.animationType,_c90=o.labelOffset<-10?o.labelOffset:-10,_c91=0.2;
if(o.labels){
_c88=dojo.map(this.series,function(s){
return s.name;
},this);
_c89=df.foldl1(df.map(_c88,function(_c92,i){
var font=t.series.font;
return dojox.gfx._base._getTextBox(_c92,{font:font}).w;
},this),"Math.max(a, b)")/2;
r=Math.min(rx-2*_c89,ry-_c83)+_c90;
_c8a=r-_c90;
}
if("radius" in o){
r=o.radius;
_c8a=r-_c90;
}
r/=(1+_c91);
var _c93={cx:_c79.l+rx,cy:_c79.t+ry,r:r};
for(var i=this.series.length-1;i>=0;i--){
var _c94=this.series[i];
if(!this.dirty&&!_c94.dirty){
t.skip();
continue;
}
_c94.cleanGroup();
var run=_c94.data;
if(run!==null){
var len=this._getObjectLength(run);
if(!_c8b||_c8b.length<=0){
_c8b=[],_c8c=[],_c8f=[];
this._buildPoints(_c8b,len,_c93,r,_c85,true);
this._buildPoints(_c8c,len,_c93,r*ro,_c85,true);
this._buildPoints(_c8f,len,_c93,_c8a,_c85);
if(dv>2){
_c8d=[],_c8e=[];
for(var j=0;j<dv-2;j++){
_c8d[j]=[];
this._buildPoints(_c8d[j],len,_c93,r*(ro+(1-ro)*(j+1)/(dv-1)),_c85,true);
_c8e[j]=r*(ro+(1-ro)*(j+1)/(dv-1));
}
}
}
}
}
var _c95=s.createGroup(),_c96={color:_c7e,width:_c80},_c97={color:_c7f,width:_c81};
for(var j=_c8b.length-1;j>=0;--j){
var _c98=_c8b[j],st={x:_c98.x+(_c98.x-_c93.cx)*_c91,y:_c98.y+(_c98.y-_c93.cy)*_c91},nd={x:_c98.x+(_c98.x-_c93.cx)*_c91/2,y:_c98.y+(_c98.y-_c93.cy)*_c91/2};
_c95.createLine({x1:_c93.cx,y1:_c93.cy,x2:st.x,y2:st.y}).setStroke(_c96);
this._drawArrow(_c95,st,nd,_c96);
}
var _c99=s.createGroup();
for(var j=_c8f.length-1;j>=0;--j){
var _c98=_c8f[j],_c9a=dojox.gfx._base._getTextBox(this.labelKey[j],{font:_c7b}).w||0,_c9b=this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx";
elem=da.createText[_c9b](this.chart,_c99,(!dojo._isBodyLtr()&&_c9b=="html")?(_c98.x+_c9a-dim.width):_c98.x,_c98.y,"middle",this.labelKey[j],_c7b,_c7d);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
}
var _c9c=s.createGroup();
if(spt=="polygon"){
_c9c.createPolyline(_c8b).setStroke(_c97);
_c9c.createPolyline(_c8c).setStroke(_c97);
if(_c8d.length>0){
for(var j=_c8d.length-1;j>=0;--j){
_c9c.createPolyline(_c8d[j]).setStroke(_c97);
}
}
}else{
var _c9d=this._getObjectLength(this.datas);
_c9c.createCircle({cx:_c93.cx,cy:_c93.cy,r:r}).setStroke(_c97);
_c9c.createCircle({cx:_c93.cx,cy:_c93.cy,r:r*ro}).setStroke(_c97);
if(_c8e.length>0){
for(var j=_c8e.length-1;j>=0;--j){
_c9c.createCircle({cx:_c93.cx,cy:_c93.cy,r:_c8e[j]}).setStroke(_c97);
}
}
}
var _c9e=s.createGroup(),len=this._getObjectLength(this.datas),k=0;
for(var key in this.datas){
var data=this.datas[key],min=data.min,max=data.max,_c9f=max-min,end=_c85+2*Math.PI*k/len;
for(var i=0;i<dv;i++){
var text=min+_c9f*i/(dv-1),_c98=this._getCoordinate(_c93,r*(ro+(1-ro)*i/(dv-1)),end);
text=this._getLabel(text);
var _c9a=dojox.gfx._base._getTextBox(text,{font:_c7a}).w||0,_c9b=this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx";
if(this.opt.htmlLabels){
this.htmlElements.push(da.createText[_c9b](this.chart,_c9e,(!dojo._isBodyLtr()&&_c9b=="html")?(_c98.x+_c9a-dim.width):_c98.x,_c98.y,"start",text,_c7a,_c7c));
}
}
k++;
}
this.chart.seriesShapes={};
var _ca0=[];
for(var i=this.series.length-1;i>=0;i--){
var _c94=this.series[i],run=_c94.data;
if(run!==null){
var _ca1=[],k=0,_ca2=[];
for(var key in run){
var data=this.datas[key],min=data.min,max=data.max,_c9f=max-min,_ca3=run[key],end=_c85+2*Math.PI*k/len,_c98=this._getCoordinate(_c93,r*(ro+(1-ro)*(_ca3-min)/_c9f),end);
_ca1.push(_c98);
_ca2.push({sname:_c94.name,key:key,data:_ca3});
k++;
}
_ca1[_ca1.length]=_ca1[0];
_ca2[_ca2.length]=_ca2[0];
var _ca4=this._getBoundary(_ca1),_ca5=t.next("spider",[o,_c94]),ts=_c94.group,f=g.normalizeColor(_ca5.series.fill),sk={color:_ca5.series.fill,width:_c82};
f.a=o.seriesFillAlpha;
_c94.dyn={fill:f,stroke:sk};
var osps=this.oldSeriePoints[_c94.name];
var cs=this._createSeriesEntry(ts,(osps||_c8c),_ca1,f,sk,r,ro,ms,at);
this.chart.seriesShapes[_c94.name]=cs;
this.oldSeriePoints[_c94.name]=_ca1;
var po={element:"spider_poly",index:i,id:"spider_poly_"+_c94.name,run:_c94,plot:this,shape:cs.poly,parent:ts,brect:_ca4,cx:_c93.cx,cy:_c93.cy,cr:r,f:f,s:s};
this._connectEvents(po);
var so={element:"spider_plot",index:i,id:"spider_plot_"+_c94.name,run:_c94,plot:this,shape:_c94.group};
this._connectEvents(so);
dojo.forEach(cs.circles,function(c,i){
var _ca6=c.getShape(),co={element:"spider_circle",index:i,id:"spider_circle_"+_c94.name+i,run:_c94,plot:this,shape:c,parent:ts,tdata:_ca2[i],cx:_ca1[i].x,cy:_ca1[i].y,f:f,s:s};
this._connectEvents(co);
},this);
}
}
return this;
},_createSeriesEntry:function(ts,osps,sps,f,sk,r,ro,ms,at){
var _ca7=ts.createPolyline(osps).setFill(f).setStroke(sk),_ca8=[];
for(var j=0;j<osps.length;j++){
var _ca9=osps[j],cr=ms;
var _caa=ts.createCircle({cx:_ca9.x,cy:_ca9.y,r:cr}).setFill(f).setStroke(sk);
_ca8.push(_caa);
}
var _cab=dojo.map(sps,function(np,j){
var sp=osps[j],anim=new dojo._Animation({duration:1000,easing:at,curve:[sp.y,np.y]});
var spl=_ca7,sc=_ca8[j];
dojo.connect(anim,"onAnimate",function(y){
var _cac=spl.getShape();
_cac.points[j].y=y;
spl.setShape(_cac);
var _cad=sc.getShape();
_cad.cy=y;
sc.setShape(_cad);
});
return anim;
});
var _cae=dojo.map(sps,function(np,j){
var sp=osps[j],anim=new dojo._Animation({duration:1000,easing:at,curve:[sp.x,np.x]});
var spl=_ca7,sc=_ca8[j];
dojo.connect(anim,"onAnimate",function(x){
var _caf=spl.getShape();
_caf.points[j].x=x;
spl.setShape(_caf);
var _cb0=sc.getShape();
_cb0.cx=x;
sc.setShape(_cb0);
});
return anim;
});
var _cb1=dojo.fx.combine(_cab.concat(_cae));
_cb1.play();
return {group:ts,poly:_ca7,circles:_ca8};
},plotEvent:function(o){
var _cb2=o.id?o.id:"default",a;
if(_cb2 in this.animations){
a=this.animations[_cb2];
a.anim&&a.anim.stop(true);
}else{
a=this.animations[_cb2]={};
}
if(o.element=="spider_poly"){
if(!a.color){
var _cb3=o.shape.getFill();
if(!_cb3||!(_cb3 instanceof dojo.Color)){
return;
}
a.color={start:_cb3,end:_cb4(_cb3)};
}
var _cb5=a.color.start,end=a.color.end;
if(o.type=="onmouseout"){
var t=_cb5;
_cb5=end;
end=t;
}
a.anim=dojox.gfx.fx.animateFill({shape:o.shape,duration:800,easing:dojo.fx.easing.backOut,color:{start:_cb5,end:end}});
a.anim.play();
}else{
if(o.element=="spider_circle"){
var init,_cb6,_cb7=1.5;
if(o.type=="onmouseover"){
init=dojox.gfx.matrix.identity;
_cb6=_cb7;
var _cb8={type:"rect"};
_cb8.x=o.cx;
_cb8.y=o.cy;
_cb8.width=_cb8.height=1;
var lt=dojo.coords(this.chart.node,true);
_cb8.x+=lt.x;
_cb8.y+=lt.y;
_cb8.x=Math.round(_cb8.x);
_cb8.y=Math.round(_cb8.y);
_cb8.width=Math.ceil(_cb8.width);
_cb8.height=Math.ceil(_cb8.height);
this.aroundRect=_cb8;
var _cb9=["after","before"];
if(dijit&&dijit.Tooltip){
dijit.showTooltip(o.tdata.sname+"<br/>"+o.tdata.key+"<br/>"+o.tdata.data,this.aroundRect,_cb9);
}
}else{
init=dojox.gfx.matrix.scaleAt(_cb7,o.cx,o.cy);
_cb6=1/_cb7;
if(dijit&&dijit.Tooltip){
this.aroundRect&&dijit.hideTooltip(this.aroundRect);
}
}
var cs=o.shape.getShape(),init=m.scaleAt(_cb7,cs.cx,cs.cy),_cba={shape:o.shape,duration:200,easing:dojo.fx.easing.backOut,transform:[{name:"scaleAt",start:[1,cs.cx,cs.cy],end:[_cb6,cs.cx,cs.cy]},init]};
a.anim=dojox.gfx.fx.animateTransform(_cba);
a.anim.play();
}else{
if(o.element=="spider_plot"){
if(o.type=="onmouseover"&&!dojo.isIE){
o.shape.moveToFront();
}
}
}
}
},_getBoundary:function(_cbb){
var xmax=_cbb[0].x,xmin=_cbb[0].x,ymax=_cbb[0].y,ymin=_cbb[0].y;
for(var i=0;i<_cbb.length;i++){
var _cbc=_cbb[i];
xmax=Math.max(_cbc.x,xmax);
ymax=Math.max(_cbc.y,ymax);
xmin=Math.min(_cbc.x,xmin);
ymin=Math.min(_cbc.y,ymin);
}
return {x:xmin,y:ymin,width:xmax-xmin,height:ymax-ymin};
},_drawArrow:function(s,_cbd,end,_cbe){
var len=Math.sqrt(Math.pow(end.x-_cbd.x,2)+Math.pow(end.y-_cbd.y,2)),sin=(end.y-_cbd.y)/len,cos=(end.x-_cbd.x)/len,_cbf={x:end.x+(len/3)*(-sin),y:end.y+(len/3)*cos},_cc0={x:end.x+(len/3)*sin,y:end.y+(len/3)*(-cos)};
s.createPolyline([_cbd,_cbf,_cc0]).setFill(_cbe.color).setStroke(_cbe);
},_buildPoints:function(_cc1,_cc2,_cc3,_cc4,_cc5,_cc6){
for(var i=0;i<_cc2;i++){
var end=_cc5+2*Math.PI*i/_cc2;
_cc1.push(this._getCoordinate(_cc3,_cc4,end));
}
if(_cc6){
_cc1.push(this._getCoordinate(_cc3,_cc4,_cc5+2*Math.PI));
}
},_getCoordinate:function(_cc7,_cc8,_cc9){
return {x:_cc7.cx+_cc8*Math.cos(_cc9),y:_cc7.cy+_cc8*Math.sin(_cc9)};
},_getObjectLength:function(obj){
var _cca=0;
if(dojo.isObject(obj)){
for(var key in obj){
_cca++;
}
}
return _cca;
},_getLabel:function(_ccb){
return dc.getLabel(_ccb,this.opt.fixed,this.opt.precision);
}});
function _cb4(_ccc){
var a=new dojox.color.Color(_ccc),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=100;
if(x.l<50){
x.l=75;
}else{
if(x.l>75){
x.l=50;
}else{
x.l=x.l-50>75-x.l?50:75;
}
}
}
var _ccc=dojox.color.fromHsl(x);
_ccc.a=0.7;
return _ccc;
};
})();
}
if(!dojo._hasResource["dojox.lang.functional.fold"]){
dojo._hasResource["dojox.lang.functional.fold"]=true;
dojo.provide("dojox.lang.functional.fold");
(function(){
var d=dojo,df=dojox.lang.functional,_ccd={};
d.mixin(df,{foldl:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();z=f.call(o,z,a.next(),i++,a)){
}
}else{
for(i in a){
if(!(i in _ccd)){
z=f.call(o,z,a[i],i,a);
}
}
}
}
return z;
},foldl1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var z,i,n;
if(d.isArray(a)){
z=a[0];
for(i=1,n=a.length;i<n;z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
if(a.hasNext()){
z=a.next();
for(i=1;a.hasNext();z=f.call(o,z,a.next(),i++,a)){
}
}
}else{
var _cce=true;
for(i in a){
if(!(i in _ccd)){
if(_cce){
z=a[i];
_cce=false;
}else{
z=f.call(o,z,a[i],i,a);
}
}
}
}
}
return z;
},foldr:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length;i>0;--i,z=f.call(o,z,a[i],i,a)){
}
return z;
},foldr1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,z=a[n-1],i=n-1;
for(;i>0;--i,z=f.call(o,z,a[i],i,a)){
}
return z;
},reduce:function(a,f,z){
return arguments.length<3?df.foldl1(a,f):df.foldl(a,f,z);
},reduceRight:function(a,f,z){
return arguments.length<3?df.foldr1(a,f):df.foldr(a,f,z);
},unfold:function(pr,f,g,z,o){
o=o||d.global;
f=df.lambda(f);
g=df.lambda(g);
pr=df.lambda(pr);
var t=[];
for(;!pr.call(o,z);t.push(f.call(o,z)),z=g.call(o,z)){
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.color.Palette"]){
dojo._hasResource["dojox.color.Palette"]=true;
dojo.provide("dojox.color.Palette");
(function(){
var dxc=dojox.color;
dxc.Palette=function(base){
this.colors=[];
if(base instanceof dojox.color.Palette){
this.colors=base.colors.slice(0);
}else{
if(base instanceof dojox.color.Color){
this.colors=[null,null,base,null,null];
}else{
if(dojo.isArray(base)){
this.colors=dojo.map(base.slice(0),function(item){
if(dojo.isString(item)){
return new dojox.color.Color(item);
}
return item;
});
}else{
if(dojo.isString(base)){
this.colors=[null,null,new dojox.color.Color(base),null,null];
}
}
}
}
};
function _ccf(p,_cd0,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var r=(_cd0=="dr")?item.r+val:item.r,g=(_cd0=="dg")?item.g+val:item.g,b=(_cd0=="db")?item.b+val:item.b,a=(_cd0=="da")?item.a+val:item.a;
ret.colors.push(new dojox.color.Color({r:Math.min(255,Math.max(0,r)),g:Math.min(255,Math.max(0,g)),b:Math.min(255,Math.max(0,b)),a:Math.min(1,Math.max(0,a))}));
});
return ret;
};
function tCMY(p,_cd1,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toCmy(),c=(_cd1=="dc")?o.c+val:o.c,m=(_cd1=="dm")?o.m+val:o.m,y=(_cd1=="dy")?o.y+val:o.y;
ret.colors.push(dojox.color.fromCmy(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y))));
});
return ret;
};
function _cd2(p,_cd3,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toCmyk(),c=(_cd3=="dc")?o.c+val:o.c,m=(_cd3=="dm")?o.m+val:o.m,y=(_cd3=="dy")?o.y+val:o.y,k=(_cd3=="dk")?o.b+val:o.b;
ret.colors.push(dojox.color.fromCmyk(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y)),Math.min(100,Math.max(0,k))));
});
return ret;
};
function tHSL(p,_cd4,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toHsl(),h=(_cd4=="dh")?o.h+val:o.h,s=(_cd4=="ds")?o.s+val:o.s,l=(_cd4=="dl")?o.l+val:o.l;
ret.colors.push(dojox.color.fromHsl(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,l))));
});
return ret;
};
function tHSV(p,_cd5,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toHsv(),h=(_cd5=="dh")?o.h+val:o.h,s=(_cd5=="ds")?o.s+val:o.s,v=(_cd5=="dv")?o.v+val:o.v;
ret.colors.push(dojox.color.fromHsv(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,v))));
});
return ret;
};
function _cd6(val,low,high){
return high-((high-val)*((high-low)/high));
};
dojo.extend(dxc.Palette,{transform:function(_cd7){
var fn=_ccf;
if(_cd7.use){
var use=_cd7.use.toLowerCase();
if(use.indexOf("hs")==0){
if(use.charAt(2)=="l"){
fn=tHSL;
}else{
fn=tHSV;
}
}else{
if(use.indexOf("cmy")==0){
if(use.charAt(3)=="k"){
fn=_cd2;
}else{
fn=tCMY;
}
}
}
}else{
if("dc" in _cd7||"dm" in _cd7||"dy" in _cd7){
if("dk" in _cd7){
fn=_cd2;
}else{
fn=tCMY;
}
}else{
if("dh" in _cd7||"ds" in _cd7){
if("dv" in _cd7){
fn=tHSV;
}else{
fn=tHSL;
}
}
}
}
var _cd8=this;
for(var p in _cd7){
if(p=="use"){
continue;
}
_cd8=fn(_cd8,p,_cd7[p]);
}
return _cd8;
},clone:function(){
return new dxc.Palette(this);
}});
dojo.mixin(dxc.Palette,{generators:{analogous:function(args){
var high=args.high||60,low=args.low||18,base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h=[(hsv.h+low+360)%360,(hsv.h+Math.round(low/2)+360)%360,hsv.h,(hsv.h-Math.round(high/2)+360)%360,(hsv.h-high+360)%360];
var s1=Math.max(10,(hsv.s<=95)?hsv.s+5:(100-(hsv.s-95))),s2=(hsv.s>1)?hsv.s-1:21-hsv.s,v1=(hsv.v>=92)?hsv.v-9:Math.max(hsv.v+9,20),v2=(hsv.v<=90)?Math.max(hsv.v+5,20):(95+Math.ceil((hsv.v-90)/2)),s=[s1,s2,hsv.s,s1,s1],v=[v1,v2,hsv.v,v1,v2];
return new dxc.Palette(dojo.map(h,function(hue,i){
return dojox.color.fromHsv(hue,s[i],v[i]);
}));
},monochromatic:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var s1=(hsv.s-30>9)?hsv.s-30:hsv.s+30,s2=hsv.s,v1=_cd6(hsv.v,20,100),v2=(hsv.v-20>20)?hsv.v-20:hsv.v+60,v3=(hsv.v-50>20)?hsv.v-50:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(hsv.h,s1,v1),dojox.color.fromHsv(hsv.h,s2,v3),base,dojox.color.fromHsv(hsv.h,s1,v3),dojox.color.fromHsv(hsv.h,s2,v2)]);
},triadic:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=(hsv.h+57+360)%360,h2=(hsv.h-157+360)%360,s1=(hsv.s>20)?hsv.s-10:hsv.s+10,s2=(hsv.s>90)?hsv.s-10:hsv.s+10,s3=(hsv.s>95)?hsv.s-5:hsv.s+5,v1=(hsv.v-20>20)?hsv.v-20:hsv.v+20,v2=(hsv.v-30>20)?hsv.v-30:hsv.v+30,v3=(hsv.v-30>70)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(h1,s1,hsv.v),dojox.color.fromHsv(hsv.h,s2,v2),base,dojox.color.fromHsv(h2,s2,v1),dojox.color.fromHsv(h2,s3,v3)]);
},complementary:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,s1=Math.max(hsv.s-10,0),s2=_cd6(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(hsv.h,s1,v1),dojox.color.fromHsv(hsv.h,s2,v2),base,dojox.color.fromHsv(h1,s3,v2),dojox.color.fromHsv(h1,hsv.s,hsv.v)]);
},splitComplementary:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,_cd9=args.da||30,hsv=base.toHsv();
var _cda=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,h1=(_cda-_cd9+360)%360,h2=(_cda+_cd9)%360,s1=Math.max(hsv.s-10,0),s2=_cd6(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(h1,s1,v1),dojox.color.fromHsv(h1,s2,v2),base,dojox.color.fromHsv(h2,s3,v2),dojox.color.fromHsv(h2,hsv.s,hsv.v)]);
},compound:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=((hsv.h*2)+18<360)?(hsv.h*2)+18:Math.floor(hsv.h/2)-18,h2=((hsv.h*2)+120<360)?(hsv.h*2)+120:Math.floor(hsv.h/2)-120,h3=((hsv.h*2)+99<360)?(hsv.h*2)+99:Math.floor(hsv.h/2)-99,s1=(hsv.s-40>10)?hsv.s-40:hsv.s+40,s2=(hsv.s-10>80)?hsv.s-10:hsv.s+10,s3=(hsv.s-25>10)?hsv.s-25:hsv.s+25,v1=(hsv.v-40>10)?hsv.v-40:hsv.v+40,v2=(hsv.v-20>80)?hsv.v-20:hsv.v+20,v3=Math.max(hsv.v,20);
return new dxc.Palette([dojox.color.fromHsv(h1,s1,v1),dojox.color.fromHsv(h1,s2,v2),base,dojox.color.fromHsv(h2,s3,v3),dojox.color.fromHsv(h3,s2,v2)]);
},shades:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var s=(hsv.s==100&&hsv.v==0)?0:hsv.s,v1=(hsv.v-50>20)?hsv.v-50:hsv.v+30,v2=(hsv.v-25>=20)?hsv.v-25:hsv.v+55,v3=(hsv.v-75>=20)?hsv.v-75:hsv.v+5,v4=Math.max(hsv.v-10,20);
return new dxc.Palette([new dojox.color.fromHsv(hsv.h,s,v1),new dojox.color.fromHsv(hsv.h,s,v2),base,new dojox.color.fromHsv(hsv.h,s,v3),new dojox.color.fromHsv(hsv.h,s,v4)]);
}},generate:function(base,type){
if(dojo.isFunction(type)){
return type({base:base});
}else{
if(dxc.Palette.generators[type]){
return dxc.Palette.generators[type]({base:base});
}
}
throw new Error("dojox.color.Palette.generate: the specified generator ('"+type+"') does not exist.");
}});
})();
}
if(!dojo._hasResource["dojox.charting.Theme"]){
dojo._hasResource["dojox.charting.Theme"]=true;
dojo.provide("dojox.charting.Theme");
dojo.declare("dojox.charting.Theme",null,{shapeSpaces:{shape:1,shapeX:1,shapeY:1},constructor:function(_cdb){
_cdb=_cdb||{};
var def=dojox.charting.Theme.defaultTheme;
dojo.forEach(["chart","plotarea","axis","series","marker"],function(name){
this[name]=dojo.delegate(def[name],_cdb[name]);
},this);
if(_cdb.seriesThemes&&_cdb.seriesThemes.length){
this.colors=null;
this.seriesThemes=_cdb.seriesThemes.slice(0);
}else{
this.seriesThemes=null;
this.colors=(_cdb.colors||dojox.charting.Theme.defaultColors).slice(0);
}
this.markerThemes=null;
if(_cdb.markerThemes&&_cdb.markerThemes.length){
this.markerThemes=_cdb.markerThemes.slice(0);
}
this.markers=_cdb.markers?dojo.clone(_cdb.markers):dojo.delegate(dojox.charting.Theme.defaultMarkers);
this.noGradConv=_cdb.noGradConv;
this.noRadialConv=_cdb.noRadialConv;
if(_cdb.reverseFills){
this.reverseFills();
}
this._current=0;
this._buildMarkerArray();
},clone:function(){
var _cdc=new dojox.charting.Theme({chart:this.chart,plotarea:this.plotarea,axis:this.axis,series:this.series,marker:this.marker,colors:this.colors,markers:this.markers,seriesThemes:this.seriesThemes,markerThemes:this.markerThemes,noGradConv:this.noGradConv,noRadialConv:this.noRadialConv});
dojo.forEach(["clone","clear","next","skip","addMixin","post","getTick"],function(name){
if(this.hasOwnProperty(name)){
_cdc[name]=this[name];
}
},this);
return _cdc;
},clear:function(){
this._current=0;
},next:function(_cdd,_cde,_cdf){
var _ce0=dojox.lang.utils.merge,_ce1,_ce2;
if(this.colors){
_ce1=dojo.delegate(this.series);
_ce2=dojo.delegate(this.marker);
var _ce3=new dojo.Color(this.colors[this._current%this.colors.length]),old;
if(_ce1.stroke&&_ce1.stroke.color){
_ce1.stroke=dojo.delegate(_ce1.stroke);
old=new dojo.Color(_ce1.stroke.color);
_ce1.stroke.color=new dojo.Color(_ce3);
_ce1.stroke.color.a=old.a;
}else{
_ce1.stroke={color:_ce3};
}
if(_ce2.stroke&&_ce2.stroke.color){
_ce2.stroke=dojo.delegate(_ce2.stroke);
old=new dojo.Color(_ce2.stroke.color);
_ce2.stroke.color=new dojo.Color(_ce3);
_ce2.stroke.color.a=old.a;
}else{
_ce2.stroke={color:_ce3};
}
if(!_ce1.fill||_ce1.fill.type){
_ce1.fill=_ce3;
}else{
old=new dojo.Color(_ce1.fill);
_ce1.fill=new dojo.Color(_ce3);
_ce1.fill.a=old.a;
}
if(!_ce2.fill||_ce2.fill.type){
_ce2.fill=_ce3;
}else{
old=new dojo.Color(_ce2.fill);
_ce2.fill=new dojo.Color(_ce3);
_ce2.fill.a=old.a;
}
}else{
_ce1=this.seriesThemes?_ce0(this.series,this.seriesThemes[this._current%this.seriesThemes.length]):this.series;
_ce2=this.markerThemes?_ce0(this.marker,this.markerThemes[this._current%this.markerThemes.length]):_ce1;
}
var _ce4=_ce2&&_ce2.symbol||this._markers[this._current%this._markers.length];
var _ce5={series:_ce1,marker:_ce2,symbol:_ce4};
++this._current;
if(_cde){
_ce5=this.addMixin(_ce5,_cdd,_cde);
}
if(_cdf){
_ce5=this.post(_ce5,_cdd);
}
return _ce5;
},skip:function(){
++this._current;
},addMixin:function(_ce6,_ce7,_ce8,_ce9){
if(dojo.isArray(_ce8)){
dojo.forEach(_ce8,function(m){
_ce6=this.addMixin(_ce6,_ce7,m);
},this);
}else{
var t={};
if("color" in _ce8){
if(_ce7=="line"||_ce7=="area"){
dojo.setObject("series.stroke.color",_ce8.color,t);
dojo.setObject("marker.stroke.color",_ce8.color,t);
}else{
dojo.setObject("series.fill",_ce8.color,t);
}
}
dojo.forEach(["stroke","outline","shadow","fill","font","fontColor","labelWiring"],function(name){
var _cea="marker"+name.charAt(0).toUpperCase()+name.substr(1),b=_cea in _ce8;
if(name in _ce8){
dojo.setObject("series."+name,_ce8[name],t);
if(!b){
dojo.setObject("marker."+name,_ce8[name],t);
}
}
if(b){
dojo.setObject("marker."+name,_ce8[_cea],t);
}
});
if("marker" in _ce8){
t.symbol=_ce8.marker;
}
_ce6=dojox.lang.utils.merge(_ce6,t);
}
if(_ce9){
_ce6=this.post(_ce6,_ce7);
}
return _ce6;
},post:function(_ceb,_cec){
var fill=_ceb.series.fill,t;
if(!this.noGradConv&&this.shapeSpaces[fill.space]&&fill.type=="linear"){
if(_cec=="bar"){
t={x1:fill.y1,y1:fill.x1,x2:fill.y2,y2:fill.x2};
}else{
if(!this.noRadialConv&&fill.space=="shape"&&(_cec=="slice"||_cec=="circle")){
t={type:"radial",cx:0,cy:0,r:100};
}
}
if(t){
return dojox.lang.utils.merge(_ceb,{series:{fill:t}});
}
}
return _ceb;
},getTick:function(name,_ced){
var tick=this.axis.tick,_cee=name+"Tick";
merge=dojox.lang.utils.merge;
if(tick){
if(this.axis[_cee]){
tick=merge(tick,this.axis[_cee]);
}
}else{
tick=this.axis[_cee];
}
if(_ced){
if(tick){
if(_ced[_cee]){
tick=merge(tick,_ced[_cee]);
}
}else{
tick=_ced[_cee];
}
}
return tick;
},inspectObjects:function(f){
dojo.forEach(["chart","plotarea","axis","series","marker"],function(name){
f(this[name]);
},this);
if(this.seriesThemes){
dojo.forEach(this.seriesThemes,f);
}
if(this.markerThemes){
dojo.forEach(this.markerThemes,f);
}
},reverseFills:function(){
this.inspectObjects(function(o){
if(o&&o.fill){
o.fill=dojox.gfx.gradutils.reverse(o.fill);
}
});
},addMarker:function(name,_cef){
this.markers[name]=_cef;
this._buildMarkerArray();
},setMarkers:function(obj){
this.markers=obj;
this._buildMarkerArray();
},_buildMarkerArray:function(){
this._markers=[];
for(var p in this.markers){
this._markers.push(this.markers[p]);
}
}});
dojo.mixin(dojox.charting.Theme,{defaultMarkers:{CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"},defaultColors:["#54544c","#858e94","#6e767a","#948585","#474747"],defaultTheme:{chart:{stroke:null,fill:"white",pageStyle:null,titleGap:20,titlePos:"top",titleFont:"normal normal bold 14pt Tahoma",titleFontColor:"#333"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},tick:{color:"#666",position:"center",font:"normal normal normal 7pt Tahoma",fontColor:"#333",titleGap:15,titleFont:"normal normal normal 11pt Tahoma",titleFontColor:"#333",titleOrientation:"axis"},majorTick:{width:1,length:6},minorTick:{width:0.8,length:3},microTick:{width:0.5,length:1}},series:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000",labelWiring:{width:1,color:"#ccc"}},marker:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000"}},defineColors:function(_cf0){
_cf0=_cf0||{};
var c=[],n=_cf0.num||5;
if(_cf0.colors){
var l=_cf0.colors.length;
for(var i=0;i<n;i++){
c.push(_cf0.colors[i%l]);
}
return c;
}
if(_cf0.hue){
var s=_cf0.saturation||100;
var st=_cf0.low||30;
var end=_cf0.high||90;
var l=(end+st)/2;
return dojox.color.Palette.generate(dojox.color.fromHsv(_cf0.hue,s,l),"monochromatic").colors;
}
if(_cf0.generator){
return dojox.color.Palette.generate(_cf0.base,_cf0.generator).colors;
}
return c;
},generateGradient:function(_cf1,_cf2,_cf3){
var fill=dojo.delegate(_cf1);
fill.colors=[{offset:0,color:_cf2},{offset:1,color:_cf3}];
return fill;
},generateHslColor:function(_cf4,_cf5){
_cf4=new dojox.color.Color(_cf4);
var hsl=_cf4.toHsl(),_cf6=dojox.color.fromHsl(hsl.h,hsl.s,_cf5);
_cf6.a=_cf4.a;
return _cf6;
},generateHslGradient:function(_cf7,_cf8,_cf9,_cfa){
_cf7=new dojox.color.Color(_cf7);
var hsl=_cf7.toHsl(),_cfb=dojox.color.fromHsl(hsl.h,hsl.s,_cf9),_cfc=dojox.color.fromHsl(hsl.h,hsl.s,_cfa);
_cfb.a=_cfc.a=_cf7.a;
return dojox.charting.Theme.generateGradient(_cf8,_cfb,_cfc);
}});
}
if(!dojo._hasResource["dojox.charting.Series"]){
dojo._hasResource["dojox.charting.Series"]=true;
dojo.provide("dojox.charting.Series");
dojo.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(_cfd,data,_cfe){
dojo.mixin(this,_cfe);
if(typeof this.plot!="string"){
this.plot="default";
}
this.update(data);
},clear:function(){
this.dyn={};
},update:function(data){
if(dojo.isArray(data)){
this.data=data;
}else{
this.source=data;
this.data=this.source.data;
if(this.source.setSeriesObject){
this.source.setSeriesObject(this);
}
}
this.dirty=true;
this.clear();
}});
}
if(!dojo._hasResource["dojox.charting.Chart"]){
dojo._hasResource["dojox.charting.Chart"]=true;
dojo.provide("dojox.charting.Chart");
(function(){
var df=dojox.lang.functional,dc=dojox.charting,g=dojox.gfx,_cff=df.lambda("item.clear()"),_d00=df.lambda("item.purgeGroup()"),_d01=df.lambda("item.destroy()"),_d02=df.lambda("item.dirty = false"),_d03=df.lambda("item.dirty = true"),_d04=df.lambda("item.name");
dojo.declare("dojox.charting.Chart",null,{constructor:function(node,_d05){
if(!_d05){
_d05={};
}
this.margins=_d05.margins?_d05.margins:{l:10,t:10,r:10,b:10};
this.stroke=_d05.stroke;
this.fill=_d05.fill;
this.delayInMs=_d05.delayInMs||200;
this.title=_d05.title;
this.titleGap=_d05.titleGap;
this.titlePos=_d05.titlePos;
this.titleFont=_d05.titleFont;
this.titleFontColor=_d05.titleFontColor;
this.chartTitle=null;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=dojo.byId(node);
var box=dojo.marginBox(node);
this.surface=g.createSurface(this.node,box.w||400,box.h||300);
},destroy:function(){
dojo.forEach(this.series,_d01);
dojo.forEach(this.stack,_d01);
df.forIn(this.axes,_d01);
if(this.chartTitle&&this.chartTitle.tagName){
dojo.destroy(this.chartTitle);
}
this.surface.destroy();
},getCoords:function(){
if(!this.coords){
this.coords=dojo.coords(this.node,true);
}
return this.coords;
},setTheme:function(_d06){
this.theme=_d06.clone();
this.dirty=true;
return this;
},addAxis:function(name,_d07){
var axis,_d08=_d07&&_d07.type||"Default";
if(typeof _d08=="string"){
if(!dc.axis2d||!dc.axis2d[_d08]){
throw Error("Can't find axis: "+_d08+" - didn't you forget to dojo"+".require() it?");
}
axis=new dc.axis2d[_d08](this,_d07);
}else{
axis=new _d08(this,_d07);
}
axis.name=name;
axis.dirty=true;
if(name in this.axes){
this.axes[name].destroy();
}
this.axes[name]=axis;
this.dirty=true;
return this;
},getAxis:function(name){
return this.axes[name];
},removeAxis:function(name){
if(name in this.axes){
this.axes[name].destroy();
delete this.axes[name];
this.dirty=true;
}
return this;
},addPlot:function(name,_d09){
var plot,_d0a=_d09&&_d09.type||"Default";
if(typeof _d0a=="string"){
if(!dc.plot2d||!dc.plot2d[_d0a]){
throw Error("Can't find plot: "+_d0a+" - didn't you forget to dojo"+".require() it?");
}
plot=new dc.plot2d[_d0a](this,_d09);
}else{
plot=new _d0a(this,_d09);
}
plot.name=name;
plot.dirty=true;
if(name in this.plots){
this.stack[this.plots[name]].destroy();
this.stack[this.plots[name]]=plot;
}else{
this.plots[name]=this.stack.length;
this.stack.push(plot);
}
this.dirty=true;
return this;
},removePlot:function(name){
if(name in this.plots){
var _d0b=this.plots[name];
delete this.plots[name];
this.stack[_d0b].destroy();
this.stack.splice(_d0b,1);
df.forIn(this.plots,function(idx,name,_d0c){
if(idx>_d0b){
_d0c[name]=idx-1;
}
});
var ns=dojo.filter(this.series,function(run){
return run.plot!=name;
});
if(ns.length<this.series.length){
dojo.forEach(this.series,function(run){
if(run.plot==name){
run.destroy();
}
});
this.runs={};
dojo.forEach(ns,function(run,_d0d){
this.runs[run.plot]=_d0d;
},this);
this.series=ns;
}
this.dirty=true;
}
return this;
},getPlotOrder:function(){
return df.map(this.stack,_d04);
},setPlotOrder:function(_d0e){
var _d0f={},_d10=df.filter(_d0e,function(name){
if(!(name in this.plots)||(name in _d0f)){
return false;
}
_d0f[name]=1;
return true;
},this);
if(_d10.length<this.stack.length){
df.forEach(this.stack,function(plot){
var name=plot.name;
if(!(name in _d0f)){
_d10.push(name);
}
});
}
var _d11=df.map(_d10,function(name){
return this.stack[this.plots[name]];
},this);
df.forEach(_d11,function(plot,i){
this.plots[plot.name]=i;
},this);
this.stack=_d11;
this.dirty=true;
return this;
},movePlotToFront:function(name){
if(name in this.plots){
var _d12=this.plots[name];
if(_d12){
var _d13=this.getPlotOrder();
_d13.splice(_d12,1);
_d13.unshift(name);
return this.setPlotOrder(_d13);
}
}
return this;
},movePlotToBack:function(name){
if(name in this.plots){
var _d14=this.plots[name];
if(_d14<this.stack.length-1){
var _d15=this.getPlotOrder();
_d15.splice(_d14,1);
_d15.push(name);
return this.setPlotOrder(_d15);
}
}
return this;
},addSeries:function(name,data,_d16){
var run=new dc.Series(this,data,_d16);
run.name=name;
if(name in this.runs){
this.series[this.runs[name]].destroy();
this.series[this.runs[name]]=run;
}else{
this.runs[name]=this.series.length;
this.series.push(run);
}
this.dirty=true;
if(!("ymin" in run)&&"min" in run){
run.ymin=run.min;
}
if(!("ymax" in run)&&"max" in run){
run.ymax=run.max;
}
return this;
},removeSeries:function(name){
if(name in this.runs){
var _d17=this.runs[name];
delete this.runs[name];
this.series[_d17].destroy();
this.series.splice(_d17,1);
df.forIn(this.runs,function(idx,name,runs){
if(idx>_d17){
runs[name]=idx-1;
}
});
this.dirty=true;
}
return this;
},updateSeries:function(name,data){
if(name in this.runs){
var run=this.series[this.runs[name]];
run.update(data);
this._invalidateDependentPlots(run.plot,false);
this._invalidateDependentPlots(run.plot,true);
}
return this;
},getSeriesOrder:function(_d18){
return df.map(df.filter(this.series,function(run){
return run.plot==_d18;
}),_d04);
},setSeriesOrder:function(_d19){
var _d1a,_d1b={},_d1c=df.filter(_d19,function(name){
if(!(name in this.runs)||(name in _d1b)){
return false;
}
var run=this.series[this.runs[name]];
if(_d1a){
if(run.plot!=_d1a){
return false;
}
}else{
_d1a=run.plot;
}
_d1b[name]=1;
return true;
},this);
df.forEach(this.series,function(run){
var name=run.name;
if(!(name in _d1b)&&run.plot==_d1a){
_d1c.push(name);
}
});
var _d1d=df.map(_d1c,function(name){
return this.series[this.runs[name]];
},this);
this.series=_d1d.concat(df.filter(this.series,function(run){
return run.plot!=_d1a;
}));
df.forEach(this.series,function(run,i){
this.runs[run.name]=i;
},this);
this.dirty=true;
return this;
},moveSeriesToFront:function(name){
if(name in this.runs){
var _d1e=this.runs[name],_d1f=this.getSeriesOrder(this.series[_d1e].plot);
if(name!=_d1f[0]){
_d1f.splice(_d1e,1);
_d1f.unshift(name);
return this.setSeriesOrder(_d1f);
}
}
return this;
},moveSeriesToBack:function(name){
if(name in this.runs){
var _d20=this.runs[name],_d21=this.getSeriesOrder(this.series[_d20].plot);
if(name!=_d21[_d21.length-1]){
_d21.splice(_d20,1);
_d21.push(name);
return this.setSeriesOrder(_d21);
}
}
return this;
},resize:function(_d22,_d23){
var box;
switch(arguments.length){
case 1:
box=dojo.mixin({},_d22);
dojo.marginBox(this.node,box);
break;
case 2:
box={w:_d22,h:_d23};
dojo.marginBox(this.node,box);
break;
}
box=dojo.marginBox(this.node);
this.surface.setDimensions(box.w,box.h);
this.dirty=true;
this.coords=null;
return this.render();
},getGeometry:function(){
var ret={};
df.forIn(this.axes,function(axis){
if(axis.initialized()){
ret[axis.name]={name:axis.name,vertical:axis.vertical,scaler:axis.scaler,ticks:axis.ticks};
}
});
return ret;
},setAxisWindow:function(name,_d24,_d25,zoom){
var axis=this.axes[name];
if(axis){
axis.setWindow(_d24,_d25);
dojo.forEach(this.stack,function(plot){
if(plot.hAxis==name||plot.vAxis==name){
plot.zoom=zoom;
}
});
}
return this;
},setWindow:function(sx,sy,dx,dy,zoom){
if(!("plotArea" in this)){
this.calculateGeometry();
}
df.forIn(this.axes,function(axis){
var _d26,_d27,_d28=axis.getScaler().bounds,s=_d28.span/(_d28.upper-_d28.lower);
if(axis.vertical){
_d26=sy;
_d27=dy/s/_d26;
}else{
_d26=sx;
_d27=dx/s/_d26;
}
axis.setWindow(_d26,_d27);
});
dojo.forEach(this.stack,function(plot){
plot.zoom=zoom;
});
return this;
},zoomIn:function(name,_d29){
var axis=this.axes[name];
if(axis){
var _d2a,_d2b,_d2c=axis.getScaler().bounds;
var _d2d=Math.min(_d29[0],_d29[1]);
var _d2e=Math.max(_d29[0],_d29[1]);
_d2d=_d29[0]<_d2c.lower?_d2c.lower:_d2d;
_d2e=_d29[1]>_d2c.upper?_d2c.upper:_d2e;
_d2a=(_d2c.upper-_d2c.lower)/(_d2e-_d2d);
_d2b=_d2d-_d2c.lower;
this.setAxisWindow(name,_d2a,_d2b);
this.render();
}
},calculateGeometry:function(){
if(this.dirty){
return this.fullGeometry();
}
var _d2f=dojo.filter(this.stack,function(plot){
return plot.dirty||(plot.hAxis&&this.axes[plot.hAxis].dirty)||(plot.vAxis&&this.axes[plot.vAxis].dirty);
},this);
_d30(_d2f,this.plotArea);
return this;
},fullGeometry:function(){
this._makeDirty();
dojo.forEach(this.stack,_cff);
if(!this.theme){
this.setTheme(new dojox.charting.Theme(dojox.charting._def));
}
dojo.forEach(this.series,function(run){
if(!(run.plot in this.plots)){
if(!dc.plot2d||!dc.plot2d.Default){
throw Error("Can't find plot: Default - didn't you forget to dojo"+".require() it?");
}
var plot=new dc.plot2d.Default(this,{});
plot.name=run.plot;
this.plots[run.plot]=this.stack.length;
this.stack.push(plot);
}
this.stack[this.plots[run.plot]].addSeries(run);
},this);
dojo.forEach(this.stack,function(plot){
if(plot.hAxis){
plot.setAxis(this.axes[plot.hAxis]);
}
if(plot.vAxis){
plot.setAxis(this.axes[plot.vAxis]);
}
},this);
var dim=this.dim=this.surface.getDimensions();
dim.width=g.normalizedLength(dim.width);
dim.height=g.normalizedLength(dim.height);
df.forIn(this.axes,_cff);
_d30(this.stack,dim);
var _d31=this.offsets={l:0,r:0,t:0,b:0};
df.forIn(this.axes,function(axis){
df.forIn(axis.getOffsets(),function(o,i){
_d31[i]+=o;
});
});
if(this.title){
this.titleGap=(this.titleGap==0)?0:this.titleGap||this.theme.chart.titleGap||20;
this.titlePos=this.titlePos||this.theme.chart.titlePos||"top";
this.titleFont=this.titleFont||this.theme.chart.titleFont;
this.titleFontColor=this.titleFontColor||this.theme.chart.titleFontColor||"black";
var _d32=g.normalizedLength(g.splitFontString(this.titleFont).size);
_d31[this.titlePos=="top"?"t":"b"]+=(_d32+this.titleGap);
}
df.forIn(this.margins,function(o,i){
_d31[i]+=o;
});
this.plotArea={width:dim.width-_d31.l-_d31.r,height:dim.height-_d31.t-_d31.b};
df.forIn(this.axes,_cff);
_d30(this.stack,this.plotArea);
return this;
},render:function(){
if(this.theme){
this.theme.clear();
}
if(this.dirty){
return this.fullRender();
}
this.calculateGeometry();
df.forEachRev(this.stack,function(plot){
plot.render(this.dim,this.offsets);
},this);
df.forIn(this.axes,function(axis){
axis.render(this.dim,this.offsets);
},this);
this._makeClean();
if(this.surface.render){
this.surface.render();
}
return this;
},fullRender:function(){
this.fullGeometry();
var _d33=this.offsets,dim=this.dim,rect;
dojo.forEach(this.series,_d00);
df.forIn(this.axes,_d00);
dojo.forEach(this.stack,_d00);
if(this.chartTitle&&this.chartTitle.tagName){
dojo.destroy(this.chartTitle);
}
this.surface.clear();
this.chartTitle=null;
var t=this.theme,fill=t.plotarea&&t.plotarea.fill,_d34=t.plotarea&&t.plotarea.stroke,rect={x:_d33.l-1,y:_d33.t-1,width:dim.width-_d33.l-_d33.r+2,height:dim.height-_d33.t-_d33.b+2};
if(fill){
fill=dc.Element.prototype._shapeFill(dc.Element.prototype._plotFill(fill,dim,_d33),rect);
this.surface.createRect(rect).setFill(fill);
}
if(_d34){
this.surface.createRect({x:_d33.l,y:_d33.t,width:dim.width-_d33.l-_d33.r+1,height:dim.height-_d33.t-_d33.b+1}).setStroke(_d34);
}
df.foldr(this.stack,function(z,plot){
return plot.render(dim,_d33),0;
},0);
fill=this.fill!==undefined?this.fill:(t.chart&&t.chart.fill);
_d34=this.stroke!==undefined?this.stroke:(t.chart&&t.chart.stroke);
if(fill=="inherit"){
var node=this.node,fill=new dojo.Color(dojo.style(node,"backgroundColor"));
while(fill.a==0&&node!=document.documentElement){
fill=new dojo.Color(dojo.style(node,"backgroundColor"));
node=node.parentNode;
}
}
if(fill){
fill=dc.Element.prototype._plotFill(fill,dim,_d33);
if(_d33.l){
rect={width:_d33.l,height:dim.height+1};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_d33.r){
rect={x:dim.width-_d33.r,width:_d33.r+1,height:dim.height+2};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_d33.t){
rect={width:dim.width+1,height:_d33.t};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_d33.b){
rect={y:dim.height-_d33.b,width:dim.width+1,height:_d33.b+2};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
}
if(_d34){
this.surface.createRect({width:dim.width-1,height:dim.height-1}).setStroke(_d34);
}
if(this.title){
var _d35=(g.renderer=="canvas"),_d36=_d35||!dojo.isIE&&!dojo.isOpera?"html":"gfx",_d37=g.normalizedLength(g.splitFontString(this.titleFont).size);
this.chartTitle=dc.axis2d.common.createText[_d36](this,this.surface,dim.width/2,this.titlePos=="top"?_d37+this.margins.t:dim.height-this.margins.b,"middle",this.title,this.titleFont,this.titleFontColor);
}
df.forIn(this.axes,function(axis){
axis.render(dim,_d33);
});
this._makeClean();
if(this.surface.render){
this.surface.render();
}
return this;
},delayedRender:function(){
if(!this._delayedRenderHandle){
this._delayedRenderHandle=setTimeout(dojo.hitch(this,function(){
clearTimeout(this._delayedRenderHandle);
this._delayedRenderHandle=null;
this.render();
}),this.delayInMs);
}
return this;
},connectToPlot:function(name,_d38,_d39){
return name in this.plots?this.stack[this.plots[name]].connect(_d38,_d39):null;
},fireEvent:function(_d3a,_d3b,_d3c){
if(_d3a in this.runs){
var _d3d=this.series[this.runs[_d3a]].plot;
if(_d3d in this.plots){
var plot=this.stack[this.plots[_d3d]];
if(plot){
plot.fireEvent(_d3a,_d3b,_d3c);
}
}
}
return this;
},_makeClean:function(){
dojo.forEach(this.axes,_d02);
dojo.forEach(this.stack,_d02);
dojo.forEach(this.series,_d02);
this.dirty=false;
},_makeDirty:function(){
dojo.forEach(this.axes,_d03);
dojo.forEach(this.stack,_d03);
dojo.forEach(this.series,_d03);
this.dirty=true;
},_invalidateDependentPlots:function(_d3e,_d3f){
if(_d3e in this.plots){
var plot=this.stack[this.plots[_d3e]],axis,_d40=_d3f?"vAxis":"hAxis";
if(plot[_d40]){
axis=this.axes[plot[_d40]];
if(axis&&axis.dependOnData()){
axis.dirty=true;
dojo.forEach(this.stack,function(p){
if(p[_d40]&&p[_d40]==plot[_d40]){
p.dirty=true;
}
});
}
}else{
plot.dirty=true;
}
}
}});
function _d41(_d42){
return {min:_d42.hmin,max:_d42.hmax};
};
function _d43(_d44){
return {min:_d44.vmin,max:_d44.vmax};
};
function _d45(_d46,h){
_d46.hmin=h.min;
_d46.hmax=h.max;
};
function _d47(_d48,v){
_d48.vmin=v.min;
_d48.vmax=v.max;
};
function _d49(_d4a,_d4b){
if(_d4a&&_d4b){
_d4a.min=Math.min(_d4a.min,_d4b.min);
_d4a.max=Math.max(_d4a.max,_d4b.max);
}
return _d4a||_d4b;
};
function _d30(_d4c,_d4d){
var _d4e={},axes={};
dojo.forEach(_d4c,function(plot){
var _d4f=_d4e[plot.name]=plot.getSeriesStats();
if(plot.hAxis){
axes[plot.hAxis]=_d49(axes[plot.hAxis],_d41(_d4f));
}
if(plot.vAxis){
axes[plot.vAxis]=_d49(axes[plot.vAxis],_d43(_d4f));
}
});
dojo.forEach(_d4c,function(plot){
var _d50=_d4e[plot.name];
if(plot.hAxis){
_d45(_d50,axes[plot.hAxis]);
}
if(plot.vAxis){
_d47(_d50,axes[plot.vAxis]);
}
plot.initializeScalers(_d4d,_d50);
});
};
})();
}
if(!dojo._hasResource["dojox.charting.Chart2D"]){
dojo._hasResource["dojox.charting.Chart2D"]=true;
dojo.provide("dojox.charting.Chart2D");
dojo.deprecated("dojox.charting.Chart2D","Use dojo.charting.Chart instead and require all other components explicitly","2.0");
dojox.charting.Chart2D=dojox.charting.Chart;
}
if(!dojo._hasResource["insight.charting._Extensions"]){
dojo._hasResource["insight.charting._Extensions"]=true;
dojo.provide("insight.charting._Extensions");
(function(){
var df=dojox.lang.functional,dc=dojox.charting,_d51=df.lambda("item.clear()");
dojo.extend(dojox.charting.Chart2D,{destroy:function(){
this._destroyed=true;
},delayedRender:function(_d52){
if(!this._delayedRenderHandle){
this._delayedRenderHandle=setTimeout(dojo.hitch(this,this.render),this.delayInMs);
}else{
if(this._delayedRenderHandle&&_d52){
this.render();
}
}
return this;
},render:function(){
if(this._destroyed){
return this;
}
if(this._delayedRenderHandle){
clearTimeout(this._delayedRenderHandle);
this._delayedRenderHandle=null;
}
if(this.theme){
this.theme.clear();
}
if(this.dirty){
return this.fullRender();
}
this.calculateGeometry();
df.forEachRev(this.stack,function(plot){
plot.render(this.dim,this.offsets);
},this);
df.forIn(this.axes,function(axis){
axis.render(this.dim,this.offsets);
},this);
this._makeClean();
if(this.surface.render){
this.surface.render();
}
return this;
},fullGeometry:function(){
this._makeDirty();
dojo.forEach(this.stack,_d51);
if(!this.theme){
this.setTheme(new dojox.charting.Theme(dojox.charting._def));
}
dojo.forEach(this.series,function(run){
if(!(run.plot in this.plots)){
var plot=new dc.plot2d.Default(this,{});
plot.name=run.plot;
this.plots[run.plot]=this.stack.length;
this.stack.push(plot);
}
this.stack[this.plots[run.plot]].addSeries(run);
},this);
dojo.forEach(this.stack,function(plot){
if(plot.hAxis){
plot.setAxis(this.axes[plot.hAxis]);
}
if(plot.vAxis){
plot.setAxis(this.axes[plot.vAxis]);
}
},this);
var dim=this.dim=this.surface.getDimensions();
dim.width=dojox.gfx.normalizedLength(dim.width);
dim.height=dojox.gfx.normalizedLength(dim.height);
df.forIn(this.axes,_d51);
_d54(this.stack,dim);
var _d53=this.offsets={l:0,r:0,t:0,b:0};
df.forIn(this.axes,function(axis){
df.forIn(axis.getOffsets(),function(o,i){
_d53[i]=Math.max(_d53[i],o);
});
});
df.forIn(this.margins,function(o,i){
_d53[i]+=o;
});
this.plotArea={width:dim.width-_d53.l-_d53.r,height:dim.height-_d53.t-_d53.b};
df.forIn(this.axes,_d51);
_d54(this.stack,this.plotArea);
return this;
}});
function _d55(_d56){
return {min:_d56.hmin,max:_d56.hmax};
};
function _d57(_d58){
return {min:_d58.vmin,max:_d58.vmax};
};
function _d59(_d5a,h){
_d5a.hmin=h.min;
_d5a.hmax=h.max;
};
function _d5b(_d5c,v){
_d5c.vmin=v.min;
_d5c.vmax=v.max;
};
function _d5d(_d5e,_d5f){
if(_d5e&&_d5f){
_d5e.min=Math.min(_d5e.min,_d5f.min);
_d5e.max=Math.max(_d5e.max,_d5f.max);
}
return _d5e||_d5f;
};
function _d54(_d60,_d61){
var _d62={},axes={};
dojo.forEach(_d60,function(plot){
var _d63=_d62[plot.name]=plot.getSeriesStats();
if(plot.hAxis){
axes[plot.hAxis]=_d5d(axes[plot.hAxis],_d55(_d63));
}
if(plot.vAxis){
axes[plot.vAxis]=_d5d(axes[plot.vAxis],_d57(_d63));
}
});
dojo.forEach(_d60,function(plot){
var _d64=_d62[plot.name];
if(plot.hAxis){
_d59(_d64,axes[plot.hAxis]);
}
if(plot.vAxis){
_d5b(_d64,axes[plot.vAxis]);
}
plot.initializeScalers(_d61,_d64);
});
};
})();
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_d65=4,_d66=45;
dojo.extend(dojox.charting.axis2d.Default,{getOffsets:function(){
var s=this.scaler,_d67={l:0,r:0,t:0,b:0};
if(!s){
return _d67;
}
var o=this.opt,_d68=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_d69=0,ma=s.major,mi=s.minor,ta=this.chart.theme.axis,_d6a=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_d6b=this.chart.theme.getTick("major",o),_d6c=this.chart.theme.getTick("minor",o),size=_d6a?g.normalizedLength(g.splitFontString(_d6a).size):0,_d6d=o.rotation%360,_d6e=o.leftBottom,cosr=Math.abs(Math.cos(_d6d*Math.PI/180)),sinr=Math.abs(Math.sin(_d6d*Math.PI/180));
if(_d6d<0){
_d6d+=360;
}
if(size){
if(o.maxLabelSize){
_d68=o.maxLabelSize;
}else{
if(this.labels){
_d68=this._groupLabelWidth(this.labels,_d6a);
}else{
_d68=this._groupLabelWidth([o.majorTicks!==false?gl(ma.start,ma.prec,o):"",o.majorTicks!==false?gl(ma.start+ma.count*ma.tick,ma.prec,o):"",o.minorTicks!==false?gl(mi.start,mi.prec,o):"",o.minorTicks!==false?gl(mi.start+mi.count*mi.tick,mi.prec,o):""],_d6a);
}
}
if(this.vertical){
var side=_d6e?"l":"r";
switch(_d6d){
case 0:
case 180:
_d67[side]=_d68;
_d67.t=_d67.b=size/2;
break;
case 90:
case 270:
_d67[side]=size;
_d67.t=_d67.b=_d68/2;
break;
default:
if(_d6d<=_d66||(180<_d6d&&_d6d<=(180+_d66))){
_d67[side]=size*sinr/2+_d68*cosr;
_d67[_d6e?"t":"b"]=size*cosr/2+_d68*sinr;
_d67[_d6e?"b":"t"]=size*cosr/2;
}else{
if(_d6d>(360-_d66)||(180>_d6d&&_d6d>(180-_d66))){
_d67[side]=size*sinr/2+_d68*cosr;
_d67[_d6e?"b":"t"]=size*cosr/2+_d68*sinr;
_d67[_d6e?"t":"b"]=size*cosr/2;
}else{
if(_d6d<90||(180<_d6d&&_d6d<270)){
_d67[side]=size*sinr+_d68*cosr;
_d67[_d6e?"t":"b"]=size*cosr+_d68*sinr;
}else{
_d67[side]=size*sinr+_d68*cosr;
_d67[_d6e?"b":"t"]=size*cosr+_d68*sinr;
}
}
}
break;
}
_d67[side]+=_d65+Math.max(_d6b.length,_d6c.length);
}else{
var side=_d6e?"b":"t";
switch(_d6d){
case 0:
case 180:
_d67[side]=size;
_d67.l=_d67.r=_d68/2;
break;
case 90:
case 270:
_d67[side]=_d68;
_d67.l=_d67.r=size/2;
break;
default:
if((90-_d66)<=_d6d&&_d6d<=90||(270-_d66)<=_d6d&&_d6d<=270){
_d67[side]=size*sinr/2+_d68*cosr;
_d67[_d6e?"r":"l"]=size*cosr/2+_d68*sinr;
_d67[_d6e?"l":"r"]=size*cosr/2;
}else{
if(90<=_d6d&&_d6d<=(90+_d66)||270<=_d6d&&_d6d<=(270+_d66)){
_d67[side]=size*sinr/2+_d68*cosr;
_d67[_d6e?"l":"r"]=size*cosr/2+_d68*sinr;
_d67[_d6e?"r":"l"]=size*cosr/2;
}else{
if(_d6d<_d66||(180<_d6d&&_d6d<(180-_d66))){
_d67[side]=size*sinr+_d68*cosr;
_d67[_d6e?"r":"l"]=size*cosr+_d68*sinr;
}else{
_d67[side]=size*sinr+_d68*cosr;
_d67[_d6e?"l":"r"]=size*cosr+_d68*sinr;
}
}
}
break;
}
_d67[side]+=_d65+Math.max(_d6b.length,_d6c.length);
}
}
if(_d68){
this._cachedLabelWidth=_d68;
}
return _d67;
}});
})();
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_d6f=df.lambda("item.purgeGroup()");
dojo.extend(dojox.charting.plot2d.Default,{render:function(dim,_d70){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_d70);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_d6f);
this._eventSeries={};
this.cleanGroup();
this.group.setTransform(null);
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_d71,_d72,_d73,_d74,_d75=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
var _d76=t.next(this.opt.areas?"area":"line",[this.opt,run],true),s=run.group,_d77=[],_d78=[],rseg=null,_d79,_d7a,_d7b=null,_d7c=null,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_d7d=this._eventSeries[run.name]=new Array(run.data.length);
for(var j=0;j<run.data.length;j++){
if(run.data[j]!=null){
if(!rseg){
rseg=[];
_d78.push(j);
_d77.push(rseg);
}
rseg.push(run.data[j]);
}else{
rseg=null;
}
}
if(_d77[0]&&typeof _d77[0][0]=="number"){
_d7a=function(v,i){
return {x:ht(i+_d78[seg]+1)+_d70.l,y:dim.height-_d70.b-vt(v)};
};
}else{
_d7a=function(v,i){
return {x:ht(v.x)+_d70.l,y:dim.height-_d70.b-vt(v.y)};
};
}
for(var seg=0;seg<_d77.length;seg++){
_d79=dojo.map(_d77[seg],_d7a,this);
if(seg!=0){
_d7c=[_d7b[_d7b.length-1],_d79[0]];
}
_d7b=_d79;
var _d7e=this.opt.tension?dc.curve(_d79,this.opt.tension):"";
if(this.opt.areas&&_d79.length>1){
var fill=_d76.series.fill;
var _d7f=dojo.clone(_d79);
if(this.opt.tension){
var _d80="L"+_d7f[_d7f.length-1].x+","+(dim.height-_d70.b)+" L"+_d7f[0].x+","+(dim.height-_d70.b)+" L"+_d7f[0].x+","+_d7f[0].y;
run.dyn.fill=s.createPath(_d7e+" "+_d80).setFill(fill).getFill();
}else{
_d7f.push({x:_d79[_d79.length-1].x,y:dim.height-_d70.b});
_d7f.push({x:_d79[0].x,y:dim.height-_d70.b});
_d7f.push(_d79[0]);
run.dyn.fill=s.createPolyline(_d7f).setFill(fill).getFill();
}
}
if(this.opt.lines||this.opt.markers){
_d71=_d76.series.stroke;
_d73=dojo.delegate({style:"dash"},_d71);
if(_d76.series.outline){
_d72=run.dyn.outline=dc.makeStroke(_d76.series.outline);
_d72.width=2*_d72.width+_d71.width;
}
}
if(this.opt.markers){
run.dyn.marker=_d76.symbol;
}
var _d81=null,_d82=null,_d83=null;
if(_d71&&_d76.series.shadow&&_d79.length>1){
var _d84=_d76.series.shadow,_d85=dojo.map(_d79,function(c){
return {x:c.x+_d84.dx,y:c.y+_d84.dy};
});
if(this.opt.lines){
if(this.opt.tension){
run.dyn.shadow=s.createPath(dc.curve(_d85,this.opt.tension)).setStroke(_d84).getStroke();
}else{
run.dyn.shadow=s.createPolyline(_d85).setStroke(_d84).getStroke();
}
}
if(this.opt.markers&&_d76.marker.shadow){
_d84=_d76.marker.shadow;
_d83=dojo.map(_d85,function(c){
return s.createPath("M"+c.x+" "+c.y+" "+_d76.symbol).setStroke(_d84).setFill(_d84.color);
},this);
}
}
if(this.opt.lines&&_d79.length>1){
if(_d72){
if(this.opt.tension){
run.dyn.outline=s.createPath(_d7e).setStroke(_d72).getStroke();
}else{
run.dyn.outline=s.createPolyline(_d79).setStroke(_d72).getStroke();
}
}
if(this.opt.tension){
run.dyn.stroke=s.createPath(_d7e).setStroke(_d71).getStroke();
}else{
run.dyn.stroke=s.createPolyline(_d79).setStroke(_d71).getStroke();
}
}
if(this.opt.lines&&_d7c){
run.dyn.bstroke=s.createPolyline(_d7c).setStroke(_d73).getStroke();
}
if(this.opt.lines&&this.opt.markers&&_d77.length===1&&_d79.length==1){
var path="M"+_d79[0].x+" "+_d79[0].y+" "+_d76.symbol;
if(_d76.marker.outline){
_d72=dc.makeStroke(_d76.marker.outline);
_d72.width=2*_d72.width+(_d76.marker.stroke?_d76.marker.stroke.width:0);
s.createPath(path).setStroke(_d72);
}
s.createPath(path).setStroke(_d71).setFill(_d71.color);
}
if(this.opt.markers){
_d81=new Array(_d79.length);
_d82=new Array(_d79.length);
_d72=null;
if(_d76.marker.outline){
_d72=dc.makeStroke(_d76.marker.outline);
_d72.width=2*_d72.width+(_d76.marker.stroke?_d76.marker.stroke.width:0);
}
dojo.forEach(_d79,function(c,i){
var path="M"+c.x+" "+c.y+" "+_d76.symbol;
if(_d72){
_d82[i]=s.createPath(path).setStroke(_d72);
}
_d81[i]=s.createPath(path).setStroke(_d76.marker.stroke).setFill(_d76.marker.fill);
},this);
if(_d75){
dojo.forEach(_d81,function(s,i){
var o={element:"marker",index:i+_d78[seg],run:run,shape:s,outline:_d82[i]||null,shadow:_d83&&_d83[i]||null,cx:_d79[i].x,cy:_d79[i].y};
if(typeof _d77[seg][0]=="number"){
o.x=i+_d78[seg]+1;
o.y=_d77[seg][i];
}else{
o.x=_d77[seg][i].x;
o.y=_d77[seg][i].y;
}
this._connectEvents(o);
_d7d[i+_d78[seg]]=o;
},this);
}else{
delete this._eventSeries[run.name];
}
if(!run.dyn.stroke){
run.dyn.stroke=_d71;
}
}
}
run.dirty=false;
}
if(this.animate){
var _d86=this.group;
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_d86,duration:DEFAULT_ANIMATION_LENGTH,transform:[{name:"translate",start:[0,dim.height-_d70.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play();
}
this.dirty=false;
return this;
}});
dojo.extend(dojox.charting.plot2d.Bars,{minSize:5,render:function(dim,_d87){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_d87);
}
this.dirty=this.isDirty();
this.resetEvents();
if(this.dirty){
dojo.forEach(this.series,_d6f);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_d88,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_d89=Math.max(0,this._hScaler.bounds.lower),_d8a=ht(_d89),_d8b=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt);
gap=f.gap;
_d88=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _d8c=t.next("bar",[this.opt,run]),s=run.group,_d8d=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _d8e=run.data[j];
if(_d8e!==null){
var v=typeof _d8e=="number"?_d8e:_d8e.y,hv=ht(v),_d8f=hv-_d8a,w=Math.abs(_d8f),_d90=typeof _d8e!="number"?t.addMixin(_d8c,"bar",_d8e,true):t.post(_d8c,"bar");
if(w>0&&_d88>0){
if(w<this.minSize){
hv+=(this.minSize-w)*_d8f/Math.abs(_d8f);
_d8f=hv-_d8a;
w=Math.abs(_d8f);
}
var rect={x:_d87.l+(v<_d89?hv:_d8a),y:dim.height-_d87.b-vt(j+1.5)+gap,width:w,height:_d88};
var _d91=this._plotFill(_d90.series.fill,dim,_d87);
_d91=this._shapeFill(_d91,rect);
var _d92=s.createRect(rect).setFill(_d91).setStroke(_d90.series.stroke);
this.overrideShape(_d92,{index:j,value:v});
var _d93={x:rect.x,y:rect.y,height:rect.height,width:dim.width-_d87.l-_d87.r};
var mask=s.createRect(_d93).setFill(new dojo.Color([0,0,0,0])).setStroke(new dojo.Color([0,0,0,0]));
run.dyn.fill=_d92.getFill();
run.dyn.stroke=_d92.getStroke();
if(_d8b){
var o={element:"bar",index:j,run:run,shape:_d92,eventMask:mask,x:v,y:j+1.5};
this._connectEvents(o);
_d8d[j]=o;
}
if(this.animate){
this._animateBar(_d92,_d87.l+_d8a,-w);
}
}
}
}
this._eventSeries[run.name]=_d8d;
run.dirty=false;
}
this.dirty=false;
return this;
},overrideShape:function(_d94,_d95){
}});
dojo.extend(dojox.charting.plot2d.Columns,{minSize:5,render:function(dim,_d96){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_d96);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_d6f);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_d97,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_d98=Math.max(0,this._vScaler.bounds.lower),_d99=vt(_d98),_d9a=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_d97=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _d9b=t.next("column",[this.opt,run]),s=run.group,_d9c=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _d9d=run.data[j];
if(_d9d!==null){
var v=typeof _d9d=="number"?_d9d:_d9d.y,vv=vt(v),_d9e=vv-_d99,h=Math.abs(_d9e),_d9f=typeof _d9d!="number"?t.addMixin(_d9b,"column",_d9d,true):t.post(_d9b,"column");
if(_d97>0&&h>0){
if(h<this.minSize){
vv+=(this.minSize-h)*_d9e/Math.abs(_d9e);
_d9e=vv-_d99;
h=Math.abs(_d9e);
}
var rect={x:_d96.l+ht(j+0.5)+gap,y:dim.height-_d96.b-(v>_d98?vv:_d99),width:_d97,height:h};
var _da0=this._plotFill(_d9f.series.fill,dim,_d96);
_da0=this._shapeFill(_da0,rect);
var _da1=s.createRect(rect).setFill(_da0).setStroke(_d9f.series.stroke);
this.overrideShape(_da1,{index:j,value:v});
var _da2={x:rect.x,width:rect.width,y:_d96.t,height:dim.height-_d96.t-_d96.b};
var mask=s.createRect(_da2).setFill(new dojo.Color([0,0,0,0])).setStroke(new dojo.Color([0,0,0,0]));
run.dyn.fill=_da1.getFill();
run.dyn.stroke=_da1.getStroke();
if(_d9a){
var o={element:"column",index:j,run:run,shape:_da1,eventMask:mask,x:j+0.5,y:v};
this._connectEvents(o);
_d9c[j]=o;
}
if(this.animate){
this._animateColumn(_da1,dim.height-_d96.b-_d99,h);
}
}
}
}
this._eventSeries[run.name]=_d9c;
run.dirty=false;
}
this.dirty=false;
return this;
},overrideShape:function(_da3,_da4){
}});
dojo.extend(dojox.charting.plot2d.Grid,{render:function(dim,_da5){
if(this.zoom){
return this.performZoom(dim,_da5);
}
this.dirty=this.isDirty();
if(!this.dirty){
return this;
}
this.cleanGroup();
var s=this.group,ta=this.chart.theme.axis;
try{
var _da6=this._vAxis.getScaler(),vt=_da6.scaler.getTransformerFromModel(_da6),_da7=this._vAxis.getTicks();
if(this.opt.hMinorLines){
dojo.forEach(_da7.minor,function(tick){
var y=dim.height-_da5.b-vt(tick.value);
var _da8=s.createLine({x1:_da5.l,y1:y,x2:dim.width-_da5.r,y2:y}).setStroke(ta.minorTickLine||ta.minorTick||ta.line);
if(this.animate){
this._animateGrid(_da8,"h",_da5.l,_da5.r+_da5.l-dim.width);
}
},this);
}
if(this.opt.hMajorLines&&_da7){
dojo.forEach(_da7.major,function(tick){
var y=dim.height-_da5.b-vt(tick.value);
var _da9=s.createLine({x1:_da5.l,y1:y,x2:dim.width-_da5.r,y2:y}).setStroke(ta.majorTickLine||ta.majorTick||ta.line);
if(this.animate){
this._animateGrid(_da9,"h",_da5.l,_da5.r+_da5.l-dim.width);
}
},this);
}
}
catch(e){
}
try{
var _daa=this._hAxis.getScaler(),ht=_daa.scaler.getTransformerFromModel(_daa),_da7=this._hAxis.getTicks();
if(_da7&&this.opt.vMinorLines){
dojo.forEach(_da7.minor,function(tick){
var x=_da5.l+ht(tick.value);
var _dab=s.createLine({x1:x,y1:_da5.t,x2:x,y2:dim.height-_da5.b}).setStroke(ta.minorTickLine||ta.minorTick||ta.line);
if(this.animate){
this._animateGrid(_dab,"v",dim.height-_da5.b,dim.height-_da5.b-_da5.t);
}
},this);
}
if(_da7&&this.opt.vMajorLines){
dojo.forEach(_da7.major,function(tick){
var x=_da5.l+ht(tick.value);
var _dac=s.createLine({x1:x,y1:_da5.t,x2:x,y2:dim.height-_da5.b}).setStroke(ta.majorTickLine||ta.majorTick||ta.line);
if(this.animate){
this._animateGrid(_dac,"v",dim.height-_da5.b,dim.height-_da5.b-_da5.t);
}
},this);
}
}
catch(e){
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.themes.Spring"]){
dojo._hasResource["insight.charting.themes.Spring"]=true;
dojo.provide("insight.charting.themes.Spring");
(function(){
var dc=dojox.charting,t=insight.charting.themes;
t.Spring=new dc.Theme({chart:{stroke:null,fill:"#fff"},plotarea:{stroke:null,fill:"#f0f0f0"},axis:{stroke:{color:"#666",width:1},majorTick:{color:"#666",width:0.5,length:6},majorTickLine:{color:"#fff",width:0.8},minorTick:{color:"#666",width:0.5,length:3},minorTickLine:{color:"#fff",width:0.8},tick:{font:"normal normal normal 12px Tahoma,Arial,sans-serif",fontColor:"#666"}},series:{stroke:{width:1,color:"#666"},fill:new dojo.Color([102,102,102,0.6]),font:"normal normal normal 12px Tahoma,Arial,sans-serif",fontColor:"#333"},marker:{stroke:{width:2,color:new dojo.Color([51,51,51,0])},outline:{color:new dojo.Color([204,204,204,0])},fill:new dojo.Color([102,102,102,0]),font:"normal normal normal 12px Tahoma,Arial,sans-serif",fontColor:"#666"},colors:dc.Theme.defineColors({hue:82,saturation:60,low:40,high:88})});
t.Spring.next=function(_dad,_dae,_daf){
var _db0=dc.Theme.prototype.next.apply(this,arguments);
if(_dad=="line"||_dad=="area"){
_db0.marker.stroke.width=1;
_db0.marker.outline.color=new dojo.Color([255,255,255,0]);
_db0.marker.outline.width=1;
}
return _db0;
};
t.SpringLight=t.Spring.clone();
t.SpringLight.series.fill=new dojo.Color([102,102,102,0.2]);
t.SpringTransparent=t.Spring.clone();
t.SpringTransparent.plotarea.fill=new dojo.Color([240,240,240,0]);
})();
}
if(!dojo._hasResource["dojox.data.QueryReadStore"]){
dojo._hasResource["dojox.data.QueryReadStore"]=true;
dojo.provide("dojox.data.QueryReadStore");
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,_numRows:-1,lastRequestHash:null,doClientPaging:false,doClientSorting:false,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},_labelAttr:"label",constructor:function(_db1){
dojo.mixin(this,_db1);
},getValue:function(item,_db2,_db3){
this._assertIsItem(item);
if(!dojo.isString(_db2)){
throw new Error(this._className+".getValue(): Invalid attribute, string expected!");
}
if(!this.hasAttribute(item,_db2)){
if(_db3){
return _db3;
}
}
return item.i[_db2];
},getValues:function(item,_db4){
this._assertIsItem(item);
var ret=[];
if(this.hasAttribute(item,_db4)){
ret.push(item.i[_db4]);
}
return ret;
},getAttributes:function(item){
this._assertIsItem(item);
var ret=[];
for(var i in item.i){
ret.push(i);
}
return ret;
},hasAttribute:function(item,_db5){
return this.isItem(item)&&typeof item.i[_db5]!="undefined";
},containsValue:function(item,_db6,_db7){
var _db8=this.getValues(item,_db6);
var len=_db8.length;
for(var i=0;i<len;i++){
if(_db8[i]==_db7){
return true;
}
}
return false;
},isItem:function(_db9){
if(_db9){
return typeof _db9.r!="undefined"&&_db9.r==this;
}
return false;
},isItemLoaded:function(_dba){
return this.isItem(_dba);
},loadItem:function(args){
if(this.isItemLoaded(args.item)){
return;
}
},fetch:function(_dbb){
_dbb=_dbb||{};
if(!_dbb.store){
_dbb.store=this;
}
var self=this;
var _dbc=function(_dbd,_dbe){
if(_dbe.onError){
var _dbf=_dbe.scope||dojo.global;
_dbe.onError.call(_dbf,_dbd,_dbe);
}
};
var _dc0=function(_dc1,_dc2,_dc3){
var _dc4=_dc2.abort||null;
var _dc5=false;
var _dc6=_dc2.start?_dc2.start:0;
if(self.doClientPaging==false){
_dc6=0;
}
var _dc7=_dc2.count?(_dc6+_dc2.count):_dc1.length;
_dc2.abort=function(){
_dc5=true;
if(_dc4){
_dc4.call(_dc2);
}
};
var _dc8=_dc2.scope||dojo.global;
if(!_dc2.store){
_dc2.store=self;
}
if(_dc2.onBegin){
_dc2.onBegin.call(_dc8,_dc3,_dc2);
}
if(_dc2.sort&&self.doClientSorting){
_dc1.sort(dojo.data.util.sorter.createSortFunction(_dc2.sort,self));
}
if(_dc2.onItem){
for(var i=_dc6;(i<_dc1.length)&&(i<_dc7);++i){
var item=_dc1[i];
if(!_dc5){
_dc2.onItem.call(_dc8,item,_dc2);
}
}
}
if(_dc2.onComplete&&!_dc5){
var _dc9=null;
if(!_dc2.onItem){
_dc9=_dc1.slice(_dc6,_dc7);
}
_dc2.onComplete.call(_dc8,_dc9,_dc2);
}
};
this._fetchItems(_dbb,_dc0,_dbc);
return _dbb;
},getFeatures:function(){
return this._features;
},close:function(_dca){
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_xhrFetchHandler:function(data,_dcb,_dcc,_dcd){
data=this._filterResponse(data);
if(data.label){
this._labelAttr=data.label;
}
var _dce=data.numRows||-1;
this._items=[];
dojo.forEach(data.items,function(e){
this._items.push({i:e,r:this});
},this);
var _dcf=data.identifier;
this._itemsByIdentity={};
if(_dcf){
this._identifier=_dcf;
var i;
for(i=0;i<this._items.length;++i){
var item=this._items[i].i;
var _dd0=item[_dcf];
if(!this._itemsByIdentity[_dd0]){
this._itemsByIdentity[_dd0]=item;
}else{
throw new Error(this._className+":  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+_dcf+"].  Value collided: ["+_dd0+"]");
}
}
}else{
this._identifier=Number;
for(i=0;i<this._items.length;++i){
this._items[i].n=i;
}
}
_dce=this._numRows=(_dce===-1)?this._items.length:_dce;
_dcc(this._items,_dcb,_dce);
this._numRows=_dce;
},_fetchItems:function(_dd1,_dd2,_dd3){
var _dd4=_dd1.serverQuery||_dd1.query||{};
if(!this.doClientPaging){
_dd4.start=_dd1.start||0;
if(_dd1.count){
_dd4.count=_dd1.count;
}
}
if(!this.doClientSorting&&_dd1.sort){
var _dd5=[];
dojo.forEach(_dd1.sort,function(sort){
if(sort&&sort.attribute){
_dd5.push((sort.descending?"-":"")+sort.attribute);
}
});
_dd4.sort=_dd5.join(",");
}
if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(_dd4)==dojo.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_dd2(this._items,_dd1,this._numRows);
}else{
var _dd6=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var _dd7=_dd6({url:this.url,handleAs:"json-comment-optional",content:_dd4,failOk:true});
_dd1.abort=function(){
_dd7.cancel();
};
_dd7.addCallback(dojo.hitch(this,function(data){
this._xhrFetchHandler(data,_dd1,_dd2,_dd3);
}));
_dd7.addErrback(function(_dd8){
_dd3(_dd8,_dd1);
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},_dd4);
}
},_filterResponse:function(data){
return data;
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this._className+": Invalid item argument.");
}
},_assertIsAttribute:function(_dd9){
if(typeof _dd9!=="string"){
throw new Error(this._className+": Invalid attribute argument ('"+_dd9+"').");
}
},fetchItemByIdentity:function(_dda){
if(this._itemsByIdentity){
var item=this._itemsByIdentity[_dda.identity];
if(!(item===undefined)){
if(_dda.onItem){
var _ddb=_dda.scope?_dda.scope:dojo.global;
_dda.onItem.call(_ddb,{i:item,r:this});
}
return;
}
}
var _ddc=function(_ddd,_dde){
var _ddf=_dda.scope?_dda.scope:dojo.global;
if(_dda.onError){
_dda.onError.call(_ddf,_ddd);
}
};
var _de0=function(_de1,_de2){
var _de3=_dda.scope?_dda.scope:dojo.global;
try{
var item=null;
if(_de1&&_de1.length==1){
item=_de1[0];
}
if(_dda.onItem){
_dda.onItem.call(_de3,item);
}
}
catch(error){
if(_dda.onError){
_dda.onError.call(_de3,error);
}
}
};
var _de4={serverQuery:{id:_dda.identity}};
this._fetchItems(_de4,_de0,_ddc);
},getIdentity:function(item){
var _de5=null;
if(this._identifier===Number){
_de5=item.n;
}else{
_de5=item.i[this._identifier];
}
return _de5;
},getIdentityAttributes:function(item){
return [this._identifier];
}});
}
if(!dojo._hasResource["insight.runtime"]){
dojo._hasResource["insight.runtime"]=true;
dojo.provide("insight.runtime");
insight.runtime.getXhrTimeout=function(name){
return 8000;
};
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_de6,_de7){
_de7=dojo.mixin({},_de7||{});
var _de8=dojo.i18n.normalizeLocale(_de7.locale),_de9=dojo.i18n.getLocalization("dojo.cldr","number",_de8);
_de7.customs=_de9;
var _dea=_de7.pattern||_de9[(_de7.type||"decimal")+"Format"];
if(isNaN(_de6)||Math.abs(_de6)==Infinity){
return null;
}
return dojo.number._applyPattern(_de6,_dea,_de7);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_deb,_dec,_ded){
_ded=_ded||{};
var _dee=_ded.customs.group,_def=_ded.customs.decimal,_df0=_dec.split(";"),_df1=_df0[0];
_dec=_df0[(_deb<0)?1:0]||("-"+_df1);
if(_dec.indexOf("%")!=-1){
_deb*=100;
}else{
if(_dec.indexOf("‰")!=-1){
_deb*=1000;
}else{
if(_dec.indexOf("¤")!=-1){
_dee=_ded.customs.currencyGroup||_dee;
_def=_ded.customs.currencyDecimal||_def;
_dec=_dec.replace(/\u00a4{1,3}/,function(_df2){
var prop=["symbol","currency","displayName"][_df2.length-1];
return _ded[prop]||_ded.currency||"";
});
}else{
if(_dec.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _df3=dojo.number._numberPatternRE;
var _df4=_df1.match(_df3);
if(!_df4){
throw new Error("unable to find a number expression in pattern: "+_dec);
}
if(_ded.fractional===false){
_ded.places=0;
}
return _dec.replace(_df3,dojo.number._formatAbsolute(_deb,_df4[0],{decimal:_def,group:_dee,places:_ded.places,round:_ded.round}));
};
dojo.number.round=function(_df5,_df6,_df7){
var _df8=10/(_df7||10);
return (_df8*+_df5).toFixed(_df6)/_df8;
};
if((0.9).toFixed()==0){
(function(){
var _df9=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _df9(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_dfa,_dfb,_dfc){
_dfc=_dfc||{};
if(_dfc.places===true){
_dfc.places=0;
}
if(_dfc.places===Infinity){
_dfc.places=6;
}
var _dfd=_dfb.split("."),_dfe=typeof _dfc.places=="string"&&_dfc.places.indexOf(","),_dff=_dfc.places;
if(_dfe){
_dff=_dfc.places.substring(_dfe+1);
}else{
if(!(_dff>=0)){
_dff=(_dfd[1]||[]).length;
}
}
if(!(_dfc.round<0)){
_dfa=dojo.number.round(_dfa,_dff,_dfc.round);
}
var _e00=String(Math.abs(_dfa)).split("."),_e01=_e00[1]||"";
if(_dfd[1]||_dfc.places){
if(_dfe){
_dfc.places=_dfc.places.substring(0,_dfe);
}
var pad=_dfc.places!==undefined?_dfc.places:(_dfd[1]&&_dfd[1].lastIndexOf("0")+1);
if(pad>_e01.length){
_e00[1]=dojo.string.pad(_e01,pad,"0",true);
}
if(_dff<_e01.length){
_e00[1]=_e01.substr(0,_dff);
}
}else{
if(_e00[1]){
_e00.pop();
}
}
var _e02=_dfd[0].replace(",","");
pad=_e02.indexOf("0");
if(pad!=-1){
pad=_e02.length-pad;
if(pad>_e00[0].length){
_e00[0]=dojo.string.pad(_e00[0],pad);
}
if(_e02.indexOf("#")==-1){
_e00[0]=_e00[0].substr(_e00[0].length-pad);
}
}
var _e03=_dfd[0].lastIndexOf(","),_e04,_e05;
if(_e03!=-1){
_e04=_dfd[0].length-_e03-1;
var _e06=_dfd[0].substr(0,_e03);
_e03=_e06.lastIndexOf(",");
if(_e03!=-1){
_e05=_e06.length-_e03-1;
}
}
var _e07=[];
for(var _e08=_e00[0];_e08;){
var off=_e08.length-_e04;
_e07.push((off>0)?_e08.substr(off):_e08);
_e08=(off>0)?_e08.slice(0,off):"";
if(_e05){
_e04=_e05;
delete _e05;
}
}
_e00[0]=_e07.reverse().join(_dfc.group||",");
return _e00.join(_dfc.decimal||".");
};
dojo.number.regexp=function(_e09){
return dojo.number._parseInfo(_e09).regexp;
};
dojo.number._parseInfo=function(_e0a){
_e0a=_e0a||{};
var _e0b=dojo.i18n.normalizeLocale(_e0a.locale),_e0c=dojo.i18n.getLocalization("dojo.cldr","number",_e0b),_e0d=_e0a.pattern||_e0c[(_e0a.type||"decimal")+"Format"],_e0e=_e0c.group,_e0f=_e0c.decimal,_e10=1;
if(_e0d.indexOf("%")!=-1){
_e10/=100;
}else{
if(_e0d.indexOf("‰")!=-1){
_e10/=1000;
}else{
var _e11=_e0d.indexOf("¤")!=-1;
if(_e11){
_e0e=_e0c.currencyGroup||_e0e;
_e0f=_e0c.currencyDecimal||_e0f;
}
}
}
var _e12=_e0d.split(";");
if(_e12.length==1){
_e12.push("-"+_e12[0]);
}
var re=dojo.regexp.buildGroupRE(_e12,function(_e13){
_e13="(?:"+dojo.regexp.escapeString(_e13,".")+")";
return _e13.replace(dojo.number._numberPatternRE,function(_e14){
var _e15={signed:false,separator:_e0a.strict?_e0e:[_e0e,""],fractional:_e0a.fractional,decimal:_e0f,exponent:false},_e16=_e14.split("."),_e17=_e0a.places;
if(_e16.length==1&&_e10!=1){
_e16[1]="###";
}
if(_e16.length==1||_e17===0){
_e15.fractional=false;
}else{
if(_e17===undefined){
_e17=_e0a.pattern?_e16[1].lastIndexOf("0")+1:Infinity;
}
if(_e17&&_e0a.fractional==undefined){
_e15.fractional=true;
}
if(!_e0a.places&&(_e17<_e16[1].length)){
_e17+=","+_e16[1].length;
}
_e15.places=_e17;
}
var _e18=_e16[0].split(",");
if(_e18.length>1){
_e15.groupSize=_e18.pop().length;
if(_e18.length>1){
_e15.groupSize2=_e18.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_e15)+")";
});
},true);
if(_e11){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_e19,_e1a,_e1b,_e1c){
var prop=["symbol","currency","displayName"][_e1b.length-1],_e1d=dojo.regexp.escapeString(_e0a[prop]||_e0a.currency||"");
_e1a=_e1a?"[\\s\\xa0]":"";
_e1c=_e1c?"[\\s\\xa0]":"";
if(!_e0a.strict){
if(_e1a){
_e1a+="*";
}
if(_e1c){
_e1c+="*";
}
return "(?:"+_e1a+_e1d+_e1c+")?";
}
return _e1a+_e1d+_e1c;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_e0e,decimal:_e0f,factor:_e10};
};
dojo.number.parse=function(_e1e,_e1f){
var info=dojo.number._parseInfo(_e1f),_e20=(new RegExp("^"+info.regexp+"$")).exec(_e1e);
if(!_e20){
return NaN;
}
var _e21=_e20[1];
if(!_e20[1]){
if(!_e20[2]){
return NaN;
}
_e21=_e20[2];
info.factor*=-1;
}
_e21=_e21.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _e21*info.factor;
};
dojo.number._realNumberRegexp=function(_e22){
_e22=_e22||{};
if(!("places" in _e22)){
_e22.places=Infinity;
}
if(typeof _e22.decimal!="string"){
_e22.decimal=".";
}
if(!("fractional" in _e22)||/^0/.test(_e22.places)){
_e22.fractional=[true,false];
}
if(!("exponent" in _e22)){
_e22.exponent=[true,false];
}
if(!("eSigned" in _e22)){
_e22.eSigned=[true,false];
}
var _e23=dojo.number._integerRegexp(_e22),_e24=dojo.regexp.buildGroupRE(_e22.fractional,function(q){
var re="";
if(q&&(_e22.places!==0)){
re="\\"+_e22.decimal;
if(_e22.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_e22.places+"}";
}
}
return re;
},true);
var _e25=dojo.regexp.buildGroupRE(_e22.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_e22.eSigned})+")";
}
return "";
});
var _e26=_e23+_e24;
if(_e24){
_e26="(?:(?:"+_e26+")|(?:"+_e24+"))";
}
return _e26+_e25;
};
dojo.number._integerRegexp=function(_e27){
_e27=_e27||{};
if(!("signed" in _e27)){
_e27.signed=[true,false];
}
if(!("separator" in _e27)){
_e27.separator="";
}else{
if(!("groupSize" in _e27)){
_e27.groupSize=3;
}
}
var _e28=dojo.regexp.buildGroupRE(_e27.signed,function(q){
return q?"[-+]":"";
},true);
var _e29=dojo.regexp.buildGroupRE(_e27.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=dojo.regexp.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_e27.groupSize,grp2=_e27.groupSize2;
if(grp2){
var _e2a="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_e2a+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_e2a;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _e28+_e29;
};
}
if(!dojo._hasResource["insight.charting.Chart"]){
dojo._hasResource["insight.charting.Chart"]=true;
dojo.provide("insight.charting.Chart");
dojo.declare("insight.charting.ChartStore",dojox.data.QueryReadStore,{_data:null,_loading:false,_deferedRequests:null,_xhrArgs:null,constructor:function(_e2b){
this.inherited(arguments);
this._xhrArgs={};
this._xhrArgs.timeout=_e2b.timeout||insight.runtime.getXhrTimeout("Chart");
this._xhrArgs.error=function(_e2c,_e2d){
dojo.publish("error/xhr",[_e2c,_e2d,_e2d.args.uid]);
};
this.url=this.urlTemplate.build(this.urlParams);
delete this.urlParams;
},getValue:function(){
var _e2e=this.inherited(arguments);
return _e2e!=null?_e2e:null;
},_fetchItems:function(_e2f,_e30,_e31){
_e2f.uid=this._generateUid();
if(this._loading){
this._deferedRequests.push({request:_e2f,fetchHandler:_e30,errorHandler:_e31});
}else{
if(this._data){
this._xhrFetchHandler(this._data,_e2f,_e30,_e31);
}else{
this._loading=true;
this._deferedRequests=[];
this._fetchItemsInternal(_e2f,_e30,this._wrapErrorHandler(_e31));
}
}
},_fetchItemsInternal:function(_e32,_e33,_e34){
var _e35=_e32.serverQuery||_e32.query||{};
if(!this.doClientPaging){
_e35.start=_e32.start||0;
if(_e32.count){
_e35.count=_e32.count;
}
}
if(!this.doClientSorting&&_e32.sort){
var _e36=[];
dojo.forEach(_e32.sort,function(sort){
if(sort&&sort.attribute){
_e36.push((sort.descending?"-":"")+sort.attribute);
}
});
_e35.sort=_e36.join(",");
}
if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(_e35)==dojo.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_e33(this._items,_e32,this._numRows);
}else{
var _e37=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var _e38=_e37(dojo.delegate({url:this.url,handleAs:"json-comment-optional",content:_e35,uid:_e32.uid},this._xhrArgs));
_e38.addCallback(dojo.hitch(this,function(data){
this._xhrFetchHandler(data,_e32,_e33,_e34);
}));
_e38.addErrback(function(_e39){
_e34(_e39,_e32);
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},_e35);
}
},_xhrFetchHandler:function(data,_e3a,_e3b,_e3c){
var _e3d=this.getInherited(arguments);
this._data=data;
this._loading=false;
_e3d.call(this,data,_e3a,_e3b,this._wrapErrorHandler(_e3c));
dojo.forEach(this._deferedRequests,function(o){
_e3d.call(this,data,o.request,o.fetchHandler,this._wrapErrorHandler(o.errorHandler));
},this);
this._deferedRequests=null;
},_wrapErrorHandler:function(_e3e){
if(_e3e){
var _e3f=this;
return function(){
_e3f._storeError.apply(this,arguments);
_e3e.apply(this,arguments);
};
}else{
return this._xhrError;
}
},_storeError:function(_e40,_e41){
dojo.publish("error/store",["Unable to return requested data",_e41.store.chart+"-"+_e41.store.name,_e41.uid]);
},_generateUid:function(){
return new Date().getTime()+":"+Math.floor(Math.random()*1000);
},setUrl:function(_e42,_e43){
this.urlTemplate=_e42||this.urlTemplate;
this.url=this.urlTemplate.build(_e43);
this._reset();
},_reset:function(){
this._data=null;
this._items=[];
this._itemsByIdentity=null;
this._numRows=-1;
}});
dojo.declare("insight.charting.Chart",dijit._Widget,{theme:insight.charting.themes.Spring,chart:null,stores:null,dataPoints:30,actions:null,gridHLines:true,gridVLines:true,margins:{l:10,t:10,r:10,b:10},_destroyed:false,postCreate:function(){
this.inherited(arguments);
this._responseTimeLabelFunc=dojo.hitch(this,this._responseTimeLabelFunc);
this._throughputLabelFunc=dojo.hitch(this,this._throughputLabelFunc);
this._errorRateLabelFunc=dojo.hitch(this,this._errorRateLabelFunc);
this._healthLabelFunc=dojo.hitch(this,this._healthLabelFunc);
this.stores={};
this.urlParams={};
this.actions={};
if(this.url){
this.addStore("main",this.url);
delete this.url;
}
this.chart=new dojox.charting.Chart2D(this.domNode,{margins:this.margins});
this.chart.parent=this;
this.chart.setTheme(this.theme);
this.chart.addPlot("grid",{type:dojox.charting.plot2d.Grid,hMajorLines:this.gridHLines,vMajorLines:this.gridVLines,vMinorLines:this.gridVLines});
this.subscribe("window/resize",this.resizeToFit);
this.connect(this,"onChartElementMouseOver",function(_e44){
Insight.pause(true);
});
this.connect(this,"onChartElementMouseOut",function(_e45){
Insight.play(true);
});
},startup:function(){
this.inherited(arguments);
this.chart.movePlotToBack("grid");
this.chart.render();
this.dims=this._dimensions(this.domNode);
},destroy:function(_e46){
this._destroyed=true;
dojox.lang.functional.forIn(this.actions,function(a){
a.destroy();
},this);
this.chart.destroy();
delete this.chart;
delete this.actions;
delete this.stores;
this.inherited(arguments);
},destroyed:function(){
return this._destroyed;
},resizeToFit:function(){
if(!this.dims){
return;
}
var dims=this._dimensions(this.domNode);
if(!(dims.w==this.dims.w&&dims.h==this.dims.h)){
this.chart.resize(dims.w,dims.h);
}
this.dims=dims;
},_dimensions:function(_e47){
return {w:dojo.contentBox(_e47.parentNode).w,h:parseInt(dojo.style(this.domNode,"height"))};
},addPlotAction:function(plot,_e48,args){
var a=new _e48(this.chart,plot,args);
this.actions[a.declaredClass+"."+plot]=a;
},getPlotAction:function(plot,_e49){
return this.actions[_e49+"."+plot];
},addStore:function(name,url){
this.stores[name]=new insight.charting.ChartStore({urlTemplate:url,urlParams:this._urlParams(name),name:name,chart:this.id});
},_store:function(_e4a){
return dojo.isString(_e4a)?this.stores[_e4a]:_e4a;
},refresh:function(){
if(this._destroyed){
return;
}
if(this.chart._delayedRenderHandle){
if(!this._delayedRenderHandle){
this._delayedRenderHandle=setTimeout(dojo.hitch(this,this.refresh),100);
}
return;
}
if(this._delayedRenderHandle){
clearTimeout(this._delayedRenderHandle);
this._delayedRenderHandle=null;
}
this.chart.delayedRender();
this.chart._makeDirty();
dojox.lang.functional.forIn(this.stores,function(_e4b,name){
var _e4c=false;
_e4b.setUrl(null,this._urlParams(name));
_e4b.fetch({scope:this,onComplete:function(){
if(this._destroyed||_e4c){
return;
}
_e4c=true;
dojo.forEach(this.chart.series,function(_e4d){
if(_e4d.source&&_e4d.source.fetch&&(_e4d.store==name||(!_e4d.store&&name=="main"))){
_e4d.source.fetch();
}
},this);
this.chart.render();
}});
},this);
},_urlParams:function(_e4e){
return dojo.mixin({dataPoints:this.dataPoints},this.urlParams.all,this.urlParams[_e4e]);
},urlParam:function(name,_e4f,_e50){
if(!_e50){
_e50="all";
}
if(!this.urlParams[_e50]){
this.urlParams[_e50]={};
}
this.urlParams[_e50][name]=_e4f;
return this;
},_registerChartEvents:function(_e51){
this.chart.connectToPlot(_e51,this,function(_e52){
if(_e52.type=="onmouseover"){
this.onChartElementMouseOver(_e52);
}else{
if(_e52.type=="onmouseout"){
this.onChartElementMouseOut(_e52);
}else{
if(_e52.type=="onclick"){
this.onChartElementClick(_e52);
}else{
if(_e52.type=="onplotreset"){
this.onChartPlotReset(_e52);
}
}
}
}
});
},onChartElementMouseOver:dijit._connectOnUseEventHandler,onChartElementMouseOut:dijit._connectOnUseEventHandler,onChartElementClick:dijit._connectOnUseEventHandler,onChartPlotReset:dijit._connectOnUseEventHandler,_responseTimeLabelFunc:function(text,_e53,_e54,axis){
if(!text){
return "unknown";
}
axis=this.chart.getAxis(axis||"y");
if(axis.scaler.bounds.upper<=1000){
return Math.floor(_e53)+" ms";
}else{
var _e54=(axis.scaler.major.tick/100)%10==0?0:1;
return dojo.number.format(_e53/1000,{places:_e54})+" s";
}
},_throughputLabelFunc:function(text,_e55,_e56,axis){
axis=this.chart.getAxis(axis||"y");
var _e56=axis.scaler.bounds.upper<=10?1:0;
return dojo.number.format(_e55,{places:_e56})+" tpm";
},_errorRateLabelFunc:function(text,_e57,_e58,axis){
return dojo.number.format(_e57,{type:"percent",places:2});
},_healthLabelFunc:function(text,_e59,_e5a,axis){
var _e5b;
if(isNaN(_e59)||_e59===null){
return "no sample";
}else{
if(_e59>=0.94){
_e5b="excellent";
}else{
if(_e59>=0.85){
_e5b="good";
}else{
if(_e59>=0.7){
_e5b="fair";
}else{
if(_e59>=0.5){
_e5b="poor";
}else{
_e5b="unacceptable";
}
}
}
}
}
return _e5b;
}});
}
if(!dojo._hasResource["insight.charting.action2d.FillHighlight"]){
dojo._hasResource["insight.charting.action2d.FillHighlight"]=true;
dojo.provide("insight.charting.action2d.FillHighlight");
(function(){
var _e5c=100,_e5d=75,_e5e=50,c=dojox.color,cc=function(_e5f){
return function(){
return _e5f;
};
},hl=function(_e60){
var a=new c.Color(_e60),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=_e5c;
if(x.l<_e5e){
x.l=_e5d;
}else{
if(x.l>_e5d){
x.l=_e5e;
}else{
x.l=x.l-_e5e>_e5d-x.l?_e5e:_e5d;
}
}
}
return c.fromHsl(x);
};
dojo.declare("insight.charting.action2d.FillHighlight",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut},optionalParams:{highlight:"red"},constructor:function(_e61,plot,_e62){
var a=_e62&&_e62.highlight;
this.colorFun=a?(dojo.isFunction(a)?a:cc(a)):hl;
this.connect();
},process:function(o){
if(!o.shape||!(o.type in this.overOutEvents||o.originalEvent in this.overOutEvents)){
return;
}
dojo.forEach(o.plot.series,function(_e63){
var i=o.plot._eventSeries[_e63.name]&&o.plot._eventSeries[_e63.name][o.index];
if(i){
this._process(dojo.delegate(o,{run:i.run,shape:i.shape}));
}
},this);
},_process:function(o){
var _e64=o.run.name,_e65=o.index,anim,_e66,_e67;
if(_e64 in this.anim){
anim=this.anim[_e64][_e65];
}else{
this.anim[_e64]={};
}
if(anim){
anim.action.stop(true);
}else{
var _e68=o.shape.getFill();
if(!_e68||!(_e68 instanceof dojo.Color)){
return;
}
this.anim[_e64][_e65]=anim={start:_e68,end:this.colorFun(_e68)};
}
var _e69=anim.start,end=anim.end;
if(o.type=="onmouseout"||o.originalEvent=="onmouseout"){
var t=_e69;
_e69=end;
end=t;
}
anim.action=dojox.gfx.fx.animateFill({shape:o.shape,duration:this.duration,easing:this.easing,color:{start:_e69,end:end}});
if(o.type=="onmouseout"||o.originalEvent=="onmouseout"){
var _e6a=dojo.connect(anim.action,"onEnd",this,function(){
dojo.disconnect(_e6a);
if(this.anim[_e64]){
delete this.anim[_e64][_e65];
}
});
}
anim.action.play();
}});
})();
}
if(!dojo._hasResource["insight.charting.action2d.PointerHover"]){
dojo._hasResource["insight.charting.action2d.PointerHover"]=true;
dojo.provide("insight.charting.action2d.PointerHover");
(function(){
dojo.declare("insight.charting.action2d.PointerHover",dojox.charting.action2d.Base,{defaultParams:{cursor:"pointer"},constructor:function(_e6b,plot,_e6c){
_e6c=_e6c||{};
this.cursor=_e6c.cursor||this.defaultParams.cursor;
this.connect();
},process:function(o){
if(!o.eventMask){
return;
}
var rn=o.eventMask.getNode();
if(!rn.getAttribute("cursor")){
rn.setAttribute("cursor",this.cursor);
}
}});
})();
}
if(!dojo._hasResource["dijit.Tooltip"]){
dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" dojoAttachPoint=\"connectorNode\"></div\n></div>\n"),postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_e6d,_e6e,_e6f,rtl){
if(this.aroundNode&&this.aroundNode===_e6e){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_e6d;
var pos=dijit.placeOnScreenAroundElement(this.domNode,_e6e,dijit.getPopupAroundAlignment((_e6f&&_e6f.length)?_e6f:dijit.Tooltip.defaultPosition,!rtl),dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_e6e;
},orient:function(node,_e70,_e71,_e72,_e73){
this.connectorNode.style.top="";
var _e74=_e72.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_e70+"-"+_e71];
this.domNode.style.width="auto";
var size=dojo.contentBox(this.domNode);
var _e75=Math.min((Math.max(_e74,1)),size.w);
var _e76=_e75<size.w;
this.domNode.style.width=_e75+"px";
if(_e76){
this.containerNode.style.overflow="auto";
var _e77=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_e77>_e75){
_e77=_e77+dojo.style(this.domNode,"paddingLeft")+dojo.style(this.domNode,"paddingRight");
this.domNode.style.width=_e77+"px";
}
}
if(_e71.charAt(0)=="B"&&_e70.charAt(0)=="B"){
var mb=dojo.marginBox(node);
var _e78=this.connectorNode.offsetHeight;
if(mb.h>_e72.h){
var _e79=_e72.h-(_e73.h/2)-(_e78/2);
this.connectorNode.style.top=_e79+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_e73.h/2-_e78/2,0),mb.h-_e78)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_e74);
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_e7a){
if(this._onDeck&&this._onDeck[1]==_e7a){
this._onDeck=null;
}else{
if(this.aroundNode===_e7a){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_e7b,_e7c,_e7d,rtl){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_e7b,_e7c,_e7d,rtl);
};
dijit.hideTooltip=function(_e7e){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_e7e);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_e7f){
dojo.forEach(this._connections||[],function(_e80){
dojo.forEach(_e80,dojo.hitch(this,"disconnect"));
},this);
var ary=dojo.isArrayLike(_e7f)?_e7f:(_e7f?[_e7f]:[]);
this._connections=dojo.map(ary,function(id){
var node=dojo.byId(id);
return node?[this.connect(node,"onmouseenter","_onTargetMouseEnter"),this.connect(node,"onmouseleave","_onTargetMouseLeave"),this.connect(node,"onfocus","_onTargetFocus"),this.connect(node,"onblur","_onTargetBlur")]:[];
},this);
this._set("connectId",_e7f);
this._connectIds=ary;
},addTarget:function(node){
var id=node.id||node;
if(dojo.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=dojo.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
dojo.forEach(dojo.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onTargetMouseEnter:function(e){
this._onHover(e);
},_onTargetMouseLeave:function(e){
this._onUnHover(e);
},_onTargetFocus:function(e){
this._focus=true;
this._onHover(e);
},_onTargetBlur:function(e){
this._focus=false;
this._onUnHover(e);
},_onHover:function(e){
if(!this._showTimer){
var _e81=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_e81);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_e82){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_e82,this.position,!this.isLeftToRight());
this._connectNode=_e82;
this.onShow(_e82,this.position);
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(_e83,_e84){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
dijit.Tooltip.defaultPosition=["after","before"];
}
if(!dojo._hasResource["dojox.lang.functional.scan"]){
dojo._hasResource["dojox.lang.functional.scan"]=true;
dojo.provide("dojox.lang.functional.scan");
(function(){
var d=dojo,df=dojox.lang.functional,_e85={};
d.mixin(df,{scanl:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,i;
if(d.isArray(a)){
t=new Array((n=a.length)+1);
t[0]=z;
for(i=0;i<n;z=f.call(o,z,a[i],i,a),t[++i]=z){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
t=[z];
for(i=0;a.hasNext();t.push(z=f.call(o,z,a.next(),i++,a))){
}
}else{
t=[z];
for(i in a){
if(!(i in _e85)){
t.push(z=f.call(o,z,a[i],i,a));
}
}
}
}
return t;
},scanl1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,z,_e86=true;
if(d.isArray(a)){
t=new Array(n=a.length);
t[0]=z=a[0];
for(var i=1;i<n;t[i]=z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
if(a.hasNext()){
t=[z=a.next()];
for(var i=1;a.hasNext();t.push(z=f.call(o,z,a.next(),i++,a))){
}
}
}else{
for(var i in a){
if(!(i in _e85)){
if(_e86){
t=[z=a[i]];
_e86=false;
}else{
t.push(z=f.call(o,z,a[i],i,a));
}
}
}
}
}
return t;
},scanr:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n+1),i=n;
t[n]=z;
for(;i>0;--i,z=f.call(o,z,a[i],i,a),t[i]=z){
}
return t;
},scanr1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n),z=a[n-1],i=n-1;
t[i]=z;
for(;i>0;--i,z=f.call(o,z,a[i],i,a),t[i]=z){
}
return t;
}});
})();
}
if(!dojo._hasResource["insight.charting.action2d.Tooltip"]){
dojo._hasResource["insight.charting.action2d.Tooltip"]=true;
dojo.provide("insight.charting.action2d.Tooltip");
(function(){
var _e87=function(o){
var t=o.run&&o.run.data&&o.run.data[o.index];
if(t&&typeof t!="number"&&(t.tooltip||t.text)){
return t.tooltip||t.text;
}
if(o.element=="candlestick"){
return "<table cellpadding=\"1\" cellspacing=\"0\" border=\"0\" style=\"font-size:0.9em;\">"+"<tr><td>Open:</td><td align=\"right\"><strong>"+o.data.open+"</strong></td></tr>"+"<tr><td>High:</td><td align=\"right\"><strong>"+o.data.high+"</strong></td></tr>"+"<tr><td>Low:</td><td align=\"right\"><strong>"+o.data.low+"</strong></td></tr>"+"<tr><td>Close:</td><td align=\"right\"><strong>"+o.data.close+"</strong></td></tr>"+(o.data.mid!==undefined?"<tr><td>Mid:</td><td align=\"right\"><strong>"+o.data.mid+"</strong></td></tr>":"")+"</table>";
}
return o.element=="bar"?o.x:o.y;
};
var df=dojox.lang.functional,pi4=Math.PI/4,pi2=Math.PI/2;
dojo.declare("insight.charting.action2d.Tooltip",dojox.charting.action2d.Base,{defaultParams:{text:_e87},optionalParams:{},constructor:function(_e88,plot,_e89){
this.text=_e89&&_e89.text?_e89.text:_e87;
this.connect();
},process:function(o){
if(o.type==="onplotreset"||o.type==="onmouseout"){
dijit.hideTooltip(this.aroundRect);
this.aroundRect=null;
return;
}
if(!o.shape||o.type!=="onmouseover"){
return;
}
var _e8a={type:"rect"},_e8b=["after","before"];
switch(o.element){
case "marker":
_e8a.x=o.cx;
_e8a.y=o.cy;
_e8a.width=_e8a.height=1;
break;
case "circle":
_e8a.x=o.cx-o.cr;
_e8a.y=o.cy-o.cr;
_e8a.width=_e8a.height=2*o.cr;
break;
case "column":
_e8b=["below","above"];
_e8a=dojo.clone(o.shape.getShape());
break;
case "bar":
_e8b=["before","after"];
_e8a=dojo.clone(o.shape.getShape());
break;
case "candlestick":
_e8a.x=o.x;
_e8a.y=o.y;
_e8a.width=o.width;
_e8a.height=o.height;
break;
default:
if(!this.angles){
if(typeof o.run.data[0]=="number"){
this.angles=df.map(df.scanl(o.run.data,"+",0),"* 2 * Math.PI / this",df.foldl(o.run.data,"+",0));
}else{
this.angles=df.map(df.scanl(o.run.data,"a + b.y",0),"* 2 * Math.PI / this",df.foldl(o.run.data,"a + b.y",0));
}
}
var _e8c=(this.angles[o.index]+this.angles[o.index+1])/2;
_e8a.x=o.cx+o.cr*Math.cos(_e8c);
_e8a.y=o.cy+o.cr*Math.sin(_e8c);
_e8a.width=_e8a.height=1;
if(_e8c<pi4){
}else{
if(_e8c<pi2+pi4){
_e8b=["below","above"];
}else{
if(_e8c<Math.PI+pi4){
_e8b=["before","after"];
}else{
if(_e8c<2*Math.PI-pi4){
_e8b=["above","below"];
}
}
}
}
break;
}
var lt=dojo.coords(this.chart.node,true);
_e8a.x+=lt.x;
_e8a.y+=lt.y;
_e8a.x=Math.round(_e8a.x);
_e8a.y=Math.round(_e8a.y);
_e8a.width=Math.ceil(_e8a.width);
_e8a.height=Math.ceil(_e8a.height);
this.aroundRect=_e8a;
dijit.showTooltip(this.text(o),this.aroundRect,_e8b);
}});
})();
}
if(!dojo._hasResource["dojo.date"]){
dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.getObject("date",true,dojo);
dojo.date.getDaysInMonth=function(_e8d){
var _e8e=_e8d.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_e8e==1&&dojo.date.isLeapYear(_e8d)){
return 29;
}
return days[_e8e];
};
dojo.date.isLeapYear=function(_e8f){
var year=_e8f.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
dojo.date.getTimezoneName=function(_e90){
var str=_e90.toString();
var tz="";
var _e91;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_e91=str.match(pat))){
tz=_e91[1];
}else{
str=_e90.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_e91=str.match(pat))){
tz=_e91[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_e92,_e93,_e94){
_e92=new Date(+_e92);
_e93=new Date(+(_e93||new Date()));
if(_e94=="date"){
_e92.setHours(0,0,0,0);
_e93.setHours(0,0,0,0);
}else{
if(_e94=="time"){
_e92.setFullYear(0,0,0);
_e93.setFullYear(0,0,0);
}
}
if(_e92>_e93){
return 1;
}
if(_e92<_e93){
return -1;
}
return 0;
};
dojo.date.add=function(date,_e95,_e96){
var sum=new Date(+date);
var _e97=false;
var _e98="Date";
switch(_e95){
case "day":
break;
case "weekday":
var days,_e99;
var mod=_e96%5;
if(!mod){
days=(_e96>0)?5:-5;
_e99=(_e96>0)?((_e96-5)/5):((_e96+5)/5);
}else{
days=mod;
_e99=parseInt(_e96/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_e96>0){
adj=1;
}else{
if(strt==0&&_e96<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_e96>0)?2:-2;
}
_e96=(7*_e99)+days+adj;
break;
case "year":
_e98="FullYear";
_e97=true;
break;
case "week":
_e96*=7;
break;
case "quarter":
_e96*=3;
case "month":
_e97=true;
_e98="Month";
break;
default:
_e98="UTC"+_e95.charAt(0).toUpperCase()+_e95.substring(1)+"s";
}
if(_e98){
sum["set"+_e98](sum["get"+_e98]()+_e96);
}
if(_e97&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_e9a,_e9b,_e9c){
_e9b=_e9b||new Date();
_e9c=_e9c||"day";
var _e9d=_e9b.getFullYear()-_e9a.getFullYear();
var _e9e=1;
switch(_e9c){
case "quarter":
var m1=_e9a.getMonth();
var m2=_e9b.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_e9d*4);
_e9e=q2-q1;
break;
case "weekday":
var days=Math.round(dojo.date.difference(_e9a,_e9b,"day"));
var _e9f=parseInt(dojo.date.difference(_e9a,_e9b,"week"));
var mod=days%7;
if(mod==0){
days=_e9f*5;
}else{
var adj=0;
var aDay=_e9a.getDay();
var bDay=_e9b.getDay();
_e9f=parseInt(days/7);
mod=days%7;
var _ea0=new Date(_e9a);
_ea0.setDate(_ea0.getDate()+(_e9f*7));
var _ea1=_ea0.getDay();
if(days>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_ea1+mod)>5:
adj=-2;
}
}else{
if(days<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_ea1+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_e9f*2);
}
_e9e=days;
break;
case "year":
_e9e=_e9d;
break;
case "month":
_e9e=(_e9b.getMonth()-_e9a.getMonth())+(_e9d*12);
break;
case "week":
_e9e=parseInt(dojo.date.difference(_e9a,_e9b,"day")/7);
break;
case "day":
_e9e/=24;
case "hour":
_e9e/=60;
case "minute":
_e9e/=60;
case "second":
_e9e/=1000;
case "millisecond":
_e9e*=_e9b.getTime()-_e9a.getTime();
}
return Math.round(_e9e);
};
}
if(!dojo._hasResource["dojo.cldr.supplemental"]){
dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_ea2){
var _ea3={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _ea4=dojo.cldr.supplemental._region(_ea2);
var dow=_ea3[_ea4];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_ea5){
_ea5=dojo.i18n.normalizeLocale(_ea5);
var tags=_ea5.split("-");
var _ea6=tags[1];
if(!_ea6){
_ea6={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_ea6.length==4){
_ea6=tags[2];
}
}
return _ea6;
};
dojo.cldr.supplemental.getWeekend=function(_ea7){
var _ea8={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _ea9={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _eaa=dojo.cldr.supplemental._region(_ea7);
var _eab=_ea8[_eaa];
var end=_ea9[_eaa];
if(_eab===undefined){
_eab=6;
}
if(end===undefined){
end=0;
}
return {start:_eab,end:end};
};
}
if(!dojo._hasResource["dojo.date.locale"]){
dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.getObject("date.locale",true,dojo);
(function(){
function _eac(_ead,_eae,_eaf,_eb0){
return _eb0.replace(/([a-z])\1*/ig,function(_eb1){
var s,pad,c=_eb1.charAt(0),l=_eb1.length,_eb2=["abbr","wide","narrow"];
switch(c){
case "G":
s=_eae[(l<4)?"eraAbbr":"eraNames"][_ead.getFullYear()<0?0:1];
break;
case "y":
s=_ead.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_eaf.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_ead.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_ead.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _eb3=["months","format",_eb2[l-3]].join("-");
s=_eae[_eb3][m];
}
break;
case "w":
var _eb4=0;
s=dojo.date.locale._getWeekOfYear(_ead,_eb4);
pad=true;
break;
case "d":
s=_ead.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_ead);
pad=true;
break;
case "E":
var d=_ead.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _eb5=["days","format",_eb2[l-3]].join("-");
s=_eae[_eb5][d];
}
break;
case "a":
var _eb6=(_ead.getHours()<12)?"am":"pm";
s=_eaf[_eb6]||_eae["dayPeriods-format-wide-"+_eb6];
break;
case "h":
case "H":
case "K":
case "k":
var h=_ead.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_ead.getMinutes();
pad=true;
break;
case "s":
s=_ead.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_ead.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_ead,true,_eaf);
if(s){
break;
}
l=4;
case "Z":
var _eb7=dojo.date.locale._getZone(_ead,false,_eaf);
var tz=[(_eb7<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_eb7)/60),2),dojo.string.pad(Math.abs(_eb7)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_eb0);
}
if(pad){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_eb8,_eb9,_eba){
if(_eb9){
return dojo.date.getTimezoneName(_eb8);
}else{
return _eb8.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_ebb,_ebc){
_ebc=_ebc||{};
var _ebd=dojo.i18n.normalizeLocale(_ebc.locale),_ebe=_ebc.formatLength||"short",_ebf=dojo.date.locale._getGregorianBundle(_ebd),str=[],_ec0=dojo.hitch(this,_eac,_ebb,_ebf,_ebc);
if(_ebc.selector=="year"){
return _ec1(_ebf["dateFormatItem-yyyy"]||"yyyy",_ec0);
}
var _ec2;
if(_ebc.selector!="date"){
_ec2=_ebc.timePattern||_ebf["timeFormat-"+_ebe];
if(_ec2){
str.push(_ec1(_ec2,_ec0));
}
}
if(_ebc.selector!="time"){
_ec2=_ebc.datePattern||_ebf["dateFormat-"+_ebe];
if(_ec2){
str.push(_ec1(_ec2,_ec0));
}
}
return str.length==1?str[0]:_ebf["dateTimeFormat-"+_ebe].replace(/\{(\d+)\}/g,function(_ec3,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_ec4){
return dojo.date.locale._parseInfo(_ec4).regexp;
};
dojo.date.locale._parseInfo=function(_ec5){
_ec5=_ec5||{};
var _ec6=dojo.i18n.normalizeLocale(_ec5.locale),_ec7=dojo.date.locale._getGregorianBundle(_ec6),_ec8=_ec5.formatLength||"short",_ec9=_ec5.datePattern||_ec7["dateFormat-"+_ec8],_eca=_ec5.timePattern||_ec7["timeFormat-"+_ec8],_ecb;
if(_ec5.selector=="date"){
_ecb=_ec9;
}else{
if(_ec5.selector=="time"){
_ecb=_eca;
}else{
_ecb=_ec7["dateTimeFormat-"+_ec8].replace(/\{(\d+)\}/g,function(_ecc,key){
return [_eca,_ec9][key];
});
}
}
var _ecd=[],re=_ec1(_ecb,dojo.hitch(this,_ece,_ecd,_ec7,_ec5));
return {regexp:re,tokens:_ecd,bundle:_ec7};
};
dojo.date.locale.parse=function(_ecf,_ed0){
var _ed1=/[\u200E\u200F\u202A\u202E]/g,info=dojo.date.locale._parseInfo(_ed0),_ed2=info.tokens,_ed3=info.bundle,re=new RegExp("^"+info.regexp.replace(_ed1,"")+"$",info.strict?"":"i"),_ed4=re.exec(_ecf&&_ecf.replace(_ed1,""));
if(!_ed4){
return null;
}
var _ed5=["abbr","wide","narrow"],_ed6=[1970,0,1,0,0,0,0],amPm="",_ed7=dojo.every(_ed4,function(v,i){
if(!i){
return true;
}
var _ed8=_ed2[i-1];
var l=_ed8.length;
switch(_ed8.charAt(0)){
case "y":
if(l!=2&&_ed0.strict){
_ed6[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_ed9=year.substring(0,2)*100,_eda=Math.min(Number(year.substring(2,4))+20,99),num=(v<_eda)?_ed9+v:_ed9-100+v;
_ed6[0]=num;
}else{
if(_ed0.strict){
return false;
}
_ed6[0]=v;
}
}
break;
case "M":
if(l>2){
var _edb=_ed3["months-format-"+_ed5[l-3]].concat();
if(!_ed0.strict){
v=v.replace(".","").toLowerCase();
_edb=dojo.map(_edb,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_edb,v);
if(v==-1){
return false;
}
}else{
v--;
}
_ed6[1]=v;
break;
case "E":
case "e":
var days=_ed3["days-format-"+_ed5[l-3]].concat();
if(!_ed0.strict){
v=v.toLowerCase();
days=dojo.map(days,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_ed6[1]=0;
case "d":
_ed6[2]=v;
break;
case "a":
var am=_ed0.am||_ed3["dayPeriods-format-wide-am"],pm=_ed0.pm||_ed3["dayPeriods-format-wide-pm"];
if(!_ed0.strict){
var _edc=/\./g;
v=v.replace(_edc,"").toLowerCase();
am=am.replace(_edc,"").toLowerCase();
pm=pm.replace(_edc,"").toLowerCase();
}
if(_ed0.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_ed6[3]=v;
break;
case "m":
_ed6[4]=v;
break;
case "s":
_ed6[5]=v;
break;
case "S":
_ed6[6]=v;
}
return true;
});
var _edd=+_ed6[3];
if(amPm==="p"&&_edd<12){
_ed6[3]=_edd+12;
}else{
if(amPm==="a"&&_edd==12){
_ed6[3]=0;
}
}
var _ede=new Date(_ed6[0],_ed6[1],_ed6[2],_ed6[3],_ed6[4],_ed6[5],_ed6[6]);
if(_ed0.strict){
_ede.setFullYear(_ed6[0]);
}
var _edf=_ed2.join(""),_ee0=_edf.indexOf("d")!=-1,_ee1=_edf.indexOf("M")!=-1;
if(!_ed7||(_ee1&&_ede.getMonth()>_ed6[1])||(_ee0&&_ede.getDate()>_ed6[2])){
return null;
}
if((_ee1&&_ede.getMonth()<_ed6[1])||(_ee0&&_ede.getDate()<_ed6[2])){
_ede=dojo.date.add(_ede,"hour",1);
}
return _ede;
};
function _ec1(_ee2,_ee3,_ee4,_ee5){
var _ee6=function(x){
return x;
};
_ee3=_ee3||_ee6;
_ee4=_ee4||_ee6;
_ee5=_ee5||_ee6;
var _ee7=_ee2.match(/(''|[^'])+/g),_ee8=_ee2.charAt(0)=="'";
dojo.forEach(_ee7,function(_ee9,i){
if(!_ee9){
_ee7[i]="";
}else{
_ee7[i]=(_ee8?_ee4:_ee3)(_ee9.replace(/''/g,"'"));
_ee8=!_ee8;
}
});
return _ee5(_ee7.join(""));
};
function _ece(_eea,_eeb,_eec,_eed){
_eed=dojo.regexp.escapeString(_eed);
if(!_eec.strict){
_eed=_eed.replace(" a"," ?a");
}
return _eed.replace(/([a-z])\1*/ig,function(_eee){
var s,c=_eee.charAt(0),l=_eee.length,p2="",p3="";
if(_eec.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p3+"[1-9][0-9]|"+p2+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_eec.am||_eeb["dayPeriods-format-wide-am"],pm=_eec.pm||_eeb["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_eec.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_eea){
_eea.push(_eee);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _eef=[];
dojo.date.locale.addCustomFormats=function(_ef0,_ef1){
_eef.push({pkg:_ef0,name:_ef1});
};
dojo.date.locale._getGregorianBundle=function(_ef2){
var _ef3={};
dojo.forEach(_eef,function(desc){
var _ef4=dojo.i18n.getLocalization(desc.pkg,desc.name,_ef2);
_ef3=dojo.mixin(_ef3,_ef4);
},this);
return _ef3;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_ef5,_ef6){
var _ef7,_ef8=dojo.date.locale._getGregorianBundle(_ef6),_ef9=[item,_ef5,type];
if(_ef5=="standAlone"){
var key=_ef9.join("-");
_ef7=_ef8[key];
if(_ef7[0]==1){
_ef7=undefined;
}
}
_ef9[1]="format";
return (_ef7||_ef8[_ef9.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_efa,_efb){
var _efc=dojo.cldr.supplemental.getWeekend(_efb),day=(_efa||new Date()).getDay();
if(_efc.end<_efc.start){
_efc.end+=7;
if(day<_efc.start){
day+=7;
}
}
return day>=_efc.start&&day<=_efc.end;
};
dojo.date.locale._getDayOfYear=function(_efd){
return dojo.date.difference(new Date(_efd.getFullYear(),0,1,_efd.getHours()),_efd)+1;
};
dojo.date.locale._getWeekOfYear=function(_efe,_eff){
if(arguments.length==1){
_eff=0;
}
var _f00=new Date(_efe.getFullYear(),0,1).getDay(),adj=(_f00-_eff+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_efe)+adj-1)/7);
if(_f00==_eff){
week++;
}
return week;
};
}
if(!dojo._hasResource["insight.time"]){
dojo._hasResource["insight.time"]=true;
dojo.provide("insight.time");
insight.time.toDate=function(_f01){
return dojo.date.locale.parse(_f01,{datePattern:"yyyy-MM-dd'T'HH:mm:ssZ",selector:"date"});
};
insight.time.toString=function(date){
return dojo.date.locale.format(date,{datePattern:"yyyy-MM-dd'T'HH:mm:ssZ",selector:"date"});
};
insight.time.normalizeToDate=function(date){
if(date instanceof Date){
return date;
}else{
if(date=="now"){
return new Date();
}else{
if(typeof date=="string"||date instanceof String){
return this.toDate(date);
}
}
}
return null;
};
insight.time.normalizeToString=function(date){
if(typeof date=="string"||date instanceof String){
return date;
}else{
if(date instanceof Date){
return this.toString(date);
}else{
return null;
}
}
};
insight.time.difference=function(_f02,_f03){
return dojo.date.difference(_f02,_f03,"millisecond");
};
insight.time.add=function(date,_f04){
return dojo.date.add(date,"millisecond",_f04);
};
insight.time.compare=function(_f05,_f06){
_f05=this.normalizeToDate(_f05);
_f06=this.normalizeToDate(_f06);
return dojo.date.compare(_f05,_f06);
};
insight.time.labels=function(_f07,end,_f08,_f09){
_f07=this.normalizeToDate(_f07);
end=this.normalizeToDate(end);
var _f0a={};
if(_f08){
_f0a.start=insight.time.relativeLabel(dojo.date.difference(end,_f07,"minute"));
_f0a.end=insight.time.relativeLabel(0);
}else{
var _f0b=(_f09||dojo.date.difference(_f07,end,"millisecond"))/(60*1000),_f0c=dojo.date.locale._getGregorianBundle(dojo.i18n.normalizeLocale()),_f0d,_f0e,_f0f;
if(_f0b<6*60){
_f0d="";
_f0e=_f0c["timeFormat-medium"];
_f0f="time";
}else{
if(_f0b<12*60){
_f0d=_f0c["dateFormat-short"];
_f0e=_f0c["timeFormat-medium"];
}else{
_f0d=_f0c["dateFormat-short"];
_f0e=_f0c["timeFormat-short"];
}
}
_f0a.start=dojo.date.locale.format(_f07,{datePattern:_f0d,timePattern:_f0e,selector:_f0f,fullYear:true});
_f0a.end=dojo.date.locale.format(end,{datePattern:_f0d,timePattern:_f0e,selector:_f0f,fullYear:true});
}
return _f0a;
};
insight.time.relativeLabel=function(_f10){
var past=_f10<0;
_f10=Math.abs(_f10);
if(_f10==0){
return "Live";
}
var _f11=Math.floor(_f10/60);
var _f12=_f10%60;
var _f13="";
if(_f11>0){
_f13=_f11+" hour";
if(_f11!=1){
_f13+="s";
}
_f13+=" ";
}
if(_f12>0){
_f13+=_f12+" minute";
if(_f12!=1){
_f13+="s";
}
}
_f13+=past?" ago":" from now";
return _f13;
};
insight.time.shortLabel=function(_f14,abbr){
var _f15="",_f16,days,_f17,_f18;
if(_f14===0){
return "now";
}
_f16=Math.floor(_f14/insight.time.millis.week);
_f14-=_f16*insight.time.millis.week;
if(_f16>0){
_f15+=_f16+(abbr?"w ":(_f16>1?" weeks ":" week "));
}
days=Math.floor(_f14/insight.time.millis.day);
_f14-=days*insight.time.millis.day;
if(days>0){
_f15+=days+(abbr?"d ":(days>1?" days ":" day "));
}
_f17=Math.floor(_f14/insight.time.millis.hour);
_f14-=_f17*insight.time.millis.hour;
if(_f17>0){
_f15+=_f17+(abbr?"h ":(_f17>1?" hours ":" hour "));
}
_f18=Math.floor(_f14/insight.time.millis.minute);
_f14-=_f18*insight.time.millis.minute;
if(_f18>0){
_f15+=_f18+(abbr?"m ":(_f18>1?" minutes ":" minute "));
}
return dojo.string.trim(_f15);
};
insight.time.millis={week:604800000,day:86400000,hour:3600000,minute:60000,second:1000};
dojo.date.locale.parse=function(_f19,_f1a){
var info=dojo.date.locale._parseInfo(_f1a),_f1b=info.tokens,_f1c=info.bundle,re=new RegExp("^"+info.regexp+"$",info.strict?"":"i"),_f1d=re.exec(_f19);
if(!_f1d){
return null;
}
var _f1e=["abbr","wide","narrow"],_f1f=[1970,0,1,0,0,0,0],amPm="",_f20,_f21=dojo.every(_f1d,function(v,i){
if(!i){
return true;
}
var _f22=_f1b[i-1];
var l=_f22.length;
switch(_f22.charAt(0)){
case "y":
if(l!=2&&_f1a.strict){
_f1f[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_f23=year.substring(0,2)*100,_f24=Math.min(Number(year.substring(2,4))+20,99),num=(v<_f24)?_f23+v:_f23-100+v;
_f1f[0]=num;
}else{
if(_f1a.strict){
return false;
}
_f1f[0]=v;
}
}
break;
case "M":
if(l>2){
var _f25=_f1c["months-format-"+_f1e[l-3]].concat();
if(!_f1a.strict){
v=v.replace(".","").toLowerCase();
_f25=dojo.map(_f25,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_f25,v);
if(v==-1){
return false;
}
}else{
v--;
}
_f1f[1]=v;
break;
case "E":
case "e":
var days=_f1c["days-format-"+_f1e[l-3]].concat();
if(!_f1a.strict){
v=v.toLowerCase();
days=dojo.map(days,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_f1f[1]=0;
case "d":
_f1f[2]=v;
break;
case "a":
var am=_f1a.am||_f1c["dayPeriods-format-wide-am"],pm=_f1a.pm||_f1c["dayPeriods-format-wide-pm"];
if(!_f1a.strict){
var _f26=/\./g;
v=v.replace(_f26,"").toLowerCase();
am=am.replace(_f26,"").toLowerCase();
pm=pm.replace(_f26,"").toLowerCase();
}
if(_f1a.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_f1f[3]=v;
break;
case "m":
_f1f[4]=v;
break;
case "s":
_f1f[5]=v;
break;
case "S":
_f1f[6]=v;
break;
case "Z":
if(v==="Z"){
break;
}
if(v.indexOf("GMT")===0){
v=v.substring(3);
}
_f20=(v.charAt(0)==="-")?-1:1;
_f20*=parseInt(v.substring(1,3),10)*60;
v=(v.charAt(3)===":")?v.substring(4):v.substring(3);
if(v.length===2){
if(_f20<0){
_f20-=parseInt(v,10);
}else{
_f20+=parseInt(v,10);
}
}
break;
}
return true;
});
var _f27=+_f1f[3];
if(amPm==="p"&&_f27<12){
_f1f[3]=_f27+12;
}else{
if(amPm==="a"&&_f27==12){
_f1f[3]=0;
}
}
var _f28=new Date(_f1f[0],_f1f[1],_f1f[2],_f1f[3],_f1f[4],_f1f[5],_f1f[6]);
if(_f1a.strict){
_f28.setFullYear(_f1f[0]);
}
var _f29=_f1b.join(""),_f2a=_f29.indexOf("d")!=-1,_f2b=_f29.indexOf("M")!=-1;
if(!_f21||(_f2b&&_f28.getMonth()>_f1f[1])||(_f2a&&_f28.getDate()>_f1f[2])){
return null;
}
if((_f2b&&_f28.getMonth()<_f1f[1])||(_f2a&&_f28.getDate()<_f1f[2])){
_f28=dojo.date.add(_f28,"hour",1);
}
if(_f20){
_f28=dojo.date.add(_f28,"minute",_f20+new Date().getTimezoneOffset());
}
return _f28;
};
}
if(!dojo._hasResource["insight.charting.axis2d.TimeRange"]){
dojo._hasResource["insight.charting.axis2d.TimeRange"]=true;
dojo.provide("insight.charting.axis2d.TimeRange");
(function(){
var dc=dojox.charting,df=dojox.lang.functional,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_f2c=4;
dojo.declare("insight.charting.axis2d.TimeRange",dojox.charting.axis2d.Default,{constructor:function(_f2d,_f2e){
_f2e.timeRange=_f2e.timeRange||null;
_f2e.relative=_f2e.relative||false;
_f2e.includeZero=_f2e.includeZero||true;
_f2e.minorLabels=_f2e.minorLabels||false;
_f2e.minorTickStep=_f2e.minorTickStep||1;
this.inherited(arguments);
this.opt.timeRange=_f2e.timeRange||null;
this.opt.relative=_f2e.relative||false;
},setTimeRange:function(_f2f,_f30){
this.opt.timeRange=_f2f;
this.dirty=true;
if(!_f30){
this.render(this.chart.dim,this.chart.offsets);
}
},setRelative:function(_f31){
this.opt.relative=_f31;
this.dirty=true;
this.render(this.chart.dim,this.chart.offsets);
},render:function(dim,_f32){
if(!this.dirty){
return this;
}
var o=this.opt;
var _f33,stop,_f34,_f35,_f36,ta=this.chart.theme.axis,_f37=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_f38=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_f39=this.chart.theme.getTick("major",o),_f3a=this.chart.theme.getTick("minor",o),_f3b=this.chart.theme.getTick("micro",o),_f3c=Math.max(_f39.length,_f3a.length,_f3b.length),_f3d="stroke" in o?o.stroke:ta.stroke,size=_f37?g.normalizedLength(g.splitFontString(_f37).size):0;
if(this.vertical){
_f33={y:dim.height-_f32.b};
stop={y:_f32.t};
_f34={x:0,y:-1};
if(o.leftBottom){
_f33.x=stop.x=_f32.l;
_f35={x:-1,y:0};
}else{
_f33.x=stop.x=dim.width-_f32.r;
_f35={x:1,y:0};
}
_f36={x:_f35.x*(_f3c+_f2c),y:size*0.4};
}else{
_f33={x:_f32.l};
stop={x:dim.width-_f32.r};
_f34={x:1,y:0};
if(o.leftBottom){
_f33.y=stop.y=dim.height-_f32.b;
_f35={x:0,y:1};
_f36={y:_f3c+_f2c+size};
}else{
_f33.y=stop.y=_f32.t;
_f35={x:0,y:-1};
_f36={y:-_f3c-_f2c};
}
_f36.x=0;
}
this.cleanGroup();
try{
var s=this.group,c=this.scaler,t=this.ticks,f=lin.getTransformerFromModel(this.scaler),_f3e=(dojox.gfx.renderer=="canvas"),_f3f=_f3e||this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",dx=_f35.x*_f39.length,dy=_f35.y*_f39.length,elem,_f40=insight.time.labels(this.opt.timeRange.getStartDate(),this.opt.timeRange.getEndDate(),this.opt.relative);
s.createLine({x1:_f33.x,y1:_f33.y,x2:stop.x,y2:stop.y}).setStroke(_f3d);
s.createLine({x1:_f33.x,y1:_f33.y,x2:_f33.x+dx,y2:_f33.y+dy}).setStroke(_f39);
elem=dc.axis2d.common.createText[_f3f](this.chart,s,_f33.x+_f36.x,_f33.y+_f36.y,this.vertical?"middle":"start",_f40.start,_f37,_f38);
if(_f3f=="html"){
this.htmlElements.push(elem);
}
s.createLine({x1:stop.x,y1:stop.y,x2:stop.x+dx,y2:stop.y+dy}).setStroke(_f39);
elem=dc.axis2d.common.createText[_f3f](this.chart,s,stop.x+_f36.x,stop.y+_f36.y,this.vertical?"middle":"end",_f40.end,_f37,_f38);
if(_f3f=="html"){
this.htmlElements.push(elem);
}
dx=_f35.x*_f3a.length;
dy=_f35.y*_f3a.length;
function _f41(tick){
var _f42=f(tick.value),elem,x=_f33.x+_f34.x*_f42,y=_f33.y+_f34.y*_f42;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_f3a);
};
if(t){
dojo.forEach(t.major,_f41,this);
dojo.forEach(t.minor,_f41,this);
}
}
catch(e){
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.plot2d.BackgroundColumns"]){
dojo._hasResource["insight.charting.plot2d.BackgroundColumns"]=true;
dojo.provide("insight.charting.plot2d.BackgroundColumns");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_f43=df.lambda("item.purgeGroup()");
dojo.declare("insight.charting.plot2d.BackgroundColumns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{},constructor:function(_f44,_f45){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_f45);
du.updateWithPattern(this.opt,_f45,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
return dc.collectSimpleStats(this.series);
},render:function(dim,_f46){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_f46);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_f43);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_f47,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),_f48=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_f47=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var s=run.group,_f49=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _f4a=run.data[j];
if(_f4a!==null){
var rect={x:_f46.l+ht(j+0.5)+gap,y:_f46.t,width:_f47,height:dim.height-_f46.t-_f46.b};
var _f4b=new dojo.Color(t.plotarea.fill);
_f4b.a=0;
var _f4c=s.createRect(rect).setFill(_f4b).setStroke(_f4b);
run.dyn.fill=_f4c.getFill();
run.dyn.stroke=_f4c.getStroke();
if(_f48){
var o={element:"column",index:j,run:run,shape:_f4c,x:j+0.5,y:0};
this._connectEvents(o);
_f49[j]=o;
}
}
}
this._eventSeries[run.name]=_f49;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.time.TimeRange"]){
dojo._hasResource["insight.time.TimeRange"]=true;
dojo.provide("insight.time.TimeRange");
dojo.declare("insight.time.TimeRange",null,{start:null,end:null,anchored:true,constructor:function(_f4d){
var _f4e,end,_f4f,_f50,_f51;
if(dojo.isString(_f4d)){
if(_f4d.indexOf("@")===-1){
end=new Date();
_f4f=parseInt(_f4d);
_f50=false;
}else{
end=insight.time.toDate(_f4d.split("@")[1]);
_f4f=parseInt(_f4d.split("@")[0]);
_f50=true;
}
}else{
_f4e=insight.time.normalizeToDate(_f4d.start);
end=insight.time.normalizeToDate(_f4d.end);
_f4f=_f4d.duration;
_f50=_f4d.anchored;
}
if(_f4e&&end){
this.start=_f4e;
this.end=end;
_f4f=insight.time.difference(_f4e,end);
}else{
if(_f4e&&_f4f){
this.start=_f4e;
this.end=insight.time.add(_f4e,_f4f);
}else{
if(end&&_f4f){
this.end=end;
this.start=insight.time.add(end,_f4f*-1);
}else{
if(_f4f){
this.end=new Date();
this.start=insight.time.add(this.end,_f4f*-1);
}
}
}
}
if(_f50!==undefined){
this.anchored=_f50;
}
},clone:function(_f52){
return new insight.time.TimeRange({start:this.start,end:this.end,anchored:this.anchored});
},modulate:function(_f53){
var _f54=this.getDuration()/_f53,_f55=this.end.getTime(),_f56=_f55%_f54;
if(_f56!=0){
this.end=insight.time.add(this.end,_f54-_f56);
this.start=insight.time.add(this.start,_f54-_f56);
}
return this;
},contains:function(date){
date=insight.time.normalizeToDate(date);
return dojo.date.compare(date,this.start)>=0&&dojo.date.compare(date,this.end)<0;
},add:function(_f57){
this.start=insight.time.add(this.start,_f57);
this.end=insight.time.add(this.end,_f57);
this.anchored=true;
return this;
},roll:function(_f58,_f59){
if(!this.anchored||_f59){
_f58=_f58||{};
var date=_f58.date||new Date(),_f5a=_f58.windows||60,_f5b=_f58.bidirectional||false,_f5c=_f58.duration||this.getDuration(),_f5d=_f5c/_f5a,diff=insight.time.difference(this.end,date);
if(_f5b||diff>0){
_f5d=Math.ceil(diff/_f5d)*_f5d;
this.end=insight.time.add(this.end,_f5d);
this.start=insight.time.add(this.start,_f5d);
}
this.anchored=false;
}
return this;
},shift:function(end){
end=end||new Date();
var _f5e=insight.time.difference(this.end,end);
this.end=insight.time.add(this.end,_f5e);
this.start=insight.time.add(this.start,_f5e);
return this;
},changeDuration:function(_f5f){
if(!this.anchored){
this.start=insight.time.add(this.end,_f5f*-1);
}else{
var _f60=(this.getDuration()-_f5f)/2;
this.start=insight.time.add(this.start,_f60);
this.end=insight.time.add(this.end,_f60*-1);
}
return this;
},getStart:function(){
return insight.time.toString(this.start);
},getStartDate:function(){
return this.start;
},getEnd:function(){
return insight.time.toString(this.end);
},getEndDate:function(){
return this.end;
},getDuration:function(){
return insight.time.difference(this.start,this.end);
},isAnchored:function(){
return this.anchored;
},setAnchored:function(_f61){
this.anchored=_f61;
return this;
},toString:function(){
if(this.anchored){
return this.getDuration()+"@"+this.getEnd();
}else{
return this.getDuration().toString();
}
}});
}
if(!dojo._hasResource["insight.charting._TimeRangeChart"]){
dojo._hasResource["insight.charting._TimeRangeChart"]=true;
dojo.provide("insight.charting._TimeRangeChart");
dojo.declare("insight.charting._TimeRangeChart",null,{timeRange:null,clickable:false,hideXAxis:false,postCreate:function(){
this.timeRange.modulate(this.dataPoints);
this.inherited(arguments);
var _f62=this.hideXAxis?dojox.charting.axis2d.Invisible:insight.charting.axis2d.TimeRange;
this.chart.addAxis("x",{type:_f62,timeRange:this.timeRange,relative:Insight.playing(),from:1,minorTickStep:1});
this.subscribe("Insight.play",function(){
this.updateTimeRange({relative:true});
});
this.subscribe("Insight.pause",function(){
this.updateTimeRange({relative:false});
});
if(!this._supressTimeRangeActions){
this.chart.addPlot("backgroundColumnsPlot",{type:insight.charting.plot2d.BackgroundColumns,vAxis:null});
this.chart.addSeries("backgroundColumnsSeries",new dojox.charting.DataSeries(this.stores.main,{},function(s,i){
return new insight.time.TimeRange({start:s.getValue(i,"start"),end:s.getValue(i,"end")});
}),{plot:"backgroundColumnsPlot"});
this.addPlotAction("backgroundColumnsPlot",insight.charting.action2d.FillHighlight,{highlight:new dojo.Color([220,238,241,0.5])});
this.chart.addPlot("foregroundColumnsPlot",{type:insight.charting.plot2d.BackgroundColumns,vAxis:null});
this.chart.addSeries("foregroundColumnsSeries",new dojox.charting.DataSeries(this.stores.main,{},function(s,i){
return new insight.time.TimeRange({start:s.getValue(i,"start"),end:s.getValue(i,"end")});
}),{plot:"foregroundColumnsPlot"});
this._registerChartEvents("foregroundColumnsPlot");
if(this.clickable){
this.addPlotAction("foregroundColumnsPlot",insight.charting.action2d.PointerHover);
}
this.addPlotAction("foregroundColumnsPlot",insight.charting.action2d.Tooltip,{text:dojo.hitch(this,this._tooltipMessage)});
this.subscribe("highlightDate",this.highlightDate);
this.subscribe("blurDate",this.blurDate);
this.connect(this.chart.stack[this.chart.plots["foregroundColumnsPlot"]],"render",dojo.hitch(this,function(_f63){
if(this._highlightDate){
this.highlightDate(this._highlightDate);
}
}));
}
},startup:function(){
if(!this._supressTimeRangeActions){
this.chart.movePlotToBack("backgroundColumnsPlot");
this.chart.movePlotToFront("foregroundColumnsPlot");
}
var grid=this.chart.stack[this.chart.plots["grid"]];
if(grid.opt.hMajorLines||grid.opt.hMinorLines){
var _f64=[];
dojox.lang.functional.forIn(this.chart.axes,function(axis){
if(axis.vertical){
_f64.push(axis);
}
});
if(_f64[0]){
grid.vAxis=_f64[0].name;
}
}
this.inherited(arguments);
},_urlParams:function(){
var _f65=this.inherited(arguments);
if(this.timeRange&&!(_f65.start&&_f65.end)){
_f65.start=this.timeRange.getStart();
_f65.end=this.timeRange.getEnd();
}
return _f65;
},updateTimeRange:function(args){
var axis=this.chart.getAxis("x"),_f66=axis.declaredClass=="insight.charting.axis2d.TimeRange";
if(args.timeRange){
this.timeRange=args.timeRange.clone().modulate(this.dataPoints);
if(_f66){
axis.setTimeRange(this.timeRange,true);
}
this.refresh();
}
if(typeof args.relative=="boolean"&&_f66){
axis.setRelative(args.relative);
}
},refreshTimeRange:function(args){
this.updateTimeRange({timeRange:this.timeRange,relative:Insight.playing()});
},_tooltipMessage:function(o){
var t=o.run&&o.run.data&&o.run.data[o.index],_f67=o.run&&o.run.source&&o.run.source.store,_f68="",item,_f69,run,_f6a,plot,axis,_f6b;
_f67.fetchItemByIdentity({onItem:function(i){
item=i;
},identity:o.index});
var _f6c=_f67.getValue(item,"start");
var _f6d=_f67.getValue(item,"end");
if(!_f6c||!_f6d){
return "<h2>No data</h2>";
}
_f69=insight.time.labels(_f6c,_f6d,false,this.timeRange.getDuration());
_f68+="<h2>"+_f69.start+" - "+_f69.end+"</h2>";
_f68+="<table class='dl'>";
var _f6e=dojox.lang.functional.keys(o.chart.runs);
dojo.forEach(o.chart.getPlotOrder(),function(_f6f){
var _f70=dojo.filter(_f6e,function(run){
return _f6f===o.chart.series[o.chart.runs[run]].plot;
},this);
var _f71=dojo.map(_f70,function(_f72){
var axis=o.chart.getAxis(o.chart.stack[o.chart.plots[_f6f]].vAxis),run=o.chart.series[o.chart.runs[_f72]],_f6b=run.data[o.index];
if(!axis||_f6b==null){
return;
}
return {label:run.label,value:_f6b,formattedValue:(axis.opt.labelFunc?axis.opt.labelFunc.call(axis.opt,_f6b.toString(),_f6b,axis.scaler.major.prec):_f6b.toString())};
},this);
_f71=dojo.filter(_f71,function(item){
return !!item&&!!item.formattedValue;
},this);
if(_f71.length===0){
return;
}
_f71.sort(function(a,b){
return b.value-a.value;
});
dojo.forEach(_f71,function(item){
_f68+="<tr><td>"+item.label+"</td><td>"+item.formattedValue+"</td></tr>";
},this);
},this);
_f68+="</table>";
return _f68;
},highlightDate:function(date){
date=insight.time.normalizeToDate(date);
if(this._highlightDate){
this.blurDate(this._highlightDate);
}
this._highlightDate=date;
var i=this._findDateIndex(date,"backgroundColumnsSeries");
if(i!=-1){
this.chart.fireEvent("backgroundColumnsSeries","onmouseover",i);
}
},blurDate:function(date){
date=insight.time.normalizeToDate(date);
this._highlightDate=null;
var i=this._findDateIndex(date,"backgroundColumnsSeries");
if(i!=-1){
this.chart.fireEvent("backgroundColumnsSeries","onmouseout",i);
}
},_findDateIndex:function(date,_f73){
var _f74=this.chart.runs[_f73],_f75=this.chart.series[_f74].plot,_f76=this.chart.series[_f74];
for(var i=0;i<_f76.data.length;i++){
if(_f76.data[i].contains(date)){
return i;
}
}
return -1;
}});
}
if(!dojo._hasResource["insight.charting.scaler.linear"]){
dojo._hasResource["insight.charting.scaler.linear"]=true;
dojo.provide("insight.charting.scaler.linear");
(function(){
var _f77=3,dcsc=dojox.charting.scaler.common,_f78=dcsc.findString,_f79=dcsc.getNumericLabel;
var _f7a=[{coefficient:1.5,major:0.5,minor:0.1},{coefficient:2,major:0.5,minor:0.1},{coefficient:2.5,major:0.5,minor:0.1},{coefficient:3,major:1,minor:0.5},{coefficient:4,major:1,minor:0.5},{coefficient:5,major:1,minor:0.5},{coefficient:6,major:1.5,minor:0.5},{coefficient:7.5,major:2.5,minor:0.5},{coefficient:8,major:2,minor:0.5},{coefficient:9,major:3,minor:0.5},{coefficient:10,major:2.5,minor:0.5}];
var _f7b=function(max){
max*=1.05;
var base,_f7c=0,_f7d;
do{
base=Math.pow(10,_f7c);
_f7c++;
}while(max>10*base);
for(var i in _f7a){
_f7d=_f7a[i];
if(max<_f7d.coefficient*base){
return {max:base*_f7d.coefficient,major:base*_f7d.major,minor:base*_f7d.minor};
}
}
};
var _f7e=function(min,max,_f7f,_f80,_f81,_f82,span){
_f7f=dojo.delegate(_f7f);
if(!_f80){
if(_f7f.fixUpper=="major"){
_f7f.fixUpper="minor";
}
if(_f7f.fixLower=="major"){
_f7f.fixLower="minor";
}
}
if(!_f81){
if(_f7f.fixUpper=="minor"){
_f7f.fixUpper="micro";
}
if(_f7f.fixLower=="minor"){
_f7f.fixLower="micro";
}
}
if(!_f82){
if(_f7f.fixUpper=="micro"){
_f7f.fixUpper="none";
}
if(_f7f.fixLower=="micro"){
_f7f.fixLower="none";
}
}
var _f83=_f78(_f7f.fixLower,["major"])?Math.floor(_f7f.min/_f80)*_f80:_f78(_f7f.fixLower,["minor"])?Math.floor(_f7f.min/_f81)*_f81:_f78(_f7f.fixLower,["micro"])?Math.floor(_f7f.min/_f82)*_f82:_f7f.min,_f84=_f78(_f7f.fixUpper,["major"])?Math.ceil(_f7f.max/_f80)*_f80:_f78(_f7f.fixUpper,["minor"])?Math.ceil(_f7f.max/_f81)*_f81:_f78(_f7f.fixUpper,["micro"])?Math.ceil(_f7f.max/_f82)*_f82:_f7f.max;
if(_f7f.useMin){
min=_f83;
}
if(_f7f.useMax){
max=_f84;
}
var _f85=(!_f80||_f7f.useMin&&_f78(_f7f.fixLower,["major"]))?min:Math.ceil(min/_f80)*_f80,_f86=(!_f81||_f7f.useMin&&_f78(_f7f.fixLower,["major","minor"]))?min:Math.ceil(min/_f81)*_f81,_f87=(!_f82||_f7f.useMin&&_f78(_f7f.fixLower,["major","minor","micro"]))?min:Math.ceil(min/_f82)*_f82,_f88=!_f80?0:(_f7f.useMax&&_f78(_f7f.fixUpper,["major"])?Math.round((max-_f85)/_f80):Math.floor((max-_f85)/_f80))+1,_f89=!_f81?0:(_f7f.useMax&&_f78(_f7f.fixUpper,["major","minor"])?Math.round((max-_f86)/_f81):Math.floor((max-_f86)/_f81))+1,_f8a=!_f82?0:(_f7f.useMax&&_f78(_f7f.fixUpper,["major","minor","micro"])?Math.round((max-_f87)/_f82):Math.floor((max-_f87)/_f82))+1,_f8b=_f81?Math.round(_f80/_f81):0,_f8c=_f82?Math.round(_f81/_f82):0,_f8d=_f80?Math.floor(Math.log(_f80)/Math.LN10):0,_f8e=_f81?Math.floor(Math.log(_f81)/Math.LN10):0,_f8f=span/(max-min);
if(!isFinite(_f8f)){
_f8f=1;
}
return {bounds:{lower:_f83,upper:_f84,from:min,to:max,scale:_f8f,span:span},major:{tick:_f80,start:_f85,count:_f88,prec:_f8d},minor:{tick:_f81,start:_f86,count:_f89,prec:_f8e},micro:{tick:_f82,start:_f87,count:_f8a,prec:0},minorPerMajor:_f8b,microPerMinor:_f8c,scaler:insight.charting.scaler.linear};
};
dojo.mixin(insight.charting.scaler.linear,{buildScaler:function(min,max,span,_f90){
var h={fixUpper:"none",fixLower:"none",natural:false};
if(_f90){
if("fixUpper" in _f90){
h.fixUpper=String(_f90.fixUpper);
}
if("fixLower" in _f90){
h.fixLower=String(_f90.fixLower);
}
if("natural" in _f90){
h.natural=Boolean(_f90.natural);
}
}
if("min" in _f90){
min=_f90.min;
}
if("max" in _f90){
max=_f90.max;
}
if(_f90.includeZero){
if(min>0){
min=0;
}
if(max<0){
max=0;
}
}
h.min=min;
h.useMin=true;
h.max=max;
h.useMax=true;
if("from" in _f90){
min=_f90.from;
h.useMin=false;
}
if("to" in _f90){
max=_f90.to;
h.useMax=false;
}
if(max<=min){
return _f7e(min,max,h,0,0,0,span);
}
var _f91=_f7b(max),_f92=_f90&&("majorTickStep" in _f90)?_f90.majorTickStep:_f91.major,_f93=_f90&&("minorTickStep" in _f90)?_f90.minorTickStep:_f91.minor,_f94=0,_f95;
h.max=max=_f91.max;
if(_f90&&("microTickStep" in _f90)){
_f94=_f90.microTickStep;
_f95=_f7e(min,max,h,_f92,_f93,_f94,span);
}else{
do{
_f94=_f93/10;
if(!h.natural||_f94>0.9){
_f95=_f7e(min,max,h,_f92,_f93,_f94,span);
if(_f95.bounds.scale*_f95.micro.tick>_f77){
break;
}
}
_f94=_f93/5;
if(!h.natural||_f94>0.9){
_f95=_f7e(min,max,h,_f92,_f93,_f94,span);
if(_f95.bounds.scale*_f95.micro.tick>_f77){
break;
}
}
_f94=_f93/2;
if(!h.natural||_f94>0.9){
_f95=_f7e(min,max,h,_f92,_f93,_f94,span);
if(_f95.bounds.scale*_f95.micro.tick>_f77){
break;
}
}
_f94=0;
}while(false);
}
return _f94?_f95:_f7e(min,max,h,_f92,_f93,0,span);
},buildTicks:function(_f96,_f97){
var step,next,tick,_f98=_f96.major.start,_f99=_f96.minor.start,_f9a=_f96.micro.start;
if(_f97.microTicks&&_f96.micro.tick){
step=_f96.micro.tick,next=_f9a;
}else{
if(_f97.minorTicks&&_f96.minor.tick){
step=_f96.minor.tick,next=_f99;
}else{
if(_f96.major.tick){
step=_f96.major.tick,next=_f98;
}else{
return null;
}
}
}
var _f9b=1/_f96.bounds.scale;
if(_f96.bounds.to<=_f96.bounds.from||isNaN(_f9b)||!isFinite(_f9b)||step<=0||isNaN(step)||!isFinite(step)){
return null;
}
var _f9c=[],_f9d=[],_f9e=[];
while(next<=_f96.bounds.to+_f9b){
if(Math.abs(_f98-next)<step/2){
tick={value:_f98};
if(_f97.majorLabels){
tick.label=_f79(_f98,_f96.major.prec,_f97);
}
_f9c.push(tick);
_f98+=_f96.major.tick;
_f99+=_f96.minor.tick;
_f9a+=_f96.micro.tick;
}else{
if(Math.abs(_f99-next)<step/2){
if(_f97.minorTicks){
tick={value:_f99};
if(_f97.minorLabels&&(_f96.minMinorStep<=_f96.minor.tick*_f96.bounds.scale)){
tick.label=_f79(_f99,_f96.minor.prec,_f97);
}
_f9d.push(tick);
}
_f99+=_f96.minor.tick;
_f9a+=_f96.micro.tick;
}else{
if(_f97.microTicks){
_f9e.push({value:_f9a});
}
_f9a+=_f96.micro.tick;
}
}
next+=step;
}
return {major:_f9c,minor:_f9d,micro:_f9e};
},getTransformerFromModel:function(_f9f){
var _fa0=_f9f.bounds.from,_fa1=_f9f.bounds.scale;
return function(x){
return (x-_fa0)*_fa1;
};
},getTransformerFromPlot:function(_fa2){
var _fa3=_fa2.bounds.from,_fa4=_fa2.bounds.scale;
return function(x){
return x/_fa4+_fa3;
};
}});
})();
}
if(!dojo._hasResource["insight.charting.axis2d.Titled"]){
dojo._hasResource["insight.charting.axis2d.Titled"]=true;
dojo.provide("insight.charting.axis2d.Titled");
(function(){
var dc=dojox.charting,g=dojox.gfx,m=dojox.gfx.matrix,_fa5=4;
dojo.declare("insight.charting.axis2d._Titled",null,{getOffsets:function(){
var _fa6=this.inherited(arguments),o=this.opt;
if(o.title){
var ta=this.chart.theme.axis,_fa7=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_fa7?g.normalizedLength(g.splitFontString(_fa7).size):0,_fa8=o.leftBottom;
if(this.vertical){
_fa6[_fa8?"l":"r"]+=size+_fa5;
}else{
_fa6[_fa8?"b":"t"]+=size+_fa5;
}
}
return _fa6;
},render:function(dim,_fa9){
if(!this.dirty){
return this;
}
this.inherited(arguments);
try{
var o=this.opt,_faa=o.title,ta=this.chart.theme.axis,_fab=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_fac=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",size=_fab?g.normalizedLength(g.splitFontString(_fab).size):0,cm=this.chart.margins,_fad=o.leftBottom;
if(_faa){
var x,y,_fae;
if(this.vertical){
_fae=_fad?270:90;
x=_fad?size+cm.l:dim.width-size-cm.r;
y=(_fa9.t+dim.height-_fa9.b)/2;
}else{
_fae=0;
x=(_fa9.l+dim.width-_fa9.r)/2;
y=_fad?dim.height-cm.b:cm.t;
}
var elem=this.group.createText({x:0,y:0,text:_faa,align:"middle"});
elem.setFont(_fab).setFill(_fac);
if(_fae){
elem.setTransform([m.translate(x,y),m.rotateg(_fae)]);
}else{
elem.setTransform(m.translate(x,y));
}
}
}
catch(e){
}
return this;
}});
dojo.declare("insight.charting.axis2d.Titled",[dojox.charting.axis2d.Default,insight.charting.axis2d._Titled],{});
})();
}
if(!dojo._hasResource["insight.charting.axis2d.Metric"]){
dojo._hasResource["insight.charting.axis2d.Metric"]=true;
dojo.provide("insight.charting.axis2d.Metric");
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=insight.charting.scaler.linear,_faf=4;
dojo.declare("insight.charting.axis2d.Metric",[dojox.charting.axis2d.Default,insight.charting.axis2d._Titled],{_scaleTo:null,calculate:function(min,max,span,_fb0){
if(this.initialized()){
return this;
}
var o=this.opt;
if(this._scaleTo){
max=Math.max.apply(Math,this.chart.series[this.chart.runs[this._scaleTo]].data);
}
this.labels="labels" in o?o.labels:_fb0;
this.scaler=lin.buildScaler(min,max,span,o);
var tsb=this.scaler.bounds;
if("scale" in this){
o.from=tsb.lower+this.offset;
o.to=(tsb.upper-tsb.lower)/this.scale+o.from;
if(!isFinite(o.from)||isNaN(o.from)||!isFinite(o.to)||isNaN(o.to)||o.to-o.from>=tsb.upper-tsb.lower){
delete o.from;
delete o.to;
delete this.scale;
delete this.offset;
}else{
if(o.from<tsb.lower){
o.to+=tsb.lower-o.from;
o.from=tsb.lower;
}else{
if(o.to>tsb.upper){
o.from+=tsb.upper-o.to;
o.to=tsb.upper;
}
}
this.offset=o.from-tsb.lower;
}
this.scaler=lin.buildScaler(min,max,span,o);
tsb=this.scaler.bounds;
if(this.scale==1&&this.offset==0){
delete this.scale;
delete this.offset;
}
}
var _fb1=0,ta=this.chart.theme.axis,_fb2=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_fb2?g.normalizedLength(g.splitFontString(_fb2).size):0;
if(this.vertical){
if(size){
_fb1=size+_faf;
}
}else{
if(size){
var _fb3,i;
if(o.labelFunc&&o.maxLabelSize){
_fb3=o.maxLabelSize;
}else{
if(this.labels){
_fb3=this._groupLabelWidth(this.labels,_fb2);
}else{
var _fb4=Math.ceil(Math.log(Math.max(Math.abs(tsb.from),Math.abs(tsb.to)))/Math.LN10),t=[];
if(tsb.from<0||tsb.to<0){
t.push("-");
}
t.push(dojo.string.rep("9",_fb4));
var _fb5=Math.floor(Math.log(tsb.to-tsb.from)/Math.LN10);
if(_fb5>0){
t.push(".");
for(i=0;i<_fb5;++i){
t.push("9");
}
}
_fb3=dojox.gfx._base._getTextBox(t.join(""),{font:_fb2}).w;
}
}
_fb1=_fb3+_faf;
}
}
this.scaler.minMinorStep=_fb1;
this.ticks=lin.buildTicks(this.scaler,o);
return this;
},scaleTo:function(_fb6){
this._scaleTo=_fb6;
this.dirty=true;
}});
})();
}
if(!dojo._hasResource["insight.charting.MultiMetricResourceChart"]){
dojo._hasResource["insight.charting.MultiMetricResourceChart"]=true;
dojo.provide("insight.charting.MultiMetricResourceChart");
dojo.declare("insight.charting.MultiMetricResourceChart",[insight.charting.Chart,insight.charting._TimeRangeChart],{theme:insight.charting.themes.SpringLight,_metrics:null,_metricLabels:null,postCreate:function(){
this.inherited(arguments);
this._metrics=[];
this._metricLabels={};
},addResourceMetricPlot:function(_fb7,_fb8,_fb9,_fba,_fbb,_fbc){
var _fbd=this._names(_fb8),_fbe=this._metrics.length;
_fb7=this._store(_fb7);
_fba=dojo.delegate({type:insight.charting.axis2d.Metric,metric:_fb8},_fba);
_fbb=dojo.delegate({vAxis:_fbd.axis,metric:_fb8,label:_fb9},_fbb);
_fbc=dojo.delegate({plot:_fbd.plot,metric:_fb8,label:_fb9,store:_fb7.name},_fbc);
if(_fbe>1||_fba.hidden){
_fba.type=dojox.charting.axis2d.Invisible;
}else{
if(_fbe==1){
_fba.leftBottom=false;
}
}
_fba.vertical=true;
this.chart.addAxis(_fbd.axis,_fba);
this.chart.addPlot(_fbd.plot,_fbb);
this.chart.addSeries(_fbd.series,new dojox.charting.DataSeries(_fb7,{},_fb8),_fbc);
this._registerChartEvents(_fbd.plot);
this.chart.movePlotToFront(_fbd.plot);
this._metrics.push(_fb8);
this._metricLabels[_fb8]=_fb9;
},addResourceMetricPlotAction:function(_fbf,_fc0,args){
this.addPlotAction(this._names(_fbf).plot,_fc0,args);
},_names:function(_fc1){
return {axis:_fc1+"YAxis",plot:_fc1+"Plot",series:_fc1+"Series"};
}});
}
if(!dojo._hasResource["insight.charting.MultiResourceChart"]){
dojo._hasResource["insight.charting.MultiResourceChart"]=true;
dojo.provide("insight.charting.MultiResourceChart");
dojo.declare("insight.charting.MultiResourceChart",insight.charting.MultiMetricResourceChart,{theme:insight.charting.themes.SpringLight,type:dojox.charting.plot2d.Areas,resourceDisplayLimit:dojo.isIE?5:10,tension:dojo.isIE?null:"S",scaleOnRestack:true,postCreate:function(){
this.inherited(arguments);
if(dojo.isString(this.yAxisArgs.labelFunc)){
this.yAxisArgs.labelFunc=this[this.yAxisArgs.labelFunc];
}
this.chart.addAxis("y",this.yAxisArgs);
this.chart.addPlot("resource",{type:this.type,markers:true,tension:this.tension});
this._registerChartEvents("resource");
this.addPlotAction("resource",insight.charting.action2d.StrokeHighlight,{highlight:"#2354A4"});
this._initialLoad();
},_initialLoad:function(){
this._series=[];
dojox.lang.functional.forIn(this.stores,function(_fc2,name){
_fc2.setUrl(null,this._urlParams(name));
_fc2.fetch({scope:this,onComplete:function(){
var t=setTimeout(dojo.hitch(this,function(){
clearTimeout(t);
t=null;
if(this.destroyed()){
return;
}
if(_fc2._data&&_fc2._data.weights){
var _fc3=_fc2._data.weights.sort(function(a,b){
return a.value-b.value;
}).reverse(),_fc4=dojo.map(_fc3,function(item){
return item.name;
},this);
dojo.forEach(_fc4.slice(0,this.resourceDisplayLimit),function(_fc5){
this._addSeries(_fc5,_fc2._data.resources[_fc5],_fc2);
},this);
}
this.chart.render();
}),50);
}});
},this);
},_addSeries:function(_fc6,_fc7,_fc8){
_fc8=this._store(_fc8);
if(!(_fc8._data&&_fc8._data.colors&&_fc8._data.colors[_fc6])){
return;
}
var _fc9=new dojo.Color(_fc8._data.colors[_fc6]),_fca=new dojo.Color(_fc9),fill=new dojo.Color(_fc9),_fcb=new dojo.Color(_fc9);
_fca.a=0.6;
fill.a=0.2;
_fcb.a=0;
this.chart.addSeries(_fc6,new dojox.charting.DataSeries(_fc8,{},_fc6),{plot:"resource",resourceKey:_fc6,label:_fc7||_fc8._data.resources[_fc6],stroke:{color:_fca},outline:{color:new dojo.Color([255,255,255,0]),width:0},fill:fill,markerStroke:{color:_fcb},markerOutline:{color:_fcb},markerFill:_fcb,store:_fc8.name});
this._series.push(_fc6);
},reset:function(){
dojo.forEach(this._series,function(_fcc){
this.chart.removeSeries(_fcc);
},this);
this._initialLoad();
},highlightResource:function(_fcd,_fce){
if(_fcd==this._highlightedResource){
return;
}
var _fcf={key:_fcd};
if(this._highlightedResource){
this.blurResource(this._highlightedResource);
}
var _fd0=this._findResourceSeries(_fcd,_fce);
if(_fd0){
_fcf.strokeAlpha=_fd0.stroke.color.a;
_fcf.strokeWidth=_fd0.stroke.width;
_fcf.outlineAlpha=_fd0.outline.color.a;
_fcf.outlineWidth=_fd0.outline.width;
_fd0.stroke.color.a=1;
_fd0.stroke.width=4;
_fd0.outline.color.a=0.5;
_fd0.outline.width=5;
_fd0.dirty=true;
this.chart.moveSeriesToFront(_fcd).moveSeriesToFront("foregroundColumnsSeries").render();
}
this._highlightedResource=_fcf;
},blurResource:function(_fd1,_fd2){
if(!this._highlightedResource||_fd1!=this._highlightedResource.key){
return;
}
var _fd3=this._highlightedResource;
var _fd4=this._findResourceSeries(_fd1,_fd2);
if(_fd4){
_fd4.stroke.color.a=_fd3.strokeAlpha;
_fd4.stroke.width=_fd3.strokeWidth;
_fd4.outline.color.a=_fd3.outlineAlpha;
_fd4.outline.width=_fd3.outlineWidth;
_fd4.dirty=true;
this.chart.render();
}
this._highlightedResource=null;
},restackResource:function(_fd5,_fd6){
var _fd7=this._findResourceSeries(_fd5,_fd6);
if(_fd7){
if(this.scaleOnRestack){
this.chart.getAxis("y").scaleTo(_fd5);
}
this.chart.moveSeriesToFront(_fd5).moveSeriesToFront("foregroundColumnsSeries").render();
}
},_findResourceSeries:function(_fd8,_fd9){
var _fda=this.chart.series[this.chart.runs[_fd8]];
if(!_fda&&_fd9){
this._addSeries(_fd8,null,_fd9);
_fda=this._findResourceSeries(_fd8);
}
return _fda;
}});
}
if(!dojo._hasResource["insight.charting.plot2d.HeatColumns"]){
dojo._hasResource["insight.charting.plot2d.HeatColumns"]=true;
dojo.provide("insight.charting.plot2d.HeatColumns");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_fdb=df.lambda("item.purgeGroup()");
dojo.declare("insight.charting.plot2d.HeatColumns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null,minAlpha:0.1},optionalParams:{},constructor:function(_fdc,_fdd){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_fdd);
du.updateWithPattern(this.opt,_fdd,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
return dc.collectSimpleStats(this.series);
},render:function(dim,_fde){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_fde);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_fdb);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme.clone(),f,o=this.opt,gap,_fdf,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),_fe0=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_fdf=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i],_fe1=t.next("column",[this.opt,run]);
if(!this.dirty&&!run.dirty){
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var s=run.group,_fe2=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _fe3=run.data[j];
if(_fe3!==null){
var rect={x:_fde.l+ht(j+0.5)+gap,y:_fde.t,width:_fdf,height:dim.height-_fde.t-_fde.b};
var _fe4=new dojo.Color(_fe1.series.fill),_fe5=this.opt.minAlpha,_fe6=_fe4.a;
_fe4.a=_fe3?_fe3*(_fe6-_fe5)+_fe5:0;
var _fe7=s.createRect(rect).setFill(_fe4).setStroke(dojo.Color.transparent);
run.dyn.fill=new dojo.Color(_fe1.series.fill);
run.dyn.stroke=_fe7.getStroke();
if(_fe0){
var o={element:"column",index:j,run:run,shape:_fe7,x:j+0.5,y:0};
this._connectEvents(o);
_fe2[j]=o;
}
}
}
this._eventSeries[run.name]=_fe2;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.plot2d.HorizontalBands"]){
dojo._hasResource["insight.charting.plot2d.HorizontalBands"]=true;
dojo.provide("insight.charting.plot2d.HorizontalBands");
(function(){
var du=dojox.lang.utils,dc=dojox.charting.plot2d.common;
dojo.declare("insight.charting.plot2d.HorizontalBands",dojox.charting.Element,{defaultParams:{bands:[],hAxis:"x",vAxis:"y"},optionalParams:{},constructor:function(_fe8,_fe9){
this.opt=dojo.delegate(this.defaultParams,_fe9);
du.updateWithPattern(this.opt,_fe9,this.optionalParams);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.dirty=true;
},clear:function(){
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this;
},setAxis:function(axis){
if(axis){
this[axis.vertical?"_vAxis":"_hAxis"]=axis;
}
return this;
},addSeries:function(run){
return this;
},getSeriesStats:function(){
return dojo.delegate(dc.defaultStats);
},initializeScalers:function(){
return this;
},isDirty:function(){
return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty;
},performZoom:function(dim,_fea){
return this;
},getRequiredColors:function(){
return 0;
},render:function(dim,_feb){
this.dirty=this.isDirty();
if(!this.dirty){
return this;
}
this.cleanGroup();
var s=this.group,ta=this.chart.theme.axis;
try{
var _fec=this._vAxis.getScaler(),vt=_fec.scaler.getTransformerFromModel(_fec);
dojo.forEach(this.opt.bands,function(band){
var from=vt(band.from||this._vAxis.opt.min),to=vt(band.to||this._vAxis.opt.max);
s.createRect({x:_feb.l,y:dim.height-_feb.b-to,width:dim.width-_feb.r,height:to-from}).setFill(band.color);
},this);
}
catch(e){
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.action2d.ClickHighlight"]){
dojo._hasResource["insight.charting.action2d.ClickHighlight"]=true;
dojo.provide("insight.charting.action2d.ClickHighlight");
(function(){
var _fed=100,_fee=75,_fef=50,c=dojox.color,cc=function(_ff0){
return function(){
return _ff0;
};
},hl=function(_ff1){
var a=new c.Color(_ff1),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=_fed;
if(x.l<_fef){
x.l=_fee;
}else{
if(x.l>_fee){
x.l=_fef;
}else{
x.l=x.l-_fef>_fee-x.l?_fef:_fee;
}
}
}
return c.fromHsl(x);
};
dojo.declare("insight.charting.action2d.ClickHighlight",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut},optionalParams:{highlight:"red"},constructor:function(_ff2,plot,_ff3){
var a=_ff3&&_ff3.highlight;
this.colorFun=a?(dojo.isFunction(a)?a:cc(a)):hl;
this.connect();
},process:function(o){
if(!o.shape||o.type!="onclick"){
return;
}
if(!this.anim[o.run.name]){
this.anim[o.run.name]={};
}else{
if(this.anim[o.run.name].action){
if(o.shape==this.anim[o.run.name].action.shape){
return;
}
this.doProcess(this.anim[o.run.name].action.shape,this.anim[o.run.name],this.anim[o.run.name]);
this.anim[o.run.name]={};
}
}
this.doProcess(o.shape,o.run.name);
},doProcess:function(_ff4,_ff5,anim){
var _ff6,_ff7,_ff8;
if(anim){
_ff8=true;
anim.action.stop(true);
}else{
var _ff9=_ff4.getFill();
if(!_ff9||!(_ff9 instanceof dojo.Color)){
return;
}
this.anim[_ff5]=anim={start:_ff9,end:this.colorFun(_ff9)};
}
var _ffa=anim.start,end=anim.end;
if(_ff8){
var t=_ffa;
_ffa=end;
end=t;
}
anim.action=dojox.gfx.fx.animateFill({shape:_ff4,duration:this.duration,easing:this.easing,color:{start:_ffa,end:end}});
anim.action.play();
}});
})();
}
if(!dojo._hasResource["insight.charting.RealTimePerformanceChart"]){
dojo._hasResource["insight.charting.RealTimePerformanceChart"]=true;
dojo.provide("insight.charting.RealTimePerformanceChart");
dojo.declare("insight.charting.RealTimePerformanceChart",[insight.charting.Chart,insight.charting._TimeRangeChart],{theme:insight.charting.themes.Spring,type:dojox.charting.plot2d.Columns,_supressTimeRangeActions:true,_selectedWindow:null,postCreate:function(){
this.inherited(arguments);
this.chart.addAxis("y",{type:insight.charting.axis2d.Metric,vertical:true,includeZero:true,fixed:false,minorTicks:false,labelFunc:this._responseTimeLabelFunc});
this.chart.addPlot("default",{type:this.type,gap:1.5});
this.chart.addSeries("duration",new dojox.charting.DataSeries(this.stores.main,{},dojo.hitch(this,function(s,i){
var o={y:s.getValue(i,"maxDuration")};
if(this._selectedWindow&&this._selectedWindow.start==s.getValue(i,"start")&&this._selectedWindow.end==s.getValue(i,"end")){
o.fill=new dojo.Color([113,166,59,0.8]);
this._selectedWindow.index=s.getIdentity(i);
}
return o;
})));
this._registerChartEvents("default");
this.addPlotAction("default",insight.charting.action2d.ClickHighlight,{highlight:new dojo.Color([113,166,59,0.8])});
this.addPlotAction("default",insight.charting.action2d.PointerHover);
this.addPlotAction("default",insight.charting.action2d.StrokeHighlight,{highlight:"#2354A4"});
this.addPlotAction("default",insight.charting.action2d.Tooltip,{text:dojo.hitch(this,function(_ffb){
var s=this.stores.main,i=s._items[_ffb.index];
return s.getValue(i,"tooltip");
})});
this.connect(this,"onChartElementClick",function(_ffc){
var s=this.stores.main,i=s._items[_ffc.index];
if(_ffc.element=="column"){
this._selectedWindow={start:s.getValue(i,"start"),end:s.getValue(i,"end"),index:s.getIdentity(i)};
this.onLoadWindow(this._selectedWindow);
}
});
this.connect(this.chart.stack[this.chart.plots["default"]],"render",dojo.hitch(this,function(_ffd){
if(this._selectedWindow&&this._selectedWindow.index&&this.stores.main._data){
var w=this._selectedWindow,s=this.stores.main,i=s._items[this._selectedWindow.index];
if(s.getValue(i,"start")!=w.start||s.getValue(i,"end")!=w.end){
w.index=null;
return;
}
var a=this.getPlotAction("default","insight.charting.action2d.ClickHighlight"),o=this.chart.stack[this.chart.plots["default"]]._eventSeries["duration"][w.index];
if(a&&o){
a.anim["duration"].action.shape=o.shape;
}
}
}));
},onLoadWindow:dijit._connectOnUseEventHandler});
}
if(!dojo._hasResource["insight.charting.plot2d.HistogramBars"]){
dojo._hasResource["insight.charting.plot2d.HistogramBars"]=true;
dojo.provide("insight.charting.plot2d.HistogramBars");
(function(){
var dc=dojox.charting.plot2d.common;
dojo.declare("insight.charting.plot2d.HistogramBars",dojox.charting.plot2d.Bars,{getSeriesStats:function(){
var _ffe=dc.collectSimpleStats(this.series),t;
_ffe.hmin-=1;
_ffe.hmax+=1;
t=_ffe.hmin,_ffe.hmin=_ffe.vmin,_ffe.vmin=t;
t=_ffe.hmax,_ffe.hmax=_ffe.vmax,_ffe.vmax=t;
return _ffe;
}});
})();
}
if(!dojo._hasResource["insight.charting.axis2d.Histogram"]){
dojo._hasResource["insight.charting.axis2d.Histogram"]=true;
dojo.provide("insight.charting.axis2d.Histogram");
(function(){
var dc=dojox.charting,g=dojox.gfx,lin=dc.scaler.linear,_fff=4;
dojo.declare("insight.charting.axis2d.Histogram",dojox.charting.axis2d.Default,{getOffsets:function(){
var s=this.scaler,_1000={l:0,r:0,t:0,b:0};
if(!s){
return _1000;
}
var o=this.opt,_1001=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_1002=0,ma=s.major,mi=s.minor,ta=this.chart.theme.axis,_1003=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_1004=this.chart.theme.getTick("major",o),_1005=this.chart.theme.getTick("minor",o),size=_1003?g.normalizedLength(g.splitFontString(_1003).size):0,_1006=o.rotation%360,_1007=o.leftBottom,cosr=Math.abs(Math.cos(_1006*Math.PI/180)),sinr=Math.abs(Math.sin(_1006*Math.PI/180));
if(_1006<0){
_1006+=360;
}
if(size){
if(o.maxLabelSize){
_1001=o.maxLabelSize;
}else{
if(this.labels){
_1001=this._groupLabelWidth(this.labels,_1003);
}else{
if(this.ticks&&this.ticks.major){
_1001=this._groupLabelWidth(dojo.map(this.ticks.major,function(tick){
return tick.label;
}),_1003);
}else{
if(this._cachedLabelWidth){
_1001=this._cachedLabelWidth;
}else{
_1001=this._groupLabelWidth(["default"],_1003);
}
}
}
}
if(this.vertical){
var side=_1007?"l":"r";
switch(_1006){
case 0:
case 180:
_1000[side]=_1001;
_1000.t=_1000.b=size/2;
break;
case 90:
case 270:
_1000[side]=size;
_1000.t=_1000.b=_1001/2;
break;
default:
if(_1006<=centerAnchorLimit||(180<_1006&&_1006<=(180+centerAnchorLimit))){
_1000[side]=size*sinr/2+_1001*cosr;
_1000[_1007?"t":"b"]=size*cosr/2+_1001*sinr;
_1000[_1007?"b":"t"]=size*cosr/2;
}else{
if(_1006>(360-centerAnchorLimit)||(180>_1006&&_1006>(180-centerAnchorLimit))){
_1000[side]=size*sinr/2+_1001*cosr;
_1000[_1007?"b":"t"]=size*cosr/2+_1001*sinr;
_1000[_1007?"t":"b"]=size*cosr/2;
}else{
if(_1006<90||(180<_1006&&_1006<270)){
_1000[side]=size*sinr+_1001*cosr;
_1000[_1007?"t":"b"]=size*cosr+_1001*sinr;
}else{
_1000[side]=size*sinr+_1001*cosr;
_1000[_1007?"b":"t"]=size*cosr+_1001*sinr;
}
}
}
break;
}
_1000[side]+=_fff+Math.max(_1004.length,_1005.length);
}else{
var side=_1007?"b":"t";
switch(_1006){
case 0:
case 180:
_1000[side]=size;
_1000.l=_1000.r=_1001/2;
break;
case 90:
case 270:
_1000[side]=_1001;
_1000.l=_1000.r=size/2;
break;
default:
if((90-centerAnchorLimit)<=_1006&&_1006<=90||(270-centerAnchorLimit)<=_1006&&_1006<=270){
_1000[side]=size*sinr/2+_1001*cosr;
_1000[_1007?"r":"l"]=size*cosr/2+_1001*sinr;
_1000[_1007?"l":"r"]=size*cosr/2;
}else{
if(90<=_1006&&_1006<=(90+centerAnchorLimit)||270<=_1006&&_1006<=(270+centerAnchorLimit)){
_1000[side]=size*sinr/2+_1001*cosr;
_1000[_1007?"l":"r"]=size*cosr/2+_1001*sinr;
_1000[_1007?"r":"l"]=size*cosr/2;
}else{
if(_1006<centerAnchorLimit||(180<_1006&&_1006<(180-centerAnchorLimit))){
_1000[side]=size*sinr+_1001*cosr;
_1000[_1007?"r":"l"]=size*cosr+_1001*sinr;
}else{
_1000[side]=size*sinr+_1001*cosr;
_1000[_1007?"l":"r"]=size*cosr+_1001*sinr;
}
}
}
break;
}
_1000[side]+=_fff+Math.max(_1004.length,_1005.length);
}
}
if(_1001){
this._cachedLabelWidth=_1001;
}
return _1000;
},render:function(dim,_1008){
if(!this.dirty){
return this;
}
var o=this.opt;
var start,stop,_1009,_100a,_100b,_100c,ta=this.chart.theme.axis,_100d=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_100e=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_100f=this.chart.theme.getTick("major",o),_1010=this.chart.theme.getTick("minor",o),_1011=this.chart.theme.getTick("micro",o),_1012=Math.max(_100f.length,_1010.length,_1011.length),_1013="stroke" in o?o.stroke:ta.stroke,size=_100d?g.normalizedLength(g.splitFontString(_100d).size):0;
if(this.vertical){
start={y:dim.height-_1008.b};
stop={y:_1008.t};
_1009={x:0,y:-1};
if(o.leftBottom){
start.x=stop.x=_1008.l;
_100a={x:-1,y:0};
_100c="end";
}else{
start.x=stop.x=dim.width-_1008.r;
_100a={x:1,y:0};
_100c="start";
}
_100b={x:_100a.x*(_1012+_fff),y:size*0.4};
}else{
start={x:_1008.l};
stop={x:dim.width-_1008.r};
_1009={x:1,y:0};
_100c="middle";
if(o.leftBottom){
start.y=stop.y=dim.height-_1008.b;
_100a={x:0,y:1};
_100b={y:_1012+_fff+size};
}else{
start.y=stop.y=_1008.t;
_100a={x:0,y:-1};
_100b={y:-_1012-_fff};
}
_100b.x=0;
}
this.cleanGroup();
try{
var s=this.group,c=this.scaler,t=this.ticks,_1014,f=lin.getTransformerFromModel(this.scaler),_1015=(dojox.gfx.renderer=="canvas"),_1016=_1015||this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",dx=_100a.x*_100f.length,dy=_100a.y*_100f.length;
s.createLine({x1:start.x,y1:start.y,x2:stop.x,y2:stop.y}).setStroke(_1013);
dojo.forEach(t.major,function(tick){
var _1017=f(tick.value+0.5),elem,x=start.x+_1009.x*_1017,y=start.y+_1009.y*_1017;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_100f);
if(tick.label){
elem=dc.axis2d.common.createText[_1016](this.chart,s,x+_100b.x,y+_100b.y,_100c,tick.label,_100d,_100e);
if(_1016=="html"){
this.htmlElements.push(elem);
}
}
},this);
dx=_100a.x*_1010.length;
dy=_100a.y*_1010.length;
_1014=c.minMinorStep<=c.minor.tick*c.bounds.scale;
dojo.forEach(t.minor,function(tick){
var _1018=f(tick.value+0.5),elem,x=start.x+_1009.x*_1018,y=start.y+_1009.y*_1018;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_1010);
if(_1014&&tick.label){
elem=dc.axis2d.common.createText[_1016](this.chart,s,x+_100b.x,y+_100b.y,_100c,tick.label,_100d,_100e);
if(_1016=="html"){
this.htmlElements.push(elem);
}
}
},this);
dx=_100a.x*_1011.length;
dy=_100a.y*_1011.length;
dojo.forEach(t.micro,function(tick){
var _1019=f(tick.value+0.5),elem,x=start.x+_1009.x*_1019,y=start.y+_1009.y*_1019;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_1011);
},this);
}
catch(e){
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["insight.charting.ResponseTimeHistogram"]){
dojo._hasResource["insight.charting.ResponseTimeHistogram"]=true;
dojo.provide("insight.charting.ResponseTimeHistogram");
dojo.declare("insight.charting.ResponseTimeHistogram",insight.charting.Chart,{timeRange:null,postCreate:function(){
this.inherited(arguments);
this.chart.addAxis("x",{type:insight.charting.axis2d.Metric,includeZero:true,fixed:false,natural:true,minorTicks:false,title:"Invocations",titleOrientation:"away"});
this.chart.addAxis("y",{type:insight.charting.axis2d.Histogram,vertical:true,fixed:false,majorTickStep:this.dataPoints-1,minorTicks:false,labelFunc:dojo.hitch(this,this.labelFunc)});
this.chart.addPlot("default",{type:insight.charting.plot2d.HistogramBars,gap:0.5});
this.chart.addSeries("histogram",new dojox.charting.DataSeries(this.stores.main,{},function(s,i){
var o={y:s.getValue(i,"count")},_101a=s._data.boundries,start=s.getValue(i,"start");
if(_101a){
if(start<=_101a.satisfied){
o.fill="#46A218";
o.stroke={color:"#FFF",width:1};
}else{
if(start<=_101a.tolerated){
o.fill="#A2D018";
o.stroke={color:"#FFF",width:1};
}else{
o.fill="#FE1818";
o.stroke={color:"#FFF",width:1};
}
}
}
return o;
}),{plot:"default"});
this._registerChartEvents("default");
this.addPlotAction("default",insight.charting.action2d.PointerHover);
this.addPlotAction("default",insight.charting.action2d.StrokeHighlight,{highlight:"#2354A4"});
this.addPlotAction("default",insight.charting.action2d.Tooltip,{text:dojo.hitch(this,function(event){
var s=this.stores.main,i=s._items[event.index];
return s.getValue(i,"startLabel")+" - "+s.getValue(i,"endLabel")+"<br />"+dojo.number.format(s.getValue(i,"count"))+" invocations";
})});
},_urlParams:function(){
var _101b=this.inherited(arguments);
if(this.timeRange&&!(_101b.start&&_101b.end)){
_101b.start=this.timeRange.getStart();
_101b.end=this.timeRange.getEnd();
}
return _101b;
},updateTimeRange:function(args){
if(args.timeRange){
this.timeRange=args.timeRange;
this.refresh();
}
},labelFunc:function(text){
if(!(this.stores.main&&this.stores.main._data&&this.stores.main._items)){
return text;
}
var index=parseInt(text);
if(index===0){
return this.stores.main._data.startLabel;
}else{
if(index===this.stores.main._items.length-1){
return this.stores.main._data.endLabel;
}else{
return "";
}
}
}});
}
if(!dojo._hasResource["insight.charting._HealthBands"]){
dojo._hasResource["insight.charting._HealthBands"]=true;
dojo.provide("insight.charting._HealthBands");
insight.charting._HealthBands.healthBands=[{from:null,to:0.5,color:[255,52,0,0.1],value:0.25,text:"Unacceptable"},{from:0.5,to:0.7,color:[255,135,0,0.1],value:0.6,text:"Poor"},{from:0.7,to:0.85,color:[234,211,0,0.1],value:0.775,text:"Fair"},{from:0.85,to:0.94,color:[89,210,0,0.1],value:0.895,text:"Good"},{from:0.94,to:null,color:[3,144,0,0.1],value:1.01,text:"Excellent"}];
}
if(!dojo._hasResource["insight.components.ErrorButton"]){
dojo._hasResource["insight.components.ErrorButton"]=true;
dojo.provide("insight.components.ErrorButton");
dojo.declare("insight.components.ErrorButton",dijit.form.Button,{hidden:true,parentNode:null,startup:function(){
this.inherited(arguments);
this.parentNode=this.domNode.parentNode;
this.attr("hidden",this.hidden);
},_setHiddenAttr:function(_101c){
this.hidden=_101c;
if(!this.parentNode){
return;
}
dojo.style(this.parentNode,{display:_101c?"none":null});
}});
}
if(!dojo._hasResource["dojox.layout.ResizeHandle"]){
dojo._hasResource["dojox.layout.ResizeHandle"]=true;
dojo.provide("dojox.layout.ResizeHandle");
dojo.experimental("dojox.layout.ResizeHandle");
dojo.declare("dojox.layout.ResizeHandle",[dijit._Widget,dijit._Templated],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,constrainMax:false,maxHeight:0,maxWidth:0,fixedAspect:false,intermediateChanges:false,startTopic:"/dojo/resize/start",endTopic:"/dojo/resize/stop",templateString:"<div dojoAttachPoint=\"resizeHandle\" class=\"dojoxResizeHandle\"><div></div></div>",postCreate:function(){
this.connect(this.resizeHandle,"onmousedown","_beginSizing");
if(!this.activeResize){
this._resizeHelper=dijit.byId("dojoxGlobalResizeHelper");
if(!this._resizeHelper){
this._resizeHelper=new dojox.layout._ResizeHelper({id:"dojoxGlobalResizeHelper"}).placeAt(dojo.body());
dojo.addClass(this._resizeHelper.domNode,this.activeResizeClass);
}
}else{
this.animateSizing=false;
}
if(!this.minSize){
this.minSize={w:this.minWidth,h:this.minHeight};
}
if(this.constrainMax){
this.maxSize={w:this.maxWidth,h:this.maxHeight};
}
this._resizeX=this._resizeY=false;
var _101d=dojo.partial(dojo.addClass,this.resizeHandle);
switch(this.resizeAxis.toLowerCase()){
case "xy":
this._resizeX=this._resizeY=true;
_101d("dojoxResizeNW");
break;
case "x":
this._resizeX=true;
_101d("dojoxResizeW");
break;
case "y":
this._resizeY=true;
_101d("dojoxResizeN");
break;
}
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
dojo.publish(this.startTopic,[this]);
this.targetWidget=dijit.byId(this.targetId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetId);
if(this.targetContainer){
this.targetDomNode=this.targetContainer;
}
if(!this.targetDomNode){
return false;
}
if(!this.activeResize){
var c=dojo.position(this.targetDomNode,true);
this._resizeHelper.resize({l:c.x,t:c.y,w:c.w,h:c.h});
this._resizeHelper.show();
}
this._isSizing=true;
this.startPoint={x:e.clientX,y:e.clientY};
var mb=this.targetWidget?dojo.marginBox(this.targetDomNode):dojo.contentBox(this.targetDomNode);
this.startSize={w:mb.w,h:mb.h};
if(this.fixedAspect){
var max,val;
if(mb.w>mb.h){
max="w";
val=mb.w/mb.h;
}else{
max="h";
val=mb.h/mb.w;
}
this._aspect={prop:max};
this._aspect[max]=val;
}
this._pconnects=[];
this._pconnects.push(dojo.connect(dojo.doc,"onmousemove",this,"_updateSizing"));
this._pconnects.push(dojo.connect(dojo.doc,"onmouseup",this,"_endSizing"));
dojo.stopEvent(e);
},_updateSizing:function(e){
if(this.activeResize){
this._changeSizing(e);
}else{
var tmp=this._getNewCoords(e);
if(tmp===false){
return;
}
this._resizeHelper.resize(tmp);
}
e.preventDefault();
},_getNewCoords:function(e){
try{
if(!e.clientX||!e.clientY){
return false;
}
}
catch(e){
return false;
}
this._activeResizeLastEvent=e;
var dx=(this.isLeftToRight()?this.startPoint.x-e.clientX:e.clientX-this.startPoint.x),dy=this.startPoint.y-e.clientY,newW=this.startSize.w-(this._resizeX?dx:0),newH=this.startSize.h-(this._resizeY?dy:0);
return this._checkConstraints(newW,newH);
},_checkConstraints:function(newW,newH){
if(this.minSize){
var tm=this.minSize;
if(newW<tm.w){
newW=tm.w;
}
if(newH<tm.h){
newH=tm.h;
}
}
if(this.constrainMax&&this.maxSize){
var ms=this.maxSize;
if(newW>ms.w){
newW=ms.w;
}
if(newH>ms.h){
newH=ms.h;
}
}
if(this.fixedAspect){
var ta=this._aspect[this._aspect.prop];
if(newW<newH){
newH=newW*ta;
}else{
if(newH<newW){
newW=newH*ta;
}
}
}
return {w:newW,h:newH};
},_changeSizing:function(e){
var tmp=this._getNewCoords(e);
if(tmp===false){
return;
}
if(this.targetWidget&&dojo.isFunction(this.targetWidget.resize)){
this.targetWidget.resize(tmp);
}else{
if(this.animateSizing){
var anim=dojo.fx[this.animateMethod]([dojo.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:tmp.w}},duration:this.animateDuration}),dojo.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:tmp.h}},duration:this.animateDuration})]);
anim.play();
}else{
dojo.style(this.targetDomNode,{width:tmp.w+"px",height:tmp.h+"px"});
}
}
if(this.intermediateChanges){
this.onResize(e);
}
},_endSizing:function(e){
dojo.forEach(this._pconnects,dojo.disconnect);
var pub=dojo.partial(dojo.publish,this.endTopic,[this]);
if(!this.activeResize){
this._resizeHelper.hide();
this._changeSizing(e);
setTimeout(pub,this.animateDuration+15);
}else{
pub();
}
this._isSizing=false;
this.onResize(e);
},onResize:function(e){
}});
dojo.declare("dojox.layout._ResizeHelper",dijit._Widget,{show:function(){
dojo.fadeIn({node:this.domNode,duration:120,beforeBegin:function(n){
dojo.style(n,"display","");
}}).play();
},hide:function(){
dojo.fadeOut({node:this.domNode,duration:250,onEnd:function(n){
dojo.style(n,"display","none");
}}).play();
},resize:function(dim){
dojo.marginBox(this.domNode,dim);
}});
}
if(!dojo._hasResource["spring.HtmlFragmentResponseHandler"]){
dojo._hasResource["spring.HtmlFragmentResponseHandler"]=true;
dojo.provide("spring.HtmlFragmentResponseHandler");
(function(){
dojo.declare("spring.HtmlFragmentResponseHandler",null,{evalScripts:true,replaceWidgets:true,requireFragment:true,mappings:null,constructor:function(_101e){
dojo.mixin(this,_101e);
this.mappings=this.mappings||{};
},handle:function(_101f,_1020){
if(_1020.xhr.status>=300){
return this.error(_101f,_1020);
}else{
return this.load(_101f,_1020);
}
},handler:function(){
return dojo.hitch(this,this.handle);
},load:function(_1021,_1022){
if(this.requireFragment&&!_1021.fragment){
try{
var l=dojo.global.location,href=l.href,hash=l.hash;
dojo.global.location=href.substring(0,href.length-hash.length);
}
finally{
return;
}
}
this._replaceDomNodes(_1021);
if(this.evalScripts){
this._evalScripts(_1021);
}
return _1021;
},error:function(_1023,_1024){
console.error("HTTP status code: ",_1024.xhr.status);
},_replaceDomNodes:function(_1025){
dojo.forEach(_1025.domNodes,function(_1026){
if(_1026.id){
var _1027=this._lookupTargetId(_1026.id);
_1026.id=_1027;
if(this.replaceWidgets&&dijit&&dijit.byId(_1027)){
this._replaceWidget(_1027,_1026);
}else{
if(dojo.byId(_1027)){
this._replaceNode(_1027,_1026);
}else{
console.error("An existing DOM elment with id '"+_1027+"' could not be found for replacement.");
}
}
}
},this);
},_lookupTargetId:function(id){
return this.mappings[id]?this.mappings[id]:id;
},_replaceWidget:function(id,node){
var _1028=dijit.byId(id);
_1028.destroyDescendants(false);
dojo.place(node,_1028.attr("domNode"),"replace");
_1028.attr("domNode",node);
},_replaceNode:function(id,node){
var _1029=dojo.byId(id);
dojo.place(node,_1029,"replace");
},_evalScripts:function(_102a){
dojo.forEach(_102a.scriptNodes,function(_102b){
dojo.eval(_102b);
},this);
}});
var _102c=/(?:<script(.|[\n|\r])*?>)((\n|\r|.)*?)(?:<\/script>)/img,_102d=/(?:<script(.|[\n|\r])*?>)((\n|\r|.)*?)(?:<\/script>)/im,_102e=[/<!--/mg,/\/\/-->/mg,/<!\[CDATA\[(\/\/>)*/mg,/(<!)*\]\]>/mg];
spring.HtmlFragmentResponseHandler.handle=function(){
if(arguments[1]&&arguments[1].xhr){
return new spring.HtmlFragmentResponseHandler().handle(arguments[0],arguments[1]);
}else{
return new spring.HtmlFragmentResponseHandler(arguments[0]).handler();
}
};
if(!dojo.contentHandlers.html){
dojo.contentHandlers.html=function(xhr){
var _102f={raw:xhr.responseText,scriptNodes:[],domNodes:[],fragment:true},_1030=dojo.string.trim(_102f.raw),_1031,_1032;
if(_1030.substring(0,14).toUpperCase()=="<!DOCTYPE HTML"||_1030.substring(0,5).toUpperCase()=="<HTML"){
_102f.fragment=false;
}
_1031=_102f.raw.match(_102c);
dojo.forEach(_1031,function(_1033){
if(_102d.test(_1033)){
var _1034=_1033.match(_102d)[2];
dojo.forEach(_102e,function(_1035){
_1034=_1034.replace(_1035,"");
},this);
_102f.scriptNodes.push(_1034);
}
},this);
_102f.raw=_102f.raw.replace(_102c,"");
_1032=dojo.doc.createElement("span");
_1032.innerHTML=_102f.raw;
_102f.domNodes=dojo.query("> *",_1032);
return _102f;
};
}else{
console.warn("Unable to register spring.HtmlFragmentResponseHandler as 'html' for dojo.contentHandlers");
}
})();
}
if(!dojo._hasResource["insight.components.PageModule"]){
dojo._hasResource["insight.components.PageModule"]=true;
dojo.provide("insight.components.PageModule");
dojo.declare("insight.components.PageModule",dijit._Widget,{url:null,_urlParams:null,refreshOn:null,maxHeight:null,timeout:insight.runtime.getXhrTimeout("PageModule"),resize:null,constructor:function(){
this._urlParams={};
},postCreate:function(){
this.inherited(arguments);
this.startup();
if(dojo.isArray(this.refreshOn)){
dojo.forEach(this.refreshOn,function(_1036){
this.subscribe(_1036,function(){
if(!this._hidden){
this.load();
}
});
},this);
}else{
if(this.refreshOn){
this.subscribe(this.refreshOn,function(){
if(!this._hidden){
this.load();
}
});
}
}
},startup:function(){
this.inherited(arguments);
this.load();
},hide:function(_1037){
this._hidden=true;
dojo.style(this.domNode,"display","none");
if(!_1037){
this.destroyDescendants();
}
},show:function(){
this._hidden=false;
dojo.style(this.domNode,"display","block");
},hidden:function(){
return !!this._hidden;
},delayedLoad:function(delay){
if(this._delayedLoad){
return;
}
this._delayedLoad=dojo.global.setTimeout(dojo.hitch(this,this.load),delay);
},load:function(_1038,_1039){
if(this._delayedLoad){
dojo.global.clearTimeout(this._delayedLoad);
this._delayedLoad=null;
}
_1038=_1038||{};
_1039=_1039||"get";
if(this.url){
dojo.xhr(_1039,{handleAs:"html",load:dojo.hitch(this,this._load),error:dojo.hitch(this,this._error),url:this.url.build(dojo.delegate(this._urlParams,_1038)),timeout:this.timeout});
}
},_load:function(_103a,_103b){
if(!_103a.fragment){
try{
var l=dojo.global.location,href=l.href,hash=l.hash;
dojo.global.location=href.substring(0,href.length-hash.length);
}
finally{
return;
}
}
var node=_103a.domNodes[0];
if(!node){
console.error("a DOM node is required in the response");
}
this.destroyDescendants();
this._hidden=false;
node.id=this.domNode.id;
dojo.place(node,this.domNode,"replace");
this.domNode=node;
this.containerNode=this.domNode;
dojo.forEach(_103a.scriptNodes,function(_103c){
try{
dojo.eval("(function(){var self=dijit.byId('"+this.id+"');"+_103c+"})();");
}
catch(e){
console.error("error evaling script",e);
}
},this);
if(this.resize){
var _103d,_103e=this.id+"#ResizeHandle",_103f=dojo.query("> .page-module-body",this.domNode)[0],box=dojo.contentBox(_103f),_1040=dojo.create("div",null,this.domNode,"last"),_1041=parseInt(Insight.getLocal(_103e));
_103d=new dojox.layout.ResizeHandle({resizeAxis:"y",targetContainer:_103f,maxHeight:box.h,maxWidth:box.w,minWidth:box.w,constrainMax:true,activeResize:!dojo.isIE},_1040);
if(_1041<box.h){
dojo.style(_103f,{height:_1041});
}else{
if(isNaN(_1041)&&this.maxHeight&&this.maxHeight<box.h){
dojo.style(_103f,{height:this.maxHeight});
}
}
this.connect(_103d,"onResize",function(){
var _1042=dojo.contentBox(_103f);
Insight.setLocal(_103e,(_1042.h*1.1<box.h)?_1042.h:null);
});
this.subscribe("window/resize",function(){
var _1043=dojo.contentBox(this.domNode).w-2;
_103d.minSize.w=_103d.minWidth=_103d.maxSize.w=_103d.maxWidth=_1043;
dojo.style(_103f,{width:_1043});
});
}else{
if(this.maxHeight){
var _1044=dojo.query(".page-module-body",this.domNode)[0];
if(parseInt(dojo.style(_1044,"height"))>this.maxHeight){
dojo.style(_1044,"display","block");
dojo.style(_1044,"position","relative");
dojo.style(_1044,"height",this.maxHeight+"px");
dojo.style(_1044,"overflowX","hidden");
dojo.style(_1044,"overflowY","auto");
}
}
}
this.onReplace();
},_error:function(_1045,_1046){
dojo.publish("error/xhr",arguments);
},updateUrlTemplate:function(_1047){
this.url=_1047;
},updateUrlParams:function(_1048){
dojo.mixin(this._urlParams,_1048);
},_setDomNodeAttr:function(_1049){
this.domNode=_1049;
this.onReplace();
},_urlArgs:function(){
},connectForm:function(form){
form=dojo.byId(form);
form.onsubmit=dojo.hitch(this,function(){
if(!form.action){
form.action=this.url.build(this._urlParams);
}
dojo.xhr(form.method||"post",{handleAs:"html",form:form,load:dojo.hitch(this,this._load),error:dojo.hitch(this,this._error),timeout:this.timeout});
this.onSubmit(form);
return false;
});
},onSubmit:function(){
},onReplace:function(){
}});
}
if(!dojo._hasResource["insight.components.ErrorDialog"]){
dojo._hasResource["insight.components.ErrorDialog"]=true;
dojo.provide("insight.components.ErrorDialog");
dojo.declare("insight.components.ErrorDialog",[insight.components.PageModule,dojo.Stateful],{errorListDomNode:null,pauseThreshold:4,_pausedDueToErrors:false,_errorLog:null,_showOnError:false,postCreate:function(){
this.inherited(arguments);
this.hide(true);
this.subscribe("insight/error",this.addError);
this.errorListDomNode=dojo.query(".page-module-body .errorList table",this.domNode)[0];
this.errorList=new dijit.TitlePane({title:"Error Details",open:true},dojo.query(".page-module-body .errorList",this.domNode)[0]);
this.errorList.startup();
dojo.style(this.errorList.containerNode,{maxHeight:"150px",overflowY:"auto"});
},hide:function(){
this.inherited(arguments);
this._errorLog=[];
this._emptyList=true;
if(this._pausedDueToErrors){
Insight.play();
this._pausedDueToErrors=false;
dojo.publish("insight/error/play");
}
if(this._pausedNode){
this._pausedNode.parentNode.removeChild(this._pausedNode);
this._pausedNode=null;
}
dojo.publish("insight/error/close");
},addError:function(_104a,code,uid,minor){
var mode=this._emptyList?"only":"first",now=dojo.date.locale.format(new Date(),{formatLength:"medium"});
this._emptyList=false;
dojo.create("tr",{innerHTML:"<td class='nowrap'>"+now+"</td><td class='nowrap'>"+code+"</td><td><span class='collapse-container'><span class='collapse-display'>"+_104a+"</span><span class='collapse-spacing'>"+dojo.string.pad("-",_104a.length*1.25,"- ")+"</span></span></td>"},this.errorListDomNode,mode);
if(this.hidden()&&this._showOnError){
this.show();
}
if(!uid||this._errorLog.indexOf(uid)==-1&&!minor){
this._errorLog.push(uid);
}
if(this._errorLog.length>=this.pauseThreshold&&Insight.playing()&&!this._pausedNode){
Insight.pause();
this._pausedDueToErrors=true;
this._pausedNode=dojo.create("p",{className:"warning",innerHTML:"Data playback paused due to excessive errors.  Close error dialog to resume playback."},this.errorList.domNode,"before");
dojo.publish("insight/error/pause");
}
},_setShowOnErrorAttr:function(_104b){
this._showOnError=_104b;
},_getShowOnErrorAttr:function(){
return this._showOnError;
}});
}
if(!dojo._hasResource["insight.components.MenuItemLink"]){
dojo._hasResource["insight.components.MenuItemLink"]=true;
dojo.provide("insight.components.MenuItemLink");
dojo.declare("insight.components.MenuItemLink",dijit.MenuItem,{href:null,onClick:function(){
Insight.logEvent("MenuItem","Click",this.label);
window.location=this.href.toString();
}});
}
if(!dojo._hasResource["insight.components.SelectDropDownButton"]){
dojo._hasResource["insight.components.SelectDropDownButton"]=true;
dojo.provide("insight.components.SelectDropDownButton");
dojo.declare("insight.components.SelectDropDownButton",[dijit.form.DropDownButton],{_selected:null,_menuItems:[],create:function(_104c,_104d){
var _104e=dojo.byId(_104d),menu=new dijit.Menu({},dojo.doc.createElement("div"));
dojo.query("option",_104e).forEach(function(_104f){
var label=_104f.text,value=_104f.value;
var item=new dijit.MenuItem({label:label},dojo.doc.createElement("div"));
this._menuItems.push({menu:menu,menuItem:item,label:label,value:value});
menu.addChild(item);
},this);
this.dropDown=menu;
this._selected=_104e.value;
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
dojo.forEach(this._menuItems,function(item){
this.connect(item.menuItem,"onClick",function(){
this.attr("selected",item);
this.onChange(item.value);
});
if(this._selected==item.value){
this.attr("selected",item);
}
},this);
if(!this._selected){
this.attr("selected",this._menuItems[0].menuItem);
}
},_setSelectedAttr:function(item){
if(item){
this._selected=item.value;
this.attr("label",item.label);
}
},onChange:function(value){
}});
}
if(!dojo._hasResource["insight.components.SortableTable"]){
dojo._hasResource["insight.components.SortableTable"]=true;
dojo.provide("insight.components.SortableTable");
dojo.declare("insight.components.SortableTable",insight.components.PageModule,{sortSettings:{field:null,desc:null},defaultSortSettings:{field:null,desc:null},persist:true,startup:function(){
if(!this.sortSettings.field){
this._defaultSortSettings();
}
this.connect(this,"onReplace",this._enhanceTable);
this.inherited(arguments);
},sort:function(field,desc){
this.sortSettings.field=field;
this.sortSettings.desc=desc;
if(this.persist&&dojo.cookie.isSupported()){
dojo.cookie(this.id+"_sortSettings",dojo.toJson(this.sortSettings));
}
this._urlParams.sortField=this.sortSettings.field;
this._urlParams.sortDesc=this.sortSettings.desc;
this.load();
},_enhanceTable:function(){
dojo.query(".sort-field",this.domNode).forEach(this._enhanceSortableHeaders,this);
dojo.query("tbody td.collapse",this.domNode).forEach(this._enhanceCollapsibleCells,this);
},_enhanceSortableHeaders:function(th){
var _1050="sort-field-";
var field=null;
dojo.forEach(th["className"].split(" "),function(name){
if(name.indexOf(_1050)==0){
field=name.substr(_1050.length);
}
});
if(field==this.sortSettings.field){
var label=dojo.doc.createElement("div");
label.innerHTML=th.innerHTML;
dojo.addClass(th,"sorted");
dojo.addClass(th,this.sortSettings.desc?"sorted-asc":"sorted-desc");
dojo.place(label,th,"only");
}
this.connect(th,"onclick",function(){
if(this.sortSettings.field==field){
this.sort(field,!this.sortSettings.desc);
}else{
this.sort(field,dojo.hasClass(th,"numeric")||dojo.hasClass(th,"sort-numeric"));
}
});
},_enhanceCollapsibleCells:function(td){
var _1051=dojo.doc.createElement("SPAN"),_1052=dojo.doc.createElement("SPAN"),_1053=dojo.doc.createElement("SPAN");
dojo.addClass(_1051,"collapse-container");
dojo.addClass(_1052,"collapse-display");
dojo.addClass(_1053,"collapse-spacing");
dojo.place(_1052,_1051,"last");
dojo.place(_1053,_1051,"last");
dojo.forEach(td.childNodes,function(node){
dojo.place(node,_1052,"last");
},this);
_1053.innerHTML=this._createSpacer(_1052);
dojo.place(_1051,td,"only");
},_createSpacer:function(node,_1054){
_1054=_1054||"";
dojo.forEach(node.childNodes,function(_1055){
_1054+=this._createSpacer(_1055,_1054);
},this);
if(node.nodeType==3){
_1054+=dojo.string.pad("-",dojo.string.trim(node.nodeValue).length*1.25,"- ");
}
return _1054;
},_defaultSortSettings:function(){
var _1056;
if(this.persist&&dojo.cookie.isSupported()){
_1056=dojo.fromJson(dojo.cookie(this.id+"_sortSettings"));
}
if(!_1056){
_1056=this.defaultSortSettings;
}
this.sortSettings=_1056;
this._urlParams.sortField=this.sortSettings.field;
this._urlParams.sortDesc=this.sortSettings.desc;
}});
}
if(!dojo._hasResource["insight.components.ToggleMenuItem"]){
dojo._hasResource["insight.components.ToggleMenuItem"]=true;
dojo.provide("insight.components.ToggleMenuItem");
dojo.declare("insight.components.ToggleMenuItem",dijit.MenuItem,{templateString:dojo.cache("insight.components","templates/ToggleMenuItem.html","<tr class=\"dijitReset dijitMenuItem\" dojoAttachPoint=\"focusNode\" waiRole=\"menuitemcheckbox\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" waiRole=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" dojoAttachPoint=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" dojoAttachPoint=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" dojoAttachPoint=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" waiRole=\"presentation\">&nbsp;</td>\n</tr>\n"),value:"",toggleStates:["","+","-"],toggleCssClass:{"":"","+":"Plus","-":"Minus"},postCreate:function(){
this.inherited(arguments);
var i=dojo.indexOf(this.toggleStates,this.value);
this.set("value",this.toggleStates[i>=0?i:0]);
},_setValueAttr:function(value){
dojo.forEach(this.toggleStates,function(state){
var _1057=this.toggleCssClass[state];
if(state===value){
dojo.addClass(this.domNode,"insightToggleMenuItemChecked"+_1057);
}else{
dojo.removeClass(this.domNode,"insightToggleMenuItemChecked"+_1057);
}
},this);
this.value=value;
},onChange:function(value){
},_onClick:function(e){
if(!this.disabled){
var index=(dojo.indexOf(this.toggleStates,this.value)+1)%this.toggleStates.length;
this.set("value",this.toggleStates[index]);
this.onChange(this.value);
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.DeferredList"]){
dojo._hasResource["dojo.DeferredList"]=true;
dojo.provide("dojo.DeferredList");
dojo.DeferredList=function(list,_1058,_1059,_105a,_105b){
var _105c=[];
dojo.Deferred.call(this);
var self=this;
if(list.length===0&&!_1058){
this.resolve([0,[]]);
}
var _105d=0;
dojo.forEach(list,function(item,i){
item.then(function(_105e){
if(_1058){
self.resolve([i,_105e]);
}else{
_105f(true,_105e);
}
},function(error){
if(_1059){
self.reject(error);
}else{
_105f(false,error);
}
if(_105a){
return null;
}
throw error;
});
function _105f(_1060,_1061){
_105c[i]=[_1060,_1061];
_105d++;
if(_105d===list.length){
self.resolve(_105c);
}
};
});
};
dojo.DeferredList.prototype=new dojo.Deferred();
dojo.DeferredList.prototype.gatherResults=function(_1062){
var d=new dojo.DeferredList(_1062,false,true,false);
d.addCallback(function(_1063){
var ret=[];
dojo.forEach(_1063,function(_1064){
ret.push(_1064[1]);
});
return ret;
});
return d;
};
}
if(!dojo._hasResource["dijit.tree.ForestStoreModel"]){
dojo._hasResource["dijit.tree.ForestStoreModel"]=true;
dojo.provide("dijit.tree.ForestStoreModel");
dojo.declare("dijit.tree.ForestStoreModel",dijit.tree.TreeStoreModel,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_1065){
this.root={store:this,root:true,id:_1065.rootId,label:_1065.rootLabel,children:_1065.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_1066,_1067,_1068){
if(_1066===this.root){
if(this.root.children){
_1067(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:dojo.hitch(this,function(items){
this.root.children=items;
_1067(items);
}),onError:_1068});
}
}else{
this.inherited(arguments);
}
},isItem:function(_1069){
return (_1069===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_106a){
if(_106a.identity==this.root.id){
var scope=_106a.scope?_106a.scope:dojo.global;
if(_106a.onItem){
_106a.onItem.call(scope,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_106b,_106c){
if(_106b===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(args){
},pasteItem:function(_106d,_106e,_106f,bCopy,_1070){
if(_106e===this.root){
if(!bCopy){
this.onLeaveRoot(_106d);
}
}
dijit.tree.TreeStoreModel.prototype.pasteItem.call(this,_106d,_106e===this.root?null:_106e,_106f===this.root?null:_106f,bCopy,_1070);
if(_106f===this.root){
this.onAddToRoot(_106d);
}
},onAddToRoot:function(item){
},onLeaveRoot:function(item){
},_requeryTop:function(){
var _1071=this.root.children||[];
this.store.fetch({query:this.query,onComplete:dojo.hitch(this,function(_1072){
this.root.children=_1072;
if(_1071.length!=_1072.length||dojo.some(_1071,function(item,idx){
return _1072[idx]!=item;
})){
this.onChildrenChange(this.root,_1072);
}
})});
},onNewItem:function(item,_1073){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(dojo.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_1074,_1075,_1076){
this._requeryTop();
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit.tree._dndContainer"]){
dojo._hasResource["dijit.tree._dndContainer"]=true;
dojo.provide("dijit.tree._dndContainer");
dojo.getObject("tree",true,dojo);
dijit.tree._compareNodes=function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
};
dojo.declare("dijit.tree._dndContainer",null,{constructor:function(tree,_1077){
this.tree=tree;
this.node=tree.domNode;
dojo.mixin(this,_1077);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
this.events=[dojo.connect(this.node,"onmouseenter",this,"onOverEvent"),dojo.connect(this.node,"onmouseleave",this,"onOutEvent"),dojo.connect(this.tree,"_onNodeMouseEnter",this,"onMouseOver"),dojo.connect(this.tree,"_onNodeMouseLeave",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",dojo,"stopEvent"),dojo.connect(this.node,"onselectstart",dojo,"stopEvent")];
},getItem:function(key){
var _1078=this.selection[key],ret={data:_1078,type:["treeNode"]};
return ret;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.node=this.parent=null;
},onMouseOver:function(_1079,evt){
this.current=_1079;
},onMouseOut:function(_107a,evt){
this.current=null;
},_changeState:function(type,_107b){
var _107c="dojoDnd"+type;
var state=type.toLowerCase()+"State";
dojo.replaceClass(this.node,_107c+_107b,_107c+this[state]);
this[state]=_107b;
},_addItemClass:function(node,type){
dojo.addClass(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
dojo.removeClass(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
}
if(!dojo._hasResource["dijit.tree._dndSelector"]){
dojo._hasResource["dijit.tree._dndSelector"]=true;
dojo.provide("dijit.tree._dndSelector");
dojo.declare("dijit.tree._dndSelector",dijit.tree._dndContainer,{constructor:function(tree,_107d){
this.selection={};
this.anchor=null;
dijit.setWaiState(this.tree.domNode,"multiselect",!this.singular);
this.events.push(dojo.connect(this.tree.domNode,"onmousedown",this,"onMouseDown"),dojo.connect(this.tree.domNode,"onmouseup",this,"onMouseUp"),dojo.connect(this.tree.domNode,"onmousemove",this,"onMouseMove"));
},singular:false,getSelectedTreeNodes:function(){
var nodes=[],sel=this.selection;
for(var i in sel){
nodes.push(sel[i]);
}
return nodes;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_107e){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_107e){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_107f){
var _1080=this.getSelectedTreeNodes();
dojo.forEach(this._setDifference(_1080,_107f),dojo.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
dojo.forEach(this._setDifference(_107f,_1080),dojo.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
dojo.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=dojo.filter(xs,function(x){
return !x.__exclude__;
});
dojo.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _1081=this.getSelectedTreeNodes();
var paths=[],nodes=[];
dojo.forEach(_1081,function(node){
nodes.push(node);
paths.push(node.getTreePath());
});
var items=dojo.map(nodes,function(node){
return node.item;
});
this.tree._set("paths",paths);
this.tree._set("path",paths[0]||[]);
this.tree._set("selectedNodes",nodes);
this.tree._set("selectedNode",nodes[0]||null);
this.tree._set("selectedItems",items);
this.tree._set("selectedItem",items[0]||null);
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(e.button==dojo.mouseButtons.RIGHT){
return;
}
dojo.stopEvent(e);
var _1082=this.current,copy=dojo.isCopyKey(e),id=_1082.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_1082,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,dojo.isCopyKey(e),e.shiftKey);
},onMouseMove:function(e){
this._doDeselect=false;
},userSelect:function(node,multi,range){
if(this.singular){
if(this.anchor==node&&multi){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(range&&this.anchor){
var cr=dijit.tree._compareNodes(this.anchor.rowNode,node.rowNode),begin,end,_1083=this.anchor;
if(cr<0){
begin=_1083;
end=node;
}else{
begin=node;
end=_1083;
}
nodes=[];
while(begin!=end){
nodes.push(begin);
begin=this.tree._getNextNode(begin);
}
nodes.push(end);
this.setSelection(nodes);
}else{
if(this.selection[node.id]&&multi){
this.removeTreeNode(node);
}else{
if(multi){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},forInSelectedItems:function(f,o){
o=o||dojo.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
}
if(!dojo._hasResource["dijit.Tree"]){
dojo._hasResource["dijit.Tree"]=true;
dojo.provide("dijit.Tree");
dojo.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained,dijit._CssStateMixin],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:dojo.cache("dijit","templates/TreeNode.html","<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div dojoAttachPoint=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\" dojoAttachEvent=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span dojoAttachPoint=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span dojoAttachPoint=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span dojoAttachPoint=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\" dojoAttachEvent=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div dojoAttachPoint=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n"),baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow",labelNode:"dijitTreeLabel"},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"labelNode",type:"innerText"},tooltip:{node:"rowNode",type:"attribute",attribute:"title"}}),buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
dijit.setWaiState(this.labelNode,"expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_1084){
var _1085=(Math.max(_1084,0)*this.tree._nodePixelIndent)+"px";
dojo.style(this.domNode,"backgroundPosition",_1085+" 0px");
dojo.style(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_1085);
dojo.forEach(this.getChildren(),function(child){
child.set("indent",_1084+1);
});
this._set("indent",_1084);
},markProcessing:function(){
this.state="LOADING";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,model=tree.model;
if(tree._v10Compat&&item===model.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
},_applyClassAndStyle:function(item,lower,upper){
var _1086="_"+lower+"Class";
var _1087=lower+"Node";
var _1088=this[_1086];
this[_1086]=this.tree["get"+upper+"Class"](item,this.isExpanded);
dojo.replaceClass(this[_1087],this[_1086]||"",_1088||"");
dojo.style(this[_1087],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _1089=this.getParent();
if(!_1089||_1089.rowNode.style.display=="none"){
dojo.addClass(this.domNode,"dijitTreeIsRoot");
}else{
dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_108a){
var _108b=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_108c=["*","-","+","*"],idx=_108a?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.replaceClass(this.expandoNode,_108b[idx],_108b);
this.expandoNodeText.innerHTML=_108c[idx];
},expand:function(){
if(this._expandDeferred){
return this._expandDeferred;
}
this._wipeOut&&this._wipeOut.stop();
this.isExpanded=true;
dijit.setWaiState(this.labelNode,"expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
dijit.setWaiRole(this.containerNode,"group");
}
dojo.addClass(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode){
dijit.setWaiState(this.tree.domNode,"expanded","true");
}
var def,_108d=dojo.fx.wipeIn({node:this.containerNode,duration:dijit.defaultDuration,onEnd:function(){
def.callback(true);
}});
def=(this._expandDeferred=new dojo.Deferred(function(){
_108d.stop();
}));
_108d.play();
return def;
},collapse:function(){
if(!this.isExpanded){
return;
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
dijit.setWaiState(this.labelNode,"expanded","false");
if(this==this.tree.rootNode){
dijit.setWaiState(this.tree.domNode,"expanded","false");
}
dojo.removeClass(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(!this._wipeOut){
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:dijit.defaultDuration});
}
this._wipeOut.play();
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
dojo.forEach(this.getChildren(),function(child){
dijit._Container.prototype.removeChild.call(this,child);
},this);
this.state="LOADED";
if(items&&items.length>0){
this.isExpandable=true;
dojo.forEach(items,function(item){
var id=model.getIdentity(item),_108e=tree._itemNodesMap[id],node;
if(_108e){
for(var i=0;i<_108e.length;i++){
if(_108e[i]&&!_108e[i].getParent()){
node=_108e[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),dir:tree.dir,lang:tree.lang,indent:this.indent+1});
if(_108e){
_108e.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(item)){
defs.push(tree._expandNode(node));
}
},this);
dojo.forEach(this.getChildren(),function(child,idx){
child._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
if(this==tree.rootNode){
var fc=this.tree.showRoot?this:this.getChildren()[0];
if(fc){
fc.setFocusable(true);
tree.lastFocused=fc;
}else{
tree.domNode.setAttribute("tabIndex","0");
}
}
return new dojo.DeferredList(defs);
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _108f=this.getChildren();
if(_108f.length==0){
this.isExpandable=false;
this.collapse();
}
dojo.forEach(_108f,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},_onLabelFocus:function(evt){
this.tree._onNodeFocus(this);
},setSelected:function(_1090){
dijit.setWaiState(this.labelNode,"selected",_1090);
dojo.toggleClass(this.rowNode,"dijitTreeRowSelected",_1090);
},setFocusable:function(_1091){
this.labelNode.setAttribute("tabIndex",_1091?"0":"-1");
},_onClick:function(evt){
this.tree._onClick(this,evt);
},_onDblClick:function(evt){
this.tree._onDblClick(this,evt);
},_onMouseEnter:function(evt){
this.tree._onNodeMouseEnter(this,evt);
},_onMouseLeave:function(evt){
this.tree._onNodeMouseLeave(this,evt);
}});
dojo.declare("dijit.Tree",[dijit._Widget,dijit._Templated],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:dojo.cache("dijit","templates/Tree.html","<div class=\"dijitTree dijitTreeContainer\" role=\"tree\"\n\tdojoAttachEvent=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" dojoAttachPoint=\"indentDetector\"></div>\n</div>\n"),persist:true,autoExpand:false,dndController:"dijit.tree._dndSelector",dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_1092,_1093){
dojo.publish(this.id,[dojo.mixin({tree:this,event:_1092},_1093||{})]);
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName){
this.cookieName=this.id+"SaveStateCookie";
}
this._loadDeferred=new dojo.Deferred();
this.inherited(arguments);
},postCreate:function(){
this._initState();
if(!this.model){
this._store2model();
}
this.connect(this.model,"onChange","_onItemChange");
this.connect(this.model,"onChildrenChange","_onItemChildrenChange");
this.connect(this.model,"onDelete","_onItemDelete");
this._load();
this.inherited(arguments);
if(this.dndController){
if(dojo.isString(this.dndController)){
this.dndController=dojo.getObject(this.dndController);
}
var _1094={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_1094[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_1094);
}
},_store2model:function(){
this._v10Compat=true;
dojo.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _1095={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_1095.mayHaveChildren=dojo.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_1095.getChildren=dojo.hitch(this,function(item,_1096,_1097){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_1096,_1097);
});
}
this.model=new dijit.tree.ForestStoreModel(_1095);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(dojo.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
dijit.setWaiRole(this.domNode,"presentation");
dijit.setWaiRole(rn.labelNode,"presentation");
dijit.setWaiRole(rn.containerNode,"tree");
}
this.domNode.appendChild(rn.domNode);
var _1098=this.model.getIdentity(item);
if(this._itemNodesMap[_1098]){
this._itemNodesMap[_1098].push(rn);
}else{
this._itemNodesMap[_1098]=[rn];
}
rn._updateLayout();
this._expandNode(rn).addCallback(dojo.hitch(this,function(){
this._loadDeferred.callback(true);
this.onLoad();
}));
}),function(err){
console.error(this,": error loading root: ",err);
});
},getNodesByItem:function(item){
if(!item){
return [];
}
var _1099=dojo.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_1099]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
this._loadDeferred.addCallback(dojo.hitch(this,function(){
var _109a=dojo.map(items,function(item){
return (!item||dojo.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
dojo.forEach(_109a,function(id){
nodes=nodes.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",nodes);
}));
},_setPathAttr:function(path){
if(path.length){
return this.set("paths",[path]);
}else{
return this.set("paths",[]);
}
},_setPathsAttr:function(paths){
var tree=this;
return new dojo.DeferredList(dojo.map(paths,function(path){
var d=new dojo.Deferred();
path=dojo.map(path,function(item){
return dojo.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
tree._loadDeferred.addCallback(function(){
_109b(path,[tree.rootNode],d);
});
}else{
d.errback("Empty path");
}
return d;
})).addCallback(_109c);
function _109b(path,nodes,def){
var _109d=path.shift();
var _109e=dojo.filter(nodes,function(node){
return node.getIdentity()==_109d;
})[0];
if(!!_109e){
if(path.length){
tree._expandNode(_109e).addCallback(function(){
_109b(path,_109e.getChildren(),def);
});
}else{
def.callback(_109e);
}
}else{
def.errback("Could not expand path at "+_109d);
}
};
function _109c(_109f){
tree.set("selectedNodes",dojo.map(dojo.filter(_109f,function(x){
return x[0];
}),function(x){
return x[1];
}));
};
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(nodes){
this._loadDeferred.addCallback(dojo.hitch(this,function(){
this.dndController.setSelection(nodes);
}));
},mayHaveChildren:function(item){
},getItemChildren:function(_10a0,_10a1){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_10a2){
return (!item||this.model.mayHaveChildren(item))?(_10a2?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(item,_10a3){
},getRowClass:function(item,_10a4){
},getIconStyle:function(item,_10a5){
},getLabelStyle:function(item,_10a6){
},getRowStyle:function(item,_10a7){
},getTooltip:function(item){
return "";
},_onKeyPress:function(e){
if(e.altKey){
return;
}
var dk=dojo.keys;
var _10a8=dijit.getEnclosingWidget(e.target);
if(!_10a8){
return;
}
var key=e.charOrCode;
if(typeof key=="string"&&key!=" "){
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
this._onLetterKeyNav({node:_10a8,key:key.toLowerCase()});
dojo.stopEvent(e);
}
}else{
if(this._curSearch){
clearTimeout(this._curSearch.timer);
delete this._curSearch;
}
var map=this._keyHandlerMap;
if(!map){
map={};
map[dk.ENTER]="_onEnterKey";
map[dk.SPACE]=map[" "]="_onEnterKey";
map[this.isLeftToRight()?dk.LEFT_ARROW:dk.RIGHT_ARROW]="_onLeftArrow";
map[this.isLeftToRight()?dk.RIGHT_ARROW:dk.LEFT_ARROW]="_onRightArrow";
map[dk.UP_ARROW]="_onUpArrow";
map[dk.DOWN_ARROW]="_onDownArrow";
map[dk.HOME]="_onHomeKey";
map[dk.END]="_onEndKey";
this._keyHandlerMap=map;
}
if(this._keyHandlerMap[key]){
this[this._keyHandlerMap[key]]({node:_10a8,item:_10a8.item,evt:e});
dojo.stopEvent(e);
}
}
},_onEnterKey:function(_10a9){
this._publish("execute",{item:_10a9.item,node:_10a9.node});
this.dndController.userSelect(_10a9.node,dojo.isCopyKey(_10a9.evt),_10a9.evt.shiftKey);
this.onClick(_10a9.item,_10a9.node,_10a9.evt);
},_onDownArrow:function(_10aa){
var node=this._getNextNode(_10aa.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_10ab){
var node=_10ab.node;
var _10ac=node.getPreviousSibling();
if(_10ac){
node=_10ac;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _10ad=node.getChildren();
node=_10ad[_10ad.length-1];
}
}else{
var _10ae=node.getParent();
if(!(!this.showRoot&&_10ae===this.rootNode)){
node=_10ae;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_10af){
var node=_10af.node;
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(_10b0){
var node=_10b0.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _10b1=node.getParent();
if(_10b1&&_10b1.isTreeNode&&!(!this.showRoot&&_10b1===this.rootNode)){
this.focusNode(_10b1);
}
}
},_onHomeKey:function(){
var node=this._getRootOrFirstNode();
if(node){
this.focusNode(node);
}
},_onEndKey:function(_10b2){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
node=c[c.length-1];
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},multiCharSearchDuration:250,_onLetterKeyNav:function(_10b3){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_10b3.key;
clearTimeout(cs.timer);
}else{
cs=this._curSearch={pattern:_10b3.key,startNode:_10b3.node};
}
var self=this;
cs.timer=setTimeout(function(){
delete self._curSearch;
},this.multiCharSearchDuration);
var node=cs.startNode;
do{
node=this._getNextNode(node);
if(!node){
node=this._getRootOrFirstNode();
}
}while(node!==cs.startNode&&(node.label.toLowerCase().substr(0,cs.pattern.length)!=cs.pattern));
if(node&&node.isTreeNode){
if(node!==cs.startNode){
this.focusNode(node);
}
}
},isExpandoNode:function(node,_10b4){
return dojo.isDescendant(node,_10b4.expandoNode);
},_onClick:function(_10b5,e){
var _10b6=e.target,_10b7=this.isExpandoNode(_10b6,_10b5);
if((this.openOnClick&&_10b5.isExpandable)||_10b7){
if(_10b5.isExpandable){
this._onExpandoClick({node:_10b5});
}
}else{
this._publish("execute",{item:_10b5.item,node:_10b5,evt:e});
this.onClick(_10b5.item,_10b5,e);
this.focusNode(_10b5);
}
dojo.stopEvent(e);
},_onDblClick:function(_10b8,e){
var _10b9=e.target,_10ba=(_10b9==_10b8.expandoNode||_10b9==_10b8.expandoNodeText);
if((this.openOnDblClick&&_10b8.isExpandable)||_10ba){
if(_10b8.isExpandable){
this._onExpandoClick({node:_10b8});
}
}else{
this._publish("execute",{item:_10b8.item,node:_10b8,evt:e});
this.onDblClick(_10b8.item,_10b8,e);
this.focusNode(_10b8);
}
dojo.stopEvent(e);
},_onExpandoClick:function(_10bb){
var node=_10bb.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(item,node,evt){
},onDblClick:function(item,node,evt){
},onOpen:function(item,node){
},onClose:function(item,node){
},_getNextNode:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _10bc=node.getNextSibling();
if(_10bc){
return _10bc;
}
node=node.getParent();
}
return null;
}
},_getRootOrFirstNode:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.isExpandable){
if(node.state=="LOADING"){
return;
}
node.collapse();
this.onClose(node.item,node);
if(node.item){
this._state(node.item,false);
this._saveState();
}
}
},_expandNode:function(node,_10bd){
if(node._expandNodeDeferred&&!_10bd){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_10be=this;
switch(node.state){
case "UNCHECKED":
node.markProcessing();
var def=(node._expandNodeDeferred=new dojo.Deferred());
model.getChildren(item,function(items){
node.unmarkProcessing();
var scid=node.setChildItems(items);
var ed=_10be._expandNode(node,true);
scid.addCallback(function(){
ed.addCallback(function(){
def.callback();
});
});
},function(err){
console.error(_10be,": error loading root children: ",err);
});
break;
default:
def=(node._expandNodeDeferred=node.expand());
this.onOpen(node.item,node);
if(item){
this._state(item,true);
this._saveState();
}
}
return def;
},focusNode:function(node){
dijit.focus(node.labelNode);
},_onNodeFocus:function(node){
if(node&&node!=this.lastFocused){
if(this.lastFocused&&!this.lastFocused._destroyed){
this.lastFocused.setFocusable(false);
}
node.setFocusable(true);
this.lastFocused=node;
}
},_onNodeMouseEnter:function(node){
},_onNodeMouseLeave:function(node){
},_onItemChange:function(item){
var model=this.model,_10bf=model.getIdentity(item),nodes=this._itemNodesMap[_10bf];
if(nodes){
var label=this.getLabel(item),_10c0=this.getTooltip(item);
dojo.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_10c0});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_10c1,_10c2){
var model=this.model,_10c3=model.getIdentity(_10c1),_10c4=this._itemNodesMap[_10c3];
if(_10c4){
dojo.forEach(_10c4,function(_10c5){
_10c5.setChildItems(_10c2);
});
}
},_onItemDelete:function(item){
var model=this.model,_10c6=model.getIdentity(item),nodes=this._itemNodesMap[_10c6];
if(nodes){
dojo.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _10c7=node.getParent();
if(_10c7){
_10c7.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_10c6];
}
},_initState:function(){
if(this.persist){
var _10c8=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(_10c8){
dojo.forEach(_10c8.split(","),function(item){
this._openedItemIds[item]=true;
},this);
}
}
},_state:function(item,_10c9){
if(!this.persist){
return false;
}
var id=this.model.getIdentity(item);
if(arguments.length===1){
return this._openedItemIds[id];
}
if(_10c9){
this._openedItemIds[id]=true;
}else{
delete this._openedItemIds[id];
}
},_saveState:function(){
if(!this.persist){
return;
}
var ary=[];
for(var id in this._openedItemIds){
ary.push(id);
}
dojo.cookie(this.cookieName,ary.join(","),{expires:365});
},destroy:function(){
if(this._curSearch){
clearTimeout(this._curSearch.timer);
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!dojo.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_10ca){
if(_10ca){
dojo.marginBox(this.domNode,_10ca);
}
this._nodePixelIndent=dojo._getMarginSize(this.tree.indentDetector).w;
if(this.tree.rootNode){
this.tree.rootNode.set("indent",this.showRoot?0:-1);
}
},_createTreeNode:function(args){
return new dijit._TreeNode(args);
}});
}
if(!dojo._hasResource["insight.components.Tree"]){
dojo._hasResource["insight.components.Tree"]=true;
dojo.provide("insight.components.Tree");
dojo.declare("insight.components.TreeNode",dijit._TreeNode,{attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"labelNode",type:"innerHTML"},tooltip:{node:"rowNode",type:"attribute",attribute:"title"}}),_onMouseEnter:function(evt){
dojo.addClass(this.rowNode,"dijitTreeHighlight");
this.inherited(arguments);
},_onMouseLeave:function(evt){
dojo.removeClass(this.rowNode,"dijitTreeHighlight");
this.inherited(arguments);
}});
dojo.declare("insight.components.Tree",dijit.Tree,{_createTreeNode:function(args){
return new insight.components.TreeNode(args);
}});
}
if(!dojo._hasResource["insight.dojo.requireCss"]){
dojo._hasResource["insight.dojo.requireCss"]=true;
dojo.provide("insight.dojo.requireCss");
(function(){
var _10cb=0;
var _10cc={};
var _10cd=null;
var _10ce=0;
var _10cf={};
var _10d0=null;
var _10d1=function(){
var _10d2=false;
for(var param in _10cc){
if(typeof param=="string"){
_10d2=true;
}
}
if(_10d2){
var _10d3=(dojo.config.cssWaitSeconds||15)*1000;
if((_10ce+_10d3)<(new Date()).getTime()){
var err="Timed out waiting for css files: ";
for(param in _10cc){
err+=param+" ";
}
throw err;
}
}else{
clearInterval(_10cd);
_10cd=null;
if(_10d0!=null){
_10d0();
}
}
};
dojo.requireCss=function(_10d4,func){
if(_10cf[_10d4]){
return true;
}
var path=_10d4;
if(path.indexOf("/")==-1){
path=dojo._getModuleSymbols(_10d4).join("/")+".css";
path=((path.charAt(0)=="/"||path.match(/^\w+:/))?"":dojo.baseUrl)+path;
}
if(dojo.config.cacheBust){
path+=(path.indexOf("?")==-1?"?":"&")+String(dojo.config.cacheBust).replace(/\W+/g,"");
}
var style=dojo.doc.createElement("style");
style.type="text/css";
_10cc[path]=style;
_10cf[_10d4]=true;
dojo.xhrGet({url:path}).then(function(_10d5){
if(style.styleSheet){
var _10d6=_10d5.match(/@import\s+url\s*\(\s*['|"]([^'|"]+)['|"]\s*\);?/g);
if(_10d6){
iMax=_10d6.length;
for(i=0;i<iMax;i++){
_10d6[i].match(/['|"]([^'|^"]+)['|"]/);
dojo.requireCss(RegExp.$1);
}
}
style.styleSheet.cssText=_10d5;
}else{
style.appendChild(document.createTextNode(_10d5));
}
delete _10cc[path];
if(typeof func=="function"){
func();
}
return (_10d5);
});
if(!this.headElement){
this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){
this._headElement=document.getElementsByTagName("html")[0];
}
}
this._headElement.appendChild(style);
_10ce=(new Date()).getTime();
if(!_10cd){
_10cd=setInterval(_10d1,100);
}
};
dojo.requireCss.setCallback=function(func){
if(typeof func=="function"){
_10d0=func;
}
};
})();
}
if(!dojo._hasResource["dojo.hash"]){
dojo._hasResource["dojo.hash"]=true;
dojo.provide("dojo.hash");
(function(){
dojo.hash=function(hash,_10d7){
if(!arguments.length){
return _10d8();
}
if(hash.charAt(0)=="#"){
hash=hash.substring(1);
}
if(_10d7){
_10d9(hash);
}else{
location.href="#"+hash;
}
return hash;
};
var _10da,_10db,_10dc,_10dd=dojo.config.hashPollFrequency||100;
function _10de(str,_10df){
var i=str.indexOf(_10df);
return (i>=0)?str.substring(i+1):"";
};
function _10d8(){
return _10de(location.href,"#");
};
function _10e0(){
dojo.publish("/dojo/hashchange",[_10d8()]);
};
function _10e1(){
if(_10d8()===_10da){
return;
}
_10da=_10d8();
_10e0();
};
function _10d9(hash){
if(_10db){
if(_10db.isTransitioning()){
setTimeout(dojo.hitch(null,_10d9,hash),_10dd);
return;
}
var href=_10db.iframe.location.href;
var index=href.indexOf("?");
_10db.iframe.location.replace(href.substring(0,index)+"?"+hash);
return;
}
location.replace("#"+hash);
!_10dc&&_10e1();
};
function _10e2(){
var ifr=document.createElement("iframe"),_10e3="dojo-hash-iframe",_10e4=dojo.config.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html");
if(dojo.config.useXDomain&&!dojo.config.dojoBlankHtmlUrl){
console.warn("dojo.hash: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
ifr.id=_10e3;
ifr.src=_10e4+"?"+_10d8();
ifr.style.display="none";
document.body.appendChild(ifr);
this.iframe=dojo.global[_10e3];
var _10e5,_10e6,_10e7,_10e8,_10e9,_10ea=this.iframe.location;
function _10eb(){
_10da=_10d8();
_10e5=_10e9?_10da:_10de(_10ea.href,"?");
_10e6=false;
_10e7=null;
};
this.isTransitioning=function(){
return _10e6;
};
this.pollLocation=function(){
if(!_10e9){
try{
var _10ec=_10de(_10ea.href,"?");
if(document.title!=_10e8){
_10e8=this.iframe.document.title=document.title;
}
}
catch(e){
_10e9=true;
console.error("dojo.hash: Error adding history entry. Server unreachable.");
}
}
var hash=_10d8();
if(_10e6&&_10da===hash){
if(_10e9||_10ec===_10e7){
_10eb();
_10e0();
}else{
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}
}else{
if(_10da===hash&&(_10e9||_10e5===_10ec)){
}else{
if(_10da!==hash){
_10da=hash;
_10e6=true;
_10e7=hash;
ifr.src=_10e4+"?"+_10e7;
_10e9=false;
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}else{
if(!_10e9){
location.href="#"+_10ea.search.substring(1);
_10eb();
_10e0();
}
}
}
}
setTimeout(dojo.hitch(this,this.pollLocation),_10dd);
};
_10eb();
setTimeout(dojo.hitch(this,this.pollLocation),_10dd);
};
dojo.addOnLoad(function(){
if("onhashchange" in dojo.global&&(!dojo.isIE||(dojo.isIE>=8&&document.compatMode!="BackCompat"))){
_10dc=dojo.connect(dojo.global,"onhashchange",_10e0);
}else{
if(document.addEventListener){
_10da=_10d8();
setInterval(_10e1,_10dd);
}else{
if(document.attachEvent){
_10db=new _10e2();
}
}
}
});
})();
}
if(!dojo._hasResource["insight.resources.ResourceKey"]){
dojo._hasResource["insight.resources.ResourceKey"]=true;
dojo.provide("insight.resources.ResourceKey");
dojo.declare("insight.resources.ResourceKey",null,{_namespace:null,_attributes:null,constructor:function(_10ed){
this._attributes={};
if(dojo.isString(_10ed)){
this._parse(_10ed);
}else{
if(_10ed&&_10ed.declaredClass=="insight.resources.ResourceKey"){
this._namespace=_10ed._namespace;
this._attributes=dojo.mixin({},_10ed._attributes);
}
}
},_parse:function(_10ee){
_10ee=this._parseNamespace(_10ee);
this._parseAttributes(_10ee);
},_parseNamespace:function(_10ef){
var i=_10ef.indexOf(":");
this._namespace=_10ef.substring(0,i);
return _10ef.substring(i+1);
},_parseAttributes:function(_10f0){
var name,value,i;
while(_10f0.length>0){
i=_10f0.indexOf("=");
name=_10f0.substring(0,i);
_10f0=_10f0.substring(i+1);
if(_10f0.charAt(0)==="\""){
i=_10f0.indexOf(",",_10f0.indexOf("\"",1));
}else{
i=_10f0.indexOf(",");
}
if(i===-1){
value=_10f0;
_10f0="";
}else{
value=_10f0.substring(0,i);
_10f0=_10f0.substring(i+1);
}
this._attributes[name]=value;
}
},getName:function(){
return this.getAttribute("name");
},setName:function(name){
this.setAttribute("name",name);
},getType:function(){
return this.getAttribute("type");
},setType:function(type){
return this.setAttribute("type",type);
},getAttributeNames:function(){
var names=[];
for(var name in this._attributes){
if(this._attributes.hasOwnProperty(name)){
names.push(name);
}
}
return names.sort();
},getAttribute:function(name){
return this._attributes[name];
},setAttribute:function(name,value){
if(value){
this._attributes[name]=value;
}else{
delete this._attributes[name];
}
},getNamespace:function(){
return this._namespace;
},setNamespace:function(_10f1){
this._namespace=_10f1;
},makeParentResourceKey:function(){
var type=this.getType(),_10f2,_10f3;
if(!type||type.lastIndexOf(".")==-1){
return null;
}
_10f2=type.substring(0,type.lastIndexOf("."));
_10f3=new insight.resources.ResourceKey();
_10f3.setNamespace(this.getNamespace());
dojo.forEach(this.getAttributeNames(),function(_10f4){
if(_10f4=="type"){
_10f3.setAttribute("type",_10f2);
}else{
if(_10f4==_10f2){
_10f3.setAttribute("name",this.getAttribute(_10f2));
}else{
if(_10f4!="name"){
_10f3.setAttribute(_10f4,this.getAttribute(_10f4));
}
}
}
},this);
return _10f3;
},makeComponentKey:function(_10f5){
if(this.getType()==_10f5){
return this.clone();
}else{
if(!this.getAttribute(_10f5)){
return null;
}
}
var _10f6=new insight.resources.ResourceKey();
_10f6.setNamespace(this.getNamespace());
_10f6.setType(_10f5);
_10f6.setName(this.getType()==_10f5?this.getName():this.getAttribute(_10f5));
dojo.forEach(_10f5.split("."),function(_10f7){
if(_10f5!=_10f7){
_10f6.setAttribute(_10f7,this.getAttribute(_10f7));
}
},this);
return _10f6;
},makeComponentlessKey:function(_10f8){
var _10f9=this.getType().split("."),_10fa=new insight.resources.ResourceKey();
type="";
_10fa.setNamespace(this.getNamespace());
if(this.getType()==_10f8){
return null;
}else{
if(dojo.indexOf(_10f9,_10f8)==-1){
return this.clone();
}
}
_10fa.setName(this.getName());
dojo.forEach(_10f9,function(_10fb){
if(_10f8!=_10fb){
_10fa.setAttribute(_10fb,this.getAttribute(_10fb));
if(type.length>0){
type+=".";
}
type+=_10fb;
}
},this);
_10fa.setType(type);
if(type.indexOf(".")==-1){
_10fa.setName(this.getAttribute(type));
_10fa.setAttribute(type,null);
}
return _10fa;
},makeQueryKey:function(type){
var key=this.clone();
key.setAttribute(key.getType(),key.getName());
if(type){
key.setType(type);
}
key.setName(null);
return key;
},clone:function(){
return new insight.resources.ResourceKey(this.toString());
},merge:function(key){
key=dojo.isString(key)?new insight.resources.ResourceKey(key):key;
if(this.getNamespace()!=key.getNamespace()){
return;
}
var _10fc=key.getType()=="Server"?this.clone():key,_10fd=key.getType()=="Server"?key:this.clone(),merge=new insight.resources.ResourceKey();
merge.setNamespace(this.getNamespace());
if(!_10fc.getName()&&!_10fd.getName()){
return merge;
}else{
if(!_10fc.getName()){
return _10fd;
}else{
if(!_10fd.getName()){
return _10fc;
}
}
}
if(_10fc.getType()=="Application.EndPoint"){
merge.setType("Application.Server.EndPoint");
merge.setName(_10fc.getName());
merge.setAttribute("Application",_10fc.getAttribute("Application"));
merge.setAttribute("Server",_10fd.getName());
}else{
merge.setType("Application.Server");
merge.setName(this.quote(this.unquote(_10fc.getName())+"-"+this.unquote(_10fd.getName())));
merge.setAttribute("Application",_10fc.getName());
merge.setAttribute("Server",_10fd.getName());
}
return merge;
},unquote:function(_10fe){
return _10fe.substring(1,_10fe.length-1);
},quote:function(_10ff){
return "\""+_10ff+"\"";
},toString:function(){
var _1100="",_1101,_1102;
if(this._namespace){
_1100+=this._namespace;
_1100+=":";
}
_1102=this.getAttributeNames();
for(_1101 in _1102){
_1101=_1102[_1101];
if(_1100.indexOf(":")+1!==_1100.length){
_1100+=",";
}
_1100+=_1101;
_1100+="=";
_1100+=this._attributes[_1101];
}
return _1100;
}});
}
if(!dojo._hasResource["insight.traces.TraceList"]){
dojo._hasResource["insight.traces.TraceList"]=true;
dojo.provide("insight.traces.TraceList");
dojo.declare("insight.traces.TraceList",insight.components.SortableTable,{start:null,end:null,_activeRow:null,postCreate:function(){
this.inherited(arguments);
this.start=this.url.params.start;
this.end=this.url.params.end;
},_enhanceTable:function(){
this._addRowInteractivity();
this._selectRow(dojo.query(".trace_list_item",this.domNode)[0]);
this.inherited(arguments);
},loadWindow:function(_1103){
dojo.mixin(this._urlParams,_1103);
this.load();
},_addRowInteractivity:function(){
var _1104=dojo.query("table",this.domNode)[0];
dijit.setWaiRole(_1104,"navigation");
if(!this._keyHandlerMap){
this.connect(_1104,"onkeypress",this._onKeyPress);
}
dojo.query(".trace_list_item",_1104).forEach(function(row){
dijit.setWaiRole(row,"link");
this.connect(row,"onclick",function(){
this._onClick(row);
});
this.connect(row,"onmouseenter",function(){
this._onMouseEnter(row);
});
this.connect(row,"onmouseleave",function(){
this._onMouseLeave(row);
});
dojo.query("a",row).forEach(function(link){
link.parentNode.innerHTML=link.innerHTML;
},this);
},this);
},_selectRow:function(row){
if(row&&dojo.hasClass(row,"trace_list_item")){
if(this._activeRow){
dojo.removeClass(this._activeRow,"selected");
this._activeRow.setAttribute("tabIndex","-1");
dijit.setWaiState(this._activeRow,"selected",false);
}
this._activeRow=row;
dojo.addClass(this._activeRow,"selected");
this._scrollToSelectedRow();
this._activeRow.setAttribute("tabIndex","0");
dijit.setWaiState(this._activeRow,"selected",true);
row.focus();
var _1105=this._activeRow.id.substr(this._activeRow.id.lastIndexOf("_")+1);
this.loadTrace(_1105);
}
},_scrollToSelectedRow:function(){
var _1106=dojo.query("table",this.domNode)[0];
var row=this._activeRow;
var _1107=row.offsetTop-_1106.scrollTop;
var _1108=(row.offsetTop+row.clientHeight)-_1106.scrollTop;
if(!(_1107>0&&_1107<_1106.clientHeight&&_1108>0&&_1108<_1106.clientHeight)){
var _1109=row.offsetTop-(_1106.clientHeight/2)+(row.clientHeight/2);
if(_1109>_1106.scrollHeight-_1106.clientHeight){
_1109=_1106.scrollHeight-_1106.clientHeight;
}else{
if(_1109<_1106.clientHeight/2){
_1109=0;
}
}
_1106.scrollTop=_1109;
}
},loadTrace:function(_110a){
},_onMouseEnter:function(row){
if(row){
if(dojo.hasClass(row,"trace_list_item")){
dojo.addClass(row,"hover");
}
var date=dojo.attr(row,"trace-date");
if(date){
dojo.publish("highlightDate",[date]);
}
}
},_onMouseLeave:function(row){
if(row){
if(dojo.hasClass(row,"trace_list_item")){
dojo.removeClass(row,"hover");
}
var date=dojo.attr(row,"trace-date");
if(date){
dojo.publish("blurDate",[date]);
}
}
},_onClick:function(row){
if(row&&dojo.hasClass(row,"trace_list_item")){
this._selectRow(row);
}
},_onKeyPress:function(e){
if(e.altKey){
return;
}
var dk=dojo.keys;
var key=e.charOrCode;
var map=this._keyHandlerMap;
if(!map){
map={};
map[dojo._isBodyLtr()?dk.LEFT_ARROW:dk.RIGHT_ARROW]="_onUpArrow";
map[dojo._isBodyLtr()?dk.RIGHT_ARROW:dk.LEFT_ARROW]="_onDownArrow";
map[dk.UP_ARROW]="_onUpArrow";
map[dk.DOWN_ARROW]="_onDownArrow";
map[dk.HOME]="_onHomeKey";
map[dk.END]="_onEndKey";
this._keyHandlerMap=map;
}
if(this._keyHandlerMap[key]){
this[this._keyHandlerMap[key]]({node:e.target});
dojo.stopEvent(e);
}
},_onDownArrow:function(_110b){
if(this._activeRow){
var _110c=this._nextElementSibling(this._activeRow);
if(_110c){
this._selectRow(_110c);
}
}
},_onUpArrow:function(_110d){
if(this._activeRow){
var _110e=this._previousElementSibling(this._activeRow);
if(_110e){
this._selectRow(_110e);
}
}
},_onHomeKey:function(){
if(this._activeRow){
dojo.query(".trace_list_item",this._activeRow.parentNode).slice(0,1).forEach(function(row){
if(row.id!=this._activeRow.id){
this._selectRow(row);
}
},this);
}
},_onEndKey:function(_110f){
if(this._activeRow){
dojo.query(".trace_list_item",this._activeRow.parentNode).slice(-1).forEach(function(row){
if(row.id!=this._activeRow.id){
this._selectRow(row);
}
},this);
}
},_previousElementSibling:function(node){
do{
node=node.previousSibling;
}while(node&&node.nodeType!=1);
return node;
},_nextElementSibling:function(node){
do{
node=node.nextSibling;
}while(node&&node.nodeType!=1);
return node;
}});
}
if(!dojo._hasResource["spring.UrlBuilder"]){
dojo._hasResource["spring.UrlBuilder"]=true;
dojo.provide("spring.UrlBuilder");
dojo.declare("spring.UrlBuilder",null,{template:null,params:null,constructor:function(_1110,_1111){
this.template=_1110;
this.params=_1111;
},append:function(_1112,_1113){
return new spring.UrlBuilder(this.template+_1112,dojo.delegate(this.params,_1113));
},build:function(_1114){
return this._buildUrl(this.template,dojo.delegate(this.params,_1114));
},toString:function(){
return this.build();
},_buildUrl:function(_1115,_1116){
var url=_1115,name=null,_1117={},re=null,_1118=null;
if(_1116){
for(name in _1116){
re=new RegExp("\\{"+name+"\\}");
_1118=false;
if(re.test(url)){
_1118=true;
url=url.replace(re,encodeURIComponent(_1116[name]),"g");
}
if(!_1118){
_1117[name]=_1116[name];
}
}
for(name in _1117){
if(_1117[name]){
url+=url.indexOf("?")===-1?"?":"&";
url+=encodeURIComponent(name);
url+="=";
url+=encodeURIComponent(_1117[name]);
}
}
}
return url;
}});
}
if(!dojo._hasResource["insight.Insight"]){
dojo._hasResource["insight.Insight"]=true;
dojo.provide("insight.Insight");
dojo.declare("insight.Insight",null,{_basePath:null,_timeRange:null,_switchUri:null,_switchAppUri:null,_browserWarnType:null,_browserSupported:true,_hashChangeSubscription:null,refreshInterval:dojo.isIE?15000:5000,_pulseCount:0,_active:null,constructor:function(_1119){
this._active={};
this._basePath=this._parseBasePath(_1119);
this._initTimeRange();
this._initTimeZoneOffset();
this._hashChangeSubscription=dojo.subscribe("/dojo/hashchange",this,this.onHashChange);
this._errorXhrSubscription=dojo.subscribe("error/xhr",this,this.xhrError);
this._errorStoreSubscription=dojo.subscribe("error/store",this,this.storeError);
if(!this.fromQueryString(dojo.hash()).range){
this.updateHash("range",this._timeRange.toString());
}
dojo.connect(dojo.global,"onresize",this,function(e){
this._onresizeEvent=e;
if(!this._onresizeTimeout){
this._onresizeTimeout=setTimeout(dojo.hitch(this,function(){
var e=this._onresizeEvent;
this._onresizeTimeout=this._onresizeEvent=null;
dojo.publish("window/resize",[e]);
}),100);
}
});
},isBrowserSupported:function(){
return this._browserSupported;
},scheduleLogout:function(url,delay){
this._logoutUrl=url;
this._logoutDelay=delay||1800000;
if(this._logoutTimer){
this.resetLogout();
}else{
dojo.connect(this,"loadTrace",this,this.resetLogout);
dojo.connect(this,"loadResource",this,this.resetLogout);
dojo.connect(this,"loadTaggedWindow",this,this.resetLogout);
dojo.connect(this,"loadWindow",this,this.resetLogout);
dojo.subscribe("Insight.timeRangeChange",this,this.resetLogout);
this._logoutTimer=setTimeout(dojo.hitch(this,function(){
this.logout();
}),this._logoutDelay);
}
},resetLogout:function(){
if(this._logoutTimer){
clearTimeout(this._logoutTimer);
this._logoutTimer=setTimeout(dojo.hitch(this,function(){
this.logEvent("Session","Timeout");
this.logout();
}),this._logoutDelay);
}
},logout:function(url){
this.logEvent("Session","Logout");
url=url||this._logoutUrl;
if(url){
dojo.global.location=url;
}
},hashMode:function(mode){
if(mode){
this._hashMode=mode;
}
return this._hashMode;
},currentResource:function(){
return this.fromQueryString(dojo.hash()).resource;
},currentTrace:function(){
return this.fromQueryString(dojo.hash()).trace;
},getResourceTreeFilter:function(){
return dojo.fromJson(this.getLocal("resourceTreeFilter"));
},loadResource:function(_111a){
if(_111a=="insight:"){
_111a="insight:type=Application";
}
if(_111a!=this.currentResource()&&this.hashMode()=="resource"){
this.updateHash("resource",_111a);
}else{
Insight._loadResource(_111a);
}
},_loadResource:function(_111b){
this.delayNextRefresh();
this._active.resource=_111b;
var _111c=new insight.resources.ResourceKey(_111b);
Insight.hideResourceModules(_111c);
Insight.loadResourceDetail("resource",_111c);
this.highlightResourceInTree(_111c);
},highlightResourceInTree:function(_111d){
if(!_111d){
_111d=Insight.currentResource();
}
dojo.publish("Insight.highlightTreeResource",[_111d]);
},hideResourceModules:function(_111e){
if(!_111e.getName()){
this._hideModule("resource");
}else{
this._hideModule("resources");
}
this._hideModule("resources_alt");
this._hideModule("traces-window");
this._hideModule("trace");
},_hideModule:function(id){
var _111f=dijit.byId(id);
if(_111f){
_111f.hide();
_111f.destroyDescendants();
}
},loadResourceDetail:function(id,_1120){
this.destroyWidget(id);
var _1121=this.getTimeRange();
return new insight.components.PageModule({url:Insight.buildUri("/services/resources/{resource}/{start}/{end}",{resource:_1120.toString(),start:_1121.getStart(),end:_1121.getEnd()})},id);
},loadResourceList:function(id,_1122,type){
var _1123=this.getTimeRange();
this.destroyWidget(id);
var list=new insight.components.SortableTable({url:Insight.buildUri("/services/resources",{context:_1122.toString(),resourceType:type,start:_1123.getStart(),end:_1123.getEnd()}),defaultSortSettings:{field:"responseTimeScore",desc:true},resize:true,maxHeight:id=="resources_alt"?300:null},id);
list.subscribe("Insight.timeRangeMajorPulse",function(_1124){
this.updateUrlParams({start:_1124.getStart(),end:_1124.getEnd()});
if(!this.hidden()){
this.load();
}
});
return list;
},loadTraces:function(_1125){
if(_1125){
this.logEvent("Traces","Load by Application");
}else{
this.logEvent("Traces","Load");
}
this.destroyWidget("traces");
return new insight.components.PageModule({url:Insight.buildUri("/services/traces",{application:_1125})},"traces");
},loadTaggedWindow:function(start,end,_1126,tag){
this.logEvent("Traces","Load by Resource and Tag",tag);
var _1127={resource:_1126,tag:tag},_1128=dijit.byId("traces-window"),_1129="/services/resources/{resource}/traces/{start}/{end}/tags/{tag}";
if(start&&end){
_1127.start=insight.time.toString(insight.time.normalizeToDate(start));
_1127.end=insight.time.toString(insight.time.normalizeToDate(end));
}else{
_1127.start=Insight.getTimeRange().getStart();
_1127.end=Insight.getTimeRange().getEnd();
}
this._hideModule("trace");
if(_1128){
_1128.updateUrlTemplate(Insight.buildUri(_1129));
_1128.updateUrlParams(_1127);
_1128.load();
}else{
_1128=new insight.traces.TraceList({url:Insight.buildUri(_1129,_1127),maxHeight:150,defaultSortSettings:{field:"range.start",desc:true},resize:true},"traces-window");
_1128.connect(_1128,"loadTrace",dojo.hitch(Insight,Insight.loadTrace));
}
},loadWindow:function(start,end,_112a,min,max){
var _112b={},_112c,_112d=150,_112e=dijit.byId("traces-window");
if(start&&end){
_112b.start=insight.time.toString(insight.time.normalizeToDate(start));
_112b.end=insight.time.toString(insight.time.normalizeToDate(end));
}else{
_112b.start=Insight.getTimeRange().getStart();
_112b.end=Insight.getTimeRange().getEnd();
}
if(_112a){
_112b.resource=_112a;
if(min||max){
_112b.min=min;
_112b.max=max;
_112c="/services/resources/{resource}/traces/{start}/{end}/{min}/{max}";
this.logEvent("Traces","Load by Resource, Window, and Duration");
}else{
if(_112a.indexOf("insight:")==0){
_112c="/services/resources/{resource}/traces/{start}/{end}";
this.logEvent("Traces","Load by Resource and Window");
}
}
}
if(!_112c){
if(_112a){
_112b.application=_112a;
}
_112c="/services/traces/windows/{start}/{end}";
this.logEvent("Traces","Load by Window",""+(end-start));
_112d=185;
}
this._hideModule("trace");
if(_112e){
_112e.updateUrlTemplate(Insight.buildUri(_112c));
_112e.updateUrlParams(_112b);
_112e.load();
}else{
_112e=new insight.traces.TraceList({url:Insight.buildUri(_112c,_112b),maxHeight:_112d,defaultSortSettings:{field:(min&&max)?"range.start":"range.duration",desc:true},resize:true},"traces-window");
_112e.connect(_112e,"loadTrace",dojo.hitch(Insight,Insight.loadTrace));
}
},loadTrace:function(_112f){
Insight._loadTrace(_112f);
},_loadTrace:function(_1130){
this.logEvent("Trace","Load");
this._active.trace=_1130;
this.destroyWidget("trace");
return new insight.components.PageModule({url:Insight.buildUri("/services/traces/{traceId}",{traceId:_1130})},"trace");
},setSwitchApplicationUri:function(uri){
if(dojo.isString(uri)){
uri=this.buildUri(uri);
}
this._switchAppUri=uri;
},setSwitchUri:function(uri){
if(dojo.isString(uri)){
uri=this.buildUri(uri);
}
this._switchUri=uri;
},switchToApplication:function(_1131){
this.logEvent("Application","Select");
var url;
_1131=this._normalizeApplication(_1131);
if(_1131==null&&this._switchUri){
url=this._switchUri.build();
}else{
if(_1131!=null&&this._switchAppUri){
url=this._switchAppUri.build({application:_1131});
}
}
if(url){
dojo.global.location=url;
}
},_normalizeApplication:function(_1132){
if(_1132=="*"){
return null;
}else{
return _1132;
}
},getOperationFilter:function(){
return this.getCookie("Insight.operationFilter");
},_getOperationFilterArray:function(){
var rules=(this.getOperationFilter()||"").split("|");
return dojo.filter(rules,function(rule){
return !!rule;
},this);
},_getOperationFilterRegExp:function(rule){
return new RegExp("^[-+]"+dojo.regexp.escapeString(rule)+"$");
},clearOperationFilter:function(){
this.logEvent("OperationFilter","Clear");
this.setCookie("Insight.operationFilter",null);
if(dijit.byId("trace")){
dijit.byId("trace").load();
}
},hasOperationFilter:function(rule){
var _1133=this._getOperationFilterRegExp(rule),match=dojo.filter(this._getOperationFilterArray(),function(r){
return r.match(_1133);
},this);
return match[0]&&match[0].charAt(0);
},addOperationFilter:function(_1134,_1135){
this.logEvent("OperationFilter","Add",_1134);
var rules=this._getOperationFilterArray(),_1136=this._getOperationFilterRegExp(_1134),_1137=[_1135+_1134];
dojo.forEach(rules,function(rule){
if(!rule.match(_1136)){
_1137.push(rule);
}
},this);
this.setCookie("Insight.operationFilter",_1137.join("|"));
},removeOperationFilter:function(_1138){
this.logEvent("OperationFilter","Remove",_1138);
var rules=(this.getOperationFilter()||"").split("|"),_1139=this._getOperationFilterRegExp(_1138),_113a=[];
dojo.forEach(rules,function(rule){
if(!rule.match(_1139)){
_113a.push(rule);
}
},this);
this.setCookie("Insight.operationFilter",_113a.join("|"));
},getTimeRange:function(){
return this._timeRange.clone();
},setTimeRange:function(_113b){
if(_113b.getDuration()!=this._timeRange.getDuration()){
this.logEvent("TimeRange","Change Duration",""+_113b.getDuration());
}
dojo.publish("Insight.timeRangeChange",[_113b]);
if(!_113b.isAnchored()){
this.play();
}else{
this.pause();
}
},incrementTimeRange:function(){
if(!this._timeRange.isAnchored()){
return;
}
var _113c=this._timeRange.getDuration(),delta=_113c/4,now=new Date().getTime();
if(now<this._timeRange.getEndDate().getTime()+delta+(_113c*0.1)){
this._timeRange.shift().setAnchored(false);
this.logEvent("TimeRange","Increment to Now");
}else{
this._timeRange.add(delta);
this.logEvent("TimeRange","Increment");
}
this.setTimeRange(this._timeRange);
},decrementTimeRange:function(){
var delta=this._timeRange.getDuration()*-1/4;
this._timeRange.add(delta);
this.logEvent("TimeRange","Decrement");
this.setTimeRange(this._timeRange);
},shiftTimeRangeToNow:function(){
this.setTimeRange(this._timeRange.shift().setAnchored(false));
},_setTimeRange:function(_113d){
this._timeRange=_113d;
this.setLocal("Insight.timeRange",this._timeRange);
},_initTimeRange:function(){
var _113e=new insight.time.TimeRange(this._defaultTimeRange());
this._setTimeRange(_113e);
dojo.subscribe("Insight.timeRangeChange",this,function(_113f){
this._setTimeRange(_113f.clone());
this._pulseCount=-1;
dojo.publish("Insight.timeRangePulse",[_113f.clone()]);
});
dojo.subscribe("Insight.timeRangePulse",this,function(_1140){
this._pulseCount=(this._pulseCount+1)%6;
if(this._pulseCount===0){
dojo.publish("Insight.timeRangeMajorPulse",[_1140.clone()]);
}
});
if(!_113e.isAnchored()){
dojo.publish("Insight.play",[this._timeRange.clone()]);
this._scheduleRefresh();
}
dojo.subscribe("Insight.timeRangeChange",this,function(_1141){
_1141=_1141.toString();
if(this._active.range!==_1141){
this.updateHash("range",_1141);
}
});
},_defaultTimeRange:function(){
return this.fromQueryString(dojo.hash()).range||this.getLocal("Insight.timeRange")||"900000";
},play:function(hover){
if(hover&&this._pausedForUser){
this._timeRange.setAnchored(false);
dojo.publish("Insight.play",[this._timeRange.clone()]);
this._pausedForUser=false;
this._scheduleRefresh();
}else{
if(!hover&&!this.playing()){
this._timeRange.setAnchored(false);
dojo.publish("Insight.play",[this._timeRange.clone()]);
this.updateHash("range",this._timeRange.toString());
this._scheduleRefresh();
this.refresh();
}
}
},_scheduleRefresh:function(){
clearTimeout(this._playing);
this._playing=setTimeout(dojo.hitch(this,this.refresh),this.refreshInterval);
},pause:function(hover){
if(this.playing()){
clearTimeout(this._playing);
this._playing=null;
this._timeRange.setAnchored(true);
dojo.publish("Insight.pause",[this._timeRange.clone()]);
if(hover){
this._pausedForUser=true;
}else{
this.updateHash("range",this._timeRange.toString());
}
}
},refresh:function(){
if(this.playing()){
clearTimeout(this._playing);
}
if(!this._timeRange.isAnchored()){
this._timeRange.shift();
}
this._setTimeRange(this._timeRange);
dojo.publish("Insight.timeRangePulse",[this._timeRange.clone()]);
if(this.playing()){
this._scheduleRefresh();
}
},delayNextRefresh:function(){
if(this.playing()){
this._scheduleRefresh();
}
},playing:function(){
return this._playing!=null;
},xhrError:function(_1142,_1143,uid){
var _1144=(new dojo._Url(_1143.url)).path;
if(_1142=="Error: timeout exceeded"){
this.logEvent("Error","Timeout",_1144,_1143.args.timeout);
dojo.publish("insight/error",["Server took too long to respond: "+_1143.url,"[TIMEOUT:"+_1143.args.timeout+"]",uid]);
}else{
if(_1143.xhr.status===0){
this.logEvent("Error","Connect",_1144);
dojo.publish("insight/error",["Unable to connect to server, the server or network may be down: "+_1143.url,"[NETWORK]",uid]);
}else{
this.logEvent("Error","Status",_1144,_1143.xhr.status);
dojo.publish("insight/error",["Server encountered an error: "+_1143.url,"[HTTP:"+_1143.xhr.status+"]",uid]);
}
}
},storeError:function(_1145,_1146,uid){
this.logEvent("Error","Store",""+_1146);
dojo.publish("insight/error",[_1145,"[STORE:"+_1146+"]",uid,true]);
},error:function(_1147,uid,_1148){
this.logEvent("Error","General",_1147);
dojo.publish("insight/error",[_1147,"[GENERAL]",uid,_1148]);
},getLocal:function(name){
var value=this.getSession(name);
if(value===null){
value=this.getCookie(name);
}
return value;
},getSession:function(name){
if(dojo.global.sessionStorage){
return dojo.global.sessionStorage.getItem(name);
}else{
return null;
}
},getCookie:function(name){
if(dojo.cookie.isSupported()){
return dojo.cookie(name);
}else{
return null;
}
},setLocal:function(name,value,_1149){
this.setSession(name,value);
if(_1149||this.getSession(name)===null){
this.setCookie(name,value);
}
},setSession:function(name,value){
if(dojo.global.sessionStorage){
if(value===null){
dojo.global.sessionStorage.removeItem(name);
}else{
dojo.global.sessionStorage.setItem(name,value);
}
}
},setCookie:function(name,value,_114a){
if(dojo.cookie.isSupported()){
if(!value){
_114a=-1;
}
var props={path:this._basePath.template};
if(_114a!==undefined){
props.expires=_114a;
}
dojo.cookie(name,value,props);
}
},buildUri:function(uri,_114b){
return this._basePath.append(uri,_114b);
},dojoUri:function(uri,_114c){
return this._basePath.append("/static-"+InsightVersion.versionString+"/dojo/"+uri);
},fromQueryString:function(str){
var obj={};
if(!str){
return obj;
}
dojo.forEach(str.split("&"),function(item){
var pos=item.indexOf("=");
if(pos!=-1){
obj[decodeURIComponent(item.substring(0,pos))]=decodeURIComponent(item.substring(pos+1));
}
},this);
return obj;
},toQueryString:function(obj){
var str="";
if(!obj){
return str;
}
for(var i in obj){
if(obj.hasOwnProperty(i)){
if(str!=""){
str+="&";
}
str+=encodeURIComponent(i);
str+="=";
str+=encodeURIComponent(obj[i]);
}
}
return str;
},updateHash:function(name,value){
var obj=this.fromQueryString(dojo.hash());
if(value===null){
delete obj[name];
}else{
obj[name]=value;
}
dojo.hash(this.toQueryString(obj));
},onHashChange:function(){
var obj=this.fromQueryString(dojo.hash()),mode=this.hashMode();
if(mode=="trace"&&obj.trace&&obj.trace!==this._active.trace){
this._loadTrace(obj.trace);
}else{
if(mode=="resource"&&obj.resource&&obj.resource!==this._active.resource){
this._loadResource(obj.resource);
}
}
if(obj.range&&obj.range!==this.getTimeRange().toString()){
this.setTimeRange(new insight.time.TimeRange(obj.range));
}
},_initTimeZoneOffset:function(){
var _114d=new Date().getTimezoneOffset()/60*-1;
this.setCookie("Insight.timeZoneOffset",_114d);
},destroyWidget:function(id){
var _114e=dijit.byId(id);
if(_114e){
_114e.set("style",{display:"none"});
_114e.destroyRecursive(true);
}
},_parseBasePath:function(_114f){
if(_114f.match(";jsessionid")){
_114f=_114f.substring(0,_114f.indexOf(";jsessionid"));
}
if(_114f.match("/$")){
_114f=_114f.substring(0,_114f.length-1);
}
return new spring.UrlBuilder(_114f);
},_browserWarnings:[{name:"cookies",func:function(_1150){
return !dojo.cookie.isSupported();
},title:null,message:"Cookie support is required to use Spring Insight.  Please enable cookies or upgrade your browser.",supported:true,suppressible:false,upgradePanel:true,suppressionTimeout:null},{name:"ie6",func:function(_1151){
return dojo.isIE<=6;
},title:null,message:"IE 6 (and eariler) is incompatible with Spring Insight.  Please upgrade your browser.<br /><br /><a href=\"http://www.google.com/chromeframe\">Google Chrome Frame</a> is strongly recommended if upgrading your browser is not otherwise possible.",supported:false,suppressible:false,upgradePanel:true,suppressionTimeout:null},{name:"ie",func:function(_1152){
return dojo.isIE<9&&!_1152;
},title:null,message:"IE 7 and 8 will work with Spring Insight.  However, the performance is to be blunt, slow.<br /><br /><a href=\"http://www.google.com/chromeframe\">Google Chrome Frame</a> is strongly recommended if upgrading your browser is not otherwise possible.",supported:true,suppressible:true,upgradePanel:true,suppressionTimeout:90},{name:"oldFirefox",func:function(_1153){
return dojo.isFF&&dojo.isFF<3.6&&!_1153;
},title:null,message:"Firefox is a great browser.  However, your using an older version.  The latest release is significantly faster.",supported:true,suppressible:true,upgradePanel:true,suppressionTimeout:30},{name:"oldSafari",func:function(_1154){
return dojo.isSafari&&dojo.isSafari<5&&!_1154;
},title:null,message:"Safari is a great browser.  However, your using an older version.  The latest release is significantly faster.",supported:true,suppressible:true,upgradePanel:true,suppressionTimeout:30},{name:"oldChrome",func:function(_1155){
return dojo.isChrome&&dojo.isChrome<5&&!_1155;
},title:null,message:"Chrome is a great browser.  However, your using an older version.  The latest release is significantly faster.",supported:true,suppressible:true,upgradePanel:true,suppressionTimeout:30},{name:"unknowBroswer",func:function(_1156){
return !dojo.isFF&&!dojo.isSafari&&!dojo.isChrome&&!dojo.isIE&&!_1156;
},title:null,message:"You're using a browser we havn't tested.  It should work, but if you run into strange issues, try a recomended browser.  Be sure to let us know about your experience.",supported:true,suppressible:true,upgradePanel:true,suppressionTimeout:30},{name:"firebug",func:function(_1157){
return console&&console.firebug;
},title:null,message:"Firebug is known to cause severe performance degradation over time.  We highly recommend you disable Firebug for the Spring Insight dashboard.",supported:true,suppressible:true,upgradePanel:false,suppressionTimeout:null},{name:"chrome-speedtracer",func:function(_1158){
return dojo.isChrome&&!window.ChromeFrame;
},title:"Spring Insight + Google SpeedTracer",message:function(){
return "<a href='http://code.google.com/webtoolkit/speedtracer/' target='_blank'><img src='"+this.buildUri("/static/images/browser_logo_speedtracer.png")+"' style='float: left; padding: 0 0.5em;' /></a><p><a href='http://code.google.com/webtoolkit/speedtracer/' target='_blank'>SpeedTracer</a> is a Google Chrome extension that analyzes how your application performs inside the browser. SpringSource and Google partnered to integrate Spring Insight data into SpeedTracer, thereby creating the ultimate client-server application performance tool.</p><p>If your web application uses Ajax or other rich open web technologies, we recommend you <a href='http://code.google.com/webtoolkit/speedtracer/get-started.html' target='_blank'>try SpeedTracer</a>.</p>";
},supported:true,suppressible:true,upgradePanel:false,suppressionTimeout:90}],checkBrowserAbilities:function(){
var _1159=this.getCookie("com.springsource.sts.run.embedded"),_115a=false,_115b;
for(var i=0;!_115a&&i<this._browserWarnings.length;i++){
_115b=this._browserWarnings[i];
if(_115b.func.call(this,_1159)){
if(!_115b.supported){
this._browserSupported=false;
}
if(!_115b.suppressible||(_115b.suppressible&&!this.getCookie("Insight.browserwarning."+_115b.name))){
this._browserWarning=_115b;
this._warnBrowserAbility(_115b.name,_115b.title,dojo.isFunction(_115b.message)?_115b.message.call(this):_115b.message,_115b.suppressible,_115b.upgradePanel);
_115a=true;
}
}
}
},_warnBrowserAbility:function(type,title,_115c,_115d,_115e){
var _115f=dojo.byId("noscript");
if(!_115f){
return;
}
if(title){
dojo.byId("noscript-title").innerHTML=title;
}
dojo.byId("noscript-warning").innerHTML=_115c;
if(_115d){
if(_115d!==true){
dojo.byId("noscript-ignore").innerHTML=_115d;
}
dojo.style("noscript-ignore","display","block");
}
if(!_115e){
dojo.style("noscript-upgrade","display","none");
}
dojo.style(_115f,"display","block");
},suppressWarning:function(){
this.setCookie("Insight.browserwarning."+this._browserWarning.name,"ignore",this._browserWarning.suppressionTimeout);
dojo.style("noscript","display","none");
},logEvent:function(_1160,_1161,label,value){
var msg={category:_1160,action:_1161};
if(label){
msg.label=label;
}
if(value){
msg.value=value;
}
dojo.publish("Insight.loggedEvent",[msg]);
}});
dojo.extend(dojox.charting.plot2d._PlotEvents,{_reconnectEvents:function(_1162){
var a=this._eventSeries[_1162];
if(a){
dojo.forEach(a,function(o){
if(o){
this._connectEvents(o);
}
},this);
}
}});
}
if(!dojo._hasResource["insight.plugin"]){
dojo._hasResource["insight.plugin"]=true;
dojo.provide("insight.plugin");
insight.plugin.staticUri=function(_1163,uri){
return Insight.buildUri("/static/plugin/"+_1163+"/"+uri);
};
insight.plugin.serviceUri=function(_1164,uri){
return Insight.buildUri("/services/plugins/"+_1164+"/"+uri);
};
insight.plugin.registerDojoModule=function(_1165,_1166){
dojo.registerModulePath(_1165,Insight.buildUri("/static/plugin/"+_1166).build());
};
}
if(!dojo._hasResource["insight.plugin.System"]){
dojo._hasResource["insight.plugin.System"]=true;
dojo.provide("insight.plugin.System");
dojo.declare("insight.plugin.SystemImpl",null,{_plugins:null,constructor:function(){
this._plugins=[];
},addPlugin:function(_1167){
this._plugins.push(_1167);
},redirectIfDefaultPage:function(){
var _1168=false;
var _1169;
var _116a=1;
var _116b;
if(window.location.pathname==Insight.buildUri("/").build()){
_1168=true;
_1169=Insight.buildUri("/resources").build();
_116b="navBar";
}else{
if(window.location.pathname==Insight.buildUri("/config").build()){
_1168=true;
_1169=Insight.buildUri("/config/threshold").build();
_116b="config";
}
}
if(_1168){
dojo.forEach(this._plugins,function(_116c){
if(_116c.getPluginType()==_116b&&_116c.getDefaultSelectionScore()>_116a){
_1169=_116c.getUri();
_116a=_116c.getDefaultSelectionScore();
}
},this);
window.location=_1169;
}
}});
insight.plugin.System=new insight.plugin.SystemImpl();
}
if(!dojo._hasResource["insight.plugin.MenuPlugin"]){
dojo._hasResource["insight.plugin.MenuPlugin"]=true;
dojo.provide("insight.plugin.MenuPlugin");
dojo.declare("insight.plugin.MenuPlugin",dijit._Widget,{plugin:null,label:null,css:false,defaultSelectionScore:0,_menuItem:null,_pluginContentContainer:null,_pluginType:null,postMixInProperties:function(){
insight.plugin.System.addPlugin(this);
},postCreate:function(){
if(this.isMenuShown()){
this.addOptionToMenu();
if(this.isPluginSelected()){
this.initializeModule();
this.onContentPreload();
this.highlightOption();
this.loadCss();
this.loadContent();
}
}
},getPluginType:function(){
return this._pluginType;
},getDefaultSelectionScore:function(){
return this.defaultSelectionScore;
},isMenuShown:function(){
return false;
},addOptionToMenu:function(){
},highlightOption:function(){
},isPluginSelected:function(){
return window.location.pathname.indexOf(Insight.buildUri("/config/"+this.plugin))===0;
},loadCss:function(){
if(this.css){
dojo.requireCss(insight.plugin.staticUri(this.plugin,this.plugin+".css").build());
}
},loadContent:function(){
var self=this;
var _116d=dojo.xhrGet({url:insight.plugin.staticUri(self.plugin,self.plugin+".html").build(),handleAs:"text"});
dojo.when(_116d,function(_116e){
var _116f=dojo.byId(self._pluginContentContainer);
if(_116f==null){
return;
}
_116f.innerHTML=_116e;
dojo.style(_116f,"display","block");
dojo.parser.parse(_116f);
self.onContentLoaded(_116f);
});
},isPluginSelected:function(){
return window.location.pathname.indexOf(this.getUri())===0;
},getUri:function(){
return "";
},initializeModule:function(){
insight.plugin.registerDojoModule("insight.plugin."+this.plugin,this.plugin);
var _1170=dojo["require"];
_1170("insight.plugin."+this.plugin+"."+this.plugin);
},onContentPreload:function(){
},onContentLoaded:function(_1171){
}});
}
if(!dojo._hasResource["dijit.MenuBarItem"]){
dojo._hasResource["dijit.MenuBarItem"]=true;
dojo.provide("dijit.MenuBarItem");
dojo.declare("dijit._MenuBarItemMixin",null,{templateString:dojo.cache("dijit","templates/MenuBarItem.html","<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" dojoAttachPoint=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span dojoAttachPoint=\"containerNode\"></span>\n</div>\n"),attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"}})});
dojo.declare("dijit.MenuBarItem",[dijit.MenuItem,dijit._MenuBarItemMixin],{});
}
if(!dojo._hasResource["insight.plugin.NavBarPlugin"]){
dojo._hasResource["insight.plugin.NavBarPlugin"]=true;
dojo.provide("insight.plugin.NavBarPlugin");
dojo.declare("insight.plugin.NavBarPlugin",insight.plugin.MenuPlugin,{_pluginContentContainer:"plugin-content",_pluginType:"navBar",isMenuShown:function(){
return true;
},addOptionToMenu:function(){
var self=this;
dijit.byId("nav-menu").addChild(new dijit.MenuBarItem({label:self.label,onClick:function(){
window.location=Insight.buildUri("/plugin/"+self.plugin).build();
},selected:window.location.pathname.indexOf(self.getUri())===0}),0);
},getUri:function(){
return Insight.buildUri("/plugin/"+this.plugin);
}});
}
if(!dojo._hasResource["insight.plugin.ConfigPlugin"]){
dojo._hasResource["insight.plugin.ConfigPlugin"]=true;
dojo.provide("insight.plugin.ConfigPlugin");
dojo.declare("insight.plugin.ConfigPlugin",insight.plugin.MenuPlugin,{section:null,_pluginContentContainer:"config-body",_menuItem:null,_pluginType:"config",isMenuShown:function(){
return window.location.pathname.indexOf(Insight.buildUri("/config/"))===0;
},addOptionToMenu:function(){
var list=dojo.byId(this.section+"-list");
var url=Insight.buildUri("/config/"+this.plugin).build();
this._menuItem=dojo.create("li",{innerHTML:"<a href=\""+url+"\">"+this.label+"</a>"});
dojo.place(this._menuItem,list);
},highlightOption:function(){
dojo.attr(this._menuItem,"class","active");
},getUri:function(){
return Insight.buildUri("/config/"+this.plugin);
}});
}
if(!dojo._hasResource["insight.resources.InsightResourceReadStore"]){
dojo._hasResource["insight.resources.InsightResourceReadStore"]=true;
dojo.provide("insight.resources.InsightResourceReadStore");
dojo.declare("insight.resources.InsightResourceReadStore",null,{url:null,_items:null,timeout:insight.runtime.getXhrTimeout("InsightResourceReadStore"),_resourceMappings:{"Server":null,"EndPoint":null,"Application":"Application.EndPoint","Application.Server":"Application.Server.EndPoint","Application.EndPoint":null,"Application.Server.EndPoint":null},constructor:function(args){
dojo.mixin(this,args);
this._items={};
if(args.root){
delete this.root;
this._items[args.root.resourceKey]={resourceKey:args.root.resourceKey,resourceLabel:args.root.resourceLabel,children:true,store:this};
}
},getItems:function(){
var items=[],i;
for(i in this._items){
if(this._items.hasOwnProperty(i)){
items.push(this._items[i]);
}
}
return items;
},refresh:function(){
dojox.lang.functional.forIn(this._items,function(item,key){
if(dojo.isArray(item.children)){
this.loadItem({item:item});
}
},this);
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true,"dojo.data.api.Notification":true};
},getValue:function(item,_1172,_1173){
if(!this.hasAttribute(item,_1172)){
return _1173;
}
var _1174=item[_1172];
if(dojo.isArray(_1174)){
_1174=_1174[0];
}
if(!_1174){
_1174=_1173;
}
return _1174;
},getValues:function(item,_1175){
var value=item[_1175];
if(dojo.isArray(value)){
return value;
}else{
if(dojo.isObject(value)&&value!==null){
return [value];
}else{
return [];
}
}
},getAttributes:function(item){
var array=[];
for(name in item){
if(this.hasAttribute(item,name)){
array.push(name);
}
}
return array;
},hasAttribute:function(item,_1176){
if(!this.isItem(item)){
throw "An item is required";
}
return item.hasOwnProperty(_1176)&&_1176!="store"&&_1176!="parent";
},containsValue:function(item,_1177,value){
var _1178=false;
dojo.forEach(this.getValues(item,_1177),function(_1179){
if(_1179===value){
_1178=true;
}
},this);
return _1178;
},isItem:function(_117a){
return _117a&&_117a.store===this;
},isItemLoaded:function(_117b){
if(!this.isItem(_117b)){
return false;
}
if(!_117b.hasOwnProperty("children")){
return true;
}
return dojo.isArray(_117b.children);
},loadItem:function(_117c){
var _117d=new insight.resources.ResourceKey(this.getIdentity(_117c.item));
var type=_117d.getAttribute("type");
var name=_117d.getAttribute("name");
if(name&&this._resourceMappings[type]){
_117d.setAttribute(type,name);
_117d.setAttribute("type",this._resourceMappings[type]);
_117d.setAttribute("name",null);
}
_117c.query=_117d.toString();
this.fetch(_117c);
},fetch:function(_117e){
var _117f=_117e||{};
if(!_117f.query){
return _117f;
}
if(_117f.item&&_117f.item.doNotLoad){
return _117f;
}
var xhr=dojo.xhrGet({handleAs:"json",url:this.url.build({resourceKey:_117f.query}),content:_117f.queryOptions,request:_117f,load:dojo.hitch(this,"_fetchLoad"),error:dojo.hitch(this,"_fetchError"),timeout:this.timeout});
_117f.abort=dojo.hitch(xhr,"cancel");
return _117f;
},_fetchLoad:function(_1180,_1181){
var _1182=_1181.args.request,_1183=false,scope=_1182.scope||dojo.global,items=[];
if(!_1182.store){
_1182.store=this;
}
if(_1182.onBegin){
_1182.onBegin.call(scope,items.length,_1182);
}
if(_1182.sort&&dojo.isArray(_1180.resources)){
_1180.resources.sort(dojo.data.util.sorter.createSortFunction(_1182.sort,this));
}
var _1184=dojo.hitch(this,function(item){
var id=item[this.getIdentityAttributes()[0]];
var _1185=this._items[id];
var _1186=new insight.resources.ResourceKey(id);
item[this.getIdentityAttributes(item)[0]]=_1186.toString();
if(this._resourceMappings[_1186.getAttribute("type")]&&!item.doNotLoad){
item.children=true;
}
item.store=this;
if(_1185){
var _1187=dojo.mixin({},_1185);
_1185.invocationCount=item.invocationCount;
_1185.health=item.health;
_1185.healthLamp=item.healthLamp;
this.onSet(_1185);
}else{
if(_1182.item){
if(!dojo.isArray(_1182.item.children)){
_1182.item.children=[];
}
_1182.item.children.push(item);
item.parent=_1182.item;
}
this.onNew(item,{item:item.parent});
this._items[id]=item;
items.push(item);
}
if(_1182.onItem&&!_1183){
_1182.onItem.call(scope,item.parent,_1182);
}
});
if(_1180.resource){
_1184(_1180.resource);
}else{
if(_1180.resources&&_1180.resources.length>0){
for(var i in _1180.resources){
_1184(_1180.resources[i]);
}
}else{
_1184({resourceKey:_1182.item.resourceKey+",children=notfound",resourceLabel:"no matching resources",health:{rating:"NOSAMPLE"},doNotLoad:true});
}
}
if(_1182.onComplete&&!_1183){
var _1188=null;
if(!_1182.onItem){
_1188=items;
}
_1182.onComplete.call(scope,_1188,_1182);
}
},_fetchError:function(_1189,_118a){
dojo.publish("error/xhr",arguments);
},close:function(_118b){
console.error("Unimplemented API: dojo.data.api.Read.close",arguments);
throw new Error("Unimplemented API: dojo.data.api.Read.close");
},getLabel:function(item){
return this.getValue(item,this.getLabelAttributes(item)[0]);
},getLabelAttributes:function(item){
return ["resourceLabel"];
},getIdentity:function(item){
if(!this.isItem(item)){
return null;
}
var _118c=this.getValue(item,this.getIdentityAttributes(item)[0]);
return _118c;
},getIdentityAttributes:function(item){
return ["resourceKey"];
},fetchItemByIdentity:function(_118d){
if(this._items[_118d.identity]&&_118d.onItem){
_118d.onItem.call(_118d.scope?_118d.scope:dojo.global,this._items[_118d.identity]);
return;
}
_118d.query=_118d.identity;
this.fetch(_118d);
},onSet:function(item,_118e,_118f,_1190){
},onNew:function(_1191,_1192){
},onDelete:function(_1193){
}});
}
if(!dojo._hasResource["insight.resources.ResourceTree"]){
dojo._hasResource["insight.resources.ResourceTree"]=true;
dojo.provide("insight.resources.ResourceTree");
dojo.declare("insight.resources.ResourceTreeNode",insight.components.TreeNode,{_updateItemClasses:function(item){
this.inherited(arguments);
if(item.health&&item.health.rating=="NOSAMPLE"){
this.set("style",{display:"none"});
}else{
this.set("style",{display:""});
}
}});
dojo.declare("insight.resources.ResourceTree",insight.components.Tree,{persist:false,healthLampUrl:null,startup:function(){
this.inherited(arguments);
dojo.forEach(this.attr("rootNode").getChildren(),function(node){
this._expandNode(node);
},this);
this.rootNode.startup();
},getLabel:function(item){
var label="";
if(item.health){
label+="<img src='"+this.healthLampUrl.build({lamp:item.healthLamp})+"' /> ";
}
label+=this.model.getLabel(item);
return label;
},getTooltip:function(item){
return this.model.getLabel(item);
},findTreeNode:function(_1194){
return this.getNodesByItem(_1194.toString())[0];
},highlightResource:function(_1195){
var node=this.findTreeNode(_1195);
if(node){
this.set("selectedNodes",[node]);
}else{
this.set("path",this._resourcePath(_1195));
}
},_resourcePath:function(_1196){
_1196=new insight.resources.ResourceKey(_1196);
var path=[];
function _1197(_1198){
if(_1198){
path.push(_1198.toString());
_1197(_1198.makeParentResourceKey());
if(_1198.getName()){
if(_1198.getType()=="Application"){
path.push("insight:type=Application");
}else{
if(_1198.getType()=="Server"){
path.push("insight:type=Server");
}
}
}
}
};
_1197(_1196);
return path.reverse();
},_createTreeNode:function(args){
return new insight.resources.ResourceTreeNode(args);
},_initState:function(){
if(this.persist){
var _1199=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(_1199){
dojo.forEach(_1199.split("|"),function(item){
this._openedItemIds[item]=true;
},this);
}
}
},_saveState:function(){
if(!this.persist){
return;
}
var ary=[];
for(var id in this._openedItemIds){
ary.push(id);
}
dojo.cookie(this.cookieName,ary.join("|"),{expires:1});
},_onDownArrow:function(_119a){
var node=this._getNextNode(_119a.node);
if(node&&node.isTreeNode){
if(dojo.style(node,"display")=="none"){
this._onDownArrow(dojo.delegate(_119a,{node:node}));
return;
}
this.focusNode(node);
}
},_onUpArrow:function(_119b){
var node=_119b.node;
var _119c=node.getPreviousSibling();
if(_119c){
node=_119c;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _119d=node.getChildren();
node=_119d[_119d.length-1];
}
}else{
var _119e=node.getParent();
if(!(!this.showRoot&&_119e===this.rootNode)){
node=_119e;
}
}
if(node&&node.isTreeNode){
if(dojo.style(node,"display")=="none"){
this._onUpArrow(dojo.delegate(_119b,{node:node}));
return;
}
this.focusNode(node);
}
}});
}
if(!dojo._hasResource["insight.time.TimeRangeDropDownButton"]){
dojo._hasResource["insight.time.TimeRangeDropDownButton"]=true;
dojo.provide("insight.time.TimeRangeDropDownButton");
dojo.declare("insight.time.TimeRangeDropDownButton",dijit.form.DropDownButton,{times:[insight.time.millis.minute*15,insight.time.millis.minute*30,insight.time.millis.hour,insight.time.millis.hour*4,insight.time.millis.hour*8,insight.time.millis.hour*12,insight.time.millis.day,insight.time.millis.day*3,insight.time.millis.week],playPauseMenuItem:null,postCreate:function(){
this.inherited(arguments);
var menu=new dijit.Menu({},dojo.doc.createElement("div"));
this.playPauseMenuItem=this._createMenuItem(0);
menu.addChild(this.playPauseMenuItem);
dojo.forEach(this.times,function(time){
menu.addChild(this._createMenuItem(time));
},this);
this.dropDown=menu;
},_createMenuItem:function(time){
var item=new dijit.MenuItem({label:insight.time.shortLabel(time)});
this.connect(item,"onClick",function(){
this.attr("selected",time);
});
return item;
},setLabelTimeRange:function(_119f){
var label=insight.time.shortLabel(_119f.getDuration(),true)+" @ ";
if(!_119f.isAnchored()){
label+="now";
this.playPauseMenuItem.set("label","pause");
}else{
label+=insight.time.labels(_119f.getEndDate(),new Date()).start;
this.playPauseMenuItem.set("label","now");
}
this.set("label",label);
this.set("title",label);
},_setSelectedAttr:function(time){
if(time!=null){
this.onChange(time);
}
},onChange:dijit._connectOnUseEventHandler});
}
if(!dojo._hasResource["insight.traces.FilterMenu"]){
dojo._hasResource["insight.traces.FilterMenu"]=true;
dojo.provide("insight.traces.FilterMenu");
dojo.extend(dijit._MenuBase,{executeOnClick:true,onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup();
}else{
if(this.executeOnClick){
this.onExecute();
}
item.onClick(evt);
}
}});
}
if(!dojo._hasResource["insight.traces.FrameStack"]){
dojo._hasResource["insight.traces.FrameStack"]=true;
dojo.provide("insight.traces.FrameStack");
dojo.declare("insight.traces.FrameTreeNode",dijit._TreeNode,{templateString:dojo.cache("insight.traces","templates/FrameTreeNode.html","<div class=\"dijitTreeNode\" waiRole=\"presentation\"\n\t><div dojoAttachPoint=\"rowNode\" class=\"dijitTreeRow\" waiRole=\"presentation\" dojoAttachEvent=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><div class=\"insightGanttContainer\" dojoAttachPoint=\"ganttNode\"\n\t\t\t><div dojoAttachPoint=\"durationNode\" class=\"insightGanttDuration\"></div\n\t\t>&nbsp;</div\n\t\t><div class=\"operationExpando\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"expandoNode\" class=\"dijitTreeExpando\" waiRole=\"presentation\"\n\t\t><span dojoAttachPoint=\"expandoNodeText\" class=\"dijitExpandoText\" waiRole=\"presentation\"\n\t\t></span\n\t\t><span dojoAttachPoint=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" waiRole=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" waiRole=\"presentation\"\n\t\t\t/><span dojoAttachPoint=\"labelNode\" class=\"dijitTreeLabel\" wairole=\"treeitem\" tabindex=\"-1\" waiState=\"selected-false\" dojoAttachEvent=\"onfocus:_onLabelFocus\"></span\n\t\t></span\n\t></div>\n\t<div dojoAttachPoint=\"containerNode\" class=\"dijitTreeContainer\" waiRole=\"presentation\" style=\"display: none;\"></div>\n</div>\n"),ganttNode:null,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"labelNode",type:"innerText"},tooltip:{node:"rowNode",type:"attribute",attribute:"title"},duration:{node:"durationNode",type:"innerText"}}),postCreate:function(){
this.inherited(arguments);
this._addGanttBar(this.params.traceStartNanos,this.params.traceEndNanos,this.params.frameStartNanos,this.params.frameEndNanos,true);
dojo.forEach(dojo.fromJson(this.params.selfFragments),function(_11a0){
this._addGanttBar(this.params.traceStartNanos,this.params.traceEndNanos,_11a0.startNanos,_11a0.endNanos);
},this);
if(this.params.ganttTooltip){
dojo.attr(this.ganttNode,"title",this.params.ganttTooltip);
}
},_addGanttBar:function(_11a1,_11a2,_11a3,_11a4,_11a5){
var bar=dojo.doc.createElement("div");
dojo.addClass(bar,_11a5?"insightGanttBarMaster":"insightGanttBar");
dojo.style(bar,{position:"absolute",top:"2px",bottom:"2px",left:(_11a3-_11a1)/(_11a2-_11a1)*100+"%",right:(_11a2-_11a4)/(_11a2-_11a1)*100+"%"});
dojo.place(bar,this.ganttNode,"last");
},_onMouseEnter:function(evt){
dojo.addClass(this.rowNode.parentNode,"dijitTreeHighlight");
this.inherited(arguments);
},_onMouseLeave:function(evt){
dojo.removeClass(this.rowNode.parentNode,"dijitTreeHighlight");
this.inherited(arguments);
},destroyRecursive:function(){
if(this.operation){
this.operation.destroyRecursive();
this.operation=null;
}
this.inherited(arguments);
}});
dojo.declare("insight.traces.FrameStack",null,{autoOpenThreshold:0.1,traceId:null,tree:null,timeout:insight.runtime.getXhrTimeout("FrameStack"),constructor:function(_11a6,node){
this.autoOpenThreshold=_11a6.autoOpenThreshold||this.autoOpenThreshold;
this.traceId=_11a6.traceId;
if(!this.traceId){
throw ("traceId is required to create FrameStack");
}
if(dojo.isIE<9){
this.autoOpenThreshold*=2;
}
dojo.xhrGet({url:_11a6.traceUri.build(),handleAs:"json",timeout:this.timeout,load:dojo.hitch(this,function(_11a7,_11a8){
this._build(node,_11a7,_11a6.operationUri);
}),error:function(){
dojo.publish("error/xhr",arguments);
}});
},_build:function(_11a9,_11aa,_11ab){
var _11ac=this._buildTreeStore(_11aa.trace,_11ab);
this.tree=new dijit.Tree({onClick:dojo.hitch(this,this.toggleOperation),model:_11ac,persist:false,_createTreeNode:function(args){
args.duration=dojo.number.format(this.model.store.getValue(args.item,"duration"))+" ms";
if(this.model.store.hasAttribute(args.item,"durationSelf")){
args.ganttTooltip=dojo.number.format(this.model.store.getValue(args.item,"durationSelf"))+" ms (self time)";
args.selfFragments=this.model.store.getValue(args.item,"selfFragments");
}
args.traceStartNanos=this.model.store.getValue(args.item,"traceStartNanos");
args.traceEndNanos=this.model.store.getValue(args.item,"traceEndNanos");
args.frameStartNanos=this.model.store.getValue(args.item,"frameStartNanos");
args.frameEndNanos=this.model.store.getValue(args.item,"frameEndNanos");
return new insight.traces.FrameTreeNode(args);
}},_11a9);
this.tree.startup();
this._expandTree(this.tree);
},_buildTreeStore:function(trace,_11ad){
var _11ae={identifier:"id",label:"label",traceId:trace.id,range:trace.range,items:[]};
this._processFrame(_11ae,trace.frameStack,null,_11ad);
return new dijit.tree.TreeStoreModel({store:new dojo.data.ItemFileReadStore({data:_11ae}),query:{type:"root"}});
},_processFrame:function(_11af,frame,_11b0,_11b1){
var item={id:frame.id,traceId:_11af.traceId,frameId:frame.id,url:_11b1.build({traceId:_11af.traceId,frameId:frame.id}),label:frame.operation.label,duration:frame.range.duration,durationSelf:frame.range.selfDuration,traceStartNanos:_11af.range.startNanos,traceEndNanos:_11af.range.endNanos,frameStartNanos:frame.range.startNanos,frameEndNanos:frame.range.endNanos,selfFragments:dojo.toJson(frame.range.selfFragments)};
if(_11b0){
if(!_11b0.children){
_11b0.children=[];
}
_11b0.children.push(item);
item.parentId=_11b0.frameId;
}else{
item.type="root";
_11af.items.push(item);
}
dojo.forEach(frame.children,function(_11b2){
this._processFrame(_11af,_11b2,item,_11b1);
},this);
},_expandTree:function(tree){
var _11b3=this._openedOperations();
this._expandTreeNode(tree,tree.rootNode,_11b3);
if(dojo.indexOf(_11b3,tree.rootNode.item.frameId)!=-1){
this._toggleOperation(tree.rootNode.item,tree.rootNode);
}
},_expandTreeNode:function(tree,node,_11b4){
tree._expandNode(node);
dojo.forEach(node.getChildren(),function(_11b5){
var _11b6=_11b5.item.duration/node.item.duration;
if(_11b6>this.autoOpenThreshold||this._forceExpand(_11b5.item,_11b4)){
this._expandTreeNode(tree,_11b5,_11b4);
}
if(dojo.indexOf(_11b4,_11b5.item.frameId)!=-1){
this._toggleOperation(_11b5.item,_11b5);
}
},this);
node.setSelected(false);
},_forceExpand:function(item,_11b7){
if(item.forceExpand===false){
return false;
}
if(dojo.indexOf(_11b7,item.frameId)!=-1){
return true;
}
if(item.children){
for(var i=0;i<item.children.length;i++){
if(this._forceExpand(item.children[i],_11b7)){
return true;
}
}
}
item.forceExpand=false;
return false;
},toggleOperation:function(item,node){
var _11b8=this._toggleOperation(item,node);
if(dojo.cookie.isSupported()){
this._updateCookie(item.frameId,!!_11b8);
}
},_openedOperations:function(){
var _11b9=dojo.cookie(this.tree.id+"-operations");
if(!_11b9){
return [];
}
var trace=_11b9.split(":")[0];
if(trace!=this.traceId){
return [];
}
return _11b9.split(":")[1].split(",");
},_updateCookie:function(_11ba,_11bb){
var _11bc=this._openedOperations();
if(_11bb){
_11bc.push(_11ba);
}else{
_11bc=dojo.filter(_11bc,function(i){
return i!=_11ba;
},this);
}
dojo.cookie(this.tree.id+"-operations",this.traceId+":"+_11bc.join(","));
},_toggleOperation:function(item,node){
var _11bd=dojo.query("> .dijitTreeRow",node.domNode)[0];
if(node.operation){
node.operation.destroyRecursive();
dojo.removeClass(_11bd,"dijitTreeNodeOpen");
node.operation=null;
}else{
var _11be=function(event){
event.cancelBubble=true;
};
node.operation=new dijit.layout.ContentPane({href:item.url,id:node.id+"_operation","class":"operation",onClick:_11be,onDblClick:_11be});
dojo.addClass(node.operation.domNode,"operation");
dojo.addClass(_11bd,"dijitTreeNodeOpen");
node.operation.placeAt(dojo.query("> .dijitTreeRow > .dijitTreeContent",node.domNode)[0],"last");
node.operation.startup();
}
return node.operation;
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.dojo",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
if(dojo.isBrowser&&(document.readyState==="complete"||dojo.config.afterOnLoad)){
window.setTimeout(dojo._loadInit,100);
}
})();
