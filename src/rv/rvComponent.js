import RVDomUtil from "./rvDomUtil"
import Util from "./util"
import Map from "./map"
class RvComponent {
    constructor(componentParam) {
        let { dom, style, props, name, data, methods, run, domChange, watch } = componentParam
        this.dom = dom
        this.style = style
        this.rdom = this.rdom
        this.props = props
        this.name = name
        this.data = data
        this.methods = methods
        this.componentRun = run
        this.componentDomChange = domChange
        this.rvDomUtil = new RVDomUtil(data)
        this.observeMap = new Map()
        this.watchObj = watch
        Util.addStyle2Head(this.style)
        this._defineMethod()
    }
    _defineMethod() {
        for (let method of Object.keys(this.methods)) {
            var that = this
            this.methods[method]=that.methods[method].bind(this) //将this对象传递到method对象中
            Util.defineRvInnerGlobalValue(`${Util.generateHashMNameByMName(method)}`, function () {
                that.methods[method].call(that, Util.getRvInnerGlobalValue(Util.getMethodHashId(method)))
            })
        }
        Object.defineProperty(this,"$sendEvent",{value:function(event){
            /**
             * this function use to send event to other component
             * *params name   this is event name
             * *params value  this is event value
             * call $sendEvent(name,value) send event
             * 
             * in other component use 'componentName'+'eventName'+'Event' constitute functionName receive this event
             */
            const {name,value}=event
            Util.defineRvInnerGlobalValue(Util.getMethodHashId(`${this.getName()}${name}Event`),value,true)    
            eval(`${Util.invokeGlobalFunName(Util.generateHashMNameByMName(`${this.getName()}${name}Event`))}()`)
        }})

    }
    
    applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this.dom).rdom 
        // Object.defineProperty(this.rdom, "component", { value: true })
    }
    
    run() {
        this.componentRun.call(this)
    }
    domChange() {
        this.componentDomChange.call(this)
    }
    getName() {
        return this.name
    }
    apply(props) {
         for (let prop of Object.keys(this.props)) { 
            if (props[prop]) {
                this.props[prop] = props[prop]
            }

        }


    }
    childContent(dom, props) {
        for (children of dom.children) {
            if (Util.isString(children)) {
                if (Util.isPlaceHolder(children)) {
                    value = props[Util.getPlaceHolderValue(children)]

                }
            } else {
                this.childContent(children)
            }
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