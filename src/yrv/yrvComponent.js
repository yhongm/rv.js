import YrvDomUtil from "./yrvDomUtil"
import YrvUtil from "./yrvUtil"
import YhmParse from "./yrvParse"
import YrvMap from "./yrvMap"
class YrvComponent {
    constructor(componentParam, ismain = true) {
        let {
            template,
            style,
            props,
            name,
            data,
            methods,
            onRun,
            onDomChange,
            watch,
            onMount
        } = componentParam
        this.isMainRvComponent = ismain
        this.template = template
        this.name = name
        if (this.isMainRvComponent) {
            this.name = "main"
        }
        this.isParsedHtml = false
        this.style = style
        this.rdom = {}
        this.props = props
        this.data = data
        this.methods = methods
        this.componentRun = onRun
        this.componentDomChange = onDomChange
        this.mountLife = onMount
        this.watchObj = watch
        this._cloneMethods=YrvUtil.cloneObj(methods)
        this._cloneWatchObj=YrvUtil.cloneObj(watch)
        this.paramObj = {} // the paramObj
        this.belongComponent = "main"
        this.componentkey=name
        this.componentUniqueTag = this.name //the clone tag is unique
        this.cloneArray = []

        YrvUtil.addStyle2Head(this.style)
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
    }

    _belong(belongComponent) {
        this.belongComponent = belongComponent
    }
    getParentComponentName(){
        return this.belongComponent
    }
    getComponentUniqueTag(){
        return this.componentUniqueTag
    }
    use(rvComponentObjProxy, key = "", needClone = true, ) {
        let rvComponentObj
        if (needClone) {
            rvComponentObj = rvComponentObjProxy["this"]._cloneNew(key)
        }else{
            rvComponentObj = rvComponentObjProxy
        }
        this.parse.useCustomComponent(rvComponentObj)
    }

    $routeChange(routeInfo) {
        YrvUtil.createAndSendSimpleRvEvent("routeChange", routeInfo)
    }
    $sendEvent(event) {
        /**
                * this function use to send event to other component
                * *params name   this is event name
                * *params value  this is event value
                * call $sendEvent(name,value) send event
                * 
                * in other component use 'componentName'+'eventName'+'Event' constitute functionName receive this event
                */
        const {
            name,
            value,
            componentName
        } = event
        YrvUtil.createAndSendSimpleRvEvent(`${componentName}_${this.name}${name}Event`, value)
    }

    _defineMethod(thatThis) {
        if(!thatThis){
            thatThis=this
        }
        for (let method of Object.keys(this.methods)) {
            this.methods[method] = this._cloneMethods[method].bind(thatThis) //the method this point to  this rv component object
            const methodHandler = {
                apply: function(target, thisArg, argumentsList) {
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
    _clearMethods(){
        for (let method of Object.keys(this.methods)) {
             delete this.methods[method]
        }
    }
    _getDomTree() {

        if (!this.isParsedHtml || this.parse.componentMap.length > 0) {
            //the parse html function only use once if the component not contain child component
            try {

                this.parse.parseHtmlTemplate(this.template.trim())
                this.isParsedHtml = true

            } catch (e) {
                console.error(`rv component ${this.getName()} parse e:${e}`)
            }
        }
        return this.parse.getHtmlDom()
    }
    _applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom
    }

    _rv_ev_run() {
        if (this.componentRun) {
            this.componentRun.call(this)
        }
        this.parse.componentMap.forEachKV((name, componentQueue) => {
            componentQueue.forEach((component) => {
                component._rv_ev_run()
            })
        })

    }
    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the domtree will change ,this function will call by the yrv.js framework call
     * this event function call before the applyTruthFulData call ,so do something about data
     */
    _rv_ev_domChange() {
        if (this.componentDomChange) {
            this.componentDomChange.call(this, this.paramObj)
        }
    }

    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the component mount ,this function will call
     */
    _rv_ev_mount() {
        if (this.mountLife) {
            this.mountLife.call(this)
        }
        this.parse.componentMap.forEachKV((name, componentQueue) => {
            componentQueue.forEach((component) => {
                component._rv_ev_mount()
            })
        })
    }
    getName() {
        return this.name
    }

    _getDom() {
        return this.rdom
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
        cloneObj.componentUniqueTag = `${cloneObj.name}_${cloneObj.componentkey}_rv_${Math.floor(new Date() / 1)}`
        cloneObj.context = {
            componentName: cloneObj.name,
            componentData: cloneObj.data,
            componentUniqueTag: cloneObj.componentUniqueTag,
            route: undefined
        }
        cloneObj.parse.updateContext(cloneObj.context)
        cloneObj.rvDomUtil.updateContext(cloneObj.context)
        cloneObj._defineMethod(cloneObj)
        YrvUtil.observeComponent(cloneObj, () => {
            YrvUtil.createAndSendSimpleRvEvent("dataChange")
        })
        this.cloneArray.push(cloneObj)
        return cloneObj

    }

}

export default YrvComponent
