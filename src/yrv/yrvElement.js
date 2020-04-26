import YrvUtil from "./yrvUtil"
class YrvElement {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     * @param {*} belong
     * @param {*} componentUniqueTag
     * @param {*} renderCallback the renderCallback can hook render 
     */
    constructor(tag, props, children, belong, componentUniqueTag, renderCallback) {
        if (!(this instanceof YrvElement)) {
            return new YrvElement(tagName, props, children, belong, componentUniqueTag)
        }
        this.tag = tag
        this.belong = belong
        this.componentUniqueTag = componentUniqueTag
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : undefined
        this.renderCallback = renderCallback
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
        if (this.renderCallback) {
            this.renderCallback(el, props, this.belong, this.componentUniqueTag)
        }
        this._innerHandlerProps(el, props)
        this.children.forEach(child => {
            const childEl = (child instanceof YrvElement) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
    /**
     * this method use to handle props for dom
     * 
     * @param {*} el 
     * @param {*} props 
     */
    _innerHandlerProps(el, props) {
        for (const propName in props) {
            if (!YrvUtil.isRvJsProp(propName)) {
                if (YrvUtil.isRvEvent(propName)) {
                    var evantName = propName.slice(3)
                    if (evantName == "watch") {
                        //this prop use to watch element value change in real time and auto to modify data
                        if (el instanceof HTMLInputElement) {
                            YrvUtil.addElementEventListener(el,"input",(e) => {
                                YrvUtil.createAndSendSimpleRvEvent(YrvUtil.generateHashMNameByMName(`${this.belong}_${this.componentUniqueTag}_${props[propName]}change`), el.value)
                            })
                        } else {
                            console.log("RV warning:the rv-watch only use in input label")
                        }
                      
                    } else {
                        YrvUtil.addElementEventListener(el,evantName,(e) => {
                            Object.defineProperty(e, "element", {
                                value: el
                            })
                            YrvUtil.createAndSendSimpleRvEvent(YrvUtil.generateHashMNameByMName(`${this.belong}_${this.componentUniqueTag}_${props[propName]}`), e)
                        })
                    }

                } else {
                    if(props[propName]!==undefined){
                        YrvUtil.setAttr(el, propName, props[propName])
                    }
                    
                }

            }
        }

    }
}
export default YrvElement;