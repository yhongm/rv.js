"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yrvMap = require("./yrvMap");

var _yrvMap2 = _interopRequireDefault(_yrvMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author yhongm
 * the route use page component swicth
 * the route only use in page component
 */
var YrvRoute = function () {
    function YrvRoute(name) {
        _classCallCheck(this, YrvRoute);

        this.needRenderpath = "";
        this.routeName = name;
        this.routers = new _yrvMap2.default("RvRouteMap");
    }

    _createClass(YrvRoute, [{
        key: "register",
        value: function register(routerConfigs) {
            var _this = this;

            routerConfigs.forEach(function (routerConfig) {
                routerConfig.component = routerConfig.component["this"]._cloneNew("");
                _this.routers.put(routerConfig.path, routerConfig);
            });

            var mainComponent = this.routers.filterV(function (k, v) {
                return v.ismain && v.ismain === true;
            });
            if (!mainComponent) {
                throw new Error("register route ,but the main component not declaranted");
            }
            this.go({ path: mainComponent.path, paramObj: mainComponent.param });
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
                this.needRenderpath = path;
                if (paramObj) {
                    this.routers.get(this.needRenderpath).param = paramObj;
                }
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

exports.default = YrvRoute;