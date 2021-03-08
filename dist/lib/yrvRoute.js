"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvMap = _interopRequireDefault(require("./yrvMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author yhongm
 * the route use page component swicth
 * the route only use in page component
 */
var YrvRoute = /*#__PURE__*/function () {
  function YrvRoute(name, context) {
    _classCallCheck(this, YrvRoute);

    this.needRenderpath = "";
    this.routeName = name;
    this.context = context;
    this.routers = new _yrvMap["default"]("RvRouteMap");
  }

  _createClass(YrvRoute, [{
    key: "register",
    value: function register(routerConfigs) {
      var _this = this;

      routerConfigs.forEach(function (routerConfig) {
        routerConfig.component = routerConfig.component["this"]._cloneNew("");

        routerConfig.component._setParentContext(_this.context);

        _this.routers.put(routerConfig.path, routerConfig);
      });
      var mainComponent = this.routers.filterV(function (k, v) {
        return v.ismain && v.ismain === true;
      });

      if (!mainComponent) {
        throw new Error("register route ,but the main component not declaranted");
      }

      this.go({
        path: mainComponent.path,
        paramObj: mainComponent.param
      });
    }
  }, {
    key: "getRoutes",
    value: function getRoutes() {
      return this.routers;
    }
  }, {
    key: "go",
    value: function go(route) {
      var path = route.path,
          paramObj = route.paramObj;

      if (this.routers.hasKey(path)) {
        if (this.needRenderpath !== "" && this.needRenderpath !== path) {
          this.routers.get(this.needRenderpath).component._rv_ev_un_mount(); //unMount the component before the new Component mount

        }

        var prevPath = this.needRenderpath;
        this.needRenderpath = path;

        if (paramObj) {
          this.routers.get(this.needRenderpath).param = paramObj;
        }

        this.routers.get(this.needRenderpath).component._rv_set_routeInfo(prevPath, path, paramObj);

        this.routers.get(this.needRenderpath).component._rv_ev_mount();
      } else {
        throw new Error("the route path unexisted ,please first declaration in route config");
      }
    }
  }, {
    key: "getNeedRenderComponent",
    value: function getNeedRenderComponent() {
      return this.routers.get(this.needRenderpath).component;
    }
  }, {
    key: "getNeedRenderComponentParam",
    value: function getNeedRenderComponentParam() {
      return this.routers.get(this.needRenderpath).param;
    }
  }]);

  return YrvRoute;
}();

var _default = YrvRoute;
exports["default"] = _default;