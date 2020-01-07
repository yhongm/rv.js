import RVDomUtil from "./rvDomUtil"
import Util from "./util"
import Map from "./map"
class RvComponent {
    constructor(componentParam) {
        let { dom, style, props, name, data, run, domChange, watch } = componentParam
        this.dom = dom
        this.style = style
        this.rdom = this.rdom
        this.props = props
        this.name = name
        this.data = data
        this.componentRun = run
        this.componentDomChange = domChange
        this.rvDomUtil = new RVDomUtil(data)
        this.observeMap = new Map()
        this.watchObj = watch
        Util.addStyle2Head(this.style)
        this.applyTruthFulData()

    }

    applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this.dom)
        Object.defineProperty(this.rdom, "component", { value: true })
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