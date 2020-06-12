import YrvMap from "./yrvMap"
import YrvUtil from "./yrvUtil"

/**
 * @author yhongm
 * this class is parse html template to virtual dom tree
 */
class YhmParse {
  constructor(context) {
    this.mIndex = 0
    this.context = context
    this.componentMap = new YrvMap(this.context.componentName + "YhmParseComponentMap")
    this.mMap = new YrvMap(this.context.componentName + "HtmlDomAndComponentMap")
    this.mComponentContainer = []

    this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
    this.mHandler = {
      startELement: function (tagName, prop, content, that) {
        that.mIndex += 1
        if (that.componentMap.hasKey(tagName) || tagName === "routerview") {
          //if the tag is have  registered component
          //this registered component insert dom tree
          let component
          if (that.context.route !== undefined && tagName === "routerview") {
            //if in main page and the current tag is 'routeview' , so get component insert DOM TREE by the route 
            component = that.context.route.getNeedRenderComponent()
            component.paramObj = that.context.route.getNeedRenderComponentParam()
            tagName = component.name
            // that.useCustomComponent(component) //add the route component to the componentMap
          } else {
            if (prop.key) {
              component = that.componentMap.get(tagName).filter((comp) => {
                return comp.componentkey === prop.key
              })[0]
            } else {
              component = that.componentMap.get(tagName)[0]
            }
          }
          component._setParentContext(that.context)
          component._handleComponentPropEvent(prop)
          component._parseHtmlTemplate()
          component._applyTruthFulData()
          component._belong(that.context.componentName)
          if (prop.slot) {
            // component._getDom().props["slot"] = prop.slot
            component.props["slot"] = prop.slot
          }
          that.mMap.put(that.mIndex,
            {
              tag: tagName,
              props: prop,
              children: [],
              index: that.mIndex,
              content: content,
              isClose: false,
              belong: that.context.componentName,
              componentUniqueTag: that.context.componentUniqueTag,
              uniqueTag: component.componentUniqueTag,
              isComponent: true
            }
          )
          let componentIndex = that.mComponentContainer.findIndex((com) => { return com.componentUniqueTag === component.componentUniqueTag })
          if (componentIndex === -1) {
            that.mComponentContainer.push({ name: component.name, componentUniqueTag: component.componentUniqueTag, component: component, prop: prop, content: content })
          } else {
            that.mComponentContainer[componentIndex] = { name: component.name, componentUniqueTag: component.componentUniqueTag, component: component, prop: prop, content: content }
          }
        } else {
          var obj = {
            tag: tagName,
            props: prop,
            children: [],
            index: that.mIndex,
            content: content,
            isClose: false,
            belong: that.context.componentName,
            componentUniqueTag: that.context.componentUniqueTag,
            uniqueTag: tagName,
            isComponent: false
          }
          if (content.length > 0) {
            obj.children.push(content.trim())
          }
          that.mMap.put(that.mIndex, obj)
        }
      },
      endElement: function (that) {
        that.mMap.get(that.mIndex).isClose = true
        let theParentDom = that.mMap.get(that.mIndex - 1)
        let theCurrentDom = that.mMap.get(that.mIndex)
        if (that.mMap.hasKey((that.mIndex - 1))) {
          theParentDom.children.push(theCurrentDom)
          if (!theParentDom.props.hasOwnProperty("key")) {
            //if theParentDom not set 'key' prop,auto generator new value set 'key' prop by theParentDom info
            theParentDom.props["key"] = "yrv_auto_key_" + YrvUtil.getHashCode(`${theParentDom.tag}_${JSON.stringify(theParentDom.children)}_${theParentDom.props}_${that.mIndex - 1}`)
          }
          that.mMap.remove(that.mIndex)
        }
        that.mIndex -= 1
      }


    }

  }
  /**
   * 用于解析自定义组件，按名字索引组件
   * the function use to parse custom component ，the name indexes component
   * @param {*} rvComponent 
   */
  useCustomComponent(rvComponent) {
    if (this.componentMap.hasKey(rvComponent.getName())) {
      let componentQueue = this.componentMap.get(rvComponent.getName())
      if (!rvComponent in componentQueue) {

      }
      let componentIndex = componentQueue.findIndex((compoonent) => { return compoonent.componentkey === rvComponent.componentkey })
      if (componentIndex === -1) {
        componentQueue.push(rvComponent)
      }


    } else {
      let componentQueue = []
      componentQueue.push(rvComponent)
      this.componentMap.put(rvComponent.getName(), componentQueue)
    }
  }
  updateContext(newContext) {
    this.context = newContext
  }
  parseHtmlTemplate(html) {
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
          content = html.substring(index, html.indexOf('<', index)).trim()
        }
        _parseStartTag(html.substring(startTagOpen, startTagClose + 1), content, this)
        if (html.substring(startTagClose - 1, startTagClose + 1) === "/>") {
          //single label to the parse end tag  
          _parseEndTag(html.substring(startTagOpen, startTagClose + 1), this)
        }
        html = html.substring(index)
        continue
      }
    }
    let endTime = new Date() / 1000
    // console.log(`total parse time:${endTime - startTime}`)
    function _parseStartTag(html, content, that) {
      let startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>')
      var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex)
      var prop = {}
      if (html.indexOf(' ') > -1) {
        var props = html.substring(html.indexOf(' ') + 1, html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>'))
        if (props && props.length > 0) {
          var propsResult = props.match(that.mPropRe)
          for (let i = 0; i < propsResult.length; i++) {
            var pr = propsResult[i]
            //prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)?pr.split("=")[1].match(/(?<=").*?(?=")/)[0]:pr.split("=")[1]
            //IE and FF browser unsupport regExp ?<=
            prop[pr.split("=")[0]] = /\".*?\"/.test(pr.split("=")[1]) ? pr.split("=")[1].slice(1, -1) : pr.split("=")[1]
          }
        }
      }

      if (that.mHandler) {
        // if (/(?<=").*?(?=")/.test(content)) {
        //   content = content.match(/(?<=").*?(?=")/)[0]
        // }
        if (/\".*?\"/.test(content)) {
          content = content.slice(1, -1)
        }
        that.mHandler.startELement(tagName, prop, content, that)
      }
    }
    function _parseEndTag(html, that) {
      if (that.mHandler) {
        that.mHandler.endElement(that)
      }
    }
    function parseComment(html) {
      // console.log(`parseComment=${html}`)
    }
  }
  getHtmlDom() {
    return this.mMap.get(1)
  }

}
export default YhmParse