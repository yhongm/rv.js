import Util from "./util"
import Element from "./element"

/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
class RVDomUtil {
    constructor(data) {
        this.data = data
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

        return new Element(dom.tag, dom.props, children)
    }
    applyTruthfulData(dom) {
        if ("for" in dom.props) {
            let dataArray = []
            let dataSingle

            if (Util.isForIn(dom.props['for'])) {
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
                }
                else {
                    dataArray = this.data[dom.props['for'].split(" _in_ ")[1]]
                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }

            } else {
                throw new Error("the for directive use error")
            }

            let objs = []

            if (dataArray) {

                dataArray.forEach((data) => {

                    let obj = this.vdom2rdom(dom, data, dataSingle, data)
                    if (obj.props.hasOwnProperty("for")) {
                        // warning, goto there,tell me the DOM used 'for' directive ,we need to  delete 'for' props 
                        //警告,运行到此处已经说明处理过for指令。删除for指令,避免不同组件通过此for指令寻找不属于他的真实数据,会引发异常
                        //todo props childDomData ,domData
                        delete obj.props.for
                    }

                    objs.push(obj)
                })
            }


            let vDomObj = { isFor: true, rdom: objs }
            return vDomObj
        } else {

            let data
            let childDomDatakey

            if ("data" in dom) {
                data = dom.data
                childDomDatakey = dom.childDomDatakey
            } else {
                data = this.data
                childDomDatakey = undefined
            }

            let obj = this.vdom2rdom(dom, data, childDomDatakey, data)
            let vDomObj = { isFor: false, rdom: obj }
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
    vdom2rdom(dom, data, dataSingle, tdata) {
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        let props = Object.keys(dom.props)
        for (let prop in props) {
            let value = props[prop]
            if (value === "style") {
                let style = dom.props[value]

                if (style.indexOf(",") > -1) {
                    let styles = style.split(",")
                    obj.props[value] = this.handleArrayStyle(data, styles, dataSingle)
                } else {

                    obj.props[value] = this.handleSingleStyle(data, style, dataSingle)
                }
            }
            else {
                if (Util.isPlaceHolder(dom.props[value])) {
                    if (!Util.isDotOperatorExpression(Util.getPlaceHolderValue(dom.props[value]))) {
                        obj.props[value] = tdata[Util.getPlaceHolderValue(dom.props[value])]
                    } else {
                        obj.props[value] = data[Util.getPlaceHolderValue(dom.props[value]).split(".")[1]]
                    }
                } else if (Util.isOperatorExpression(dom.props[value])) {

                    obj.props[value] = Util.getOperatorExpression(dom.props[value], data, dataSingle)
                }
                else {
                    obj.props[value] = dom.props[value]
                }

            }

        }

        for (let child in dom.children) {
            if (Util.isString(dom.children[child])) {
                if (Util.isPlaceHolder(dom.children[child])) {
                    if (Util.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                        obj.children[child] = tdata[Util.getPlaceHolderValue(dom.children[child])]

                    } else {
                        obj.children[child] = data[Util.getPlaceHolderValue(dom.children[child]).split(".")[1]]
                    }

                } else if (Util.isOperatorExpression(dom.children[child])) {
                    obj.children[child] = Util.getOperatorExpression(dom.children[child], data, dataSingle)
                }
                else {
                    obj.children[child] = dom.children[child]
                }

            } else {

                if (dom.children[child] instanceof Object) {
                    if ("childDomData" in dom.props) {

                        dom.children[child].childDomDatakey = dom.props.childDomData
                        dom.children[child].data = data
                    } else if ("domData" in dom.props) {

                        dom.children[child].domDataKey = dom.props.domData
                        dom.children[child].data = data[child]
                    } else if ("data" in dom.props) {
                        
                        if (dom.props.data == "this") {
                            dom.children[child].data = data
                        }
                    }

                }

                var domObj = this.applyTruthfulData(dom.children[child])
                if (domObj.isFor) {
                    obj.children = domObj.rdom

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
            if (Util.isPlaceHolder(style)) {
                if (Util.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = Util.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[Util.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (Util.isPlaceHolder(styleValue)) {
                styleValue = data[Util.getPlaceHolderValue(styleValue)]
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

export default RVDomUtil