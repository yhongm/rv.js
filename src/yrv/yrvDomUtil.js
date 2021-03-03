import YrvUtil from "./yrvUtil"
import YrvElement from "./yrvElement"

/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
class YrvDomUtil {
    constructor(context) {
        this.context = {} //this Context use to save global info 
        this.index = 0
        this.indexArrayOp = []
    }
    updateContext(newContext) {
        this.context = newContext
    }
    getYrvElement(virtualDom, renderCallback, eventCallback) {
        let children = []
        for (let child in virtualDom.children) {
            let childVirtualDom = virtualDom.children[child]
            if (childVirtualDom instanceof Array) {

                childVirtualDom.forEach(singleChildDom => {
                    children.push(this.getYrvElement(singleChildDom, renderCallback, eventCallback))
                })
            } else if (childVirtualDom instanceof Object) {
                children.push(this.getYrvElement(childVirtualDom, renderCallback, eventCallback))
            } else {
                children.push(childVirtualDom)
            }
        }
        return new YrvElement(virtualDom.tag, virtualDom.props, children, virtualDom.belong, virtualDom.componentUniqueTag, virtualDom.uniqueTag, virtualDom.isComponent, renderCallback, eventCallback)
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
                        if (forERKey in this.context.componentData) {
                            dataArray = this.context.componentData[forERKey][forERValue]
                        } else {
                            throw new Error("the for directive use error,the Dot Operator Express only in global context data")
                        }
                    } else {
                        dataArray = this.context.componentData[forExpressRight]
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
                    if (obj.props.hasOwnProperty("domData")) {
                        delete obj.props.domData
                    }
                    objs.push(obj)
                })
            } else {
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
                data = this.context.componentData
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
        this.index += 1
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        obj.belong = dom.belong
        obj.componentUniqueTag = dom.componentUniqueTag
        obj.uniqueTag = dom.uniqueTag
        obj.isComponent = dom.isComponent
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
                        if (propKey in this.context.componentData) {
                            obj.props[value] = this.context.componentData[propKey][propValue]
                        } else {
                            obj.props[value] = data[propValue]
                        }
                    }
                } else if (YrvUtil.isOperatorExpression(dom.props[value])) {
                    obj.props[value] = YrvUtil.getOperatorExpression(dom.props[value], data, dataSingle, this.context)
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
                        if (childValueKey in this.context.componentData) {
                            obj.children[child] = YrvUtil.getNotUndefinedContent(this.context.componentData[childValueKey][childValueValue])
                        } else {
                            obj.children[child] = YrvUtil.getNotUndefinedContent(data[childValueValue])
                        }
                    }
                } else if (YrvUtil.isOperatorExpression(dom.children[child])) {
                    obj.children[child] = YrvUtil.getNotUndefinedContent(YrvUtil.getOperatorExpression(dom.children[child], data, dataSingle, this.context))
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
                        if ("nofor" in dom.children[child].props) {
                            dom.children[child].data = data
                        } else {
                            dom.children[child].domDataKey = dom.props.domData
                            dom.children[child].data = data
                        }
                    }
                }
                var domObj = this.applyTruthfulData(dom.children[child])
                if (domObj.isFor) {
                    domObj.rdom.forEach((rdom) => {
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
            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (YrvUtil.isPlaceHolder(styleValue)) {
                if (YrvUtil.getPlaceHolderValue(styleValue).indexOf(dataSingle) != -1) {
                    newStyle =  styleKey + ":" +data[YrvUtil.getPlaceHolderValue(styleValue).split(".")[1]]
                } else {
                    newStyle = styleKey + ":" + data[YrvUtil.getPlaceHolderValue(styleValue)]
                }
            } else {
                newStyle = style
            }
        } else {
            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (YrvUtil.isPlaceHolder(styleValue)) {
                newStyle = styleKey + ":" + data[YrvUtil.getPlaceHolderValue(styleValue)]
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

