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
        this.use(this.context.route.getNeedRenderComponent()) //todo
        this._handleMultiComponent(this.parse)
        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom)
        this.w = this.ve.render()
        root.appendChild(this.w)
        callback(this)
        YrvUtil.receiveRvEvent("routeChange",(e,detail)=>{
            this.parse.componentMap.clear()
            this.context.route.go(detail)
            this.use(this.context.route.getNeedRenderComponent(),false)
            this._handleMultiComponent(this.parse)
            this._updatedom()
        })
        YrvUtil.receiveRvEvent("dataChange",(e,detail)=>{
            this._updatedom()
        })
        this._updatedom()
    }
    _handleMultiComponent(parse) {
        parse.componentMap.forEach((componentQueue) => {
            componentQueue.forEach((component)=>{
                if (component.parse.componentMap && component.parse.componentMap.length > 0) {
                    this._handleMultiComponent(component.parse)
                 }
                 component._rv_ev_run()
            })
           

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
        // return option
        return new YrvComponent(option, false)
    }

}

export default RV