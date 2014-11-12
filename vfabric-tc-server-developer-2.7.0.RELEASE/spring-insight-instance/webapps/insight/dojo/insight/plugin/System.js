/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.plugin.System"]){
dojo._hasResource["insight.plugin.System"]=true;
dojo.provide("insight.plugin.System");
dojo.declare("insight.plugin.SystemImpl",null,{_plugins:null,constructor:function(){
this._plugins=[];
},addPlugin:function(_1){
this._plugins.push(_1);
},redirectIfDefaultPage:function(){
var _2=false;
var _3;
var _4=1;
var _5;
if(window.location.pathname==Insight.buildUri("/").build()){
_2=true;
_3=Insight.buildUri("/resources").build();
_5="navBar";
}else{
if(window.location.pathname==Insight.buildUri("/config").build()){
_2=true;
_3=Insight.buildUri("/config/threshold").build();
_5="config";
}
}
if(_2){
dojo.forEach(this._plugins,function(_6){
if(_6.getPluginType()==_5&&_6.getDefaultSelectionScore()>_4){
_3=_6.getUri();
_4=_6.getDefaultSelectionScore();
}
},this);
window.location=_3;
}
}});
insight.plugin.System=new insight.plugin.SystemImpl();
}
