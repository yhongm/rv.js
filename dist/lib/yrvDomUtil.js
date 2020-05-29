"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yrvUtil = require("./yrvUtil");

var _yrvUtil2 = _interopRequireDefault(_yrvUtil);

var _yrvElement = require("./yrvElement");

var _yrvElement2 = _interopRequireDefault(_yrvElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
var YrvDomUtil = function () {
    function YrvDomUtil(context) {
        _classCallCheck(this, YrvDomUtil);

        this.context = {}; //this Context use to save global info 
        this.index = 0;
        this.indexArrayOp = [];
    }

    _createClass(YrvDomUtil, [{
        key: "updateContext",
        value: function updateContext(newContext) {
            this.context = newContext;
        }
    }, {
        key: "getYrvElement",
        value: function getYrvElement(virtualDom, callback) {
            var _this = this;

            var children = [];
            for (var child in virtualDom.children) {
                var childVirtualDom = virtualDom.children[child];
                if (childVirtualDom instanceof Array) {

                    childVirtualDom.forEach(function (singleChildDom) {
                        children.push(_this.getYrvElement(singleChildDom, callback));
                    });
                } else if (childVirtualDom instanceof Object) {
                    children.push(this.getYrvElement(childVirtualDom, callback));
                } else {
                    children.push(childVirtualDom);
                }
            }
            return new _yrvElement2.default(virtualDom.tag, virtualDom.props, children, virtualDom.belong, virtualDom.componentUniqueTag, virtualDom.uniqueTag, virtualDom.isComponent, callback);
        }
    }, {
        key: "applyTruthfulData",
        value: function applyTruthfulData(dom) {
            var _this2 = this;

            if ("for" in dom.props) {
                var dataArray = [];
                var dataSingle = void 0;

                if (_yrvUtil2.default.isForIn(dom.props['for'])) {
                    if ("childDomDatakey" in dom) {
                        dataArray = dom.data;
                        dataSingle = dom.childDomDatakey;
                    } else if ("domDataKey" in dom) {
                        if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                            dataArray = dom.data;
                            dataSingle = dom.props['for'].split(" _in_ ")[0];
                        } else {
                            throw new Error("domData key error");
                        }
                    } else {
                        var forExpressRight = dom.props['for'].split(" _in_ ")[1];
                        if (_yrvUtil2.default.isDotOperatorExpression(forExpressRight)) {
                            var forERKey = forExpressRight.split(".")[0];
                            var forERValue = forExpressRight.split(".")[1];
                            if (forERKey in this.context.componentData) {
                                dataArray = this.context.componentData[forERKey][forERValue];
                            } else {
                                throw new Error("the for directive use error,the Dot Operator Express only in global context data");
                            }
                        } else {
                            dataArray = this.context.componentData[forExpressRight];
                        }
                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    }
                } else {
                    throw new Error("the for directive use error");
                }

                var objs = [];

                if (dataArray) {

                    dataArray.forEach(function (data) {
                        var obj = _this2.vdom2rdom(dom, data, dataSingle);
                        if (obj.props.hasOwnProperty("for")) {
                            // warning, goto there,tell me the DOM used 'for' directive ,we need to  delete 'for' props 
                            //警告,运行到此处已经说明处理过for指令。删除for指令,避免不同组件通过此for指令寻找不属于他的真实数据,会引发异常
                            //todo props childDomData ,domData
                            delete obj.props.for;
                        }
                        if (obj.props.hasOwnProperty("domData")) {
                            delete obj.props.domData;
                        }
                        objs.push(obj);
                    });
                } else {
                    throw new Error("the for directive only use in Array data");
                }
                var vDomObj = {
                    isFor: true,
                    rdom: objs
                };
                return vDomObj;
            } else {
                var data = void 0;
                var childDomDatakey = void 0;
                if ("data" in dom) {
                    data = dom.data;
                    childDomDatakey = dom.childDomDatakey;
                } else {
                    data = this.context.componentData;
                    childDomDatakey = undefined;
                }
                var obj = this.vdom2rdom(dom, data, childDomDatakey);
                var _vDomObj = {
                    isFor: false,
                    rdom: obj
                };
                return _vDomObj;
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
        value: function vdom2rdom(dom, data, dataSingle) {
            this.index += 1;
            var obj = {};
            obj.tag = dom.tag;
            obj.children = [];
            obj.props = {};
            obj.belong = dom.belong;
            obj.componentUniqueTag = dom.componentUniqueTag;
            obj.uniqueTag = dom.uniqueTag;
            obj.isComponent = dom.isComponent;
            var props = Object.keys(dom.props);
            for (var prop in props) {
                var value = props[prop];
                if (value === "style") {
                    var style = dom.props[value];
                    if (style.indexOf(";") > -1) {
                        var styles = style.split(";");
                        obj.props[value] = this.handleArrayStyle(data, styles, dataSingle);
                    } else {
                        obj.props[value] = this.handleSingleStyle(data, style, dataSingle);
                    }
                } else {
                    if (_yrvUtil2.default.isPlaceHolder(dom.props[value])) {
                        var propValue = _yrvUtil2.default.getPlaceHolderValue(dom.props[value]);
                        if (!_yrvUtil2.default.isDotOperatorExpression(propValue)) {
                            obj.props[value] = data[propValue];
                        } else {
                            var propKey = propValue.split(".")[0];
                            var propValue = propValue.split(".")[1];
                            if (propKey in this.context.componentData) {
                                obj.props[value] = this.context.componentData[propKey][propValue];
                            } else {
                                obj.props[value] = data[propValue];
                            }
                        }
                    } else if (_yrvUtil2.default.isOperatorExpression(dom.props[value])) {
                        obj.props[value] = _yrvUtil2.default.getOperatorExpression(dom.props[value], data, dataSingle, this.context);
                    } else {
                        obj.props[value] = dom.props[value];
                    }
                }
            }
            for (var child in dom.children) {
                if (_yrvUtil2.default.isString(dom.children[child])) {
                    if (_yrvUtil2.default.isPlaceHolder(dom.children[child])) {
                        var childValue = _yrvUtil2.default.getPlaceHolderValue(dom.children[child]);
                        if (!_yrvUtil2.default.isDotOperatorExpression(childValue)) {
                            obj.children[child] = _yrvUtil2.default.getNotUndefinedContent(data[childValue]);
                        } else {
                            var childValueKey = childValue.split(".")[0];
                            var childValueValue = childValue.split(".")[1];
                            if (childValueKey in this.context.componentData) {
                                obj.children[child] = _yrvUtil2.default.getNotUndefinedContent(this.context.componentData[childValueKey][childValueValue]);
                            } else {
                                obj.children[child] = _yrvUtil2.default.getNotUndefinedContent(data[childValueValue]);
                            }
                        }
                    } else if (_yrvUtil2.default.isOperatorExpression(dom.children[child])) {
                        obj.children[child] = _yrvUtil2.default.getNotUndefinedContent(_yrvUtil2.default.getOperatorExpression(dom.children[child], data, dataSingle, this.context));
                    } else {
                        obj.children[child] = _yrvUtil2.default.getNotUndefinedContent(dom.children[child]);
                    }
                } else {
                    if (dom.children[child] instanceof Object) {
                        if ("childDomData" in dom.props) {
                            if (dom.props.childDomData == "$this") {
                                dom.children[child].data = data;
                            } else {
                                dom.children[child].childDomDatakey = dom.props.childDomData;
                                dom.children[child].data = data;
                            }
                        } else if ("domData" in dom.props) {
                            if ("nofor" in dom.children[child].props) {
                                dom.children[child].data = data;
                            } else {
                                dom.children[child].domDataKey = dom.props.domData;
                                dom.children[child].data = data;
                            }
                        }
                    }
                    var domObj = this.applyTruthfulData(dom.children[child]);
                    if (domObj.isFor) {
                        domObj.rdom.forEach(function (rdom) {
                            obj.children.push(rdom);
                        });
                    } else {
                        obj.children[child] = domObj.rdom;
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
                if (_yrvUtil2.default.isPlaceHolder(style)) {
                    if (_yrvUtil2.default.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                        var key = _yrvUtil2.default.getPlaceHolderValue(style).split(".")[1];
                        newStyle = data[key];
                    } else {
                        var styleKey = style.split(":")[0];
                        var styleValue = style.split(":")[1];
                        styleValue = data[_yrvUtil2.default.getPlaceHolderValue(styleValue)];
                        newStyle = styleKey + ":" + styleValue;
                    }
                } else {
                    newStyle = style;
                }
            } else {
                var _styleKey = style.split(":")[0];
                var _styleValue = style.split(":")[1];
                if (_yrvUtil2.default.isPlaceHolder(_styleValue)) {
                    _styleValue = data[_yrvUtil2.default.getPlaceHolderValue(_styleValue)];

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

    return YrvDomUtil;
}();

exports.default = YrvDomUtil;