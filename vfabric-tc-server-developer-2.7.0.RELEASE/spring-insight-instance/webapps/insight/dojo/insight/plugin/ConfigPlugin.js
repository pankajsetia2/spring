/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.plugin.ConfigPlugin"]){
dojo._hasResource["insight.plugin.ConfigPlugin"]=true;
dojo.provide("insight.plugin.ConfigPlugin");
dojo.require("insight.dojo.requireCss");
dojo.require("insight.plugin.MenuPlugin");
dojo.declare("insight.plugin.ConfigPlugin",insight.plugin.MenuPlugin,{section:null,_pluginContentContainer:"config-body",_menuItem:null,_pluginType:"config",isMenuShown:function(){
return window.location.pathname.indexOf(Insight.buildUri("/config/"))===0;
},addOptionToMenu:function(){
var _1=dojo.byId(this.section+"-list");
var _2=Insight.buildUri("/config/"+this.plugin).build();
this._menuItem=dojo.create("li",{innerHTML:"<a href=\""+_2+"\">"+this.label+"</a>"});
dojo.place(this._menuItem,_1);
},highlightOption:function(){
dojo.attr(this._menuItem,"class","active");
},getUri:function(){
return Insight.buildUri("/config/"+this.plugin);
}});
}
