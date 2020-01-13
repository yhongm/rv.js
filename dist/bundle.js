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


var _main = __webpack_require__(/*! ./src/rv/main */ "./src/rv/main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rv = void 0; // import RV from './src/rv/main'


var myData = {
    parent: "parent",
    child: "child",
    pcolor: "red",
    c1color: "blue",
    c2color: "green",
    child2: "child2",
    time: 10000,
    pkey: "dddd",
    componentColor: "red", //用于自定义组件
    componentCotent: "componentCotent 888", //用于自定义组件
    componentValue: "componentValue 888", //用于自定义组件
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
window.data = myData; //控制台修改data数据，视图自动刷新内容
window.RV = _main2.default;
window.onload = function () {
    this.console.log("onload");
    var con = _main2.default.component({ //定义自定义RV组件
        name: "MyComponent", //定义RV组件名字
        template: "\n            <div class=\"aaa\" key=\"aaa\"><p key=\"bbb\" class=\"bbb\" style=\"color:%#pcolor#%\" time=\"%#time#%\" componentValue=\"%#pvalue#%\">\"%#pcontent#%\"</p><div>\n        ", //定义RV组件,HTML语法声明组件模板
        style: "\n        .aaa {\n            background-color: red\n        }\n        .bbb {\n            width: 500px;\n            height:200px;\n        }\n        ",
        //定义RV组件样式表,css语法声明组件样式
        props: { //定义RV组件属性,用于外部设值组件属性
            time: "1000",
            content: "a custom component",
            value: "componentValue"
        },
        data: { //定义RV组件data,data数据变化，自动更新模板内容
            pcontent: "a custom component",
            pcolor: "yellow",
            time: 10000,
            pvalue: "cvalue"

        },

        run: function run() {
            var _this = this;

            //定义自定义RV组件运行代码,用于运行RV组件相关JS代码,RV组件启动时启动此方法


            var colors = ['red', 'green', 'blue', 'yellow', 'gray', 'white', 'black'];

            setInterval(function () {
                _this.data.pcontent = _this.props.content;
                _this.data.time = _this.props.time;
                _this.data.pvalue = _this.props.value;
                _this.data.pcolor = colors[getRandomInt(6)];
            }, 1000);
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
        },
        domChange: function domChange() {},

        watch: {
            pcolor: function pcolor() {
                console.log("pcolorChange,change:");
            }
        }

    });
    rv = new _main2.default( //创建对象
    {
        el: "#app",
        //el对象挂载的节点s
        data: myData, //数据对象，用于驱动视图更新，数据变化，视图自动更新
        style: "",
        template: "<div key=\"1\" style=\"color:%#pcolor#%,width:100px,height:100px\" onclick=\"clickDiv()\">\n                         \"%#parent#%\"\n                         <p key=\"2\" style=\"color:%#c1color#%,width:50px,height:50px\" onclick=\"clickP1()\">\n                             \"%#child#%\"\n                         </p>\n                         <p key=\"3\" style=\"color:%#c2color#%,width:50px,height:50px\" onclick=\"clickP2()\">\n                            \"%#child2#%\"\n                         </p>\n                         <div key=\"4\">\n                            <p key=\"{%#v.id#%+'_content'}\" childDomData=\"v\" for=\"v _in_ week\"  domData=\"week\">\"%#v.content#%\"</p>\n                         </div>\n                         <MyComponent content=\"%#componentCotent#%\"  time=\"{Math.floor(new Date()/1000)+'_ttt'}\" value=\"%#componentValue#%\" key=\"888\"></MyComponent>\n                       </div>"
    });
    rv.use(con); //注册自定义RV组件
    rv.run(function (rv) {
        console.log("rv,run:");
    }); //启动
    rv.watch("parent", function () {
        alert("parent,change");
    }); //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
    rv.watch("child", function () {
        alert("child,change");
    });
    rv.watch("child2", function () {
        alert("child2,change");
    });
    window.clickDiv = function () {
        rv.data.parent = "click Div time:" + new Date() / 1000; //data变化，视图自动更新
    };

    window.clickP1 = function () {
        rv.data.child = "click p1 time:" + new Date() / 1000; //data变化,视图自动更新
    };

    window.clickP2 = function () {
        rv.data.child2 = "click p2 time:" + new Date() / 1000; //data变化,视图自动更新
    };
    window.rv = rv;
};

/***/ }),

/***/ "./src/rv/diff.js":
/*!************************!*\
  !*** ./src/rv/diff.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _diff_list = __webpack_require__(/*! ./diff_list */ "./src/rv/diff_list.js");

var _diff_list2 = _interopRequireDefault(_diff_list);

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

var _domState = __webpack_require__(/*! ./domState */ "./src/rv/domState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "dfsWalk",
        value: function dfsWalk(oldNode, newNode, index) {
            var currentPatch = [];
            if (newNode == null) {} else if (_util2.default.isString(oldNode) && _util2.default.isString(newNode)) {
                if (oldNode != newNode) {
                    currentPatch.push({
                        type: _domState.NODE_CONTENT,
                        content: newNode
                    });
                }
            } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
                var propsPatches = this.diffProps(oldNode, newNode);
                if (propsPatches) {
                    currentPatch.push({
                        type: _domState.NODE_PROPS,
                        props: propsPatches
                    });
                }
                if (!_util2.default.isIgnoreChildren(newNode)) {
                    this.diffChildren(oldNode.children, newNode.children, index, currentPatch);
                }
            } else {
                currentPatch.push({
                    type: _domState.NODE_REPLACE,
                    node: newNode
                });
            }
            if (currentPatch.length) {
                this.patches[index] = currentPatch;
            }
        }
    }, {
        key: "diffProps",
        value: function diffProps(oldNode, newNode) {

            var oldProps = oldNode.props;
            var newProps = newNode.props;

            var propsPatches = {};
            var isSame = true;
            for (var key in oldProps) {
                if (newProps[key] !== oldProps[key]) {
                    isSame = false;
                    propsPatches[key] = newProps[key];
                }
            }
            for (var _key in newProps) {
                if (!oldProps.hasOwnProperty(_key)) {
                    isSame = false;
                    propsPatches[_key] = newProps[_key];
                }
            }
            return isSame ? null : propsPatches;
        }
    }, {
        key: "diffChildren",
        value: function diffChildren(oldChildren, newChildren, index, currentPatch) {
            var _this = this;

            var diffList = new _diff_list2.default(oldChildren, newChildren);
            var diffs = diffList.getResult();
            newChildren = diffs.child;
            if (diffs.moves.length) {
                var reorderPatch = {
                    type: _domState.CHILD_RE_ORDER,
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

exports.default = Diff;

/***/ }),

/***/ "./src/rv/diff_list.js":
/*!*****************************!*\
  !*** ./src/rv/diff_list.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "makeKeyIndex",
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
        key: "getKey",
        value: function getKey(item) {
            if (!item) {
                return undefined;
            }
            return item["key"];
        }
    }, {
        key: "removeCopyTempList",
        value: function removeCopyTempList(index) {
            this.tempList.splice(index, 1);
        }
    }, {
        key: "remove",
        value: function remove(index) {
            this.moveOperator.push({
                index: index,
                type: 0
            });
        }
    }, {
        key: "insert",
        value: function insert(index, item) {
            this.moveOperator.push({
                index: index,
                item: item,
                type: 1
            });
        }
    }, {
        key: "getResult",
        value: function getResult() {
            return {
                moves: this.moveOperator,
                child: this.childList
            };
        }
    }]);

    return DiffList;
}();

exports.default = DiffList;

/***/ }),

/***/ "./src/rv/domState.js":
/*!****************************!*\
  !*** ./src/rv/domState.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var NODE_REPLACE = 0; //node replace 
var CHILD_RE_ORDER = 1; //child node re order
var NODE_PROPS = 2; //prop change 
var NODE_CONTENT = 3; //content change
exports.NODE_REPLACE = NODE_REPLACE;
exports.CHILD_RE_ORDER = CHILD_RE_ORDER;
exports.NODE_PROPS = NODE_PROPS;
exports.NODE_CONTENT = NODE_CONTENT;

/***/ }),

/***/ "./src/rv/element.js":
/*!***************************!*\
  !*** ./src/rv/element.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            throw new Error(tag + " ... html tag the key is undefined");
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
        key: "render",
        value: function render() {
            var el = document.createElement(this.tag);
            var props = this.props;
            for (var propName in props) {
                if (!_util2.default.isRvJsProp(propName)) {
                    _util2.default.setAttr(el, propName, props[propName]);
                }
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

exports.default = Element;

/***/ }),

/***/ "./src/rv/main.js":
/*!************************!*\
  !*** ./src/rv/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

var _patch = __webpack_require__(/*! ./patch */ "./src/rv/patch.js");

var _patch2 = _interopRequireDefault(_patch);

var _diff = __webpack_require__(/*! ./diff */ "./src/rv/diff.js");

var _diff2 = _interopRequireDefault(_diff);

var _element = __webpack_require__(/*! ./element */ "./src/rv/element.js");

var _element2 = _interopRequireDefault(_element);

var _rvParse = __webpack_require__(/*! ./rvParse */ "./src/rv/rvParse.js");

var _rvParse2 = _interopRequireDefault(_rvParse);

var _rvDomUtil = __webpack_require__(/*! ./rvDomUtil */ "./src/rv/rvDomUtil.js");

var _rvDomUtil2 = _interopRequireDefault(_rvDomUtil);

var _rvComponent = __webpack_require__(/*! ./rvComponent */ "./src/rv/rvComponent.js");

var _rvComponent2 = _interopRequireDefault(_rvComponent);

var _map = __webpack_require__(/*! ./map */ "./src/rv/map.js");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RV = function () {
    function RV(option) {
        _classCallCheck(this, RV);

        var el = option.el,
            data = option.data,
            style = option.style,
            template = option.template;

        this.el = el;
        this.data = data;
        this.style = style;
        this.template = template;
        this.observeMap = new _map2.default();
        this.parse = new _rvParse2.default();
        this.rvDomUtil = new _rvDomUtil2.default(this.data);
    }

    _createClass(RV, [{
        key: "use",
        value: function use(rvComponentObj) {
            this.parse.useCustomComponent(rvComponentObj);
        }
        /**
         * run rv
         */

    }, {
        key: "run",
        value: function run(funCallback) {
            var _this = this;

            var root = _util2.default.isString(this.el) ? document.querySelector(this.el) : this.el;
            _util2.default.addStyle2Head(this.style);
            var dom = this._getDomTree();

            var rvThat = this;
            this.parse.componetMap.forEach(function (componet) {

                observe(componet.data, componet.observeMap, function () {

                    dom = rvThat._getDomTree();
                    componet.applyTruthFulData();
                    rvThat._updatedom(dom);
                });
                _util2.default.loopGet(componet.data);
                Object.keys(componet.watchObj).forEach(function (watchFun) {

                    if (componet.observeMap.hasKey(watchFun)) {
                        componet.observeMap.get(watchFun).add(function () {
                            componet.watchObj[watchFun]();
                        });
                    }
                });
                componet.run();
            });

            this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom));
            this.w = this.ve.render();
            root.appendChild(this.w);

            observe(this.data, this.observeMap, function () {
                _this._updatedom(dom);
            });
            this._updatedom(dom);
            funCallback(this);
        }
    }, {
        key: "_getDomTree",
        value: function _getDomTree() {
            try {
                this.parse.parseHtmlTemplate(this.template.trim());
            } catch (e) {
                console.error("rv parse e:" + e);
            }
            return this.parse.getHtmlDom();
        }
    }, {
        key: "_updatedom",
        value: function _updatedom(dom) {
            var nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom));
            window.nve = nve;
            window.ve = this.ve;
            patch(this.w, diff(this.ve, nve));
            this.parse.componetMap.forEach(function (component) {
                component.domChange();
            });
            this.ve = nve;
        }
    }, {
        key: "watch",
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
        key: "component",
        value: function component(option) {
            var name = option.name,
                template = option.template,
                style = option.style,
                props = option.props,
                data = option.data;

            var parse = new _rvParse2.default();
            parse.parseHtmlTemplate(template.trim());

            var dom = parse.getHtmlDom();

            return new _rvComponent2.default({ dom: dom, style: style, props: props, name: name, data: data, run: option.run, domChange: option.domChange, watch: option.watch });
        }
    }]);

    return RV;
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
        key: "add",
        value: function add(observableUpdate) {
            this.updateFunctions.add(observableUpdate);
        }
    }, {
        key: "invoke",
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
    return new _element2.default(tagName, props, children);
}
function diff(oldTree, newTree) {
    var d = new _diff2.default(oldTree, newTree);
    return d.patches;
}

function patch(node, patches) {
    return new _patch2.default(node, patches);
}

exports.default = RV;

/***/ }),

/***/ "./src/rv/map.js":
/*!***********************!*\
  !*** ./src/rv/map.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "put",
        value: function put(key, value) {
            if (!(key in this.map)) {
                this.length++;
            }
            this.map[key] = value;
        }
    }, {
        key: "get",
        value: function get(key) {
            return key in this.map ? this.map[key] : null;
        }
    }, {
        key: "remove",
        value: function remove(key) {
            if (key in this.map) {
                delete this.map[key];
                this.length--;
            }
        }
    }, {
        key: "hasKey",
        value: function hasKey(key) {
            return key in this.map;
        }
    }, {
        key: "forEach",
        value: function forEach(callback) {
            var _this = this;

            Object.keys(this.map).forEach(function (mapKey) {
                callback(_this.map[mapKey]);
            });
        }
    }, {
        key: "size",
        value: function size() {
            return this.length;
        }
    }, {
        key: "clear",
        value: function clear() {
            length = 0;
            this.map = new Object();
        }
    }]);

    return Map;
}();

exports.default = Map;

/***/ }),

/***/ "./src/rv/patch.js":
/*!*************************!*\
  !*** ./src/rv/patch.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

var _domState = __webpack_require__(/*! ./domState */ "./src/rv/domState.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            var _this = this;

            currentPatche.forEach(function (currentPatch) {
                switch (currentPatch.type) {
                    case _domState.NODE_REPLACE:
                        var newNode = _util2.default.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                        node.parentNode.replaceChild(newNode, node);
                        break;
                    case _domState.CHILD_RE_ORDER:
                        _this.reorderChildren(node, currentPatch.moves);
                        break;
                    case _domState.NODE_PROPS:
                        _this.setProps(node, currentPatch.props);
                        break;
                    case _domState.NODE_CONTENT:
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
            var staticNodeList = _util2.default.toArray(node.childNodes);
            var nodeMaps = {};
            staticNodeList.forEach(function (snode) {
                if (snode.nodeType === 1) {
                    var key = snode.getAttribute('key');
                    if (key) {
                        nodeMaps[key] = snode;
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
                    var insertNode = nodeMaps[move.item.key] ? nodeMaps(move.item.key).cloneNode(true) : _util2.default.isString(move.item) ? document.createTextNode(move.item) : move.item.render();
                    staticNodeList.splice(index, 0, insertNode);
                    node.insertBefore(insertNode, node.childNodes[index] || null);
                }
            });
        }
    }, {
        key: 'setProps',
        value: function setProps(node, props) {
            for (var key in props) {
                if (props[key] === undefined) {
                    node.removeAttribute(key);
                } else {
                    var value = props[key];
                    _util2.default.setAttr(node, key, value);
                }
            }
        }
    }]);

    return Patch;
}();

exports.default = Patch;

/***/ }),

/***/ "./src/rv/rvComponent.js":
/*!*******************************!*\
  !*** ./src/rv/rvComponent.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rvDomUtil = __webpack_require__(/*! ./rvDomUtil */ "./src/rv/rvDomUtil.js");

var _rvDomUtil2 = _interopRequireDefault(_rvDomUtil);

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

var _map = __webpack_require__(/*! ./map */ "./src/rv/map.js");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RvComponent = function () {
    function RvComponent(componentParam) {
        _classCallCheck(this, RvComponent);

        var dom = componentParam.dom,
            style = componentParam.style,
            props = componentParam.props,
            name = componentParam.name,
            data = componentParam.data,
            run = componentParam.run,
            domChange = componentParam.domChange,
            watch = componentParam.watch;

        this.dom = dom;
        this.style = style;
        this.rdom = this.rdom;
        this.props = props;
        this.name = name;
        this.data = data;
        this.componentRun = run;
        this.componentDomChange = domChange;
        this.rvDomUtil = new _rvDomUtil2.default(data);
        this.observeMap = new _map2.default();
        this.watchObj = watch;
        _util2.default.addStyle2Head(this.style);
    }

    _createClass(RvComponent, [{
        key: "applyTruthFulData",
        value: function applyTruthFulData() {
            this.rdom = this.rvDomUtil.applyTruthfulData(this.dom);
            Object.defineProperty(this.rdom, "component", { value: true });
        }
    }, {
        key: "run",
        value: function run() {
            this.componentRun.call(this);
        }
    }, {
        key: "domChange",
        value: function domChange() {
            this.componentDomChange.call(this);
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "apply",
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
        key: "childContent",
        value: function childContent(dom, props) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = dom.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    children = _step2.value;

                    if (_util2.default.isString(children)) {
                        if (_util2.default.isPlaceHolder(children)) {
                            value = props[_util2.default.getPlaceHolderValue(children)];
                        }
                    } else {
                        this.childContent(children);
                    }
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
        }
    }, {
        key: "getDom",
        value: function getDom() {
            return this.rdom;
        }
    }, {
        key: "getProp",
        value: function getProp() {
            return this.props;
        }
    }]);

    return RvComponent;
}();

exports.default = RvComponent;

/***/ }),

/***/ "./src/rv/rvDomUtil.js":
/*!*****************************!*\
  !*** ./src/rv/rvDomUtil.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ "./src/rv/util.js");

var _util2 = _interopRequireDefault(_util);

var _element = __webpack_require__(/*! ./element */ "./src/rv/element.js");

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "getVirtualElement",
        value: function getVirtualElement(dom) {
            var _this = this;

            var children = [];
            for (var child in dom.children) {
                var cc = dom.children[child];
                if (cc instanceof Array) {
                    cc.forEach(function (c) {
                        var v = _this.getVirtualElement(c);
                        children.push(v);
                    });
                } else if (cc instanceof Object) {
                    var v = this.getVirtualElement(cc);
                    children.push(v);
                } else {
                    children.push(cc);
                }
            }

            return new _element2.default(dom.tag, dom.props, children);
        }
    }, {
        key: "applyTruthfulData",
        value: function applyTruthfulData(dom) {
            var _this2 = this;

            if ("for" in dom.props) {
                var dataArray = [];
                var dataSingle = void 0;

                if (_util2.default.isForIn(dom.props['for'])) {
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

                    var obj = _this2.vdom2rdom(dom, data, dataSingle, data);

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

                var obj = this.vdom2rdom(dom, data, childDomDatakey, data);

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
        key: "vdom2rdom",
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
                    if (_util2.default.isPlaceHolder(dom.props[value])) {
                        if (!_util2.default.isDotOperatorExpression(_util2.default.getPlaceHolderValue(dom.props[value]))) {
                            obj.props[value] = tdata[_util2.default.getPlaceHolderValue(dom.props[value])];
                        } else {
                            obj.props[value] = data[_util2.default.getPlaceHolderValue(dom.props[value]).split(".")[1]];
                        }
                    } else if (_util2.default.isOperatorExpression(dom.props[value])) {

                        obj.props[value] = _util2.default.getOperatorExpression(dom.props[value], data, dataSingle);
                    } else {
                        obj.props[value] = dom.props[value];
                    }
                }
            }

            for (var child in dom.children) {
                if (_util2.default.isString(dom.children[child])) {
                    if (_util2.default.isPlaceHolder(dom.children[child])) {
                        if (_util2.default.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                            obj.children[child] = tdata[_util2.default.getPlaceHolderValue(dom.children[child])];
                        } else {
                            obj.children[child] = data[_util2.default.getPlaceHolderValue(dom.children[child]).split(".")[1]];
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
                        // else{
                        //     dom.children[child].data = data
                        // }

                    }

                    if (dom.children[child].component) {
                        obj.children[child] = this.applyTruthfulData(dom.children[child]);
                        console.log("component,dom:" + JSON.stringify(dom.children[child]));
                    } else {
                        obj.children[child] = this.applyTruthfulData(dom.children[child]);
                    }
                }
            }
            return obj;
        }
    }, {
        key: "handleSingleStyle",
        value: function handleSingleStyle(data, style, dataSingle) {
            var newStyle = '';
            if (dataSingle) {
                if (_util2.default.isPlaceHolder(style)) {
                    if (_util2.default.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                        var key = _util2.default.getPlaceHolderValue(style).split(".")[1];
                        newStyle = data[key];
                    } else {
                        var styleKey = style.split(":")[0];
                        var styleValue = style.split(":")[1];
                        styleValue = data[_util2.default.getPlaceHolderValue(styleValue)];
                        newStyle = styleKey + ":" + styleValue;
                    }
                } else {
                    newStyle = style;
                }
            } else {

                var _styleKey = style.split(":")[0];
                var _styleValue = style.split(":")[1];
                if (_util2.default.isPlaceHolder(_styleValue)) {
                    _styleValue = data[_util2.default.getPlaceHolderValue(_styleValue)];
                    newStyle = _styleKey + ":" + _styleValue;
                } else {
                    newStyle = style;
                }
            }
            return newStyle;
        }
    }, {
        key: "handleArrayStyle",
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

    return RVDomUtil;
}();

exports.default = RVDomUtil;

/***/ }),

/***/ "./src/rv/rvParse.js":
/*!***************************!*\
  !*** ./src/rv/rvParse.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = __webpack_require__(/*! ./map */ "./src/rv/map.js");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
var YhmParse = function () {
  function YhmParse() {
    _classCallCheck(this, YhmParse);

    this.componetMap = new _map2.default();
    this.mIndex = 0;
    this.mMap = new _map2.default();
    this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
    this.mHandler = {
      startELement: function startELement(tagName, prop, content, that) {
        that.mIndex += 1;
        if (that.componetMap.hasKey(tagName)) {
          //已经有当前组件的记录，将当前组件插入dom中

          that.componetMap.get(tagName).apply(prop);
          that.componetMap.get(tagName).applyTruthFulData();

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
      // console.log(`total parse time:${endTime - startTime}`)


      function _parseStartTag(html, content, that) {
        var startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>');
        var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex);
        var prop = {};
        if (html.indexOf(' ') > -1) {
          var props = html.substring(html.indexOf(' ') + 1, html.indexOf('>'));

          var propsResult = props.match(that.mPropRe);
          for (var i = 0; i < propsResult.length; i++) {
            var pr = propsResult[i];

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

exports.default = YhmParse;

/***/ }),

/***/ "./src/rv/util.js":
/*!************************!*\
  !*** ./src/rv/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
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
        key: "loopGet",
        value: function loopGet(obj) {
            var _this = this;

            Object.keys(obj).forEach(function (key) {
                if (obj[key] instanceof Array) {
                    obj[key].forEach(function (childObj) {
                        _this.loopGet(childObj);
                    });
                } else {
                    obj[key];
                }
            });
        }
    }, {
        key: "isRvJsProp",
        value: function isRvJsProp(prop) {
            return ["domData", "childDomData", "for"].includes(prop);
        }
    }, {
        key: "isForIn",
        value: function isForIn(direction) {
            return (/^\w* _in_ \w*$/.test(direction)
            );
        }
    }, {
        key: "isForForIn",
        value: function isForForIn(direction) {
            return (/^\w* _in*$/.test(direction)
            );
        }
    }, {
        key: "isForOrForFor",
        value: function isForOrForFor(direction) {
            return (/^\w* _in_ \w|_in*$/.test(direction)
            );
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
        key: "addStyle2Head",
        value: function addStyle2Head(styleString) {

            var style = document.getElementsByTagName("style")[0];
            if (style) {
                //style tag exists
                try {
                    style.appendChild(document.createTextNode(styleString));
                } catch (error) {
                    console.error("component style," + error);
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
        key: "isDotOperatorExpression",
        value: function isDotOperatorExpression(content) {
            return (/^\w*\.\w*$/.test(content)
            );
        }
    }, {
        key: "getPlaceHolderValue",
        value: function getPlaceHolderValue(content) {
            return content.slice(2, -2);
        }
        /**
         * 是否为表达式
         * @param {String} content 
         */

    }, {
        key: "isOperatorExpression",
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
        key: "getOperatorExpression",
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
                            realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : "\"" + placeHolderValue + "\""; //通过placeHolder取真实的值
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

exports.default = Util;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvZGlmZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvZGlmZl9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9ydi9kb21TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9ydi9wYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvcnZDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J2L3J2RG9tVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvcnZQYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYvdXRpbC5qcyJdLCJuYW1lcyI6WyJydiIsIm15RGF0YSIsInBhcmVudCIsImNoaWxkIiwicGNvbG9yIiwiYzFjb2xvciIsImMyY29sb3IiLCJjaGlsZDIiLCJ0aW1lIiwicGtleSIsImNvbXBvbmVudENvbG9yIiwiY29tcG9uZW50Q290ZW50IiwiY29tcG9uZW50VmFsdWUiLCJ3ZWVrIiwiaWQiLCJjb250ZW50Iiwid2luZG93IiwiZGF0YSIsIlJWIiwib25sb2FkIiwiY29uc29sZSIsImxvZyIsImNvbiIsImNvbXBvbmVudCIsIm5hbWUiLCJ0ZW1wbGF0ZSIsInN0eWxlIiwicHJvcHMiLCJ2YWx1ZSIsInBjb250ZW50IiwicHZhbHVlIiwicnVuIiwiY29sb3JzIiwic2V0SW50ZXJ2YWwiLCJnZXRSYW5kb21JbnQiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJkb21DaGFuZ2UiLCJ3YXRjaCIsImVsIiwidXNlIiwiYWxlcnQiLCJjbGlja0RpdiIsIkRhdGUiLCJjbGlja1AxIiwiY2xpY2tQMiIsIkRpZmYiLCJvbGRUcmVlIiwibmV3VHJlZSIsImluZGV4IiwicGF0Y2hlcyIsImRmc1dhbGsiLCJvbGROb2RlIiwibmV3Tm9kZSIsImN1cnJlbnRQYXRjaCIsIlV0aWwiLCJpc1N0cmluZyIsInB1c2giLCJ0eXBlIiwiTk9ERV9DT05URU5UIiwidGFnTmFtZSIsImtleSIsInByb3BzUGF0Y2hlcyIsImRpZmZQcm9wcyIsIk5PREVfUFJPUFMiLCJpc0lnbm9yZUNoaWxkcmVuIiwiZGlmZkNoaWxkcmVuIiwiY2hpbGRyZW4iLCJOT0RFX1JFUExBQ0UiLCJub2RlIiwibGVuZ3RoIiwib2xkUHJvcHMiLCJuZXdQcm9wcyIsImlzU2FtZSIsImhhc093blByb3BlcnR5Iiwib2xkQ2hpbGRyZW4iLCJuZXdDaGlsZHJlbiIsImRpZmZMaXN0IiwiRGlmZkxpc3QiLCJkaWZmcyIsImdldFJlc3VsdCIsIm1vdmVzIiwicmVvcmRlclBhdGNoIiwiQ0hJTERfUkVfT1JERVIiLCJsZWZ0Tm9kZSIsImN1cnJlbnROb2RlSW5kZXgiLCJmb3JFYWNoIiwiaSIsIm5ld0NoaWxkIiwiY291bnQiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJzbGljZSIsInJlbW92ZSIsInJlbW92ZUNvcHlUZW1wTGlzdCIsIm5JdGVtIiwibkl0ZW1LZXkiLCJjSXRlbSIsImNJdGVtS2V5IiwiY05leHRJdGVtS2V5IiwiaW5zZXJ0IiwiayIsImxpc3QiLCJpdGVtIiwiaXRlbUtleSIsInVuZGVmaW5lZCIsInNwbGljZSIsIkVsZW1lbnQiLCJ0YWciLCJFcnJvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInByb3BOYW1lIiwiaXNSdkpzUHJvcCIsInNldEF0dHIiLCJjaGlsZEVsIiwicmVuZGVyIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsIm9wdGlvbiIsIm9ic2VydmVNYXAiLCJNYXAiLCJwYXJzZSIsIllobVBhcnNlIiwicnZEb21VdGlsIiwiUlZEb21VdGlsIiwicnZDb21wb25lbnRPYmoiLCJ1c2VDdXN0b21Db21wb25lbnQiLCJmdW5DYWxsYmFjayIsInJvb3QiLCJxdWVyeVNlbGVjdG9yIiwiYWRkU3R5bGUySGVhZCIsImRvbSIsIl9nZXREb21UcmVlIiwicnZUaGF0IiwiY29tcG9uZXRNYXAiLCJjb21wb25ldCIsIm9ic2VydmUiLCJhcHBseVRydXRoRnVsRGF0YSIsIl91cGRhdGVkb20iLCJsb29wR2V0IiwiT2JqZWN0Iiwia2V5cyIsIndhdGNoT2JqIiwid2F0Y2hGdW4iLCJoYXNLZXkiLCJnZXQiLCJhZGQiLCJ2ZSIsImdldFZpcnR1YWxFbGVtZW50IiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJ3IiwicGFyc2VIdG1sVGVtcGxhdGUiLCJ0cmltIiwiZSIsImVycm9yIiwiZ2V0SHRtbERvbSIsIm52ZSIsInBhdGNoIiwiZGlmZiIsImNhbGxiYWNrIiwiUnZDb21wb25lbnQiLCJvYmoiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInJlc3VsdCIsIm9DbGFzcyIsImNvcHkiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJoIiwiZCIsIlBhdGNoIiwibWFwIiwibWFwS2V5Iiwid2Fsa2VyIiwiY3VycmVudFBhdGNoZXMiLCJsZW4iLCJjaGlsZE5vZGVzIiwiYXBwbHlQYXRjaGVzIiwiY3VycmVudFBhdGNoZSIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJyZW9yZGVyQ2hpbGRyZW4iLCJzZXRQcm9wcyIsInRleHRDb250ZW50Iiwibm9kZVZhbHVlIiwic3RhdGljTm9kZUxpc3QiLCJ0b0FycmF5Iiwibm9kZU1hcHMiLCJzbm9kZSIsIm5vZGVUeXBlIiwiZ2V0QXR0cmlidXRlIiwibW92ZSIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0Tm9kZSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbXBvbmVudFBhcmFtIiwicmRvbSIsImNvbXBvbmVudFJ1biIsImNvbXBvbmVudERvbUNoYW5nZSIsInByb3AiLCJpc1BsYWNlSG9sZGVyIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsImNoaWxkQ29udGVudCIsImNjIiwiQXJyYXkiLCJ2IiwiYyIsImRhdGFBcnJheSIsImRhdGFTaW5nbGUiLCJpc0ZvckluIiwiY2hpbGREb21EYXRha2V5Iiwic3BsaXQiLCJkb21EYXRhS2V5Iiwib2JqcyIsInZkb20ycmRvbSIsInRkYXRhIiwiaW5kZXhPZiIsInN0eWxlcyIsImhhbmRsZUFycmF5U3R5bGUiLCJoYW5kbGVTaW5nbGVTdHlsZSIsImlzRG90T3BlcmF0b3JFeHByZXNzaW9uIiwiaXNPcGVyYXRvckV4cHJlc3Npb24iLCJnZXRPcGVyYXRvckV4cHJlc3Npb24iLCJjaGlsZERvbURhdGEiLCJkb21EYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5ld1N0eWxlIiwic3R5bGVLZXkiLCJzdHlsZVZhbHVlIiwibmV3U3R5bGVBcnJheSIsIm1JbmRleCIsIm1NYXAiLCJtUHJvcFJlIiwibUhhbmRsZXIiLCJzdGFydEVMZW1lbnQiLCJ0aGF0IiwiYXBwbHkiLCJnZXREb20iLCJpc0Nsb3NlIiwiZW5kRWxlbWVudCIsInJ2Q29tcG9uZW50IiwiZ2V0TmFtZSIsImh0bWwiLCJzdGFydFRpbWUiLCJzdGFydFRhZ09wZW4iLCJzdGFydFRhZ0Nsb3NlIiwiZW5kVGFnT3BlbiIsImVuZFRhZ0Nsb3NlIiwic3RhcnRDb21tZW50T3BlbiIsImVuZENvbW1lbnRDbG9zZSIsInBhcnNlQ29tbWVudCIsInN1YnN0cmluZyIsIl9wYXJzZUVuZFRhZyIsIl9wYXJzZVN0YXJ0VGFnIiwiZW5kVGltZSIsInN0YXJ0VGFnRW5kSW5kZXgiLCJwcm9wc1Jlc3VsdCIsIm1hdGNoIiwicHIiLCJ0ZXN0Iiwic29tZSIsImFycmF5IiwiY2hpbGRPYmoiLCJpbmNsdWRlcyIsImRpcmVjdGlvbiIsInJlTnVtYmVyIiwicmVOZU51bWJlciIsInJlUmVhbE51bWJlcjEiLCJyZVJlYWxOdW1iZXIyIiwicmVOZVJlYWxOdW1iZXIxIiwicmVOZVJlYWxOdW1iZXIyIiwic3R5bGVTdHJpbmciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlc2hlZXQiLCJjc3NUZXh0IiwiaGVhZCIsInRvTG93ZXJDYXNlIiwic2V0QXR0cmlidXRlIiwiZGF0YUtleSIsImV4cHJlc3Npb24iLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJwbGFjZUhvbGRlciIsInJlYWxWYWx1ZSIsInBsYWNlSG9sZGVyVmFsdWUiLCJpc051bWJlciIsInJlcGxhY2UiLCJldmFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FB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WCxDQUFtQixJQUFuQixJQUEyQixDQUExQztBQUNBLG9CQUFJaUUsY0FBYyxDQUFDLENBQWYsSUFBb0JDLFlBQVksQ0FBQyxDQUFqQyxJQUFzQ0QsYUFBYUMsUUFBdkQsRUFBaUU7QUFDN0Qsd0JBQUlDLGNBQWNILFdBQVdqTixLQUFYLENBQWlCa04sVUFBakIsRUFBNkJDLFFBQTdCLENBQWxCO0FBQ0Esd0JBQUlFLGtCQUFKO0FBQ0Esd0JBQUlELFlBQVluRSxPQUFaLENBQW9CLEdBQXBCLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCLDRCQUFJaE0sS0FBS2lMLG1CQUFMLENBQXlCa0YsV0FBekIsRUFBc0N4RSxLQUF0QyxDQUE0QyxHQUE1QyxFQUFpRCxDQUFqRCxNQUF3RG9FLE9BQTVELEVBQXFFO0FBQ2pFLGdDQUFJTSxtQkFBbUI3UyxLQUFLd0MsS0FBS2lMLG1CQUFMLENBQXlCa0YsV0FBekIsRUFBc0N4RSxLQUF0QyxDQUE0QyxHQUE1QyxFQUFpRCxDQUFqRCxDQUFMLENBQXZCO0FBQ0F5RSx3Q0FBWXBRLEtBQUtzUSxRQUFMLENBQWNELGdCQUFkLElBQWtDQSxnQkFBbEMsVUFBeURBLGdCQUF6RCxPQUFaLENBRmlFLENBRXVCO0FBRTNGO0FBR0oscUJBUkQsTUFRTztBQUNIRCxvQ0FBWTVTLEtBQUt3QyxLQUFLaUwsbUJBQUwsQ0FBeUJrRixXQUF6QixDQUFMLENBQVosQ0FERyxDQUNvRDtBQUMxRDs7QUFFREgsaUNBQWFBLFdBQVdPLE9BQVgsQ0FBbUJKLFdBQW5CLEVBQWdDQyxTQUFoQyxDQUFiO0FBRUg7QUFDRCx1QkFBT0ksS0FBS1IsVUFBTCxDQUFQO0FBQ0g7QUFHSjs7Ozs7O2tCQUdVaFEsSSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8uanNcIik7XG4iLCIvLyBpbXBvcnQgUlYgZnJvbSAnLi9zcmMvcnYvbWFpbidcclxuaW1wb3J0IFJWIGZyb20gJy4vc3JjL3J2L21haW4nXHJcblxyXG5sZXQgcnZcclxuXHJcblxyXG5cclxubGV0IG15RGF0YSA9IHtcclxuICAgIHBhcmVudDogXCJwYXJlbnRcIixcclxuICAgIGNoaWxkOiBcImNoaWxkXCIsXHJcbiAgICBwY29sb3I6IFwicmVkXCIsXHJcbiAgICBjMWNvbG9yOiBcImJsdWVcIixcclxuICAgIGMyY29sb3I6IFwiZ3JlZW5cIixcclxuICAgIGNoaWxkMjogXCJjaGlsZDJcIixcclxuICAgIHRpbWU6IDEwMDAwLFxyXG4gICAgcGtleTogXCJkZGRkXCIsXHJcbiAgICBjb21wb25lbnRDb2xvcjogXCJyZWRcIiwvL+eUqOS6juiHquWumuS5iee7hOS7tlxyXG4gICAgY29tcG9uZW50Q290ZW50OiBcImNvbXBvbmVudENvdGVudCA4ODhcIiwvL+eUqOS6juiHquWumuS5iee7hOS7tlxyXG4gICAgY29tcG9uZW50VmFsdWU6IFwiY29tcG9uZW50VmFsdWUgODg4XCIsLy/nlKjkuo7oh6rlrprkuYnnu4Tku7ZcclxuICAgIHdlZWs6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxMSxcclxuICAgICAgICAgICAgY29udGVudDogXCIxMTFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMjIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiMjIyXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDMzLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjMzM1wiXHJcbiAgICAgICAgfSxcclxuICAgIF1cclxufVxyXG53aW5kb3cuZGF0YSA9IG15RGF0YSAvL+aOp+WItuWPsOS/ruaUuWRhdGHmlbDmja7vvIzop4blm77oh6rliqjliLfmlrDlhoXlrrlcclxud2luZG93LlJWID0gUlZcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29uc29sZS5sb2coXCJvbmxvYWRcIilcclxuICAgIHZhciBjb24gPSBSVi5jb21wb25lbnQoeyAvL+WumuS5ieiHquWumuS5iVJW57uE5Lu2XHJcbiAgICAgICAgbmFtZTogXCJNeUNvbXBvbmVudFwiLC8v5a6a5LmJUlbnu4Tku7blkI3lrZdcclxuICAgICAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWFhXCIga2V5PVwiYWFhXCI+PHAga2V5PVwiYmJiXCIgY2xhc3M9XCJiYmJcIiBzdHlsZT1cImNvbG9yOiUjcGNvbG9yIyVcIiB0aW1lPVwiJSN0aW1lIyVcIiBjb21wb25lbnRWYWx1ZT1cIiUjcHZhbHVlIyVcIj5cIiUjcGNvbnRlbnQjJVwiPC9wPjxkaXY+XHJcbiAgICAgICAgYCwvL+WumuS5iVJW57uE5Lu2LEhUTUzor63ms5Xlo7DmmI7nu4Tku7bmqKHmnb9cclxuICAgICAgICBzdHlsZTogYFxyXG4gICAgICAgIC5hYWEge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgLmJiYiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA1MDBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBgLFxyXG4gICAgICAgIC8v5a6a5LmJUlbnu4Tku7bmoLflvI/ooagsY3Nz6K+t5rOV5aOw5piO57uE5Lu25qC35byPXHJcbiAgICAgICAgcHJvcHM6IHsvL+WumuS5iVJW57uE5Lu25bGe5oCnLOeUqOS6juWklumDqOiuvuWAvOe7hOS7tuWxnuaAp1xyXG4gICAgICAgICAgICB0aW1lOiBcIjEwMDBcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJhIGN1c3RvbSBjb21wb25lbnRcIixcclxuICAgICAgICAgICAgdmFsdWU6IFwiY29tcG9uZW50VmFsdWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogey8v5a6a5LmJUlbnu4Tku7ZkYXRhLGRhdGHmlbDmja7lj5jljJbvvIzoh6rliqjmm7TmlrDmqKHmnb/lhoXlrrlcclxuICAgICAgICAgICAgcGNvbnRlbnQ6IFwiYSBjdXN0b20gY29tcG9uZW50XCIsXHJcbiAgICAgICAgICAgIHBjb2xvcjogXCJ5ZWxsb3dcIixcclxuICAgICAgICAgICAgdGltZTogMTAwMDAsXHJcbiAgICAgICAgICAgIHB2YWx1ZTogXCJjdmFsdWVcIlxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBydW4oKSB7Ly/lrprkuYnoh6rlrprkuYlSVue7hOS7tui/kOihjOS7o+eggSznlKjkuo7ov5DooYxSVue7hOS7tuebuOWFs0pT5Luj56CBLFJW57uE5Lu25ZCv5Yqo5pe25ZCv5Yqo5q2k5pa55rOVXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnLCAneWVsbG93JywgJ2dyYXknLCAnd2hpdGUnLCAnYmxhY2snXVxyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnBjb250ZW50ID0gdGhpcy5wcm9wcy5jb250ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEudGltZSA9IHRoaXMucHJvcHMudGltZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB2YWx1ZSA9IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wY29sb3IgPSBjb2xvcnNbZ2V0UmFuZG9tSW50KDYpXVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tQ2hhbmdlKCkge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgIHBjb2xvcigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBwY29sb3JDaGFuZ2UsY2hhbmdlOmApXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9KVxyXG4gICAgcnYgPSBuZXcgUlYoIC8v5Yib5bu65a+56LGhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbDogXCIjYXBwXCIsXHJcbiAgICAgICAgICAgIC8vZWzlr7nosaHmjILovb3nmoToioLngrlzXHJcbiAgICAgICAgICAgIGRhdGE6IG15RGF0YSwvL+aVsOaNruWvueixoe+8jOeUqOS6jumpseWKqOinhuWbvuabtOaWsO+8jOaVsOaNruWPmOWMlu+8jOinhuWbvuiHquWKqOabtOaWsFxyXG4gICAgICAgICAgICBzdHlsZTogYGAsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPGRpdiBrZXk9XCIxXCIgc3R5bGU9XCJjb2xvcjolI3Bjb2xvciMlLHdpZHRoOjEwMHB4LGhlaWdodDoxMDBweFwiIG9uY2xpY2s9XCJjbGlja0RpdigpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIiUjcGFyZW50IyVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwiMlwiIHN0eWxlPVwiY29sb3I6JSNjMWNvbG9yIyUsd2lkdGg6NTBweCxoZWlnaHQ6NTBweFwiIG9uY2xpY2s9XCJjbGlja1AxKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiUjY2hpbGQjJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8cCBrZXk9XCIzXCIgc3R5bGU9XCJjb2xvcjolI2MyY29sb3IjJSx3aWR0aDo1MHB4LGhlaWdodDo1MHB4XCIgb25jbGljaz1cImNsaWNrUDIoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIlI2NoaWxkMiMlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PVwiNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwieyUjdi5pZCMlKydfY29udGVudCd9XCIgY2hpbGREb21EYXRhPVwidlwiIGZvcj1cInYgX2luXyB3ZWVrXCIgIGRvbURhdGE9XCJ3ZWVrXCI+XCIlI3YuY29udGVudCMlXCI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxNeUNvbXBvbmVudCBjb250ZW50PVwiJSNjb21wb25lbnRDb3RlbnQjJVwiICB0aW1lPVwie01hdGguZmxvb3IobmV3IERhdGUoKS8xMDAwKSsnX3R0dCd9XCIgdmFsdWU9XCIlI2NvbXBvbmVudFZhbHVlIyVcIiBrZXk9XCI4ODhcIj48L015Q29tcG9uZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICB9KVxyXG4gICAgcnYudXNlKGNvbikgLy/ms6jlhozoh6rlrprkuYlSVue7hOS7tlxyXG4gICAgcnYucnVuKChydikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicnYscnVuOlwiKVxyXG5cclxuICAgIH0pLy/lkK/liqhcclxuICAgIHJ2LndhdGNoKFwicGFyZW50XCIsICgpID0+IHtcclxuICAgICAgICBhbGVydChcInBhcmVudCxjaGFuZ2VcIilcclxuICAgIH0pIC8vcnYud2F0Y2goXCJrZXlcIixjYWxsYmFjaykg6KeC5a+fZGF0YeaVsOaNruWvueixoeWvueW6lGtleeeahOaVsOWAvOWPmOWMlizlj5jljJbop6blj5FjYWxsYmFja1xyXG4gICAgcnYud2F0Y2goXCJjaGlsZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZCxjaGFuZ2VcIilcclxuICAgIH0pXHJcbiAgICBydi53YXRjaChcImNoaWxkMlwiLCAoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJjaGlsZDIsY2hhbmdlXCIpXHJcbiAgICB9KVxyXG4gICAgd2luZG93LmNsaWNrRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJ2LmRhdGEucGFyZW50ID0gYGNsaWNrIERpdiB0aW1lOiR7bmV3IERhdGUoKSAvIDEwMDB9YCAvL2RhdGHlj5jljJbvvIzop4blm77oh6rliqjmm7TmlrBcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuY2xpY2tQMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBydi5kYXRhLmNoaWxkID0gYGNsaWNrIHAxIHRpbWU6JHtuZXcgRGF0ZSgpIC8gMTAwMH1gIC8vZGF0YeWPmOWMlizop4blm77oh6rliqjmm7TmlrBcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuY2xpY2tQMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBydi5kYXRhLmNoaWxkMiA9IGBjbGljayBwMiB0aW1lOiR7bmV3IERhdGUoKSAvIDEwMDB9YCAvL2RhdGHlj5jljJYs6KeG5Zu+6Ieq5Yqo5pu05pawXHJcbiAgICB9XHJcbiAgICB3aW5kb3cucnYgPSBydlxyXG5cclxuXHJcbn0iLCJpbXBvcnQgRGlmZkxpc3QgZnJvbSBcIi4vZGlmZl9saXN0XCJcclxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbFwiXHJcbmltcG9ydCB7Tk9ERV9SRVBMQUNFLENISUxEX1JFX09SREVSLE5PREVfUFJPUFMsTk9ERV9DT05URU5UfSBmcm9tIFwiLi9kb21TdGF0ZVwiXHJcbmNsYXNzIERpZmYge1xyXG4gICAgLyoqXHJcbiAgICAgKiBkb20gdHJlZSBkaWZmIGFsZ29yaXRobSBvYmplY3QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVHJlZSB0aGUgZG9tIHRyZWUgZm9yIGJlZm9yZSB1cGRhdGUgXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1RyZWUgdGhlIGRvbSB0cmVlIGZvciBhZnRlciB1cGRhdGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob2xkVHJlZSwgbmV3VHJlZSkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwXHJcbiAgICAgICAgdGhpcy5wYXRjaGVzID0ge31cclxuICAgICAgICB0aGlzLmRmc1dhbGsob2xkVHJlZSwgbmV3VHJlZSwgdGhpcy5pbmRleClcclxuICAgIH1cclxuICAgIGRmc1dhbGsob2xkTm9kZSwgbmV3Tm9kZSwgaW5kZXgpIHtcclxuICAgICAgICBsZXQgY3VycmVudFBhdGNoID0gW11cclxuICAgICAgICBpZiAobmV3Tm9kZSA9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc1N0cmluZyhvbGROb2RlKSAmJiBVdGlsLmlzU3RyaW5nKG5ld05vZGUpKSB7XHJcbiAgICAgICAgICAgIGlmIChvbGROb2RlICE9IG5ld05vZGUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX0NPTlRFTlQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogbmV3Tm9kZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2xkTm9kZS50YWdOYW1lID09PSBuZXdOb2RlLnRhZ05hbWUgJiYgb2xkTm9kZS5rZXkgPT0gbmV3Tm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgbGV0IHByb3BzUGF0Y2hlcyA9IHRoaXMuZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpXHJcbiAgICAgICAgICAgIGlmIChwcm9wc1BhdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX1BST1BTLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBwcm9wc1BhdGNoZXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFVdGlsLmlzSWdub3JlQ2hpbGRyZW4obmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlmZkNoaWxkcmVuKG9sZE5vZGUuY2hpbGRyZW4sIG5ld05vZGUuY2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOk5PREVfUkVQTEFDRSxcclxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxyXG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xyXG5cclxuICAgIH1cclxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcclxuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxyXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXHJcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxyXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6Q0hJTERfUkVfT1JERVIsXHJcbiAgICAgICAgICAgICAgICBtb3ZlczogZGlmZnMubW92ZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaChyZW9yZGVyUGF0Y2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0Tm9kZSA9IG51bGxcclxuICAgICAgICBsZXQgY3VycmVudE5vZGVJbmRleCA9IGluZGV4XHJcbiAgICAgICAgb2xkQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5baV1cclxuICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCA9IChsZWZ0Tm9kZSAmJiBsZWZ0Tm9kZS5jb3VudCkgP1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIGxlZnROb2RlLmNvdW50ICsgMSA6XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ICsgMVxyXG4gICAgICAgICAgICB0aGlzLmRmc1dhbGsoY2hpbGQsIG5ld0NoaWxkLCBjdXJyZW50Tm9kZUluZGV4KVxyXG4gICAgICAgICAgICBsZWZ0Tm9kZSA9IGNoaWxkXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERpZmY7IiwiY2xhc3MgRGlmZkxpc3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiBkaWZmIGxpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZExpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld0xpc3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob2xkTGlzdCwgbmV3TGlzdCkge1xyXG4gICAgICAgIGxldCBvbGRMaXN0S2V5SW5kZXggPSB0aGlzLm1ha2VLZXlJbmRleChvbGRMaXN0KS5rZXlJbmRleFxyXG4gICAgICAgIGxldCBuZXdMaXN0S2V5SW5kZXggPSB0aGlzLm1ha2VLZXlJbmRleChuZXdMaXN0KS5rZXlJbmRleFxyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yID0gW11cclxuICAgICAgICB0aGlzLmNoaWxkTGlzdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkTGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgb0l0ZW1LZXkgPSB0aGlzLmdldEtleShvbGRJdGVtKVxyXG4gICAgICAgICAgICBpZiAoIW5ld0xpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShvSXRlbUtleSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobnVsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobmV3TGlzdFtuZXdMaXN0S2V5SW5kZXhbb0l0ZW1LZXldXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBMaXN0ID0gdGhpcy5jaGlsZExpc3Quc2xpY2UoMClcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnRlbXBMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wTGlzdFtpXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuSXRlbSA9IG5ld0xpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG5JdGVtS2V5ID0gdGhpcy5nZXRLZXkobkl0ZW0pXHJcbiAgICAgICAgICAgIGxldCBjSXRlbSA9IHRoaXMudGVtcExpc3RbaW5kZXhdXHJcbiAgICAgICAgICAgIGxldCBjSXRlbUtleSA9IHRoaXMuZ2V0S2V5KGNJdGVtKVxyXG4gICAgICAgICAgICBpZiAoY0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChuSXRlbUtleSAhPSBjSXRlbUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkobkl0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjTmV4dEl0ZW1LZXkgPSBnZXRLZXkodGhpcy50ZW1wTGlzdFtpbmRleCArIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgPT09IGNOZXh0SXRlbUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBrID0gdGhpcy50ZW1wTGlzdC5sZW5ndGggLSBpbmRleFxyXG4gICAgICAgIHdoaWxlIChpbmRleCsrIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgay0tXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGsgKyBuZXdMaXN0Lmxlbmd0aClcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIG1ha2VLZXlJbmRleChsaXN0KSB7XHJcbiAgICAgICAgbGV0IGtleUluZGV4ID0ge31cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBpdGVtS2V5ID0gdGhpcy5nZXRLZXkoaXRlbSlcclxuICAgICAgICAgICAga2V5SW5kZXhbaXRlbUtleV0gPSBpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGtleUluZGV4OiBrZXlJbmRleFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkoaXRlbSkge1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtW1wia2V5XCJdXHJcbiAgICB9XHJcbiAgICByZW1vdmVDb3B5VGVtcExpc3QoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRlbXBMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgIH1cclxuICAgIHJlbW92ZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHR5cGU6IDBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3VsdCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlczogdGhpcy5tb3ZlT3BlcmF0b3IsXHJcbiAgICAgICAgICAgIGNoaWxkOiB0aGlzLmNoaWxkTGlzdFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBEaWZmTGlzdDtcclxuIiwiY29uc3QgTk9ERV9SRVBMQUNFID0gMDsgLy9ub2RlIHJlcGxhY2UgXHJcbmNvbnN0IENISUxEX1JFX09SREVSID0gMTsgLy9jaGlsZCBub2RlIHJlIG9yZGVyXHJcbmNvbnN0IE5PREVfUFJPUFMgPSAyOyAvL3Byb3AgY2hhbmdlIFxyXG5jb25zdCBOT0RFX0NPTlRFTlQgPSAzOyAvL2NvbnRlbnQgY2hhbmdlXHJcbmV4cG9ydCB7XHJcbiAgICBOT0RFX1JFUExBQ0UsQ0hJTERfUkVfT1JERVIsTk9ERV9QUk9QUyxOT0RFX0NPTlRFTlRcclxufVxyXG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlsXCJcclxuY2xhc3MgRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIHZpcnR1YWwgZG9tIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSB0YWcgIHRoZSBodG1sIHRhZyBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BzICB0aGUgcHJvcCAoa2V577yMc3R5bGUuLilcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gY2hpbGQgZGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0YWcsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhZyA9IHRhZ1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7fVxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxyXG4gICAgICAgIHRoaXMua2V5ID0gcHJvcHMgPyBwcm9wcy5rZXkgOiB1bmRlZmluZWRcclxuICAgICAgICBpZiAoIXRoaXMua2V5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd9IC4uLiBodG1sIHRhZyB0aGUga2V5IGlzIHVuZGVmaW5lZGApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gY2hpbGQuY291bnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCsrXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHRoZSBtZXRob2QgdXNlIHRvIHZpcnR1YWwgZG9tICByZW5kZSB0byByZWFsIGRvbVxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKVxyXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKCFVdGlsLmlzUnZKc1Byb3AocHJvcE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsLnNldEF0dHIoZWwsIHByb3BOYW1lLCBwcm9wc1twcm9wTmFtZV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBFbGVtZW50O1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlsXCJcclxuaW1wb3J0IFBhdGNoIGZyb20gXCIuL3BhdGNoXCJcclxuaW1wb3J0IERpZmYgZnJvbSBcIi4vZGlmZlwiXHJcbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRcIlxyXG5pbXBvcnQgWWhtUGFyc2UgZnJvbSBcIi4vcnZQYXJzZVwiXHJcbmltcG9ydCBSVkRvbVV0aWwgZnJvbSBcIi4vcnZEb21VdGlsXCJcclxuaW1wb3J0IFJ2Q29tcG9uZW50IGZyb20gXCIuL3J2Q29tcG9uZW50XCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXBcIlxyXG5jbGFzcyBSViB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICBzdHlsZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVcclxuICAgICAgICB9ID0gb3B0aW9uXHJcbiAgICAgICAgdGhpcy5lbCA9IGVsXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZVxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIHRoaXMucGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIHRoaXMucnZEb21VdGlsID0gbmV3IFJWRG9tVXRpbCh0aGlzLmRhdGEpXHJcblxyXG5cclxuICAgIH1cclxuICAgIHVzZShydkNvbXBvbmVudE9iaikge1xyXG4gICAgICAgIHRoaXMucGFyc2UudXNlQ3VzdG9tQ29tcG9uZW50KHJ2Q29tcG9uZW50T2JqKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBydW4gcnZcclxuICAgICAqL1xyXG4gICAgcnVuKGZ1bkNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSBVdGlsLmlzU3RyaW5nKHRoaXMuZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVsKSA6IHRoaXMuZWxcclxuICAgICAgICBVdGlsLmFkZFN0eWxlMkhlYWQodGhpcy5zdHlsZSlcclxuICAgICAgICBsZXQgZG9tID0gdGhpcy5fZ2V0RG9tVHJlZSgpXHJcblxyXG4gICAgICAgIGxldCBydlRoYXQgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5wYXJzZS5jb21wb25ldE1hcC5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25ldCkge1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZShjb21wb25ldC5kYXRhLCBjb21wb25ldC5vYnNlcnZlTWFwLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9tID0gcnZUaGF0Ll9nZXREb21UcmVlKClcclxuICAgICAgICAgICAgICAgIGNvbXBvbmV0LmFwcGx5VHJ1dGhGdWxEYXRhKClcclxuICAgICAgICAgICAgICAgIHJ2VGhhdC5fdXBkYXRlZG9tKGRvbSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVXRpbC5sb29wR2V0KGNvbXBvbmV0LmRhdGEpXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmV0LndhdGNoT2JqKS5mb3JFYWNoKCh3YXRjaEZ1bikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29tcG9uZXQub2JzZXJ2ZU1hcC5oYXNLZXkod2F0Y2hGdW4pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmV0Lm9ic2VydmVNYXAuZ2V0KHdhdGNoRnVuKS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25ldC53YXRjaE9ialt3YXRjaEZ1bl0oKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbXBvbmV0LnJ1bigpXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMudmUgPSB0aGlzLnJ2RG9tVXRpbC5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLnJ2RG9tVXRpbC5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgIHRoaXMudyA9IHRoaXMudmUucmVuZGVyKClcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcclxuXHJcbiAgICAgICAgb2JzZXJ2ZSh0aGlzLmRhdGEsIHRoaXMub2JzZXJ2ZU1hcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVkb20oZG9tKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlZG9tKGRvbSlcclxuICAgICAgICBmdW5DYWxsYmFjayh0aGlzKVxyXG4gICAgfVxyXG4gICAgX2dldERvbVRyZWUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0aGlzLnRlbXBsYXRlLnRyaW0oKSlcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBydiBwYXJzZSBlOiR7ZX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZS5nZXRIdG1sRG9tKClcclxuICAgIH1cclxuICAgIF91cGRhdGVkb20oZG9tKSB7XHJcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMucnZEb21VdGlsLmdldFZpcnR1YWxFbGVtZW50KHRoaXMucnZEb21VdGlsLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgd2luZG93Lm52ZSA9IG52ZVxyXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcclxuICAgICAgICBwYXRjaCh0aGlzLncsIGRpZmYodGhpcy52ZSwgbnZlKSlcclxuICAgICAgICB0aGlzLnBhcnNlLmNvbXBvbmV0TWFwLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuZG9tQ2hhbmdlKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudmUgPSBudmVcclxuICAgIH1cclxuICAgIHdhdGNoKGtleSwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5vYnNlcnZlTWFwLmhhc0tleShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU1hcC5nZXQoa2V5KS5hZGQoY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdGhpcyBzdGF0aWMgZnVuY3Rpb24gdXNlIHRvIGRlY2xhcmF0aW9uIGEgUlYgY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0geyp9IG9wdGlvbiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbXBvbmVudChvcHRpb24pIHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCB0ZW1wbGF0ZSwgc3R5bGUsIHByb3BzLCBkYXRhIH0gPSBvcHRpb25cclxuICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIHBhcnNlLnBhcnNlSHRtbFRlbXBsYXRlKHRlbXBsYXRlLnRyaW0oKSlcclxuXHJcbiAgICAgICAgbGV0IGRvbSA9IHBhcnNlLmdldEh0bWxEb20oKVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFJ2Q29tcG9uZW50KHsgZG9tOiBkb20sIHN0eWxlOiBzdHlsZSwgcHJvcHM6IHByb3BzLCBuYW1lOiBuYW1lLCBkYXRhOiBkYXRhLCBydW46IG9wdGlvbi5ydW4sIGRvbUNoYW5nZTogb3B0aW9uLmRvbUNoYW5nZSwgd2F0Y2g6IG9wdGlvbi53YXRjaCB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBvYnNlcnZlKG9iaiwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBsZXQgaW50ZXJuYWxWYWx1ZSA9IG9ialtrZXldXHJcbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgaWYgKGludGVybmFsVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZShpbnRlcm5hbFZhbHVlLCBvYnNlcnZlTWFwLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2ZU1hcC5wdXQoa2V5LCBvYnNlcnZhYmxlKVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmFkZChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGludGVybmFsVmFsdWUgPSBuZXdWYWxcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4gb2JqXHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgT2JzZXJ2YWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoKVxyXG4gICAgfVxyXG4gICAgYWRkKG9ic2VydmFibGVVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5hZGQob2JzZXJ2YWJsZVVwZGF0ZSlcclxuICAgIH1cclxuICAgIGludm9rZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZ1biA9PiBmdW4oKSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxyXG4gKiBAcGFyYW0geyp9IG9iaiBcclxuICovXHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgbGV0IGdldFR5cGUgPSAobykgPT4ge1xyXG4gICAgICAgIGlmIChvID09PSBudWxsKSByZXR1cm4gXCJudWxsXCI7XHJcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XHJcbiAgICBpZiAob0NsYXNzID09PSBcIk9iamVjdFwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xyXG4gICAgICAgIGlmIChnZXRUeXBlKGNvcHkpID09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxufVxyXG5mdW5jdGlvbiBkaWZmKG9sZFRyZWUsIG5ld1RyZWUpIHtcclxuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcclxuICAgIHJldHVybiBkLnBhdGNoZXNcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBhdGNoKG5vZGUsIHBhdGNoZXMpIHtcclxuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSViIsIi8qKlxyXG4gKiB0aGUgbWFwIG9iamVjdCB1c2UgdG8gc2F2ZSBsaWtpbHkgKGtleSx2YWx1ZSkgZGF0YVxyXG4gKi9cclxuY2xhc3MgTWFwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxuICAgIHB1dChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMubWFwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApID8gdGhpcy5tYXBba2V5XSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoa2V5KSB7XHJcbiAgICAgICAgaWYgKChrZXkgaW4gdGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldXHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoLS07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhc0tleShrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcClcclxuICAgIH1cclxuICAgIGZvckVhY2goY2FsbGJhY2spIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm1hcCkuZm9yRWFjaChtYXBLZXkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLm1hcFttYXBLZXldKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTWFwIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHtOT0RFX1JFUExBQ0UsQ0hJTERfUkVfT1JERVIsTk9ERV9QUk9QUyxOT0RFX0NPTlRFTlR9IGZyb20gXCIuL2RvbVN0YXRlXCJcclxuY2xhc3MgUGF0Y2gge1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCB3YWxrZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXHJcbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XHJcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xyXG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXHJcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cclxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxyXG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXHJcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxyXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFBhdGNoOyIsImltcG9ydCBSVkRvbVV0aWwgZnJvbSBcIi4vcnZEb21VdGlsXCJcclxuaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vbWFwXCJcclxuY2xhc3MgUnZDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50UGFyYW0pIHtcclxuICAgICAgICBsZXQgeyBkb20sIHN0eWxlLCBwcm9wcywgbmFtZSwgZGF0YSwgcnVuLCBkb21DaGFuZ2UsIHdhdGNoIH0gPSBjb21wb25lbnRQYXJhbVxyXG4gICAgICAgIHRoaXMuZG9tID0gZG9tXHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgdGhpcy5yZG9tID0gdGhpcy5yZG9tXHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFJ1biA9IHJ1blxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RG9tQ2hhbmdlID0gZG9tQ2hhbmdlXHJcbiAgICAgICAgdGhpcy5ydkRvbVV0aWwgPSBuZXcgUlZEb21VdGlsKGRhdGEpXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwID0gbmV3IE1hcCgpXHJcbiAgICAgICAgdGhpcy53YXRjaE9iaiA9IHdhdGNoXHJcbiAgICAgICAgVXRpbC5hZGRTdHlsZTJIZWFkKHRoaXMuc3R5bGUpXHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUcnV0aEZ1bERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5yZG9tID0gdGhpcy5ydkRvbVV0aWwuYXBwbHlUcnV0aGZ1bERhdGEodGhpcy5kb20pXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucmRvbSwgXCJjb21wb25lbnRcIiwgeyB2YWx1ZTogdHJ1ZSB9KVxyXG4gICAgfVxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50UnVuLmNhbGwodGhpcylcclxuICAgIH1cclxuICAgIGRvbUNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudERvbUNoYW5nZS5jYWxsKHRoaXMpXHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcclxuICAgIH1cclxuICAgIGFwcGx5KHByb3BzKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByb3Agb2YgT2JqZWN0LmtleXModGhpcy5wcm9wcykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wc1twcm9wXSA9IHByb3BzW3Byb3BdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBjaGlsZENvbnRlbnQoZG9tLCBwcm9wcykge1xyXG4gICAgICAgIGZvciAoY2hpbGRyZW4gb2YgZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihjaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BzW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShjaGlsZHJlbildXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZENvbnRlbnQoY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJkb21cclxuICAgIH1cclxuICAgIGdldFByb3AoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUnZDb21wb25lbnQiLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlsXCJcclxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudFwiXHJcblxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpbmNsdWRlIGEgc2V0IG9mIGNvbW1vbiBmdW5jdGlvbiBmb3IgaGFuZGxlIHZpcnR1YWwgRE9NXHJcbiAqIEBhdXRob3IgeWhvbmdtXHJcbiAqL1xyXG5jbGFzcyBSVkRvbVV0aWwge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgIGlmIChjYyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjYylcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRWxlbWVudChkb20udGFnLCBkb20ucHJvcHMsIGNoaWxkcmVuKVxyXG4gICAgfVxyXG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XHJcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXVxyXG4gICAgICAgICAgICBsZXQgZGF0YVNpbmdsZVxyXG5cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbihkb20ucHJvcHNbJ2ZvciddKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRha2V5XCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFLZXlcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXSA9PT0gZG9tLmRvbURhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgZm9yIGRpcmVjdGl2ZSB1c2UgZXJyb3JcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXHJcblxyXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBkYXRhU2luZ2xlLCBkYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIG9ianMucHVzaChvYmopXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIG9ianNcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFcclxuICAgICAgICAgICAgbGV0IGNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICBpZiAoXCJkYXRhXCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBjaGlsZERvbURhdGFrZXksIGRhdGEpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSAyIHJlYWwgZGF0YSBkb21cclxuICAgICAqIEBwYXJhbSB7Kn0gZG9tIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhU2luZ2xlIFxyXG4gICAgICogQHBhcmFtIHsqfSB0ZGF0YSBcclxuICAgICAqL1xyXG4gICAgdmRvbTJyZG9tKGRvbSwgZGF0YSwgZGF0YVNpbmdsZSwgdGRhdGEpIHtcclxuICAgICAgICBsZXQgb2JqID0ge31cclxuICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xyXG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXHJcbiAgICAgICAgb2JqLnByb3BzID0ge31cclxuICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwcm9wc1twcm9wXVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsLmlzRG90T3BlcmF0b3JFeHByZXNzaW9uKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc09wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gVXRpbC5nZXRPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSwgZGF0YSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBkb20ucHJvcHNbdmFsdWVdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbS5jaGlsZHJlbltjaGlsZF0gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5jaGlsZERvbURhdGFrZXkgPSBkb20ucHJvcHMuY2hpbGREb21EYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kb21EYXRhS2V5ID0gZG9tLnByb3BzLmRvbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVtjaGlsZF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZG9tLmNoaWxkcmVuW2NoaWxkXS5jb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20uY2hpbGRyZW5bY2hpbGRdKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcG9uZW50LGRvbTpcIiArIEpTT04uc3RyaW5naWZ5KGRvbS5jaGlsZHJlbltjaGlsZF0pKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20uY2hpbGRyZW5bY2hpbGRdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG5cclxuICAgIH1cclxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlID0gJydcclxuICAgICAgICBpZiAoZGF0YVNpbmdsZSkge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKHN0eWxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLnNwbGl0KFwiLlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgbGV0IHN0eWxlVmFsdWUgPSBzdHlsZS5zcGxpdChcIjpcIilbMV1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlXHJcbiAgICB9XHJcbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZUFycmF5ID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IHN0eWxlIG9mIHN0eWxlcykge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1N0eWxlID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgbmV3U3R5bGVBcnJheSArPSBuZXdTdHlsZSArIFwiO1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdTdHlsZUFycmF5XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSVkRvbVV0aWwiLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcFwiXHJcblxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpcyBwYXJzZSBodG1sIHRlbXBsYXRlIHRvIHZpcnR1YWwgZG9tIHRyZWVcclxuICogQGF1dGhvciB5aG9uZ21cclxuICovXHJcbmNsYXNzIFlobVBhcnNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY29tcG9uZXRNYXAgPSBuZXcgTWFwKClcclxuICAgIHRoaXMubUluZGV4ID0gMFxyXG4gICAgdGhpcy5tTWFwID0gbmV3IE1hcCgpXHJcbiAgICB0aGlzLm1Qcm9wUmUgPSAvKFtePVxcc10rKShcXHMqPVxccyooKFxcXCIoW15cIl0qKVxcXCIpfChcXCcoW14nXSopXFwnKXxbXj5cXHNdKykpPy9nbVxyXG4gICAgdGhpcy5tSGFuZGxlciA9IHtcclxuICAgICAgc3RhcnRFTGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICAgIHRoYXQubUluZGV4ICs9IDFcclxuICAgICAgICBpZiAodGhhdC5jb21wb25ldE1hcC5oYXNLZXkodGFnTmFtZSkpIHtcclxuICAgICAgICAgIC8v5bey57uP5pyJ5b2T5YmN57uE5Lu255qE6K6w5b2V77yM5bCG5b2T5YmN57uE5Lu25o+S5YWlZG9t5LitXHJcblxyXG4gICAgICAgICAgdGhhdC5jb21wb25ldE1hcC5nZXQodGFnTmFtZSkuYXBwbHkocHJvcClcclxuICAgICAgICAgIHRoYXQuY29tcG9uZXRNYXAuZ2V0KHRhZ05hbWUpLmFwcGx5VHJ1dGhGdWxEYXRhKClcclxuXHJcbiAgICAgICAgICB0aGF0Lm1NYXAucHV0KHRoYXQubUluZGV4LCB0aGF0LmNvbXBvbmV0TWFwLmdldCh0YWdOYW1lKS5nZXREb20oKSlcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBvYmogPSB7IHRhZzogdGFnTmFtZSwgcHJvcHM6IHByb3AsIGNoaWxkcmVuOiBbXSwgaW5kZXg6IHRoYXQubUluZGV4LCBjb250ZW50OiBjb250ZW50LCBpc0Nsb3NlOiBmYWxzZSB9XHJcblxyXG4gICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgb2JqLmNoaWxkcmVuLnB1c2goY29udGVudC50cmltKCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGF0Lm1NYXAucHV0KHRoYXQubUluZGV4LCBvYmopXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSxcclxuICAgICAgZW5kRWxlbWVudDogZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICB0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4KS5pc0Nsb3NlID0gdHJ1ZVxyXG4gICAgICAgIGlmICh0aGF0Lm1NYXAuaGFzS2V5KCh0aGF0Lm1JbmRleCAtIDEpKSkge1xyXG4gICAgICAgICAgdGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCAtIDEpLmNoaWxkcmVuLnB1c2godGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCkpXHJcbiAgICAgICAgICB0aGF0Lm1NYXAucmVtb3ZlKHRoYXQubUluZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm1JbmRleCAtPSAxXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICog55So5LqO6Kej5p6Q6Ieq5a6a5LmJ57uE5Lu277yM5oyJ5ZCN5a2X57Si5byV57uE5Lu2XHJcbiAgICogQHBhcmFtIHsqfSBydkNvbXBvbmVudCBcclxuICAgKi9cclxuICB1c2VDdXN0b21Db21wb25lbnQocnZDb21wb25lbnQpIHtcclxuXHJcbiAgICB0aGlzLmNvbXBvbmV0TWFwLnB1dChydkNvbXBvbmVudC5nZXROYW1lKCksIHJ2Q29tcG9uZW50KVxyXG4gIH1cclxuICBwYXJzZUh0bWxUZW1wbGF0ZShodG1sKSB7XHJcbiAgICBsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgIHZhciBpbmRleCA9IDBcclxuICAgIHdoaWxlIChodG1sKSB7XHJcbiAgICAgIHZhciBzdGFydFRhZ09wZW4gPSBodG1sLmluZGV4T2YoJzwnKVxyXG4gICAgICB2YXIgc3RhcnRUYWdDbG9zZSA9IGh0bWwuaW5kZXhPZignPicpIHx8IGh0bWwuaW5kZXhPZignLz4nKVxyXG4gICAgICB2YXIgZW5kVGFnT3BlbiA9IGh0bWwuaW5kZXhPZignPC8nKVxyXG4gICAgICB2YXIgZW5kVGFnQ2xvc2UgPSBodG1sLmluZGV4T2YoJz4nKVxyXG4gICAgICB2YXIgc3RhcnRDb21tZW50T3BlbiA9IGh0bWwuaW5kZXhPZignPCEtLScpXHJcbiAgICAgIHZhciBlbmRDb21tZW50Q2xvc2UgPSBodG1sLmluZGV4T2YoJy0tPicpXHJcbiAgICAgIGlmIChzdGFydENvbW1lbnRPcGVuID09IDAgJiYgZW5kQ29tbWVudENsb3NlICE9IC0xICYmIGVuZENvbW1lbnRDbG9zZSA+IHN0YXJ0Q29tbWVudE9wZW4pIHtcclxuICAgICAgICBpbmRleCA9IGVuZENvbW1lbnRDbG9zZSArIDNcclxuICAgICAgICBwYXJzZUNvbW1lbnQoaHRtbC5zdWJzdHJpbmcoc3RhcnRDb21tZW50T3BlbiArIDQsIGVuZENvbW1lbnRDbG9zZSArIDMpKTtcclxuICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgpXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfSBlbHNlIGlmIChlbmRUYWdPcGVuICE9IC0xICYmIGVuZFRhZ0Nsb3NlICE9IC0xICYmIGVuZFRhZ0Nsb3NlID4gZW5kVGFnT3Blbikge1xyXG4gICAgICAgIGluZGV4ID0gZW5kVGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgX3BhcnNlRW5kVGFnKGh0bWwuc3Vic3RyaW5nKGVuZFRhZ09wZW4sIGVuZFRhZ0Nsb3NlICsgMSksIHRoaXMpXHJcbiAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnRUYWdPcGVuICE9IC0xICYmIHN0YXJ0VGFnQ2xvc2UgIT0gLTEgJiYgc3RhcnRUYWdDbG9zZSA+IHN0YXJ0VGFnT3Blbikge1xyXG4gICAgICAgIGluZGV4ID0gc3RhcnRUYWdDbG9zZSArIDFcclxuICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gLTEgJiYgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpID4gc3RhcnRUYWdDbG9zZSkge1xyXG4gICAgICAgICAgLy8gbGV0IGNvbnRlbnRFbmRJbmRleCA9IGh0bWwuaW5kZXhPZignPC8nLCAoaW5kZXggKyAxKSlcclxuICAgICAgICAgIGNvbnRlbnQgPSBodG1sLnN1YnN0cmluZyhpbmRleCwgaHRtbC5pbmRleE9mKCc8JywgaW5kZXgpKS50cmltKClcclxuICAgICAgICB9XHJcbiAgICAgICAgX3BhcnNlU3RhcnRUYWcoaHRtbC5zdWJzdHJpbmcoc3RhcnRUYWdPcGVuLCBzdGFydFRhZ0Nsb3NlICsgMSksIGNvbnRlbnQsIHRoaXMpXHJcbiAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKSAvIDEwMDBcclxuICAgIC8vIGNvbnNvbGUubG9nKGB0b3RhbCBwYXJzZSB0aW1lOiR7ZW5kVGltZSAtIHN0YXJ0VGltZX1gKVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gX3BhcnNlU3RhcnRUYWcoaHRtbCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICBsZXQgc3RhcnRUYWdFbmRJbmRleCA9IGh0bWwuaW5kZXhPZignICcpICE9IC0xID8gaHRtbC5pbmRleE9mKCcgJykgOiBodG1sLmluZGV4T2YoJy8+JykgPT0gLTEgPyBodG1sLmluZGV4T2YoJz4nKSA6IGh0bWwuaW5kZXhPZignLz4nKVxyXG4gICAgICB2YXIgdGFnTmFtZSA9IGh0bWwuc3Vic3RyaW5nKGh0bWwuaW5kZXhPZignPCcpICsgMSwgc3RhcnRUYWdFbmRJbmRleClcclxuICAgICAgdmFyIHByb3AgPSB7fVxyXG4gICAgICBpZiAoaHRtbC5pbmRleE9mKCcgJykgPiAtMSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IGh0bWwuc3Vic3RyaW5nKGh0bWwuaW5kZXhPZignICcpICsgMSwgaHRtbC5pbmRleE9mKCc+JykpXHJcblxyXG4gICAgICAgIHZhciBwcm9wc1Jlc3VsdCA9IHByb3BzLm1hdGNoKHRoYXQubVByb3BSZSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgcHIgPSBwcm9wc1Jlc3VsdFtpXVxyXG5cclxuICAgICAgICAgIHByb3BbcHIuc3BsaXQoXCI9XCIpWzBdXSA9IHByLnNwbGl0KFwiPVwiKVsxXS5tYXRjaCgvKD88PVwiKS4qPyg/PVwiKS8pWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhhdC5tSGFuZGxlcikge1xyXG4gICAgICAgIGlmICgvKD88PVwiKS4qPyg/PVwiKS8udGVzdChjb250ZW50KSkge1xyXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnQubWF0Y2goLyg/PD1cIikuKj8oPz1cIikvKVswXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm1IYW5kbGVyLnN0YXJ0RUxlbWVudCh0YWdOYW1lLCBwcm9wLCBjb250ZW50LCB0aGF0KVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gX3BhcnNlRW5kVGFnKGh0bWwsIHRoYXQpIHtcclxuICAgICAgaWYgKHRoYXQubUhhbmRsZXIpIHtcclxuICAgICAgICB0aGF0Lm1IYW5kbGVyLmVuZEVsZW1lbnQodGhhdClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21tZW50KGh0bWwpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coYHBhcnNlQ29tbWVudD0ke2h0bWx9YClcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIGdldEh0bWxEb20oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tTWFwLmdldCgxKVxyXG4gIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgWWhtUGFyc2VcclxuXHJcbiIsImNsYXNzIFV0aWwge1xyXG5cclxuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xyXG4gICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb29wR2V0KG9iaikge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvYmpba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XS5mb3JFYWNoKChjaGlsZE9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcEdldChjaGlsZE9iailcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNSdkpzUHJvcChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcImRvbURhdGFcIiwgXCJjaGlsZERvbURhdGFcIiwgXCJmb3JcIl0uaW5jbHVkZXMocHJvcClcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU51bWJlciA9IC9eXFxkKyQvXHJcbiAgICAgICAgICAgIC8v6LSf5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXHJcbiAgICAgICAgICAgIC8v5q2j5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcbiAgICAgICAgICAgIC8v6LSf5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcblxyXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZU5lUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZFN0eWxlMkhlYWQoc3R5bGVTdHJpbmcpIHtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKVswXVxyXG4gICAgICAgIGlmIChzdHlsZSkge1xyXG4gICAgICAgICAgICAvL3N0eWxlIHRhZyBleGlzdHNcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0eWxlU3RyaW5nKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBjb21wb25lbnQgc3R5bGUsJHtlcnJvcn1gKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuc3R5bGVzaGVldC5jc3NUZXh0ID0gc3R5bGVTdHJpbmc7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9zdHlsZSB0YWcgaXNuJ3QgZXhpdHNcclxuICAgICAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICAgICAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXVxyXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHlsZSc6XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcclxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzUGxhY2VIb2xkZXIoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiJSNcIilcclxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXHJcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcclxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwbGFjZUhvbGRlci5pbmRleE9mKFwiLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbCJdLCJzb3VyY2VSb290IjoiIn0=