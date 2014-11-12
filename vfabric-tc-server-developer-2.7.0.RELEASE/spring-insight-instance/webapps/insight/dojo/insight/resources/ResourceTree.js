/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.resources.ResourceTree"]){
dojo._hasResource["insight.resources.ResourceTree"]=true;
dojo.provide("insight.resources.ResourceTree");
dojo.require("insight.components.Tree");
dojo.declare("insight.resources.ResourceTreeNode",insight.components.TreeNode,{_updateItemClasses:function(_1){
this.inherited(arguments);
if(_1.health&&_1.health.rating=="NOSAMPLE"){
this.set("style",{display:"none"});
}else{
this.set("style",{display:""});
}
}});
dojo.declare("insight.resources.ResourceTree",insight.components.Tree,{persist:false,healthLampUrl:null,startup:function(){
this.inherited(arguments);
dojo.forEach(this.attr("rootNode").getChildren(),function(_2){
this._expandNode(_2);
},this);
this.rootNode.startup();
},getLabel:function(_3){
var _4="";
if(_3.health){
_4+="<img src='"+this.healthLampUrl.build({lamp:_3.healthLamp})+"' /> ";
}
_4+=this.model.getLabel(_3);
return _4;
},getTooltip:function(_5){
return this.model.getLabel(_5);
},findTreeNode:function(_6){
return this.getNodesByItem(_6.toString())[0];
},highlightResource:function(_7){
var _8=this.findTreeNode(_7);
if(_8){
this.set("selectedNodes",[_8]);
}else{
this.set("path",this._resourcePath(_7));
}
},_resourcePath:function(_9){
_9=new insight.resources.ResourceKey(_9);
var _a=[];
function _b(_c){
if(_c){
_a.push(_c.toString());
_b(_c.makeParentResourceKey());
if(_c.getName()){
if(_c.getType()=="Application"){
_a.push("insight:type=Application");
}else{
if(_c.getType()=="Server"){
_a.push("insight:type=Server");
}
}
}
}
};
_b(_9);
return _a.reverse();
},_createTreeNode:function(_d){
return new insight.resources.ResourceTreeNode(_d);
},_initState:function(){
if(this.persist){
var _e=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(_e){
dojo.forEach(_e.split("|"),function(_f){
this._openedItemIds[_f]=true;
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
},_onDownArrow:function(_10){
var _11=this._getNextNode(_10.node);
if(_11&&_11.isTreeNode){
if(dojo.style(_11,"display")=="none"){
this._onDownArrow(dojo.delegate(_10,{node:_11}));
return;
}
this.focusNode(_11);
}
},_onUpArrow:function(_12){
var _13=_12.node;
var _14=_13.getPreviousSibling();
if(_14){
_13=_14;
while(_13.isExpandable&&_13.isExpanded&&_13.hasChildren()){
var _15=_13.getChildren();
_13=_15[_15.length-1];
}
}else{
var _16=_13.getParent();
if(!(!this.showRoot&&_16===this.rootNode)){
_13=_16;
}
}
if(_13&&_13.isTreeNode){
if(dojo.style(_13,"display")=="none"){
this._onUpArrow(dojo.delegate(_12,{node:_13}));
return;
}
this.focusNode(_13);
}
}});
}
