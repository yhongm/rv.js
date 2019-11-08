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
        template: "<div key=1 style=color:%#pcolor#%,width:100px,height:100px onclick=clickDiv()>\n                         %#parent#%\n                         <p key=2 style=color:%#c1color#%,width:50px,height:50px onclick=clickP1()>\n                             %#child#%\n                         </p>\n                         <p key=3 style=color:%#c2color#%,width:50px,height:50px onclick=clickP2()>\n                            %#child2#%\n                         </p>\n                         <div key=\"5\" childDomData=\"v\" for=\"v _in_ week\"  domData=\"week\">\n                            <p key=\"{%#v.id#%+'_content'}\">\"%#v.content#%\"</p>\n                         </div>\n                       </div>"
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
                        content = html.substring(index, html.indexOf('<', index));
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
                        console.log('pr:' + pr);
                        prop[pr.split("=")[0]] = pr.split("=")[1];
                    }
                    console.log("prop:" + JSON.stringify(prop));
                }

                console.log('startTag:' + tagName + ' ,attr:' + prop + ',content:' + content);
                if (that.mHandler) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsicnYiLCJ3aW5kb3ciLCJjbGlja0RpdiIsImRhdGEiLCJwYXJlbnQiLCJEYXRlIiwiY2xpY2tQMSIsImNoaWxkIiwiY2xpY2tQMiIsImNoaWxkMiIsIm15RGF0YSIsInBjb2xvciIsImMxY29sb3IiLCJjMmNvbG9yIiwid2VlayIsImlkIiwiY29udGVudCIsIm9ubG9hZCIsImNvbnNvbGUiLCJsb2ciLCJSViIsImVsIiwidGVtcGxhdGUiLCJ3YXRjaCIsImFsZXJ0IiwiTk9ERV9SRVBMQUNFIiwiQ0hJTERfUkVfT1JERVIiLCJOT0RFX1BST1BTIiwiTk9ERV9DT05URU5UIiwiRWxlbWVudCIsInRhZyIsInByb3BzIiwiY2hpbGRyZW4iLCJ0YWdOYW1lIiwia2V5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjb3VudCIsImZvckVhY2giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJpbmRleCIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInB1c2giLCJ0eXBlIiwicHJvcHNQYXRjaGVzIiwiZGlmZlByb3BzIiwiaXNJZ25vcmVDaGlsZHJlbiIsImRpZmZDaGlsZHJlbiIsIm5vZGUiLCJsZW5ndGgiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiaXNTYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvbGRDaGlsZHJlbiIsIm5ld0NoaWxkcmVuIiwiZGlmZkxpc3QiLCJEaWZmTGlzdCIsImRpZmZzIiwiZ2V0UmVzdWx0IiwibW92ZXMiLCJyZW9yZGVyUGF0Y2giLCJsZWZ0Tm9kZSIsImN1cnJlbnROb2RlSW5kZXgiLCJpIiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsImdldEF0dHJpYnV0ZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwidmFsdWUiLCJzb21lIiwibGlzdCIsImFycmF5IiwiZGlyZWN0aW9uIiwidGVzdCIsInJlTnVtYmVyIiwicmVOZU51bWJlciIsInJlUmVhbE51bWJlcjEiLCJyZVJlYWxOdW1iZXIyIiwicmVOZVJlYWxOdW1iZXIxIiwicmVOZVJlYWxOdW1iZXIyIiwic3R5bGUiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJzbGljZSIsImRhdGFLZXkiLCJleHByZXNzaW9uIiwiaW5kZXhPZiIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsInBsYWNlSG9sZGVyIiwicmVhbFZhbHVlIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsInNwbGl0IiwicGxhY2VIb2xkZXJWYWx1ZSIsImlzTnVtYmVyIiwicmVwbGFjZSIsImV2YWwiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJyZW1vdmUiLCJyZW1vdmVDb3B5VGVtcExpc3QiLCJuSXRlbSIsIm5JdGVtS2V5IiwiY0l0ZW0iLCJjSXRlbUtleSIsImNOZXh0SXRlbUtleSIsImluc2VydCIsImsiLCJpdGVtS2V5Iiwib2JzZXJ2ZSIsIm9iaiIsIm9ic2VydmVNYXAiLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImFkZCIsInNldCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJwcm90b3R5cGUiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsInRvU3RyaW5nIiwiY2FsbCIsInJlc3VsdCIsIm9DbGFzcyIsImNvcHkiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJoIiwiZGlmZiIsImQiLCJwYXRjaCIsIk1hcCIsIm1hcCIsIllobVBhcnNlIiwibUluZGV4IiwibU1hcCIsIm1Qcm9wUmUiLCJtSGFuZGxlciIsInN0YXJ0RUxlbWVudCIsInByb3AiLCJ0aGF0IiwiaXNDbG9zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0cmltIiwiZW5kRWxlbWVudCIsImhhc0tleSIsImh0bWwiLCJzdGFydFRpbWUiLCJzdGFydFRhZ09wZW4iLCJzdGFydFRhZ0Nsb3NlIiwiZW5kVGFnT3BlbiIsImVuZFRhZ0Nsb3NlIiwic3RhcnRDb21tZW50T3BlbiIsImVuZENvbW1lbnRDbG9zZSIsInBhcnNlQ29tbWVudCIsInN1YnN0cmluZyIsIl9wYXJzZUVuZFRhZyIsIl9wYXJzZVN0YXJ0VGFnIiwiZW5kVGltZSIsInN0YXJ0VGFnRW5kSW5kZXgiLCJwcm9wc1Jlc3VsdCIsIm1hdGNoIiwicHIiLCJvcHRpb24iLCJwYXJzZSIsInBhcnNlSHRtbFRlbXBsYXRlIiwiZG9tIiwiZ2V0SHRtbERvbSIsInJvb3QiLCJxdWVyeVNlbGVjdG9yIiwidmUiLCJnZXRWaXJ0dWFsRWxlbWVudCIsImFwcGx5VHJ1dGhmdWxEYXRhIiwidyIsInVwZGF0ZWRvbSIsIm52ZSIsImNjIiwiQXJyYXkiLCJ2IiwiYyIsImRhdGFBcnJheSIsImRhdGFTaW5nbGUiLCJpc0ZvckluIiwiY2hpbGREb21EYXRha2V5IiwiZG9tRGF0YUtleSIsIm9ianMiLCJ2ZG9tMnJkb20iLCJ0ZGF0YSIsInN0eWxlcyIsImhhbmRsZUFycmF5U3R5bGUiLCJoYW5kbGVTaW5nbGVTdHlsZSIsImlzUGxhY2VIb2xkZXIiLCJpc0RvdE9wZXJhdG9yRXhwcmVzc2lvbiIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwiY2hpbGREb21EYXRhIiwiZG9tRGF0YSIsIm5ld1N0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwibmV3U3R5bGVBcnJheSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7Ozs7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TCxDQUF5QnFJLFVBQXpCLENBQUwsQ0FBYjtBQUNBRixtQ0FBV0MsV0FBVyxHQUFYLEdBQWlCQyxVQUE1QjtBQUNIO0FBQ0osaUJBVkQsTUFVTztBQUNIRiwrQkFBVy9JLEtBQVg7QUFDSDtBQUNKLGFBZEQsTUFjTzs7QUFFSCxvQkFBSWdKLFlBQVdoSixNQUFNYSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFmO0FBQ0Esb0JBQUlvSSxjQUFhakosTUFBTWEsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBakI7QUFDQSxvQkFBSTVGLEtBQUt3TixhQUFMLENBQW1CUSxXQUFuQixDQUFKLEVBQW9DOztBQUVoQ0Esa0NBQWF2USxLQUFLdUMsS0FBSzJGLG1CQUFMLENBQXlCcUksV0FBekIsQ0FBTCxDQUFiO0FBQ0FGLCtCQUFXQyxZQUFXLEdBQVgsR0FBaUJDLFdBQTVCO0FBRUgsaUJBTEQsTUFLTztBQUNIRiwrQkFBVy9JLEtBQVg7QUFFSDtBQUNKO0FBQ0QsbUJBQU8rSSxRQUFQO0FBQ0g7Ozt5Q0FDZ0JyUSxJLEVBQU00UCxNLEVBQVFQLFUsRUFBWTtBQUN2QyxnQkFBSW1CLGdCQUFnQixFQUFwQjtBQUR1QztBQUFBO0FBQUE7O0FBQUE7QUFFdkMscUNBQWtCWixNQUFsQiw4SEFBMEI7QUFBQSx3QkFBakJ0SSxLQUFpQjs7O0FBRXRCLHdCQUFJK0ksV0FBVyxLQUFLUCxpQkFBTCxDQUF1QjlQLElBQXZCLEVBQTZCc0gsS0FBN0IsRUFBb0MrSCxVQUFwQyxDQUFmO0FBQ0FtQixxQ0FBaUJILFdBQVcsR0FBNUI7QUFDSDtBQU5zQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU92QyxtQkFBT0csYUFBUDtBQUVIOzs7Ozs7a0JBS1V2UCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVtby5qc1wiKTtcbiIsImltcG9ydCBSViBmcm9tICcuL3NyYy9ydi5qcydcclxuXHJcbi8vIGltcG9ydCBSViBmcm9tICcuL3NyYy9ydi9tYWluJ1xyXG5sZXQgcnZcclxuXHJcblxyXG53aW5kb3cuY2xpY2tEaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBydi5kYXRhLnBhcmVudCA9IGBjbGljayBEaXYgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyW77yM6KeG5Zu+6Ieq5Yqo5pu05pawXHJcbn1cclxuXHJcbndpbmRvdy5jbGlja1AxID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5jaGlsZCA9IGBjbGljayBwMSB0aW1lOiR7bmV3IERhdGUoKSAvIDEwMDB9YCAvL2RhdGHlj5jljJYs6KeG5Zu+6Ieq5Yqo5pu05pawXHJcbn1cclxuXHJcbndpbmRvdy5jbGlja1AyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5jaGlsZDIgPSBgY2xpY2sgcDIgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyWLOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcbmxldCBteURhdGEgPSB7XHJcbiAgICBwYXJlbnQ6IFwicGFyZW50XCIsXHJcbiAgICBjaGlsZDogXCJjaGlsZFwiLFxyXG4gICAgcGNvbG9yOiBcInJlZFwiLFxyXG4gICAgYzFjb2xvcjogXCJibHVlXCIsXHJcbiAgICBjMmNvbG9yOiBcImdyZWVuXCIsXHJcbiAgICBjaGlsZDI6IFwiY2hpbGQyXCIsXHJcbiAgICB3ZWVrOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMTEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiMTExXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIyLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjIyMlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzMyxcclxuICAgICAgICAgICAgY29udGVudDogXCIzMzNcIlxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcbn1cclxud2luZG93LmRhdGEgPSBteURhdGFcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29uc29sZS5sb2coXCJvbmxvYWRcIilcclxuICAgIHJ2ID0gbmV3IFJWKCAvL+WIm+W7uuWvueixoVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWw6IFwiI2FwcFwiLFxyXG4gICAgICAgICAgICAvL2Vs5a+56LGh5oyC6L2955qE6IqC54K5c1xyXG4gICAgICAgICAgICBkYXRhOiBteURhdGEsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPGRpdiBrZXk9MSBzdHlsZT1jb2xvcjolI3Bjb2xvciMlLHdpZHRoOjEwMHB4LGhlaWdodDoxMDBweCBvbmNsaWNrPWNsaWNrRGl2KCk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAlI3BhcmVudCMlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8cCBrZXk9MiBzdHlsZT1jb2xvcjolI2MxY29sb3IjJSx3aWR0aDo1MHB4LGhlaWdodDo1MHB4IG9uY2xpY2s9Y2xpY2tQMSgpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICUjY2hpbGQjJVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PTMgc3R5bGU9Y29sb3I6JSNjMmNvbG9yIyUsd2lkdGg6NTBweCxoZWlnaHQ6NTBweCBvbmNsaWNrPWNsaWNrUDIoKT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICUjY2hpbGQyIyVcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PVwiNVwiIGNoaWxkRG9tRGF0YT1cInZcIiBmb3I9XCJ2IF9pbl8gd2Vla1wiICBkb21EYXRhPVwid2Vla1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwieyUjdi5pZCMlKydfY29udGVudCd9XCI+XCIlI3YuY29udGVudCMlXCI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfSlcclxuICAgIHJ2LndhdGNoKFwicGFyZW50XCIsICgpID0+IHtcclxuICAgICAgICBhbGVydChcInBhcmVudCxjaGFuZ2VcIilcclxuICAgIH0pIC8vcnYud2F0Y2goXCJrZXlcIixjYWxsYmFjaykg6KeC5a+fZGF0YeaVsOaNruWvueixoeWvueW6lGtleeeahOaVsOWAvOWPmOWMlizlj5jljJbop6blj5FjYWxsYmFja1xyXG4gICAgcnYud2F0Y2goXCJjaGlsZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZCxjaGFuZ2VcIilcclxuICAgIH0pXHJcbiAgICBydi53YXRjaChcImNoaWxkMlwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZDIsY2hhbmdlXCIpXHJcbiAgICB9KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG59IiwiXHJcblxyXG5cclxuY29uc3QgTk9ERV9SRVBMQUNFID0gMCAvL25vZGUgcmVwbGFjZSBcclxuY29uc3QgQ0hJTERfUkVfT1JERVIgPSAxIC8vY2hpbGQgbm9kZSByZSBvcmRlclxyXG5jb25zdCBOT0RFX1BST1BTID0gMiAvL3Byb3AgY2hhbmdlIFxyXG5jb25zdCBOT0RFX0NPTlRFTlQgPSAzIC8vY29udGVudCBjaGFuZ2VcclxuY2xhc3MgRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIHZpcnR1YWwgZG9tIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSB0YWcgIHRoZSBodG1sIHRhZyBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BzICB0aGUgcHJvcCAoa2V577yMc3R5bGUuLilcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gY2hpbGQgZGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0YWcsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhZyA9IHRhZ1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7fVxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxyXG4gICAgICAgIHRoaXMua2V5ID0gcHJvcHMgPyBwcm9wcy5rZXkgOiB1bmRlZmluZWRcclxuICAgICAgICBpZiAoIXRoaXMua2V5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd9IC4uLiBodG1sIHRhZyB0aGUga2V5IGlzIHVuZGVmaW5lZGApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gY2hpbGQuY291bnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCsrXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHRoZSBtZXRob2QgdXNlIHRvIHZpcnR1YWwgZG9tICByZW5kZSB0byByZWFsIGRvbVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKVxyXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgVXRpbC5zZXRBdHRyKGVsLCBwcm9wTmFtZSwgcHJvcHNbcHJvcE5hbWVdKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsID0gKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkgPyBjaGlsZC5yZW5kZXIoKSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKVxyXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZEVsKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEaWZmIHtcclxuICAgIC8qKlxyXG4gICAgICogZG9tIHRyZWUgZGlmZiBhbGdvcml0aG0gb2JqZWN0IGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZFRyZWUgdGhlIGRvbSB0cmVlIGZvciBiZWZvcmUgdXBkYXRlIFxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdUcmVlIHRoZSBkb20gdHJlZSBmb3IgYWZ0ZXIgdXBkYXRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9sZFRyZWUsIG5ld1RyZWUpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMFxyXG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kZnNXYWxrKG9sZFRyZWUsIG5ld1RyZWUsIHRoaXMuaW5kZXgpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG9sZE5vZGUsIG5ld05vZGUsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaCA9IFtdXHJcbiAgICAgICAgaWYgKG5ld05vZGUgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNTdHJpbmcob2xkTm9kZSkgJiYgVXRpbC5pc1N0cmluZyhuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICBpZiAob2xkTm9kZSAhPSBuZXdOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTk9ERV9DT05URU5ULFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5ld05vZGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG9sZE5vZGUudGFnTmFtZSA9PT0gbmV3Tm9kZS50YWdOYW1lICYmIG9sZE5vZGUua2V5ID09IG5ld05vZGUua2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9wc1BhdGNoZXMgPSB0aGlzLmRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKVxyXG4gICAgICAgICAgICBpZiAocHJvcHNQYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTk9ERV9QUk9QUyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczogcHJvcHNQYXRjaGVzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghVXRpbC5pc0lnbm9yZUNoaWxkcmVuKG5ld05vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpZmZDaGlsZHJlbihvbGROb2RlLmNoaWxkcmVuLCBuZXdOb2RlLmNoaWxkcmVuLCBpbmRleCwgY3VycmVudFBhdGNoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTk9ERV9SRVBMQUNFLFxyXG4gICAgICAgICAgICAgICAgbm9kZTogbmV3Tm9kZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGNoZXNbaW5kZXhdID0gY3VycmVudFBhdGNoXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBvbGROb2RlLnByb3BzXHJcbiAgICAgICAgY29uc3QgbmV3UHJvcHMgPSBuZXdOb2RlLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IHByb3BzUGF0Y2hlcyA9IHt9XHJcbiAgICAgICAgbGV0IGlzU2FtZSA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9sZFByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wc1trZXldICE9PSBvbGRQcm9wc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NhbWUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgcHJvcHNQYXRjaGVzW2tleV0gPSBuZXdQcm9wc1trZXldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgIGlmICghb2xkUHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1NhbWUgPyBudWxsIDogcHJvcHNQYXRjaGVzXHJcblxyXG4gICAgfVxyXG4gICAgZGlmZkNoaWxkcmVuKG9sZENoaWxkcmVuLCBuZXdDaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaCkge1xyXG4gICAgICAgIGxldCBkaWZmTGlzdCA9IG5ldyBEaWZmTGlzdChvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4pXHJcbiAgICAgICAgbGV0IGRpZmZzID0gZGlmZkxpc3QuZ2V0UmVzdWx0KClcclxuICAgICAgICBuZXdDaGlsZHJlbiA9IGRpZmZzLmNoaWxkXHJcbiAgICAgICAgaWYgKGRpZmZzLm1vdmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcmVvcmRlclBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogQ0hJTERfUkVfT1JERVIsXHJcbiAgICAgICAgICAgICAgICBtb3ZlczogZGlmZnMubW92ZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaChyZW9yZGVyUGF0Y2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0Tm9kZSA9IG51bGxcclxuICAgICAgICBsZXQgY3VycmVudE5vZGVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgb2xkQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5baV1cclxuICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCA9IChsZWZ0Tm9kZSAmJiBsZWZ0Tm9kZS5jb3VudCkgP1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIGxlZnROb2RlLmNvdW50ICsgMSA6XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ICsgMVxyXG4gICAgICAgICAgICB0aGlzLmRmc1dhbGsoY2hpbGQsIG5ld0NoaWxkLCBjdXJyZW50Tm9kZUluZGV4KVxyXG4gICAgICAgICAgICBsZWZ0Tm9kZSA9IGNoaWxkXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQYXRjaCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBwYXRjaGVzKSB7XHJcbiAgICAgICAgbGV0IHdhbGtlciA9IHtcclxuICAgICAgICAgICAgaW5kZXg6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcylcclxuICAgIH1cclxuICAgIGRmc1dhbGsobm9kZSwgd2Fsa2VyLCBwYXRjaGVzKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaGVzID0gcGF0Y2hlc1t3YWxrZXIuaW5kZXhdXHJcbiAgICAgICAgbGV0IGxlbiA9IG5vZGUuY2hpbGROb2RlcyA/IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggOiAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkTm9kZXNbaV1cclxuICAgICAgICAgICAgd2Fsa2VyLmluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50UGF0Y2hlcykge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlcylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGUpIHtcclxuICAgICAgICBjdXJyZW50UGF0Y2hlLmZvckVhY2goKGN1cnJlbnRQYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQYXRjaC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUkVQTEFDRTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IFV0aWwuaXNTdHJpbmcoY3VycmVudFBhdGNoLm5vZGUpID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3VycmVudFBhdGNoLm5vZGUpIDogY3VycmVudFBhdGNoLm5vZGUucmVuZGVyKClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ0hJTERfUkVfT1JERVI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyQ2hpbGRyZW4obm9kZSwgY3VycmVudFBhdGNoLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUFJPUFM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wcyhub2RlLCBjdXJyZW50UGF0Y2gucHJvcHMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgTk9ERV9DT05URU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50UGF0Y2guY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmVvcmRlckNoaWxkcmVuKG5vZGUsIG1vdmVzKSB7XHJcbiAgICAgICAgbGV0IHN0YXRpY05vZGVMaXN0ID0gVXRpbC50b0FycmF5KG5vZGUuY2hpbGROb2RlcylcclxuICAgICAgICBsZXQgbm9kZU1hcHMgPSB7fVxyXG4gICAgICAgIHN0YXRpY05vZGVMaXN0LmZvckVhY2goKHNub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHNub2RlLmdldEF0dHJpYnV0ZSgna2V5JylcclxuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTWFwc1trZXldID0gc25vZGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBtb3ZlLmluZGV4XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLnR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0aWNOb2RlTGlzdFtpbmRleF0gPT09IG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZS50eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0Tm9kZSA9IG5vZGVNYXBzW21vdmUuaXRlbS5rZXldID9cclxuICAgICAgICAgICAgICAgICAgICBub2RlTWFwcyhtb3ZlLml0ZW0ua2V5KS5jbG9uZU5vZGUodHJ1ZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuaXNTdHJpbmcobW92ZS5pdGVtKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1vdmUuaXRlbSkgOiBtb3ZlLml0ZW0ucmVuZGVyKClcclxuICAgICAgICAgICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMCwgaW5zZXJ0Tm9kZSlcclxuICAgICAgICAgICAgICAgIG5vZGUuaW5zZXJ0QmVmb3JlKGluc2VydE5vZGUsIG5vZGUuY2hpbGROb2Rlc1tpbmRleF0gfHwgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgc2V0UHJvcHMobm9kZSwgcHJvcHMpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wc1trZXldXHJcbiAgICAgICAgICAgICAgICBVdGlsLnNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmNsYXNzIFV0aWwge1xyXG4gICAgc3RhdGljIGlzU3RyaW5nKHNvbWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHNvbWUgPT09ICdzdHJpbmcnXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdG9BcnJheShsaXN0KSB7XHJcbiAgICAgICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXJyYXkgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGxpc3RbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzRm9ySW4oZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW5fIFxcdyokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luKiQvLnRlc3QoZGlyZWN0aW9uKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc0Zvck9yRm9yRm9yKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHd8X2luKiQvLnRlc3QoZGlyZWN0aW9uKVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzSWdub3JlQ2hpbGRyZW4obm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlLnByb3BzICYmIG5vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoXCJpZ25vcmVcIilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc051bWJlcih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgLy/mraPmlbTmlbBcclxuICAgICAgICAgICAgdmFyIHJlTnVtYmVyID0gL15cXGQrJC9cclxuICAgICAgICAgICAgLy/otJ/mlbTmlbBcclxuICAgICAgICAgICAgdmFyIHJlTmVOdW1iZXIgPSAvXi1cXGQrJC9cclxuICAgICAgICAgICAgLy/mraPlrp7mlbBcclxuICAgICAgICAgICAgdmFyIHJlUmVhbE51bWJlcjEgPSAvXlsxLTldXFxkKlsuXVxcZCskLyAgLy/pnZ7pm7blvIDlpLRcclxuICAgICAgICAgICAgdmFyIHJlUmVhbE51bWJlcjIgPSAvXjBbLl1cXGQrJC8gLy/pm7blvIDlpLRcclxuICAgICAgICAgICAgLy/otJ/lrp7mlbBcclxuICAgICAgICAgICAgdmFyIHJlTmVSZWFsTnVtYmVyMSA9IC9eLVsxLTldXFxkKlsuXVxcZCskLyAgLy/pnZ7pm7blvIDlpLRcclxuICAgICAgICAgICAgdmFyIHJlTmVSZWFsTnVtYmVyMiA9IC9eLTBbLl1cXGQrJC8gLy/pm7blvIDlpLRcclxuXHJcbiAgICAgICAgICAgIGlmIChyZU51bWJlci50ZXN0KHZhbHVlKSB8fCByZU5lTnVtYmVyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZVJlYWxOdW1iZXIxLnRlc3QodmFsdWUpIHx8IHJlUmVhbE51bWJlcjIudGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHx8IHJlTmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZU5lUmVhbE51bWJlcjIudGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIHNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcclxuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICd2YWx1ZSc6XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZSB8fCAnJ1xyXG4gICAgICAgICAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcgfHwgdGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNQbGFjZUhvbGRlcihjb250ZW50KSB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgaWYgKC9eJSNcXHcqLlxcdyojJSQvLnRlc3QoY29udGVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIC9eXFx3KlxcLlxcdyokLy50ZXN0KGNvbnRlbnQpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0UGxhY2VIb2xkZXJWYWx1ZShjb250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuc2xpY2UoMiwgLTIpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuihqOi+vuW8j1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnQgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc09wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIGlmICgvXlxce1xcdyp8XFx8XFwlK1xcfSQvLnRlc3QoY29udGVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldE9wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50LCBkYXRhLCBkYXRhS2V5KSB7XHJcbiAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoY29udGVudCkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBleHByZXNzaW9uID0gY29udGVudC5zbGljZShjb250ZW50LmluZGV4T2YoXCJ7XCIpICsgMSwgY29udGVudC5pbmRleE9mKFwifVwiKSlcclxuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIlI1wiKVxyXG4gICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIjJVwiKSArIDJcclxuICAgICAgICAgICAgaWYgKHN0YXJ0SW5kZXggIT0gLTEgJiYgZW5kSW5kZXggIT0gLTEgJiYgc3RhcnRJbmRleCA8IGVuZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxhY2VIb2xkZXIgPSBleHByZXNzaW9uLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlYWxWYWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlSG9sZGVyLmluZGV4T2YoXCIuXCIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUocGxhY2VIb2xkZXIpLnNwbGl0KFwiLlwiKVswXSA9PT0gZGF0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2VIb2xkZXJWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxWYWx1ZSA9IFV0aWwuaXNOdW1iZXIocGxhY2VIb2xkZXJWYWx1ZSkgPyBwbGFjZUhvbGRlclZhbHVlIDogYFwiJHtwbGFjZUhvbGRlclZhbHVlfVwiYC8v6YCa6L+HcGxhY2VIb2xkZXLlj5bnnJ/lrp7nmoTlgLxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWxWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKV0vL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZShwbGFjZUhvbGRlciwgcmVhbFZhbHVlKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZXZhbChleHByZXNzaW9uKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgRGlmZkxpc3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiBkaWZmIGxpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZExpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld0xpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob2xkTGlzdCwgbmV3TGlzdCkge1xyXG4gICAgICAgIGxldCBvbGRMaXN0S2V5SW5kZXggPSB0aGlzLm1ha2VLZXlJbmRleChvbGRMaXN0KS5rZXlJbmRleFxyXG4gICAgICAgIGxldCBuZXdMaXN0S2V5SW5kZXggPSB0aGlzLm1ha2VLZXlJbmRleChuZXdMaXN0KS5rZXlJbmRleFxyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yID0gW11cclxuICAgICAgICB0aGlzLmNoaWxkTGlzdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkTGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgb0l0ZW1LZXkgPSB0aGlzLmdldEtleShvbGRJdGVtKVxyXG4gICAgICAgICAgICBpZiAoIW5ld0xpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShvSXRlbUtleSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobnVsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobmV3TGlzdFtuZXdMaXN0S2V5SW5kZXhbb0l0ZW1LZXldXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBMaXN0ID0gdGhpcy5jaGlsZExpc3Quc2xpY2UoMClcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnRlbXBMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wTGlzdFtpXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuSXRlbSA9IG5ld0xpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG5JdGVtS2V5ID0gdGhpcy5nZXRLZXkobkl0ZW0pXHJcbiAgICAgICAgICAgIGxldCBjSXRlbSA9IHRoaXMudGVtcExpc3RbaW5kZXhdXHJcbiAgICAgICAgICAgIGxldCBjSXRlbUtleSA9IHRoaXMuZ2V0S2V5KGNJdGVtKVxyXG4gICAgICAgICAgICBpZiAoY0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChuSXRlbUtleSAhPSBjSXRlbUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkobkl0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjTmV4dEl0ZW1LZXkgPSBnZXRLZXkodGhpcy50ZW1wTGlzdFtpbmRleCArIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgPT09IGNOZXh0SXRlbUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBrID0gdGhpcy50ZW1wTGlzdC5sZW5ndGggLSBpbmRleFxyXG4gICAgICAgIHdoaWxlIChpbmRleCsrIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgay0tXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGsgKyBuZXdMaXN0Lmxlbmd0aClcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIG1ha2VLZXlJbmRleChsaXN0KSB7XHJcbiAgICAgICAgbGV0IGtleUluZGV4ID0ge31cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBpdGVtS2V5ID0gdGhpcy5nZXRLZXkoaXRlbSlcclxuICAgICAgICAgICAga2V5SW5kZXhbaXRlbUtleV0gPSBpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtleUluZGV4OiBrZXlJbmRleFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkoaXRlbSkge1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtW1wia2V5XCJdXHJcbiAgICB9XHJcbiAgICByZW1vdmVDb3B5VGVtcExpc3QoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRlbXBMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgIH1cclxuICAgIHJlbW92ZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHR5cGU6IDBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3VsdCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlczogdGhpcy5tb3ZlT3BlcmF0b3IsXHJcbiAgICAgICAgICAgIGNoaWxkOiB0aGlzLmNoaWxkTGlzdFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBvYnNlcnZlKG9iaiwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBsZXQgaW50ZXJuYWxWYWx1ZSA9IG9ialtrZXldXHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgb2JzZXJ2ZU1hcC5wdXQoa2V5LCBvYnNlcnZhYmxlKVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmFkZChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGludGVybmFsVmFsdWUgPSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4gb2JqXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gT2JzZXJ2YWJsZSgpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zID0gbmV3IFNldCgpXHJcbn1cclxuT2JzZXJ2YWJsZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9ic2VydmFibGVVcGRhdGUpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmFkZChvYnNlcnZhYmxlVXBkYXRlKVxyXG59XHJcbk9ic2VydmFibGUucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmZvckVhY2goZnVuID0+IGZ1bigpKVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIHRoZSBtZXRob2QgdXNlIHRvIGRlZXAgY2xvbmUgb2JqXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIFxyXG4gKi9cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBsZXQgZ2V0VHlwZSA9IChvKSA9PiB7XHJcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcclxuICAgICAgICBpZiAobyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcclxuICAgIH1cclxuICAgIGxldCByZXN1bHQsIG9DbGFzcyA9IGdldFR5cGUob2JqKTtcclxuICAgIGlmIChvQ2xhc3MgPT09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgIH0gZWxzZSBpZiAob0NsYXNzID09PSBcIkFycmF5XCIpIHtcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgIGxldCBjb3B5ID0gb2JqW2tleV07XHJcbiAgICAgICAgaWYgKGdldFR5cGUoY29weSkgPT0gXCJPYmplY3RcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGNvcHkpID09IFwiQXJyYXlcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xyXG4gICAgbGV0IGQgPSBuZXcgRGlmZihvbGRUcmVlLCBuZXdUcmVlKVxyXG4gICAgcmV0dXJuIGQucGF0Y2hlc1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQYXRjaChub2RlLCBwYXRjaGVzKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAgICAgKiB0aGUgbWFwIG9iamVjdCB1c2UgdG8gc2F2ZSBsaWtpbHkgKGtleSx2YWx1ZSkgZGF0YVxyXG4gICAgICovXHJcbmNsYXNzIE1hcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9XHJcbiAgICBwdXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLm1hcCkpIHtcclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXBba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0KGtleSkge1xyXG4gICAgICAgIHJldHVybiAoa2V5IGluIHRoaXMubWFwKSA/IHRoaXMubWFwW2tleV0gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGtleSkge1xyXG4gICAgICAgIGlmICgoa2V5IGluIHRoaXMubWFwKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XVxyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGhhc0tleShrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcClcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpcyBwYXJzZSBodG1sIHRlbXBsYXRlIHRvIHZpcnR1YWwgZG9tIHRyZWVcclxuICogQGF1dGhvciB5aG9uZ21cclxuICovXHJcbmNsYXNzIFlobVBhcnNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubUluZGV4ID0gMFxyXG4gICAgICAgIHRoaXMubU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIHRoaXMubVByb3BSZSA9IC8oW149XFxzXSspKFxccyo9XFxzKigoXFxcIihbXlwiXSopXFxcIil8KFxcJyhbXiddKilcXCcpfFtePlxcc10rKSk/L2dtXHJcbiAgICAgICAgdGhpcy5tSGFuZGxlciA9IHtcclxuICAgICAgICAgICAgc3RhcnRFTGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tSW5kZXggKz0gMVxyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHsgdGFnOiB0YWdOYW1lLCBwcm9wczogcHJvcCwgY2hpbGRyZW46IFtdLCBpbmRleDogdGhhdC5tSW5kZXgsIGNvbnRlbnQ6IGNvbnRlbnQsIGlzQ2xvc2U6IGZhbHNlIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqOlwiICsgSlNPTi5zdHJpbmdpZnkob2JqKSlcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW4ucHVzaChjb250ZW50LnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQubU1hcC5wdXQodGhhdC5tSW5kZXgsIG9iailcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5kRWxlbWVudDogZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXgpLmlzQ2xvc2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5tTWFwLmhhc0tleSgodGhhdC5tSW5kZXggLSAxKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4IC0gMSkuY2hpbGRyZW4ucHVzaCh0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4KSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1NYXAucmVtb3ZlKHRoYXQubUluZGV4KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5tSW5kZXggLT0gMVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcGFyc2VIdG1sVGVtcGxhdGUoaHRtbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFyc2VIdG1sVGVtcGxhdGU6XCIgKyBodG1sKVxyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpIC8gMTAwMFxyXG4gICAgICAgIHZhciBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSAoaHRtbCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUYWdPcGVuID0gaHRtbC5pbmRleE9mKCc8JylcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGFnQ2xvc2UgPSBodG1sLmluZGV4T2YoJz4nKSB8fCBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgICAgICAgdmFyIGVuZFRhZ09wZW4gPSBodG1sLmluZGV4T2YoJzwvJylcclxuICAgICAgICAgICAgdmFyIGVuZFRhZ0Nsb3NlID0gaHRtbC5pbmRleE9mKCc+JylcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29tbWVudE9wZW4gPSBodG1sLmluZGV4T2YoJzwhLS0nKVxyXG4gICAgICAgICAgICB2YXIgZW5kQ29tbWVudENsb3NlID0gaHRtbC5pbmRleE9mKCctLT4nKVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRDb21tZW50T3BlbiA9PSAwICYmIGVuZENvbW1lbnRDbG9zZSAhPSAtMSAmJiBlbmRDb21tZW50Q2xvc2UgPiBzdGFydENvbW1lbnRPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGVuZENvbW1lbnRDbG9zZSArIDNcclxuICAgICAgICAgICAgICAgIHBhcnNlQ29tbWVudChodG1sLnN1YnN0cmluZyhzdGFydENvbW1lbnRPcGVuICsgNCwgZW5kQ29tbWVudENsb3NlICsgMykpO1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRUYWdPcGVuICE9IC0xICYmIGVuZFRhZ0Nsb3NlICE9IC0xICYmIGVuZFRhZ0Nsb3NlID4gZW5kVGFnT3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBlbmRUYWdDbG9zZSArIDFcclxuICAgICAgICAgICAgICAgIF9wYXJzZUVuZFRhZyhodG1sLnN1YnN0cmluZyhlbmRUYWdPcGVuLCBlbmRUYWdDbG9zZSArIDEpLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydFRhZ09wZW4gIT0gLTEgJiYgc3RhcnRUYWdDbG9zZSAhPSAtMSAmJiBzdGFydFRhZ0Nsb3NlID4gc3RhcnRUYWdPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN0YXJ0VGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzwnLCBpbmRleCkgPiAtMSAmJiBodG1sLmluZGV4T2YoJzwnLCBpbmRleCkgPiBzdGFydFRhZ0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGh0bWxbaW5kZXhdOiR7aHRtbFtpbmRleF19YClcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29udGVudEVuZEluZGV4ID0gaHRtbC5pbmRleE9mKCc8LycsIChpbmRleCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBodG1sLnN1YnN0cmluZyhpbmRleCwgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3BhcnNlU3RhcnRUYWcoaHRtbC5zdWJzdHJpbmcoc3RhcnRUYWdPcGVuLCBzdGFydFRhZ0Nsb3NlICsgMSksIGNvbnRlbnQsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgICAgICBjb25zb2xlLmxvZyhgdG90YWwgcGFyc2UgdGltZToke2VuZFRpbWUgLSBzdGFydFRpbWV9YClcclxuXHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfcGFyc2VTdGFydFRhZyhodG1sLCBjb250ZW50LCB0aGF0KSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFRhZ0VuZEluZGV4ID0gaHRtbC5pbmRleE9mKCcgJykgIT0gLTEgPyBodG1sLmluZGV4T2YoJyAnKSA6IGh0bWwuaW5kZXhPZignLz4nKSA9PSAtMSA/IGh0bWwuaW5kZXhPZignPicpIDogaHRtbC5pbmRleE9mKCcvPicpXHJcbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gaHRtbC5zdWJzdHJpbmcoaHRtbC5pbmRleE9mKCc8JykgKyAxLCBzdGFydFRhZ0VuZEluZGV4KVxyXG4gICAgICAgICAgICB2YXIgcHJvcCA9IHt9XHJcbiAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJyAnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJyAnKSArIDEsIGh0bWwuaW5kZXhPZignPicpKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcm9wczpcIiArIHByb3BzKVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9wc1Jlc3VsdCA9IHByb3BzLm1hdGNoKHRoYXQubVByb3BSZSlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHNSZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgcHJvcHNSZXN1bHQ6JHtwcm9wc1Jlc3VsdH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwciA9IHByb3BzUmVzdWx0W2ldXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHByOiR7cHJ9YClcclxuICAgICAgICAgICAgICAgICAgICBwcm9wW3ByLnNwbGl0KFwiPVwiKVswXV0gPSBwci5zcGxpdChcIj1cIilbMV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJvcDpcIiArIEpTT04uc3RyaW5naWZ5KHByb3ApKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc3RhcnRUYWc6JHt0YWdOYW1lfSAsYXR0cjoke3Byb3B9LGNvbnRlbnQ6JHtjb250ZW50fWApXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLnN0YXJ0RUxlbWVudCh0YWdOYW1lLCBwcm9wLCBjb250ZW50LCB0aGF0KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBfcGFyc2VFbmRUYWcoaHRtbCwgdGhhdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcGFyc2VFbmRUYWc9JHtodG1sfWApXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLmVuZEVsZW1lbnQodGhhdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZUNvbW1lbnQoaHRtbCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcGFyc2VDb21tZW50PSR7aHRtbH1gKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBnZXRIdG1sRG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1NYXAuZ2V0KDEpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBSViB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVxyXG4gICAgICAgIH0gPSBvcHRpb25cclxuICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVtcGxhdGU6XCIgKyB0ZW1wbGF0ZSlcclxuICAgICAgICBwYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZSlcclxuXHJcbiAgICAgICAgbGV0IGRvbSA9IHBhcnNlLmdldEh0bWxEb20oKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG9tOlwiICsgSlNPTi5zdHJpbmdpZnkoZG9tKSlcclxuICAgICAgICBsZXQgcm9vdCA9IFV0aWwuaXNTdHJpbmcoZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbFxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLnZlID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy53KVxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIG9ic2VydmUodGhpcy5kYXRhLCB0aGlzLm9ic2VydmVNYXAsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxyXG5cclxuICAgIH1cclxuICAgIHVwZGF0ZWRvbShkb20pIHtcclxuICAgICAgICBsZXQgbnZlID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgd2luZG93Lm52ZSA9IG52ZVxyXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcclxuICAgICAgICBwYXRjaCh0aGlzLncsIGRpZmYodGhpcy52ZSwgbnZlKSlcclxuICAgICAgICB0aGlzLnZlID0gbnZlXHJcbiAgICB9XHJcbiAgICB3YXRjaChrZXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwLmdldChrZXkpLmFkZChjYWxsYmFjaylcclxuICAgIH1cclxuICAgIGdldFZpcnR1YWxFbGVtZW50KGRvbSkge1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGxldCBjYyA9IGRvbS5jaGlsZHJlbltjaGlsZF1cclxuICAgICAgICAgICAgaWYgKGNjIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KGMpXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYyBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KGNjKVxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjYylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGgoZG9tLnRhZywgZG9tLnByb3BzLCBjaGlsZHJlbilcclxuICAgIH1cclxuICAgIGFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkge1xyXG4gICAgICAgIGlmIChcImZvclwiIGluIGRvbS5wcm9wcykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycmF5ID0gW11cclxuICAgICAgICAgICAgbGV0IGRhdGFTaW5nbGVcclxuXHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzRm9ySW4oZG9tLnByb3BzWydmb3InXSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcImNoaWxkRG9tRGF0YWtleVwiIGluIGRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IGRvbS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJkb21EYXRhS2V5XCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV0gPT09IGRvbS5kb21EYXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IGRvbS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gdGhpcy5kYXRhW2RvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhQXJyYXk6XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhQXJyYXkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlIGZvciBkaXJlY3RpdmUgdXNlIGVycm9yXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG9ianMgPSBbXVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFBcnJheTpcIiArIGRhdGFBcnJheS5sZW5ndGgpXHJcbiAgICAgICAgICAgIGRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIGRhdGEpXHJcblxyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG9iailcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gb2Jqc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgY2hpbGREb21EYXRha2V5XHJcbiAgICAgICAgICAgIGlmIChcImRhdGFcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YVxyXG4gICAgICAgICAgICAgICAgY2hpbGREb21EYXRha2V5ID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLnZkb20ycmRvbShkb20sIGRhdGEsIGNoaWxkRG9tRGF0YWtleSwgdGhpcy5kYXRhKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdmlydHVhbCBkb20gMiByZWFsIGRhdGEgZG9tXHJcbiAgICAgKiBAcGFyYW0geyp9IGRvbSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVNpbmdsZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gdGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHZkb20ycmRvbShkb20sIGRhdGEsIGRhdGFTaW5nbGUsIHRkYXRhKSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9XHJcbiAgICAgICAgb2JqLnRhZyA9IGRvbS50YWdcclxuICAgICAgICBvYmouY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIG9iai5wcm9wcyA9IHt9XHJcbiAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZG9tLnByb3BzKVxyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInN0eWxlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IGRvbS5wcm9wc1t2YWx1ZV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaW5kZXhPZihcIixcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSBzdHlsZS5zcGxpdChcIixcIilcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbC5pc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFV0aWwuZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0sIGRhdGEsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuaW5kZXhPZihkYXRhU2luZ2xlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb20uY2hpbGRyZW5bY2hpbGRdIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uY2hpbGREb21EYXRha2V5ID0gZG9tLnByb3BzLmNoaWxkRG9tRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJkb21EYXRhXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZG9tRGF0YUtleSA9IGRvbS5wcm9wcy5kb21EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFbY2hpbGRdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmpcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXHJcbiAgICAgICAgaWYgKGRhdGFTaW5nbGUpIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLmluZGV4T2YoZGF0YVNpbmdsZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlKS5zcGxpdChcIi5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZVZhbHVlKV1cclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXHJcbiAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXHJcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3U3R5bGVcclxuICAgIH1cclxuICAgIGhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlQXJyYXkgPSBcIlwiXHJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3U3R5bGUgPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlQXJyYXlcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUlYiXSwic291cmNlUm9vdCI6IiJ9