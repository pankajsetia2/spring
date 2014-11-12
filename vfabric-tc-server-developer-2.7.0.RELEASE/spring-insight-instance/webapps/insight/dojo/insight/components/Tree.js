/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.components.Tree"]){
dojo._hasResource["insight.components.Tree"]=true;
dojo.provide("insight.components.Tree");
dojo.require("dijit.Tree");
dojo.declare("insight.components.TreeNode",dijit._TreeNode,{attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"labelNode",type:"innerHTML"},tooltip:{node:"rowNode",type:"attribute",attribute:"title"}}),_onMouseEnter:function(_1){
dojo.addClass(this.rowNode,"dijitTreeHighlight");
this.inherited(arguments);
},_onMouseLeave:function(_2){
dojo.removeClass(this.rowNode,"dijitTreeHighlight");
this.inherited(arguments);
}});
dojo.declare("insight.components.Tree",dijit.Tree,{_createTreeNode:function(_3){
return new insight.components.TreeNode(_3);
}});
}
