/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["insight.charting._TimeRangeChart"]){
dojo._hasResource["insight.charting._TimeRangeChart"]=true;
dojo.provide("insight.charting._TimeRangeChart");
dojo.require("insight.charting.action2d.FillHighlight");
dojo.require("insight.charting.action2d.PointerHover");
dojo.require("insight.charting.action2d.Tooltip");
dojo.require("insight.charting.axis2d.TimeRange");
dojo.require("insight.charting.plot2d.BackgroundColumns");
dojo.require("insight.time");
dojo.require("insight.time.TimeRange");
dojo.declare("insight.charting._TimeRangeChart",null,{timeRange:null,clickable:false,hideXAxis:false,postCreate:function(){
this.timeRange.modulate(this.dataPoints);
this.inherited(arguments);
var _1=this.hideXAxis?dojox.charting.axis2d.Invisible:insight.charting.axis2d.TimeRange;
this.chart.addAxis("x",{type:_1,timeRange:this.timeRange,relative:Insight.playing(),from:1,minorTickStep:1});
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
this.connect(this.chart.stack[this.chart.plots["foregroundColumnsPlot"]],"render",dojo.hitch(this,function(_2){
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
var _3=this.chart.stack[this.chart.plots["grid"]];
if(_3.opt.hMajorLines||_3.opt.hMinorLines){
var _4=[];
dojox.lang.functional.forIn(this.chart.axes,function(_5){
if(_5.vertical){
_4.push(_5);
}
});
if(_4[0]){
_3.vAxis=_4[0].name;
}
}
this.inherited(arguments);
},_urlParams:function(){
var _6=this.inherited(arguments);
if(this.timeRange&&!(_6.start&&_6.end)){
_6.start=this.timeRange.getStart();
_6.end=this.timeRange.getEnd();
}
return _6;
},updateTimeRange:function(_7){
var _8=this.chart.getAxis("x"),_9=_8.declaredClass=="insight.charting.axis2d.TimeRange";
if(_7.timeRange){
this.timeRange=_7.timeRange.clone().modulate(this.dataPoints);
if(_9){
_8.setTimeRange(this.timeRange,true);
}
this.refresh();
}
if(typeof _7.relative=="boolean"&&_9){
_8.setRelative(_7.relative);
}
},refreshTimeRange:function(_a){
this.updateTimeRange({timeRange:this.timeRange,relative:Insight.playing()});
},_tooltipMessage:function(o){
var t=o.run&&o.run.data&&o.run.data[o.index],_b=o.run&&o.run.source&&o.run.source.store,_c="",_d,_e,_f,_10,_11,_12,_13;
_b.fetchItemByIdentity({onItem:function(i){
_d=i;
},identity:o.index});
var _14=_b.getValue(_d,"start");
var _15=_b.getValue(_d,"end");
if(!_14||!_15){
return "<h2>No data</h2>";
}
_e=insight.time.labels(_14,_15,false,this.timeRange.getDuration());
_c+="<h2>"+_e.start+" - "+_e.end+"</h2>";
_c+="<table class='dl'>";
var _16=dojox.lang.functional.keys(o.chart.runs);
dojo.forEach(o.chart.getPlotOrder(),function(_17){
var _18=dojo.filter(_16,function(run){
return _17===o.chart.series[o.chart.runs[run]].plot;
},this);
var _19=dojo.map(_18,function(_1a){
var _1b=o.chart.getAxis(o.chart.stack[o.chart.plots[_17]].vAxis),_f=o.chart.series[o.chart.runs[_1a]],_13=_f.data[o.index];
if(!_1b||_13==null){
return;
}
return {label:_f.label,value:_13,formattedValue:(_1b.opt.labelFunc?_1b.opt.labelFunc.call(_1b.opt,_13.toString(),_13,_1b.scaler.major.prec):_13.toString())};
},this);
_19=dojo.filter(_19,function(_1c){
return !!_1c&&!!_1c.formattedValue;
},this);
if(_19.length===0){
return;
}
_19.sort(function(a,b){
return b.value-a.value;
});
dojo.forEach(_19,function(_1d){
_c+="<tr><td>"+_1d.label+"</td><td>"+_1d.formattedValue+"</td></tr>";
},this);
},this);
_c+="</table>";
return _c;
},highlightDate:function(_1e){
_1e=insight.time.normalizeToDate(_1e);
if(this._highlightDate){
this.blurDate(this._highlightDate);
}
this._highlightDate=_1e;
var i=this._findDateIndex(_1e,"backgroundColumnsSeries");
if(i!=-1){
this.chart.fireEvent("backgroundColumnsSeries","onmouseover",i);
}
},blurDate:function(_1f){
_1f=insight.time.normalizeToDate(_1f);
this._highlightDate=null;
var i=this._findDateIndex(_1f,"backgroundColumnsSeries");
if(i!=-1){
this.chart.fireEvent("backgroundColumnsSeries","onmouseout",i);
}
},_findDateIndex:function(_20,_21){
var _22=this.chart.runs[_21],_23=this.chart.series[_22].plot,_24=this.chart.series[_22];
for(var i=0;i<_24.data.length;i++){
if(_24.data[i].contains(_20)){
return i;
}
}
return -1;
}});
}
