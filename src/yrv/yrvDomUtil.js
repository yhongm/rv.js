import YrvUtil from "./yrvUtil"
import YrvElement from "./yrvElement"

/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
class YrvDomUtil {
    constructor(context) {
        const {
            componentName,
            componentData,
            route
        } = context
        this.Context = {} //this Context use to save global info 
        this.Context.data = componentData
        this.Context.componentName = componentName
    }
    updateContext(newContext){
        const {
            componentName,
            componentData,
            route
        } = newContext
        this.Context = {}
        this.Context.data = componentData
        this.Context.componentName = componentName
    }
    getVirtualElement(dom) {
        let children = []
        for (let child in dom.children) {
            let cc = dom.children[child]
            if (cc instanceof Array) {
                cc.forEach(c => {
                    let v = this.getVirtualElement(c)
                    children.push(v)
                })
            } else if (cc instanceof Object) {
                let v = this.getVirtualElement(cc)
                children.push(v)
            } else {
                children.push(cc)
            }
        }

        return new YrvElement(dom.tag, dom.props, children, dom.belong,dom.componentUniqueTag)
    }
    applyTruthfulData(dom) {
        if ("for" in dom.props) {
            let dataArray = []
            let dataSingle

            if (YrvUtil.isForIn(dom.props['for'])) {
                if ("childDomDatakey" in dom) {
                    dataArray = dom.data
                    dataSingle = dom.childDomDatakey
                } else if ("domDataKey" in dom) {
                    if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                        dataArray = dom.data
                        dataSingle = dom.props['for'].split(" _in_ ")[0]
                    } else {
                        throw new Error("domData key error")
                    }
                } else {
                    let forExpressRight = dom.props['for'].split(" _in_ ")[1]
                    if (YrvUtil.isDotOperatorExpression(forExpressRight)) {
                        let forERKey = forExpressRight.split(".")[0]
                        let forERValue = forExpressRight.split(".")[1]
                        if (forERKey in this.Context.data) {
                            dataArray = this.Context.data[forERKey][forERValue]
                        } else {
                            throw new Error("the for directive use error,the Dot Operator Express only in global context data")
                        }
                        
                    } else {
                        dataArray = this.Context.data[forExpressRight]
                        
                    }
                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }

            } else {
                throw new Error("the for directive use error")
            }

            let objs = []
            
            if (dataArray) {
                
                dataArray.forEach((data) => {
                    let obj = this.vdom2rdom(dom, data, dataSingle)
                    if (obj.props.hasOwnProperty("for")) {
                        // warning, goto there,tell me the DOM used 'for' directive ,we need to  delete 'for' props 
                        //警告,运行到此处已经说明处理过for指令。删除for指令,避免不同组件通过此for指令寻找不属于他的真实数据,会引发异常
                        //todo props childDomData ,domData
                        delete obj.props.for
                    }
                    if(obj.props.hasOwnProperty("domData")){
                        delete obj.props.domData
                    }

                    objs.push(obj)
                })
            }else{
                throw new Error("the for directive only use in Array data")
            }


            let vDomObj = {
                isFor: true,
                rdom: objs
            }
            return vDomObj
        } else {

            let data
            let childDomDatakey
            if ("data" in dom) {
                data = dom.data
                childDomDatakey = dom.childDomDatakey
            } else {
                data = this.Context.data
                childDomDatakey = undefined
            }
            let obj = this.vdom2rdom(dom, data, childDomDatakey)
            let vDomObj = {
                isFor: false,
                rdom: obj
            }
            return vDomObj
        }
    }
    /**
     * virtual dom 2 real data dom
     * @param {*} dom 
     * @param {*} data 
     * @param {*} dataSingle 
     * @param {*} tdata 
     */
    vdom2rdom(dom, data, dataSingle) {
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        obj.belong = dom.belong
        obj.componentUniqueTag=dom.componentUniqueTag
        let props = Object.keys(dom.props)
        for (let prop in props) {
            let value = props[prop]
            if (value === "style") {
                let style = dom.props[value]

                if (style.indexOf(";") > -1) {
                    let styles = style.split(";")
                    obj.props[value] = this.handleArrayStyle(data, styles, dataSingle)
                } else {
                    obj.props[value] = this.handleSingleStyle(data, style, dataSingle)
                }
            } else {
                if (YrvUtil.isPlaceHolder(dom.props[value])) {
                    var propValue = YrvUtil.getPlaceHolderValue(dom.props[value])
                    if (!YrvUtil.isDotOperatorExpression(propValue)) {
                        obj.props[value] = data[propValue]
                    } else {

                        var propKey = propValue.split(".")[0]
                        var propValue = propValue.split(".")[1]
                        if (propKey in this.Context.data) {
                            obj.props[value] = this.Context.data[propKey][propValue]
                        } else {
                            obj.props[value] = data[propValue]
                        }
                    }
                } else if (YrvUtil.isOperatorExpression(dom.props[value])) {
                    obj.props[value] = YrvUtil.getOperatorExpression(dom.props[value], data, dataSingle, this.Context)
                } else {
                    obj.props[value] = dom.props[value]
                }

            }

        }

        for (let child in dom.children) {
            if (YrvUtil.isString(dom.children[child])) {
                if (YrvUtil.isPlaceHolder(dom.children[child])) {
                    var childValue = YrvUtil.getPlaceHolderValue(dom.children[child])
                    if (!YrvUtil.isDotOperatorExpression(childValue)) {
                        obj.children[child] = YrvUtil.getNotUndefinedContent(data[childValue])
                    } else {
                        var childValueKey = childValue.split(".")[0]
                        var childValueValue = childValue.split(".")[1]
                        if (childValueKey in this.Context.data) {
                            obj.children[child] = YrvUtil.getNotUndefinedContent(this.Context.data[childValueKey][childValueValue])
                        } else {

                            obj.children[child] = YrvUtil.getNotUndefinedContent(data[childValueValue])

                        }
                    }

                } else if (YrvUtil.isOperatorExpression(dom.children[child])) {
                    obj.children[child] = YrvUtil.getNotUndefinedContent(YrvUtil.getOperatorExpression(dom.children[child], data, dataSingle, this.Context))
                } else {
                    obj.children[child] = YrvUtil.getNotUndefinedContent(dom.children[child])
                }

            } else {
                if (dom.children[child] instanceof Object) {
                    if ("childDomData" in dom.props) {
                        if (dom.props.childDomData == "$this") {
                            dom.children[child].data = data
                        } else {
                            dom.children[child].childDomDatakey = dom.props.childDomData
                            dom.children[child].data = data
                        }

                    } else if ("domData" in dom.props) {
                        if("nofor" in dom.children[child].props){
                            dom.children[child].data = data
                        }else{
                            dom.children[child].domDataKey = dom.props.domData
                            dom.children[child].data = data
                        }
                        
                    }

                }

                var domObj = this.applyTruthfulData(dom.children[child])
                if (domObj.isFor) {
                    domObj.rdom.forEach((rdom)=>{
                        obj.children.push(rdom)
                    })
                    
                } else {
                    obj.children[child] = domObj.rdom
                }
            }
        }
        return obj

    }
    handleSingleStyle(data, style, dataSingle) {

        let newStyle = ''
        if (dataSingle) {
            if (YrvUtil.isPlaceHolder(style)) {
                if (YrvUtil.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = YrvUtil.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[YrvUtil.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (YrvUtil.isPlaceHolder(styleValue)) {
                styleValue = data[YrvUtil.getPlaceHolderValue(styleValue)]

                newStyle = styleKey + ":" + styleValue
            } else {
                newStyle = style
            }
        }
        return newStyle
    }
    handleArrayStyle(data, styles, dataSingle) {
        let newStyleArray = ""
        for (let style of styles) {

            let newStyle = this.handleSingleStyle(data, style, dataSingle)
            newStyleArray += newStyle + ";"
        }
        return newStyleArray

    }
}

export default YrvDomUtil