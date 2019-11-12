/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo.js":
/*!*****************!*\
  !*** ./demo.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rv = __webpack_require__(/*! ./src/rv.js */ "./src/rv.js");

var _rv2 = _interopRequireDefault(_rv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import RV from './src/rv/main'
var rv = void 0;

window.clickDiv = function () {
    rv.data.parent = "click Div time:" + new Date() / 1000; //data变化，视图自动更新
};

window.clickP1 = function () {
    rv.data.child = "click p1 time:" + new Date() / 1000; //data变化,视图自动更新
};

window.clickP2 = function () {
    rv.data.child2 = "click p2 time:" + new Date() / 1000; //data变化,视图自动更新
};
var myData = {
    parent: "parent",
    child: "child",
    pcolor: "red",
    c1color: "blue",
    c2color: "green",
    child2: "child2",
    week: [{
        id: 11,
        content: "111"
    }, {
        id: 22,
        content: "222"
    }, {
        id: 33,
        content: "333"
    }]
};
window.data = myData;
window.onload = function () {
    this.console.log("onload");
    rv = new _rv2.default( //创建对象
    {
        el: "#app",
        //el对象挂载的节点s
        data: myData,
        template: "<div key=\"1\" style=\"color:%#pcolor#%,width:100px,height:100px\" onclick=\"clickDiv()\">\n                         \"%#parent#%\"\n                         <p key=\"2\" style=\"color:%#c1color#%,width:50px,height:50px\" onclick=\"clickP1()\">\n                             \"%#child#%\"\n                         </p>\n                         <p key=\"3\" style=\"color:%#c2color#%,width:50px,height:50px\" onclick=\"clickP2()\">\n                            \"%#child2#%\"\n                         </p>\n                         <div key=\"4\">\n                            <p key=\"{%#v.id#%+'_content'}\" childDomData=\"v\" for=\"v _in_ week\"  domData=\"week\">\"%#v.content#%\"</p>\n                         </div>\n                       </div>"
    });
    rv.watch("parent", function () {
        alert("parent,change");
    }); //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
    rv.watch("child", function () {
        alert("child,change");
    });
    rv.watch("child2", function () {
        alert("child2,change");
    });
};

/***/ }),

/***/ "./src/rv.js":
/*!*******************!*\
  !*** ./src/rv.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NODE_REPLACE = 0; //node replace 
var CHILD_RE_ORDER = 1; //child node re order
var NODE_PROPS = 2; //prop change 
var NODE_CONTENT = 3; //content change

var Element = function () {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    function Element(tag, props, children) {
        _classCallCheck(this, Element);

        if (!(this instanceof Element)) {
            return new Element(tagName, props, children);
        }
        this.tag = tag;
        this.props = props || {};
        this.children = children || [];
        this.key = props ? props.key : undefined;
        if (!this.key) {
            throw new Error(tag + ' ... html tag the key is undefined');
        }
        var count = 0;
        this.children.forEach(function (child) {
            if (child instanceof Element) {
                count += child.count;
            }
            count++;
        });
        this.count = count;
    }
    /**
     * the method use to virtual dom  rende to real dom
     */


    _createClass(Element, [{
        key: 'render',
        value: function render() {
            var el = document.createElement(this.tag);
            var props = this.props;
            for (var propName in props) {
                Util.setAttr(el, propName, props[propName]);
            }
            this.children.forEach(function (child) {
                var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
                el.appendChild(childEl);
            });
            return el;
        }
    }]);

    return Element;
}();

var Diff = function () {
    /**
     * dom tree diff algorithm object constructor
     * @param {*} oldTree the dom tree for before update 
     * @param {*} newTree the dom tree for after update
     */
    function Diff(oldTree, newTree) {
        _classCallCheck(this, Diff);

        this.index = 0;
        this.patches = {};
        this.dfsWalk(oldTree, newTree, this.index);
    }

    _createClass(Diff, [{
        key: 'dfsWalk',
        value: function dfsWalk(oldNode, newNode, index) {
            var currentPatch = [];
            if (newNode == null) {} else if (Util.isString(oldNode) && Util.isString(newNode)) {
                if (oldNode != newNode) {
                    currentPatch.push({
                        type: NODE_CONTENT,
                        content: newNode
                    });
                }
            } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
                var propsPatches = this.diffProps(oldNode, newNode);
                if (propsPatches) {
                    currentPatch.push({
                        type: NODE_PROPS,
                        props: propsPatches
                    });
                }
                if (!Util.isIgnoreChildren(newNode)) {
                    this.diffChildren(oldNode.children, newNode.children, index, currentPatch);
                }
            } else {
                currentPatch.push({
                    type: NODE_REPLACE,
                    node: newNode
                });
            }
            if (currentPatch.length) {
                this.patches[index] = currentPatch;
            }
        }
    }, {
        key: 'diffProps',
        value: function diffProps(oldNode, newNode) {

            var oldProps = oldNode.props;
            var newProps = newNode.props;

            var propsPatches = {};
            var isSame = true;
            for (var _key in oldProps) {
                if (newProps[_key] !== oldProps[_key]) {
                    isSame = false;
                    propsPatches[_key] = newProps[_key];
                }
            }
            for (var _key2 in newProps) {
                if (!oldProps.hasOwnProperty(_key2)) {
                    isSame = false;
                    propsPatches[_key2] = newProps[_key2];
                }
            }
            return isSame ? null : propsPatches;
        }
    }, {
        key: 'diffChildren',
        value: function diffChildren(oldChildren, newChildren, index, currentPatch) {
            var _this = this;

            var diffList = new DiffList(oldChildren, newChildren);
            var diffs = diffList.getResult();
            newChildren = diffs.child;
            if (diffs.moves.length) {
                var reorderPatch = {
                    type: CHILD_RE_ORDER,
                    moves: diffs.moves
                };
                currentPatch.push(reorderPatch);
            }
            var leftNode = null;
            var currentNodeIndex = index;
            oldChildren.forEach(function (child, i) {
                var newChild = newChildren[i];
                currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
                _this.dfsWalk(child, newChild, currentNodeIndex);
                leftNode = child;
            });
        }
    }]);

    return Diff;
}();

var Patch = function () {
    function Patch(node, patches) {
        _classCallCheck(this, Patch);

        var walker = {
            index: 0
        };
        this.dfsWalk(node, walker, patches);
    }

    _createClass(Patch, [{
        key: 'dfsWalk',
        value: function dfsWalk(node, walker, patches) {
            var currentPatches = patches[walker.index];
            var len = node.childNodes ? node.childNodes.length : 0;
            for (var i = 0; i < len; i++) {
                var child = node.childNodes[i];
                walker.index++;
                this.dfsWalk(child, walker, patches);
            }
            if (currentPatches) {
                this.applyPatches(node, currentPatches);
            }
        }
    }, {
        key: 'applyPatches',
        value: function applyPatches(node, currentPatche) {
            var _this2 = this;

            currentPatche.forEach(function (currentPatch) {
                switch (currentPatch.type) {
                    case NODE_REPLACE:
                        var newNode = Util.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                        node.parentNode.replaceChild(newNode, node);
                        break;
                    case CHILD_RE_ORDER:
                        _this2.reorderChildren(node, currentPatch.moves);
                        break;
                    case NODE_PROPS:
                        _this2.setProps(node, currentPatch.props);
                        break;
                    case NODE_CONTENT:
                        if (node.textContent) {
                            node.textContent = currentPatch.content;
                        } else {
                            node.nodeValue = currentPatch.content;
                        }
                        break;
                    default:
                        break;

                }
            });
        }
    }, {
        key: 'reorderChildren',
        value: function reorderChildren(node, moves) {
            var staticNodeList = Util.toArray(node.childNodes);
            var nodeMaps = {};
            staticNodeList.forEach(function (snode) {
                if (snode.nodeType === 1) {
                    var _key3 = snode.getAttribute('key');
                    if (_key3) {
                        nodeMaps[_key3] = snode;
                    }
                }
            });
            moves.forEach(function (move) {
                var index = move.index;
                if (move.type === 0) {
                    if (staticNodeList[index] === node.childNodes[index]) {
                        node.removeChild(node.childNodes[index]);
                    }
                    staticNodeList.splice(index, 1);
                } else if (move.type === 1) {
                    var insertNode = nodeMaps[move.item.key] ? nodeMaps(move.item.key).cloneNode(true) : Util.isString(move.item) ? document.createTextNode(move.item) : move.item.render();
                    staticNodeList.splice(index, 0, insertNode);
                    node.insertBefore(insertNode, node.childNodes[index] || null);
                }
            });
        }
    }, {
        key: 'setProps',
        value: function setProps(node, props) {
            for (var _key4 in props) {
                if (props[_key4] === undefined) {
                    node.removeAttribute(_key4);
                } else {
                    var value = props[_key4];
                    Util.setAttr(node, _key4, value);
                }
            }
        }
    }]);

    return Patch;
}();

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'isString',
        value: function isString(some) {
            return typeof some === 'string';
        }
    }, {
        key: 'toArray',
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
        key: 'isForIn',
        value: function isForIn(direction) {
            return (/^\w* _in_ \w*$/.test(direction)
            );
        }
    }, {
        key: 'isForForIn',
        value: function isForForIn(direction) {
            return (/^\w* _in*$/.test(direction)
            );
        }
    }, {
        key: 'isForOrForFor',
        value: function isForOrForFor(direction) {
            return (/^\w* _in_ \w|_in*$/.test(direction)
            );
        }
    }, {
        key: 'isIgnoreChildren',
        value: function isIgnoreChildren(node) {
            return node.props && node.props.hasOwnProperty("ignore");
        }
    }, {
        key: 'isNumber',
        value: function isNumber(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }

            if (typeof value === 'string') {
                //正整数
                var reNumber = /^\d+$/;
                //负整数
                var reNeNumber = /^-\d+$/;
                //正实数
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
        key: 'setAttr',
        value: function setAttr(node, key, value) {
            switch (key) {
                case 'style':
                    node.style.cssText = value;
                    break;
                case 'value':
                    var _tagName = node.tagName || '';
                    _tagName = _tagName.toLowerCase();
                    if (_tagName === 'input' || _tagName === 'textarea') {
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
        key: 'isPlaceHolder',
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
        key: 'isDotOperatorExpression',
        value: function isDotOperatorExpression(content) {
            return (/^\w*\.\w*$/.test(content)
            );
        }
    }, {
        key: 'getPlaceHolderValue',
        value: function getPlaceHolderValue(content) {
            return content.slice(2, -2);
        }
        /**
         * 是否为表达式
         * @param {String} content 
         */

    }, {
        key: 'isOperatorExpression',
        value: function isOperatorExpression(content) {

            if (Util.isString(content)) {
                if (/^\{\w*|\|\%+\}$/.test(content)) {

                    return true;
                } else {

                    return false;
                }
            }
            return false;
        }
    }, {
        key: 'getOperatorExpression',
        value: function getOperatorExpression(content, data, dataKey) {
            if (Util.isString(content)) {

                var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"));
                var startIndex = expression.indexOf("%#");
                var endIndex = expression.indexOf("#%") + 2;
                if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                    var placeHolder = expression.slice(startIndex, endIndex);
                    var realValue = void 0;
                    if (placeHolder.indexOf(".") > 0) {
                        if (Util.getPlaceHolderValue(placeHolder).split(".")[0] === dataKey) {
                            var placeHolderValue = data[Util.getPlaceHolderValue(placeHolder).split(".")[1]];
                            realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : '"' + placeHolderValue + '"'; //通过placeHolder取真实的值
                        }
                    } else {
                        realValue = data[Util.getPlaceHolderValue(placeHolder)]; //通过placeHolder取真实的值
                    }

                    expression = expression.replace(placeHolder, realValue);
                }
                return eval(expression);
            }
        }
    }]);

    return Util;
}();

var DiffList = function () {
    /**
     * diff list 
     * @param {*} oldList 
     * @param {*} newList 
     * @param {*} key 
     */
    function DiffList(oldList, newList) {
        _classCallCheck(this, DiffList);

        var oldListKeyIndex = this.makeKeyIndex(oldList).keyIndex;
        var newListKeyIndex = this.makeKeyIndex(newList).keyIndex;
        this.moveOperator = [];
        this.childList = [];
        for (var _i = 0; _i < oldList.length; _i++) {
            var oldItem = oldList[_i];
            var oItemKey = this.getKey(oldItem);
            if (!newListKeyIndex.hasOwnProperty(oItemKey)) {
                this.childList.push(null);
            } else {
                this.childList.push(newList[newListKeyIndex[oItemKey]]);
            }
        }
        this.tempList = this.childList.slice(0);
        var i = 0;
        while (i < this.tempList.length) {
            if (this.tempList[i] === null) {
                this.remove(i);
                this.removeCopyTempList(i);
            } else {
                i++;
            }
        }
        var index = 0;
        for (var _i2 = 0; _i2 < newList.length; _i2++) {
            var nItem = newList[_i2];
            var nItemKey = this.getKey(nItem);
            var cItem = this.tempList[index];
            var cItemKey = this.getKey(cItem);
            if (cItem) {
                if (nItemKey != cItemKey) {
                    if (oldListKeyIndex.hasOwnProperty(nItemKey)) {
                        var cNextItemKey = getKey(this.tempList[index + 1]);
                        if (nItemKey === cNextItemKey) {
                            this.remove(_i2);
                            this.removeCopyTempList(index);
                            index++;
                        } else {
                            this.insert(_i2, nItem);
                        }
                    } else {
                        this.insert(_i2, nItem);
                    }
                } else {
                    index++;
                }
            } else {
                this.insert(_i2, nItem);
            }
        }
        var k = this.tempList.length - index;
        while (index++ < this.tempList.length) {
            k--;
            this.remove(k + newList.length);
        }
    }

    _createClass(DiffList, [{
        key: 'makeKeyIndex',
        value: function makeKeyIndex(list) {
            var keyIndex = {};
            for (var _i3 = 0; _i3 < list.length; _i3++) {
                var item = list[_i3];
                var itemKey = this.getKey(item);
                keyIndex[itemKey] = _i3;
            }
            return {
                keyIndex: keyIndex
            };
        }
    }, {
        key: 'getKey',
        value: function getKey(item) {
            if (!item) {
                return undefined;
            }
            return item["key"];
        }
    }, {
        key: 'removeCopyTempList',
        value: function removeCopyTempList(index) {
            this.tempList.splice(index, 1);
        }
    }, {
        key: 'remove',
        value: function remove(index) {
            this.moveOperator.push({
                index: index,
                type: 0
            });
        }
    }, {
        key: 'insert',
        value: function insert(index, item) {
            this.moveOperator.push({
                index: index,
                item: item,
                type: 1
            });
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            return {
                moves: this.moveOperator,
                child: this.childList
            };
        }
    }]);

    return DiffList;
}();

function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(function (key) {
        var internalValue = obj[key];
        var observable = new Observable();
        console.log('observer,key:' + key + ' ,type :' + (typeof internalValue === 'undefined' ? 'undefined' : _typeof(internalValue)));
        if (internalValue instanceof Object) {
            observe(internalValue, observeMap, callback);
        }
        observeMap.put(key, observable);
        Object.defineProperty(obj, key, {
            get: function get() {
                observable.add(callback);
                return internalValue;
            },
            set: function set(newVal) {
                var changed = internalValue !== newVal;
                internalValue = newVal;
                if (changed) {
                    observable.invoke();
                }
            }
        });
    });
    return obj;
}

function Observable() {
    this.updateFunctions = new Set();
}
Observable.prototype.add = function (observableUpdate) {
    this.updateFunctions.add(observableUpdate);
};
Observable.prototype.invoke = function () {
    this.updateFunctions.forEach(function (fun) {
        return fun();
    });
};

/**
 * the method use to deep clone obj
 * @param {*} obj 
 */
function clone(obj) {
    var getType = function getType(o) {
        if (o === null) return "null";
        if (o === undefined) return "undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    };
    var result = void 0,
        oClass = getType(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (getType(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (getType(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

function h(tagName, props, children) {
    return new Element(tagName, props, children);
}

function diff(oldTree, newTree) {
    var d = new Diff(oldTree, newTree);
    return d.patches;
}

function patch(node, patches) {
    return new Patch(node, patches);
}

/**
     * the map object use to save likily (key,value) data
     */

var Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.length = 0;
        this.map = new Object();
    }

    _createClass(Map, [{
        key: 'put',
        value: function put(key, value) {
            if (!(key in this.map)) {
                this.length++;
            }
            this.map[key] = value;
        }
    }, {
        key: 'get',
        value: function get(key) {
            return key in this.map ? this.map[key] : null;
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            if (key in this.map) {
                delete this.map[key];
                this.length--;
            }
        }
    }, {
        key: 'hasKey',
        value: function hasKey(key) {
            return key in this.map;
        }
    }, {
        key: 'size',
        value: function size() {
            return this.length;
        }
    }, {
        key: 'clear',
        value: function clear() {
            length = 0;
            this.map = new Object();
        }
    }]);

    return Map;
}();
/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */


var YhmParse = function () {
    function YhmParse() {
        _classCallCheck(this, YhmParse);

        this.mIndex = 0;
        this.mMap = new Map();
        this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
        this.mHandler = {
            startELement: function startELement(tagName, prop, content, that) {
                that.mIndex += 1;
                var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false };

                if (content.length > 0) {

                    obj.children.push(content.trim());
                }
                that.mMap.put(that.mIndex, obj);
            },
            endElement: function endElement(that) {
                that.mMap.get(that.mIndex).isClose = true;
                if (that.mMap.hasKey(that.mIndex - 1)) {
                    that.mMap.get(that.mIndex - 1).children.push(that.mMap.get(that.mIndex));
                    that.mMap.remove(that.mIndex);
                }
                that.mIndex -= 1;
            }

        };
    }

    _createClass(YhmParse, [{
        key: 'parseHtmlTemplate',
        value: function parseHtmlTemplate(html) {
            var startTime = new Date() / 1000;
            var index = 0;
            while (html) {
                var startTagOpen = html.indexOf('<');
                var startTagClose = html.indexOf('>') || html.indexOf('/>');
                var endTagOpen = html.indexOf('</');
                var endTagClose = html.indexOf('>');
                var startCommentOpen = html.indexOf('<!--');
                var endCommentClose = html.indexOf('-->');
                if (startCommentOpen == 0 && endCommentClose != -1 && endCommentClose > startCommentOpen) {
                    index = endCommentClose + 3;
                    parseComment(html.substring(startCommentOpen + 4, endCommentClose + 3));
                    html = html.substring(index);
                    continue;
                } else if (endTagOpen != -1 && endTagClose != -1 && endTagClose > endTagOpen) {
                    index = endTagClose + 1;
                    _parseEndTag(html.substring(endTagOpen, endTagClose + 1), this);
                    html = html.substring(index);
                    continue;
                } else if (startTagOpen != -1 && startTagClose != -1 && startTagClose > startTagOpen) {
                    index = startTagClose + 1;
                    var content = "";
                    if (html.indexOf('<', index) > -1 && html.indexOf('<', index) > startTagClose) {
                        // let contentEndIndex = html.indexOf('</', (index + 1))
                        content = html.substring(index, html.indexOf('<', index)).trim();
                    }
                    _parseStartTag(html.substring(startTagOpen, startTagClose + 1), content, this);
                    html = html.substring(index);
                    continue;
                }
            }
            var endTime = new Date() / 1000;
            console.log('total parse time:' + (endTime - startTime));

            function _parseStartTag(html, content, that) {
                var startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>');
                var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex);
                var prop = {};
                if (html.indexOf(' ') > -1) {
                    var props = html.substring(html.indexOf(' ') + 1, html.indexOf('>'));

                    var propsResult = props.match(that.mPropRe);
                    for (var _i4 = 0; _i4 < propsResult.length; _i4++) {
                        var pr = propsResult[_i4];

                        prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)[0];
                    }
                }

                if (that.mHandler) {
                    if (/(?<=").*?(?=")/.test(content)) {
                        content = content.match(/(?<=").*?(?=")/)[0];
                    }
                    that.mHandler.startELement(tagName, prop, content, that);
                }
            }
            function _parseEndTag(html, that) {
                if (that.mHandler) {
                    that.mHandler.endElement(that);
                }
            }
            function parseComment(html) {
                // console.log(`parseComment=${html}`)
            }
        }
    }, {
        key: 'getHtmlDom',
        value: function getHtmlDom() {
            return this.mMap.get(1);
        }
    }]);

    return YhmParse;
}();

var RV = function () {
    function RV(option) {
        var _this3 = this;

        _classCallCheck(this, RV);

        var el = option.el,
            data = option.data,
            template = option.template;

        var parse = new YhmParse();
        parse.parseHtmlTemplate(template);

        var dom = parse.getHtmlDom();
        var root = Util.isString(el) ? document.querySelector(el) : el;
        this.data = data;
        this.ve = this.getVirtualElement(this.applyTruthfulData(dom));
        this.w = this.ve.render();
        root.appendChild(this.w);
        this.observeMap = new Map();
        observe(this.data, this.observeMap, function () {
            _this3.updatedom(dom);
        });
        this.updatedom(dom);
    }

    _createClass(RV, [{
        key: 'updatedom',
        value: function updatedom(dom) {
            var nve = this.getVirtualElement(this.applyTruthfulData(dom));
            window.nve = nve;
            window.ve = this.ve;
            patch(this.w, diff(this.ve, nve));
            this.ve = nve;
        }
    }, {
        key: 'watch',
        value: function watch(key, callback) {
            this.observeMap.get(key).add(callback);
        }
    }, {
        key: 'getVirtualElement',
        value: function getVirtualElement(dom) {
            var _this4 = this;

            var children = [];
            for (var child in dom.children) {
                var cc = dom.children[child];
                if (cc instanceof Array) {
                    cc.forEach(function (c) {
                        var v = _this4.getVirtualElement(c);
                        children.push(v);
                    });
                } else if (cc instanceof Object) {
                    var v = this.getVirtualElement(cc);
                    children.push(v);
                } else {
                    children.push(cc);
                }
            }

            return h(dom.tag, dom.props, children);
        }
    }, {
        key: 'applyTruthfulData',
        value: function applyTruthfulData(dom) {
            var _this5 = this;

            if ("for" in dom.props) {
                var dataArray = [];
                var dataSingle = void 0;

                if (Util.isForIn(dom.props['for'])) {
                    if ("childDomDatakey" in dom) {
                        dataArray = dom.data;
                        dataSingle = dom.childDomDatakey;
                    } else if ("domDataKey" in dom) {
                        if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                            dataArray = dom.data;
                        }
                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    } else {
                        dataArray = this.data[dom.props['for'].split(" _in_ ")[1]];

                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    }
                } else {
                    throw new Error("the for directive use error");
                }
                var objs = [];

                dataArray.forEach(function (data) {

                    var obj = _this5.vdom2rdom(dom, data, dataSingle, data);

                    objs.push(obj);
                });
                return objs;
            } else {

                var data = void 0;
                var childDomDatakey = void 0;
                if ("data" in dom) {
                    data = dom.data;
                    childDomDatakey = dom.childDomDatakey;
                } else {
                    data = this.data;
                    childDomDatakey = undefined;
                }

                var obj = this.vdom2rdom(dom, data, childDomDatakey, this.data);

                return obj;
            }
        }
        /**
         * virtual dom 2 real data dom
         * @param {*} dom 
         * @param {*} data 
         * @param {*} dataSingle 
         * @param {*} tdata 
         */

    }, {
        key: 'vdom2rdom',
        value: function vdom2rdom(dom, data, dataSingle, tdata) {
            var obj = {};
            obj.tag = dom.tag;
            obj.children = [];
            obj.props = {};
            var props = Object.keys(dom.props);
            for (var prop in props) {
                var value = props[prop];
                if (value === "style") {
                    var style = dom.props[value];

                    if (style.indexOf(",") > -1) {
                        var styles = style.split(",");
                        obj.props[value] = this.handleArrayStyle(data, styles, dataSingle);
                    } else {

                        obj.props[value] = this.handleSingleStyle(data, style, dataSingle);
                    }
                } else {
                    if (Util.isPlaceHolder(dom.props[value])) {
                        if (!Util.isDotOperatorExpression(Util.getPlaceHolderValue(dom.props[value]))) {
                            obj.props[value] = tdata[Util.getPlaceHolderValue(dom.props[value])];
                        } else {
                            obj.props[value] = data[Util.getPlaceHolderValue(dom.props[value]).split(".")[1]];
                        }
                    } else if (Util.isOperatorExpression(dom.props[value])) {

                        obj.props[value] = Util.getOperatorExpression(dom.props[value], data, dataSingle);
                    } else {
                        obj.props[value] = dom.props[value];
                    }
                }
            }

            for (var child in dom.children) {
                if (Util.isString(dom.children[child])) {
                    if (Util.isPlaceHolder(dom.children[child])) {
                        if (Util.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                            obj.children[child] = tdata[Util.getPlaceHolderValue(dom.children[child])];
                        } else {
                            obj.children[child] = data[Util.getPlaceHolderValue(dom.children[child]).split(".")[1]];
                        }
                    } else {
                        obj.children[child] = dom.children[child];
                    }
                } else {
                    if (dom.children[child] instanceof Object) {
                        if ("childDomData" in dom.props) {
                            dom.children[child].childDomDatakey = dom.props.childDomData;

                            dom.children[child].data = data;
                        } else if ("domData" in dom.props) {
                            dom.children[child].domDataKey = dom.props.domData;
                            dom.children[child].data = data[child];
                        }

                        dom.children[child].data = data;
                    }

                    obj.children[child] = this.applyTruthfulData(dom.children[child]);
                }
            }
            return obj;
        }
    }, {
        key: 'handleSingleStyle',
        value: function handleSingleStyle(data, style, dataSingle) {
            var newStyle = '';
            if (dataSingle) {
                if (Util.isPlaceHolder(style)) {
                    if (Util.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                        var _key5 = Util.getPlaceHolderValue(style).split(".")[1];
                        newStyle = data[_key5];
                    } else {
                        var styleKey = style.split(":")[0];
                        var styleValue = style.split(":")[1];
                        styleValue = data[Util.getPlaceHolderValue(styleValue)];
                        newStyle = styleKey + ":" + styleValue;
                    }
                } else {
                    newStyle = style;
                }
            } else {

                var _styleKey = style.split(":")[0];
                var _styleValue = style.split(":")[1];
                if (Util.isPlaceHolder(_styleValue)) {

                    _styleValue = data[Util.getPlaceHolderValue(_styleValue)];
                    newStyle = _styleKey + ":" + _styleValue;
                } else {
                    newStyle = style;
                }
            }
            return newStyle;
        }
    }, {
        key: 'handleArrayStyle',
        value: function handleArrayStyle(data, styles, dataSingle) {
            var newStyleArray = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = styles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var style = _step.value;


                    var newStyle = this.handleSingleStyle(data, style, dataSingle);
                    newStyleArray += newStyle + ";";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return newStyleArray;
        }
    }]);

    return RV;
}();

exports.default = RV;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsicnYiLCJ3aW5kb3ciLCJjbGlja0RpdiIsImRhdGEiLCJwYXJlbnQiLCJEYXRlIiwiY2xpY2tQMSIsImNoaWxkIiwiY2xpY2tQMiIsImNoaWxkMiIsIm15RGF0YSIsInBjb2xvciIsImMxY29sb3IiLCJjMmNvbG9yIiwid2VlayIsImlkIiwiY29udGVudCIsIm9ubG9hZCIsImNvbnNvbGUiLCJsb2ciLCJSViIsImVsIiwidGVtcGxhdGUiLCJ3YXRjaCIsImFsZXJ0IiwiTk9ERV9SRVBMQUNFIiwiQ0hJTERfUkVfT1JERVIiLCJOT0RFX1BST1BTIiwiTk9ERV9DT05URU5UIiwiRWxlbWVudCIsInRhZyIsInByb3BzIiwiY2hpbGRyZW4iLCJ0YWdOYW1lIiwia2V5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjb3VudCIsImZvckVhY2giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJpbmRleCIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInB1c2giLCJ0eXBlIiwicHJvcHNQYXRjaGVzIiwiZGlmZlByb3BzIiwiaXNJZ25vcmVDaGlsZHJlbiIsImRpZmZDaGlsZHJlbiIsIm5vZGUiLCJsZW5ndGgiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiaXNTYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvbGRDaGlsZHJlbiIsIm5ld0NoaWxkcmVuIiwiZGlmZkxpc3QiLCJEaWZmTGlzdCIsImRpZmZzIiwiZ2V0UmVzdWx0IiwibW92ZXMiLCJyZW9yZGVyUGF0Y2giLCJsZWZ0Tm9kZSIsImN1cnJlbnROb2RlSW5kZXgiLCJpIiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsImdldEF0dHJpYnV0ZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwidmFsdWUiLCJzb21lIiwibGlzdCIsImFycmF5IiwiZGlyZWN0aW9uIiwidGVzdCIsInJlTnVtYmVyIiwicmVOZU51bWJlciIsInJlUmVhbE51bWJlcjEiLCJyZVJlYWxOdW1iZXIyIiwicmVOZVJlYWxOdW1iZXIxIiwicmVOZVJlYWxOdW1iZXIyIiwic3R5bGUiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJzbGljZSIsImRhdGFLZXkiLCJleHByZXNzaW9uIiwiaW5kZXhPZiIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsInBsYWNlSG9sZGVyIiwicmVhbFZhbHVlIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsInNwbGl0IiwicGxhY2VIb2xkZXJWYWx1ZSIsImlzTnVtYmVyIiwicmVwbGFjZSIsImV2YWwiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJyZW1vdmUiLCJyZW1vdmVDb3B5VGVtcExpc3QiLCJuSXRlbSIsIm5JdGVtS2V5IiwiY0l0ZW0iLCJjSXRlbUtleSIsImNOZXh0SXRlbUtleSIsImluc2VydCIsImsiLCJpdGVtS2V5Iiwib2JzZXJ2ZSIsIm9iaiIsIm9ic2VydmVNYXAiLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImFkZCIsInNldCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJwcm90b3R5cGUiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsInRvU3RyaW5nIiwiY2FsbCIsInJlc3VsdCIsIm9DbGFzcyIsImNvcHkiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJoIiwiZGlmZiIsImQiLCJwYXRjaCIsIk1hcCIsIm1hcCIsIllobVBhcnNlIiwibUluZGV4IiwibU1hcCIsIm1Qcm9wUmUiLCJtSGFuZGxlciIsInN0YXJ0RUxlbWVudCIsInByb3AiLCJ0aGF0IiwiaXNDbG9zZSIsInRyaW0iLCJlbmRFbGVtZW50IiwiaGFzS2V5IiwiaHRtbCIsInN0YXJ0VGltZSIsInN0YXJ0VGFnT3BlbiIsInN0YXJ0VGFnQ2xvc2UiLCJlbmRUYWdPcGVuIiwiZW5kVGFnQ2xvc2UiLCJzdGFydENvbW1lbnRPcGVuIiwiZW5kQ29tbWVudENsb3NlIiwicGFyc2VDb21tZW50Iiwic3Vic3RyaW5nIiwiX3BhcnNlRW5kVGFnIiwiX3BhcnNlU3RhcnRUYWciLCJlbmRUaW1lIiwic3RhcnRUYWdFbmRJbmRleCIsInByb3BzUmVzdWx0IiwibWF0Y2giLCJwciIsIm9wdGlvbiIsInBhcnNlIiwicGFyc2VIdG1sVGVtcGxhdGUiLCJkb20iLCJnZXRIdG1sRG9tIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJ2ZSIsImdldFZpcnR1YWxFbGVtZW50IiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJ3IiwidXBkYXRlZG9tIiwibnZlIiwiY2MiLCJBcnJheSIsInYiLCJjIiwiZGF0YUFycmF5IiwiZGF0YVNpbmdsZSIsImlzRm9ySW4iLCJjaGlsZERvbURhdGFrZXkiLCJkb21EYXRhS2V5Iiwib2JqcyIsInZkb20ycmRvbSIsInRkYXRhIiwic3R5bGVzIiwiaGFuZGxlQXJyYXlTdHlsZSIsImhhbmRsZVNpbmdsZVN0eWxlIiwiaXNQbGFjZUhvbGRlciIsImlzRG90T3BlcmF0b3JFeHByZXNzaW9uIiwiaXNPcGVyYXRvckV4cHJlc3Npb24iLCJnZXRPcGVyYXRvckV4cHJlc3Npb24iLCJjaGlsZERvbURhdGEiLCJkb21EYXRhIiwibmV3U3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJuZXdTdHlsZUFycmF5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7OztBQUVBO0FBQ0EsSUFBSUEsV0FB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S3VDLEtBQUsyRixtQkFBTCxDQUF5Qm1JLFdBQXpCLENBQUwsQ0FBYjtBQUNBRiwrQkFBV0MsWUFBVyxHQUFYLEdBQWlCQyxXQUE1QjtBQUVILGlCQUxELE1BS087QUFDSEYsK0JBQVc3SSxLQUFYO0FBRUg7QUFDSjtBQUNELG1CQUFPNkksUUFBUDtBQUNIOzs7eUNBQ2dCblEsSSxFQUFNMFAsTSxFQUFRUCxVLEVBQVk7QUFDdkMsZ0JBQUltQixnQkFBZ0IsRUFBcEI7QUFEdUM7QUFBQTtBQUFBOztBQUFBO0FBRXZDLHFDQUFrQlosTUFBbEIsOEhBQTBCO0FBQUEsd0JBQWpCcEksS0FBaUI7OztBQUV0Qix3QkFBSTZJLFdBQVcsS0FBS1AsaUJBQUwsQ0FBdUI1UCxJQUF2QixFQUE2QnNILEtBQTdCLEVBQW9DNkgsVUFBcEMsQ0FBZjtBQUNBbUIscUNBQWlCSCxXQUFXLEdBQTVCO0FBQ0g7QUFOc0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPdkMsbUJBQU9HLGFBQVA7QUFFSDs7Ozs7O2tCQUtVclAsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8uanNcIik7XG4iLCJpbXBvcnQgUlYgZnJvbSAnLi9zcmMvcnYuanMnXHJcblxyXG4vLyBpbXBvcnQgUlYgZnJvbSAnLi9zcmMvcnYvbWFpbidcclxubGV0IHJ2XHJcblxyXG5cclxud2luZG93LmNsaWNrRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5wYXJlbnQgPSBgY2xpY2sgRGl2IHRpbWU6JHtuZXcgRGF0ZSgpIC8gMTAwMH1gIC8vZGF0YeWPmOWMlu+8jOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcblxyXG53aW5kb3cuY2xpY2tQMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJ2LmRhdGEuY2hpbGQgPSBgY2xpY2sgcDEgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyWLOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcblxyXG53aW5kb3cuY2xpY2tQMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJ2LmRhdGEuY2hpbGQyID0gYGNsaWNrIHAyIHRpbWU6JHtuZXcgRGF0ZSgpIC8gMTAwMH1gIC8vZGF0YeWPmOWMlizop4blm77oh6rliqjmm7TmlrBcclxufVxyXG5sZXQgbXlEYXRhID0ge1xyXG4gICAgcGFyZW50OiBcInBhcmVudFwiLFxyXG4gICAgY2hpbGQ6IFwiY2hpbGRcIixcclxuICAgIHBjb2xvcjogXCJyZWRcIixcclxuICAgIGMxY29sb3I6IFwiYmx1ZVwiLFxyXG4gICAgYzJjb2xvcjogXCJncmVlblwiLFxyXG4gICAgY2hpbGQyOiBcImNoaWxkMlwiLFxyXG4gICAgd2VlazogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDExLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjExMVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyMixcclxuICAgICAgICAgICAgY29udGVudDogXCIyMjJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMzMsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiMzMzXCJcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59XHJcbndpbmRvdy5kYXRhID0gbXlEYXRhXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKFwib25sb2FkXCIpXHJcbiAgICBydiA9IG5ldyBSViggLy/liJvlu7rlr7nosaFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsOiBcIiNhcHBcIixcclxuICAgICAgICAgICAgLy9lbOWvueixoeaMgui9veeahOiKgueCuXNcclxuICAgICAgICAgICAgZGF0YTogbXlEYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxkaXYga2V5PVwiMVwiIHN0eWxlPVwiY29sb3I6JSNwY29sb3IjJSx3aWR0aDoxMDBweCxoZWlnaHQ6MTAwcHhcIiBvbmNsaWNrPVwiY2xpY2tEaXYoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCIlI3BhcmVudCMlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cIjJcIiBzdHlsZT1cImNvbG9yOiUjYzFjb2xvciMlLHdpZHRoOjUwcHgsaGVpZ2h0OjUwcHhcIiBvbmNsaWNrPVwiY2xpY2tQMSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIlI2NoaWxkIyVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwiM1wiIHN0eWxlPVwiY29sb3I6JSNjMmNvbG9yIyUsd2lkdGg6NTBweCxoZWlnaHQ6NTBweFwiIG9uY2xpY2s9XCJjbGlja1AyKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJSNjaGlsZDIjJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT1cIjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cInslI3YuaWQjJSsnX2NvbnRlbnQnfVwiIGNoaWxkRG9tRGF0YT1cInZcIiBmb3I9XCJ2IF9pbl8gd2Vla1wiICBkb21EYXRhPVwid2Vla1wiPlwiJSN2LmNvbnRlbnQjJVwiPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgIH0pXHJcbiAgICBydi53YXRjaChcInBhcmVudFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJwYXJlbnQsY2hhbmdlXCIpXHJcbiAgICB9KSAvL3J2LndhdGNoKFwia2V5XCIsY2FsbGJhY2spIOinguWvn2RhdGHmlbDmja7lr7nosaHlr7nlupRrZXnnmoTmlbDlgLzlj5jljJYs5Y+Y5YyW6Kem5Y+RY2FsbGJhY2tcclxuICAgIHJ2LndhdGNoKFwiY2hpbGRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiY2hpbGQsY2hhbmdlXCIpXHJcbiAgICB9KVxyXG4gICAgcnYud2F0Y2goXCJjaGlsZDJcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiY2hpbGQyLGNoYW5nZVwiKVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuXHJcbmNvbnN0IE5PREVfUkVQTEFDRSA9IDAgLy9ub2RlIHJlcGxhY2UgXHJcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcclxuY29uc3QgTk9ERV9QUk9QUyA9IDIgLy9wcm9wIGNoYW5nZSBcclxuY29uc3QgTk9ERV9DT05URU5UID0gMyAvL2NvbnRlbnQgY2hhbmdlXHJcbmNsYXNzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSBvYmplY3QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyAgdGhlIHByb3AgKGtlee+8jHN0eWxlLi4pXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoaWxkcmVuIGNoaWxkIGRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWcgPSB0YWdcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW11cclxuICAgICAgICB0aGlzLmtleSA9IHByb3BzID8gcHJvcHMua2V5IDogdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfSAuLi4gaHRtbCB0YWcgdGhlIGtleSBpcyB1bmRlZmluZWRgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgbWV0aG9kIHVzZSB0byB2aXJ0dWFsIGRvbSAgcmVuZGUgdG8gcmVhbCBkb21cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIFV0aWwuc2V0QXR0cihlbCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlmZiB7XHJcbiAgICAvKipcclxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxyXG4gICAgfVxyXG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxyXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcclxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUkVQTEFDRSxcclxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxyXG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xyXG5cclxuICAgIH1cclxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcclxuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxyXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXHJcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxyXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IENISUxEX1JFX09SREVSLFxyXG4gICAgICAgICAgICAgICAgbW92ZXM6IGRpZmZzLm1vdmVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2gocmVvcmRlclBhdGNoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlSW5kZXggPSBpbmRleFxyXG4gICAgICAgIG9sZENoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggPSAobGVmdE5vZGUgJiYgbGVmdE5vZGUuY291bnQpID9cclxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyBsZWZ0Tm9kZS5jb3VudCArIDEgOlxyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCBuZXdDaGlsZCwgY3VycmVudE5vZGVJbmRleClcclxuICAgICAgICAgICAgbGVmdE5vZGUgPSBjaGlsZFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGF0Y2gge1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCB3YWxrZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXHJcbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XHJcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xyXG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXHJcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cclxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxyXG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXHJcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxyXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBVdGlsIHtcclxuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xyXG4gICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU51bWJlciA9IC9eXFxkKyQvXHJcbiAgICAgICAgICAgIC8v6LSf5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXHJcbiAgICAgICAgICAgIC8v5q2j5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcbiAgICAgICAgICAgIC8v6LSf5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcblxyXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZU5lUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHlsZSc6XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcclxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzUGxhY2VIb2xkZXIoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiJSNcIilcclxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXHJcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcclxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwbGFjZUhvbGRlci5pbmRleE9mKFwiLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIERpZmZMaXN0IHtcclxuICAgIC8qKlxyXG4gICAgICogZGlmZiBsaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9sZExpc3QsIG5ld0xpc3QpIHtcclxuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcclxuICAgICAgICBsZXQgbmV3TGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgobmV3TGlzdCkua2V5SW5kZXhcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvciA9IFtdXHJcbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkSXRlbSA9IG9sZExpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcclxuICAgICAgICAgICAgaWYgKCFuZXdMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkob0l0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG5ld0xpc3RbbmV3TGlzdEtleUluZGV4W29JdGVtS2V5XV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdCA9IHRoaXMuY2hpbGRMaXN0LnNsaWNlKDApXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcExpc3RbaV0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbkl0ZW0gPSBuZXdMaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBuSXRlbUtleSA9IHRoaXMuZ2V0S2V5KG5JdGVtKVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW1LZXkgPSB0aGlzLmdldEtleShjSXRlbSlcclxuICAgICAgICAgICAgaWYgKGNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkTGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG5JdGVtS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY05leHRJdGVtS2V5ID0gZ2V0S2V5KHRoaXMudGVtcExpc3RbaW5kZXggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgayA9IHRoaXMudGVtcExpc3QubGVuZ3RoIC0gaW5kZXhcclxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGstLVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShrICsgbmV3TGlzdC5sZW5ndGgpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBtYWtlS2V5SW5kZXgobGlzdCkge1xyXG4gICAgICAgIGxldCBrZXlJbmRleCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgaXRlbUtleSA9IHRoaXMuZ2V0S2V5KGl0ZW0pXHJcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGl0ZW0pIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVtcImtleVwiXVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICByZW1vdmUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0eXBlOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnQoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXN1bHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBjaGlsZDogdGhpcy5jaGlsZExpc3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gb2JzZXJ2ZShvYmosIG9ic2VydmVNYXAsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgbGV0IGludGVybmFsVmFsdWUgPSBvYmpba2V5XVxyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBvYnNlcnZlcixrZXk6JHtrZXl9ICx0eXBlIDoke3R5cGVvZiBpbnRlcm5hbFZhbHVlfWApXHJcbiAgICAgICAgaWYgKGludGVybmFsVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZShpbnRlcm5hbFZhbHVlLCBvYnNlcnZlTWFwLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2ZU1hcC5wdXQoa2V5LCBvYnNlcnZhYmxlKVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmFkZChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGludGVybmFsVmFsdWUgPSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4gb2JqXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gT2JzZXJ2YWJsZSgpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zID0gbmV3IFNldCgpXHJcbn1cclxuT2JzZXJ2YWJsZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9ic2VydmFibGVVcGRhdGUpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmFkZChvYnNlcnZhYmxlVXBkYXRlKVxyXG59XHJcbk9ic2VydmFibGUucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmZvckVhY2goZnVuID0+IGZ1bigpKVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIHRoZSBtZXRob2QgdXNlIHRvIGRlZXAgY2xvbmUgb2JqXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIFxyXG4gKi9cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBsZXQgZ2V0VHlwZSA9IChvKSA9PiB7XHJcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcclxuICAgICAgICBpZiAobyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcclxuICAgIH1cclxuICAgIGxldCByZXN1bHQsIG9DbGFzcyA9IGdldFR5cGUob2JqKTtcclxuICAgIGlmIChvQ2xhc3MgPT09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgIH0gZWxzZSBpZiAob0NsYXNzID09PSBcIkFycmF5XCIpIHtcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgIGxldCBjb3B5ID0gb2JqW2tleV07XHJcbiAgICAgICAgaWYgKGdldFR5cGUoY29weSkgPT0gXCJPYmplY3RcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGNvcHkpID09IFwiQXJyYXlcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xyXG4gICAgbGV0IGQgPSBuZXcgRGlmZihvbGRUcmVlLCBuZXdUcmVlKVxyXG4gICAgcmV0dXJuIGQucGF0Y2hlc1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQYXRjaChub2RlLCBwYXRjaGVzKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAgICAgKiB0aGUgbWFwIG9iamVjdCB1c2UgdG8gc2F2ZSBsaWtpbHkgKGtleSx2YWx1ZSkgZGF0YVxyXG4gICAgICovXHJcbmNsYXNzIE1hcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9XHJcbiAgICBwdXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLm1hcCkpIHtcclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXBba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiAoa2V5IGluIHRoaXMubWFwKSA/IHRoaXMubWFwW2tleV0gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGtleSkge1xyXG4gICAgICAgIGlmICgoa2V5IGluIHRoaXMubWFwKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XVxyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGhhc0tleShrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcClcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpcyBwYXJzZSBodG1sIHRlbXBsYXRlIHRvIHZpcnR1YWwgZG9tIHRyZWVcclxuICogQGF1dGhvciB5aG9uZ21cclxuICovXHJcbmNsYXNzIFlobVBhcnNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubUluZGV4ID0gMFxyXG4gICAgICAgIHRoaXMubU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIHRoaXMubVByb3BSZSA9IC8oW149XFxzXSspKFxccyo9XFxzKigoXFxcIihbXlwiXSopXFxcIil8KFxcJyhbXiddKilcXCcpfFtePlxcc10rKSk/L2dtXHJcbiAgICAgICAgdGhpcy5tSGFuZGxlciA9IHtcclxuICAgICAgICAgICAgc3RhcnRFTGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tSW5kZXggKz0gMVxyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHsgdGFnOiB0YWdOYW1lLCBwcm9wczogcHJvcCwgY2hpbGRyZW46IFtdLCBpbmRleDogdGhhdC5tSW5kZXgsIGNvbnRlbnQ6IGNvbnRlbnQsIGlzQ2xvc2U6IGZhbHNlIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbi5wdXNoKGNvbnRlbnQudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5tTWFwLnB1dCh0aGF0Lm1JbmRleCwgb2JqKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmRFbGVtZW50OiBmdW5jdGlvbiAodGhhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCkuaXNDbG9zZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1NYXAuaGFzS2V5KCh0aGF0Lm1JbmRleCAtIDEpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXggLSAxKS5jaGlsZHJlbi5wdXNoKHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubU1hcC5yZW1vdmUodGhhdC5tSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1JbmRleCAtPSAxXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwYXJzZUh0bWxUZW1wbGF0ZShodG1sKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkgLyAxMDAwXHJcbiAgICAgICAgdmFyIGluZGV4ID0gMFxyXG4gICAgICAgIHdoaWxlIChodG1sKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFRhZ09wZW4gPSBodG1sLmluZGV4T2YoJzwnKVxyXG4gICAgICAgICAgICB2YXIgc3RhcnRUYWdDbG9zZSA9IGh0bWwuaW5kZXhPZignPicpIHx8IGh0bWwuaW5kZXhPZignLz4nKVxyXG4gICAgICAgICAgICB2YXIgZW5kVGFnT3BlbiA9IGh0bWwuaW5kZXhPZignPC8nKVxyXG4gICAgICAgICAgICB2YXIgZW5kVGFnQ2xvc2UgPSBodG1sLmluZGV4T2YoJz4nKVxyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb21tZW50T3BlbiA9IGh0bWwuaW5kZXhPZignPCEtLScpXHJcbiAgICAgICAgICAgIHZhciBlbmRDb21tZW50Q2xvc2UgPSBodG1sLmluZGV4T2YoJy0tPicpXHJcbiAgICAgICAgICAgIGlmIChzdGFydENvbW1lbnRPcGVuID09IDAgJiYgZW5kQ29tbWVudENsb3NlICE9IC0xICYmIGVuZENvbW1lbnRDbG9zZSA+IHN0YXJ0Q29tbWVudE9wZW4pIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZW5kQ29tbWVudENsb3NlICsgM1xyXG4gICAgICAgICAgICAgICAgcGFyc2VDb21tZW50KGh0bWwuc3Vic3RyaW5nKHN0YXJ0Q29tbWVudE9wZW4gKyA0LCBlbmRDb21tZW50Q2xvc2UgKyAzKSk7XHJcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVuZFRhZ09wZW4gIT0gLTEgJiYgZW5kVGFnQ2xvc2UgIT0gLTEgJiYgZW5kVGFnQ2xvc2UgPiBlbmRUYWdPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGVuZFRhZ0Nsb3NlICsgMVxyXG4gICAgICAgICAgICAgICAgX3BhcnNlRW5kVGFnKGh0bWwuc3Vic3RyaW5nKGVuZFRhZ09wZW4sIGVuZFRhZ0Nsb3NlICsgMSksIHRoaXMpXHJcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0VGFnT3BlbiAhPSAtMSAmJiBzdGFydFRhZ0Nsb3NlICE9IC0xICYmIHN0YXJ0VGFnQ2xvc2UgPiBzdGFydFRhZ09wZW4pIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gc3RhcnRUYWdDbG9zZSArIDFcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSA+IC0xICYmIGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSA+IHN0YXJ0VGFnQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29udGVudEVuZEluZGV4ID0gaHRtbC5pbmRleE9mKCc8LycsIChpbmRleCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBodG1sLnN1YnN0cmluZyhpbmRleCwgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpKS50cmltKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9wYXJzZVN0YXJ0VGFnKGh0bWwuc3Vic3RyaW5nKHN0YXJ0VGFnT3Blbiwgc3RhcnRUYWdDbG9zZSArIDEpLCBjb250ZW50LCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW5kVGltZSA9IG5ldyBEYXRlKCkgLyAxMDAwXHJcbiAgICAgICAgY29uc29sZS5sb2coYHRvdGFsIHBhcnNlIHRpbWU6JHtlbmRUaW1lIC0gc3RhcnRUaW1lfWApXHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3BhcnNlU3RhcnRUYWcoaHRtbCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUYWdFbmRJbmRleCA9IGh0bWwuaW5kZXhPZignICcpICE9IC0xID8gaHRtbC5pbmRleE9mKCcgJykgOiBodG1sLmluZGV4T2YoJy8+JykgPT0gLTEgPyBodG1sLmluZGV4T2YoJz4nKSA6IGh0bWwuaW5kZXhPZignLz4nKVxyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGh0bWwuc3Vic3RyaW5nKGh0bWwuaW5kZXhPZignPCcpICsgMSwgc3RhcnRUYWdFbmRJbmRleClcclxuICAgICAgICAgICAgdmFyIHByb3AgPSB7fVxyXG4gICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCcgJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BzID0gaHRtbC5zdWJzdHJpbmcoaHRtbC5pbmRleE9mKCcgJykgKyAxLCBodG1sLmluZGV4T2YoJz4nKSlcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHNSZXN1bHQgPSBwcm9wcy5tYXRjaCh0aGF0Lm1Qcm9wUmUpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByID0gcHJvcHNSZXN1bHRbaV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcFtwci5zcGxpdChcIj1cIilbMF1dID0gcHIuc3BsaXQoXCI9XCIpWzFdLm1hdGNoKC8oPzw9XCIpLio/KD89XCIpLylbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQubUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICgvKD88PVwiKS4qPyg/PVwiKS8udGVzdChjb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hdGNoKC8oPzw9XCIpLio/KD89XCIpLylbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQubUhhbmRsZXIuc3RhcnRFTGVtZW50KHRhZ05hbWUsIHByb3AsIGNvbnRlbnQsIHRoYXQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIF9wYXJzZUVuZFRhZyhodG1sLCB0aGF0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLmVuZEVsZW1lbnQodGhhdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZUNvbW1lbnQoaHRtbCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcGFyc2VDb21tZW50PSR7aHRtbH1gKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBnZXRIdG1sRG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1NYXAuZ2V0KDEpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBSViB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVxyXG4gICAgICAgIH0gPSBvcHRpb25cclxuICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIHBhcnNlLnBhcnNlSHRtbFRlbXBsYXRlKHRlbXBsYXRlKVxyXG5cclxuICAgICAgICBsZXQgZG9tID0gcGFyc2UuZ2V0SHRtbERvbSgpXHJcbiAgICAgICAgbGV0IHJvb3QgPSBVdGlsLmlzU3RyaW5nKGVsKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIDogZWxcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgdGhpcy52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgIHRoaXMudyA9IHRoaXMudmUucmVuZGVyKClcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcclxuICAgICAgICB0aGlzLm9ic2VydmVNYXAgPSBuZXcgTWFwKClcclxuICAgICAgICBvYnNlcnZlKHRoaXMuZGF0YSwgdGhpcy5vYnNlcnZlTWFwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZG9tKGRvbSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudXBkYXRlZG9tKGRvbSlcclxuXHJcbiAgICB9XHJcbiAgICB1cGRhdGVkb20oZG9tKSB7XHJcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgIHdpbmRvdy5udmUgPSBudmVcclxuICAgICAgICB3aW5kb3cudmUgPSB0aGlzLnZlXHJcbiAgICAgICAgcGF0Y2godGhpcy53LCBkaWZmKHRoaXMudmUsIG52ZSkpXHJcbiAgICAgICAgdGhpcy52ZSA9IG52ZVxyXG4gICAgfVxyXG4gICAgd2F0Y2goa2V5LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcC5nZXQoa2V5KS5hZGQoY2FsbGJhY2spXHJcbiAgICB9XHJcbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgIGlmIChjYyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjYylcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoKGRvbS50YWcsIGRvbS5wcm9wcywgY2hpbGRyZW4pXHJcbiAgICB9XHJcbiAgICBhcHBseVRydXRoZnVsRGF0YShkb20pIHtcclxuICAgICAgICBpZiAoXCJmb3JcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdXHJcbiAgICAgICAgICAgIGxldCBkYXRhU2luZ2xlXHJcblxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0ZvckluKGRvbS5wcm9wc1snZm9yJ10pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFrZXlcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20uY2hpbGREb21EYXRha2V5XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiZG9tRGF0YUtleVwiIGluIGRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzFdID09PSBkb20uZG9tRGF0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IHRoaXMuZGF0YVtkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzFdXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZSBmb3IgZGlyZWN0aXZlIHVzZSBlcnJvclwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvYmpzID0gW11cclxuXHJcbiAgICAgICAgICAgIGRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIGRhdGEpXHJcblxyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG9iailcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gb2Jqc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgY2hpbGREb21EYXRha2V5XHJcbiAgICAgICAgICAgIGlmIChcImRhdGFcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGNoaWxkRG9tRGF0YWtleSwgdGhpcy5kYXRhKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdmlydHVhbCBkb20gMiByZWFsIGRhdGEgZG9tXHJcbiAgICAgKiBAcGFyYW0geyp9IGRvbSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVNpbmdsZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gdGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIHRkYXRhKSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9XHJcbiAgICAgICAgb2JqLnRhZyA9IGRvbS50YWdcclxuICAgICAgICBvYmouY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIG9iai5wcm9wcyA9IHt9XHJcbiAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZG9tLnByb3BzKVxyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInN0eWxlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IGRvbS5wcm9wc1t2YWx1ZV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaW5kZXhPZihcIixcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSBzdHlsZS5zcGxpdChcIixcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbC5pc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFV0aWwuZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0sIGRhdGEsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuaW5kZXhPZihkYXRhU2luZ2xlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb20uY2hpbGRyZW5bY2hpbGRdIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uY2hpbGREb21EYXRha2V5ID0gZG9tLnByb3BzLmNoaWxkRG9tRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJkb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZG9tRGF0YUtleSA9IGRvbS5wcm9wcy5kb21EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFbY2hpbGRdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmpcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXHJcbiAgICAgICAgaWYgKGRhdGFTaW5nbGUpIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLmluZGV4T2YoZGF0YVNpbmdsZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlKS5zcGxpdChcIi5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZVZhbHVlKV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXHJcbiAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3U3R5bGVcclxuICAgIH1cclxuICAgIGhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlQXJyYXkgPSBcIlwiXHJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3U3R5bGUgPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlQXJyYXlcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUlYiXSwic291cmNlUm9vdCI6IiJ9