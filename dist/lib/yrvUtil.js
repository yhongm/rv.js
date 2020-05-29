"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvObservable = _interopRequireDefault(require("./yrvObservable"));

var _yrvMap = _interopRequireDefault(require("./yrvMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author
 * the YruUtil is a common function set
 */
var YrvUtil = /*#__PURE__*/function () {
  function YrvUtil() {
    _classCallCheck(this, YrvUtil);
  }

  _createClass(YrvUtil, null, [{
    key: "isString",
    value: function isString(some) {
      return typeof some === 'string';
    }
  }, {
    key: "toArray",
    value: function toArray(list) {
      if (!list) {
        return [];
      }

      var array = [];

      for (var i = 0; i < list.length; i++) {
        array.push(list[i]);
      }

      return array;
    }
  }, {
    key: "checkHaveSameValueFromArray",
    value: function checkHaveSameValueFromArray(arr) {
      var isSame = false;

      for (var i = 0; i < arr.length; i++) {
        if (isSame === true) {
          break;
        }

        for (var j = arr.length - 1; j > i; j--) {
          if (arr[i] == arr[j]) {
            isSame = true;
            break;
          }
        }
      }

      return isSame;
    }
  }, {
    key: "isHtmlTag",
    value: function isHtmlTag(tag) {
      return "img,iframe,embed,object,param,video,audio,source,track,canvas,map,area,svg,math,datails,summary,menuitem,menu,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,table,caption,colgroup,col,tbody,thead,tfoot,tr,td,th,a,em,strong,small,s,cite,q,dfn,abbr,data,time,code,var,samp,kbd,sub,sup,i,b,u,mark,ruby,rt,bdi,bdo,span,br,wbr,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,body,section,nav,article,aside,h1,h2,h3,h4,h5,h6,header,footer,address,main,head,title,base,link,meta,style,script,noscript,template,ins,del,html,div".split(",").includes(tag);
    }
  }, {
    key: "loopGet",
    value: function loopGet(obj) {
      var _this = this;

      Object.keys(obj).forEach(function (key) {
        if (obj[key] instanceof Array) {
          obj[key].forEach(function (childObj) {
            _this.loopGet(childObj);
          });
        } else {
          obj[key]; //console.log("loopGet,obj[key]:"+obj[key])
        }
      });
    }
  }, {
    key: "isRvJsProp",
    value: function isRvJsProp(prop) {
      return ["domData", "childDomData", "for", "data"].includes(prop);
    }
  }, {
    key: "isRvEvent",
    value: function isRvEvent(direction) {
      return /^rv-\w*$/.test(direction);
    } // static defineRvInnerGlobalValue(key, value, isCanWrite) {
    //     if (!window.hasOwnProperty("_______js_yhongm_rv____")) {
    //         Object.defineProperty(window, "_______js_yhongm_rv____", {
    //             value: {}
    //         })
    //     }
    //     Object.defineProperty(window["_______js_yhongm_rv____"], key, {
    //         value: value,
    //         writable: isCanWrite
    //     })
    // }
    // static getRvInnerGlobalValue(key) {
    //     if (!key) {
    //         return undefined
    //     }
    //     return window["_______js_yhongm_rv____"][`${key}`]
    // }
    // static invokeGlobalFunName(name) {
    //     return `window._______js_yhongm_rv____.${name}`
    // }

  }, {
    key: "createAndSendSimpleRvEvent",
    value: function createAndSendSimpleRvEvent(rvEventName, objData) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent("rv_".concat(rvEventName, "_").concat(YrvUtil.getHashCode(rvEventName)), true, true, objData);
      document.dispatchEvent(event);
    }
  }, {
    key: "receiveRvEvent",
    value: function receiveRvEvent(rvEventName, callback) {
      document.addEventListener("rv_".concat(rvEventName, "_").concat(YrvUtil.getHashCode(rvEventName)), function (e) {
        callback(e, e.detail);
      });
    }
  }, {
    key: "addElementEventListener",
    value: function addElementEventListener(element, event, callback) {
      if (element instanceof HTMLElement) {
        element.addEventListener(event, callback);
      }
    }
    /**
     * generate hash method name by method name
     * by yhongm
     */

  }, {
    key: "generateHashMNameByMName",
    value: function generateHashMNameByMName(method) {
      return "".concat(YrvUtil.getMethodHashId(method), "_").concat(method);
    }
  }, {
    key: "getMethodHashId",
    value: function getMethodHashId(name) {
      return "_rv_".concat(YrvUtil.getHashCode(name));
    }
  }, {
    key: "getHashCode",
    value: function getHashCode(str) {
      // str = str.toLowerCase();
      var hash = 12345678;

      for (var i = str.length - 1; i >= 0; i--) {
        hash ^= (hash << 6) + str.charCodeAt(i) + (hash >> 3);
      }

      var resultHashCode = hash & 0xffffffff;
      return resultHashCode;
    }
  }, {
    key: "isForIn",
    value: function isForIn(direction) {
      return /^\w* _in_ [\w\.]*$/.test(direction);
    }
  }, {
    key: "isForForIn",
    value: function isForForIn(direction) {
      return /^\w* _in*$/.test(direction);
    }
  }, {
    key: "isForOrForFor",
    value: function isForOrForFor(direction) {
      return /^\w* _in_ \w|_in*$/.test(direction);
    }
  }, {
    key: "isIgnoreChildren",
    value: function isIgnoreChildren(node) {
      return node.props && node.props.hasOwnProperty("ignore");
    }
  }, {
    key: "isNumber",
    value: function isNumber(value) {
      if (value === undefined || value === null || value === '') {
        return false;
      }

      if (typeof value === 'string') {
        //positive int 
        var reNumber = /^\d+$/; //negative int 

        var reNeNumber = /^-\d+$/; //正实数

        var reRealNumber1 = /^[1-9]\d*[.]\d+$/; //非零开头

        var reRealNumber2 = /^0[.]\d+$/; //零开头
        //负实数

        var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/; //非零开头

        var reNeRealNumber2 = /^-0[.]\d+$/; //零开头

        if (reNumber.test(value) || reNeNumber.test(value) || reRealNumber1.test(value) || reRealNumber2.test(value) || reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
          return true;
        } else {
          return false;
        }
      } else if (typeof value === 'number') {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "addStyle2Head",
    value: function addStyle2Head(styleString, name) {
      var style = document.getElementsByTagName("style")[0];

      if (style) {
        //style tag exists
        try {
          style.appendChild(document.createTextNode(styleString));
        } catch (error) {
          console.error("component style,".concat(error));
          style.stylesheet.cssText = styleString;
        }
      } else {
        //style tag isn't exits
        style = document.createElement("style");
        style.type = 'text/css';
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
      }
    }
  }, {
    key: "setAttr",
    value: function setAttr(node, key, value) {
      switch (key) {
        case 'style':
          node.style.cssText = value;
          break;

        case 'value':
          var tagName = node.tagName || '';
          tagName = tagName.toLowerCase();

          if (tagName === 'input' || tagName === 'textarea') {
            node.value = value;
          } else {
            node.setAttribute(key, value);
          }

          break;

        default:
          node.setAttribute(key, value);
          break;
      }
    }
  }, {
    key: "isPlaceHolder",
    value: function isPlaceHolder(content) {
      if (content) {
        if (/^%#\w*.\w*#%$/.test(content)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }, {
    key: "isRvEventProp",
    value: function isRvEventProp(content) {
      if (content) {
        return content.startsWith("::");
      } else {
        return false;
      }
    }
  }, {
    key: "isDotOperatorExpression",
    value: function isDotOperatorExpression(content) {
      return /^\w*\.\w*$/.test(content);
    }
  }, {
    key: "getPlaceHolderValue",
    value: function getPlaceHolderValue(content) {
      return content.slice(2, -2);
    }
  }, {
    key: "getNotUndefinedContent",
    value: function getNotUndefinedContent(content) {
      return content === undefined ? "" : content;
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */

  }, {
    key: "isOperatorExpression",
    value: function isOperatorExpression(content) {
      if (YrvUtil.isString(content)) {
        if (/^\{\w*|\|\%+\}$/.test(content)) {
          return true;
        } else {
          return false;
        }
      }

      return false;
    }
  }, {
    key: "getOperatorExpression",
    value: function getOperatorExpression(content, data, dataKey, context) {
      if (YrvUtil.isString(content)) {
        var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"));
        var startIndex = expression.indexOf("%#");
        var endIndex = expression.indexOf("#%") + 2;

        if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
          var placeHolder = expression.slice(startIndex, endIndex);
          var placeHolderValue = YrvUtil.getPlaceHolderValue(placeHolder);
          var realValue;

          if (YrvUtil.isDotOperatorExpression(placeHolderValue)) {
            var placeHolderValueKey = placeHolderValue.split(".")[0];
            var placeHolderValueValue = placeHolderValue.split(".")[1];
            var placeHolderVValue = data[placeHolderValueValue];

            if (placeHolderValueKey in context.componentData) {
              placeHolderVValue = data[placeHolderValueKey][placeHolderValueValue];
            } else {
              if (placeHolderValueKey === dataKey && !dataKey) {
                placeHolderVValue = data[placeHolderValueValue];
              }
            }

            realValue = YrvUtil.isNumber(placeHolderVValue) ? placeHolderVValue : "\"".concat(placeHolderVValue, "\""); //get real value by PlaceHolder
          } else {
            realValue = data[YrvUtil.getPlaceHolderValue(placeHolder)]; //get real value by PlaceHolder 
          }

          expression = expression.replace(placeHolder, realValue);
        }

        return eval(expression);
      }
    }
  }, {
    key: "getObjType",
    value: function getObjType(obj) {
      if (obj === null) return "null";
      if (obj === undefined) return "undefined";
      return Object.prototype.toString.call(obj).slice(8, -1);
    }
    /**
     * the method use to deep clone obj
     * @param {*} obj 
     */

  }, {
    key: "clone",
    value: function clone(obj) {
      var result,
          oClass = YrvUtil.getObjType(obj);

      if (oClass === "Object") {
        result = {};
      } else if (oClass === "Array") {
        result = [];
      } else {
        return obj;
      }

      for (var key in obj) {
        var copy = obj[key];

        if (YrvUtil.getObjType(copy) == "Object") {
          result[key] = YrvUtil.clone(copy);
        } else if (YrvUtil.getObjType(copy) == "Array") {
          result[key] = YrvUtil.clone(copy);
        } else {
          result[key] = copy;
        }
      }

      return result;
    }
  }, {
    key: "cloneObj",
    value: function cloneObj(origin) {
      var originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }
  }, {
    key: "cloneObj2",
    value: function cloneObj2(obj) {
      return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    }
  }, {
    key: "typeObjOrArray",
    value: function typeObjOrArray(obj) {
      var oClass = Object.prototype.toString.call(obj).slice(8, -1);
      return oClass == "Object" || oClass == "Array";
    }
  }, {
    key: "deepinCloneObj",
    value: function deepinCloneObj(obj) {
      if (obj) {
        var getType = function getType(obj) {
          var oClass = Object.prototype.toString.call(obj).slice(8, -1);

          if (oClass == "Object") {
            return "obj";
          } else if (oClass == "Array") {
            return "arr";
          } else {
            return oClass;
          }
        };

        var newObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        Object.keys(obj).forEach(function (key) {
          if (getType(obj[key]) == "obj") {
            if (key === "componentMap") {
              var newComponentMap = new _yrvMap["default"](obj[key].name + "_clone");
              obj[key].forEachKV(function (name, componentQueue) {
                var newComponentQueue = [];
                componentQueue.forEach(function (component) {
                  var newComponent = component._cloneNew(component.componentkey);

                  newComponent.componentUniqueTag = component.componentUniqueTag + "_c";
                  newComponentQueue.push(newComponent); // component._clearMethods()
                });
                newComponentMap.put(name, newComponentQueue);
              });
              newObj[key] = newComponentMap;
            } else {
              newObj[key] = YrvUtil.deepinCloneObj(obj[key]);
            }
          } else if (getType(obj[key]) == "arr") {
            newObj[key] = YrvUtil.deepinCloneObj(obj[key]);
          } else {
            newObj[key] = obj[key];
          }
        });
        return newObj;
      }
    }
  }, {
    key: "observe",
    value: function observe(obj, observeMap, callback) {
      Object.keys(obj).forEach(function (key) {
        var internalValue = obj[key];
        var observable = new _yrvObservable["default"](); // if (internalValue instanceof Object) {
        //     YrvUtil.observe(internalValue, observeMap, callback)
        // }
        // if (!observeMap.hasKey(key)) {

        observeMap.put(key, observable); // }

        if (!observable.has(callback)) {
          observable.add(callback);
        }

        Object.defineProperty(obj, key, {
          get: function get() {
            // if (!observable.has(callback)) {
            //     observable.add(callback)
            // }
            return internalValue;
          },
          set: function set(newVal) {
            var changed = false;

            if (YrvUtil.typeObjOrArray(newVal)) {
              changed = YrvUtil.getHashCode(JSON.stringify(internalValue)) !== YrvUtil.getHashCode(JSON.stringify(newVal));
            } else {
              changed = internalValue !== newVal; // console.log("internalValue:"+internalValue+",newVal:"+newVal)
            }

            if (changed) {
              // console.log(`${key} ,changed:,newVal:${JSON.stringify(newVal)},internalValue:${internalValue}`)
              internalValue = newVal;
              observable.invoke();
            }
          }
        });
      });
    }
  }, {
    key: "observeComponent",
    value: function observeComponent(component, callback) {
      if (component.data) {
        YrvUtil.observe(component.data, component.observeMap, callback);
      }

      if (component.watchObj) {
        Object.keys(component.watchObj).forEach(function (watchFun) {
          if (component.observeMap.hasKey(watchFun)) {
            component.observeMap.get(watchFun).add(function () {
              component.watchObj[watchFun]();
            });
          }
        });
      }
    }
  }]);

  return YrvUtil;
}();

YrvUtil.NODE_REPLACE = 0; //node replace 

YrvUtil.CHILD_RE_ORDER = 1; //child node re order

YrvUtil.NODE_PROPS = 2; //prop change 

YrvUtil.NODE_CONTENT = 3; //content change

var _default = YrvUtil;
exports["default"] = _default;