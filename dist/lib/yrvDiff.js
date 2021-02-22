"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvDiffList = _interopRequireDefault(require("./yrvDiffList"));

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YrvDiff = /*#__PURE__*/function () {
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

      if (newYrvElement == null) {} else if (_yrvUtil["default"].isString(oldYrvElement) && _yrvUtil["default"].isString(newYrvElement)) {
        if (oldYrvElement != newYrvElement) {
          currentPatch.push({
            type: _yrvUtil["default"].NODE_CONTENT,
            content: newYrvElement
          });
        }
      } else if (oldYrvElement.tag === newYrvElement.tag && oldYrvElement.key == newYrvElement.key) {
        var propsPatches = this.diffProps(oldYrvElement, newYrvElement);

        if (propsPatches) {
          currentPatch.push({
            type: _yrvUtil["default"].NODE_PROPS,
            props: propsPatches
          });
        }

        if (!_yrvUtil["default"].isIgnoreChildren(newYrvElement) && !_yrvUtil["default"].isIgnoreChildren(oldYrvElement)) {
          this.diffChildren(oldYrvElement, newYrvElement, index, currentPatch);
        }
      } else {
        currentPatch.push({
          type: _yrvUtil["default"].NODE_REPLACE,
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
    value: function diffChildren(oldYrvElement, newYrvElement, index, currentPatch) {
      var _this = this;

      var oldChildren = oldYrvElement.children;
      var newChildren = newYrvElement.children;
      var diffList = new _yrvDiffList["default"](oldChildren, newChildren);
      diffList.goDiff();
      var diffs = diffList.getResult();
      newChildren = diffs.child;

      if (diffs.moves.length) {
        var reorderPatch = {
          type: _yrvUtil["default"].CHILD_RE_ORDER,
          moves: diffs.moves
        };
        currentPatch.push(reorderPatch);
      }

      var leftNode = null;
      var currentNodeIndex = index;
      oldChildren.forEach(function (child, i) {
        var newChild = newChildren[i];
        currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;

        if (!_yrvUtil["default"].isString(child)) {
          if (child.isSlot()) {
            currentNodeIndex += newYrvElement.count - (newChild.count - 2);
          }
        }

        _this.dfsWalk(child, newChild, currentNodeIndex);

        leftNode = child;
      });
    }
  }]);

  return YrvDiff;
}();

var _default = YrvDiff;
exports["default"] = _default;