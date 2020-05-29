"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YrvDiffList = /*#__PURE__*/function () {
  /**
   * diff list 
   * @param {*} oldList 
   * @param {*} newList 
   */
  function YrvDiffList(oldList, newList) {
    _classCallCheck(this, YrvDiffList);

    this.oldList = oldList;
    this.newList = newList;
    this.oldListKeyIndex = this.makeListKeyIndex(this.oldList);
    this.newListKeyIndex = this.makeListKeyIndex(this.newList);
    this.moveOperator = [];
    this.childList = [];
    this.tempList = [];
  }
  /**
   * this function start diff 
   */


  _createClass(YrvDiffList, [{
    key: "goDiff",
    value: function goDiff() {
      for (var _i = 0; _i < this.oldList.length; _i++) {
        var oldItem = this.oldList[_i];
        var oItemKey = this.getKey(oldItem);

        if (!this.newListKeyIndex.hasOwnProperty(oItemKey)) {
          this.childList.push(null);
        } else {
          this.childList.push(this.newList[this.newListKeyIndex[oItemKey]]);
        }
      }

      this.tempList = this.childList.concat(); //copy the childList to a teml list

      var i = 0;

      while (i < this.tempList.length) {
        if (this.tempList[i] === null) {
          this.removeOperator(i);
          this.removeCopyTempList(i);
        } else {
          i++;
        }
      }

      var index = 0;

      for (var _i2 = 0; _i2 < this.newList.length; _i2++) {
        var nItem = this.newList[_i2];
        var nItemKey = this.getKey(nItem);
        var cItem = this.tempList[index];
        var cItemKey = this.getKey(cItem);

        if (cItem) {
          if (nItemKey != cItemKey) {
            if (this.oldListKeyIndex.hasOwnProperty(nItemKey)) {
              var cNextItemKey = getKey(this.tempList[index + 1]);

              if (nItemKey === cNextItemKey) {
                this.removeOperator(_i2);
                this.removeCopyTempList(index);
                index++;
              } else {
                this.insertOperator(_i2, nItem);
              }
            } else {
              this.insertOperator(_i2, nItem);
            }
          } else {
            index++;
          }
        } else {
          this.insertOperator(_i2, nItem);
        }
      }

      var k = this.tempList.length - index;

      while (index++ < this.tempList.length) {
        k--;
        this.removeOperator(k + this.newList.length);
      }
    }
  }, {
    key: "makeListKeyIndex",
    value: function makeListKeyIndex(list) {
      var listkeyIndex = {};

      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var itemKey = this.getKey(item);
        listkeyIndex[itemKey] = i;
      }

      return listkeyIndex;
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
    key: "removeOperator",
    value: function removeOperator(index) {
      this.moveOperator.push({
        index: index,
        type: 0
      });
    }
  }, {
    key: "insertOperator",
    value: function insertOperator(index, item) {
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

  return YrvDiffList;
}();

var _default = YrvDiffList;
exports["default"] = _default;