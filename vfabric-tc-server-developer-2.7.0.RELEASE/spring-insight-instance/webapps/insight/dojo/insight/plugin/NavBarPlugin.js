/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.plugin.NavBarPlugin"]){
dojo._hasResource["insight.plugin.NavBarPlugin"]=true;
dojo.provide("insight.plugin.NavBarPlugin");
dojo.require("insight.dojo.requireCss");
dojo.require("dijit.MenuBarItem");
dojo.require("insight.plugin.MenuPlugin");
dojo.declare("insight.plugin.NavBarPlugin",insight.plugin.MenuPlugin,{_pluginContentContainer:"plugin-content",_pluginType:"navBar",isMenuShown:function(){
return true;
},addOptionToMenu:function(){
var _1=this;
dijit.byId("nav-menu").addChild(new dijit.MenuBarItem({label:_1.label,onClick:function(){
window.location=Insight.buildUri("/plugin/"+_1.plugin).build();
},selected:window.location.pathname.indexOf(_1.getUri())===0}),0);
},getUri:function(){
return Insight.buildUri("/plugin/"+this.plugin);
}});
}
