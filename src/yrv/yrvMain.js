import YrvUtil from "./yrvUtil"

import YrvComponent from "./yrvComponent"
import YrvRoute from "./yrvRoute"

class RV extends YrvComponent {
    constructor(el, componentParam) {
        super(componentParam)
        this.el = el
        this.context.route = new YrvRoute()
        this._isUpdate=false
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
        this.use(this.context.route.getNeedRenderComponent(), "", false) 
        this.ve = YrvUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom,(el,props,belong,componentUniqueTag)=>{
            this._hookRender(el,props,belong,componentUniqueTag)
        })
        this.w = this.ve.render()
        this._registerEvent()
        this._rv_ev_run()
        root.appendChild(this.w)
        callback(this)
        
        this._updatedom()
    }
    _updatedom() {
        if(!this._isUpdate){
            this._isUpdate=true
            let nve = YrvUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom,(el,props,belong,componentUniqueTag)=>{
                this._hookRender(el,props,belong,componentUniqueTag)
            })
            YrvUtil.patch(this.w, YrvUtil.diff(this.ve, nve))
            this.ve = nve
            this._isUpdate=false

        }
        
    }

    _hookRender(el,props,belong,componentUniqueTag){
        
    }
    _registerEvent(){
        YrvUtil.receiveRvEvent("routeChange", (e, detail) => {
            this.parse.componentMap.clear()
            this.context.route.go(detail)
            this.use(this.context.route.getNeedRenderComponent(), "", false)
            this._rv_ev_run()
            this._updatedom()
        })
        YrvUtil.receiveRvEvent("dataChange", (e, detail) => {
            this._updatedom()
        })
    }

    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {
        return new Proxy(new YrvComponent(option, false),{
            set: function (obj, prop, value) {
                obj[prop] = value
            },
            get: function (obj, prop) {
                if (prop === "this") {
                    return obj
                }
                if(prop.startsWith("_")){
                    throw new Error("the prop start with _ is a inner function or data,please not call that")
                    return 
                }
                return obj[prop]
            },
            apply: function (target, thisArg, argumentsList) {
                target(argumentsList)
            }
        })

    }

}

export default RV