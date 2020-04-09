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
        this.rdom = this.rdom
        this.props = props
        this.data = data
        this.methods = methods
        this.componentRun = onRun
        this.componentDomChange = onDomChange
        this.mountLife = onMount
        this.watchObj = watch
        this.paramObj = {} // the paramObj 
        this.context = {
            componentName: this.name,
            componentData: this.data,
            route: undefined
        }
        YrvUtil.addStyle2Head(this.style)
        this._defineMethod()
        this._init()
    }
    _init() {
        this.parse = new YhmParse(this.context)
        this.rvDomUtil = new YrvDomUtil(this.context)
        this.observeMap = new YrvMap(this.name + "ComponentObserveMap")
    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    $routeChange(routeInfo) {
        let customEvent = document.createEvent("CustomEvent")
        customEvent.initCustomEvent("routeChange", true, true, routeInfo)
        document.dispatchEvent(customEvent)
    }
    _defineMethod() {
        for (let method of Object.keys(this.methods)) {
            var that = this
            this.methods[method] = that.methods[method].bind(this) //the method this point to  this rv component object
            YrvUtil.defineRvInnerGlobalValue(YrvUtil.generateHashMNameByMName(`${this.name}_${method}`), () => {
                that.methods[method].call(that, YrvUtil.getRvInnerGlobalValue(YrvUtil.getMethodHashId(`${this.name}_${method}`)))
            })
        }
        for (let data of Object.keys(this.data)) {
            //define RV inner function to auto modify  data value
            YrvUtil.defineRvInnerGlobalValue(YrvUtil.generateHashMNameByMName(`${this.name}_${data}change`), () => {
                this.data[data] = YrvUtil.getRvInnerGlobalValue(YrvUtil.getMethodHashId(`${this.name}_${data}value`))
            })
        }

        Object.defineProperty(this, "$sendEvent", {
            value: function (event) {
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
                YrvUtil.defineRvInnerGlobalValue(YrvUtil.getMethodHashId(`${componentName}_${this.name}${name}Event`), value, true)
                eval(`${YrvUtil.invokeGlobalFunName(YrvUtil.generateHashMNameByMName(`${componentName}_${this.name}${name}Event`))}()`)
            }
        })

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
    applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this._getDomTree()).rdom
    }

    _rv_ev_run() {
        this.componentRun.call(this)
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
    }
    getName() {
        return this.name
    }

    getDom() {
        return this.rdom
    }
    getProp() {
        return this.props
    }

}

export default YrvComponent