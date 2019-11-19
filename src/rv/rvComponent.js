import RVDomUtil from "./rvDomUtil"
import Map from "./map"
class RvComponent {
    constructor(componentParam) {
        let { dom, props, name, data, run, watch } = componentParam
        this.dom = dom
        this.rdom = this.rdom
        this.props = props
        this.name = name
        this.data = data
        this.componentRun = run
        this.rvDomUtil = new RVDomUtil(data)
        this.observeMap = new Map()
        console.log(`observeMap:${JSON.stringify(this.observeMap)}`)
        this.watchObj = watch
        this.applyTruthFulData()

    }
    applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this.dom)
    }
    run() {
        this.componentRun.call(this)
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