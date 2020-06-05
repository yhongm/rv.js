import YrvDomUtil from "./yrvDomUtil"
import YrvUtil from "./yrvUtil"
import YhmParse from "./yrvParse"
import YrvMap from "./yrvMap"
import YrvPatch from "./yrvPatch"
import YrvDiff from "./yrvDiff"
import YrvElement from "./yrvElement"
import YrvRoute from "./yrvRoute"
/**
 * @author yhongm
 * the 'YrvComponent' class use to 'yrv' framwork  descpration component  
 */
class YrvComponent {
    constructor(componentParam, ismain = true) {
        let {
            template,
            style,
            props,
            name,
            data,
            methods,
            watch,
            onRun,
            onDomChange,
            onMount,
            onUnMount,
            onInit
        } = componentParam
        this.isMainRvComponent = ismain
        this.template = template
        this.name = name
        if (this.isMainRvComponent) {
            this.name = "main"
        }
        this.isParsedHtml = false
        this.style = style
        this._rdom = {}
        this.props = props
        this.data = data
        this.methods = methods
        this.componentRun = onRun
        this.componentDomChange = onDomChange
        this.componentInit = onInit
        this.mountLifeCycle = onMount
        this.unMountLifeCycle=onUnMount
        this.watchObj = watch
        this._cloneMethods = YrvUtil.cloneObj(methods)
        this._cloneWatchObj = YrvUtil.cloneObj(watch)
        this.paramObj = {} // the paramObj
        this.belongComponent = "main"
        this.componentkey = name
        this._initInfo = false
        this.componentUniqueTag = this.name //the clone tag is unique
        this._isRender = false
        this._isUpdate = false
        this._isRun = false
        YrvUtil.addStyle2Head(this.style, this.name)
        // this._defineMethod()
        this._init()
    }
    _init() {
        this.context = {
            componentName: this.name,
            componentData: this.data,
            componentUniqueTag: this.componentUniqueTag,
            route: undefined
        }
        this.parse = new YhmParse(this.context)
        this.rvDomUtil = new YrvDomUtil(this.context)
        this.observeMap = new YrvMap(this.name + "ComponentObserveMap")
        this.yrvPatch = new YrvPatch(this.context)
        this.yrvDiff = new YrvDiff(this.context)
    }

    _belong(belongComponent) {
        this.belongComponent = belongComponent
    }
    getParentComponentName() {
        return this.belongComponent
    }
    getComponentUniqueTag() {
        return this.componentUniqueTag
    }
    route(routeConfigs) {
        this.context.route = new YrvRoute(this.name)
        this.context.route.register(routeConfigs)
    }
    use(rvComponentObjProxy, key = "", needClone = true, ) {
        let rvComponentObj
        if (needClone) {
            rvComponentObj = rvComponentObjProxy["this"]._cloneNew(key)
        } else {
            rvComponentObj = rvComponentObjProxy
        }
        this.parse.useCustomComponent(rvComponentObj)
    }
    _registerEvent() {
        YrvUtil.receiveRvEvent(this.name + "_routeChange", (e, detail) => {
            this.context.route.go(detail)
            this._parseHtmlTemplate(true)
            this.context.route.getNeedRenderComponent()._rv_ev_run()
            this._updatedom()
        })
    }

    $routeChange(routeInfo, componentName = "main") {
        YrvUtil.createAndSendSimpleRvEvent(componentName + "_routeChange", routeInfo)
    }
    $sendEvent(event) {
        /**
                * this function use to send event to other component
                * *params name   this is event name
                * *params value  this is event value
                * call $sendEvent(name,value) send event
                */
        const {
            name,
            value
        } = event
        YrvUtil.createAndSendSimpleRvEvent(name, value)
    }
    $onEvent(event, callback) {
        YrvUtil.receiveRvEvent(event, (value) => {
            callback(value.detail)
        })
    }

    _defineMethod(thatThis) {
        if (!thatThis) {
            thatThis = this
        }
        for (let method of Object.keys(this.methods)) {
            this.methods[method] = this._cloneMethods[method].bind(thatThis) //the method this point to  this rv component object
            const methodHandler = {
                apply: function (target, thisArg, argumentsList) {
                    return target(argumentsList);
                }
            };
            YrvUtil.receiveRvEvent(YrvUtil.generateHashMNameByMName(`${this.name}_${this.componentUniqueTag}_${method}`), (e, detail) => {
                this.methods[method].call(thatThis, detail)
            })
            YrvUtil.receiveRvEvent(`${this.name}_${method}`, (e, detail) => {
                this.methods[method].call(thatThis, detail)
            })
        }
        for (let watchFun of Object.keys(this.watchObj)) {
            this.watchObj[watchFun] = this._cloneWatchObj[watchFun].bind(thatThis)
        }
        for (let data of Object.keys(this.data)) {
            YrvUtil.receiveRvEvent(YrvUtil.generateHashMNameByMName(`${this.name}_${this.componentUniqueTag}_${data}change`), (el, value) => {
                this.data[data] = value
            })
        }



    }
    _clearMethods() {
        for (let method of Object.keys(this.methods)) {
            delete this.methods[method]
        }
    }
    _parseHtmlTemplate(isforce = false) {
        if (!this.isParsedHtml || isforce) {
            this.parse.parseHtmlTemplate(this.template.trim())
            this.isParsedHtml = true
        }
    }
    _getDomTree() {
        return this.parse.getHtmlDom()
    }
    _getComponentContainer() {
        return this.parse.mComponentContainer
    }
    _render() {
        this._parseHtmlTemplate()
        this._applyRealDataVdom()
        this._yrvElement = this.rvDomUtil.getYrvElement(this._rdom, (el, props, belong, componentUniqueTag) => {
            this._hookRender(el, props, belong, componentUniqueTag)
        })
        this.w = this._yrvElement.render(this._getComponentContainer())
        this._isRender = true
        return this.w
    }
    _applyRealDataVdom() {
        this._getComponentContainer().forEach((componentContainer) => {
            Object.keys(componentContainer.component.props).forEach(componentProp => {
                let propValue = componentContainer.prop[componentProp]
                if (YrvUtil.isPlaceHolder(propValue)) {
                    propValue = this.data[YrvUtil.getPlaceHolderValue(propValue)]
                }
                componentContainer.component.props[componentProp] = propValue

            })
            componentContainer.component._rv_ev_domChange()
        })
        this._applyTruthFulData()

    }
    h(tag, props, children) {
        return new YrvElement(tag, props, children)
    }
    _diff(oldYrvElement, newYrvElement) {
        this.yrvDiff.setComponentContainer(this._getComponentContainer())
        this.yrvDiff.goDiff(oldYrvElement, newYrvElement)
        return this.yrvDiff.patches
    }
    _patch(node, patches) {
        this.yrvPatch.setComponentContainer(this._getComponentContainer())
        this.yrvPatch.apply(node, patches)
    }
    _updatedom() {
        if (!this._isUpdate && this._isRender) {
            this._isUpdate = true
            this._applyRealDataVdom()
            let _newYrvElement = this.rvDomUtil.getYrvElement(this._rdom, (el, props, belong, componentUniqueTag) => {
                this._hookRender(el, props, belong, componentUniqueTag)
            })
            let diff = this._diff(this._yrvElement, _newYrvElement)
            this._patch(this.w, diff)
            this._yrvElement = _newYrvElement
            this._yrvElement._calcCount(this._getComponentContainer())
            this._isUpdate = false
        }
    }
    _hookRender(el, props, belong, componentUniqueTag) {

    }
    _applyTruthFulData() {
        this._rdom = this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom
    }
    _rv_ev_run() {
        if (this.componentRun && !this._isRun) {
            if(this.context.route!==undefined){
                this._registerEvent()
            }
            this.componentRun.call(this)
            this._isRun = true
        }
        this.parse.componentMap.forEachKV((name, componentQueue) => {
            componentQueue.forEach((component) => {
                if (!component._isRun) {

                    component._rv_ev_run()
                }
            })
        })
        
        this._getComponentContainer().forEach((componentInfo) => {
            if (!componentInfo.component._isRun) {
                componentInfo.component._rv_ev_run()
            }

        })
        if(this.context.route!==undefined){
            this.context.route.getRoutes().forEach(routeConfig=>{
                //routeConfig.component._rv_ev_run()
                if(routeConfig.component.context.route!==undefined){
                    routeConfig.component._registerEvent()
                }
            })
        }

    }
    _rv_ev_init_props() {
        if (this.componentInit && !this._initInfo) {
            this.componentInit.call(this)
            this._initInfo = true
        }
    }
    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the domtree will change ,this function will call by the yrv.js framework call
     * this event function call before the applyTruthFulData call ,so do something about data
     */
    _rv_ev_domChange() {
        this._rv_ev_init_props()
        if (this.componentDomChange) {
            this.componentDomChange.call(this, this.paramObj)
        }
    }

    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the component mount ,this function will call
     */
    _rv_ev_mount() {
        if (this.mountLifeCycle) {
            this.mountLifeCycle.call(this)
        }
        this.parse.componentMap.forEachKV((name, componentQueue) => {
            componentQueue.forEach((component) => {
                component._rv_ev_mount()
            })
        })
    }
    _rv_ev_un_mount(){
        if (this.unMountLifeCycle) {
            this.unMountLifeCycle.call(this)
        }
        this.parse.componentMap.forEachKV((name, componentQueue) => {
            componentQueue.forEach((component) => {
                component._rv_ev_un_mount()
            })
        })
    }
    getName() {
        return this.name
    }
    _getDom() {
        return this._rdom
    }
    _getProp() {
        return this.props
    }
    _cloneData() {
        return YrvUtil.clone(this.data)
    }
    _cloneNew(key) {
        let cloneObj = YrvUtil.deepinCloneObj(this)
        if (key !== "") {
            cloneObj.componentkey = key
        }
        cloneObj.componentUniqueTag = `${cloneObj.name}_${cloneObj.componentkey}_rv_${String(new Date() / 1).slice(-2)}${(Math.round(Math.random() * 90) + 10)}`
        cloneObj.context = {
            componentName: cloneObj.name,
            componentData: cloneObj.data,
            componentUniqueTag: cloneObj.componentUniqueTag,
            route: this.context.route,
            //the component route object not allow clone,because the route include components ,the components  will not clone by route clone
            //so the route only use in page component
        }
        cloneObj.parse.updateContext(cloneObj.context)
        cloneObj.rvDomUtil.updateContext(cloneObj.context)
        cloneObj._defineMethod(cloneObj)
        let ev = cloneObj.componentUniqueTag + "_dataChange"
        YrvUtil.observeComponent(cloneObj, () => {
            YrvUtil.createAndSendSimpleRvEvent(ev)
        })
        YrvUtil.receiveRvEvent(ev, () => {
            cloneObj._updatedom()
        })
        return cloneObj

    }

}

export default YrvComponent
