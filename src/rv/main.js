import Util from "./util"
import Patch from "./patch"
import Diff from "./diff"
import Element from "./element"
import YhmParse from "./rvParse"
import RVDomUtil from "./rvDomUtil"
import RvComponent from "./rvComponent"
import Map from "./map"
class RV {
    constructor(option) {
        const {
            el,
            data,
            style,
            template
        } = option
        this.el = el
        this.data = data
        this.style = style
        this.template = template
        this.observeMap = new Map()
        this.parse = new YhmParse()
        this.rvDomUtil = new RVDomUtil(this.data)


    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    /**
     * run rv
     */
    run(funCallback) {
        let root = Util.isString(this.el) ? document.querySelector(this.el) : this.el
        Util.addStyle2Head(this.style)
        let dom = this._getDomTree()

        let rvThat = this
        this.parse.componetMap.forEach(function (componet) {

            observe(componet.data, componet.observeMap, () => {

                dom = rvThat._getDomTree()
                rvThat._updatedom(dom)
            })
            Util.loopGet(componet.data)
            Object.keys(componet.watchObj).forEach((watchFun) => {

                if ((componet.observeMap.hasKey(watchFun))) {
                    componet.observeMap.get(watchFun).add(() => {
                        componet.watchObj[watchFun]()
                    })
                }
            })
            componet.run()

        })

        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        this.w = this.ve.render()
        root.appendChild(this.w)

        observe(this.data, this.observeMap, () => {
            this._updatedom(dom)
        })
        this._updatedom(dom)
        funCallback(this)
    }
    _getDomTree() {
        try {
            this.parse.parseHtmlTemplate(this.template.trim())

        } catch (e) {
            console.error(`rv parse e:${e}`)
        }
        return this.parse.getHtmlDom()
    }
    _updatedom(dom) {
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        window.nve = nve
        window.ve = this.ve
        patch(this.w, diff(this.ve, nve))
        this.parse.componetMap.forEach((component) => {
            component.domChange()
        })
        this.ve = nve
    }
    watch(key, callback) {
        if (this.observeMap.hasKey(key)) {
            this.observeMap.get(key).add(callback)
        }

    }
    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {

        const { name, template, style, props, data } = option
        let parse = new YhmParse()
        parse.parseHtmlTemplate(template.trim())

        let dom = parse.getHtmlDom()

        return new RvComponent({ dom: dom, style: style, props: props, name: name, data: data, run: option.run, domChange: option.domChange, watch: option.watch })
    }


}


function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        let observable = new Observable()
        if (internalValue instanceof Object) {
            observe(internalValue, observeMap, callback)
        }
        observeMap.put(key, observable)
        Object.defineProperty(obj, key, {
            get() {
                observable.add(callback)
                return internalValue
            },
            set(newVal) {
                const changed = internalValue !== newVal
                internalValue = newVal
                if (changed) {
                    observable.invoke()
                }
            }
        })
    })
    return obj
}



class Observable {
    constructor() {
        this.updateFunctions = new Set()
    }
    add(observableUpdate) {
        this.updateFunctions.add(observableUpdate)
    }
    invoke() {
        this.updateFunctions.forEach(fun => fun())
    }
}


/**
 * the method use to deep clone obj
 * @param {*} obj 
 */
function clone(obj) {
    let getType = (o) => {
        if (o === null) return "null";
        if (o === undefined) return "undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }
    let result, oClass = getType(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        let copy = obj[key];
        if (getType(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (getType(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}



function h(tagName, props, children) {
    return new Element(tagName, props, children)
}
function diff(oldTree, newTree) {
    let d = new Diff(oldTree, newTree)
    return d.patches
}


function patch(node, patches) {
    return new Patch(node, patches)
}



export default RV