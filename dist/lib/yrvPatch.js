"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yrvUtil = _interopRequireDefault(require("./yrvUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YrvPatch = /*#__PURE__*/function () {
  function YrvPatch(context) {
    _classCallCheck(this, YrvPatch);

    this.context = context;
  }

  _createClass(YrvPatch, [{
    key: "setComponentContainer",
    value: function setComponentContainer(componentContainer) {
      this.componentContainer = componentContainer;
    }
  }, {
    key: "apply",
    value: function apply(node, patches) {
      this.node = node;
      this.patches = patches;
      this.walker = {
        index: 0
      };
      this.dfsWalk(this.node, this.walker, this.patches);
    }
  }, {
    key: "dfsWalk",
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
    key: "applyPatches",
    value: function applyPatches(node, currentPatche) {
      var _this = this;

      currentPatche.forEach(function (currentPatch) {
        switch (currentPatch.type) {
          case _yrvUtil["default"].NODE_REPLACE:
            var newNode = _yrvUtil["default"].isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render(_this.componentContainer);
            node.parentNode.replaceChild(newNode, node);
            break;

          case _yrvUtil["default"].CHILD_RE_ORDER:
            _this.reorderChildren(node, currentPatch.moves);

            break;

          case _yrvUtil["default"].NODE_PROPS:
            _this.setProps(node, currentPatch.props);

            break;

          case _yrvUtil["default"].NODE_CONTENT:
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
    key: "reorderChildren",
    value: function reorderChildren(node, moves) {
      var _this2 = this;

      var staticNodeList = _yrvUtil["default"].toArray(node.childNodes);

      var nodeMaps = {};
      staticNodeList.forEach(function (snode) {
        if (snode.nodeType === 1) {
          //The read-only Node.nodeType property is an integer that identifies what the node is. It distinguishes different kind of nodes from each other, such as elements, text and comments.nodeType 1 isNode.ELEMENT_NODE	1	An Element node like <p> or <div>.
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
          var insertNode = nodeMaps[move.item.key] ? nodeMaps(move.item.key).cloneNode(true) : _yrvUtil["default"].isString(move.item) ? document.createTextNode(move.item) : move.item.render(_this2.componentContainer);
          staticNodeList.splice(index, 0, insertNode);
          node.insertBefore(insertNode, node.childNodes[index] || null);
        }
      });
    }
  }, {
    key: "setProps",
    value: function setProps(node, props) {
      if (node) {
        // &&YrvUtil.isHtmlTag(node.tagName.toLocaleLowerCase())
        for (var key in props) {
          if (props[key] === undefined) {
            node.removeAttribute(key);
          } else {
            var value = props[key];

            if (_yrvUtil["default"].isString(value)) {
              _yrvUtil["default"].setAttr(node, key, value);
            }
          }
        }
      }
    }
  }]);

  return YrvPatch;
}();

var _default = YrvPatch;
exports["default"] = _default;