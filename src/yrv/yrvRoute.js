import YrvMap from "./yrvMap"
import YrvComponent from "yrv.js/src/yrv/yrvComponent"
class YrvRoute {
    constructor() {
        this.needRenderpath = ""
        this.routers = new YrvMap("RvRouteMap")
    }
    register(routerConfigs) {
        routerConfigs.forEach(routerConfig => {
            routerConfig.component=routerConfig.component["this"]._cloneNew("")
            this.routers.put(routerConfig.path, routerConfig)
        })

        let mainComponent = this.routers.filterV((k, v) => {
            return v.ismain && v.ismain === true
        })
        if(!mainComponent){
            throw new Error("register route ,but the main component not declaranted")
        }
        this.go({path:mainComponent.path,paramObj:mainComponent.param})
    }
    getRoutes() {
        return this.routers
    }
    go(route) {
        
        const {
            path,
            paramObj
        } = route
        if (this.routers.hasKey(path)) {
            this.needRenderpath = path
            if (paramObj) {
                this.routers.get(this.needRenderpath).param = paramObj
            }
            this.routers.get(this.needRenderpath).component._rv_ev_mount()
        } else {
            throw new Error("the route path unexisted ,please first declaration in route config")
        }

    }
    getNeedRenderComponent() {
        return this.routers.get(this.needRenderpath).component
    }
    getNeedRenderComponentParam() {
        return this.routers.get(this.needRenderpath).param
    }


}
export default YrvRoute