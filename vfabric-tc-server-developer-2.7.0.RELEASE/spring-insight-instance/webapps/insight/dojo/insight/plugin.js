/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.plugin"]){
dojo._hasResource["insight.plugin"]=true;
dojo.provide("insight.plugin");
insight.plugin.staticUri=function(_1,_2){
return Insight.buildUri("/static/plugin/"+_1+"/"+_2);
};
insight.plugin.serviceUri=function(_3,_4){
return Insight.buildUri("/services/plugins/"+_3+"/"+_4);
};
insight.plugin.registerDojoModule=function(_5,_6){
dojo.registerModulePath(_5,Insight.buildUri("/static/plugin/"+_6).build());
};
}
