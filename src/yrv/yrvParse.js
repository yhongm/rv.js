import YrvMap from "./yrvMap"
import YrvUtil from "./yrvUtil"

/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
class YhmParse {
  constructor(context) {
    this.mIndex = 0
    this.context = context
    this.componentMap = new YrvMap(this.context.componentName + "YhmParseComponentMap")
    this.mMap = new YrvMap(this.context.componentName + "HtmlDomMap")

    this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
    this.mHandler = {
      startELement: function (tagName, prop, content, that) {
        that.mIndex += 1
        if (that.componentMap.hasKey(tagName) || tagName === "routerview") {
          //if the tag is have  registered component
          if (that.context.componentName === "main" && tagName === "routerview") {
            //if in main page and the current tag is 'routeview' , so get component insert DOM TREE by the route 
            let needRenderComponent = that.context.route.getNeedRenderComponent()
            needRenderComponent.paramObj = that.context.route.getNeedRenderComponentParam()
            Object.keys(needRenderComponent.props).forEach(componentProp => {
              let propValue = prop[componentProp]
              if (YrvUtil.isPlaceHolder(propValue)) {
                propValue = that.context.componentData[YrvUtil.getPlaceHolderValue(propValue)]
              }
              needRenderComponent.props[componentProp] = propValue
              
            })
            needRenderComponent._rv_ev_domChange()
            needRenderComponent._applyTruthFulData()

            that.mMap.put(that.mIndex, needRenderComponent._getDom())
          } else {
            //this registered component insert dom tree
            let component
            
            if(prop.key){
                component=that.componentMap.get(tagName).filter((comp)=>{
                return comp.componentkey===prop.key
                
            })[0]
            }else{
               component=that.componentMap.get(tagName)[0]
            }
            
            
            Object.keys(component.props).forEach(componentProp => {
              let propValue = prop[componentProp]
             
              if (YrvUtil.isPlaceHolder(propValue)) {
                propValue = that.context.componentData[YrvUtil.getPlaceHolderValue(propValue)]
              }
              component.props[componentProp] = propValue
              
            })
            Object.keys(prop).forEach((propKey)=>{
              if(YrvUtil.isRvEventProp(propKey)){
                component.methods[propKey.slice(2)]=function(param){
                  YrvUtil.createAndSendSimpleRvEvent(`${that.context.componentName}_${prop[propKey]}`,param)
              } 
              }
            })
            
            

            
            component._belong(that.context.componentName)
            component._rv_ev_domChange()
            component._applyTruthFulData()
            if (prop.slot) {

              component._getDom().props["slot"] = prop.slot
            }
            that.mMap.put(that.mIndex, component._getDom())

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
            componentUniqueTag:that.context.componentUniqueTag
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
          if (theCurrentDom.props.hasOwnProperty("slot")) {
            YhmParse.handeSlotDom(theParentDom, theCurrentDom)
          } else {

            theParentDom.children.push(theCurrentDom)

            if (!theParentDom.props.hasOwnProperty("key")) {
              //if theParentDom not set 'key' prop,auto generator new value set 'key' prop by theParentDom info
              theParentDom.props["key"] = "yrv_auto_key_" + YrvUtil.getHashCode(`${theParentDom.tag}_${JSON.stringify(theParentDom.children)}_${theParentDom.props}_${that.mIndex - 1}`)
            }
            //check unique by the dom key
            // if (YrvUtil.checkHaveSameValueFromArray(theParentDom.children.flatMap((child) => child.props.key))) {
            //   throw new Error(`the tag:${theParentDom.tag} child dom props 'key' reuse`)
            // }
          }
          that.mMap.remove(that.mIndex)

        }
        that.mIndex -= 1
      }


    }

  }
  /**
   * 用于解析自定义组件，按名字索引组件
   * @param {*} rvComponent 
   */
  useCustomComponent(rvComponent) {
    if(this.componentMap.hasKey(rvComponent.getName())){
       this.componentMap.get(rvComponent.getName()).push(rvComponent)

    }else{
      let componentQueue=[]
      componentQueue.push(rvComponent)
      this.componentMap.put(rvComponent.getName(), componentQueue)

    }
   
  }
  
  updateContext(newContext){
    this.context=newContext

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
  /**
   * this function use to handle slot  rvcomponet and html tag
   * @param {*} dom 
   * @param {*} slotDom 
   */
  static handeSlotDom(dom, slotDom) {
    if (YrvUtil.isString(dom)) {
      return
    }

    let slotPosition = slotDom.props.slot
    let slotIndex = -1
    if (dom.children.length > 0) {
      if (slotPosition == "default") {
        slotIndex = dom.children.findIndex((child) => {
          if (child.tag !== "slot") {
            YhmParse.handeSlotDom(child, slotDom)
          }
          return child.tag === "slot"
        })

      } else {
        slotIndex = dom.children.findIndex((child) => {
          if (child.tag !== "slot") {
            YhmParse.handeSlotDom(child, slotDom)
          }
          return child.tag === "slot" && child.props.name === slotPosition
        })
      }
      if (slotIndex > -1 && dom.children[slotIndex]) {
        dom.children[slotIndex] = slotDom
      }
    }

  }

}
export default YhmParse