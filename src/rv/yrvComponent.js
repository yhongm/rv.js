import RVDomUtil from "yrv.js/src/rv/yrvDomUtil"
import Util from "yrv.js/src/rv/util"
import YhmParse from "yrv.js/src/rv/yrvParse"
import Map from "yrv.js/src/rv/map"
class RvComponent {
    constructor(componentParam,ismain=true) {
        let { template, style, props, name, data, methods, run, onDomChange, watch, onMount} = componentParam
        this.isMainRvComponent=ismain
        this.template = template
        this.name = name
        if(this.isMainRvComponent){
            this.name = "main"
        }
        this.isParsedHtml = false
        this.style = style
        this.rdom = this.rdom
        this.props = props
        this.data = data
        this.methods = methods
        this.componentRun = run
        this.componentDomChange = onDomChange
        this.mountLife = onMount
        this.watchObj = watch
        this.paramObj={} // the paramObj 
        this.context={
            componentName: this.name,
            componentData:this.data,
            route: undefined
        }
        Util.addStyle2Head(this.style)
        this._defineMethod()
        this.init()
    }
    init(){
        this.parse = new YhmParse(this.context)
        this.rvDomUtil = new RVDomUtil(this.context)
        this.observeMap = new Map(this.name+"ComponentObserveMap")
    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    _defineMethod() {
        for (let method of Object.keys(this.methods)) {
            var that = this
            this.methods[method] = that.methods[method].bind(this) //the method this point to  this rv component object
            Util.defineRvInnerGlobalValue(Util.generateHashMNameByMName(`${this.name}_${method}`), () => {
                that.methods[method].call(that, Util.getRvInnerGlobalValue(Util.getMethodHashId(`${this.name}_${method}`)))
            })
        }
        for (let data of Object.keys(this.data)) {
            //define RV inner function to auto modify  data value
            Util.defineRvInnerGlobalValue(Util.generateHashMNameByMName(`${this.name}_${data}change`), () => {
                this.data[data] = Util.getRvInnerGlobalValue(Util.getMethodHashId(`${this.name}_${data}value`))
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
                const { name, value, componentName } = event
                Util.defineRvInnerGlobalValue(Util.getMethodHashId(`${componentName}_${this.name}${name}Event`), value, true)
                eval(`${Util.invokeGlobalFunName(Util.generateHashMNameByMName(`${componentName}_${this.name}${name}Event`))}()`)
            }
        })

    }
    _getDomTree() {
        if (!this.isParsedHtml||this.parse.componentMap.length>0) {
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

    run() {
        this.componentRun.call(this)
    }
    /**
     * this is yrv.js inner event ,only call by yrv.js framework
     * when the domtree will change ,this function will call by the yrv.js framework call
     * this event function call before the applyTruthFulData call ,so do something about data
     */
    _rv_ev_domChange() {
        if(this.componentDomChange){    
            this.componentDomChange.call(this,this.paramObj)
        }
    }
    getName() {
        return this.name
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


    getDom() {
        return this.rdom
    }
    getProp() {
        return this.props
    }

}
export default RvComponent