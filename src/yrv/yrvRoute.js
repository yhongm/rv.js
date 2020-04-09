import YrvMap from "./yrvMap"
class YrvRoute {
    constructor() {
        this.needRenderpath = ""
        this.routers = new YrvMap("RvRouteMap")
    }
    register(routerConfigs) {
        routerConfigs.forEach(routerConfig => {
            this.routers.put(routerConfig.path, routerConfig)
        })

        this.needRenderpath = this.routers.filterV((k, v) => {
            return v.ismain && v.ismain === true
        }).path
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