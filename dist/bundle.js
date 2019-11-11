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
        template: "<div key=\"1\" style=\"color:%#pcolor#%,width:100px,height:100px\" onclick=\"clickDiv()\">\n                         \"%#parent#%\"\n                         <p key=\"2\" style=\"color:%#c1color#%,width:50px,height:50px\" onclick=\"clickP1()\">\n                             \"%#child#%\"\n                         </p>\n                         <p key=\"3\" style=\"color:%#c2color#%,width:50px,height:50px\" onclick=\"clickP2()\">\n                            \"%#child2#%\"\n                         </p>\n                         <div key=\"5\">\n                            <p key=\"{%#v.id#%+'_content'}\" childDomData=\"v\" for=\"v _in_ week\"  domData=\"week\">\"%#v.content#%\"</p>\n                         </div>\n                       </div>"
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
                console.log("obj:" + JSON.stringify(obj));
                if (content.length > 0) {
                    if (/(?<=").*?(?=")/.test(content)) {
                        console.log("ssss,:" + content);
                    }
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
            console.log("parseHtmlTemplate:" + html);
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
                        console.log('html[index]:' + html[index]);
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
                    console.log("props:" + props);

                    var propsResult = props.match(that.mPropRe);
                    for (var _i4 = 0; _i4 < propsResult.length; _i4++) {
                        console.log('propsResult:' + propsResult);
                        var pr = propsResult[_i4];
                        console.log('pr:' + pr + ' ,typeOf:' + (typeof pr === 'undefined' ? 'undefined' : _typeof(pr)));

                        prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)[0];
                    }
                    console.log("prop:" + JSON.stringify(prop));
                }

                console.log('startTag:' + tagName + ' ,attr:' + prop + ',content:' + content);
                if (that.mHandler) {
                    if (/(?<=").*?(?=")/.test(content)) {
                        content = content.match(/(?<=").*?(?=")/)[0];
                    }
                    that.mHandler.startELement(tagName, prop, content, that);
                }
            }
            function _parseEndTag(html, that) {
                console.log('parseEndTag=' + html);
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
        console.log("template:" + template);
        parse.parseHtmlTemplate(template);

        var dom = parse.getHtmlDom();
        console.log("dom:" + JSON.stringify(dom));
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
                        console.log("dataArray:" + JSON.stringify(dataArray));
                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    }
                } else {
                    throw new Error("the for directive use error");
                }
                var objs = [];
                console.log("dataArray:" + dataArray.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsicnYiLCJ3aW5kb3ciLCJjbGlja0RpdiIsImRhdGEiLCJwYXJlbnQiLCJEYXRlIiwiY2xpY2tQMSIsImNoaWxkIiwiY2xpY2tQMiIsImNoaWxkMiIsIm15RGF0YSIsInBjb2xvciIsImMxY29sb3IiLCJjMmNvbG9yIiwid2VlayIsImlkIiwiY29udGVudCIsIm9ubG9hZCIsImNvbnNvbGUiLCJsb2ciLCJSViIsImVsIiwidGVtcGxhdGUiLCJ3YXRjaCIsImFsZXJ0IiwiTk9ERV9SRVBMQUNFIiwiQ0hJTERfUkVfT1JERVIiLCJOT0RFX1BST1BTIiwiTk9ERV9DT05URU5UIiwiRWxlbWVudCIsInRhZyIsInByb3BzIiwiY2hpbGRyZW4iLCJ0YWdOYW1lIiwia2V5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjb3VudCIsImZvckVhY2giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJpbmRleCIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInB1c2giLCJ0eXBlIiwicHJvcHNQYXRjaGVzIiwiZGlmZlByb3BzIiwiaXNJZ25vcmVDaGlsZHJlbiIsImRpZmZDaGlsZHJlbiIsIm5vZGUiLCJsZW5ndGgiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiaXNTYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvbGRDaGlsZHJlbiIsIm5ld0NoaWxkcmVuIiwiZGlmZkxpc3QiLCJEaWZmTGlzdCIsImRpZmZzIiwiZ2V0UmVzdWx0IiwibW92ZXMiLCJyZW9yZGVyUGF0Y2giLCJsZWZ0Tm9kZSIsImN1cnJlbnROb2RlSW5kZXgiLCJpIiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsImdldEF0dHJpYnV0ZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwidmFsdWUiLCJzb21lIiwibGlzdCIsImFycmF5IiwiZGlyZWN0aW9uIiwidGVzdCIsInJlTnVtYmVyIiwicmVOZU51bWJlciIsInJlUmVhbE51bWJlcjEiLCJyZVJlYWxOdW1iZXIyIiwicmVOZVJlYWxOdW1iZXIxIiwicmVOZVJlYWxOdW1iZXIyIiwic3R5bGUiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJzbGljZSIsImRhdGFLZXkiLCJleHByZXNzaW9uIiwiaW5kZXhPZiIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsInBsYWNlSG9sZGVyIiwicmVhbFZhbHVlIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsInNwbGl0IiwicGxhY2VIb2xkZXJWYWx1ZSIsImlzTnVtYmVyIiwicmVwbGFjZSIsImV2YWwiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJyZW1vdmUiLCJyZW1vdmVDb3B5VGVtcExpc3QiLCJuSXRlbSIsIm5JdGVtS2V5IiwiY0l0ZW0iLCJjSXRlbUtleSIsImNOZXh0SXRlbUtleSIsImluc2VydCIsImsiLCJpdGVtS2V5Iiwib2JzZXJ2ZSIsIm9iaiIsIm9ic2VydmVNYXAiLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImFkZCIsInNldCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJwcm90b3R5cGUiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsInRvU3RyaW5nIiwiY2FsbCIsInJlc3VsdCIsIm9DbGFzcyIsImNvcHkiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJoIiwiZGlmZiIsImQiLCJwYXRjaCIsIk1hcCIsIm1hcCIsIllobVBhcnNlIiwibUluZGV4IiwibU1hcCIsIm1Qcm9wUmUiLCJtSGFuZGxlciIsInN0YXJ0RUxlbWVudCIsInByb3AiLCJ0aGF0IiwiaXNDbG9zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0cmltIiwiZW5kRWxlbWVudCIsImhhc0tleSIsImh0bWwiLCJzdGFydFRpbWUiLCJzdGFydFRhZ09wZW4iLCJzdGFydFRhZ0Nsb3NlIiwiZW5kVGFnT3BlbiIsImVuZFRhZ0Nsb3NlIiwic3RhcnRDb21tZW50T3BlbiIsImVuZENvbW1lbnRDbG9zZSIsInBhcnNlQ29tbWVudCIsInN1YnN0cmluZyIsIl9wYXJzZUVuZFRhZyIsIl9wYXJzZVN0YXJ0VGFnIiwiZW5kVGltZSIsInN0YXJ0VGFnRW5kSW5kZXgiLCJwcm9wc1Jlc3VsdCIsIm1hdGNoIiwicHIiLCJvcHRpb24iLCJwYXJzZSIsInBhcnNlSHRtbFRlbXBsYXRlIiwiZG9tIiwiZ2V0SHRtbERvbSIsInJvb3QiLCJxdWVyeVNlbGVjdG9yIiwidmUiLCJnZXRWaXJ0dWFsRWxlbWVudCIsImFwcGx5VHJ1dGhmdWxEYXRhIiwidyIsInVwZGF0ZWRvbSIsIm52ZSIsImNjIiwiQXJyYXkiLCJ2IiwiYyIsImRhdGFBcnJheSIsImRhdGFTaW5nbGUiLCJpc0ZvckluIiwiY2hpbGREb21EYXRha2V5IiwiZG9tRGF0YUtleSIsIm9ianMiLCJ2ZG9tMnJkb20iLCJ0ZGF0YSIsInN0eWxlcyIsImhhbmRsZUFycmF5U3R5bGUiLCJoYW5kbGVTaW5nbGVTdHlsZSIsImlzUGxhY2VIb2xkZXIiLCJpc0RvdE9wZXJhdG9yRXhwcmVzc2lvbiIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwiY2hpbGREb21EYXRhIiwiZG9tRGF0YSIsIm5ld1N0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwibmV3U3R5bGVBcnJheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7Ozs7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QUwsQ0FBdUI5UCxJQUF2QixFQUE2QnNILEtBQTdCLEVBQW9DK0gsVUFBcEMsQ0FBZjtBQUNBbUIscUNBQWlCSCxXQUFXLEdBQTVCO0FBQ0g7QUFOc0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPdkMsbUJBQU9HLGFBQVA7QUFFSDs7Ozs7O2tCQUtVdlAsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8uanNcIik7XG4iLCJpbXBvcnQgUlYgZnJvbSAnLi9zcmMvcnYuanMnXHJcblxyXG4vLyBpbXBvcnQgUlYgZnJvbSAnLi9zcmMvcnYvbWFpbidcclxubGV0IHJ2XHJcblxyXG5cclxud2luZG93LmNsaWNrRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5wYXJlbnQgPSBgY2xpY2sgRGl2IHRpbWU6JHtuZXcgRGF0ZSgpIC8gMTAwMH1gIC8vZGF0YeWPmOWMlu+8jOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcblxyXG53aW5kb3cuY2xpY2tQMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJ2LmRhdGEuY2hpbGQgPSBgY2xpY2sgcDEgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyWLOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcblxyXG53aW5kb3cuY2xpY2tQMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJ2LmRhdGEuY2hpbGQyID0gYGNsaWNrIHAyIHRpbWU6JHtuZXcgRGF0ZSgpIC8gMTAwMH1gIC8vZGF0YeWPmOWMlizop4blm77oh6rliqjmm7TmlrBcclxufVxyXG5sZXQgbXlEYXRhID0ge1xyXG4gICAgcGFyZW50OiBcInBhcmVudFwiLFxyXG4gICAgY2hpbGQ6IFwiY2hpbGRcIixcclxuICAgIHBjb2xvcjogXCJyZWRcIixcclxuICAgIGMxY29sb3I6IFwiYmx1ZVwiLFxyXG4gICAgYzJjb2xvcjogXCJncmVlblwiLFxyXG4gICAgY2hpbGQyOiBcImNoaWxkMlwiLFxyXG4gICAgd2VlazogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDExLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjExMVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyMixcclxuICAgICAgICAgICAgY29udGVudDogXCIyMjJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMzMsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiMzMzXCJcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59XHJcbndpbmRvdy5kYXRhID0gbXlEYXRhXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKFwib25sb2FkXCIpXHJcbiAgICBydiA9IG5ldyBSViggLy/liJvlu7rlr7nosaFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsOiBcIiNhcHBcIixcclxuICAgICAgICAgICAgLy9lbOWvueixoeaMgui9veeahOiKgueCuXNcclxuICAgICAgICAgICAgZGF0YTogbXlEYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxkaXYga2V5PVwiMVwiIHN0eWxlPVwiY29sb3I6JSNwY29sb3IjJSx3aWR0aDoxMDBweCxoZWlnaHQ6MTAwcHhcIiBvbmNsaWNrPVwiY2xpY2tEaXYoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCIlI3BhcmVudCMlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cIjJcIiBzdHlsZT1cImNvbG9yOiUjYzFjb2xvciMlLHdpZHRoOjUwcHgsaGVpZ2h0OjUwcHhcIiBvbmNsaWNrPVwiY2xpY2tQMSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIlI2NoaWxkIyVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwiM1wiIHN0eWxlPVwiY29sb3I6JSNjMmNvbG9yIyUsd2lkdGg6NTBweCxoZWlnaHQ6NTBweFwiIG9uY2xpY2s9XCJjbGlja1AyKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJSNjaGlsZDIjJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT1cIjVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cInslI3YuaWQjJSsnX2NvbnRlbnQnfVwiIGNoaWxkRG9tRGF0YT1cInZcIiBmb3I9XCJ2IF9pbl8gd2Vla1wiICBkb21EYXRhPVwid2Vla1wiPlwiJSN2LmNvbnRlbnQjJVwiPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgIH0pXHJcbiAgICBydi53YXRjaChcInBhcmVudFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJwYXJlbnQsY2hhbmdlXCIpXHJcbiAgICB9KSAvL3J2LndhdGNoKFwia2V5XCIsY2FsbGJhY2spIOinguWvn2RhdGHmlbDmja7lr7nosaHlr7nlupRrZXnnmoTmlbDlgLzlj5jljJYs5Y+Y5YyW6Kem5Y+RY2FsbGJhY2tcclxuICAgIHJ2LndhdGNoKFwiY2hpbGRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiY2hpbGQsY2hhbmdlXCIpXHJcbiAgICB9KVxyXG4gICAgcnYud2F0Y2goXCJjaGlsZDJcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiY2hpbGQyLGNoYW5nZVwiKVxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuXHJcbmNvbnN0IE5PREVfUkVQTEFDRSA9IDAgLy9ub2RlIHJlcGxhY2UgXHJcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcclxuY29uc3QgTk9ERV9QUk9QUyA9IDIgLy9wcm9wIGNoYW5nZSBcclxuY29uc3QgTk9ERV9DT05URU5UID0gMyAvL2NvbnRlbnQgY2hhbmdlXHJcbmNsYXNzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSBvYmplY3QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyAgdGhlIHByb3AgKGtlee+8jHN0eWxlLi4pXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoaWxkcmVuIGNoaWxkIGRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWcgPSB0YWdcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW11cclxuICAgICAgICB0aGlzLmtleSA9IHByb3BzID8gcHJvcHMua2V5IDogdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfSAuLi4gaHRtbCB0YWcgdGhlIGtleSBpcyB1bmRlZmluZWRgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgbWV0aG9kIHVzZSB0byB2aXJ0dWFsIGRvbSAgcmVuZGUgdG8gcmVhbCBkb21cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIFV0aWwuc2V0QXR0cihlbCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlmZiB7XHJcbiAgICAvKipcclxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxyXG4gICAgfVxyXG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxyXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcclxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUkVQTEFDRSxcclxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxyXG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xyXG5cclxuICAgIH1cclxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcclxuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxyXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXHJcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxyXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IENISUxEX1JFX09SREVSLFxyXG4gICAgICAgICAgICAgICAgbW92ZXM6IGRpZmZzLm1vdmVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2gocmVvcmRlclBhdGNoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlSW5kZXggPSBpbmRleFxyXG4gICAgICAgIG9sZENoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggPSAobGVmdE5vZGUgJiYgbGVmdE5vZGUuY291bnQpID9cclxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyBsZWZ0Tm9kZS5jb3VudCArIDEgOlxyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCBuZXdDaGlsZCwgY3VycmVudE5vZGVJbmRleClcclxuICAgICAgICAgICAgbGVmdE5vZGUgPSBjaGlsZFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGF0Y2gge1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCB3YWxrZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXHJcbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XHJcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xyXG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXHJcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cclxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxyXG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXHJcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxyXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBVdGlsIHtcclxuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xyXG4gICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU51bWJlciA9IC9eXFxkKyQvXHJcbiAgICAgICAgICAgIC8v6LSf5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXHJcbiAgICAgICAgICAgIC8v5q2j5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcbiAgICAgICAgICAgIC8v6LSf5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcblxyXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZU5lUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHlsZSc6XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcclxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzUGxhY2VIb2xkZXIoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiJSNcIilcclxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXHJcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcclxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwbGFjZUhvbGRlci5pbmRleE9mKFwiLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIERpZmZMaXN0IHtcclxuICAgIC8qKlxyXG4gICAgICogZGlmZiBsaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9sZExpc3QsIG5ld0xpc3QpIHtcclxuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcclxuICAgICAgICBsZXQgbmV3TGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgobmV3TGlzdCkua2V5SW5kZXhcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvciA9IFtdXHJcbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkSXRlbSA9IG9sZExpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcclxuICAgICAgICAgICAgaWYgKCFuZXdMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkob0l0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG5ld0xpc3RbbmV3TGlzdEtleUluZGV4W29JdGVtS2V5XV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdCA9IHRoaXMuY2hpbGRMaXN0LnNsaWNlKDApXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcExpc3RbaV0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbkl0ZW0gPSBuZXdMaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBuSXRlbUtleSA9IHRoaXMuZ2V0S2V5KG5JdGVtKVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW1LZXkgPSB0aGlzLmdldEtleShjSXRlbSlcclxuICAgICAgICAgICAgaWYgKGNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkTGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG5JdGVtS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY05leHRJdGVtS2V5ID0gZ2V0S2V5KHRoaXMudGVtcExpc3RbaW5kZXggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgayA9IHRoaXMudGVtcExpc3QubGVuZ3RoIC0gaW5kZXhcclxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGstLVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShrICsgbmV3TGlzdC5sZW5ndGgpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBtYWtlS2V5SW5kZXgobGlzdCkge1xyXG4gICAgICAgIGxldCBrZXlJbmRleCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgaXRlbUtleSA9IHRoaXMuZ2V0S2V5KGl0ZW0pXHJcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGl0ZW0pIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVtcImtleVwiXVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICByZW1vdmUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0eXBlOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnQoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXN1bHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBjaGlsZDogdGhpcy5jaGlsZExpc3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gb2JzZXJ2ZShvYmosIG9ic2VydmVNYXAsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgbGV0IGludGVybmFsVmFsdWUgPSBvYmpba2V5XVxyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxyXG4gICAgICAgIG9ic2VydmVNYXAucHV0KGtleSwgb2JzZXJ2YWJsZSlcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxWYWx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQobmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VkID0gaW50ZXJuYWxWYWx1ZSAhPT0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUuaW52b2tlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoKVxyXG59XHJcbk9ic2VydmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlVXBkYXRlKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5hZGQob2JzZXJ2YWJsZVVwZGF0ZSlcclxufVxyXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZ1biA9PiBmdW4oKSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxyXG4gKiBAcGFyYW0geyp9IG9iaiBcclxuICovXHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgbGV0IGdldFR5cGUgPSAobykgPT4ge1xyXG4gICAgICAgIGlmIChvID09PSBudWxsKSByZXR1cm4gXCJudWxsXCI7XHJcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XHJcbiAgICBpZiAob0NsYXNzID09PSBcIk9iamVjdFwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xyXG4gICAgICAgIGlmIChnZXRUeXBlKGNvcHkpID09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGgodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmKG9sZFRyZWUsIG5ld1RyZWUpIHtcclxuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcclxuICAgIHJldHVybiBkLnBhdGNoZXNcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBhdGNoKG5vZGUsIHBhdGNoZXMpIHtcclxuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gICAgICogdGhlIG1hcCBvYmplY3QgdXNlIHRvIHNhdmUgbGlraWx5IChrZXksdmFsdWUpIGRhdGFcclxuICAgICAqL1xyXG5jbGFzcyBNYXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE9iamVjdCgpO1xyXG4gICAgfVxyXG4gICAgcHV0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldChrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcCkgPyB0aGlzLm1hcFtrZXldIDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbW92ZShrZXkpIHtcclxuICAgICAgICBpZiAoKGtleSBpbiB0aGlzLm1hcCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWFwW2tleV1cclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoYXNLZXkoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApXHJcbiAgICB9XHJcbiAgICBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIHRoaXMgY2xhc3MgaXMgcGFyc2UgaHRtbCB0ZW1wbGF0ZSB0byB2aXJ0dWFsIGRvbSB0cmVlXHJcbiAqIEBhdXRob3IgeWhvbmdtXHJcbiAqL1xyXG5jbGFzcyBZaG1QYXJzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLm1NYXAgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLm1Qcm9wUmUgPSAvKFtePVxcc10rKShcXHMqPVxccyooKFxcXCIoW15cIl0qKVxcXCIpfChcXCcoW14nXSopXFwnKXxbXj5cXHNdKykpPy9nbVxyXG4gICAgICAgIHRoaXMubUhhbmRsZXIgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0RUxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIHByb3AsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubUluZGV4ICs9IDFcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7IHRhZzogdGFnTmFtZSwgcHJvcHM6IHByb3AsIGNoaWxkcmVuOiBbXSwgaW5kZXg6IHRoYXQubUluZGV4LCBjb250ZW50OiBjb250ZW50LCBpc0Nsb3NlOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9iajpcIiArIEpTT04uc3RyaW5naWZ5KG9iaikpXHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKC8oPzw9XCIpLio/KD89XCIpLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3Nzcyw6XCIrY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuLnB1c2goY29udGVudC50cmltKCkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1NYXAucHV0KHRoYXQubUluZGV4LCBvYmopXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVuZEVsZW1lbnQ6IGZ1bmN0aW9uICh0aGF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4KS5pc0Nsb3NlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubU1hcC5oYXNLZXkoKHRoYXQubUluZGV4IC0gMSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCAtIDEpLmNoaWxkcmVuLnB1c2godGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tTWFwLnJlbW92ZSh0aGF0Lm1JbmRleClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQubUluZGV4IC09IDFcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHBhcnNlSHRtbFRlbXBsYXRlKGh0bWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBhcnNlSHRtbFRlbXBsYXRlOlwiICsgaHRtbClcclxuICAgICAgICBsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgICAgICB2YXIgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUgKGh0bWwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGFnT3BlbiA9IGh0bWwuaW5kZXhPZignPCcpXHJcbiAgICAgICAgICAgIHZhciBzdGFydFRhZ0Nsb3NlID0gaHRtbC5pbmRleE9mKCc+JykgfHwgaHRtbC5pbmRleE9mKCcvPicpXHJcbiAgICAgICAgICAgIHZhciBlbmRUYWdPcGVuID0gaHRtbC5pbmRleE9mKCc8LycpXHJcbiAgICAgICAgICAgIHZhciBlbmRUYWdDbG9zZSA9IGh0bWwuaW5kZXhPZignPicpXHJcbiAgICAgICAgICAgIHZhciBzdGFydENvbW1lbnRPcGVuID0gaHRtbC5pbmRleE9mKCc8IS0tJylcclxuICAgICAgICAgICAgdmFyIGVuZENvbW1lbnRDbG9zZSA9IGh0bWwuaW5kZXhPZignLS0+JylcclxuICAgICAgICAgICAgaWYgKHN0YXJ0Q29tbWVudE9wZW4gPT0gMCAmJiBlbmRDb21tZW50Q2xvc2UgIT0gLTEgJiYgZW5kQ29tbWVudENsb3NlID4gc3RhcnRDb21tZW50T3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBlbmRDb21tZW50Q2xvc2UgKyAzXHJcbiAgICAgICAgICAgICAgICBwYXJzZUNvbW1lbnQoaHRtbC5zdWJzdHJpbmcoc3RhcnRDb21tZW50T3BlbiArIDQsIGVuZENvbW1lbnRDbG9zZSArIDMpKTtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kVGFnT3BlbiAhPSAtMSAmJiBlbmRUYWdDbG9zZSAhPSAtMSAmJiBlbmRUYWdDbG9zZSA+IGVuZFRhZ09wZW4pIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZW5kVGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgICAgICAgICBfcGFyc2VFbmRUYWcoaHRtbC5zdWJzdHJpbmcoZW5kVGFnT3BlbiwgZW5kVGFnQ2xvc2UgKyAxKSwgdGhpcylcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRUYWdPcGVuICE9IC0xICYmIHN0YXJ0VGFnQ2xvc2UgIT0gLTEgJiYgc3RhcnRUYWdDbG9zZSA+IHN0YXJ0VGFnT3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdGFydFRhZ0Nsb3NlICsgMVxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gLTEgJiYgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gc3RhcnRUYWdDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBodG1sW2luZGV4XToke2h0bWxbaW5kZXhdfWApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGNvbnRlbnRFbmRJbmRleCA9IGh0bWwuaW5kZXhPZignPC8nLCAoaW5kZXggKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgsIGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfcGFyc2VTdGFydFRhZyhodG1sLnN1YnN0cmluZyhzdGFydFRhZ09wZW4sIHN0YXJ0VGFnQ2xvc2UgKyAxKSwgY29udGVudCwgdGhpcylcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpIC8gMTAwMFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGB0b3RhbCBwYXJzZSB0aW1lOiR7ZW5kVGltZSAtIHN0YXJ0VGltZX1gKVxyXG5cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9wYXJzZVN0YXJ0VGFnKGh0bWwsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VGFnRW5kSW5kZXggPSBodG1sLmluZGV4T2YoJyAnKSAhPSAtMSA/IGh0bWwuaW5kZXhPZignICcpIDogaHRtbC5pbmRleE9mKCcvPicpID09IC0xID8gaHRtbC5pbmRleE9mKCc+JykgOiBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJzwnKSArIDEsIHN0YXJ0VGFnRW5kSW5kZXgpXHJcbiAgICAgICAgICAgIHZhciBwcm9wID0ge31cclxuICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignICcpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IGh0bWwuc3Vic3RyaW5nKGh0bWwuaW5kZXhPZignICcpICsgMSwgaHRtbC5pbmRleE9mKCc+JykpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb3BzOlwiICsgcHJvcHMpXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BzUmVzdWx0ID0gcHJvcHMubWF0Y2godGhhdC5tUHJvcFJlKVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1Jlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBwcm9wc1Jlc3VsdDoke3Byb3BzUmVzdWx0fWApXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByID0gcHJvcHNSZXN1bHRbaV1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgcHI6JHtwcn0gLHR5cGVPZjoke3R5cGVvZiBwcn1gKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BbcHIuc3BsaXQoXCI9XCIpWzBdXSA9IHByLnNwbGl0KFwiPVwiKVsxXS5tYXRjaCgvKD88PVwiKS4qPyg/PVwiKS8pWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb3A6XCIgKyBKU09OLnN0cmluZ2lmeShwcm9wKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHN0YXJ0VGFnOiR7dGFnTmFtZX0gLGF0dHI6JHtwcm9wfSxjb250ZW50OiR7Y29udGVudH1gKVxyXG4gICAgICAgICAgICBpZiAodGhhdC5tSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYoLyg/PD1cIikuKj8oPz1cIikvLnRlc3QoY29udGVudCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9Y29udGVudC5tYXRjaCgvKD88PVwiKS4qPyg/PVwiKS8pWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLnN0YXJ0RUxlbWVudCh0YWdOYW1lLCBwcm9wLCBjb250ZW50LCB0aGF0KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBfcGFyc2VFbmRUYWcoaHRtbCwgdGhhdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcGFyc2VFbmRUYWc9JHtodG1sfWApXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLmVuZEVsZW1lbnQodGhhdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZUNvbW1lbnQoaHRtbCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcGFyc2VDb21tZW50PSR7aHRtbH1gKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBnZXRIdG1sRG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1NYXAuZ2V0KDEpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBSViB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVxyXG4gICAgICAgIH0gPSBvcHRpb25cclxuICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSlcclxuICAgICAgICBwYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZSlcclxuXHJcbiAgICAgICAgbGV0IGRvbSA9IHBhcnNlLmdldEh0bWxEb20oKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG9tOlwiICsgSlNPTi5zdHJpbmdpZnkoZG9tKSlcclxuICAgICAgICBsZXQgcm9vdCA9IFV0aWwuaXNTdHJpbmcoZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbFxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLnZlID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy53KVxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIG9ic2VydmUodGhpcy5kYXRhLCB0aGlzLm9ic2VydmVNYXAsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxyXG5cclxuICAgIH1cclxuICAgIHVwZGF0ZWRvbShkb20pIHtcclxuICAgICAgICBsZXQgbnZlID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgd2luZG93Lm52ZSA9IG52ZVxyXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcclxuICAgICAgICBwYXRjaCh0aGlzLncsIGRpZmYodGhpcy52ZSwgbnZlKSlcclxuICAgICAgICB0aGlzLnZlID0gbnZlXHJcbiAgICB9XHJcbiAgICB3YXRjaChrZXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwLmdldChrZXkpLmFkZChjYWxsYmFjaylcclxuICAgIH1cclxuICAgIGdldFZpcnR1YWxFbGVtZW50KGRvbSkge1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGxldCBjYyA9IGRvbS5jaGlsZHJlbltjaGlsZF1cclxuICAgICAgICAgICAgaWYgKGNjIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KGMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYyBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KGNjKVxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjYylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGgoZG9tLnRhZywgZG9tLnByb3BzLCBjaGlsZHJlbilcclxuICAgIH1cclxuICAgIGFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkge1xyXG4gICAgICAgIGlmIChcImZvclwiIGluIGRvbS5wcm9wcykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycmF5ID0gW11cclxuICAgICAgICAgICAgbGV0IGRhdGFTaW5nbGVcclxuXHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzRm9ySW4oZG9tLnByb3BzWydmb3InXSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcImNoaWxkRG9tRGF0YWtleVwiIGluIGRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IGRvbS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJkb21EYXRhS2V5XCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV0gPT09IGRvbS5kb21EYXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IGRvbS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gdGhpcy5kYXRhW2RvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhQXJyYXk6XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhQXJyYXkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlIGZvciBkaXJlY3RpdmUgdXNlIGVycm9yXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG9ianMgPSBbXVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFBcnJheTpcIiArIGRhdGFBcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIGRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIGRhdGEpXHJcblxyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG9iailcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gb2Jqc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgY2hpbGREb21EYXRha2V5XHJcbiAgICAgICAgICAgIGlmIChcImRhdGFcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGNoaWxkRG9tRGF0YWtleSwgdGhpcy5kYXRhKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdmlydHVhbCBkb20gMiByZWFsIGRhdGEgZG9tXHJcbiAgICAgKiBAcGFyYW0geyp9IGRvbSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVNpbmdsZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gdGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIHRkYXRhKSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9XHJcbiAgICAgICAgb2JqLnRhZyA9IGRvbS50YWdcclxuICAgICAgICBvYmouY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIG9iai5wcm9wcyA9IHt9XHJcbiAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZG9tLnByb3BzKVxyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInN0eWxlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IGRvbS5wcm9wc1t2YWx1ZV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaW5kZXhPZihcIixcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSBzdHlsZS5zcGxpdChcIixcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbC5pc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFV0aWwuZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0sIGRhdGEsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuaW5kZXhPZihkYXRhU2luZ2xlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb20uY2hpbGRyZW5bY2hpbGRdIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uY2hpbGREb21EYXRha2V5ID0gZG9tLnByb3BzLmNoaWxkRG9tRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJkb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZG9tRGF0YUtleSA9IGRvbS5wcm9wcy5kb21EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFbY2hpbGRdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmpcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXHJcbiAgICAgICAgaWYgKGRhdGFTaW5nbGUpIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLmluZGV4T2YoZGF0YVNpbmdsZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlKS5zcGxpdChcIi5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZVZhbHVlKV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXHJcbiAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3U3R5bGVcclxuICAgIH1cclxuICAgIGhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlQXJyYXkgPSBcIlwiXHJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3U3R5bGUgPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlQXJyYXlcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUlYiXSwic291cmNlUm9vdCI6IiJ9