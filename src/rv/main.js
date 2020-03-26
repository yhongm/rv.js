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
        this.name="main"
        this.parse = new YhmParse(this.name)
        this.rvDomUtil = new RVDomUtil(this.data)


    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    methods(methodObj) {
        this.methods = methodObj
        this._defineMethod()
    }
    _defineMethod() {
        for (let method of Object.keys(this.methods)) {
            var that = this
            this.methods[method] = this.methods[method].bind(this) //the method this point to  this rv object
            console.log(`method:${method} ,value:${Util.getMethodHashId(`${this.name}_${method}`)}`)
            Util.defineRvInnerGlobalValue(Util.generateHashMNameByMName(`${this.name}_${method}`), function () {
                that.methods[method].call(that, Util.getRvInnerGlobalValue(Util.getMethodHashId(`${that.name}_${method}`)))
            })
        }
    }
    /**
     * run rv
     */
    run(funCallback) {
        let root = Util.isString(this.el) ? document.querySelector(this.el) : this.el
        Util.addStyle2Head(this.style)
        let dom = this._getDomTree()

        let rvThis = this
       
        this._handleMultiComponet(this.parse,rvThis)
        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom).rdom)
        this.w = this.ve.render()
        root.appendChild(this.w)

        observe(this.data, this.observeMap, () => {
            this._updatedom(this._getDomTree())
        })
        this._updatedom(dom)
        funCallback(this)
    }
    _handleMultiComponet(parse,rvThis){
        parse.componetMap.forEach(function (componet) {
            if(componet.parse.componetMap&&componet.parse.componetMap.length>0){
                rvThis._handleMultiComponet(componet.parse,rvThis)
            }
            observe(componet.data, componet.observeMap, () => {
                rvThis._updatedom(rvThis._getDomTree())
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
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom).rdom)
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
        
        return new RvComponent({ template: template, style: style, props: props, name: name, data: data, methods: option.methods, run: option.run, domChange: option.domChange, watch: option.watch })
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