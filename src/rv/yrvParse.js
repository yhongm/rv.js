import Map from "yrv.js/src/rv/map"
import Util from "yrv.js/src/rv/util"

/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
class YhmParse {
  constructor(context) {
    this.mIndex = 0
    this.context=context
    this.componentMap = new Map(this.context.componentName+"YhmParseComponentMap")
    this.mMap = new Map(this.context.componentName+"HtmlDomMap")
    
    this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
    this.mHandler = {
      startELement: function (tagName, prop, content, that) {
        that.mIndex += 1

        if (that.componentMap.hasKey(tagName) ||tagName==="routerview") {
          //if the tag is have  registered component
          if (that.context.componentName === "main" && tagName === "routerview") {
            //if in main page and the current tag is 'routeview' , so get component insert DOM TREE by the route 
            let needRenderComponent=that.context.route.getNeedRenderComponent()
            needRenderComponent.paramObj=that.context.route.getNeedRenderComponentParam()
            needRenderComponent._rv_ev_domChange()
            needRenderComponent.applyTruthFulData()
            
            that.mMap.put(that.mIndex, needRenderComponent.getDom())
          } else {
            //this registered component insert dom tree
            let component =that.componentMap.get(tagName)
            Object.keys(component.props).forEach(componentProp=>{
                let propValue=prop[componentProp]
                if(Util.isPlaceHolder(propValue)){
                   propValue= that.context.componentData[Util.getPlaceHolderValue(propValue)]
                }
                component.props[componentProp]=propValue
            })
            component._rv_ev_domChange()
            component.applyTruthFulData()
            that.mMap.put(that.mIndex, that.componentMap.get(tagName).getDom())

          }


        } else {
          var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false, belong: that.context.componentName }
          
          if (content.length > 0) {

            obj.children.push(content.trim())
          }
          that.mMap.put(that.mIndex, obj)
        }

      },
      endElement: function (that) {
        that.mMap.get(that.mIndex).isClose = true
        if (that.mMap.hasKey((that.mIndex - 1))) {
          if(that.mMap.get(that.mIndex).props.hasOwnProperty("slot")){
            let slotPosition=that.mMap.get(that.mIndex).props.slot
            let slotIndex=-1
            if (slotPosition=="default"){
                slotIndex=that.mMap.get(that.mIndex - 1).children.findIndex((child)=>{
                return child.tag==="slot"
              })
              
            }else{
                slotIndex=that.mMap.get(that.mIndex - 1).children.findIndex((child)=>{
                return child.tag==="slot"&&child.props.name===slotPosition
              })
            }
            if(slotIndex>-1){
              that.mMap.get(that.mIndex - 1).children[slotIndex]=that.mMap.get(that.mIndex)
            }
           
          }else{
            that.mMap.get(that.mIndex - 1).children.push(that.mMap.get(that.mIndex))
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
    this.componentMap.put(rvComponent.getName(), rvComponent)
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

        var propsResult = props.match(that.mPropRe)
        for (let i = 0; i < propsResult.length; i++) {
          var pr = propsResult[i]
          //prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)?pr.split("=")[1].match(/(?<=").*?(?=")/)[0]:pr.split("=")[1]
          //IE and FF browser unsupport regExp ?<=

          prop[pr.split("=")[0]] = /\".*?\"/.test(pr.split("=")[1]) ? pr.split("=")[1].slice(1, -1) : pr.split("=")[1]

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

