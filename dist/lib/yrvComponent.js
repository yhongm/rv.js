"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yrvDomUtil = require("./yrvDomUtil");

var _yrvDomUtil2 = _interopRequireDefault(_yrvDomUtil);

var _yrvUtil = require("./yrvUtil");

var _yrvUtil2 = _interopRequireDefault(_yrvUtil);

var _yrvParse = require("./yrvParse");

var _yrvParse2 = _interopRequireDefault(_yrvParse);

var _yrvMap = require("./yrvMap");

var _yrvMap2 = _interopRequireDefault(_yrvMap);

var _yrvPatch = require("./yrvPatch");

var _yrvPatch2 = _interopRequireDefault(_yrvPatch);

var _yrvDiff = require("./yrvDiff");

var _yrvDiff2 = _interopRequireDefault(_yrvDiff);

var _yrvElement = require("./yrvElement");

var _yrvElement2 = _interopRequireDefault(_yrvElement);

var _yrvRoute = require("./yrvRoute");

var _yrvRoute2 = _interopRequireDefault(_yrvRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author yhongm
 * the 'YrvComponent' class use to 'yrv' framwork  descpration component  
 */
var YrvComponent = function () {
    function YrvComponent(componentParam) {
        var ismain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, YrvComponent);

        var template = componentParam.template,
            style = componentParam.style,
            props = componentParam.props,
            name = componentParam.name,
            data = componentParam.data,
            methods = componentParam.methods,
            watch = componentParam.watch,
            onRun = componentParam.onRun,
            onDomChange = componentParam.onDomChange,
            onMount = componentParam.onMount,
            onInit = componentParam.onInit;

        this.isMainRvComponent = ismain;
        this.template = template;
        this.name = name;
        if (this.isMainRvComponent) {
            this.name = "main";
        }
        this.isParsedHtml = false;
        this.style = style;
        this._rdom = {};
        this.props = props;
        this.data = data;
        this.methods = methods;
        this.componentRun = onRun;
        this.componentDomChange = onDomChange;
        this.componentInit = onInit;
        this.mountLife = onMount;
        this.watchObj = watch;
        this._cloneMethods = _yrvUtil2.default.cloneObj(methods);
        this._cloneWatchObj = _yrvUtil2.default.cloneObj(watch);
        this.paramObj = {}; // the paramObj
        this.belongComponent = "main";
        this.componentkey = name;
        this._initInfo = false;
        this.componentUniqueTag = this.name; //the clone tag is unique
        this._isRender = false;
        this._isUpdate = false;
        this._isRun = false;
        _yrvUtil2.default.addStyle2Head(this.style, this.name);
        // this._defineMethod()
        this._init();
    }

    _createClass(YrvComponent, [{
        key: "_init",
        value: function _init() {
            this.context = {
                componentName: this.name,
                componentData: this.data,
                componentUniqueTag: this.componentUniqueTag,
                route: undefined
            };
            this.parse = new _yrvParse2.default(this.context);
            this.rvDomUtil = new _yrvDomUtil2.default(this.context);
            this.observeMap = new _yrvMap2.default(this.name + "ComponentObserveMap");
            this.yrvPatch = new _yrvPatch2.default(this.context);
            this.yrvDiff = new _yrvDiff2.default(this.context);
        }
    }, {
        key: "_belong",
        value: function _belong(belongComponent) {
            this.belongComponent = belongComponent;
        }
    }, {
        key: "getParentComponentName",
        value: function getParentComponentName() {
            return this.belongComponent;
        }
    }, {
        key: "getComponentUniqueTag",
        value: function getComponentUniqueTag() {
            return this.componentUniqueTag;
        }
    }, {
        key: "route",
        value: function route(routeConfigs) {
            this.context.route = new _yrvRoute2.default(this.name);
            this.context.route.register(routeConfigs);
        }
    }, {
        key: "use",
        value: function use(rvComponentObjProxy) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var needClone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var rvComponentObj = void 0;
            if (needClone) {
                rvComponentObj = rvComponentObjProxy["this"]._cloneNew(key);
            } else {
                rvComponentObj = rvComponentObjProxy;
            }
            this.parse.useCustomComponent(rvComponentObj);
        }
    }, {
        key: "_registerEvent",
        value: function _registerEvent() {
            var _this = this;

            _yrvUtil2.default.receiveRvEvent(this.name + "_routeChange", function (e, detail) {
                _this.context.route.go(detail);
                _this._parseHtmlTemplate(true);
                _this.context.route.getNeedRenderComponent()._rv_ev_run();
                _this._updatedom();
            });
        }
    }, {
        key: "$routeChange",
        value: function $routeChange(routeInfo) {
            var componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";

            _yrvUtil2.default.createAndSendSimpleRvEvent(componentName + "_routeChange", routeInfo);
        }
    }, {
        key: "$sendEvent",
        value: function $sendEvent(event) {
            /**
                    * this function use to send event to other component
                    * *params name   this is event name
                    * *params value  this is event value
                    * call $sendEvent(name,value) send event
                    */
            var name = event.name,
                value = event.value;

            _yrvUtil2.default.createAndSendSimpleRvEvent(name, value);
        }
    }, {
        key: "$onEvent",
        value: function $onEvent(event, callback) {
            _yrvUtil2.default.receiveRvEvent(event, function (value) {
                callback(value.detail);
            });
        }
    }, {
        key: "_defineMethod",
        value: function _defineMethod(thatThis) {
            var _this2 = this;

            if (!thatThis) {
                thatThis = this;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var method = _step.value;

                    _this2.methods[method] = _this2._cloneMethods[method].bind(thatThis); //the method this point to  this rv component object
                    var methodHandler = {
                        apply: function apply(target, thisArg, argumentsList) {
                            return target(argumentsList);
                        }
                    };
                    _yrvUtil2.default.receiveRvEvent(_yrvUtil2.default.generateHashMNameByMName(_this2.name + "_" + _this2.componentUniqueTag + "_" + method), function (e, detail) {
                        _this2.methods[method].call(thatThis, detail);
                    });
                    _yrvUtil2.default.receiveRvEvent(_this2.name + "_" + method, function (e, detail) {
                        _this2.methods[method].call(thatThis, detail);
                    });
                };

                for (var _iterator = Object.keys(this.methods)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(this.watchObj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var watchFun = _step2.value;

                    this.watchObj[watchFun] = this._cloneWatchObj[watchFun].bind(thatThis);
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var data = _step3.value;

                    _yrvUtil2.default.receiveRvEvent(_yrvUtil2.default.generateHashMNameByMName(_this2.name + "_" + _this2.componentUniqueTag + "_" + data + "change"), function (el, value) {
                        _this2.data[data] = value;
                    });
                };

                for (var _iterator3 = Object.keys(this.data)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: "_clearMethods",
        value: function _clearMethods() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.keys(this.methods)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _method = _step4.value;

                    delete this.methods[_method];
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: "_parseHtmlTemplate",
        value: function _parseHtmlTemplate() {
            var isforce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!this.isParsedHtml || isforce) {
                this.parse.parseHtmlTemplate(this.template.trim());
                this.isParsedHtml = true;
            }
        }
    }, {
        key: "_getDomTree",
        value: function _getDomTree() {
            return this.parse.getHtmlDom();
        }
    }, {
        key: "_getComponentContainer",
        value: function _getComponentContainer() {
            return this.parse.mComponentContainer;
        }
    }, {
        key: "_render",
        value: function _render() {
            var _this3 = this;

            this._parseHtmlTemplate();
            this._applyRealDataVdom();
            this._yrvElement = this.rvDomUtil.getYrvElement(this._rdom, function (el, props, belong, componentUniqueTag) {
                _this3._hookRender(el, props, belong, componentUniqueTag);
            });
            this.w = this._yrvElement.render(this._getComponentContainer());
            this._isRender = true;
            return this.w;
        }
    }, {
        key: "_applyRealDataVdom",
        value: function _applyRealDataVdom() {
            var _this4 = this;

            this._getComponentContainer().forEach(function (componentContainer) {
                Object.keys(componentContainer.component.props).forEach(function (componentProp) {
                    var propValue = componentContainer.prop[componentProp];
                    if (_yrvUtil2.default.isPlaceHolder(propValue)) {
                        propValue = _this4.data[_yrvUtil2.default.getPlaceHolderValue(propValue)];
                    }
                    componentContainer.component.props[componentProp] = propValue;
                });
                componentContainer.component._rv_ev_domChange();
            });
            this._applyTruthFulData();
        }
    }, {
        key: "h",
        value: function h(tag, props, children) {
            return new _yrvElement2.default(tag, props, children);
        }
    }, {
        key: "_diff",
        value: function _diff(oldYrvElement, newYrvElement) {
            this.yrvDiff.setComponentContainer(this._getComponentContainer());
            this.yrvDiff.goDiff(oldYrvElement, newYrvElement);
            return this.yrvDiff.patches;
        }
    }, {
        key: "_patch",
        value: function _patch(node, patches) {
            this.yrvPatch.setComponentContainer(this._getComponentContainer());
            this.yrvPatch.apply(node, patches);
        }
    }, {
        key: "_updatedom",
        value: function _updatedom() {
            var _this5 = this;

            if (!this._isUpdate && this._isRender) {
                this._isUpdate = true;
                this._applyRealDataVdom();
                var _newYrvElement = this.rvDomUtil.getYrvElement(this._rdom, function (el, props, belong, componentUniqueTag) {
                    _this5._hookRender(el, props, belong, componentUniqueTag);
                });
                var diff = this._diff(this._yrvElement, _newYrvElement);
                this._patch(this.w, diff);
                this._yrvElement = _newYrvElement;
                this._yrvElement._calcCount(this._getComponentContainer());
                this._isUpdate = false;
            }
        }
    }, {
        key: "_hookRender",
        value: function _hookRender(el, props, belong, componentUniqueTag) {}
    }, {
        key: "_applyTruthFulData",
        value: function _applyTruthFulData() {
            this._rdom = this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom;
        }
    }, {
        key: "_rv_ev_run",
        value: function _rv_ev_run() {
            if (this.componentRun && !this._isRun) {
                // console.log(`${this.name},_rv_ev_run`)
                if (this.context.route !== undefined) {
                    this._registerEvent();
                }
                this.componentRun.call(this);
                this._isRun = true;
            }
            this.parse.componentMap.forEachKV(function (name, componentQueue) {
                componentQueue.forEach(function (component) {
                    if (!component._isRun) {

                        component._rv_ev_run();
                    }
                });
            });

            this._getComponentContainer().forEach(function (componentInfo) {
                if (!componentInfo.component._isRun) {
                    componentInfo.component._rv_ev_run();
                }
            });
            if (this.context.route !== undefined) {
                this.context.route.getRoutes().forEach(function (routeConfig) {
                    //routeConfig.component._rv_ev_run()
                    if (routeConfig.component.context.route !== undefined) {
                        routeConfig.component._registerEvent();
                    }
                });
            }
        }
    }, {
        key: "_rv_ev_init_props",
        value: function _rv_ev_init_props() {
            if (this.componentInit && !this._initInfo) {
                this.componentInit.call(this);
                this._initInfo = true;
            }
        }
        /**
         * this is yrv.js inner event ,only call by yrv.js framework
         * when the domtree will change ,this function will call by the yrv.js framework call
         * this event function call before the applyTruthFulData call ,so do something about data
         */

    }, {
        key: "_rv_ev_domChange",
        value: function _rv_ev_domChange() {
            this._rv_ev_init_props();
            if (this.componentDomChange) {
                this.componentDomChange.call(this, this.paramObj);
            }
        }

        /**
         * this is yrv.js inner event ,only call by yrv.js framework
         * when the component mount ,this function will call
         */

    }, {
        key: "_rv_ev_mount",
        value: function _rv_ev_mount() {
            if (this.mountLife) {
                this.mountLife.call(this);
            }
            this.parse.componentMap.forEachKV(function (name, componentQueue) {
                componentQueue.forEach(function (component) {
                    component._rv_ev_mount();
                });
            });
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "_getDom",
        value: function _getDom() {
            return this._rdom;
        }
    }, {
        key: "_getProp",
        value: function _getProp() {
            return this.props;
        }
    }, {
        key: "_cloneData",
        value: function _cloneData() {
            return _yrvUtil2.default.clone(this.data);
        }
    }, {
        key: "_cloneNew",
        value: function _cloneNew(key) {
            var cloneObj = _yrvUtil2.default.deepinCloneObj(this);
            if (key !== "") {
                cloneObj.componentkey = key;
            }
            cloneObj.componentUniqueTag = cloneObj.name + "_" + cloneObj.componentkey + "_rv_" + String(new Date() / 1).slice(-2) + (Math.round(Math.random() * 90) + 10);
            cloneObj.context = {
                componentName: cloneObj.name,
                componentData: cloneObj.data,
                componentUniqueTag: cloneObj.componentUniqueTag,
                route: this.context.route
                //the component route object not allow clone,because the route include components ,the components  will not clone by route clone
                //so the route only use in page component
            };
            cloneObj.parse.updateContext(cloneObj.context);
            cloneObj.rvDomUtil.updateContext(cloneObj.context);
            cloneObj._defineMethod(cloneObj);
            var ev = cloneObj.componentUniqueTag + "_dataChange";
            _yrvUtil2.default.observeComponent(cloneObj, function () {
                _yrvUtil2.default.createAndSendSimpleRvEvent(ev);
            });
            _yrvUtil2.default.receiveRvEvent(ev, function () {
                cloneObj._updatedom();
            });
            return cloneObj;
        }
    }]);

    return YrvComponent;
}();

exports.default = YrvComponent;