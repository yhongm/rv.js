!function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e};function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var _yrvObservable=__webpack_require__(4),_yrvObservable2=_interopRequireDefault(_yrvObservable),_yrvMap=__webpack_require__(1),_yrvMap2=_interopRequireDefault(_yrvMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var YrvUtil=function(){function YrvUtil(){_classCallCheck(this,YrvUtil)}return _createClass(YrvUtil,null,[{key:"isString",value:function(e){return"string"==typeof e}},{key:"toArray",value:function(e){if(!e)return[];for(var t=[],n=0;n<e.length;n++)t.push(e[n]);return t}},{key:"checkHaveSameValueFromArray",value:function(e){for(var t=!1,n=0;n<e.length&&!0!==t;n++)for(var o=e.length-1;n<o;o--)if(e[n]==e[o]){t=!0;break}return t}},{key:"isHtmlTag",value:function(e){return"img,iframe,embed,object,param,video,audio,source,track,canvas,map,area,svg,math,datails,summary,menuitem,menu,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,table,caption,colgroup,col,tbody,thead,tfoot,tr,td,th,a,em,strong,small,s,cite,q,dfn,abbr,data,time,code,var,samp,kbd,sub,sup,i,b,u,mark,ruby,rt,bdi,bdo,span,br,wbr,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,body,section,nav,article,aside,h1,h2,h3,h4,h5,h6,header,footer,address,main,head,title,base,link,meta,style,script,noscript,template,ins,del,html,div".split(",").includes(e)}},{key:"loopGet",value:function(t){var n=this;Object.keys(t).forEach(function(e){t[e]instanceof Array?t[e].forEach(function(e){n.loopGet(e)}):t[e]})}},{key:"isRvJsProp",value:function(e){return["domData","childDomData","for","data"].includes(e)}},{key:"isRvEvent",value:function(e){return/^rv-\w*$/.test(e)}},{key:"createAndSendSimpleRvEvent",value:function(e,t){var n=document.createEvent("CustomEvent");n.initCustomEvent("rv_"+e+"_"+YrvUtil.getHashCode(e),!0,!0,t),document.dispatchEvent(n)}},{key:"receiveRvEvent",value:function(e,t){document.addEventListener("rv_"+e+"_"+YrvUtil.getHashCode(e),function(e){t(e,e.detail)})}},{key:"addElementEventListener",value:function(e,t,n){e instanceof HTMLElement&&e.addEventListener(t,n)}},{key:"generateHashMNameByMName",value:function(e){return YrvUtil.getMethodHashId(e)+"_"+e}},{key:"getMethodHashId",value:function(e){return"_rv_"+YrvUtil.getHashCode(e)}},{key:"getHashCode",value:function(e){for(var t=12345678,n=e.length-1;0<=n;n--)t^=(t<<6)+e.charCodeAt(n)+(t>>3);return 4294967295&t}},{key:"isForIn",value:function(e){return/^\w* _in_ [\w\.]*$/.test(e)}},{key:"isForForIn",value:function(e){return/^\w* _in*$/.test(e)}},{key:"isForOrForFor",value:function(e){return/^\w* _in_ \w|_in*$/.test(e)}},{key:"isIgnoreChildren",value:function(e){return e.props&&e.props.hasOwnProperty("ignore")}},{key:"isNumber",value:function(e){if(null==e||""===e)return!1;if("string"!=typeof e)return"number"==typeof e;return!!(/^\d+$/.test(e)||/^-\d+$/.test(e)||/^[1-9]\d*[.]\d+$/.test(e)||/^0[.]\d+$/.test(e)||/^-[1-9]\d*[.]\d+$/.test(e)||/^-0[.]\d+$/.test(e))}},{key:"addStyle2Head",value:function(t){var n=document.getElementsByTagName("style")[0];if(n)try{n.appendChild(document.createTextNode(t))}catch(e){console.error("component style,"+e),n.stylesheet.cssText=t}else(n=document.createElement("style")).type="text/css",document.getElementsByTagName("head")[0].appendChild(n)}},{key:"setAttr",value:function(e,t,n){switch(t){case"style":e.style.cssText=n;break;case"value":var o=e.tagName||"";"input"===(o=o.toLowerCase())||"textarea"===o?e.value=n:e.setAttribute(t,n);break;default:e.setAttribute(t,n)}}},{key:"isPlaceHolder",value:function(e){return!!e&&!!/^%#\w*.\w*#%$/.test(e)}},{key:"isRvEventProp",value:function(e){return!!e&&e.startsWith("::")}},{key:"isDotOperatorExpression",value:function(e){return/^\w*\.\w*$/.test(e)}},{key:"getPlaceHolderValue",value:function(e){return e.slice(2,-2)}},{key:"getNotUndefinedContent",value:function(e){return void 0===e?"":e}},{key:"isOperatorExpression",value:function(e){return!!YrvUtil.isString(e)&&!!/^\{\w*|\|\%+\}$/.test(e)}},{key:"getOperatorExpression",value:function getOperatorExpression(content,data,dataKey,context){if(YrvUtil.isString(content)){var expression=content.slice(content.indexOf("{")+1,content.indexOf("}")),startIndex=expression.indexOf("%#"),endIndex=expression.indexOf("#%")+2,placeHolder,placeHolderValue,realValue,placeHolderValueKey,placeHolderValueValue,placeHolderVValue,realValue,expression;return-1!=startIndex&&-1!=endIndex&&startIndex<endIndex&&(placeHolder=expression.slice(startIndex,endIndex),placeHolderValue=YrvUtil.getPlaceHolderValue(placeHolder),realValue=void 0,realValue=YrvUtil.isDotOperatorExpression(placeHolderValue)?(placeHolderValueKey=placeHolderValue.split(".")[0],placeHolderValueValue=placeHolderValue.split(".")[1],placeHolderVValue=data[placeHolderValueValue],placeHolderValueKey in context.componentData?placeHolderVValue=data[placeHolderValueKey][placeHolderValueValue]:placeHolderValueKey!==dataKey||dataKey||(placeHolderVValue=data[placeHolderValueValue]),YrvUtil.isNumber(placeHolderVValue)?placeHolderVValue:'"'+placeHolderVValue+'"'):data[YrvUtil.getPlaceHolderValue(placeHolder)],expression=expression.replace(placeHolder,realValue)),eval(expression)}}},{key:"getObjType",value:function(e){return null===e?"null":void 0===e?"undefined":Object.prototype.toString.call(e).slice(8,-1)}},{key:"clone",value:function(e){var t=void 0,n=YrvUtil.getObjType(e);if("Object"===n)t={};else{if("Array"!==n)return e;t=[]}for(var o in e){var r=e[o];"Object"==YrvUtil.getObjType(r)||"Array"==YrvUtil.getObjType(r)?t[o]=YrvUtil.clone(r):t[o]=r}return t}},{key:"cloneObj",value:function(e){var t=Object.getPrototypeOf(e);return Object.assign(Object.create(t),e)}},{key:"cloneObj2",value:function(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}},{key:"typeObjOrArray",value:function(e){var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"==t||"Array"==t}},{key:"deepinCloneObj",value:function(t){if(t){var n=function(e){var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"==t?"obj":"Array"==t?"arr":t},r=Object.create(Object.getPrototypeOf(t),Object.getOwnPropertyDescriptors(t));return Object.keys(t).forEach(function(e){var o;"obj"==n(t[e])?"componentMap"===e?(o=new _yrvMap2.default(t[e].name+"_clone"),t[e].forEachKV(function(e,t){var n=[];t.forEach(function(e){var t=e._cloneNew(e.componentkey);t.componentUniqueTag=e.componentUniqueTag+"_c",n.push(t)}),o.put(e,n)}),r[e]=o):r[e]=YrvUtil.deepinCloneObj(t[e]):"arr"==n(t[e])?r[e]=YrvUtil.deepinCloneObj(t[e]):r[e]=t[e]}),r}}},{key:"observe",value:function(o,r,i){Object.keys(o).forEach(function(e){var t=o[e],n=new _yrvObservable2.default;r.put(e,n),n.has(i)||n.add(i),Object.defineProperty(o,e,{get:function(){return t},set:function(e){(YrvUtil.typeObjOrArray(e)?YrvUtil.getHashCode(JSON.stringify(t))!==YrvUtil.getHashCode(JSON.stringify(e)):t!==e)&&(t=e,n.invoke())}})})}},{key:"observeComponent",value:function(t,e){t.data&&YrvUtil.observe(t.data,t.observeMap,e),t.watchObj&&Object.keys(t.watchObj).forEach(function(e){t.observeMap.hasKey(e)&&t.observeMap.get(e).add(function(){t.watchObj[e]()})})}}]),YrvUtil}();YrvUtil.NODE_REPLACE=0,YrvUtil.CHILD_RE_ORDER=1,YrvUtil.NODE_PROPS=2,YrvUtil.NODE_CONTENT=3,exports.default=YrvUtil},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=(function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}(i,[{key:"put",value:function(e,t){e in this.map||this.length++,this.map[e]=t}},{key:"get",value:function(e){return e in this.map?this.map[e]:null}},{key:"remove",value:function(e){e in this.map&&(delete this.map[e],this.length--)}},{key:"hasKey",value:function(e){return e in this.map}},{key:"forEach",value:function(t){var n=this;Object.keys(this.map).forEach(function(e){t(n.map[e])})}},{key:"forEachKV",value:function(t){var n=this;Object.keys(this.map).forEach(function(e){t(e,n.map[e])})}},{key:"filterV",value:function(n){var o=void 0;return this.forEachKV(function(e,t){1==n(e,t)&&(o=t)}),o}},{key:"size",value:function(){return this.length}},{key:"clear",value:function(){this.length=0,this.map=new Object}}]),i);function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),this.length=0,this.name=e,this.map=new Object}t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i,a=n(0),s=(i=a)&&i.__esModule?i:{default:i};var u=(o(c,[{key:"render",value:function(n){var e,o=this,r=void 0;return this.isComponent?r=n.filter(function(e){return e.componentUniqueTag===o.uniqueTag})[0].component._render():(r=document.createElement(this.tag),e=this.props,this.renderCallback&&this.renderCallback(r,e,this.belong,this.componentUniqueTag),this._innerHandlerProps(r,e)),this.children.forEach(function(e){var t=e instanceof c?e.render(n):document.createTextNode(e);e instanceof c&&e.props&&"slot"in e.props?o._handleSlotDom(r,t,e.props.slot):r.appendChild(t)}),this._calcCount(n),r}},{key:"_calcCount",value:function(o){var e,t,n=this,r=0;this.isComponent?0<(e=o.filter(function(e){return e.componentUniqueTag===n.uniqueTag})).length&&(t=e[0].component,this.count=t._yrvElement.count):(this.children.forEach(function(t){var e,n;t instanceof c&&(t._calcCount(o),t.isComponent?0<(e=o.filter(function(e){return e.componentUniqueTag===t.uniqueTag})).length&&(n=e[0].component,r+=n._yrvElement.count,t.count=n._yrvElement.count):r+=t.count),r++}),this.count=r)}},{key:"_handleSlotDom",value:function(e,t,n){var o=this,r=n,i=-1;-1<(i="default"===r?s.default.toArray(e.childNodes).findIndex(function(e){return"SLOT"!==e.tagName&&o._handleSlotDom(e,t,n),"SLOT"==e.tagName}):s.default.toArray(e.childNodes).findIndex(function(e){return"SLOT"!==e.tagName&&o._handleSlotDom(e,t,n),"SLOT"==e.tagName&&e.getAttribute("name")===r}))&&e.replaceChild(t,e.childNodes[i])}},{key:"_innerHandlerProps",value:function(n,o){var e,r=this;for(var t in o)!function(t){s.default.isRvJsProp(t)||(s.default.isRvEvent(t)?"watch"==(e=t.slice(3))?n instanceof HTMLInputElement?s.default.addElementEventListener(n,"input",function(e){s.default.createAndSendSimpleRvEvent(s.default.generateHashMNameByMName(r.belong+"_"+r.componentUniqueTag+"_"+o[t]+"change"),n.value)}):console.log("RV warning:the rv-watch only use in input label"):s.default.addElementEventListener(n,e,function(e){Object.defineProperty(e,"element",{value:n}),s.default.createAndSendSimpleRvEvent(s.default.generateHashMNameByMName(r.belong+"_"+r.componentUniqueTag+"_"+o[t]),e)}):void 0!==o[t]&&s.default.setAttr(n,t,o[t]))}(t)}}]),c);function c(e,t,n,o,r,i,a,u){if(!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),this.tag=e,this.belong=o,this.componentUniqueTag=r,this.uniqueTag=i,this.isComponent=a,this.props=t||{},this.children=n||[],this.key=t?t.key:void 0,this.renderCallback=u,s.default.isHtmlTag(this.tag)&&!this.key)throw new Error(e+" ... html tag in component "+this.belong+" the key is undefined");var l=0;this.children.forEach(function(e){e instanceof c&&(l+=e.count),l++}),this.count=l}t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=u(n(0)),a=u(n(5));function u(e){return e&&e.__esModule?e:{default:e}}var l=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,a.default),o(s,[{key:"run",value:function(e){(i.default.isString(this.el)?document.querySelector(this.el):this.el).appendChild(this._render()),e(this),this._updatedom(),this._rv_ev_run()}}],[{key:"component",value:function(e){return new Proxy(new a.default(e,!1),{set:function(e,t,n){return e[t]=n,!0},get:function(e,t){return"this"===t?e:e[t]},apply:function(e,t,n){e(n)}})}}]),s);function s(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,t));return n.el=e,n}t.default=l,e.exports=l},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=(function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}(i,[{key:"add",value:function(e){this.updateFunctions.push(e)}},{key:"has",value:function(e){return e in this.updateFunctions}},{key:"invoke",value:function(){this.updateFunctions.forEach(function(e){e()})}}]),i);function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),this.name=e,this.updateFunctions=[]}t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=p(n(6)),g=p(n(0)),a=p(n(7)),u=p(n(1)),l=p(n(8)),s=p(n(9)),c=p(n(2)),d=p(n(11));function p(e){return e&&e.__esModule?e:{default:e}}var f=(o(h,[{key:"_init",value:function(){this.context={componentName:this.name,componentData:this.data,componentUniqueTag:this.componentUniqueTag,route:void 0},this.parse=new a.default(this.context),this.rvDomUtil=new i.default(this.context),this.observeMap=new u.default(this.name+"ComponentObserveMap"),this.yrvPatch=new l.default(this.context),this.yrvDiff=new s.default(this.context)}},{key:"_belong",value:function(e){this.belongComponent=e}},{key:"getParentComponentName",value:function(){return this.belongComponent}},{key:"getComponentUniqueTag",value:function(){return this.componentUniqueTag}},{key:"route",value:function(e){this.context.route=new d.default(this.name),this.context.route.register(e)}},{key:"use",value:function(e,t,n){var o=1<arguments.length&&void 0!==t?t:"",r=void 0,r=2<arguments.length&&void 0!==n&&!n?e:e.this._cloneNew(o);this.parse.useCustomComponent(r)}},{key:"_registerEvent",value:function(){var n=this;g.default.receiveRvEvent(this.name+"_routeChange",function(e,t){n.context.route.go(t),n._parseHtmlTemplate(!0),n.context.route.getNeedRenderComponent()._rv_ev_run(),n._updatedom()})}},{key:"$routeChange",value:function(e,t){var n=1<arguments.length&&void 0!==t?t:"main";g.default.createAndSendSimpleRvEvent(n+"_routeChange",e)}},{key:"$sendEvent",value:function(e){var t=e.name,n=e.value;g.default.createAndSendSimpleRvEvent(t,n)}},{key:"$onEvent",value:function(e,t){g.default.receiveRvEvent(e,function(e){t(e.detail)})}},{key:"_defineMethod",value:function(o){var r=this;o=o||this;var e=!0,t=!1,n=void 0;try{for(var i,a=Object.keys(this.methods)[Symbol.iterator]();!(e=(i=a.next()).done);e=!0)!function(){var n=i.value;r.methods[n]=r._cloneMethods[n].bind(o),g.default.receiveRvEvent(g.default.generateHashMNameByMName(r.name+"_"+r.componentUniqueTag+"_"+n),function(e,t){r.methods[n].call(o,t)}),g.default.receiveRvEvent(r.name+"_"+n,function(e,t){r.methods[n].call(o,t)})}()}catch(e){t=!0,n=e}finally{try{!e&&a.return&&a.return()}finally{if(t)throw n}}var u=!0,l=!1,s=void 0;try{for(var c,d=Object.keys(this.watchObj)[Symbol.iterator]();!(u=(c=d.next()).done);u=!0){var p=c.value;this.watchObj[p]=this._cloneWatchObj[p].bind(o)}}catch(e){l=!0,s=e}finally{try{!u&&d.return&&d.return()}finally{if(l)throw s}}var f=!0,h=!1,v=void 0;try{for(var m,y=Object.keys(this.data)[Symbol.iterator]();!(f=(m=y.next()).done);f=!0)!function(){var n=m.value;g.default.receiveRvEvent(g.default.generateHashMNameByMName(r.name+"_"+r.componentUniqueTag+"_"+n+"change"),function(e,t){r.data[n]=t})}()}catch(e){h=!0,v=e}finally{try{!f&&y.return&&y.return()}finally{if(h)throw v}}}},{key:"_clearMethods",value:function(){var e=!0,t=!1,n=void 0;try{for(var o,r=Object.keys(this.methods)[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var i=o.value;delete this.methods[i]}}catch(e){t=!0,n=e}finally{try{!e&&r.return&&r.return()}finally{if(t)throw n}}}},{key:"_parseHtmlTemplate",value:function(e){var t=0<arguments.length&&void 0!==e&&e;this.isParsedHtml&&!t||(this.parse.parseHtmlTemplate(this.template.trim()),this.isParsedHtml=!0)}},{key:"_getDomTree",value:function(){return this.parse.getHtmlDom()}},{key:"_getComponentContainer",value:function(){return this.parse.mComponentContainer}},{key:"_render",value:function(){var r=this;return this._parseHtmlTemplate(),this._applyRealDataVdom(),this._yrvElement=this.rvDomUtil.getYrvElement(this._rdom,function(e,t,n,o){r._hookRender(e,t,n,o)}),this.w=this._yrvElement.render(this._getComponentContainer()),this._isRender=!0,this.w}},{key:"_applyRealDataVdom",value:function(){var o=this;this._getComponentContainer().forEach(function(n){Object.keys(n.component.props).forEach(function(e){var t=n.prop[e];g.default.isPlaceHolder(t)&&(t=o.data[g.default.getPlaceHolderValue(t)]),n.component.props[e]=t}),n.component._rv_ev_domChange()}),this._applyTruthFulData()}},{key:"h",value:function(e,t,n){return new c.default(e,t,n)}},{key:"_diff",value:function(e,t){return this.yrvDiff.setComponentContainer(this._getComponentContainer()),this.yrvDiff.goDiff(e,t),this.yrvDiff.patches}},{key:"_patch",value:function(e,t){this.yrvPatch.setComponentContainer(this._getComponentContainer()),this.yrvPatch.apply(e,t)}},{key:"_updatedom",value:function(){var e,t,r=this;!this._isUpdate&&this._isRender&&(this._isUpdate=!0,this._applyRealDataVdom(),e=this.rvDomUtil.getYrvElement(this._rdom,function(e,t,n,o){r._hookRender(e,t,n,o)}),t=this._diff(this._yrvElement,e),this._patch(this.w,t),this._yrvElement=e,this._yrvElement._calcCount(this._getComponentContainer()),this._isUpdate=!1)}},{key:"_hookRender",value:function(){}},{key:"_applyTruthFulData",value:function(){this._rdom=this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom}},{key:"_rv_ev_run",value:function(){this.componentRun&&!this._isRun&&(void 0!==this.context.route&&this._registerEvent(),this.componentRun.call(this),this._isRun=!0),this.parse.componentMap.forEachKV(function(e,t){t.forEach(function(e){e._isRun||e._rv_ev_run()})}),this._getComponentContainer().forEach(function(e){e.component._isRun||e.component._rv_ev_run()}),void 0!==this.context.route&&this.context.route.getRoutes().forEach(function(e){void 0!==e.component.context.route&&e.component._registerEvent()})}},{key:"_rv_ev_init_props",value:function(){this.componentInit&&!this._initInfo&&(this.componentInit.call(this),this._initInfo=!0)}},{key:"_rv_ev_domChange",value:function(){this._rv_ev_init_props(),this.componentDomChange&&this.componentDomChange.call(this,this.paramObj)}},{key:"_rv_ev_mount",value:function(){this.mountLife&&this.mountLife.call(this),this.parse.componentMap.forEachKV(function(e,t){t.forEach(function(e){e._rv_ev_mount()})})}},{key:"getName",value:function(){return this.name}},{key:"_getDom",value:function(){return this._rdom}},{key:"_getProp",value:function(){return this.props}},{key:"_cloneData",value:function(){return g.default.clone(this.data)}},{key:"_cloneNew",value:function(e){var t=g.default.deepinCloneObj(this);""!==e&&(t.componentkey=e),t.componentUniqueTag=t.name+"_"+t.componentkey+"_rv_"+String(+new Date).slice(-2)+(Math.round(90*Math.random())+10),t.context={componentName:t.name,componentData:t.data,componentUniqueTag:t.componentUniqueTag,route:this.context.route},t.parse.updateContext(t.context),t.rvDomUtil.updateContext(t.context),t._defineMethod(t);var n=t.componentUniqueTag+"_dataChange";return g.default.observeComponent(t,function(){g.default.createAndSendSimpleRvEvent(n)}),g.default.receiveRvEvent(n,function(){t._updatedom()}),t}}]),h);function h(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,h);var n=e.template,o=e.style,r=e.props,i=e.name,a=e.data,u=e.methods,l=e.watch,s=e.onRun,c=e.onDomChange,d=e.onMount,p=e.onInit;this.isMainRvComponent=t,this.template=n,this.name=i,this.isMainRvComponent&&(this.name="main"),this.isParsedHtml=!1,this.style=o,this._rdom={},this.props=r,this.data=a,this.methods=u,this.componentRun=s,this.componentDomChange=c,this.componentInit=p,this.mountLife=d,this.watchObj=l,this._cloneMethods=g.default.cloneObj(u),this._cloneWatchObj=g.default.cloneObj(l),this.paramObj={},this.belongComponent="main",this.componentkey=i,this._initInfo=!1,this.componentUniqueTag=this.name,this._isRender=!1,this._isUpdate=!1,this._isRun=!1,g.default.addStyle2Head(this.style,this.name),this._init()}t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var m=i(n(0)),a=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}var u=(o(l,[{key:"updateContext",value:function(e){this.context=e}},{key:"getYrvElement",value:function(e,t){var n=this,o=[];for(var r in e.children){var i=e.children[r];i instanceof Array?i.forEach(function(e){o.push(n.getYrvElement(e,t))}):i instanceof Object?o.push(this.getYrvElement(i,t)):o.push(i)}return new a.default(e.tag,e.props,o,e.belong,e.componentUniqueTag,e.uniqueTag,e.isComponent,t)}},{key:"applyTruthfulData",value:function(n){var o=this;if("for"in n.props){var e=[],r=void 0;if(!m.default.isForIn(n.props.for))throw new Error("the for directive use error");if("childDomDatakey"in n)e=n.data,r=n.childDomDatakey;else if("domDataKey"in n){if(n.props.for.split(" _in_ ")[1]!==n.domDataKey)throw new Error("domData key error");e=n.data,r=n.props.for.split(" _in_ ")[0]}else{var t=n.props.for.split(" _in_ ")[1];if(m.default.isDotOperatorExpression(t)){var i=t.split(".")[0],a=t.split(".")[1];if(!(i in this.context.componentData))throw new Error("the for directive use error,the Dot Operator Express only in global context data");e=this.context.componentData[i][a]}else e=this.context.componentData[t];r=n.props.for.split(" _in_ ")[0]}var u=[];if(!e)throw new Error("the for directive only use in Array data");return e.forEach(function(e){var t=o.vdom2rdom(n,e,r);t.props.hasOwnProperty("for")&&delete t.props.for,t.props.hasOwnProperty("domData")&&delete t.props.domData,u.push(t)}),{isFor:!0,rdom:u}}var l=void 0,s=void 0,s="data"in n?(l=n.data,n.childDomDatakey):void(l=this.context.componentData);return{isFor:!1,rdom:this.vdom2rdom(n,l,s)}}},{key:"vdom2rdom",value:function(e,t,n){this.index+=1;var o={};o.tag=e.tag,o.children=[],o.props={},o.belong=e.belong,o.componentUniqueTag=e.componentUniqueTag,o.uniqueTag=e.uniqueTag,o.isComponent=e.isComponent;var r,i,a,u,l=Object.keys(e.props);for(var s in l){var c,d,p,f,h=l[s];"style"===h?-1<(c=e.props[h]).indexOf(";")?(d=c.split(";"),o.props[h]=this.handleArrayStyle(t,d,n)):o.props[h]=this.handleSingleStyle(t,c,n):m.default.isPlaceHolder(e.props[h])?(f=m.default.getPlaceHolderValue(e.props[h]),m.default.isDotOperatorExpression(f)?(p=f.split(".")[0],f=f.split(".")[1],p in this.context.componentData?o.props[h]=this.context.componentData[p][f]:o.props[h]=t[f]):o.props[h]=t[f]):m.default.isOperatorExpression(e.props[h])?o.props[h]=m.default.getOperatorExpression(e.props[h],t,n,this.context):o.props[h]=e.props[h]}for(var v in e.children)m.default.isString(e.children[v])?m.default.isPlaceHolder(e.children[v])?(r=m.default.getPlaceHolderValue(e.children[v]),m.default.isDotOperatorExpression(r)?(i=r.split(".")[0],a=r.split(".")[1],i in this.context.componentData?o.children[v]=m.default.getNotUndefinedContent(this.context.componentData[i][a]):o.children[v]=m.default.getNotUndefinedContent(t[a])):o.children[v]=m.default.getNotUndefinedContent(t[r])):m.default.isOperatorExpression(e.children[v])?o.children[v]=m.default.getNotUndefinedContent(m.default.getOperatorExpression(e.children[v],t,n,this.context)):o.children[v]=m.default.getNotUndefinedContent(e.children[v]):(e.children[v]instanceof Object&&("childDomData"in e.props?("$this"==e.props.childDomData||(e.children[v].childDomDatakey=e.props.childDomData),e.children[v].data=t):"domData"in e.props&&("nofor"in e.children[v].props||(e.children[v].domDataKey=e.props.domData),e.children[v].data=t)),(u=this.applyTruthfulData(e.children[v])).isFor?u.rdom.forEach(function(e){o.children.push(e)}):o.children[v]=u.rdom);return o}},{key:"handleSingleStyle",value:function(e,t,n){var o,r,i,a;return n?m.default.isPlaceHolder(t)?-1!=m.default.getPlaceHolderValue(t).indexOf(n)?e[m.default.getPlaceHolderValue(t).split(".")[1]]:(o=t.split(":")[0],r=t.split(":")[1],o+":"+(r=e[m.default.getPlaceHolderValue(r)])):t:(i=t.split(":")[0],a=t.split(":")[1],m.default.isPlaceHolder(a)?i+":"+(a=e[m.default.getPlaceHolderValue(a)]):t)}},{key:"handleArrayStyle",value:function(e,t,n){var o="",r=!0,i=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var s=u.value;o+=this.handleSingleStyle(e,s,n)+";"}}catch(e){i=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw a}}return o}}]),l);function l(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),this.context={},this.index=0,this.indexArrayOp=[]}t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=a(n(1)),u=a(n(0));function a(e){return e&&e.__esModule?e:{default:e}}var l=(o(s,[{key:"useCustomComponent",value:function(t){var e,n;this.componentMap.hasKey(t.getName())?-1===(e=this.componentMap.get(t.getName())).findIndex(function(e){return e.componentkey===t.componentkey})&&e.push(t):((n=[]).push(t),this.componentMap.put(t.getName(),n))}},{key:"updateContext",value:function(e){this.context=e}},{key:"parseHtmlTemplate",value:function(e){new Date;for(var t=0;e;){var n,o=e.indexOf("<"),r=e.indexOf(">")||e.indexOf("/>"),i=e.indexOf("</"),a=e.indexOf(">"),u=e.indexOf("\x3c!--"),l=e.indexOf("--\x3e");0==u&&-1!=l&&u<l?(t=l+3,e.substring(u+4,l+3),e=e.substring(t)):-1!=i&&-1!=a&&i<a?(t=a+1,s(e.substring(i,a+1),this),e=e.substring(t)):-1!=o&&-1!=r&&o<r&&(t=r+1,n="",-1<e.indexOf("<",t)&&e.indexOf("<",t)>r&&(n=e.substring(t,e.indexOf("<",t)).trim()),function(e,t,n){var o=-1!=e.indexOf(" ")?e.indexOf(" "):-1==e.indexOf("/>")?e.indexOf(">"):e.indexOf("/>"),r=e.substring(e.indexOf("<")+1,o),i={};if(-1<e.indexOf(" ")){var a=e.substring(e.indexOf(" ")+1,-1==e.indexOf("/>")?e.indexOf(">"):e.indexOf("/>"));if(a&&0<a.length)for(var u=a.match(n.mPropRe),l=0;l<u.length;l++){var s=u[l];i[s.split("=")[0]]=/\".*?\"/.test(s.split("=")[1])?s.split("=")[1].slice(1,-1):s.split("=")[1]}}n.mHandler&&(/\".*?\"/.test(t)&&(t=t.slice(1,-1)),n.mHandler.startELement(r,i,t,n))}(e.substring(o,r+1),n,this),"/>"===e.substring(r-1,r+1)&&s(e.substring(o,r+1),this),e=e.substring(t))}function s(e,t){t.mHandler&&t.mHandler.endElement(t)}new Date}},{key:"getHtmlDom",value:function(){return this.mMap.get(1)}}]),s);function s(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),this.mIndex=0,this.context=e,this.componentMap=new i.default(this.context.componentName+"YhmParseComponentMap"),this.mMap=new i.default(this.context.componentName+"HtmlDomAndComponentMap"),this.mComponentContainer=[],this.mPropRe=/([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,this.mHandler={startELement:function(e,n,t,o){var r,i,a;o.mIndex+=1,o.componentMap.hasKey(e)||"routerview"===e?((r=void 0)!==o.context.route&&"routerview"===e?((r=o.context.route.getNeedRenderComponent()).paramObj=o.context.route.getNeedRenderComponentParam(),e=r.name):r=n.key?o.componentMap.get(e).filter(function(e){return e.componentkey===n.key})[0]:o.componentMap.get(e)[0],Object.keys(n).forEach(function(t){u.default.isRvEventProp(t)&&(r.methods[t.slice(2)]=function(e){u.default.createAndSendSimpleRvEvent(u.default.generateHashMNameByMName(o.context.componentName+"_"+o.context.componentUniqueTag+"_"+n[t]),e)})}),r._parseHtmlTemplate(),r._applyTruthFulData(),r._belong(o.context.componentName),n.slot&&(r.props.slot=n.slot),o.mMap.put(o.mIndex,{tag:e,props:n,children:[],index:o.mIndex,content:t,isClose:!1,belong:o.context.componentName,componentUniqueTag:o.context.componentUniqueTag,uniqueTag:r.componentUniqueTag,isComponent:!0}),-1===(i=o.mComponentContainer.findIndex(function(e){return e.componentUniqueTag===r.componentUniqueTag}))?o.mComponentContainer.push({name:r.name,componentUniqueTag:r.componentUniqueTag,component:r,prop:n,content:t}):o.mComponentContainer[i]={name:r.name,componentUniqueTag:r.componentUniqueTag,component:r,prop:n,content:t}):(a={tag:e,props:n,children:[],index:o.mIndex,content:t,isClose:!1,belong:o.context.componentName,componentUniqueTag:o.context.componentUniqueTag,uniqueTag:e,isComponent:!1},0<t.length&&a.children.push(t.trim()),o.mMap.put(o.mIndex,a))},endElement:function(e){e.mMap.get(e.mIndex).isClose=!0;var t=e.mMap.get(e.mIndex-1),n=e.mMap.get(e.mIndex);e.mMap.hasKey(e.mIndex-1)&&(t.children.push(n),t.props.hasOwnProperty("key")||(t.props.key="yrv_auto_key_"+u.default.getHashCode(t.tag+"_"+JSON.stringify(t.children)+"_"+t.props+"_"+(e.mIndex-1))),e.mMap.remove(e.mIndex)),--e.mIndex}}}t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i,a=n(0),u=(i=a)&&i.__esModule?i:{default:i};var l=(o(s,[{key:"setComponentContainer",value:function(e){this.componentContainer=e}},{key:"apply",value:function(e,t){this.node=e,this.patches=t,this.walker={index:0},this.dfsWalk(this.node,this.walker,this.patches)}},{key:"dfsWalk",value:function(e,t,n){for(var o=n[t.index],r=e.childNodes?e.childNodes.length:0,i=0;i<r;i++){var a=e.childNodes[i];t.index++,this.dfsWalk(a,t,n)}o&&this.applyPatches(e,o)}},{key:"applyPatches",value:function(n,e){var o=this;e.forEach(function(e){switch(e.type){case u.default.NODE_REPLACE:var t=u.default.isString(e.node)?document.createTextNode(e.node):e.node.render(o.componentContainer);n.parentNode.replaceChild(t,n);break;case u.default.CHILD_RE_ORDER:o.reorderChildren(n,e.moves);break;case u.default.NODE_PROPS:o.setProps(n,e.props);break;case u.default.NODE_CONTENT:n.textContent?n.textContent=e.content:n.nodeValue=e.content}})}},{key:"reorderChildren",value:function(o,e){var r=this,i=u.default.toArray(o.childNodes),a={};i.forEach(function(e){var t;1!==e.nodeType||(t=e.getAttribute("key"))&&(a[t]=e)}),e.forEach(function(e){var t,n=e.index;0===e.type?(i[n]===o.childNodes[n]&&o.removeChild(o.childNodes[n]),i.splice(n,1)):1===e.type&&(t=a[e.item.key]?a(e.item.key).cloneNode(!0):u.default.isString(e.item)?document.createTextNode(e.item):e.item.render(r.componentContainer),i.splice(n,0,t),o.insertBefore(t,o.childNodes[n]||null))})}},{key:"setProps",value:function(e,t){if(e)for(var n in t){var o;void 0===t[n]?e.removeAttribute(n):(o=t[n],u.default.isString(o)&&u.default.setAttr(e,n,o))}}}]),s);function s(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),this.context=e}t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=i(n(10)),d=i(n(0));function i(e){return e&&e.__esModule?e:{default:e}}var a=(o(u,[{key:"goDiff",value:function(e,t){this.index=0,this.oldYrvElement=e,this.newYrvElement=t,this.patches={},this.dfsWalk(this.oldYrvElement,this.newYrvElement,this.index)}},{key:"getPatches",value:function(){return this.patches}},{key:"setComponentContainer",value:function(e){this.componentContainer=e}},{key:"dfsWalk",value:function(e,t,n){this.tempIndex=n;var o,r,i,a=[];null==t||(d.default.isString(e)&&d.default.isString(t)?e!=t&&a.push({type:d.default.NODE_CONTENT,content:t}):e.tag===t.tag&&e.key==t.key?((o=this.diffProps(e,t))&&a.push({type:d.default.NODE_PROPS,props:o}),d.default.isIgnoreChildren(t)||d.default.isIgnoreChildren(e)||(r=e.children,i=t.children,this.diffChildren(r,i,n,a))):a.push({type:d.default.NODE_REPLACE,node:t})),a.length&&(this.patches[n]=a)}},{key:"diffProps",value:function(e,t){if(e.isComponent&&t.isComponent)return null;var n=e.props,o=t.props,r={},i=!0;for(var a in n)o[a]!==n[a]&&(i=!1,r[a]=o[a]);for(var u in o)n.hasOwnProperty(u)||(i=!1,r[u]=o[u]);return i?null:r}},{key:"diffChildren",value:function(e,o,t,n){var r=this,i=new c.default(e,o);i.goDiff();var a,u=i.getResult();o=u.child,u.moves.length&&(a={type:d.default.CHILD_RE_ORDER,moves:u.moves},n.push(a));var l=null,s=t;e.forEach(function(e,t){var n=o[t];s=l&&l.count?s+l.count+1:s+1,r.dfsWalk(e,n,s),l=e})}}]),u);function u(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),this.context=e}t.default=a},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=(function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}(i,[{key:"goDiff",value:function(){for(var e=0;e<this.oldList.length;e++){var t=this.oldList[e],n=this.getKey(t);this.newListKeyIndex.hasOwnProperty(n)?this.childList.push(this.newList[this.newListKeyIndex[n]]):this.childList.push(null)}this.tempList=this.childList.concat();for(var o=0;o<this.tempList.length;)null===this.tempList[o]?(this.removeOperator(o),this.removeCopyTempList(o)):o++;for(var r=0,i=0;i<this.newList.length;i++){var a=this.newList[i],u=this.getKey(a),l=this.tempList[r],s=this.getKey(l);l?u!=s?this.oldListKeyIndex.hasOwnProperty(u)&&u===getKey(this.tempList[r+1])?(this.removeOperator(i),this.removeCopyTempList(r),r++):this.insertOperator(i,a):r++:this.insertOperator(i,a)}for(var c=this.tempList.length-r;r++<this.tempList.length;)c--,this.removeOperator(c+this.newList.length)}},{key:"makeListKeyIndex",value:function(e){for(var t={},n=0;n<e.length;n++){var o=e[n];t[this.getKey(o)]=n}return t}},{key:"getKey",value:function(e){if(e)return e.key}},{key:"removeCopyTempList",value:function(e){this.tempList.splice(e,1)}},{key:"removeOperator",value:function(e){this.moveOperator.push({index:e,type:0})}},{key:"insertOperator",value:function(e,t){this.moveOperator.push({index:e,item:t,type:1})}},{key:"getResult",value:function(){return{moves:this.moveOperator,child:this.childList}}}]),i);function i(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),this.oldList=e,this.newList=t,this.oldListKeyIndex=this.makeListKeyIndex(this.oldList),this.newListKeyIndex=this.makeListKeyIndex(this.newList),this.moveOperator=[],this.childList=[],this.tempList=[]}t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i,a=n(1),u=(i=a)&&i.__esModule?i:{default:i};var l=(o(s,[{key:"register",value:function(e){var t=this;e.forEach(function(e){e.component=e.component.this._cloneNew(""),t.routers.put(e.path,e)});var n=this.routers.filterV(function(e,t){return t.ismain&&!0===t.ismain});if(!n)throw new Error("register route ,but the main component not declaranted");this.go({path:n.path,paramObj:n.param})}},{key:"getRoutes",value:function(){return this.routers}},{key:"go",value:function(e){var t=e.path,n=e.paramObj;if(!this.routers.hasKey(t))throw new Error("the route path unexisted ,please first declaration in route config");this.needRenderpath=t,n&&(this.routers.get(this.needRenderpath).param=n),this.routers.get(this.needRenderpath).component._rv_ev_mount()}},{key:"getNeedRenderComponent",value:function(){return this.routers.get(this.needRenderpath).component}},{key:"getNeedRenderComponentParam",value:function(){return this.routers.get(this.needRenderpath).param}}]),s);function s(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),this.needRenderpath="",this.routeName=e,this.routers=new u.default("RvRouteMap")}t.default=l}]);