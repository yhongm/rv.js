"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yrvDiffList = require("./yrvDiffList");

var _yrvDiffList2 = _interopRequireDefault(_yrvDiffList);

var _yrvUtil = require("./yrvUtil");

var _yrvUtil2 = _interopRequireDefault(_yrvUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YrvDiff = function () {
    function YrvDiff(context) {
        _classCallCheck(this, YrvDiff);

        this.context = context;
    }
    /**
    * dom tree diff algorithm object constructor
    * @param {*} oldYrvElement the dom tree for before update 
    * @param {*} newYrvElement the dom tree for after update
    */


    _createClass(YrvDiff, [{
        key: "goDiff",
        value: function goDiff(oldYrvElement, newYrvElement) {
            this.index = 0;
            this.oldYrvElement = oldYrvElement;
            this.newYrvElement = newYrvElement;
            this.patches = {};
            this.dfsWalk(this.oldYrvElement, this.newYrvElement, this.index);
        }
    }, {
        key: "getPatches",
        value: function getPatches() {
            return this.patches;
        }
    }, {
        key: "setComponentContainer",
        value: function setComponentContainer(componentContainer) {
            this.componentContainer = componentContainer;
        }
    }, {
        key: "dfsWalk",
        value: function dfsWalk(oldYrvElement, newYrvElement, index) {

            this.tempIndex = index;
            var currentPatch = [];
            if (newYrvElement == null) {} else if (_yrvUtil2.default.isString(oldYrvElement) && _yrvUtil2.default.isString(newYrvElement)) {
                if (oldYrvElement != newYrvElement) {
                    currentPatch.push({
                        type: _yrvUtil2.default.NODE_CONTENT,
                        content: newYrvElement
                    });
                }
            } else if (oldYrvElement.tag === newYrvElement.tag && oldYrvElement.key == newYrvElement.key) {
                var propsPatches = this.diffProps(oldYrvElement, newYrvElement);
                if (propsPatches) {
                    currentPatch.push({
                        type: _yrvUtil2.default.NODE_PROPS,
                        props: propsPatches
                    });
                }
                if (!_yrvUtil2.default.isIgnoreChildren(newYrvElement) && !_yrvUtil2.default.isIgnoreChildren(oldYrvElement)) {
                    var oChildren = oldYrvElement.children;
                    var nChildren = newYrvElement.children;

                    this.diffChildren(oChildren, nChildren, index, currentPatch);
                }
            } else {
                currentPatch.push({
                    type: _yrvUtil2.default.NODE_REPLACE,
                    node: newYrvElement
                });
            }
            if (currentPatch.length) {
                this.patches[index] = currentPatch;
            }
        }
    }, {
        key: "diffProps",
        value: function diffProps(oldYrvElement, newYrvElement) {
            if (oldYrvElement.isComponent && newYrvElement.isComponent) {
                return null;
            }
            var oldProps = oldYrvElement.props;
            var newProps = newYrvElement.props;

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

            var diffList = new _yrvDiffList2.default(oldChildren, newChildren);
            diffList.goDiff();
            var diffs = diffList.getResult();
            newChildren = diffs.child;
            if (diffs.moves.length) {
                var reorderPatch = {
                    type: _yrvUtil2.default.CHILD_RE_ORDER,
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

    return YrvDiff;
}();

exports.default = YrvDiff;