/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.dojo.requireCss"]){
dojo._hasResource["insight.dojo.requireCss"]=true;
dojo.provide("insight.dojo.requireCss");
(function(){
var _1=0;
var _2={};
var _3=null;
var _4=0;
var _5={};
var _6=null;
var _7=function(){
var _8=false;
for(var _9 in _2){
if(typeof _9=="string"){
_8=true;
}
}
if(_8){
var _a=(dojo.config.cssWaitSeconds||15)*1000;
if((_4+_a)<(new Date()).getTime()){
var _b="Timed out waiting for css files: ";
for(_9 in _2){
_b+=_9+" ";
}
throw _b;
}
}else{
clearInterval(_3);
_3=null;
if(_6!=null){
_6();
}
}
};
dojo.requireCss=function(_c,_d){
if(_5[_c]){
return true;
}
var _e=_c;
if(_e.indexOf("/")==-1){
_e=dojo._getModuleSymbols(_c).join("/")+".css";
_e=((_e.charAt(0)=="/"||_e.match(/^\w+:/))?"":dojo.baseUrl)+_e;
}
if(dojo.config.cacheBust){
_e+=(_e.indexOf("?")==-1?"?":"&")+String(dojo.config.cacheBust).replace(/\W+/g,"");
}
var _f=dojo.doc.createElement("style");
_f.type="text/css";
_2[_e]=_f;
_5[_c]=true;
dojo.xhrGet({url:_e}).then(function(_10){
if(_f.styleSheet){
var _11=_10.match(/@import\s+url\s*\(\s*['|"]([^'|"]+)['|"]\s*\);?/g);
if(_11){
iMax=_11.length;
for(i=0;i<iMax;i++){
_11[i].match(/['|"]([^'|^"]+)['|"]/);
dojo.requireCss(RegExp.$1);
}
}
_f.styleSheet.cssText=_10;
}else{
_f.appendChild(document.createTextNode(_10));
}
delete _2[_e];
if(typeof _d=="function"){
_d();
}
return (_10);
});
if(!this.headElement){
this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){
this._headElement=document.getElementsByTagName("html")[0];
}
}
this._headElement.appendChild(_f);
_4=(new Date()).getTime();
if(!_3){
_3=setInterval(_7,100);
}
};
dojo.requireCss.setCallback=function(_12){
if(typeof _12=="function"){
_6=_12;
}
};
})();
}
