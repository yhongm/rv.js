import RVDomUtil from "./rvDomUtil"
import Util from "./util"
import YhmParse from "./rvParse"
import Map from "./map"
class RvComponent {
    constructor(componentParam) {
        let { template, style, props, name, data, methods, run, domChange, watch } = componentParam
        this.template=template
        this.parse = new YhmParse()
        this.dom = this._getDomTree()
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
    use(rvComponentObj){
        this.parse.useCustomComponent(rvComponentObj)

    }
    _defineMethod() {
        for (let method of Object.keys(this.methods)) {
            var that = this
            this.methods[method] = that.methods[method].bind(this) //the method this point to  this rv component object
            Util.defineRvInnerGlobalValue(`${Util.generateHashMNameByMName(method)}`,  ()=>{
                that.methods[method].call(that, Util.getRvInnerGlobalValue(Util.getMethodHashId(method)))
            })
        }
        for (let data of Object.keys(this.data)){
            //define RV inner function to auto modify  data value
            Util.defineRvInnerGlobalValue(`${Util.generateHashMNameByMName(`${data}change`)}`,  ()=> {
                this.data[data]=Util.getRvInnerGlobalValue(Util.getMethodHashId(`${data}value`))
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
                const { name, value } = event
                Util.defineRvInnerGlobalValue(Util.getMethodHashId(`${this.getName()}${name}Event`), value, true)
                eval(`${Util.invokeGlobalFunName(Util.generateHashMNameByMName(`${this.getName()}${name}Event`))}()`)
            }
        })

    }
    _getDomTree() {
        try {
            this.parse.parseHtmlTemplate(this.template.trim())

        } catch (e) {
            console.error(`rv component parse e:${e}`)
        }
        return this.parse.getHtmlDom()
    }
    generateDom(){
        this.dom=this._getDomTree()
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