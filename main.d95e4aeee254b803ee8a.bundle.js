webpackJsonp([0,3],{0:function(e,t,n){e.exports=n("s7k+")},"2yVA":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("3j3K"),o=function(){function e(){this.chartPackage={AnnotationChart:"annotationchart",AreaChart:"corechart",Bar:"bar",BarChart:"corechart",BubbleChart:"corechart",Calendar:"calendar",CandlestickChart:"corechart",ColumnChart:"corechart",ComboChart:"corechart",PieChart:"corechart",Gantt:"gantt",Gauge:"gauge",GeoChart:"geochart",Histogram:"corechart",Line:"line",LineChart:"corechart",Map:"map",OrgChart:"orgchart",Sankey:"sankey",Scatter:"scatter",ScatterChart:"corechart",SteppedAreaChart:"corechart",Table:"table",Timeline:"timeline",TreeMap:"treemap",WordTree:"wordtree"},this.googleScriptLoadingNotifier=new r.EventEmitter,this.googleScriptIsLoading=!1}return e.prototype.load=function(e){var t=this;return new Promise(function(n,r){void 0===n&&(n=Function.prototype),void 0===r&&(r=Function.prototype),t.loadGoogleChartsScript().then(function(){google.charts.load("45",{packages:[t.chartPackage[e]],callback:n})}).catch(function(){console.error("Google charts script could not be loaded")})})},e.prototype.loadGoogleChartsScript=function(){var e=this;return new Promise(function(t,n){if(void 0===t&&(t=Function.prototype),void 0===n&&(n=Function.prototype),"undefined"!=typeof google&&google.charts)t();else if(e.googleScriptIsLoading)e.googleScriptLoadingNotifier.subscribe(function(e){e?t():n()});else{e.googleScriptIsLoading=!0;var r=document.createElement("script");r.type="text/javascript",r.src="https://www.gstatic.com/charts/loader.js",r.async=!0,r.defer=!0,r.onload=function(){e.googleScriptIsLoading=!1,e.googleScriptLoadingNotifier.emit(!0),t()},r.onerror=function(){e.googleScriptIsLoading=!1,e.googleScriptLoadingNotifier.emit(!1),n()},document.getElementsByTagName("head")[0].appendChild(r)}})},e}();o.decorators=[{type:r.Injectable}],o.ctorParameters=function(){return[]},t.GoogleChartsLoaderService=o},Byjq:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("3j3K"),o=n("2yVA"),l=n("SRlP"),i=function(){function e(e,t){this.el=e,this.loaderService=t,this.chartSelect=new r.EventEmitter,this.chartReady=new r.EventEmitter,this.chartError=new r.EventEmitter,this.mouseOver=new r.EventEmitter,this.eventsLoaded=!1}return e.prototype.ngOnChanges=function(e){var t=this;if(e.data){if(!this.data)return;this.options=this.data.options,this.loaderService.load(this.data.chartType).then(function(){void 0===t.wrapper||t.wrapper.getChartType!==t.data.chartType?t.wrapper=new google.visualization.ChartWrapper(t.data):(t.unregisterChartEvents(),t.wrapper.setDataTable(t.data.dataTable),t.wrapper.setOptions(t.options)),t.eventsLoaded||(t.registerChartWrapperEvents(),t.eventsLoaded=!0),t.wrapper.draw(t.el.nativeElement.querySelector("div"))})}},e.prototype.getSelectorBySeriesType=function(e){return{bars:"bar#%s#%r",haxis:"hAxis#0#label",line:"point#%s#%r",legend:"legendentry#%s"}[e]},e.prototype.getSeriesByColumn=function(e){for(var t=0,n=this.wrapper.getDataTable(),r=e-1;r>=0;r--){var o=n.getColumnRole(r),l=n.getColumnType(r);"data"!==o&&"number"!==l||t++}return t},e.prototype.getBoundingBoxForItem=function(e){var t={top:0,left:0,width:0,height:0};if(this.cli){var n=e.column,r=this.getSeriesByColumn(n),o=(e.row,e.row),l=this.options.seriesType;if(this.options.series&&this.options.series[r]&&this.options.series[r].type&&(l=this.options.series[r].type),l){var i=this.getSelectorBySeriesType(l);if(i){i=i.replace("%s",r+"").replace("%c",n+"").replace("%r",o+"");var a=this.cli.getBoundingBox(i);a&&(t=a)}}}return t},e.prototype.getValueAtPosition=function(e){return null===e.row?null:this.wrapper.getDataTable().getValue(e.row,e.column)},e.prototype.getColumnTypeAtPosition=function(e){return this.wrapper.getDataTable().getColumnType(e.column)||""},e.prototype.getColumnLabelAtPosition=function(e){return this.wrapper.getDataTable().getColumnLabel(e.column)||""},e.prototype.getHTMLTooltip=function(){var e=new r.ElementRef(this.el.nativeElement.querySelector(".google-visualization-tooltip"));return new l.ChartHTMLTooltip(e)},e.prototype.parseMouseOverEvent=function(e){return{position:e,boundingBox:this.getBoundingBoxForItem(e),value:this.getValueAtPosition(e),tooltip:this.getHTMLTooltip(),columnType:this.getColumnTypeAtPosition(e),columnLabel:this.getColumnLabelAtPosition(e)}},e.prototype.unregisterChartEvents=function(){var e=this.wrapper.getChart();google.visualization.events.removeAllListeners(e)},e.prototype.registerChartEvents=function(){var e=this;if(this.mouseOver.observers.length>0){var t=this.wrapper.getChart();this.cli=t.getChartLayoutInterface(),google.visualization.events.addListener(t,"onmouseover",function(t){var n=e.parseMouseOverEvent(t);e.mouseOver.emit(n)})}},e.prototype.registerChartWrapperEvents=function(){var e=this;google.visualization.events.addListener(this.wrapper,"ready",function(){e.chartReady.emit({message:"Chart ready"}),e.registerChartEvents()}),google.visualization.events.addListener(this.wrapper,"error",function(t){e.chartError.emit(t)}),google.visualization.events.addListener(this.wrapper,"select",function(){var t,n=e.wrapper.visualization.getSelection()[0];if(void 0!==n){var r=[];if(null!==n.row)for(var o=e.wrapper.getDataTable(),l=o.getNumberOfColumns(),i=0;i<l;i++)r.push(o.getValue(n.row,i));a={message:"select",row:n.row,column:n.column},a.selectedRowValues=r,t=a}else t={message:"deselect",row:null,column:null,selectedRowValues:[]};e.chartSelect.emit(t);var a})},e}();i.decorators=[{type:r.Component,args:[{selector:"google-chart",template:"<div></div>",changeDetection:r.ChangeDetectionStrategy.OnPush}]}],i.ctorParameters=function(){return[{type:r.ElementRef},{type:o.GoogleChartsLoaderService}]},i.propDecorators={data:[{type:r.Input}],chartReady:[{type:r.Output}],chartError:[{type:r.Output}],chartSelect:[{type:r.Output}],mouseOver:[{type:r.Output}]},t.GoogleChartComponent=i},"L/RD":function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="L/RD"},RRpH:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(){function e(){}return e}()},SRlP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){this.tooltipDOMElement=e}return e.prototype.setPosition=function(t,n){this.tooltipDOMElement.nativeElement.style.left=t+e.PIXELS,this.tooltipDOMElement.nativeElement.style.top=n+e.PIXELS},e.prototype.getDOMElement=function(){return this.tooltipDOMElement},e}();r.PIXELS="px",t.ChartHTMLTooltip=r},XoxQ:function(e,t,n){"use strict";function r(e){return i["ɵvid"](0,[(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Column chart"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},null),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,0,"input",[["type","button"],["value","Change data"]],null,[[null,"click"]],function(e,t,n){var r=!0,o=e.component;if("click"===t){r=o.myClick()!==!1&&r}return r},null,null)),(e()(),i["ɵted"](null,[" "])),(e()(),i["ɵeld"](0,null,null,0,"input",[["type","button"],["value","Change chart type"]],null,[[null,"click"]],function(e,t,n){var r=!0,o=e.component;if("click"===t){r=o.changeChartType()!==!1&&r}return r},null,null)),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Pie chart"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},null),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Gauge"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,4,"div",[["style","width: 1px; margin: 0 auto;"]],null,null,null,null,null)),(e()(),i["ɵted"](null,["\n  "])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},null),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Scatter chart"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},null),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Timeline chart"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},null),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Line chart with events"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h4",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Selected row: ",""])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h4",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Selected column: ",""])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,2,"pre",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["",""])),i["ɵpid"](0,h.f,[]),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,[[null,"chartReady"],[null,"chartError"],[null,"chartSelect"]],function(e,t,n){var r=!0,o=e.component;if("chartReady"===t){r=o.ready(n)!==!1&&r}if("chartError"===t){r=o.error(n)!==!1&&r}if("chartSelect"===t){r=o.select(n)!==!1&&r}return r},a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},{chartReady:"chartReady",chartError:"chartError",chartSelect:"chartSelect"}),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["Combo chart"])),(e()(),i["ɵted"](null,["\n"])),(e()(),i["ɵeld"](0,null,null,4,"p",[],null,null,null,null,null)),(e()(),i["ɵted"](null,["See console log for mouse over events.\n"])),(e()(),i["ɵeld"](0,null,null,1,"google-chart",[],null,[[null,"mouseOver"]],function(e,t,n){var r=!0,o=e.component;if("mouseOver"===t){r=o.mouseOver(n)!==!1&&r}return r},a.a,a.b)),i["ɵdid"](286720,null,0,u.GoogleChartComponent,[i.ElementRef,s.GoogleChartsLoaderService],{data:[0,"data"]},{mouseOver:"mouseOver"}),(e()(),i["ɵted"](null,["\n"]))],function(e,t){var n=t.component;e(t,4,0,n.columnChartOptions),e(t,14,0,n.pieChartOptions),e(t,22,0,n.gaugeChartOptions),e(t,29,0,n.scatterChartOptions),e(t,35,0,n.timelineChartOptions),e(t,51,0,n.lineChartOptions),e(t,59,0,n.comboChartOptions)},function(e,t){var n=t.component;e(t,41,0,null==n.selectEvent?null:n.selectEvent.row),e(t,44,0,null==n.selectEvent?null:n.selectEvent.column),e(t,47,0,i["ɵunv"](t,47,0,i["ɵnov"](t,48).transform(n.selectEvent)))})}function o(e){return i["ɵvid"](0,[(e()(),i["ɵeld"](0,null,null,1,"app-root",[],null,null,null,r,_)),i["ɵdid"](24576,null,0,c.a,[],null,null)],null,null)}var l=n("mYxl"),i=n("3j3K"),a=n("hzrn"),u=n("Byjq"),s=(n.n(u),n("2yVA")),c=(n.n(s),n("nBc1")),h=n("2Je8");n.d(t,"a",function(){return d});var p=[l.a],_=i["ɵcrt"]({encapsulation:0,styles:p,data:{}}),d=i["ɵccf"]("app-root",c.a,o,{},{},[])},Y8Vo:function(e,t,n){"use strict";var r=n("wu3h"),o=(n.n(r),n("45Dp")),l=(n.n(o),n("DAFs")),i=(n.n(l),n("FD+i")),a=(n.n(i),n("qXjp")),u=(n.n(a),n("IzNg")),s=(n.n(u),n("MVjO")),c=(n.n(s),n("oFcf")),h=(n.n(c),n("nR/1")),p=(n.n(h),n("cUYv")),_=(n.n(p),n("594w")),d=(n.n(_),n("7N90")),g=(n.n(d),n("/Ife")),f=(n.n(g),n("2tFN")),m=(n.n(f),n("ChGr")),y=(n.n(m),n("ZSR1"));n.n(y)},hzrn:function(e,t,n){"use strict";function r(e){return l["ɵvid"](2,[(e()(),l["ɵeld"](0,null,null,0,"div",[],null,null,null,null,null))],null,null)}function o(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"google-chart",[],null,null,null,r,s)),l["ɵdid"](286720,null,0,i.GoogleChartComponent,[l.ElementRef,a.GoogleChartsLoaderService],null,null)],null,null)}var l=n("3j3K"),i=n("Byjq"),a=(n.n(i),n("2yVA"));n.n(a);n.d(t,"b",function(){return s}),t.a=r;var u=[],s=l["ɵcrt"]({encapsulation:2,styles:u,data:{}});l["ɵccf"]("google-chart",i.GoogleChartComponent,o,{data:"data"},{chartReady:"chartReady",chartError:"chartError",chartSelect:"chartSelect",mouseOver:"mouseOver"},[])},j55w:function(e,t,n){"use strict";var r=n("3j3K"),o=n("RRpH"),l=n("2Je8"),i=n("Qbdm"),a=n("twlV"),u=(n.n(a),n("2yVA")),s=(n.n(u),n("XoxQ"));n.d(t,"a",function(){return p});var c=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),h=function(e){function t(t){return e.call(this,t,[s.a],[s.a])||this}return c(t,e),Object.defineProperty(t.prototype,"_LOCALE_ID_10",{get:function(){return null==this.__LOCALE_ID_10&&(this.__LOCALE_ID_10=r["ɵn"](this.parent.get(r.LOCALE_ID,null))),this.__LOCALE_ID_10},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_NgLocalization_11",{get:function(){return null==this.__NgLocalization_11&&(this.__NgLocalization_11=new l.a(this._LOCALE_ID_10)),this.__NgLocalization_11},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Compiler_12",{get:function(){return null==this.__Compiler_12&&(this.__Compiler_12=new r.Compiler),this.__Compiler_12},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_APP_ID_13",{get:function(){return null==this.__APP_ID_13&&(this.__APP_ID_13=r["ɵg"]()),this.__APP_ID_13},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_IterableDiffers_14",{get:function(){return null==this.__IterableDiffers_14&&(this.__IterableDiffers_14=r["ɵl"]()),this.__IterableDiffers_14},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_KeyValueDiffers_15",{get:function(){return null==this.__KeyValueDiffers_15&&(this.__KeyValueDiffers_15=r["ɵm"]()),this.__KeyValueDiffers_15},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DomSanitizer_16",{get:function(){return null==this.__DomSanitizer_16&&(this.__DomSanitizer_16=new i.b(this.parent.get(i.c))),this.__DomSanitizer_16},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Sanitizer_17",{get:function(){return null==this.__Sanitizer_17&&(this.__Sanitizer_17=this._DomSanitizer_16),this.__Sanitizer_17},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_HAMMER_GESTURE_CONFIG_18",{get:function(){return null==this.__HAMMER_GESTURE_CONFIG_18&&(this.__HAMMER_GESTURE_CONFIG_18=new i.d),this.__HAMMER_GESTURE_CONFIG_18},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EVENT_MANAGER_PLUGINS_19",{get:function(){return null==this.__EVENT_MANAGER_PLUGINS_19&&(this.__EVENT_MANAGER_PLUGINS_19=[new i.e(this.parent.get(i.c)),new i.f(this.parent.get(i.c)),new i.g(this.parent.get(i.c),this._HAMMER_GESTURE_CONFIG_18)]),this.__EVENT_MANAGER_PLUGINS_19},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EventManager_20",{get:function(){return null==this.__EventManager_20&&(this.__EventManager_20=new i.h(this._EVENT_MANAGER_PLUGINS_19,this.parent.get(r.NgZone))),this.__EventManager_20},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵDomSharedStylesHost_21",{get:function(){return null==this.__ɵDomSharedStylesHost_21&&(this.__ɵDomSharedStylesHost_21=new i.i(this.parent.get(i.c))),this.__ɵDomSharedStylesHost_21},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵDomRendererFactory2_22",{get:function(){return null==this.__ɵDomRendererFactory2_22&&(this.__ɵDomRendererFactory2_22=new i.j(this._EventManager_20,this._ɵDomSharedStylesHost_21)),this.__ɵDomRendererFactory2_22},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RendererFactory2_23",{get:function(){return null==this.__RendererFactory2_23&&(this.__RendererFactory2_23=this._ɵDomRendererFactory2_22),this.__RendererFactory2_23},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵSharedStylesHost_24",{get:function(){return null==this.__ɵSharedStylesHost_24&&(this.__ɵSharedStylesHost_24=this._ɵDomSharedStylesHost_21),this.__ɵSharedStylesHost_24},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Testability_25",{get:function(){return null==this.__Testability_25&&(this.__Testability_25=new r.Testability(this.parent.get(r.NgZone))),this.__Testability_25},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Meta_26",{get:function(){return null==this.__Meta_26&&(this.__Meta_26=new i.k(this.parent.get(i.c))),this.__Meta_26},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Title_27",{get:function(){return null==this.__Title_27&&(this.__Title_27=new i.l(this.parent.get(i.c))),this.__Title_27},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_GoogleChartsLoaderService_28",{get:function(){return null==this.__GoogleChartsLoaderService_28&&(this.__GoogleChartsLoaderService_28=new u.GoogleChartsLoaderService),this.__GoogleChartsLoaderService_28},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new l.b,this._ErrorHandler_1=i.m(),this._APP_INITIALIZER_2=[r["ɵo"],i.n(this.parent.get(i.o,null),this.parent.get(r.NgProbeToken,null))],this._ApplicationInitStatus_3=new r.ApplicationInitStatus(this._APP_INITIALIZER_2),this._ɵf_4=new r["ɵf"](this.parent.get(r.NgZone),this.parent.get(r["ɵConsole"]),this,this._ErrorHandler_1,this.componentFactoryResolver,this._ApplicationInitStatus_3),this._ApplicationRef_5=this._ɵf_4,this._ApplicationModule_6=new r.ApplicationModule(this._ApplicationRef_5),this._BrowserModule_7=new i.p(this.parent.get(i.p,null)),this._Ng2GoogleChartsModule_8=new a.Ng2GoogleChartsModule,this._AppModule_9=new o.a,this._AppModule_9},t.prototype.getInternal=function(e,t){return e===l.b?this._CommonModule_0:e===r.ErrorHandler?this._ErrorHandler_1:e===r.APP_INITIALIZER?this._APP_INITIALIZER_2:e===r.ApplicationInitStatus?this._ApplicationInitStatus_3:e===r["ɵf"]?this._ɵf_4:e===r.ApplicationRef?this._ApplicationRef_5:e===r.ApplicationModule?this._ApplicationModule_6:e===i.p?this._BrowserModule_7:e===a.Ng2GoogleChartsModule?this._Ng2GoogleChartsModule_8:e===o.a?this._AppModule_9:e===r.LOCALE_ID?this._LOCALE_ID_10:e===l.c?this._NgLocalization_11:e===r.Compiler?this._Compiler_12:e===r.APP_ID?this._APP_ID_13:e===r.IterableDiffers?this._IterableDiffers_14:e===r.KeyValueDiffers?this._KeyValueDiffers_15:e===i.q?this._DomSanitizer_16:e===r.Sanitizer?this._Sanitizer_17:e===i.r?this._HAMMER_GESTURE_CONFIG_18:e===i.s?this._EVENT_MANAGER_PLUGINS_19:e===i.h?this._EventManager_20:e===i.i?this._ɵDomSharedStylesHost_21:e===i.j?this._ɵDomRendererFactory2_22:e===r.RendererFactory2?this._RendererFactory2_23:e===i.t?this._ɵSharedStylesHost_24:e===r.Testability?this._Testability_25:e===i.k?this._Meta_26:e===i.l?this._Title_27:e===u.GoogleChartsLoaderService?this._GoogleChartsLoaderService_28:t},t.prototype.destroyInternal=function(){this._ɵf_4.ngOnDestroy(),this.__ɵDomSharedStylesHost_21&&this._ɵDomSharedStylesHost_21.ngOnDestroy()},t}(r["ɵNgModuleInjector"]),p=new r.NgModuleFactory(h,o.a)},mYxl:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=["h1[_ngcontent-%COMP%]:not(:first-of-type){margin-top:2rem}pre[_ngcontent-%COMP%]{padding:15px 0 0;min-height:40px;white-space:normal}"]},nBc1:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(){function e(){this.columnChartOptions={chartType:"ColumnChart",dataTable:[["Country","Performance","Profits"],["Germany",700,1200],["USA",300,600],["Brazil",400,500],["Canada",500,1e3],["France",600,1100],["RU",800,1e3]],options:{title:"Countries"}},this.pieChartOptions={chartType:"PieChart",dataTable:[["Task","Hours per Day"],["Work",11],["Eat",2],["Commute",2],["Watch TV",2],["Sleep",7]],options:{title:"Tasks"}},this.gaugeChartOptions={chartType:"Gauge",dataTable:[["Label","Value"],["Value",1.78]],options:{animation:{easing:"out"},width:150,height:150,greenFrom:1,greenTo:4,minorTicks:5,min:0,max:5,majorTicks:["0","1","2","3","4","5"],greenColor:"#d0e9c6"}},this.scatterChartOptions={chartType:"ScatterChart",dataTable:[["Age","Weight"],[8,12],[4,5.5],[11,14],[4,5],[3,3.5],[6.5,7]],options:{title:"Age vs. Weight comparison",hAxis:{title:"Age",minValue:0,maxValue:15},vAxis:{title:"Weight",minValue:0,maxValue:15},legend:"none"}},this.timelineChartOptions={chartType:"Timeline",dataTable:[["Name","From","To"],["Washington",new Date(1789,3,30),new Date(1797,2,4)],["Adams",new Date(1797,2,4),new Date(1801,2,4)],["Jefferson",new Date(1801,2,4),new Date(1809,2,4)]]},this.lineChartOptions={chartType:"LineChart",dataTable:[["Year","Sales","Expenses"],["2004",1e3,400],["2005",1170,460],["2006",660,1120],["2007",1030,540]],options:{title:"Company Performance"}},this.comboChartOptions={chartType:"ComboChart",dataTable:[["Month","Bolivia","Ecuador","Madagascar","Papua New Guinea","Rwanda","Average"],["2004/05",165,938,522,998,450,614.6],["2005/06",135,1120,599,1268,288,682],["2006/07",157,1167,587,807,397,623],["2007/08",139,1110,615,968,215,609.4],["2008/09",136,691,629,1026,366,569.6]],options:{title:"Monthly Coffee Production by Country",vAxis:{title:"Cups"},hAxis:{title:"Month"},seriesType:"bars",series:{5:{type:"line"}}}}}return e.prototype.myClick=function(){this.columnChartOptions=Object.create(this.columnChartOptions);for(var e=1;e<7;e++)this.columnChartOptions.dataTable[e][1]=Math.round(1e3*Math.random()),this.columnChartOptions.dataTable[e][2]=Math.round(1e3*Math.random())},e.prototype.changeChartType=function(){this.columnChartOptions=Object.create(this.columnChartOptions),"ColumnChart"==this.columnChartOptions.chartType?this.columnChartOptions.chartType="PieChart":this.columnChartOptions.chartType="ColumnChart"},e.prototype.ready=function(e){console.log(e.message)},e.prototype.error=function(e){console.error(e)},e.prototype.select=function(e){this.selectEvent=e},e.prototype.mouseOver=function(e){console.log("bb: "+JSON.stringify(e.boundingBox)),console.log("pos: "+JSON.stringify(e.position)),console.log("type: "+JSON.stringify(e.columnType)),console.log("label: "+JSON.stringify(e.columnLabel)),console.log("value: "+JSON.stringify(e.value))},e}()},oYMd:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r={production:!0}},"s7k+":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n("Y8Vo"),n("3j3K")),o=n("oYMd"),l=n("Qbdm"),i=n("j55w");o.a.production&&n.i(r.enableProdMode)(),n.i(l.a)().bootstrapModuleFactory(i.a)},twlV:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("3j3K"),o=n("Byjq"),l=n("2yVA"),i=function(){function e(){}return e}();i.decorators=[{type:r.NgModule,args:[{declarations:[o.GoogleChartComponent],providers:[l.GoogleChartsLoaderService],exports:[o.GoogleChartComponent]}]}],i.ctorParameters=function(){return[]},t.Ng2GoogleChartsModule=i}},[0]);