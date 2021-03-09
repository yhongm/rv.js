import YrvMap from "./yrvMap"
/**
 * @author yhongm
 * the route use page component swicth
 * the route only use in page component
 */
class YrvRoute {
    constructor(name,context) {
        this.needRenderpath = ""
        this.routeName=name
        this.context=context
        this.routers = new YrvMap("RvRouteMap")
    }
    register(routerConfigs) {
        routerConfigs.forEach(routerConfig => {
            routerConfig.component=routerConfig.component["this"]._cloneNew("")
            routerConfig.component._setParentContext(this.context)
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
            if(this.needRenderpath!==""&&this.needRenderpath!==path){
                this.routers.get(this.needRenderpath).component._rv_ev_un_mount()
                //unMount the component before the new Component mount
            }
            let prevPath=this.needRenderpath;
            this.needRenderpath = path
            if (paramObj) {
                this.routers.get(this.needRenderpath).param = paramObj
            }
            this.routers.get(this.needRenderpath).component._rv_set_routeInfo(prevPath,path,paramObj)
            this.routers.get(this.needRenderpath).component._rv_ev_mount()
        } else {
            throw new Error("the route '"+path+"'path unexisted ,please first declaration in route config")
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