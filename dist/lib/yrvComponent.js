"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvDomUtil = _interopRequireDefault(require("./yrvDomUtil"));

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

var _yrvParse = _interopRequireDefault(require("./yrvParse"));

var _yrvMap = _interopRequireDefault(require("./yrvMap"));

var _yrvPatch = _interopRequireDefault(require("./yrvPatch"));

var _yrvDiff = _interopRequireDefault(require("./yrvDiff"));

var _yrvElement = _interopRequireDefault(require("./yrvElement"));

var _yrvRoute = _interopRequireDefault(require("./yrvRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author yhongm
 * the 'YrvComponent' class use to 'yrv' framwork  descpration component  
 */
var YrvComponent = /*#__PURE__*/function () {
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
        onUnMount = componentParam.onUnMount,
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
    this.mountLifeCycle = onMount;
    this.unMountLifeCycle = onUnMount;
    this.watchObj = watch;
    this._cloneMethods = _yrvUtil["default"].cloneObj(methods);
    this._cloneWatchObj = _yrvUtil["default"].cloneObj(watch);
    this.paramObj = {}; // the paramObj

    this.belongComponent = "main";
    this.componentkey = name;
    this._initInfo = false;
    this.componentUniqueTag = this.name; //the clone tag is unique

    this._isRender = false;
    this._isUpdate = false;
    this._isRun = false;

    _yrvUtil["default"].addStyle2Head(this.style, this.name); // this._defineMethod()


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
      this.parse = new _yrvParse["default"](this.context);
      this.rvDomUtil = new _yrvDomUtil["default"](this.context);
      this.observeMap = new _yrvMap["default"](this.name + "ComponentObserveMap");
      this.yrvPatch = new _yrvPatch["default"](this.context);
      this.yrvDiff = new _yrvDiff["default"](this.context);
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
      this.context.route = new _yrvRoute["default"](this.name);
      this.context.route.register(routeConfigs);
    }
  }, {
    key: "use",
    value: function use(rvComponentObjProxy) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var needClone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rvComponentObj;

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

      _yrvUtil["default"].receiveRvEvent(this.name + "_routeChange", function (e, detail) {
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

      _yrvUtil["default"].createAndSendSimpleRvEvent(componentName + "_routeChange", routeInfo);
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

      _yrvUtil["default"].createAndSendSimpleRvEvent(name, value);
    }
  }, {
    key: "$onEvent",
    value: function $onEvent(event, callback) {
      _yrvUtil["default"].receiveRvEvent(event, function (value) {
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

      var _loop = function _loop() {
        var method = _Object$keys[_i];
        _this2.methods[method] = _this2._cloneMethods[method].bind(thatThis); //the method this point to  this rv component object

        var methodHandler = {
          apply: function apply(target, thisArg, argumentsList) {
            return target(argumentsList);
          }
        };

        _yrvUtil["default"].receiveRvEvent(_yrvUtil["default"].generateHashMNameByMName("".concat(_this2.name, "_").concat(_this2.componentUniqueTag, "_").concat(method)), function (e, detail) {
          _this2.methods[method].call(thatThis, detail);
        });

        _yrvUtil["default"].receiveRvEvent("".concat(_this2.name, "_").concat(method), function (e, detail) {
          _this2.methods[method].call(thatThis, detail);
        });
      };

      for (var _i = 0, _Object$keys = Object.keys(this.methods); _i < _Object$keys.length; _i++) {
        _loop();
      }

      for (var _i2 = 0, _Object$keys2 = Object.keys(this.watchObj); _i2 < _Object$keys2.length; _i2++) {
        var watchFun = _Object$keys2[_i2];
        this.watchObj[watchFun] = this._cloneWatchObj[watchFun].bind(thatThis);
      }

      var _loop2 = function _loop2() {
        var data = _Object$keys3[_i3];

        _yrvUtil["default"].receiveRvEvent(_yrvUtil["default"].generateHashMNameByMName("".concat(_this2.name, "_").concat(_this2.componentUniqueTag, "_").concat(data, "change")), function (el, value) {
          _this2.data[data] = value;
        });
      };

      for (var _i3 = 0, _Object$keys3 = Object.keys(this.data); _i3 < _Object$keys3.length; _i3++) {
        _loop2();
      }
    }
  }, {
    key: "_clearMethods",
    value: function _clearMethods() {
      for (var _i4 = 0, _Object$keys4 = Object.keys(this.methods); _i4 < _Object$keys4.length; _i4++) {
        var method = _Object$keys4[_i4];
        delete this.methods[method];
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

          if (_yrvUtil["default"].isPlaceHolder(propValue)) {
            propValue = _this4.data[_yrvUtil["default"].getPlaceHolderValue(propValue)];
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
      return new _yrvElement["default"](tag, props, children);
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
      if (this.mountLifeCycle) {
        this.mountLifeCycle.call(this);
      }

      this.parse.componentMap.forEachKV(function (name, componentQueue) {
        componentQueue.forEach(function (component) {
          component._rv_ev_mount();
        });
      });
    }
  }, {
    key: "_rv_ev_un_mount",
    value: function _rv_ev_un_mount() {
      if (this.unMountLifeCycle) {
        this.unMountLifeCycle.call(this);
      }

      this.parse.componentMap.forEachKV(function (name, componentQueue) {
        componentQueue.forEach(function (component) {
          component._rv_ev_un_mount();
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
      return _yrvUtil["default"].clone(this.data);
    }
  }, {
    key: "_cloneNew",
    value: function _cloneNew(key) {
      var cloneObj = _yrvUtil["default"].deepinCloneObj(this);

      if (key !== "") {
        cloneObj.componentkey = key;
      }

      cloneObj.componentUniqueTag = "".concat(cloneObj.name, "_").concat(cloneObj.componentkey, "_rv_").concat(String(new Date() / 1).slice(-2)).concat(Math.round(Math.random() * 90) + 10);
      cloneObj.context = {
        componentName: cloneObj.name,
        componentData: cloneObj.data,
        componentUniqueTag: cloneObj.componentUniqueTag,
        route: this.context.route //the component route object not allow clone,because the route include components ,the components  will not clone by route clone
        //so the route only use in page component

      };
      cloneObj.parse.updateContext(cloneObj.context);
      cloneObj.rvDomUtil.updateContext(cloneObj.context);

      cloneObj._defineMethod(cloneObj);

      var ev = cloneObj.componentUniqueTag + "_dataChange";

      _yrvUtil["default"].observeComponent(cloneObj, function () {
        _yrvUtil["default"].createAndSendSimpleRvEvent(ev);
      });

      _yrvUtil["default"].receiveRvEvent(ev, function () {
        cloneObj._updatedom();
      });

      return cloneObj;
    }
  }]);

  return YrvComponent;
}();

var _default = YrvComponent;
exports["default"] = _default;