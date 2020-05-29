"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YrvObservable = function () {
    function YrvObservable(name) {
        _classCallCheck(this, YrvObservable);

        this.name = name;
        this.updateFunctions = [];
    }

    _createClass(YrvObservable, [{
        key: "add",
        value: function add(observableUpdate) {
            this.updateFunctions.push(observableUpdate);
        }
    }, {
        key: "has",
        value: function has(observableUpdate) {
            return observableUpdate in this.updateFunctions;
        }
    }, {
        key: "invoke",
        value: function invoke() {
            this.updateFunctions.forEach(function (fun) {
                fun();
            });
        }
    }]);

    return YrvObservable;
}();

exports.default = YrvObservable;