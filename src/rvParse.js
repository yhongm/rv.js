
/**
     * the map object use to save likily (key,value) data
     */
function Map() {
  this.length = 0;
  this.map = new Object();
}
Map.prototype = {

  constructor: this,
  put: function (key, value) {
    if (!(key in this.map)) {
      this.length++;
    }
    this.map[key] = value;
  },
  get: function (key) {
    return (key in this.map) ? this.map[key] : null;
  },
  remove: function (key) {
    if ((key in this.map)) {
      delete this.map[key]
      this.length--;
    }
  },
  hasKey: function (key) {
    return (key in this.map)
  },
  size: function () {
    return this.length;
  },
  clear: function () {
    length = 0;
    this.map = new Object();
  }
}

function YhmParse() {
  this.mIndex = 0
  this.mMap = new Map()
  this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
  this.mHandler = {
    startELement: function (tagName, attr, content, that) {
      that.mIndex += 1
      var obj = { tag: tagName, props: attr, children: [], index: that.mIndex, content: content, isClose: false }
      if (content.length > 0) {
        obj.children.push(content.trim())
      }
      that.mMap.put(that.mIndex, obj)
    },
    endElement: function (that) {
      that.mMap.get(that.mIndex).isClose = true
      if (that.mMap.hasKey((that.mIndex - 1))) {
        that.mMap.get(that.mIndex - 1).children.push(that.mMap.get(that.mIndex))
        that.mMap.remove(that.mIndex)
      }
      that.mIndex -= 1
    }


  }
}
YhmParse.prototype.getHtmlDom = function () {
  return this.mMap.get(1)
}


YhmParse.prototype.parseHtmlTemplate = function (html) {
  let startTime = new Date() / 1000
  var index = 0
  while (html) {
    var startTagOpen = html.indexOf('<')
    var startTagClose = html.indexOf('>') || html.indexOf('/>')
    var endTagOpen = html.indexOf('</')
    var endTagClose = html.indexOf('>')
    var startCommentOpen = html.indexOf('<!--')
    var endCommentClose = html.indexOf('-->')
    if (startCommentOpen == 0 && endCommentClose != -1 && endCommentClose > startCommentOpen) {
      index = endCommentClose + 3
      parseComment(html.substring(startCommentOpen + 4, endCommentClose + 3));
      html = html.substring(index)
      continue
    } else if (endTagOpen != -1 && endTagClose != -1 && endTagClose > endTagOpen) {
      index = endTagClose + 1
      _parseEndTag(html.substring(endTagOpen, endTagClose + 1), this)
      html = html.substring(index)
      continue
    } else if (startTagOpen != -1 && startTagClose != -1 && startTagClose > startTagOpen) {
      index = startTagClose + 1
      var content = ""
      if (html.indexOf('<', index) > -1 && html.indexOf('<', index) > startTagClose) {
        console.log(`html[index]:${html[index]}`)
        // let contentEndIndex = html.indexOf('</', (index + 1))
        content = html.substring(index, html.indexOf('<', index))
      }
      _parseStartTag(html.substring(startTagOpen, startTagClose + 1), content, this)
      html = html.substring(index)
      continue
    }
  }
  let endTime = new Date() / 1000
  console.log(`total parse time:${endTime - startTime}`)



  function _parseStartTag(html, content, that) {
    let startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>')
    var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex)
    var prop = {}
    if (html.indexOf(' ') > -1) {
      var props = html.substring(html.indexOf(' ') + 1, html.indexOf('>'))
      console.log("props:" + props)

      var propsResult = props.match(that.mPropRe)
      for (let i = 0; i < propsResult.length; i++) {
        console.log(`propsResult:${propsResult}`)
        var pr = propsResult[i]
        console.log(`pr:${pr}`)
        prop[pr.split("=")[0]] = pr.split("=")[1]
      }
      console.log("prop:" + JSON.stringify(prop))
    }

    console.log(`startTag:${tagName} ,attr:${prop},content:${content}`)
    if (that.mHandler) {
      that.mHandler.startELement(tagName, prop, content, that)
    }

  }
  function _parseEndTag(html, that) {
    console.log(`parseEndTag=${html}`)
    if (that.mHandler) {
      that.mHandler.endElement(that)
    }
  }
  function parseComment(html) {
    // console.log(`parseComment=${html}`)
  }

}

export default YhmParse