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
    time: 10000,
    componentColor: "red",
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
window.RV = _rv2.default;
window.onload = function () {
    this.console.log("onload");

    var con = _rv2.default.component({
        name: "MyComponent",
        template: "\n            <div class=\"aaa\" key=\"aaa\"><p key=\"bbb\" style=\"color:%#pcolor#%\">\"%#pcontent#%\"</p><div>\n        ",
        props: {
            time: "1000",
            pcontent: "a custom component"
        },
        data: {
            pcontent: "a custom component",
            pcolor: "yellow"

        },
        run: function run() {
            var _this = this;

            var colors = ['red', 'green', 'blue', 'yellow', 'gray', 'white', 'black'];
            console.log("rv component,run props:" + JSON.stringify(this.props));
            setInterval(function () {
                _this.data.pcontent = _this.props.pcontent;
                _this.data.pcolor = colors[getRandomInt(6)];
            }, this.props.time);
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
        },

        watch: {
            pcolor: function pcolor() {
                console.log("pcolorChange,change:");
            }
        }

    });
    rv = new _rv2.default( //创建对象
    {
        el: "#app",
        //el对象挂载的节点s
        data: myData,
        template: "<div key=\"1\" style=\"color:%#pcolor#%,width:100px,height:100px\" onclick=\"clickDiv()\">\n                         \"%#parent#%\"\n                         <p key=\"2\" style=\"color:%#c1color#%,width:50px,height:50px\" onclick=\"clickP1()\">\n                             \"%#child#%\"\n                         </p>\n                         <p key=\"3\" style=\"color:%#c2color#%,width:50px,height:50px\" onclick=\"clickP2()\">\n                            \"%#child2#%\"\n                         </p>\n                         <div key=\"4\">\n                            <p key=\"{%#v.id#%+'_content'}\" childDomData=\"v\" for=\"v _in_ week\"  domData=\"week\">\"%#v.content#%\"</p>\n                         </div>\n                         <MyComponent pcontent=\"ssss\" color=\"%#componentColor#%\" time=\"2000\" key=\"888\"></MyComponent>\n                       </div>"
    });
    rv.use(con);
    rv.run();
    rv.watch("parent", function () {
        alert("parent,change");
    }); //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
    rv.watch("child", function () {
        alert("child,change");
    });
    rv.watch("child2", function () {
        alert("child2,change");
    });
    window.rv = rv;
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

var Observable = function () {
    function Observable() {
        _classCallCheck(this, Observable);

        this.updateFunctions = new Set();
    }

    _createClass(Observable, [{
        key: 'add',
        value: function add(observableUpdate) {
            this.updateFunctions.add(observableUpdate);
        }
    }, {
        key: 'invoke',
        value: function invoke() {
            this.updateFunctions.forEach(function (fun) {
                return fun();
            });
        }
    }]);

    return Observable;
}();

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
        key: 'forEach',
        value: function forEach(callback) {
            var _this3 = this;

            Object.keys(this.map).forEach(function (mapKey) {
                callback(_this3.map[mapKey]);
            });
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

        this.componetMap = new Map();
        this.mIndex = 0;
        this.mMap = new Map();
        this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
        this.mHandler = {
            startELement: function startELement(tagName, prop, content, that) {
                that.mIndex += 1;
                if (that.componetMap.hasKey(tagName)) {
                    //已经有当前组件的记录，将当前组件插入dom中
                    console.log("con,prop:" + JSON.stringify(that.componetMap.get(tagName).getProp()));
                    console.log("con,dom:" + JSON.stringify(that.componetMap.get(tagName).getDom()));
                    console.log('tagName:' + tagName + ' ,prop:' + JSON.stringify(prop));

                    that.componetMap.get(tagName).apply(prop);
                    that.mMap.put(that.mIndex, that.componetMap.get(tagName).getDom());
                } else {
                    var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false };

                    if (content.length > 0) {

                        obj.children.push(content.trim());
                    }
                    that.mMap.put(that.mIndex, obj);
                }
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
    /**
     * 用于解析自定义组件，按名字索引组件
     * @param {*} rvComponent 
     */


    _createClass(YhmParse, [{
        key: 'useCustomComponent',
        value: function useCustomComponent(rvComponent) {

            this.componetMap.put(rvComponent.getName(), rvComponent);
        }
    }, {
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

var RvComponent = function () {
    function RvComponent(componentParam) {
        _classCallCheck(this, RvComponent);

        var dom = componentParam.dom,
            props = componentParam.props,
            name = componentParam.name,
            data = componentParam.data,
            run = componentParam.run,
            watch = componentParam.watch;

        this.dom = dom;
        this.rdom = this.rdom;
        this.props = props;
        this.name = name;
        this.data = data;
        this.componentRun = run;
        this.rvDomUtil = new RVDomUtil(data);
        this.observeMap = new Map();
        this.watchObj = watch;
        this.applyTruthFulData();
    }

    _createClass(RvComponent, [{
        key: 'applyTruthFulData',
        value: function applyTruthFulData() {
            console.log('before dom:' + JSON.stringify(this.rdom));
            this.rdom = this.rvDomUtil.applyTruthfulData(this.dom);
            console.log('after dom:' + JSON.stringify(this.rdom));
        }
    }, {
        key: 'run',
        value: function run() {
            this.componentRun.call(this);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'apply',
        value: function apply(props) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = Object.keys(this.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;


                    if (props[prop]) {
                        this.props[prop] = props[prop];
                    }
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
        }
    }, {
        key: 'getDom',
        value: function getDom() {
            return this.rdom;
        }
    }, {
        key: 'getProp',
        value: function getProp() {
            return this.props;
        }
    }]);

    return RvComponent;
}();
/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */


var RVDomUtil = function () {
    function RVDomUtil(data) {
        _classCallCheck(this, RVDomUtil);

        this.data = data;
    }

    _createClass(RVDomUtil, [{
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
                        dataArray = data[dom.props['for'].split(" _in_ ")[1]];

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

                var _data = void 0;
                var childDomDatakey = void 0;
                if ("data" in dom) {
                    _data = dom.data;
                    childDomDatakey = dom.childDomDatakey;
                } else {
                    _data = this.data;
                    childDomDatakey = undefined;
                }

                var obj = this.vdom2rdom(dom, _data, childDomDatakey, _data);

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
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var style = _step2.value;


                    var newStyle = this.handleSingleStyle(data, style, dataSingle);
                    newStyleArray += newStyle + ";";
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return newStyleArray;
        }
    }]);

    return RVDomUtil;
}();

var RV = function () {
    function RV(option) {
        _classCallCheck(this, RV);

        var el = option.el,
            data = option.data,
            template = option.template;

        this.el = el;
        this.data = data;
        this.template = template;
        this.observeMap = new Map();
        this.parse = new YhmParse();
        this.rvDomUtil = new RVDomUtil(this.data);
    }

    _createClass(RV, [{
        key: 'use',
        value: function use(rvComponentObj) {
            this.parse.useCustomComponent(rvComponentObj);
        }
        /**
         * run rv
         */

    }, {
        key: 'run',
        value: function run() {
            var _this6 = this;

            var root = Util.isString(this.el) ? document.querySelector(this.el) : this.el;
            var dom = this._getDomTree();
            console.log('run,dom:' + JSON.stringify(dom));

            // this.ve = this.getVirtualElement(this.applyTruthfulData(dom))
            var rvThat = this;
            this.parse.componetMap.forEach(function (componet) {
                console.log('run component ' + (componet instanceof RvComponent));

                observe(componet.data, componet.observeMap, function () {

                    dom = rvThat._getDomTree();
                    rvThat._updatedom(dom);
                });
                Object.keys(componet.watchObj).forEach(function (watchFun) {
                    console.log('watchFun:' + watchFun);
                    if (componet.observeMap.hasKey(watchFun)) {
                        componet.observeMap.get(watchFun).add(function () {
                            componet.watchObj[watchFun]();
                            componet.applyTruthFulData();
                        });
                    }
                });
                componet.run();
            });

            this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom));
            this.w = this.ve.render();
            root.appendChild(this.w);

            observe(this.data, this.observeMap, function () {
                _this6._updatedom(dom);
            });
            this._updatedom(dom);
        }
    }, {
        key: '_getDomTree',
        value: function _getDomTree() {
            try {
                this.parse.parseHtmlTemplate(this.template.trim());
            } catch (e) {
                console.error('rv parse e:' + e);
            }
            return this.parse.getHtmlDom();
        }
    }, {
        key: '_updatedom',
        value: function _updatedom(dom) {
            var nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom));
            window.nve = nve;
            window.ve = this.ve;
            patch(this.w, diff(this.ve, nve));
            this.ve = nve;
        }
    }, {
        key: 'watch',
        value: function watch(key, callback) {
            if (this.observeMap.hasKey(key)) {
                this.observeMap.get(key).add(callback);
            }
        }
        /**
         * this static function use to declaration a RV component
         * @param {*} option 
         */

    }], [{
        key: 'component',
        value: function component(option) {
            var name = option.name,
                template = option.template,
                props = option.props,
                data = option.data;

            var parse = new YhmParse();
            parse.parseHtmlTemplate(template.trim());

            var dom = parse.getHtmlDom();

            return new RvComponent({ dom: dom, props: props, name: name, data: data, run: option.run, watch: option.watch });
            // this.ve = this.getVirtualElement(this.applyTruthfulData(dom))
            // this.w = this.ve.render()
            // console.log("componet,dom:" + JSON.stringify(dom))
            // console.log("componet,data:" + JSON.stringify(data))
        }
    }]);

    return RV;
}();

exports.default = RV;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsicnYiLCJ3aW5kb3ciLCJjbGlja0RpdiIsImRhdGEiLCJwYXJlbnQiLCJEYXRlIiwiY2xpY2tQMSIsImNoaWxkIiwiY2xpY2tQMiIsImNoaWxkMiIsIm15RGF0YSIsInBjb2xvciIsImMxY29sb3IiLCJjMmNvbG9yIiwidGltZSIsImNvbXBvbmVudENvbG9yIiwid2VlayIsImlkIiwiY29udGVudCIsIlJWIiwib25sb2FkIiwiY29uc29sZSIsImxvZyIsImNvbiIsImNvbXBvbmVudCIsIm5hbWUiLCJ0ZW1wbGF0ZSIsInByb3BzIiwicGNvbnRlbnQiLCJydW4iLCJjb2xvcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0SW50ZXJ2YWwiLCJnZXRSYW5kb21JbnQiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ3YXRjaCIsImVsIiwidXNlIiwiYWxlcnQiLCJOT0RFX1JFUExBQ0UiLCJDSElMRF9SRV9PUkRFUiIsIk5PREVfUFJPUFMiLCJOT0RFX0NPTlRFTlQiLCJFbGVtZW50IiwidGFnIiwiY2hpbGRyZW4iLCJ0YWdOYW1lIiwia2V5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjb3VudCIsImZvckVhY2giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJpbmRleCIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInB1c2giLCJ0eXBlIiwicHJvcHNQYXRjaGVzIiwiZGlmZlByb3BzIiwiaXNJZ25vcmVDaGlsZHJlbiIsImRpZmZDaGlsZHJlbiIsIm5vZGUiLCJsZW5ndGgiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiaXNTYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvbGRDaGlsZHJlbiIsIm5ld0NoaWxkcmVuIiwiZGlmZkxpc3QiLCJEaWZmTGlzdCIsImRpZmZzIiwiZ2V0UmVzdWx0IiwibW92ZXMiLCJyZW9yZGVyUGF0Y2giLCJsZWZ0Tm9kZSIsImN1cnJlbnROb2RlSW5kZXgiLCJpIiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsImdldEF0dHJpYnV0ZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwidmFsdWUiLCJzb21lIiwibGlzdCIsImFycmF5IiwiZGlyZWN0aW9uIiwidGVzdCIsInJlTnVtYmVyIiwicmVOZU51bWJlciIsInJlUmVhbE51bWJlcjEiLCJyZVJlYWxOdW1iZXIyIiwicmVOZVJlYWxOdW1iZXIxIiwicmVOZVJlYWxOdW1iZXIyIiwic3R5bGUiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJzbGljZSIsImRhdGFLZXkiLCJleHByZXNzaW9uIiwiaW5kZXhPZiIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsInBsYWNlSG9sZGVyIiwicmVhbFZhbHVlIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsInNwbGl0IiwicGxhY2VIb2xkZXJWYWx1ZSIsImlzTnVtYmVyIiwicmVwbGFjZSIsImV2YWwiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJyZW1vdmUiLCJyZW1vdmVDb3B5VGVtcExpc3QiLCJuSXRlbSIsIm5JdGVtS2V5IiwiY0l0ZW0iLCJjSXRlbUtleSIsImNOZXh0SXRlbUtleSIsImluc2VydCIsImsiLCJpdGVtS2V5Iiwib2JzZXJ2ZSIsIm9iaiIsIm9ic2VydmVNYXAiLCJjYWxsYmFjayIsIk9iamVjdCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImFkZCIsInNldCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInJlc3VsdCIsIm9DbGFzcyIsImNvcHkiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJoIiwiZGlmZiIsImQiLCJwYXRjaCIsIk1hcCIsIm1hcCIsIm1hcEtleSIsIllobVBhcnNlIiwiY29tcG9uZXRNYXAiLCJtSW5kZXgiLCJtTWFwIiwibVByb3BSZSIsIm1IYW5kbGVyIiwic3RhcnRFTGVtZW50IiwicHJvcCIsInRoYXQiLCJoYXNLZXkiLCJnZXRQcm9wIiwiZ2V0RG9tIiwiYXBwbHkiLCJpc0Nsb3NlIiwidHJpbSIsImVuZEVsZW1lbnQiLCJydkNvbXBvbmVudCIsImdldE5hbWUiLCJodG1sIiwic3RhcnRUaW1lIiwic3RhcnRUYWdPcGVuIiwic3RhcnRUYWdDbG9zZSIsImVuZFRhZ09wZW4iLCJlbmRUYWdDbG9zZSIsInN0YXJ0Q29tbWVudE9wZW4iLCJlbmRDb21tZW50Q2xvc2UiLCJwYXJzZUNvbW1lbnQiLCJzdWJzdHJpbmciLCJfcGFyc2VFbmRUYWciLCJfcGFyc2VTdGFydFRhZyIsImVuZFRpbWUiLCJzdGFydFRhZ0VuZEluZGV4IiwicHJvcHNSZXN1bHQiLCJtYXRjaCIsInByIiwiUnZDb21wb25lbnQiLCJjb21wb25lbnRQYXJhbSIsImRvbSIsInJkb20iLCJjb21wb25lbnRSdW4iLCJydkRvbVV0aWwiLCJSVkRvbVV0aWwiLCJ3YXRjaE9iaiIsImFwcGx5VHJ1dGhGdWxEYXRhIiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJjYyIsIkFycmF5IiwidiIsImdldFZpcnR1YWxFbGVtZW50IiwiYyIsImRhdGFBcnJheSIsImRhdGFTaW5nbGUiLCJpc0ZvckluIiwiY2hpbGREb21EYXRha2V5IiwiZG9tRGF0YUtleSIsIm9ianMiLCJ2ZG9tMnJkb20iLCJ0ZGF0YSIsInN0eWxlcyIsImhhbmRsZUFycmF5U3R5bGUiLCJoYW5kbGVTaW5nbGVTdHlsZSIsImlzUGxhY2VIb2xkZXIiLCJpc0RvdE9wZXJhdG9yRXhwcmVzc2lvbiIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwiY2hpbGREb21EYXRhIiwiZG9tRGF0YSIsIm5ld1N0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwibmV3U3R5bGVBcnJheSIsIm9wdGlvbiIsInBhcnNlIiwicnZDb21wb25lbnRPYmoiLCJ1c2VDdXN0b21Db21wb25lbnQiLCJyb290IiwicXVlcnlTZWxlY3RvciIsIl9nZXREb21UcmVlIiwicnZUaGF0IiwiY29tcG9uZXQiLCJfdXBkYXRlZG9tIiwid2F0Y2hGdW4iLCJ2ZSIsInciLCJwYXJzZUh0bWxUZW1wbGF0ZSIsImUiLCJlcnJvciIsImdldEh0bWxEb20iLCJudmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7Ozs7O0FBRUE7QUFDQSxJQUFJQSxXQUFKOztBQUdBQyxPQUFPQyxRQUFQLEdBQWtCLFlBQVk7QUFDMUJGLE9BQUdHLElBQUgsQ0FBUUMsTUFBUix1QkFBbUMsSUFBSUMsSUFBSixLQUFhLElBQWhELENBRDBCLENBQzZCO0FBQzFELENBRkQ7O0FBSUFKLE9BQU9LLE9BQVAsR0FBaUIsWUFBWTtBQUN6Qk4sT0FBR0csSUFBSCxDQUFRSSxLQUFSLHNCQUFpQyxJQUFJRixJQUFKLEtBQWEsSUFBOUMsQ0FEeUIsQ0FDNEI7QUFDeEQsQ0FGRDs7QUFJQUosT0FBT08sT0FBUCxHQUFpQixZQUFZO0FBQ3pCUixPQUFHRyxJQUFILENBQVFNLE1BQVIsc0JBQWtDLElBQUlKLElBQUosS0FBYSxJQUEvQyxDQUR5QixDQUM2QjtBQUN6RCxDQUZEO0FBR0EsSUFBSUssU0FBUztBQUNUTixZQUFRLFFBREM7QUFFVEcsV0FBTyxPQUZFO0FBR1RJLFlBQVEsS0FIQztBQUlUQyxhQUFTLE1BSkE7QUFLVEMsYUFBUyxPQUxBO0FBTVRKLFlBQVEsUUFOQztBQU9USyxVQUFNLEtBUEc7QUFRVEMsb0JBQWdCLEtBUlA7QUFTVEMsVUFBTSxDQUNGO0FBQ0lDLFlBQUksRUFEUjtBQUVJQyxpQkFBUztBQUZiLEtBREUsRUFLRjtBQUNJRCxZQUFJLEVBRFI7QUFFSUMsaUJBQVM7QUFGYixLQUxFLEVBU0Y7QUFDSUQsWUFBSSxFQURSO0FBRUlDLGlCQUFTO0FBRmIsS0FURTtBQVRHLENBQWI7QUF3QkFqQixPQUFPRSxJQUFQLEdBQWNPLE1BQWQ7QUFDQVQsT0FBT2tCLEVBQVAsR0FBWUEsWUFBWjtBQUNBbEIsT0FBT21CLE1BQVAsR0FBZ0IsWUFBWTtBQUN4QixTQUFLQyxPQUFMLENBQWFDLEdBQWIsQ0FBaUIsUUFBakI7O0FBRUEsUUFBSUMsTUFBTUosYUFBR0ssU0FBSCxDQUFhO0FBQ25CQyxjQUFNLGFBRGE7QUFFbkJDLDhJQUZtQjtBQUtuQkMsZUFBTztBQUNIYixrQkFBTSxNQURIO0FBRUhjLHNCQUFVO0FBRlAsU0FMWTtBQVNuQnpCLGNBQU07QUFDRnlCLHNCQUFVLG9CQURSO0FBRUZqQixvQkFBUTs7QUFGTixTQVRhO0FBY25Ca0IsV0FkbUIsaUJBY2I7QUFBQTs7QUFFRixnQkFBSUMsU0FBUyxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLE1BQWpCLEVBQXlCLFFBQXpCLEVBQW1DLE1BQW5DLEVBQTJDLE9BQTNDLEVBQW9ELE9BQXBELENBQWI7QUFDQVQsb0JBQVFDLEdBQVIsNkJBQXNDUyxLQUFLQyxTQUFMLENBQWUsS0FBS0wsS0FBcEIsQ0FBdEM7QUFDQU0sd0JBQVksWUFBTTtBQUNkLHNCQUFLOUIsSUFBTCxDQUFVeUIsUUFBVixHQUFxQixNQUFLRCxLQUFMLENBQVdDLFFBQWhDO0FBQ0Esc0JBQUt6QixJQUFMLENBQVVRLE1BQVYsR0FBbUJtQixPQUFPSSxhQUFhLENBQWIsQ0FBUCxDQUFuQjtBQUdILGFBTEQsRUFLRyxLQUFLUCxLQUFMLENBQVdiLElBTGQ7QUFNQSxxQkFBU29CLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCO0FBQ3ZCLHVCQUFPQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JGLEtBQUtDLEtBQUwsQ0FBV0YsR0FBWCxDQUEzQixDQUFQO0FBQ0g7QUFFSixTQTVCa0I7O0FBNkJuQkksZUFBTztBQUNINUIsa0JBREcsb0JBQ007QUFDTFUsd0JBQVFDLEdBQVI7QUFFSDtBQUpFOztBQTdCWSxLQUFiLENBQVY7QUFzQ0F0QixTQUFLLElBQUltQixZQUFKLEVBQVE7QUFDVDtBQUNJcUIsWUFBSSxNQURSO0FBRUk7QUFDQXJDLGNBQU1PLE1BSFY7QUFJSWdCO0FBSkosS0FEQyxDQUFMO0FBbUJBMUIsT0FBR3lDLEdBQUgsQ0FBT2xCLEdBQVA7QUFDQXZCLE9BQUc2QixHQUFIO0FBQ0E3QixPQUFHdUMsS0FBSCxDQUFTLFFBQVQsRUFBbUIsWUFBTTtBQUNyQkcsY0FBTSxlQUFOO0FBQ0gsS0FGRCxFQTlEd0IsQ0FnRXJCO0FBQ0gxQyxPQUFHdUMsS0FBSCxDQUFTLE9BQVQsRUFBa0IsWUFBTTtBQUNwQkcsY0FBTSxjQUFOO0FBQ0gsS0FGRDtBQUdBMUMsT0FBR3VDLEtBQUgsQ0FBUyxRQUFULEVBQW1CLFlBQU07QUFDckJHLGNBQU0sZUFBTjtBQUNILEtBRkQ7QUFHQXpDLFdBQU9ELEVBQVAsR0FBWUEsRUFBWjtBQU9ILENBOUVELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q0EsSUFBTTJDLGVBQWUsQ0FBckIsQyxDQUF1QjtBQUN2QixJQUFNQyxpQkFBaUIsQ0FBdkIsQyxDQUF5QjtBQUN6QixJQUFNQyxhQUFhLENBQW5CLEMsQ0FBcUI7QUFDckIsSUFBTUMsZUFBZSxDQUFyQixDLENBQXVCOztJQUNqQkMsTztBQUNGOzs7Ozs7QUFNQSxxQkFBWUMsR0FBWixFQUFpQnJCLEtBQWpCLEVBQXdCc0IsUUFBeEIsRUFBa0M7QUFBQTs7QUFDOUIsWUFBSSxFQUFFLGdCQUFnQkYsT0FBbEIsQ0FBSixFQUFnQztBQUM1QixtQkFBTyxJQUFJQSxPQUFKLENBQVlHLE9BQVosRUFBcUJ2QixLQUFyQixFQUE0QnNCLFFBQTVCLENBQVA7QUFDSDtBQUNELGFBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtyQixLQUFMLEdBQWFBLFNBQVMsRUFBdEI7QUFDQSxhQUFLc0IsUUFBTCxHQUFnQkEsWUFBWSxFQUE1QjtBQUNBLGFBQUtFLEdBQUwsR0FBV3hCLFFBQVFBLE1BQU13QixHQUFkLEdBQW9CQyxTQUEvQjtBQUNBLFlBQUksQ0FBQyxLQUFLRCxHQUFWLEVBQWU7QUFDWCxrQkFBTSxJQUFJRSxLQUFKLENBQWFMLEdBQWIsd0NBQU47QUFDSDtBQUNELFlBQUlNLFFBQVEsQ0FBWjtBQUNBLGFBQUtMLFFBQUwsQ0FBY00sT0FBZCxDQUFzQixpQkFBUztBQUMzQixnQkFBSWhELGlCQUFpQndDLE9BQXJCLEVBQThCO0FBQzFCTyx5QkFBUy9DLE1BQU0rQyxLQUFmO0FBQ0g7QUFDREE7QUFDSCxTQUxEO0FBTUEsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7QUFDRDs7Ozs7OztpQ0FHUztBQUNMLGdCQUFNZCxLQUFLZ0IsU0FBU0MsYUFBVCxDQUF1QixLQUFLVCxHQUE1QixDQUFYO0FBQ0EsZ0JBQU1yQixRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsaUJBQUssSUFBTStCLFFBQVgsSUFBdUIvQixLQUF2QixFQUE4QjtBQUMxQmdDLHFCQUFLQyxPQUFMLENBQWFwQixFQUFiLEVBQWlCa0IsUUFBakIsRUFBMkIvQixNQUFNK0IsUUFBTixDQUEzQjtBQUNIO0FBQ0QsaUJBQUtULFFBQUwsQ0FBY00sT0FBZCxDQUFzQixpQkFBUztBQUMzQixvQkFBTU0sVUFBV3RELGlCQUFpQndDLE9BQWxCLEdBQTZCeEMsTUFBTXVELE1BQU4sRUFBN0IsR0FBOENOLFNBQVNPLGNBQVQsQ0FBd0J4RCxLQUF4QixDQUE5RDtBQUNBaUMsbUJBQUd3QixXQUFILENBQWVILE9BQWY7QUFDSCxhQUhEO0FBSUEsbUJBQU9yQixFQUFQO0FBQ0g7Ozs7OztJQUdDeUIsSTtBQUNGOzs7OztBQUtBLGtCQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QjtBQUFBOztBQUMxQixhQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLGFBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS0MsT0FBTCxDQUFhSixPQUFiLEVBQXNCQyxPQUF0QixFQUErQixLQUFLQyxLQUFwQztBQUNIOzs7O2dDQUNPRyxPLEVBQVNDLE8sRUFBU0osSyxFQUFPO0FBQzdCLGdCQUFJSyxlQUFlLEVBQW5CO0FBQ0EsZ0JBQUlELFdBQVcsSUFBZixFQUFxQixDQUVwQixDQUZELE1BRU8sSUFBSWIsS0FBS2UsUUFBTCxDQUFjSCxPQUFkLEtBQTBCWixLQUFLZSxRQUFMLENBQWNGLE9BQWQsQ0FBOUIsRUFBc0Q7QUFDekQsb0JBQUlELFdBQVdDLE9BQWYsRUFBd0I7QUFDcEJDLGlDQUFhRSxJQUFiLENBQWtCO0FBQ2RDLDhCQUFNOUIsWUFEUTtBQUVkNUIsaUNBQVNzRDtBQUZLLHFCQUFsQjtBQUlIO0FBQ0osYUFQTSxNQU9BLElBQUlELFFBQVFyQixPQUFSLEtBQW9Cc0IsUUFBUXRCLE9BQTVCLElBQXVDcUIsUUFBUXBCLEdBQVIsSUFBZXFCLFFBQVFyQixHQUFsRSxFQUF1RTtBQUMxRSxvQkFBSTBCLGVBQWUsS0FBS0MsU0FBTCxDQUFlUCxPQUFmLEVBQXdCQyxPQUF4QixDQUFuQjtBQUNBLG9CQUFJSyxZQUFKLEVBQWtCO0FBQ2RKLGlDQUFhRSxJQUFiLENBQWtCO0FBQ2RDLDhCQUFNL0IsVUFEUTtBQUVkbEIsK0JBQU9rRDtBQUZPLHFCQUFsQjtBQUlIO0FBQ0Qsb0JBQUksQ0FBQ2xCLEtBQUtvQixnQkFBTCxDQUFzQlAsT0FBdEIsQ0FBTCxFQUFxQztBQUNqQyx5QkFBS1EsWUFBTCxDQUFrQlQsUUFBUXRCLFFBQTFCLEVBQW9DdUIsUUFBUXZCLFFBQTVDLEVBQXNEbUIsS0FBdEQsRUFBNkRLLFlBQTdEO0FBQ0g7QUFDSixhQVhNLE1BV0E7QUFDSEEsNkJBQWFFLElBQWIsQ0FBa0I7QUFDZEMsMEJBQU1qQyxZQURRO0FBRWRzQywwQkFBTVQ7QUFGUSxpQkFBbEI7QUFJSDtBQUNELGdCQUFJQyxhQUFhUyxNQUFqQixFQUF5QjtBQUNyQixxQkFBS2IsT0FBTCxDQUFhRCxLQUFiLElBQXNCSyxZQUF0QjtBQUNIO0FBQ0o7OztrQ0FDU0YsTyxFQUFTQyxPLEVBQVM7O0FBRXhCLGdCQUFNVyxXQUFXWixRQUFRNUMsS0FBekI7QUFDQSxnQkFBTXlELFdBQVdaLFFBQVE3QyxLQUF6Qjs7QUFFQSxnQkFBTWtELGVBQWUsRUFBckI7QUFDQSxnQkFBSVEsU0FBUyxJQUFiO0FBQ0EsaUJBQUssSUFBSWxDLElBQVQsSUFBZ0JnQyxRQUFoQixFQUEwQjtBQUN0QixvQkFBSUMsU0FBU2pDLElBQVQsTUFBa0JnQyxTQUFTaEMsSUFBVCxDQUF0QixFQUFxQztBQUNqQ2tDLDZCQUFTLEtBQVQ7QUFDQVIsaUNBQWExQixJQUFiLElBQW9CaUMsU0FBU2pDLElBQVQsQ0FBcEI7QUFDSDtBQUNKO0FBQ0QsaUJBQUssSUFBSUEsS0FBVCxJQUFnQmlDLFFBQWhCLEVBQTBCO0FBQ3RCLG9CQUFJLENBQUNELFNBQVNHLGNBQVQsQ0FBd0JuQyxLQUF4QixDQUFMLEVBQW1DO0FBQy9Ca0MsNkJBQVMsS0FBVDtBQUNBUixpQ0FBYTFCLEtBQWIsSUFBb0JpQyxTQUFTakMsS0FBVCxDQUFwQjtBQUNIO0FBQ0o7QUFDRCxtQkFBT2tDLFNBQVMsSUFBVCxHQUFnQlIsWUFBdkI7QUFFSDs7O3FDQUNZVSxXLEVBQWFDLFcsRUFBYXBCLEssRUFBT0ssWSxFQUFjO0FBQUE7O0FBQ3hELGdCQUFJZ0IsV0FBVyxJQUFJQyxRQUFKLENBQWFILFdBQWIsRUFBMEJDLFdBQTFCLENBQWY7QUFDQSxnQkFBSUcsUUFBUUYsU0FBU0csU0FBVCxFQUFaO0FBQ0FKLDBCQUFjRyxNQUFNcEYsS0FBcEI7QUFDQSxnQkFBSW9GLE1BQU1FLEtBQU4sQ0FBWVgsTUFBaEIsRUFBd0I7QUFDcEIsb0JBQUlZLGVBQWU7QUFDZmxCLDBCQUFNaEMsY0FEUztBQUVmaUQsMkJBQU9GLE1BQU1FO0FBRkUsaUJBQW5CO0FBSUFwQiw2QkFBYUUsSUFBYixDQUFrQm1CLFlBQWxCO0FBQ0g7QUFDRCxnQkFBSUMsV0FBVyxJQUFmO0FBQ0EsZ0JBQUlDLG1CQUFtQjVCLEtBQXZCO0FBQ0FtQix3QkFBWWhDLE9BQVosQ0FBb0IsVUFBQ2hELEtBQUQsRUFBUTBGLENBQVIsRUFBYztBQUM5QixvQkFBSUMsV0FBV1YsWUFBWVMsQ0FBWixDQUFmO0FBQ0FELG1DQUFvQkQsWUFBWUEsU0FBU3pDLEtBQXRCLEdBQ2YwQyxtQkFBbUJELFNBQVN6QyxLQUE1QixHQUFvQyxDQURyQixHQUVmMEMsbUJBQW1CLENBRnZCO0FBR0Esc0JBQUsxQixPQUFMLENBQWEvRCxLQUFiLEVBQW9CMkYsUUFBcEIsRUFBOEJGLGdCQUE5QjtBQUNBRCwyQkFBV3hGLEtBQVg7QUFDSCxhQVBEO0FBVUg7Ozs7OztJQUdDNEYsSztBQUNGLG1CQUFZbEIsSUFBWixFQUFrQlosT0FBbEIsRUFBMkI7QUFBQTs7QUFDdkIsWUFBSStCLFNBQVM7QUFDVGhDLG1CQUFPO0FBREUsU0FBYjtBQUdBLGFBQUtFLE9BQUwsQ0FBYVcsSUFBYixFQUFtQm1CLE1BQW5CLEVBQTJCL0IsT0FBM0I7QUFDSDs7OztnQ0FDT1ksSSxFQUFNbUIsTSxFQUFRL0IsTyxFQUFTO0FBQzNCLGdCQUFJZ0MsaUJBQWlCaEMsUUFBUStCLE9BQU9oQyxLQUFmLENBQXJCO0FBQ0EsZ0JBQUlrQyxNQUFNckIsS0FBS3NCLFVBQUwsR0FBa0J0QixLQUFLc0IsVUFBTCxDQUFnQnJCLE1BQWxDLEdBQTJDLENBQXJEO0FBQ0EsaUJBQUssSUFBSWUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSyxHQUFwQixFQUF5QkwsR0FBekIsRUFBOEI7QUFDMUIsb0JBQUkxRixRQUFRMEUsS0FBS3NCLFVBQUwsQ0FBZ0JOLENBQWhCLENBQVo7QUFDQUcsdUJBQU9oQyxLQUFQO0FBQ0EscUJBQUtFLE9BQUwsQ0FBYS9ELEtBQWIsRUFBb0I2RixNQUFwQixFQUE0Qi9CLE9BQTVCO0FBQ0g7QUFDRCxnQkFBSWdDLGNBQUosRUFBb0I7QUFDaEIscUJBQUtHLFlBQUwsQ0FBa0J2QixJQUFsQixFQUF3Qm9CLGNBQXhCO0FBQ0g7QUFFSjs7O3FDQUNZcEIsSSxFQUFNd0IsYSxFQUFlO0FBQUE7O0FBQzlCQSwwQkFBY2xELE9BQWQsQ0FBc0IsVUFBQ2tCLFlBQUQsRUFBa0I7QUFDcEMsd0JBQVFBLGFBQWFHLElBQXJCO0FBQ0kseUJBQUtqQyxZQUFMO0FBQ0ksNEJBQUk2QixVQUFVYixLQUFLZSxRQUFMLENBQWNELGFBQWFRLElBQTNCLElBQW1DekIsU0FBU08sY0FBVCxDQUF3QlUsYUFBYVEsSUFBckMsQ0FBbkMsR0FBZ0ZSLGFBQWFRLElBQWIsQ0FBa0JuQixNQUFsQixFQUE5RjtBQUNBbUIsNkJBQUt5QixVQUFMLENBQWdCQyxZQUFoQixDQUE2Qm5DLE9BQTdCLEVBQXNDUyxJQUF0QztBQUNBO0FBQ0oseUJBQUtyQyxjQUFMO0FBQ0ksK0JBQUtnRSxlQUFMLENBQXFCM0IsSUFBckIsRUFBMkJSLGFBQWFvQixLQUF4QztBQUNBO0FBQ0oseUJBQUtoRCxVQUFMO0FBQ0ksK0JBQUtnRSxRQUFMLENBQWM1QixJQUFkLEVBQW9CUixhQUFhOUMsS0FBakM7QUFDQTtBQUNKLHlCQUFLbUIsWUFBTDtBQUNJLDRCQUFJbUMsS0FBSzZCLFdBQVQsRUFBc0I7QUFDbEI3QixpQ0FBSzZCLFdBQUwsR0FBbUJyQyxhQUFhdkQsT0FBaEM7QUFDSCx5QkFGRCxNQUVPO0FBQ0grRCxpQ0FBSzhCLFNBQUwsR0FBaUJ0QyxhQUFhdkQsT0FBOUI7QUFDSDtBQUNEO0FBQ0o7QUFDSTs7QUFuQlI7QUFzQkgsYUF2QkQ7QUF3Qkg7Ozt3Q0FDZStELEksRUFBTVksSyxFQUFPO0FBQ3pCLGdCQUFJbUIsaUJBQWlCckQsS0FBS3NELE9BQUwsQ0FBYWhDLEtBQUtzQixVQUFsQixDQUFyQjtBQUNBLGdCQUFJVyxXQUFXLEVBQWY7QUFDQUYsMkJBQWV6RCxPQUFmLENBQXVCLFVBQUM0RCxLQUFELEVBQVc7QUFDOUIsb0JBQUlBLE1BQU1DLFFBQU4sS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsd0JBQUlqRSxRQUFNZ0UsTUFBTUUsWUFBTixDQUFtQixLQUFuQixDQUFWO0FBQ0Esd0JBQUlsRSxLQUFKLEVBQVM7QUFDTCtELGlDQUFTL0QsS0FBVCxJQUFnQmdFLEtBQWhCO0FBQ0g7QUFDSjtBQUNKLGFBUEQ7QUFRQXRCLGtCQUFNdEMsT0FBTixDQUFjLFVBQUMrRCxJQUFELEVBQVU7QUFDcEIsb0JBQUlsRCxRQUFRa0QsS0FBS2xELEtBQWpCO0FBQ0Esb0JBQUlrRCxLQUFLMUMsSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ2pCLHdCQUFJb0MsZUFBZTVDLEtBQWYsTUFBMEJhLEtBQUtzQixVQUFMLENBQWdCbkMsS0FBaEIsQ0FBOUIsRUFBc0Q7QUFDbERhLDZCQUFLc0MsV0FBTCxDQUFpQnRDLEtBQUtzQixVQUFMLENBQWdCbkMsS0FBaEIsQ0FBakI7QUFDSDtBQUNENEMsbUNBQWVRLE1BQWYsQ0FBc0JwRCxLQUF0QixFQUE2QixDQUE3QjtBQUNILGlCQUxELE1BS08sSUFBSWtELEtBQUsxQyxJQUFMLEtBQWMsQ0FBbEIsRUFBcUI7QUFDeEIsd0JBQUk2QyxhQUFhUCxTQUFTSSxLQUFLSSxJQUFMLENBQVV2RSxHQUFuQixJQUNiK0QsU0FBU0ksS0FBS0ksSUFBTCxDQUFVdkUsR0FBbkIsRUFBd0J3RSxTQUF4QixDQUFrQyxJQUFsQyxDQURhLEdBRWJoRSxLQUFLZSxRQUFMLENBQWM0QyxLQUFLSSxJQUFuQixJQUEyQmxFLFNBQVNPLGNBQVQsQ0FBd0J1RCxLQUFLSSxJQUE3QixDQUEzQixHQUFnRUosS0FBS0ksSUFBTCxDQUFVNUQsTUFBVixFQUZwRTtBQUdBa0QsbUNBQWVRLE1BQWYsQ0FBc0JwRCxLQUF0QixFQUE2QixDQUE3QixFQUFnQ3FELFVBQWhDO0FBQ0F4Qyx5QkFBSzJDLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCeEMsS0FBS3NCLFVBQUwsQ0FBZ0JuQyxLQUFoQixLQUEwQixJQUF4RDtBQUNIO0FBQ0osYUFkRDtBQWdCSDs7O2lDQUNRYSxJLEVBQU10RCxLLEVBQU87QUFDbEIsaUJBQUssSUFBSXdCLEtBQVQsSUFBZ0J4QixLQUFoQixFQUF1QjtBQUNuQixvQkFBSUEsTUFBTXdCLEtBQU4sTUFBZUMsU0FBbkIsRUFBOEI7QUFDMUI2Qix5QkFBSzRDLGVBQUwsQ0FBcUIxRSxLQUFyQjtBQUNILGlCQUZELE1BRU87QUFDSCx3QkFBTTJFLFFBQVFuRyxNQUFNd0IsS0FBTixDQUFkO0FBQ0FRLHlCQUFLQyxPQUFMLENBQWFxQixJQUFiLEVBQW1COUIsS0FBbkIsRUFBd0IyRSxLQUF4QjtBQUNIO0FBQ0o7QUFFSjs7Ozs7O0lBTUNuRSxJOzs7Ozs7O2lDQUNjb0UsSSxFQUFNO0FBQ2xCLG1CQUFPLE9BQU9BLElBQVAsS0FBZ0IsUUFBdkI7QUFDSDs7O2dDQUNjQyxJLEVBQU07QUFDakIsZ0JBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1AsdUJBQU8sRUFBUDtBQUNIO0FBQ0QsZ0JBQUlDLFFBQVEsRUFBWjtBQUNBLGlCQUFLLElBQUloQyxJQUFJLENBQWIsRUFBZ0JBLElBQUkrQixLQUFLOUMsTUFBekIsRUFBaUNlLEdBQWpDLEVBQXNDO0FBQ2xDZ0Msc0JBQU10RCxJQUFOLENBQVdxRCxLQUFLL0IsQ0FBTCxDQUFYO0FBQ0g7QUFDRCxtQkFBT2dDLEtBQVA7QUFDSDs7O2dDQUNjQyxTLEVBQVc7QUFDdEIsbUJBQU8sa0JBQWlCQyxJQUFqQixDQUFzQkQsU0FBdEI7QUFBUDtBQUNIOzs7bUNBQ2lCQSxTLEVBQVc7QUFDekIsbUJBQU8sY0FBYUMsSUFBYixDQUFrQkQsU0FBbEI7QUFBUDtBQUNIOzs7c0NBRW9CQSxTLEVBQVc7QUFDNUIsbUJBQU8sc0JBQXFCQyxJQUFyQixDQUEwQkQsU0FBMUI7QUFBUDtBQUNIOzs7eUNBQ3VCakQsSSxFQUFNO0FBQzFCLG1CQUFPQSxLQUFLdEQsS0FBTCxJQUFjc0QsS0FBS3RELEtBQUwsQ0FBVzJELGNBQVgsQ0FBMEIsUUFBMUIsQ0FBckI7QUFDSDs7O2lDQUNld0MsSyxFQUFPO0FBQ25CLGdCQUFJQSxVQUFVMUUsU0FBVixJQUF1QjBFLFVBQVUsSUFBakMsSUFBeUNBLFVBQVUsRUFBdkQsRUFBMkQ7QUFDdkQsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFJLE9BQVFBLEtBQVIsS0FBbUIsUUFBdkIsRUFBaUM7QUFDN0I7QUFDQSxvQkFBSU0sV0FBVyxPQUFmO0FBQ0E7QUFDQSxvQkFBSUMsYUFBYSxRQUFqQjtBQUNBO0FBQ0Esb0JBQUlDLGdCQUFnQixrQkFBcEIsQ0FONkIsQ0FNVztBQUN4QyxvQkFBSUMsZ0JBQWdCLFdBQXBCLENBUDZCLENBT0c7QUFDaEM7QUFDQSxvQkFBSUMsa0JBQWtCLG1CQUF0QixDQVQ2QixDQVNjO0FBQzNDLG9CQUFJQyxrQkFBa0IsWUFBdEIsQ0FWNkIsQ0FVTTs7QUFFbkMsb0JBQUlMLFNBQVNELElBQVQsQ0FBY0wsS0FBZCxLQUF3Qk8sV0FBV0YsSUFBWCxDQUFnQkwsS0FBaEIsQ0FBeEIsSUFDR1EsY0FBY0gsSUFBZCxDQUFtQkwsS0FBbkIsQ0FESCxJQUNnQ1MsY0FBY0osSUFBZCxDQUFtQkwsS0FBbkIsQ0FEaEMsSUFFR1UsZ0JBQWdCTCxJQUFoQixDQUFxQkwsS0FBckIsQ0FGSCxJQUVrQ1csZ0JBQWdCTixJQUFoQixDQUFxQkwsS0FBckIsQ0FGdEMsRUFFbUU7QUFDL0QsMkJBQU8sSUFBUDtBQUNILGlCQUpELE1BS0s7QUFDRCwyQkFBTyxLQUFQO0FBQ0g7QUFDSixhQXBCRCxNQXFCSyxJQUFJLE9BQVFBLEtBQVIsS0FBbUIsUUFBdkIsRUFBaUM7QUFDbEMsdUJBQU8sSUFBUDtBQUNILGFBRkksTUFHQTtBQUNELHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7Z0NBR2M3QyxJLEVBQU05QixHLEVBQUsyRSxLLEVBQU87QUFDN0Isb0JBQVEzRSxHQUFSO0FBQ0kscUJBQUssT0FBTDtBQUNJOEIseUJBQUt5RCxLQUFMLENBQVdDLE9BQVgsR0FBcUJiLEtBQXJCO0FBQ0E7QUFDSixxQkFBSyxPQUFMO0FBQ0ksd0JBQUk1RSxXQUFVK0IsS0FBSy9CLE9BQUwsSUFBZ0IsRUFBOUI7QUFDQUEsK0JBQVVBLFNBQVEwRixXQUFSLEVBQVY7QUFDQSx3QkFBSTFGLGFBQVksT0FBWixJQUF1QkEsYUFBWSxVQUF2QyxFQUFtRDtBQUMvQytCLDZCQUFLNkMsS0FBTCxHQUFhQSxLQUFiO0FBQ0gscUJBRkQsTUFFTztBQUNIN0MsNkJBQUs0RCxZQUFMLENBQWtCMUYsR0FBbEIsRUFBdUIyRSxLQUF2QjtBQUNIO0FBQ0Q7QUFDSjtBQUNJN0MseUJBQUs0RCxZQUFMLENBQWtCMUYsR0FBbEIsRUFBdUIyRSxLQUF2QjtBQUNBO0FBZlI7QUFrQkg7OztzQ0FDb0I1RyxPLEVBQVM7QUFDMUIsZ0JBQUlBLE9BQUosRUFBYTtBQUNULG9CQUFJLGdCQUFnQmlILElBQWhCLENBQXFCakgsT0FBckIsQ0FBSixFQUFtQztBQUMvQiwyQkFBTyxJQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPLEtBQVA7QUFDSDtBQUNKLGFBTkQsTUFNTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7Z0RBQzhCQSxPLEVBQVM7QUFDcEMsbUJBQU8sY0FBYWlILElBQWIsQ0FBa0JqSCxPQUFsQjtBQUFQO0FBQ0g7Ozs0Q0FDMEJBLE8sRUFBUztBQUNoQyxtQkFBT0EsUUFBUTRILEtBQVIsQ0FBYyxDQUFkLEVBQWlCLENBQUMsQ0FBbEIsQ0FBUDtBQUNIO0FBQ0Q7Ozs7Ozs7NkNBSTRCNUgsTyxFQUFTOztBQUVqQyxnQkFBSXlDLEtBQUtlLFFBQUwsQ0FBY3hELE9BQWQsQ0FBSixFQUE0QjtBQUN4QixvQkFBSSxrQkFBa0JpSCxJQUFsQixDQUF1QmpILE9BQXZCLENBQUosRUFBcUM7O0FBRWpDLDJCQUFPLElBQVA7QUFDSCxpQkFIRCxNQUdPOztBQUVILDJCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOzs7OENBQzRCQSxPLEVBQVNmLEksRUFBTTRJLE8sRUFBUztBQUNqRCxnQkFBSXBGLEtBQUtlLFFBQUwsQ0FBY3hELE9BQWQsQ0FBSixFQUE0Qjs7QUFFeEIsb0JBQUk4SCxhQUFhOUgsUUFBUTRILEtBQVIsQ0FBYzVILFFBQVErSCxPQUFSLENBQWdCLEdBQWhCLElBQXVCLENBQXJDLEVBQXdDL0gsUUFBUStILE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBeEMsQ0FBakI7QUFDQSxvQkFBSUMsYUFBYUYsV0FBV0MsT0FBWCxDQUFtQixJQUFuQixDQUFqQjtBQUNBLG9CQUFJRSxXQUFXSCxXQUFXQyxPQUFYLENBQW1CLElBQW5CLElBQTJCLENBQTFDO0FBQ0Esb0JBQUlDLGNBQWMsQ0FBQyxDQUFmLElBQW9CQyxZQUFZLENBQUMsQ0FBakMsSUFBc0NELGFBQWFDLFFBQXZELEVBQWlFO0FBQzdELHdCQUFJQyxjQUFjSixXQUFXRixLQUFYLENBQWlCSSxVQUFqQixFQUE2QkMsUUFBN0IsQ0FBbEI7QUFDQSx3QkFBSUUsa0JBQUo7QUFDQSx3QkFBSUQsWUFBWUgsT0FBWixDQUFvQixHQUFwQixJQUEyQixDQUEvQixFQUFrQztBQUM5Qiw0QkFBSXRGLEtBQUsyRixtQkFBTCxDQUF5QkYsV0FBekIsRUFBc0NHLEtBQXRDLENBQTRDLEdBQTVDLEVBQWlELENBQWpELE1BQXdEUixPQUE1RCxFQUFxRTtBQUNqRSxnQ0FBSVMsbUJBQW1CckosS0FBS3dELEtBQUsyRixtQkFBTCxDQUF5QkYsV0FBekIsRUFBc0NHLEtBQXRDLENBQTRDLEdBQTVDLEVBQWlELENBQWpELENBQUwsQ0FBdkI7QUFDQUYsd0NBQVkxRixLQUFLOEYsUUFBTCxDQUFjRCxnQkFBZCxJQUFrQ0EsZ0JBQWxDLFNBQXlEQSxnQkFBekQsTUFBWixDQUZpRSxDQUV1QjtBQUUzRjtBQUdKLHFCQVJELE1BUU87QUFDSEgsb0NBQVlsSixLQUFLd0QsS0FBSzJGLG1CQUFMLENBQXlCRixXQUF6QixDQUFMLENBQVosQ0FERyxDQUNvRDtBQUMxRDs7QUFFREosaUNBQWFBLFdBQVdVLE9BQVgsQ0FBbUJOLFdBQW5CLEVBQWdDQyxTQUFoQyxDQUFiO0FBRUg7QUFDRCx1QkFBT00sS0FBS1gsVUFBTCxDQUFQO0FBQ0g7QUFHSjs7Ozs7O0lBSUN0RCxRO0FBQ0Y7Ozs7OztBQU1BLHNCQUFZa0UsT0FBWixFQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFDMUIsWUFBSUMsa0JBQWtCLEtBQUtDLFlBQUwsQ0FBa0JILE9BQWxCLEVBQTJCSSxRQUFqRDtBQUNBLFlBQUlDLGtCQUFrQixLQUFLRixZQUFMLENBQWtCRixPQUFsQixFQUEyQkcsUUFBakQ7QUFDQSxhQUFLRSxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsYUFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUssSUFBSWxFLEtBQUksQ0FBYixFQUFnQkEsS0FBSTJELFFBQVExRSxNQUE1QixFQUFvQ2UsSUFBcEMsRUFBeUM7QUFDckMsZ0JBQUltRSxVQUFVUixRQUFRM0QsRUFBUixDQUFkO0FBQ0EsZ0JBQUlvRSxXQUFXLEtBQUtDLE1BQUwsQ0FBWUYsT0FBWixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ0gsZ0JBQWdCM0UsY0FBaEIsQ0FBK0IrRSxRQUEvQixDQUFMLEVBQStDO0FBQzNDLHFCQUFLRixTQUFMLENBQWV4RixJQUFmLENBQW9CLElBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUt3RixTQUFMLENBQWV4RixJQUFmLENBQW9Ca0YsUUFBUUksZ0JBQWdCSSxRQUFoQixDQUFSLENBQXBCO0FBQ0g7QUFDSjtBQUNELGFBQUtFLFFBQUwsR0FBZ0IsS0FBS0osU0FBTCxDQUFlckIsS0FBZixDQUFxQixDQUFyQixDQUFoQjtBQUNBLFlBQUk3QyxJQUFJLENBQVI7QUFDQSxlQUFPQSxJQUFJLEtBQUtzRSxRQUFMLENBQWNyRixNQUF6QixFQUFpQztBQUM3QixnQkFBSSxLQUFLcUYsUUFBTCxDQUFjdEUsQ0FBZCxNQUFxQixJQUF6QixFQUErQjtBQUMzQixxQkFBS3VFLE1BQUwsQ0FBWXZFLENBQVo7QUFDQSxxQkFBS3dFLGtCQUFMLENBQXdCeEUsQ0FBeEI7QUFDSCxhQUhELE1BR087QUFDSEE7QUFDSDtBQUNKO0FBQ0QsWUFBSTdCLFFBQVEsQ0FBWjtBQUNBLGFBQUssSUFBSTZCLE1BQUksQ0FBYixFQUFnQkEsTUFBSTRELFFBQVEzRSxNQUE1QixFQUFvQ2UsS0FBcEMsRUFBeUM7QUFDckMsZ0JBQUl5RSxRQUFRYixRQUFRNUQsR0FBUixDQUFaO0FBQ0EsZ0JBQUkwRSxXQUFXLEtBQUtMLE1BQUwsQ0FBWUksS0FBWixDQUFmO0FBQ0EsZ0JBQUlFLFFBQVEsS0FBS0wsUUFBTCxDQUFjbkcsS0FBZCxDQUFaO0FBQ0EsZ0JBQUl5RyxXQUFXLEtBQUtQLE1BQUwsQ0FBWU0sS0FBWixDQUFmO0FBQ0EsZ0JBQUlBLEtBQUosRUFBVztBQUNQLG9CQUFJRCxZQUFZRSxRQUFoQixFQUEwQjtBQUN0Qix3QkFBSWYsZ0JBQWdCeEUsY0FBaEIsQ0FBK0JxRixRQUEvQixDQUFKLEVBQThDO0FBQzFDLDRCQUFJRyxlQUFlUixPQUFPLEtBQUtDLFFBQUwsQ0FBY25HLFFBQVEsQ0FBdEIsQ0FBUCxDQUFuQjtBQUNBLDRCQUFJdUcsYUFBYUcsWUFBakIsRUFBK0I7QUFDM0IsaUNBQUtOLE1BQUwsQ0FBWXZFLEdBQVo7QUFDQSxpQ0FBS3dFLGtCQUFMLENBQXdCckcsS0FBeEI7QUFDQUE7QUFDSCx5QkFKRCxNQUlPO0FBQ0gsaUNBQUsyRyxNQUFMLENBQVk5RSxHQUFaLEVBQWV5RSxLQUFmO0FBQ0g7QUFDSixxQkFURCxNQVNPO0FBQ0gsNkJBQUtLLE1BQUwsQ0FBWTlFLEdBQVosRUFBZXlFLEtBQWY7QUFDSDtBQUNKLGlCQWJELE1BYU87QUFDSHRHO0FBQ0g7QUFDSixhQWpCRCxNQWlCTztBQUNILHFCQUFLMkcsTUFBTCxDQUFZOUUsR0FBWixFQUFleUUsS0FBZjtBQUNIO0FBQ0o7QUFDRCxZQUFJTSxJQUFJLEtBQUtULFFBQUwsQ0FBY3JGLE1BQWQsR0FBdUJkLEtBQS9CO0FBQ0EsZUFBT0EsVUFBVSxLQUFLbUcsUUFBTCxDQUFjckYsTUFBL0IsRUFBdUM7QUFDbkM4RjtBQUNBLGlCQUFLUixNQUFMLENBQVlRLElBQUluQixRQUFRM0UsTUFBeEI7QUFDSDtBQUdKOzs7O3FDQUNZOEMsSSxFQUFNO0FBQ2YsZ0JBQUlnQyxXQUFXLEVBQWY7QUFDQSxpQkFBSyxJQUFJL0QsTUFBSSxDQUFiLEVBQWdCQSxNQUFJK0IsS0FBSzlDLE1BQXpCLEVBQWlDZSxLQUFqQyxFQUFzQztBQUNsQyxvQkFBSXlCLE9BQU9NLEtBQUsvQixHQUFMLENBQVg7QUFDQSxvQkFBSWdGLFVBQVUsS0FBS1gsTUFBTCxDQUFZNUMsSUFBWixDQUFkO0FBQ0FzQyx5QkFBU2lCLE9BQVQsSUFBb0JoRixHQUFwQjtBQUNIO0FBQ0QsbUJBQU87QUFDSCtELDBCQUFVQTtBQURQLGFBQVA7QUFHSDs7OytCQUVNdEMsSSxFQUFNO0FBQ1QsZ0JBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1AsdUJBQU90RSxTQUFQO0FBQ0g7QUFDRCxtQkFBT3NFLEtBQUssS0FBTCxDQUFQO0FBQ0g7OzsyQ0FDa0J0RCxLLEVBQU87QUFDdEIsaUJBQUttRyxRQUFMLENBQWMvQyxNQUFkLENBQXFCcEQsS0FBckIsRUFBNEIsQ0FBNUI7QUFDSDs7OytCQUNNQSxLLEVBQU87QUFDVixpQkFBSzhGLFlBQUwsQ0FBa0J2RixJQUFsQixDQUF1QjtBQUNuQlAsdUJBQU9BLEtBRFk7QUFFbkJRLHNCQUFNO0FBRmEsYUFBdkI7QUFJSDs7OytCQUVNUixLLEVBQU9zRCxJLEVBQU07QUFDaEIsaUJBQUt3QyxZQUFMLENBQWtCdkYsSUFBbEIsQ0FBdUI7QUFDbkJQLHVCQUFPQSxLQURZO0FBRW5Cc0Qsc0JBQU1BLElBRmE7QUFHbkI5QyxzQkFBTTtBQUhhLGFBQXZCO0FBS0g7OztvQ0FFVztBQUNSLG1CQUFPO0FBQ0hpQix1QkFBTyxLQUFLcUUsWUFEVDtBQUVIM0osdUJBQU8sS0FBSzRKO0FBRlQsYUFBUDtBQUlIOzs7Ozs7QUFLTCxTQUFTZSxPQUFULENBQWlCQyxHQUFqQixFQUFzQkMsVUFBdEIsRUFBa0NDLFFBQWxDLEVBQTRDOztBQUV4Q0MsV0FBT0MsSUFBUCxDQUFZSixHQUFaLEVBQWlCNUgsT0FBakIsQ0FBeUIsZUFBTztBQUM1QixZQUFJaUksZ0JBQWdCTCxJQUFJaEksR0FBSixDQUFwQjtBQUNBLFlBQUlzSSxhQUFhLElBQUlDLFVBQUosRUFBakI7QUFDQSxZQUFJRix5QkFBeUJGLE1BQTdCLEVBQXFDO0FBQ2pDSixvQkFBUU0sYUFBUixFQUF1QkosVUFBdkIsRUFBbUNDLFFBQW5DO0FBQ0g7QUFDREQsbUJBQVdPLEdBQVgsQ0FBZXhJLEdBQWYsRUFBb0JzSSxVQUFwQjtBQUNBSCxlQUFPTSxjQUFQLENBQXNCVCxHQUF0QixFQUEyQmhJLEdBQTNCLEVBQWdDO0FBQzVCMEksZUFENEIsaUJBQ3RCO0FBQ0ZKLDJCQUFXSyxHQUFYLENBQWVULFFBQWY7QUFDQSx1QkFBT0csYUFBUDtBQUNILGFBSjJCO0FBSzVCTyxlQUw0QixlQUt4QkMsTUFMd0IsRUFLaEI7QUFDUixvQkFBTUMsVUFBVVQsa0JBQWtCUSxNQUFsQztBQUNBUixnQ0FBZ0JRLE1BQWhCO0FBQ0Esb0JBQUlDLE9BQUosRUFBYTtBQUNUUiwrQkFBV1MsTUFBWDtBQUNIO0FBQ0o7QUFYMkIsU0FBaEM7QUFhSCxLQXBCRDtBQXFCQSxXQUFPZixHQUFQO0FBQ0g7O0lBR0tPLFU7QUFDRiwwQkFBYztBQUFBOztBQUNWLGFBQUtTLGVBQUwsR0FBdUIsSUFBSUMsR0FBSixFQUF2QjtBQUNIOzs7OzRCQUNHQyxnQixFQUFrQjtBQUNsQixpQkFBS0YsZUFBTCxDQUFxQkwsR0FBckIsQ0FBeUJPLGdCQUF6QjtBQUNIOzs7aUNBQ1E7QUFDTCxpQkFBS0YsZUFBTCxDQUFxQjVJLE9BQXJCLENBQTZCO0FBQUEsdUJBQU8rSSxLQUFQO0FBQUEsYUFBN0I7QUFDSDs7Ozs7O0FBS0w7Ozs7OztBQUlBLFNBQVNDLEtBQVQsQ0FBZXBCLEdBQWYsRUFBb0I7QUFDaEIsUUFBSXFCLFVBQVUsU0FBVkEsT0FBVSxDQUFDQyxDQUFELEVBQU87QUFDakIsWUFBSUEsTUFBTSxJQUFWLEVBQWdCLE9BQU8sTUFBUDtBQUNoQixZQUFJQSxNQUFNckosU0FBVixFQUFxQixPQUFPLFdBQVA7QUFDckIsZUFBT2tJLE9BQU9vQixTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JILENBQS9CLEVBQWtDM0QsS0FBbEMsQ0FBd0MsQ0FBeEMsRUFBMkMsQ0FBQyxDQUE1QyxDQUFQO0FBQ0gsS0FKRDtBQUtBLFFBQUkrRCxlQUFKO0FBQUEsUUFBWUMsU0FBU04sUUFBUXJCLEdBQVIsQ0FBckI7QUFDQSxRQUFJMkIsV0FBVyxRQUFmLEVBQXlCO0FBQ3JCRCxpQkFBUyxFQUFUO0FBQ0gsS0FGRCxNQUVPLElBQUlDLFdBQVcsT0FBZixFQUF3QjtBQUMzQkQsaUJBQVMsRUFBVDtBQUNILEtBRk0sTUFFQTtBQUNILGVBQU8xQixHQUFQO0FBQ0g7QUFDRCxTQUFLaEksR0FBTCxJQUFZZ0ksR0FBWixFQUFpQjtBQUNiLFlBQUk0QixPQUFPNUIsSUFBSWhJLEdBQUosQ0FBWDtBQUNBLFlBQUlxSixRQUFRTyxJQUFSLEtBQWlCLFFBQXJCLEVBQStCO0FBQzNCRixtQkFBTzFKLEdBQVAsSUFBYzZKLFVBQVVDLE1BQVYsQ0FBaUJGLElBQWpCLENBQWQ7QUFDSCxTQUZELE1BRU8sSUFBSVAsUUFBUU8sSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUNqQ0YsbUJBQU8xSixHQUFQLElBQWM2SixVQUFVQyxNQUFWLENBQWlCRixJQUFqQixDQUFkO0FBQ0gsU0FGTSxNQUVBO0FBQ0hGLG1CQUFPMUosR0FBUCxJQUFjZ0ksSUFBSWhJLEdBQUosQ0FBZDtBQUNIO0FBQ0o7QUFDRCxXQUFPMEosTUFBUDtBQUNIOztBQUdELFNBQVNLLENBQVQsQ0FBV2hLLE9BQVgsRUFBb0J2QixLQUFwQixFQUEyQnNCLFFBQTNCLEVBQXFDO0FBQ2pDLFdBQU8sSUFBSUYsT0FBSixDQUFZRyxPQUFaLEVBQXFCdkIsS0FBckIsRUFBNEJzQixRQUE1QixDQUFQO0FBQ0g7O0FBRUQsU0FBU2tLLElBQVQsQ0FBY2pKLE9BQWQsRUFBdUJDLE9BQXZCLEVBQWdDO0FBQzVCLFFBQUlpSixJQUFJLElBQUluSixJQUFKLENBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLENBQVI7QUFDQSxXQUFPaUosRUFBRS9JLE9BQVQ7QUFDSDs7QUFHRCxTQUFTZ0osS0FBVCxDQUFlcEksSUFBZixFQUFxQlosT0FBckIsRUFBOEI7QUFDMUIsV0FBTyxJQUFJOEIsS0FBSixDQUFVbEIsSUFBVixFQUFnQlosT0FBaEIsQ0FBUDtBQUNIOztBQU1EOzs7O0lBR01pSixHO0FBQ0YsbUJBQWM7QUFBQTs7QUFDVixhQUFLcEksTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLcUksR0FBTCxHQUFXLElBQUlqQyxNQUFKLEVBQVg7QUFDSDs7Ozs0QkFDR25JLEcsRUFBSzJFLEssRUFBTztBQUNaLGdCQUFJLEVBQUUzRSxPQUFPLEtBQUtvSyxHQUFkLENBQUosRUFBd0I7QUFDcEIscUJBQUtySSxNQUFMO0FBQ0g7QUFDRCxpQkFBS3FJLEdBQUwsQ0FBU3BLLEdBQVQsSUFBZ0IyRSxLQUFoQjtBQUNIOzs7NEJBQ0czRSxHLEVBQUs7QUFDTCxtQkFBUUEsT0FBTyxLQUFLb0ssR0FBYixHQUFvQixLQUFLQSxHQUFMLENBQVNwSyxHQUFULENBQXBCLEdBQW9DLElBQTNDO0FBQ0g7OzsrQkFDTUEsRyxFQUFLO0FBQ1IsZ0JBQUtBLE9BQU8sS0FBS29LLEdBQWpCLEVBQXVCO0FBQ25CLHVCQUFPLEtBQUtBLEdBQUwsQ0FBU3BLLEdBQVQsQ0FBUDtBQUNBLHFCQUFLK0IsTUFBTDtBQUNIO0FBQ0o7OzsrQkFDTS9CLEcsRUFBSztBQUNSLG1CQUFRQSxPQUFPLEtBQUtvSyxHQUFwQjtBQUNIOzs7Z0NBQ09sQyxRLEVBQVU7QUFBQTs7QUFDZEMsbUJBQU9DLElBQVAsQ0FBWSxLQUFLZ0MsR0FBakIsRUFBc0JoSyxPQUF0QixDQUE4QixrQkFBVTtBQUNwQzhILHlCQUFTLE9BQUtrQyxHQUFMLENBQVNDLE1BQVQsQ0FBVDtBQUNILGFBRkQ7QUFHSDs7OytCQUNNO0FBQ0gsbUJBQU8sS0FBS3RJLE1BQVo7QUFDSDs7O2dDQUNPO0FBQ0pBLHFCQUFTLENBQVQ7QUFDQSxpQkFBS3FJLEdBQUwsR0FBVyxJQUFJakMsTUFBSixFQUFYO0FBQ0g7Ozs7O0FBRUw7Ozs7OztJQUlNbUMsUTtBQUNGLHdCQUFjO0FBQUE7O0FBQ1YsYUFBS0MsV0FBTCxHQUFtQixJQUFJSixHQUFKLEVBQW5CO0FBQ0EsYUFBS0ssTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLQyxJQUFMLEdBQVksSUFBSU4sR0FBSixFQUFaO0FBQ0EsYUFBS08sT0FBTCxHQUFlLDREQUFmO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQjtBQUNaQywwQkFBYyxzQkFBVTdLLE9BQVYsRUFBbUI4SyxJQUFuQixFQUF5QjlNLE9BQXpCLEVBQWtDK00sSUFBbEMsRUFBd0M7QUFDbERBLHFCQUFLTixNQUFMLElBQWUsQ0FBZjtBQUNBLG9CQUFJTSxLQUFLUCxXQUFMLENBQWlCUSxNQUFqQixDQUF3QmhMLE9BQXhCLENBQUosRUFBc0M7QUFDbEM7QUFDQTdCLDRCQUFRQyxHQUFSLENBQVksY0FBY1MsS0FBS0MsU0FBTCxDQUFlaU0sS0FBS1AsV0FBTCxDQUFpQjdCLEdBQWpCLENBQXFCM0ksT0FBckIsRUFBOEJpTCxPQUE5QixFQUFmLENBQTFCO0FBQ0E5TSw0QkFBUUMsR0FBUixDQUFZLGFBQWFTLEtBQUtDLFNBQUwsQ0FBZWlNLEtBQUtQLFdBQUwsQ0FBaUI3QixHQUFqQixDQUFxQjNJLE9BQXJCLEVBQThCa0wsTUFBOUIsRUFBZixDQUF6QjtBQUNBL00sNEJBQVFDLEdBQVIsY0FBdUI0QixPQUF2QixlQUF3Q25CLEtBQUtDLFNBQUwsQ0FBZWdNLElBQWYsQ0FBeEM7O0FBRUFDLHlCQUFLUCxXQUFMLENBQWlCN0IsR0FBakIsQ0FBcUIzSSxPQUFyQixFQUE4Qm1MLEtBQTlCLENBQW9DTCxJQUFwQztBQUNBQyx5QkFBS0wsSUFBTCxDQUFVakMsR0FBVixDQUFjc0MsS0FBS04sTUFBbkIsRUFBMkJNLEtBQUtQLFdBQUwsQ0FBaUI3QixHQUFqQixDQUFxQjNJLE9BQXJCLEVBQThCa0wsTUFBOUIsRUFBM0I7QUFFSCxpQkFURCxNQVNPO0FBQ0gsd0JBQUlqRCxNQUFNLEVBQUVuSSxLQUFLRSxPQUFQLEVBQWdCdkIsT0FBT3FNLElBQXZCLEVBQTZCL0ssVUFBVSxFQUF2QyxFQUEyQ21CLE9BQU82SixLQUFLTixNQUF2RCxFQUErRHpNLFNBQVNBLE9BQXhFLEVBQWlGb04sU0FBUyxLQUExRixFQUFWOztBQUVBLHdCQUFJcE4sUUFBUWdFLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7O0FBRXBCaUcsNEJBQUlsSSxRQUFKLENBQWEwQixJQUFiLENBQWtCekQsUUFBUXFOLElBQVIsRUFBbEI7QUFDSDtBQUNETix5QkFBS0wsSUFBTCxDQUFVakMsR0FBVixDQUFjc0MsS0FBS04sTUFBbkIsRUFBMkJ4QyxHQUEzQjtBQUNIO0FBRUosYUF0Qlc7QUF1QlpxRCx3QkFBWSxvQkFBVVAsSUFBVixFQUFnQjtBQUN4QkEscUJBQUtMLElBQUwsQ0FBVS9CLEdBQVYsQ0FBY29DLEtBQUtOLE1BQW5CLEVBQTJCVyxPQUEzQixHQUFxQyxJQUFyQztBQUNBLG9CQUFJTCxLQUFLTCxJQUFMLENBQVVNLE1BQVYsQ0FBa0JELEtBQUtOLE1BQUwsR0FBYyxDQUFoQyxDQUFKLEVBQXlDO0FBQ3JDTSx5QkFBS0wsSUFBTCxDQUFVL0IsR0FBVixDQUFjb0MsS0FBS04sTUFBTCxHQUFjLENBQTVCLEVBQStCMUssUUFBL0IsQ0FBd0MwQixJQUF4QyxDQUE2Q3NKLEtBQUtMLElBQUwsQ0FBVS9CLEdBQVYsQ0FBY29DLEtBQUtOLE1BQW5CLENBQTdDO0FBQ0FNLHlCQUFLTCxJQUFMLENBQVVwRCxNQUFWLENBQWlCeUQsS0FBS04sTUFBdEI7QUFDSDtBQUNETSxxQkFBS04sTUFBTCxJQUFlLENBQWY7QUFDSDs7QUE5QlcsU0FBaEI7QUFtQ0g7QUFDRDs7Ozs7Ozs7MkNBSW1CYyxXLEVBQWE7O0FBRTVCLGlCQUFLZixXQUFMLENBQWlCL0IsR0FBakIsQ0FBcUI4QyxZQUFZQyxPQUFaLEVBQXJCLEVBQTRDRCxXQUE1QztBQUNIOzs7MENBQ2lCRSxJLEVBQU07QUFDcEIsZ0JBQUlDLFlBQVksSUFBSXZPLElBQUosS0FBYSxJQUE3QjtBQUNBLGdCQUFJK0QsUUFBUSxDQUFaO0FBQ0EsbUJBQU91SyxJQUFQLEVBQWE7QUFDVCxvQkFBSUUsZUFBZUYsS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLENBQW5CO0FBQ0Esb0JBQUk2RixnQkFBZ0JILEtBQUsxRixPQUFMLENBQWEsR0FBYixLQUFxQjBGLEtBQUsxRixPQUFMLENBQWEsSUFBYixDQUF6QztBQUNBLG9CQUFJOEYsYUFBYUosS0FBSzFGLE9BQUwsQ0FBYSxJQUFiLENBQWpCO0FBQ0Esb0JBQUkrRixjQUFjTCxLQUFLMUYsT0FBTCxDQUFhLEdBQWIsQ0FBbEI7QUFDQSxvQkFBSWdHLG1CQUFtQk4sS0FBSzFGLE9BQUwsQ0FBYSxNQUFiLENBQXZCO0FBQ0Esb0JBQUlpRyxrQkFBa0JQLEtBQUsxRixPQUFMLENBQWEsS0FBYixDQUF0QjtBQUNBLG9CQUFJZ0csb0JBQW9CLENBQXBCLElBQXlCQyxtQkFBbUIsQ0FBQyxDQUE3QyxJQUFrREEsa0JBQWtCRCxnQkFBeEUsRUFBMEY7QUFDdEY3Syw0QkFBUThLLGtCQUFrQixDQUExQjtBQUNBQyxpQ0FBYVIsS0FBS1MsU0FBTCxDQUFlSCxtQkFBbUIsQ0FBbEMsRUFBcUNDLGtCQUFrQixDQUF2RCxDQUFiO0FBQ0FQLDJCQUFPQSxLQUFLUyxTQUFMLENBQWVoTCxLQUFmLENBQVA7QUFDQTtBQUNILGlCQUxELE1BS08sSUFBSTJLLGNBQWMsQ0FBQyxDQUFmLElBQW9CQyxlQUFlLENBQUMsQ0FBcEMsSUFBeUNBLGNBQWNELFVBQTNELEVBQXVFO0FBQzFFM0ssNEJBQVE0SyxjQUFjLENBQXRCO0FBQ0FLLGlDQUFhVixLQUFLUyxTQUFMLENBQWVMLFVBQWYsRUFBMkJDLGNBQWMsQ0FBekMsQ0FBYixFQUEwRCxJQUExRDtBQUNBTCwyQkFBT0EsS0FBS1MsU0FBTCxDQUFlaEwsS0FBZixDQUFQO0FBQ0E7QUFDSCxpQkFMTSxNQUtBLElBQUl5SyxnQkFBZ0IsQ0FBQyxDQUFqQixJQUFzQkMsaUJBQWlCLENBQUMsQ0FBeEMsSUFBNkNBLGdCQUFnQkQsWUFBakUsRUFBK0U7QUFDbEZ6Syw0QkFBUTBLLGdCQUFnQixDQUF4QjtBQUNBLHdCQUFJNU4sVUFBVSxFQUFkO0FBQ0Esd0JBQUl5TixLQUFLMUYsT0FBTCxDQUFhLEdBQWIsRUFBa0I3RSxLQUFsQixJQUEyQixDQUFDLENBQTVCLElBQWlDdUssS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLEVBQWtCN0UsS0FBbEIsSUFBMkIwSyxhQUFoRSxFQUErRTtBQUMzRTtBQUNBNU4sa0NBQVV5TixLQUFLUyxTQUFMLENBQWVoTCxLQUFmLEVBQXNCdUssS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLEVBQWtCN0UsS0FBbEIsQ0FBdEIsRUFBZ0RtSyxJQUFoRCxFQUFWO0FBQ0g7QUFDRGUsbUNBQWVYLEtBQUtTLFNBQUwsQ0FBZVAsWUFBZixFQUE2QkMsZ0JBQWdCLENBQTdDLENBQWYsRUFBZ0U1TixPQUFoRSxFQUF5RSxJQUF6RTtBQUNBeU4sMkJBQU9BLEtBQUtTLFNBQUwsQ0FBZWhMLEtBQWYsQ0FBUDtBQUNBO0FBQ0g7QUFDSjtBQUNELGdCQUFJbUwsVUFBVSxJQUFJbFAsSUFBSixLQUFhLElBQTNCO0FBQ0FnQixvQkFBUUMsR0FBUix3QkFBZ0NpTyxVQUFVWCxTQUExQzs7QUFJQSxxQkFBU1UsY0FBVCxDQUF3QlgsSUFBeEIsRUFBOEJ6TixPQUE5QixFQUF1QytNLElBQXZDLEVBQTZDO0FBQ3pDLG9CQUFJdUIsbUJBQW1CYixLQUFLMUYsT0FBTCxDQUFhLEdBQWIsS0FBcUIsQ0FBQyxDQUF0QixHQUEwQjBGLEtBQUsxRixPQUFMLENBQWEsR0FBYixDQUExQixHQUE4QzBGLEtBQUsxRixPQUFMLENBQWEsSUFBYixLQUFzQixDQUFDLENBQXZCLEdBQTJCMEYsS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLENBQTNCLEdBQStDMEYsS0FBSzFGLE9BQUwsQ0FBYSxJQUFiLENBQXBIO0FBQ0Esb0JBQUkvRixVQUFVeUwsS0FBS1MsU0FBTCxDQUFlVCxLQUFLMUYsT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBbkMsRUFBc0N1RyxnQkFBdEMsQ0FBZDtBQUNBLG9CQUFJeEIsT0FBTyxFQUFYO0FBQ0Esb0JBQUlXLEtBQUsxRixPQUFMLENBQWEsR0FBYixJQUFvQixDQUFDLENBQXpCLEVBQTRCO0FBQ3hCLHdCQUFJdEgsUUFBUWdOLEtBQUtTLFNBQUwsQ0FBZVQsS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLElBQW9CLENBQW5DLEVBQXNDMEYsS0FBSzFGLE9BQUwsQ0FBYSxHQUFiLENBQXRDLENBQVo7O0FBRUEsd0JBQUl3RyxjQUFjOU4sTUFBTStOLEtBQU4sQ0FBWXpCLEtBQUtKLE9BQWpCLENBQWxCO0FBQ0EseUJBQUssSUFBSTVILE1BQUksQ0FBYixFQUFnQkEsTUFBSXdKLFlBQVl2SyxNQUFoQyxFQUF3Q2UsS0FBeEMsRUFBNkM7QUFDekMsNEJBQUkwSixLQUFLRixZQUFZeEosR0FBWixDQUFUOztBQUVBK0gsNkJBQUsyQixHQUFHcEcsS0FBSCxDQUFTLEdBQVQsRUFBYyxDQUFkLENBQUwsSUFBeUJvRyxHQUFHcEcsS0FBSCxDQUFTLEdBQVQsRUFBYyxDQUFkLEVBQWlCbUcsS0FBakIsQ0FBdUIsZ0JBQXZCLEVBQXlDLENBQXpDLENBQXpCO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSXpCLEtBQUtILFFBQVQsRUFBbUI7QUFDZix3QkFBSSxpQkFBaUIzRixJQUFqQixDQUFzQmpILE9BQXRCLENBQUosRUFBb0M7QUFDaENBLGtDQUFVQSxRQUFRd08sS0FBUixDQUFjLGdCQUFkLEVBQWdDLENBQWhDLENBQVY7QUFDSDtBQUNEekIseUJBQUtILFFBQUwsQ0FBY0MsWUFBZCxDQUEyQjdLLE9BQTNCLEVBQW9DOEssSUFBcEMsRUFBMEM5TSxPQUExQyxFQUFtRCtNLElBQW5EO0FBQ0g7QUFFSjtBQUNELHFCQUFTb0IsWUFBVCxDQUFzQlYsSUFBdEIsRUFBNEJWLElBQTVCLEVBQWtDO0FBQzlCLG9CQUFJQSxLQUFLSCxRQUFULEVBQW1CO0FBQ2ZHLHlCQUFLSCxRQUFMLENBQWNVLFVBQWQsQ0FBeUJQLElBQXpCO0FBQ0g7QUFDSjtBQUNELHFCQUFTa0IsWUFBVCxDQUFzQlIsSUFBdEIsRUFBNEI7QUFDeEI7QUFDSDtBQUVKOzs7cUNBQ1k7QUFDVCxtQkFBTyxLQUFLZixJQUFMLENBQVUvQixHQUFWLENBQWMsQ0FBZCxDQUFQO0FBQ0g7Ozs7OztJQUdDK0QsVztBQUNGLHlCQUFZQyxjQUFaLEVBQTRCO0FBQUE7O0FBQUEsWUFDbEJDLEdBRGtCLEdBQ3FCRCxjQURyQixDQUNsQkMsR0FEa0I7QUFBQSxZQUNibk8sS0FEYSxHQUNxQmtPLGNBRHJCLENBQ2JsTyxLQURhO0FBQUEsWUFDTkYsSUFETSxHQUNxQm9PLGNBRHJCLENBQ05wTyxJQURNO0FBQUEsWUFDQXRCLElBREEsR0FDcUIwUCxjQURyQixDQUNBMVAsSUFEQTtBQUFBLFlBQ00wQixHQUROLEdBQ3FCZ08sY0FEckIsQ0FDTWhPLEdBRE47QUFBQSxZQUNXVSxLQURYLEdBQ3FCc04sY0FEckIsQ0FDV3ROLEtBRFg7O0FBRXhCLGFBQUt1TixHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFLQyxJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQSxhQUFLcE8sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS3RCLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUs2UCxZQUFMLEdBQW9Cbk8sR0FBcEI7QUFDQSxhQUFLb08sU0FBTCxHQUFpQixJQUFJQyxTQUFKLENBQWMvUCxJQUFkLENBQWpCO0FBQ0EsYUFBS2lMLFVBQUwsR0FBa0IsSUFBSWtDLEdBQUosRUFBbEI7QUFDQSxhQUFLNkMsUUFBTCxHQUFnQjVOLEtBQWhCO0FBQ0EsYUFBSzZOLGlCQUFMO0FBQ0g7Ozs7NENBQ21CO0FBQ2hCL08sb0JBQVFDLEdBQVIsaUJBQTBCUyxLQUFLQyxTQUFMLENBQWUsS0FBSytOLElBQXBCLENBQTFCO0FBQ0EsaUJBQUtBLElBQUwsR0FBWSxLQUFLRSxTQUFMLENBQWVJLGlCQUFmLENBQWlDLEtBQUtQLEdBQXRDLENBQVo7QUFDQXpPLG9CQUFRQyxHQUFSLGdCQUF5QlMsS0FBS0MsU0FBTCxDQUFlLEtBQUsrTixJQUFwQixDQUF6QjtBQUNIOzs7OEJBQ0s7QUFDRixpQkFBS0MsWUFBTCxDQUFrQnBELElBQWxCLENBQXVCLElBQXZCO0FBQ0g7OztrQ0FDUztBQUNOLG1CQUFPLEtBQUtuTCxJQUFaO0FBQ0g7Ozs4QkFDS0UsSyxFQUFPO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUVULHFDQUFpQjJKLE9BQU9DLElBQVAsQ0FBWSxLQUFLNUosS0FBakIsQ0FBakIsOEhBQTBDO0FBQUEsd0JBQWpDcU0sSUFBaUM7OztBQUV0Qyx3QkFBSXJNLE1BQU1xTSxJQUFOLENBQUosRUFBaUI7QUFDYiw2QkFBS3JNLEtBQUwsQ0FBV3FNLElBQVgsSUFBbUJyTSxNQUFNcU0sSUFBTixDQUFuQjtBQUNIO0FBRUo7QUFSUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVVo7OztpQ0FFUTtBQUNMLG1CQUFPLEtBQUsrQixJQUFaO0FBQ0g7OztrQ0FDUztBQUNOLG1CQUFPLEtBQUtwTyxLQUFaO0FBQ0g7Ozs7O0FBR0w7Ozs7OztJQUlNdU8sUztBQUNGLHVCQUFZL1AsSUFBWixFQUFrQjtBQUFBOztBQUNkLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIOzs7OzBDQUVpQjJQLEcsRUFBSztBQUFBOztBQUNuQixnQkFBSTdNLFdBQVcsRUFBZjtBQUNBLGlCQUFLLElBQUkxQyxLQUFULElBQWtCdVAsSUFBSTdNLFFBQXRCLEVBQWdDO0FBQzVCLG9CQUFJcU4sS0FBS1IsSUFBSTdNLFFBQUosQ0FBYTFDLEtBQWIsQ0FBVDtBQUNBLG9CQUFJK1AsY0FBY0MsS0FBbEIsRUFBeUI7QUFDckJELHVCQUFHL00sT0FBSCxDQUFXLGFBQUs7QUFDWiw0QkFBSWlOLElBQUksT0FBS0MsaUJBQUwsQ0FBdUJDLENBQXZCLENBQVI7QUFDQXpOLGlDQUFTMEIsSUFBVCxDQUFjNkwsQ0FBZDtBQUNILHFCQUhEO0FBSUgsaUJBTEQsTUFLTyxJQUFJRixjQUFjaEYsTUFBbEIsRUFBMEI7QUFDN0Isd0JBQUlrRixJQUFJLEtBQUtDLGlCQUFMLENBQXVCSCxFQUF2QixDQUFSO0FBQ0FyTiw2QkFBUzBCLElBQVQsQ0FBYzZMLENBQWQ7QUFDSCxpQkFITSxNQUdBO0FBQ0h2Tiw2QkFBUzBCLElBQVQsQ0FBYzJMLEVBQWQ7QUFDSDtBQUNKOztBQUVELG1CQUFPcEQsRUFBRTRDLElBQUk5TSxHQUFOLEVBQVc4TSxJQUFJbk8sS0FBZixFQUFzQnNCLFFBQXRCLENBQVA7QUFDSDs7OzBDQUNpQjZNLEcsRUFBSztBQUFBOztBQUNuQixnQkFBSSxTQUFTQSxJQUFJbk8sS0FBakIsRUFBd0I7QUFDcEIsb0JBQUlnUCxZQUFZLEVBQWhCO0FBQ0Esb0JBQUlDLG1CQUFKOztBQUVBLG9CQUFJak4sS0FBS2tOLE9BQUwsQ0FBYWYsSUFBSW5PLEtBQUosQ0FBVSxLQUFWLENBQWIsQ0FBSixFQUFvQztBQUNoQyx3QkFBSSxxQkFBcUJtTyxHQUF6QixFQUE4QjtBQUMxQmEsb0NBQVliLElBQUkzUCxJQUFoQjtBQUNBeVEscUNBQWFkLElBQUlnQixlQUFqQjtBQUNILHFCQUhELE1BR08sSUFBSSxnQkFBZ0JoQixHQUFwQixFQUF5QjtBQUM1Qiw0QkFBSUEsSUFBSW5PLEtBQUosQ0FBVSxLQUFWLEVBQWlCNEgsS0FBakIsQ0FBdUIsUUFBdkIsRUFBaUMsQ0FBakMsTUFBd0N1RyxJQUFJaUIsVUFBaEQsRUFBNEQ7QUFDeERKLHdDQUFZYixJQUFJM1AsSUFBaEI7QUFDSDtBQUNEeVEscUNBQWFkLElBQUluTyxLQUFKLENBQVUsS0FBVixFQUFpQjRILEtBQWpCLENBQXVCLFFBQXZCLEVBQWlDLENBQWpDLENBQWI7QUFFSCxxQkFOTSxNQU9GO0FBQ0RvSCxvQ0FBWXhRLEtBQUsyUCxJQUFJbk8sS0FBSixDQUFVLEtBQVYsRUFBaUI0SCxLQUFqQixDQUF1QixRQUF2QixFQUFpQyxDQUFqQyxDQUFMLENBQVo7O0FBRUFxSCxxQ0FBYWQsSUFBSW5PLEtBQUosQ0FBVSxLQUFWLEVBQWlCNEgsS0FBakIsQ0FBdUIsUUFBdkIsRUFBaUMsQ0FBakMsQ0FBYjtBQUNIO0FBRUosaUJBakJELE1BaUJPO0FBQ0gsMEJBQU0sSUFBSWxHLEtBQUosQ0FBVSw2QkFBVixDQUFOO0FBQ0g7QUFDRCxvQkFBSTJOLE9BQU8sRUFBWDs7QUFFQUwsMEJBQVVwTixPQUFWLENBQWtCLGdCQUFROztBQUV0Qix3QkFBSTRILE1BQU0sT0FBSzhGLFNBQUwsQ0FBZW5CLEdBQWYsRUFBb0IzUCxJQUFwQixFQUEwQnlRLFVBQTFCLEVBQXNDelEsSUFBdEMsQ0FBVjs7QUFFQTZRLHlCQUFLck0sSUFBTCxDQUFVd0csR0FBVjtBQUNILGlCQUxEO0FBUUEsdUJBQU82RixJQUFQO0FBQ0gsYUFuQ0QsTUFtQ087O0FBRUgsb0JBQUk3USxjQUFKO0FBQ0Esb0JBQUkyUSx3QkFBSjtBQUNBLG9CQUFJLFVBQVVoQixHQUFkLEVBQW1CO0FBQ2YzUCw0QkFBTzJQLElBQUkzUCxJQUFYO0FBQ0EyUSxzQ0FBa0JoQixJQUFJZ0IsZUFBdEI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gzUSw0QkFBTyxLQUFLQSxJQUFaO0FBQ0EyUSxzQ0FBa0IxTixTQUFsQjtBQUNIOztBQUVELG9CQUFJK0gsTUFBTSxLQUFLOEYsU0FBTCxDQUFlbkIsR0FBZixFQUFvQjNQLEtBQXBCLEVBQTBCMlEsZUFBMUIsRUFBMkMzUSxLQUEzQyxDQUFWOztBQUVBLHVCQUFPZ0wsR0FBUDtBQUNIO0FBQ0o7QUFDRDs7Ozs7Ozs7OztrQ0FPVTJFLEcsRUFBSzNQLEksRUFBTXlRLFUsRUFBWU0sSyxFQUFPO0FBQ3BDLGdCQUFJL0YsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJbkksR0FBSixHQUFVOE0sSUFBSTlNLEdBQWQ7QUFDQW1JLGdCQUFJbEksUUFBSixHQUFlLEVBQWY7QUFDQWtJLGdCQUFJeEosS0FBSixHQUFZLEVBQVo7QUFDQSxnQkFBSUEsUUFBUTJKLE9BQU9DLElBQVAsQ0FBWXVFLElBQUluTyxLQUFoQixDQUFaO0FBQ0EsaUJBQUssSUFBSXFNLElBQVQsSUFBaUJyTSxLQUFqQixFQUF3QjtBQUNwQixvQkFBSW1HLFFBQVFuRyxNQUFNcU0sSUFBTixDQUFaO0FBQ0Esb0JBQUlsRyxVQUFVLE9BQWQsRUFBdUI7QUFDbkIsd0JBQUlZLFFBQVFvSCxJQUFJbk8sS0FBSixDQUFVbUcsS0FBVixDQUFaOztBQUVBLHdCQUFJWSxNQUFNTyxPQUFOLENBQWMsR0FBZCxJQUFxQixDQUFDLENBQTFCLEVBQTZCO0FBQ3pCLDRCQUFJa0ksU0FBU3pJLE1BQU1hLEtBQU4sQ0FBWSxHQUFaLENBQWI7QUFDQTRCLDRCQUFJeEosS0FBSixDQUFVbUcsS0FBVixJQUFtQixLQUFLc0osZ0JBQUwsQ0FBc0JqUixJQUF0QixFQUE0QmdSLE1BQTVCLEVBQW9DUCxVQUFwQyxDQUFuQjtBQUNILHFCQUhELE1BR087O0FBRUh6Riw0QkFBSXhKLEtBQUosQ0FBVW1HLEtBQVYsSUFBbUIsS0FBS3VKLGlCQUFMLENBQXVCbFIsSUFBdkIsRUFBNkJ1SSxLQUE3QixFQUFvQ2tJLFVBQXBDLENBQW5CO0FBQ0g7QUFDSixpQkFWRCxNQVdLO0FBQ0Qsd0JBQUlqTixLQUFLMk4sYUFBTCxDQUFtQnhCLElBQUluTyxLQUFKLENBQVVtRyxLQUFWLENBQW5CLENBQUosRUFBMEM7QUFDdEMsNEJBQUksQ0FBQ25FLEtBQUs0Tix1QkFBTCxDQUE2QjVOLEtBQUsyRixtQkFBTCxDQUF5QndHLElBQUluTyxLQUFKLENBQVVtRyxLQUFWLENBQXpCLENBQTdCLENBQUwsRUFBK0U7QUFDM0VxRCxnQ0FBSXhKLEtBQUosQ0FBVW1HLEtBQVYsSUFBbUJvSixNQUFNdk4sS0FBSzJGLG1CQUFMLENBQXlCd0csSUFBSW5PLEtBQUosQ0FBVW1HLEtBQVYsQ0FBekIsQ0FBTixDQUFuQjtBQUNILHlCQUZELE1BRU87QUFDSHFELGdDQUFJeEosS0FBSixDQUFVbUcsS0FBVixJQUFtQjNILEtBQUt3RCxLQUFLMkYsbUJBQUwsQ0FBeUJ3RyxJQUFJbk8sS0FBSixDQUFVbUcsS0FBVixDQUF6QixFQUEyQ3lCLEtBQTNDLENBQWlELEdBQWpELEVBQXNELENBQXRELENBQUwsQ0FBbkI7QUFDSDtBQUNKLHFCQU5ELE1BTU8sSUFBSTVGLEtBQUs2TixvQkFBTCxDQUEwQjFCLElBQUluTyxLQUFKLENBQVVtRyxLQUFWLENBQTFCLENBQUosRUFBaUQ7O0FBRXBEcUQsNEJBQUl4SixLQUFKLENBQVVtRyxLQUFWLElBQW1CbkUsS0FBSzhOLHFCQUFMLENBQTJCM0IsSUFBSW5PLEtBQUosQ0FBVW1HLEtBQVYsQ0FBM0IsRUFBNkMzSCxJQUE3QyxFQUFtRHlRLFVBQW5ELENBQW5CO0FBQ0gscUJBSE0sTUFJRjtBQUNEekYsNEJBQUl4SixLQUFKLENBQVVtRyxLQUFWLElBQW1CZ0ksSUFBSW5PLEtBQUosQ0FBVW1HLEtBQVYsQ0FBbkI7QUFDSDtBQUVKO0FBRUo7O0FBRUQsaUJBQUssSUFBSXZILEtBQVQsSUFBa0J1UCxJQUFJN00sUUFBdEIsRUFBZ0M7QUFDNUIsb0JBQUlVLEtBQUtlLFFBQUwsQ0FBY29MLElBQUk3TSxRQUFKLENBQWExQyxLQUFiLENBQWQsQ0FBSixFQUF3QztBQUNwQyx3QkFBSW9ELEtBQUsyTixhQUFMLENBQW1CeEIsSUFBSTdNLFFBQUosQ0FBYTFDLEtBQWIsQ0FBbkIsQ0FBSixFQUE2QztBQUN6Qyw0QkFBSW9ELEtBQUsyRixtQkFBTCxDQUF5QndHLElBQUk3TSxRQUFKLENBQWExQyxLQUFiLENBQXpCLEVBQThDMEksT0FBOUMsQ0FBc0QySCxVQUF0RCxLQUFxRSxDQUFDLENBQTFFLEVBQTZFO0FBQ3pFekYsZ0NBQUlsSSxRQUFKLENBQWExQyxLQUFiLElBQXNCMlEsTUFBTXZOLEtBQUsyRixtQkFBTCxDQUF5QndHLElBQUk3TSxRQUFKLENBQWExQyxLQUFiLENBQXpCLENBQU4sQ0FBdEI7QUFFSCx5QkFIRCxNQUdPO0FBQ0g0SyxnQ0FBSWxJLFFBQUosQ0FBYTFDLEtBQWIsSUFBc0JKLEtBQUt3RCxLQUFLMkYsbUJBQUwsQ0FBeUJ3RyxJQUFJN00sUUFBSixDQUFhMUMsS0FBYixDQUF6QixFQUE4Q2dKLEtBQTlDLENBQW9ELEdBQXBELEVBQXlELENBQXpELENBQUwsQ0FBdEI7QUFDSDtBQUVKLHFCQVJELE1BU0s7QUFDRDRCLDRCQUFJbEksUUFBSixDQUFhMUMsS0FBYixJQUFzQnVQLElBQUk3TSxRQUFKLENBQWExQyxLQUFiLENBQXRCO0FBQ0g7QUFFSixpQkFkRCxNQWNPO0FBQ0gsd0JBQUl1UCxJQUFJN00sUUFBSixDQUFhMUMsS0FBYixhQUErQitLLE1BQW5DLEVBQTJDO0FBQ3ZDLDRCQUFJLGtCQUFrQndFLElBQUluTyxLQUExQixFQUFpQztBQUM3Qm1PLGdDQUFJN00sUUFBSixDQUFhMUMsS0FBYixFQUFvQnVRLGVBQXBCLEdBQXNDaEIsSUFBSW5PLEtBQUosQ0FBVStQLFlBQWhEOztBQUVBNUIsZ0NBQUk3TSxRQUFKLENBQWExQyxLQUFiLEVBQW9CSixJQUFwQixHQUEyQkEsSUFBM0I7QUFDSCx5QkFKRCxNQUlPLElBQUksYUFBYTJQLElBQUluTyxLQUFyQixFQUE0QjtBQUMvQm1PLGdDQUFJN00sUUFBSixDQUFhMUMsS0FBYixFQUFvQndRLFVBQXBCLEdBQWlDakIsSUFBSW5PLEtBQUosQ0FBVWdRLE9BQTNDO0FBQ0E3QixnQ0FBSTdNLFFBQUosQ0FBYTFDLEtBQWIsRUFBb0JKLElBQXBCLEdBQTJCQSxLQUFLSSxLQUFMLENBQTNCO0FBQ0g7O0FBRUR1UCw0QkFBSTdNLFFBQUosQ0FBYTFDLEtBQWIsRUFBb0JKLElBQXBCLEdBQTJCQSxJQUEzQjtBQUVIOztBQUVEZ0wsd0JBQUlsSSxRQUFKLENBQWExQyxLQUFiLElBQXNCLEtBQUs4UCxpQkFBTCxDQUF1QlAsSUFBSTdNLFFBQUosQ0FBYTFDLEtBQWIsQ0FBdkIsQ0FBdEI7QUFFSDtBQUNKO0FBQ0QsbUJBQU80SyxHQUFQO0FBRUg7OzswQ0FDaUJoTCxJLEVBQU11SSxLLEVBQU9rSSxVLEVBQVk7QUFDdkMsZ0JBQUlnQixXQUFXLEVBQWY7QUFDQSxnQkFBSWhCLFVBQUosRUFBZ0I7QUFDWixvQkFBSWpOLEtBQUsyTixhQUFMLENBQW1CNUksS0FBbkIsQ0FBSixFQUErQjtBQUMzQix3QkFBSS9FLEtBQUsyRixtQkFBTCxDQUF5QlosS0FBekIsRUFBZ0NPLE9BQWhDLENBQXdDMkgsVUFBeEMsS0FBdUQsQ0FBQyxDQUE1RCxFQUErRDtBQUMzRCw0QkFBSXpOLFFBQU1RLEtBQUsyRixtQkFBTCxDQUF5QlosS0FBekIsRUFBZ0NhLEtBQWhDLENBQXNDLEdBQXRDLEVBQTJDLENBQTNDLENBQVY7QUFDQXFJLG1DQUFXelIsS0FBS2dELEtBQUwsQ0FBWDtBQUNILHFCQUhELE1BR087QUFDSCw0QkFBSTBPLFdBQVduSixNQUFNYSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFmO0FBQ0EsNEJBQUl1SSxhQUFhcEosTUFBTWEsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBakI7QUFDQXVJLHFDQUFhM1IsS0FBS3dELEtBQUsyRixtQkFBTCxDQUF5QndJLFVBQXpCLENBQUwsQ0FBYjtBQUNBRixtQ0FBV0MsV0FBVyxHQUFYLEdBQWlCQyxVQUE1QjtBQUNIO0FBQ0osaUJBVkQsTUFVTztBQUNIRiwrQkFBV2xKLEtBQVg7QUFDSDtBQUNKLGFBZEQsTUFjTzs7QUFFSCxvQkFBSW1KLFlBQVduSixNQUFNYSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFmO0FBQ0Esb0JBQUl1SSxjQUFhcEosTUFBTWEsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBakI7QUFDQSxvQkFBSTVGLEtBQUsyTixhQUFMLENBQW1CUSxXQUFuQixDQUFKLEVBQW9DO0FBQ2hDQSxrQ0FBYTNSLEtBQUt3RCxLQUFLMkYsbUJBQUwsQ0FBeUJ3SSxXQUF6QixDQUFMLENBQWI7QUFDQUYsK0JBQVdDLFlBQVcsR0FBWCxHQUFpQkMsV0FBNUI7QUFFSCxpQkFKRCxNQUlPO0FBQ0hGLCtCQUFXbEosS0FBWDtBQUVIO0FBQ0o7QUFDRCxtQkFBT2tKLFFBQVA7QUFDSDs7O3lDQUNnQnpSLEksRUFBTWdSLE0sRUFBUVAsVSxFQUFZO0FBQ3ZDLGdCQUFJbUIsZ0JBQWdCLEVBQXBCO0FBRHVDO0FBQUE7QUFBQTs7QUFBQTtBQUV2QyxzQ0FBa0JaLE1BQWxCLG1JQUEwQjtBQUFBLHdCQUFqQnpJLEtBQWlCOzs7QUFFdEIsd0JBQUlrSixXQUFXLEtBQUtQLGlCQUFMLENBQXVCbFIsSUFBdkIsRUFBNkJ1SSxLQUE3QixFQUFvQ2tJLFVBQXBDLENBQWY7QUFDQW1CLHFDQUFpQkgsV0FBVyxHQUE1QjtBQUNIO0FBTnNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT3ZDLG1CQUFPRyxhQUFQO0FBRUg7Ozs7OztJQUdDNVEsRTtBQUNGLGdCQUFZNlEsTUFBWixFQUFvQjtBQUFBOztBQUFBLFlBRVp4UCxFQUZZLEdBS1p3UCxNQUxZLENBRVp4UCxFQUZZO0FBQUEsWUFHWnJDLElBSFksR0FLWjZSLE1BTFksQ0FHWjdSLElBSFk7QUFBQSxZQUladUIsUUFKWSxHQUtac1EsTUFMWSxDQUladFEsUUFKWTs7QUFNaEIsYUFBS2MsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsYUFBS3JDLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUt1QixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUswSixVQUFMLEdBQWtCLElBQUlrQyxHQUFKLEVBQWxCO0FBQ0EsYUFBSzJFLEtBQUwsR0FBYSxJQUFJeEUsUUFBSixFQUFiO0FBQ0EsYUFBS3dDLFNBQUwsR0FBaUIsSUFBSUMsU0FBSixDQUFjLEtBQUsvUCxJQUFuQixDQUFqQjtBQUdIOzs7OzRCQUNHK1IsYyxFQUFnQjtBQUNoQixpQkFBS0QsS0FBTCxDQUFXRSxrQkFBWCxDQUE4QkQsY0FBOUI7QUFDSDtBQUNEOzs7Ozs7OEJBR007QUFBQTs7QUFDRixnQkFBSUUsT0FBT3pPLEtBQUtlLFFBQUwsQ0FBYyxLQUFLbEMsRUFBbkIsSUFBeUJnQixTQUFTNk8sYUFBVCxDQUF1QixLQUFLN1AsRUFBNUIsQ0FBekIsR0FBMkQsS0FBS0EsRUFBM0U7QUFDQSxnQkFBSXNOLE1BQU0sS0FBS3dDLFdBQUwsRUFBVjtBQUNBalIsb0JBQVFDLEdBQVIsY0FBdUJTLEtBQUtDLFNBQUwsQ0FBZThOLEdBQWYsQ0FBdkI7O0FBRUE7QUFDQSxnQkFBSXlDLFNBQVMsSUFBYjtBQUNBLGlCQUFLTixLQUFMLENBQVd2RSxXQUFYLENBQXVCbkssT0FBdkIsQ0FBK0IsVUFBVWlQLFFBQVYsRUFBb0I7QUFDL0NuUix3QkFBUUMsR0FBUixxQkFBNkJrUixvQkFBb0I1QyxXQUFqRDs7QUFFQTFFLHdCQUFRc0gsU0FBU3JTLElBQWpCLEVBQXVCcVMsU0FBU3BILFVBQWhDLEVBQTRDLFlBQU07O0FBRTlDMEUsMEJBQU15QyxPQUFPRCxXQUFQLEVBQU47QUFDQUMsMkJBQU9FLFVBQVAsQ0FBa0IzQyxHQUFsQjtBQUNILGlCQUpEO0FBS0F4RSx1QkFBT0MsSUFBUCxDQUFZaUgsU0FBU3JDLFFBQXJCLEVBQStCNU0sT0FBL0IsQ0FBdUMsVUFBQ21QLFFBQUQsRUFBYztBQUNqRHJSLDRCQUFRQyxHQUFSLGVBQXdCb1IsUUFBeEI7QUFDQSx3QkFBS0YsU0FBU3BILFVBQVQsQ0FBb0I4QyxNQUFwQixDQUEyQndFLFFBQTNCLENBQUwsRUFBNEM7QUFDeENGLGlDQUFTcEgsVUFBVCxDQUFvQlMsR0FBcEIsQ0FBd0I2RyxRQUF4QixFQUFrQzVHLEdBQWxDLENBQXNDLFlBQU07QUFDeEMwRyxxQ0FBU3JDLFFBQVQsQ0FBa0J1QyxRQUFsQjtBQUNBRixxQ0FBU3BDLGlCQUFUO0FBQ0gseUJBSEQ7QUFJSDtBQUNKLGlCQVJEO0FBU0FvQyx5QkFBUzNRLEdBQVQ7QUFFSCxhQW5CRDs7QUFxQkEsaUJBQUs4USxFQUFMLEdBQVUsS0FBSzFDLFNBQUwsQ0FBZVEsaUJBQWYsQ0FBaUMsS0FBS1IsU0FBTCxDQUFlSSxpQkFBZixDQUFpQ1AsR0FBakMsQ0FBakMsQ0FBVjtBQUNBLGlCQUFLOEMsQ0FBTCxHQUFTLEtBQUtELEVBQUwsQ0FBUTdPLE1BQVIsRUFBVDtBQUNBc08saUJBQUtwTyxXQUFMLENBQWlCLEtBQUs0TyxDQUF0Qjs7QUFFQTFILG9CQUFRLEtBQUsvSyxJQUFiLEVBQW1CLEtBQUtpTCxVQUF4QixFQUFvQyxZQUFNO0FBQ3RDLHVCQUFLcUgsVUFBTCxDQUFnQjNDLEdBQWhCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLMkMsVUFBTCxDQUFnQjNDLEdBQWhCO0FBQ0g7OztzQ0FDYTtBQUNWLGdCQUFJO0FBQ0EscUJBQUttQyxLQUFMLENBQVdZLGlCQUFYLENBQTZCLEtBQUtuUixRQUFMLENBQWM2TSxJQUFkLEVBQTdCO0FBRUgsYUFIRCxDQUdFLE9BQU91RSxDQUFQLEVBQVU7QUFDUnpSLHdCQUFRMFIsS0FBUixpQkFBNEJELENBQTVCO0FBQ0g7QUFDRCxtQkFBTyxLQUFLYixLQUFMLENBQVdlLFVBQVgsRUFBUDtBQUNIOzs7bUNBQ1VsRCxHLEVBQUs7QUFDWixnQkFBSW1ELE1BQU0sS0FBS2hELFNBQUwsQ0FBZVEsaUJBQWYsQ0FBaUMsS0FBS1IsU0FBTCxDQUFlSSxpQkFBZixDQUFpQ1AsR0FBakMsQ0FBakMsQ0FBVjtBQUNBN1AsbUJBQU9nVCxHQUFQLEdBQWFBLEdBQWI7QUFDQWhULG1CQUFPMFMsRUFBUCxHQUFZLEtBQUtBLEVBQWpCO0FBQ0F0RixrQkFBTSxLQUFLdUYsQ0FBWCxFQUFjekYsS0FBSyxLQUFLd0YsRUFBVixFQUFjTSxHQUFkLENBQWQ7QUFDQSxpQkFBS04sRUFBTCxHQUFVTSxHQUFWO0FBQ0g7Ozs4QkFDSzlQLEcsRUFBS2tJLFEsRUFBVTtBQUNqQixnQkFBSSxLQUFLRCxVQUFMLENBQWdCOEMsTUFBaEIsQ0FBdUIvSyxHQUF2QixDQUFKLEVBQWlDO0FBQzdCLHFCQUFLaUksVUFBTCxDQUFnQlMsR0FBaEIsQ0FBb0IxSSxHQUFwQixFQUF5QjJJLEdBQXpCLENBQTZCVCxRQUE3QjtBQUNIO0FBRUo7QUFDRDs7Ozs7OztrQ0FJaUIyRyxNLEVBQVE7QUFBQSxnQkFFYnZRLElBRmEsR0FFbUJ1USxNQUZuQixDQUVidlEsSUFGYTtBQUFBLGdCQUVQQyxRQUZPLEdBRW1Cc1EsTUFGbkIsQ0FFUHRRLFFBRk87QUFBQSxnQkFFR0MsS0FGSCxHQUVtQnFRLE1BRm5CLENBRUdyUSxLQUZIO0FBQUEsZ0JBRVV4QixJQUZWLEdBRW1CNlIsTUFGbkIsQ0FFVTdSLElBRlY7O0FBR3JCLGdCQUFJOFIsUUFBUSxJQUFJeEUsUUFBSixFQUFaO0FBQ0F3RSxrQkFBTVksaUJBQU4sQ0FBd0JuUixTQUFTNk0sSUFBVCxFQUF4Qjs7QUFFQSxnQkFBSXVCLE1BQU1tQyxNQUFNZSxVQUFOLEVBQVY7O0FBRUEsbUJBQU8sSUFBSXBELFdBQUosQ0FBZ0IsRUFBRUUsS0FBS0EsR0FBUCxFQUFZbk8sT0FBT0EsS0FBbkIsRUFBMEJGLE1BQU1BLElBQWhDLEVBQXNDdEIsTUFBTUEsSUFBNUMsRUFBa0QwQixLQUFLbVEsT0FBT25RLEdBQTlELEVBQW1FVSxPQUFPeVAsT0FBT3pQLEtBQWpGLEVBQWhCLENBQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOzs7Ozs7a0JBSVVwQixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVtby5qc1wiKTtcbiIsImltcG9ydCBSViBmcm9tICcuL3NyYy9ydi5qcydcclxuXHJcbi8vIGltcG9ydCBSViBmcm9tICcuL3NyYy9ydi9tYWluJ1xyXG5sZXQgcnZcclxuXHJcblxyXG53aW5kb3cuY2xpY2tEaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBydi5kYXRhLnBhcmVudCA9IGBjbGljayBEaXYgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyW77yM6KeG5Zu+6Ieq5Yqo5pu05pawXHJcbn1cclxuXHJcbndpbmRvdy5jbGlja1AxID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5jaGlsZCA9IGBjbGljayBwMSB0aW1lOiR7bmV3IERhdGUoKSAvIDEwMDB9YCAvL2RhdGHlj5jljJYs6KeG5Zu+6Ieq5Yqo5pu05pawXHJcbn1cclxuXHJcbndpbmRvdy5jbGlja1AyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcnYuZGF0YS5jaGlsZDIgPSBgY2xpY2sgcDIgdGltZToke25ldyBEYXRlKCkgLyAxMDAwfWAgLy9kYXRh5Y+Y5YyWLOinhuWbvuiHquWKqOabtOaWsFxyXG59XHJcbmxldCBteURhdGEgPSB7XHJcbiAgICBwYXJlbnQ6IFwicGFyZW50XCIsXHJcbiAgICBjaGlsZDogXCJjaGlsZFwiLFxyXG4gICAgcGNvbG9yOiBcInJlZFwiLFxyXG4gICAgYzFjb2xvcjogXCJibHVlXCIsXHJcbiAgICBjMmNvbG9yOiBcImdyZWVuXCIsXHJcbiAgICBjaGlsZDI6IFwiY2hpbGQyXCIsXHJcbiAgICB0aW1lOiAxMDAwMCxcclxuICAgIGNvbXBvbmVudENvbG9yOiBcInJlZFwiLFxyXG4gICAgd2VlazogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDExLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjExMVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyMixcclxuICAgICAgICAgICAgY29udGVudDogXCIyMjJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMzMsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiMzMzXCJcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59XHJcbndpbmRvdy5kYXRhID0gbXlEYXRhXHJcbndpbmRvdy5SViA9IFJWXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKFwib25sb2FkXCIpXHJcblxyXG4gICAgdmFyIGNvbiA9IFJWLmNvbXBvbmVudCh7XHJcbiAgICAgICAgbmFtZTogXCJNeUNvbXBvbmVudFwiLFxyXG4gICAgICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYWFcIiBrZXk9XCJhYWFcIj48cCBrZXk9XCJiYmJcIiBzdHlsZT1cImNvbG9yOiUjcGNvbG9yIyVcIj5cIiUjcGNvbnRlbnQjJVwiPC9wPjxkaXY+XHJcbiAgICAgICAgYCxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICB0aW1lOiBcIjEwMDBcIixcclxuICAgICAgICAgICAgcGNvbnRlbnQ6IFwiYSBjdXN0b20gY29tcG9uZW50XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGNvbnRlbnQ6IFwiYSBjdXN0b20gY29tcG9uZW50XCIsXHJcbiAgICAgICAgICAgIHBjb2xvcjogXCJ5ZWxsb3dcIlxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3llbGxvdycsICdncmF5JywgJ3doaXRlJywgJ2JsYWNrJ11cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHJ2IGNvbXBvbmVudCxydW4gcHJvcHM6JHtKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKX1gKVxyXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucGNvbnRlbnQgPSB0aGlzLnByb3BzLnBjb250ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucGNvbG9yID0gY29sb3JzW2dldFJhbmRvbUludCg2KV1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLnRpbWUpXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgcGNvbG9yKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHBjb2xvckNoYW5nZSxjaGFuZ2U6YClcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0pXHJcbiAgICBydiA9IG5ldyBSViggLy/liJvlu7rlr7nosaFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsOiBcIiNhcHBcIixcclxuICAgICAgICAgICAgLy9lbOWvueixoeaMgui9veeahOiKgueCuXNcclxuICAgICAgICAgICAgZGF0YTogbXlEYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxkaXYga2V5PVwiMVwiIHN0eWxlPVwiY29sb3I6JSNwY29sb3IjJSx3aWR0aDoxMDBweCxoZWlnaHQ6MTAwcHhcIiBvbmNsaWNrPVwiY2xpY2tEaXYoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCIlI3BhcmVudCMlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cIjJcIiBzdHlsZT1cImNvbG9yOiUjYzFjb2xvciMlLHdpZHRoOjUwcHgsaGVpZ2h0OjUwcHhcIiBvbmNsaWNrPVwiY2xpY2tQMSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIlI2NoaWxkIyVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwiM1wiIHN0eWxlPVwiY29sb3I6JSNjMmNvbG9yIyUsd2lkdGg6NTBweCxoZWlnaHQ6NTBweFwiIG9uY2xpY2s9XCJjbGlja1AyKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJSNjaGlsZDIjJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT1cIjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cInslI3YuaWQjJSsnX2NvbnRlbnQnfVwiIGNoaWxkRG9tRGF0YT1cInZcIiBmb3I9XCJ2IF9pbl8gd2Vla1wiICBkb21EYXRhPVwid2Vla1wiPlwiJSN2LmNvbnRlbnQjJVwiPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8TXlDb21wb25lbnQgcGNvbnRlbnQ9XCJzc3NzXCIgY29sb3I9XCIlI2NvbXBvbmVudENvbG9yIyVcIiB0aW1lPVwiMjAwMFwiIGtleT1cIjg4OFwiPjwvTXlDb21wb25lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgIH0pXHJcbiAgICBydi51c2UoY29uKVxyXG4gICAgcnYucnVuKClcclxuICAgIHJ2LndhdGNoKFwicGFyZW50XCIsICgpID0+IHtcclxuICAgICAgICBhbGVydChcInBhcmVudCxjaGFuZ2VcIilcclxuICAgIH0pIC8vcnYud2F0Y2goXCJrZXlcIixjYWxsYmFjaykg6KeC5a+fZGF0YeaVsOaNruWvueixoeWvueW6lGtleeeahOaVsOWAvOWPmOWMlizlj5jljJbop6blj5FjYWxsYmFja1xyXG4gICAgcnYud2F0Y2goXCJjaGlsZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZCxjaGFuZ2VcIilcclxuICAgIH0pXHJcbiAgICBydi53YXRjaChcImNoaWxkMlwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZDIsY2hhbmdlXCIpXHJcbiAgICB9KVxyXG4gICAgd2luZG93LnJ2ID0gcnZcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxufSIsIlxyXG5cclxuXHJcbmNvbnN0IE5PREVfUkVQTEFDRSA9IDAgLy9ub2RlIHJlcGxhY2UgXHJcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcclxuY29uc3QgTk9ERV9QUk9QUyA9IDIgLy9wcm9wIGNoYW5nZSBcclxuY29uc3QgTk9ERV9DT05URU5UID0gMyAvL2NvbnRlbnQgY2hhbmdlXHJcbmNsYXNzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSBvYmplY3QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyAgdGhlIHByb3AgKGtlee+8jHN0eWxlLi4pXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoaWxkcmVuIGNoaWxkIGRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWcgPSB0YWdcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW11cclxuICAgICAgICB0aGlzLmtleSA9IHByb3BzID8gcHJvcHMua2V5IDogdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfSAuLi4gaHRtbCB0YWcgdGhlIGtleSBpcyB1bmRlZmluZWRgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgbWV0aG9kIHVzZSB0byB2aXJ0dWFsIGRvbSAgcmVuZGUgdG8gcmVhbCBkb21cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIFV0aWwuc2V0QXR0cihlbCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlmZiB7XHJcbiAgICAvKipcclxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxyXG4gICAgfVxyXG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxyXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcclxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUkVQTEFDRSxcclxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxyXG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xyXG5cclxuICAgIH1cclxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcclxuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxyXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXHJcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxyXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IENISUxEX1JFX09SREVSLFxyXG4gICAgICAgICAgICAgICAgbW92ZXM6IGRpZmZzLm1vdmVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2gocmVvcmRlclBhdGNoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlSW5kZXggPSBpbmRleFxyXG4gICAgICAgIG9sZENoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggPSAobGVmdE5vZGUgJiYgbGVmdE5vZGUuY291bnQpID9cclxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyBsZWZ0Tm9kZS5jb3VudCArIDEgOlxyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCBuZXdDaGlsZCwgY3VycmVudE5vZGVJbmRleClcclxuICAgICAgICAgICAgbGVmdE5vZGUgPSBjaGlsZFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGF0Y2gge1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCB3YWxrZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXHJcbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XHJcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xyXG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXHJcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cclxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxyXG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXHJcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxyXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBVdGlsIHtcclxuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xyXG4gICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU51bWJlciA9IC9eXFxkKyQvXHJcbiAgICAgICAgICAgIC8v6LSf5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXHJcbiAgICAgICAgICAgIC8v5q2j5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcbiAgICAgICAgICAgIC8v6LSf5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcblxyXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZU5lUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHlsZSc6XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcclxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzUGxhY2VIb2xkZXIoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiJSNcIilcclxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXHJcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcclxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwbGFjZUhvbGRlci5pbmRleE9mKFwiLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIERpZmZMaXN0IHtcclxuICAgIC8qKlxyXG4gICAgICogZGlmZiBsaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9sZExpc3QsIG5ld0xpc3QpIHtcclxuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcclxuICAgICAgICBsZXQgbmV3TGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgobmV3TGlzdCkua2V5SW5kZXhcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvciA9IFtdXHJcbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkSXRlbSA9IG9sZExpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcclxuICAgICAgICAgICAgaWYgKCFuZXdMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkob0l0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG5ld0xpc3RbbmV3TGlzdEtleUluZGV4W29JdGVtS2V5XV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdCA9IHRoaXMuY2hpbGRMaXN0LnNsaWNlKDApXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcExpc3RbaV0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbkl0ZW0gPSBuZXdMaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBuSXRlbUtleSA9IHRoaXMuZ2V0S2V5KG5JdGVtKVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW1LZXkgPSB0aGlzLmdldEtleShjSXRlbSlcclxuICAgICAgICAgICAgaWYgKGNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkTGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG5JdGVtS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY05leHRJdGVtS2V5ID0gZ2V0S2V5KHRoaXMudGVtcExpc3RbaW5kZXggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgayA9IHRoaXMudGVtcExpc3QubGVuZ3RoIC0gaW5kZXhcclxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGstLVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShrICsgbmV3TGlzdC5sZW5ndGgpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBtYWtlS2V5SW5kZXgobGlzdCkge1xyXG4gICAgICAgIGxldCBrZXlJbmRleCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgaXRlbUtleSA9IHRoaXMuZ2V0S2V5KGl0ZW0pXHJcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGl0ZW0pIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVtcImtleVwiXVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICByZW1vdmUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0eXBlOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnQoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXN1bHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBjaGlsZDogdGhpcy5jaGlsZExpc3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gb2JzZXJ2ZShvYmosIG9ic2VydmVNYXAsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgbGV0IGludGVybmFsVmFsdWUgPSBvYmpba2V5XVxyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxyXG4gICAgICAgIGlmIChpbnRlcm5hbFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmUoaW50ZXJuYWxWYWx1ZSwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmVNYXAucHV0KGtleSwgb2JzZXJ2YWJsZSlcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxWYWx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQobmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VkID0gaW50ZXJuYWxWYWx1ZSAhPT0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUuaW52b2tlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5cclxuY2xhc3MgT2JzZXJ2YWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoKVxyXG4gICAgfVxyXG4gICAgYWRkKG9ic2VydmFibGVVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5hZGQob2JzZXJ2YWJsZVVwZGF0ZSlcclxuICAgIH1cclxuICAgIGludm9rZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZ1biA9PiBmdW4oKSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogdGhlIG1ldGhvZCB1c2UgdG8gZGVlcCBjbG9uZSBvYmpcclxuICogQHBhcmFtIHsqfSBvYmogXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIGxldCBnZXRUeXBlID0gKG8pID0+IHtcclxuICAgICAgICBpZiAobyA9PT0gbnVsbCkgcmV0dXJuIFwibnVsbFwiO1xyXG4gICAgICAgIGlmIChvID09PSB1bmRlZmluZWQpIHJldHVybiBcInVuZGVmaW5lZFwiO1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlc3VsdCwgb0NsYXNzID0gZ2V0VHlwZShvYmopO1xyXG4gICAgaWYgKG9DbGFzcyA9PT0gXCJPYmplY3RcIikge1xyXG4gICAgICAgIHJlc3VsdCA9IHt9O1xyXG4gICAgfSBlbHNlIGlmIChvQ2xhc3MgPT09IFwiQXJyYXlcIikge1xyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgbGV0IGNvcHkgPSBvYmpba2V5XTtcclxuICAgICAgICBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIk9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGdldFR5cGUoY29weSkgPT0gXCJBcnJheVwiKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICBsZXQgZCA9IG5ldyBEaWZmKG9sZFRyZWUsIG5ld1RyZWUpXHJcbiAgICByZXR1cm4gZC5wYXRjaGVzXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwYXRjaChub2RlLCBwYXRjaGVzKSB7XHJcbiAgICByZXR1cm4gbmV3IFBhdGNoKG5vZGUsIHBhdGNoZXMpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICAgICAqIHRoZSBtYXAgb2JqZWN0IHVzZSB0byBzYXZlIGxpa2lseSAoa2V5LHZhbHVlKSBkYXRhXHJcbiAgICAgKi9cclxuY2xhc3MgTWFwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxuICAgIHB1dChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMubWFwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApID8gdGhpcy5tYXBba2V5XSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoa2V5KSB7XHJcbiAgICAgICAgaWYgKChrZXkgaW4gdGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldXHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoLS07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaGFzS2V5KGtleSkge1xyXG4gICAgICAgIHJldHVybiAoa2V5IGluIHRoaXMubWFwKVxyXG4gICAgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubWFwKS5mb3JFYWNoKG1hcEtleSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubWFwW21hcEtleV0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpcyBwYXJzZSBodG1sIHRlbXBsYXRlIHRvIHZpcnR1YWwgZG9tIHRyZWVcclxuICogQGF1dGhvciB5aG9uZ21cclxuICovXHJcbmNsYXNzIFlobVBhcnNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZXRNYXAgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLm1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLm1NYXAgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLm1Qcm9wUmUgPSAvKFtePVxcc10rKShcXHMqPVxccyooKFxcXCIoW15cIl0qKVxcXCIpfChcXCcoW14nXSopXFwnKXxbXj5cXHNdKykpPy9nbVxyXG4gICAgICAgIHRoaXMubUhhbmRsZXIgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0RUxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIHByb3AsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubUluZGV4ICs9IDFcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmNvbXBvbmV0TWFwLmhhc0tleSh0YWdOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5bey57uP5pyJ5b2T5YmN57uE5Lu255qE6K6w5b2V77yM5bCG5b2T5YmN57uE5Lu25o+S5YWlZG9t5LitXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb24scHJvcDpcIiArIEpTT04uc3RyaW5naWZ5KHRoYXQuY29tcG9uZXRNYXAuZ2V0KHRhZ05hbWUpLmdldFByb3AoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb24sZG9tOlwiICsgSlNPTi5zdHJpbmdpZnkodGhhdC5jb21wb25ldE1hcC5nZXQodGFnTmFtZSkuZ2V0RG9tKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0YWdOYW1lOiR7dGFnTmFtZX0gLHByb3A6JHtKU09OLnN0cmluZ2lmeShwcm9wKX1gKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbXBvbmV0TWFwLmdldCh0YWdOYW1lKS5hcHBseShwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubU1hcC5wdXQodGhhdC5tSW5kZXgsIHRoYXQuY29tcG9uZXRNYXAuZ2V0KHRhZ05hbWUpLmdldERvbSgpKVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHsgdGFnOiB0YWdOYW1lLCBwcm9wczogcHJvcCwgY2hpbGRyZW46IFtdLCBpbmRleDogdGhhdC5tSW5kZXgsIGNvbnRlbnQ6IGNvbnRlbnQsIGlzQ2xvc2U6IGZhbHNlIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuLnB1c2goY29udGVudC50cmltKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubU1hcC5wdXQodGhhdC5tSW5kZXgsIG9iailcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVuZEVsZW1lbnQ6IGZ1bmN0aW9uICh0aGF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4KS5pc0Nsb3NlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubU1hcC5oYXNLZXkoKHRoYXQubUluZGV4IC0gMSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCAtIDEpLmNoaWxkcmVuLnB1c2godGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tTWFwLnJlbW92ZSh0aGF0Lm1JbmRleClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQubUluZGV4IC09IDFcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO6Kej5p6Q6Ieq5a6a5LmJ57uE5Lu277yM5oyJ5ZCN5a2X57Si5byV57uE5Lu2XHJcbiAgICAgKiBAcGFyYW0geyp9IHJ2Q29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICB1c2VDdXN0b21Db21wb25lbnQocnZDb21wb25lbnQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25ldE1hcC5wdXQocnZDb21wb25lbnQuZ2V0TmFtZSgpLCBydkNvbXBvbmVudClcclxuICAgIH1cclxuICAgIHBhcnNlSHRtbFRlbXBsYXRlKGh0bWwpIHtcclxuICAgICAgICBsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgICAgICB2YXIgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUgKGh0bWwpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGFnT3BlbiA9IGh0bWwuaW5kZXhPZignPCcpXHJcbiAgICAgICAgICAgIHZhciBzdGFydFRhZ0Nsb3NlID0gaHRtbC5pbmRleE9mKCc+JykgfHwgaHRtbC5pbmRleE9mKCcvPicpXHJcbiAgICAgICAgICAgIHZhciBlbmRUYWdPcGVuID0gaHRtbC5pbmRleE9mKCc8LycpXHJcbiAgICAgICAgICAgIHZhciBlbmRUYWdDbG9zZSA9IGh0bWwuaW5kZXhPZignPicpXHJcbiAgICAgICAgICAgIHZhciBzdGFydENvbW1lbnRPcGVuID0gaHRtbC5pbmRleE9mKCc8IS0tJylcclxuICAgICAgICAgICAgdmFyIGVuZENvbW1lbnRDbG9zZSA9IGh0bWwuaW5kZXhPZignLS0+JylcclxuICAgICAgICAgICAgaWYgKHN0YXJ0Q29tbWVudE9wZW4gPT0gMCAmJiBlbmRDb21tZW50Q2xvc2UgIT0gLTEgJiYgZW5kQ29tbWVudENsb3NlID4gc3RhcnRDb21tZW50T3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBlbmRDb21tZW50Q2xvc2UgKyAzXHJcbiAgICAgICAgICAgICAgICBwYXJzZUNvbW1lbnQoaHRtbC5zdWJzdHJpbmcoc3RhcnRDb21tZW50T3BlbiArIDQsIGVuZENvbW1lbnRDbG9zZSArIDMpKTtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kVGFnT3BlbiAhPSAtMSAmJiBlbmRUYWdDbG9zZSAhPSAtMSAmJiBlbmRUYWdDbG9zZSA+IGVuZFRhZ09wZW4pIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZW5kVGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgICAgICAgICBfcGFyc2VFbmRUYWcoaHRtbC5zdWJzdHJpbmcoZW5kVGFnT3BlbiwgZW5kVGFnQ2xvc2UgKyAxKSwgdGhpcylcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRUYWdPcGVuICE9IC0xICYmIHN0YXJ0VGFnQ2xvc2UgIT0gLTEgJiYgc3RhcnRUYWdDbG9zZSA+IHN0YXJ0VGFnT3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdGFydFRhZ0Nsb3NlICsgMVxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gLTEgJiYgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gc3RhcnRUYWdDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBjb250ZW50RW5kSW5kZXggPSBodG1sLmluZGV4T2YoJzwvJywgKGluZGV4ICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4LCBodG1sLmluZGV4T2YoJzwnLCBpbmRleCkpLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3BhcnNlU3RhcnRUYWcoaHRtbC5zdWJzdHJpbmcoc3RhcnRUYWdPcGVuLCBzdGFydFRhZ0Nsb3NlICsgMSksIGNvbnRlbnQsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgICAgICBjb25zb2xlLmxvZyhgdG90YWwgcGFyc2UgdGltZToke2VuZFRpbWUgLSBzdGFydFRpbWV9YClcclxuXHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfcGFyc2VTdGFydFRhZyhodG1sLCBjb250ZW50LCB0aGF0KSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFRhZ0VuZEluZGV4ID0gaHRtbC5pbmRleE9mKCcgJykgIT0gLTEgPyBodG1sLmluZGV4T2YoJyAnKSA6IGh0bWwuaW5kZXhPZignLz4nKSA9PSAtMSA/IGh0bWwuaW5kZXhPZignPicpIDogaHRtbC5pbmRleE9mKCcvPicpXHJcbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gaHRtbC5zdWJzdHJpbmcoaHRtbC5pbmRleE9mKCc8JykgKyAxLCBzdGFydFRhZ0VuZEluZGV4KVxyXG4gICAgICAgICAgICB2YXIgcHJvcCA9IHt9XHJcbiAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJyAnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJyAnKSArIDEsIGh0bWwuaW5kZXhPZignPicpKVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9wc1Jlc3VsdCA9IHByb3BzLm1hdGNoKHRoYXQubVByb3BSZSlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHNSZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHIgPSBwcm9wc1Jlc3VsdFtpXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwcm9wW3ByLnNwbGl0KFwiPVwiKVswXV0gPSBwci5zcGxpdChcIj1cIilbMV0ubWF0Y2goLyg/PD1cIikuKj8oPz1cIikvKVswXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5tSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKC8oPzw9XCIpLio/KD89XCIpLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQubWF0Y2goLyg/PD1cIikuKj8oPz1cIikvKVswXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5tSGFuZGxlci5zdGFydEVMZW1lbnQodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gX3BhcnNlRW5kVGFnKGh0bWwsIHRoYXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoYXQubUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubUhhbmRsZXIuZW5kRWxlbWVudCh0aGF0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlQ29tbWVudChodG1sKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJzZUNvbW1lbnQ9JHtodG1sfWApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGdldEh0bWxEb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubU1hcC5nZXQoMSlcclxuICAgIH1cclxuXHJcbn1cclxuY2xhc3MgUnZDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50UGFyYW0pIHtcclxuICAgICAgICBsZXQgeyBkb20sIHByb3BzLCBuYW1lLCBkYXRhLCBydW4sIHdhdGNoIH0gPSBjb21wb25lbnRQYXJhbVxyXG4gICAgICAgIHRoaXMuZG9tID0gZG9tXHJcbiAgICAgICAgdGhpcy5yZG9tID0gdGhpcy5yZG9tXHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFJ1biA9IHJ1blxyXG4gICAgICAgIHRoaXMucnZEb21VdGlsID0gbmV3IFJWRG9tVXRpbChkYXRhKVxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIHRoaXMud2F0Y2hPYmogPSB3YXRjaFxyXG4gICAgICAgIHRoaXMuYXBwbHlUcnV0aEZ1bERhdGEoKVxyXG4gICAgfVxyXG4gICAgYXBwbHlUcnV0aEZ1bERhdGEoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGJlZm9yZSBkb206JHtKU09OLnN0cmluZ2lmeSh0aGlzLnJkb20pfWApXHJcbiAgICAgICAgdGhpcy5yZG9tID0gdGhpcy5ydkRvbVV0aWwuYXBwbHlUcnV0aGZ1bERhdGEodGhpcy5kb20pXHJcbiAgICAgICAgY29uc29sZS5sb2coYGFmdGVyIGRvbToke0pTT04uc3RyaW5naWZ5KHRoaXMucmRvbSl9YClcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFJ1bi5jYWxsKHRoaXMpXHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcclxuICAgIH1cclxuICAgIGFwcGx5KHByb3BzKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByb3Agb2YgT2JqZWN0LmtleXModGhpcy5wcm9wcykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wc1twcm9wXSA9IHByb3BzW3Byb3BdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXREb20oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmRvbVxyXG4gICAgfVxyXG4gICAgZ2V0UHJvcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wc1xyXG4gICAgfVxyXG5cclxufVxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpbmNsdWRlIGEgc2V0IG9mIGNvbW1vbiBmdW5jdGlvbiBmb3IgaGFuZGxlIHZpcnR1YWwgRE9NXHJcbiAqIEBhdXRob3IgeWhvbmdtXHJcbiAqL1xyXG5jbGFzcyBSVkRvbVV0aWwge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgIGlmIChjYyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjYylcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoKGRvbS50YWcsIGRvbS5wcm9wcywgY2hpbGRyZW4pXHJcbiAgICB9XHJcbiAgICBhcHBseVRydXRoZnVsRGF0YShkb20pIHtcclxuICAgICAgICBpZiAoXCJmb3JcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdXHJcbiAgICAgICAgICAgIGxldCBkYXRhU2luZ2xlXHJcblxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0ZvckluKGRvbS5wcm9wc1snZm9yJ10pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFrZXlcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20uY2hpbGREb21EYXRha2V5XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiZG9tRGF0YUtleVwiIGluIGRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzFdID09PSBkb20uZG9tRGF0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IGRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgZm9yIGRpcmVjdGl2ZSB1c2UgZXJyb3JcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXHJcblxyXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBkYXRhU2luZ2xlLCBkYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIG9ianMucHVzaChvYmopXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIG9ianNcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFcclxuICAgICAgICAgICAgbGV0IGNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICBpZiAoXCJkYXRhXCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBjaGlsZERvbURhdGFrZXksIGRhdGEpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSAyIHJlYWwgZGF0YSBkb21cclxuICAgICAqIEBwYXJhbSB7Kn0gZG9tIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhU2luZ2xlIFxyXG4gICAgICogQHBhcmFtIHsqfSB0ZGF0YSBcclxuICAgICAqL1xyXG4gICAgdmRvbTJyZG9tKGRvbSwgZGF0YSwgZGF0YVNpbmdsZSwgdGRhdGEpIHtcclxuICAgICAgICBsZXQgb2JqID0ge31cclxuICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xyXG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXHJcbiAgICAgICAgb2JqLnByb3BzID0ge31cclxuICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwcm9wc1twcm9wXVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsLmlzRG90T3BlcmF0b3JFeHByZXNzaW9uKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc09wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gVXRpbC5nZXRPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSwgZGF0YSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBkb20ucHJvcHNbdmFsdWVdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbS5jaGlsZHJlbltjaGlsZF0gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5jaGlsZERvbURhdGFrZXkgPSBkb20ucHJvcHMuY2hpbGREb21EYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kb21EYXRhS2V5ID0gZG9tLnByb3BzLmRvbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVtjaGlsZF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tLmNoaWxkcmVuW2NoaWxkXSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG5cclxuICAgIH1cclxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlID0gJydcclxuICAgICAgICBpZiAoZGF0YVNpbmdsZSkge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKHN0eWxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLnNwbGl0KFwiLlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgbGV0IHN0eWxlVmFsdWUgPSBzdHlsZS5zcGxpdChcIjpcIilbMV1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlXHJcbiAgICB9XHJcbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZUFycmF5ID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IHN0eWxlIG9mIHN0eWxlcykge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1N0eWxlID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgbmV3U3R5bGVBcnJheSArPSBuZXdTdHlsZSArIFwiO1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdTdHlsZUFycmF5XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSViB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVxyXG4gICAgICAgIH0gPSBvcHRpb25cclxuICAgICAgICB0aGlzLmVsID0gZWxcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwID0gbmV3IE1hcCgpXHJcbiAgICAgICAgdGhpcy5wYXJzZSA9IG5ldyBZaG1QYXJzZSgpXHJcbiAgICAgICAgdGhpcy5ydkRvbVV0aWwgPSBuZXcgUlZEb21VdGlsKHRoaXMuZGF0YSlcclxuXHJcblxyXG4gICAgfVxyXG4gICAgdXNlKHJ2Q29tcG9uZW50T2JqKSB7XHJcbiAgICAgICAgdGhpcy5wYXJzZS51c2VDdXN0b21Db21wb25lbnQocnZDb21wb25lbnRPYmopXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHJ1biBydlxyXG4gICAgICovXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBVdGlsLmlzU3RyaW5nKHRoaXMuZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVsKSA6IHRoaXMuZWxcclxuICAgICAgICBsZXQgZG9tID0gdGhpcy5fZ2V0RG9tVHJlZSgpXHJcbiAgICAgICAgY29uc29sZS5sb2coYHJ1bixkb206JHtKU09OLnN0cmluZ2lmeShkb20pfWApXHJcblxyXG4gICAgICAgIC8vIHRoaXMudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcclxuICAgICAgICBsZXQgcnZUaGF0ID0gdGhpc1xyXG4gICAgICAgIHRoaXMucGFyc2UuY29tcG9uZXRNYXAuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZXQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHJ1biBjb21wb25lbnQgJHtjb21wb25ldCBpbnN0YW5jZW9mIFJ2Q29tcG9uZW50fWApXHJcblxyXG4gICAgICAgICAgICBvYnNlcnZlKGNvbXBvbmV0LmRhdGEsIGNvbXBvbmV0Lm9ic2VydmVNYXAsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBkb20gPSBydlRoYXQuX2dldERvbVRyZWUoKVxyXG4gICAgICAgICAgICAgICAgcnZUaGF0Ll91cGRhdGVkb20oZG9tKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25ldC53YXRjaE9iaikuZm9yRWFjaCgod2F0Y2hGdW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB3YXRjaEZ1bjoke3dhdGNoRnVufWApXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbXBvbmV0Lm9ic2VydmVNYXAuaGFzS2V5KHdhdGNoRnVuKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25ldC5vYnNlcnZlTWFwLmdldCh3YXRjaEZ1bikuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZXQud2F0Y2hPYmpbd2F0Y2hGdW5dKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZXQuYXBwbHlUcnV0aEZ1bERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbXBvbmV0LnJ1bigpXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMudmUgPSB0aGlzLnJ2RG9tVXRpbC5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLnJ2RG9tVXRpbC5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgIHRoaXMudyA9IHRoaXMudmUucmVuZGVyKClcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcclxuXHJcbiAgICAgICAgb2JzZXJ2ZSh0aGlzLmRhdGEsIHRoaXMub2JzZXJ2ZU1hcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVkb20oZG9tKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlZG9tKGRvbSlcclxuICAgIH1cclxuICAgIF9nZXREb21UcmVlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyc2UucGFyc2VIdG1sVGVtcGxhdGUodGhpcy50ZW1wbGF0ZS50cmltKCkpXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgcnYgcGFyc2UgZToke2V9YClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UuZ2V0SHRtbERvbSgpXHJcbiAgICB9XHJcbiAgICBfdXBkYXRlZG9tKGRvbSkge1xyXG4gICAgICAgIGxldCBudmUgPSB0aGlzLnJ2RG9tVXRpbC5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLnJ2RG9tVXRpbC5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgIHdpbmRvdy5udmUgPSBudmVcclxuICAgICAgICB3aW5kb3cudmUgPSB0aGlzLnZlXHJcbiAgICAgICAgcGF0Y2godGhpcy53LCBkaWZmKHRoaXMudmUsIG52ZSkpXHJcbiAgICAgICAgdGhpcy52ZSA9IG52ZVxyXG4gICAgfVxyXG4gICAgd2F0Y2goa2V5LCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVNYXAuaGFzS2V5KGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTWFwLmdldChrZXkpLmFkZChjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGlzIHN0YXRpYyBmdW5jdGlvbiB1c2UgdG8gZGVjbGFyYXRpb24gYSBSViBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gb3B0aW9uIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29tcG9uZW50KG9wdGlvbikge1xyXG5cclxuICAgICAgICBjb25zdCB7IG5hbWUsIHRlbXBsYXRlLCBwcm9wcywgZGF0YSB9ID0gb3B0aW9uXHJcbiAgICAgICAgbGV0IHBhcnNlID0gbmV3IFlobVBhcnNlKClcclxuICAgICAgICBwYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZS50cmltKCkpXHJcblxyXG4gICAgICAgIGxldCBkb20gPSBwYXJzZS5nZXRIdG1sRG9tKClcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBSdkNvbXBvbmVudCh7IGRvbTogZG9tLCBwcm9wczogcHJvcHMsIG5hbWU6IG5hbWUsIGRhdGE6IGRhdGEsIHJ1bjogb3B0aW9uLnJ1biwgd2F0Y2g6IG9wdGlvbi53YXRjaCB9KVxyXG4gICAgICAgIC8vIHRoaXMudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcclxuICAgICAgICAvLyB0aGlzLncgPSB0aGlzLnZlLnJlbmRlcigpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjb21wb25ldCxkb206XCIgKyBKU09OLnN0cmluZ2lmeShkb20pKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tcG9uZXQsZGF0YTpcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUlYiXSwic291cmNlUm9vdCI6IiJ9