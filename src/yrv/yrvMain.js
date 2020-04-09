import YrvUtil from "./yrvUtil"

import YrvComponent from "./yrvComponent"
import YrvRoute from "./yrvRoute"

class RV extends YrvComponent {
    constructor(el, componentParam) {
        super(componentParam)
        this.el = el
        this.context.route = new YrvRoute()
    }
    route(routeConfigs) {
        //the function use to register route
        this.context.route.register(routeConfigs)
    }
    /**
     * run rv
     */
    run(callback) {
        let root = YrvUtil.isString(this.el) ? document.querySelector(this.el) : this.el
        YrvUtil.addStyle2Head(this.style)
        let rvThis = this
        this.use(this.context.route.getNeedRenderComponent()) //todo
        this._handleMultiComponent(this.parse, rvThis)
        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom)
        this.w = this.ve.render()
        root.appendChild(this.w)
        callback(this)
        if (this.watchObj) {
            Object.keys(this.watchObj).forEach((watchFun) => {

                if ((this.observeMap.hasKey(watchFun))) {
                    this.observeMap.get(watchFun).add(() => {
                        this[watchFun]()
                    })
                }
            })
        }

        YrvUtil.observe(this.data, this.observeMap, () => {
            this._updatedom()
        })
        document.addEventListener("routeChange", (e) => {
            this.parse.componentMap.clear()
            this.context.route.go(e.detail)
            this.use(this.context.route.getNeedRenderComponent())
            this._handleMultiComponent(this.parse, rvThis)
            this._updatedom()

        })
        this._updatedom()
    }
    _handleMultiComponent(parse, rvThis) {
        parse.componentMap.forEach((component) => {
            if (component.parse.componentMap && component.parse.componentMap.length > 0) {
                rvThis._handleMultiComponent(component.parse, rvThis)
            }
            YrvUtil.observe(component.data, component.observeMap, () => {
                rvThis._updatedom(rvThis._getDomTree())
            })
            YrvUtil.loopGet(component.data)
            if (component.watchObj) {
                Object.keys(component.watchObj).forEach((watchFun) => {

                    if ((component.observeMap.hasKey(watchFun))) {
                        component.observeMap.get(watchFun).add(() => {
                            component.watchObj[watchFun]()
                        })
                    }
                })
            }
            component._rv_ev_run()

        })
    }
    _updatedom() {
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom)
        YrvUtil.patch(this.w, YrvUtil.diff(this.ve, nve))
        this.ve = nve
    }

    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {

        return new YrvComponent(option, false)
    }

}

export default RV