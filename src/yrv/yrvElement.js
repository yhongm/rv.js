import YrvUtil from "./yrvUtil"
class YrvElement {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    constructor(tag, props, children, belong) {
        if (!(this instanceof YrvElement)) {
            return new YrvElement(tagName, props, children)
        }
        this.tag = tag
        this.belong = belong
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : undefined
        if (!this.key) {
            throw new Error(`${tag} ... html tag in component ${this.belong} the key is undefined`)
        }
        let count = 0;
        this.children.forEach(child => {
            if (child instanceof YrvElement) {
                count += child.count
            }
            count++
        });
        this.count = count
    }
    /**
     * the method use to virtual dom  rende to real dom
     */
    render() {
        const el = document.createElement(this.tag)
        const props = this.props
        for (const propName in props) {
            if (!YrvUtil.isRvJsProp(propName)) {
                if (YrvUtil.isRvEvent(propName)) {
                    var evantName = propName.slice(3)
                    if (evantName == "watch") {
                        //this prop use to watch element value change in real time and auto to modify data
                        if (el instanceof HTMLInputElement) {
                            el.addEventListener("input", (e) => {
                                YrvUtil.defineRvInnerGlobalValue(YrvUtil.getMethodHashId(`${this.belong}_${props[propName]}value`), el.value, true)
                                eval(`${YrvUtil.invokeGlobalFunName(YrvUtil.generateHashMNameByMName(`${this.belong}_${props[propName]}change`))}()`)
                            })
                        } else {
                            console.log("RV warning:the rv-watch only use in input label")
                        }
                    } else {
                        el.addEventListener(evantName, (e) => {
                            Object.defineProperty(e, "element", {
                                value: el
                            })
                            YrvUtil.defineRvInnerGlobalValue(YrvUtil.getMethodHashId(`${this.belong}_${props[propName]}`), e, true)
                            eval(`${YrvUtil.invokeGlobalFunName(YrvUtil.generateHashMNameByMName(`${this.belong}_${props[propName]}`))}()`)
                        })
                    }

                } else {
                    YrvUtil.setAttr(el, propName, props[propName])
                }

            }
        }

        this.children.forEach(child => {
            const childEl = (child instanceof YrvElement) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
}
export default YrvElement;