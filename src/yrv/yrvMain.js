import YrvUtil from "./yrvUtil"

import YrvComponent from "./yrvComponent"

/**
 * @author yhongm
 * the 'RV' class is the 'yrv' framwork main entrance
 */
class RV extends YrvComponent {
    constructor(el, componentParam) {
        super(componentParam)
        this.el = el
    }
    /**
     * run rv
     */
    run(callback) {
        let root = YrvUtil.isString(this.el) ? document.querySelector(this.el) : this.el
        root.appendChild(this._render())
        callback(this)
        this._updatedom()
        this._rv_ev_run()
    }

    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {
        return new Proxy(new YrvComponent(option, false), {
            set: function (obj, prop, value) {
                obj[prop] = value
                return true
            },
            get: function (obj, prop) {
                if (prop === "this") {
                    return obj
                }
                return obj[prop]
            },
            apply: function (target, thisArg, argumentsList) {
                target(argumentsList)
            }
        })

    }

}


export default RV

