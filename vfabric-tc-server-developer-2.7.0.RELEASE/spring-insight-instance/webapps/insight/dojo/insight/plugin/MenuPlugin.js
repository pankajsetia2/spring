/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.plugin.MenuPlugin"]){
dojo._hasResource["insight.plugin.MenuPlugin"]=true;
dojo.provide("insight.plugin.MenuPlugin");
dojo.require("dijit._Widget");
dojo.require("insight.dojo.requireCss");
dojo.require("insight.plugin");
dojo.require("insight.plugin.System");
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
var _1=this;
var _2=dojo.xhrGet({url:insight.plugin.staticUri(_1.plugin,_1.plugin+".html").build(),handleAs:"text"});
dojo.when(_2,function(_3){
var _4=dojo.byId(_1._pluginContentContainer);
if(_4==null){
return;
}
_4.innerHTML=_3;
dojo.style(_4,"display","block");
dojo.parser.parse(_4);
_1.onContentLoaded(_4);
});
},isPluginSelected:function(){
return window.location.pathname.indexOf(this.getUri())===0;
},getUri:function(){
return "";
},initializeModule:function(){
insight.plugin.registerDojoModule("insight.plugin."+this.plugin,this.plugin);
var _5=dojo["require"];
_5("insight.plugin."+this.plugin+"."+this.plugin);
},onContentPreload:function(){
},onContentLoaded:function(_6){
}});
}
