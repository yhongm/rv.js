import Util from "./util"
import Patch from "./patch"
import Diff from "./diff"
import Element from "./element"
import RvComponent from "yrv.js/src/rv/yrvComponent"
import RvRoute from "yrv.js/src/rv/yrvRoute"
class RV extends RvComponent {
    constructor(el, componentParam) {
        super(componentParam)
        this.el = el
        this.context.route = new RvRoute()
    }
    route(routeConfigs) {
        //the function use to register route
        this.context.route.register(routeConfigs)
    }

    /**
     * run rv
     */
    run(funCallback) {
        let root = Util.isString(this.el) ? document.querySelector(this.el) : this.el
        Util.addStyle2Head(this.style)
        let rvThis = this
        this.use(this.context.route.getNeedRenderComponent()) //todo
        this._handleMultiComponent(this.parse, rvThis)
        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom)
        this.w = this.ve.render()
        root.appendChild(this.w)
        observe(this.data, this.observeMap, () => {
            this._updatedom()
        })

        funCallback(this)

        Object.defineProperty(this, "_$goRoutePath", {
            set(val) {
                this.context.route.go(val)
                this._updatedom()
            },
        })
        window.routeChange = function (path) {
            let customEvent = document.createEvent("CustomEvent")
            customEvent.initCustomEvent("routeChange", true, true, path)
            document.dispatchEvent(customEvent)
        }
        document.addEventListener("routeChange", (e) => {
            this._$goRoutePath = e.detail
            this.parse.componentMap.clear()
            this.use(this.context.route.getNeedRenderComponent()) //todo
            this._handleMultiComponent(this.parse, rvThis) //todo

        })
        this._updatedom()
    }
    _handleMultiComponent(parse, rvThis) {
        parse.componentMap.forEach(function (component) {
            if (component.parse.componentMap && component.parse.componentMap.length > 0) {
                rvThis._handleMultiComponent(component.parse, rvThis)
            }
            observe(component.data, component.observeMap, () => {
                rvThis._updatedom(rvThis._getDomTree())
            })
            Util.loopGet(component.data)
            Object.keys(component.watchObj).forEach((watchFun) => {

                if ((component.observeMap.hasKey(watchFun))) {
                    component.observeMap.get(watchFun).add(() => {
                        component.watchObj[watchFun]()
                    })
                }
            })
            component._rv_ev_run()

        })
    }

    watch(key, callback) {
        if (this.observeMap.hasKey(key)) {
            this.observeMap.get(key).add(callback)
        }

    }
    _updatedom() {
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom)
        patch(this.w, diff(this.ve, nve))
        this.ve = nve
    }

    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {

        return new RvComponent(option, false)
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
        if (!this.updateFunctions.has(observableUpdate)) {
            this.updateFunctions.add(observableUpdate)
        }

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
    d.goDiff()
    return d.patches
}


function patch(node, patches) {
    new Patch(node, patches).apply()
}
export default RV