import Util from "./util"
class Element {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    constructor(tag, props, children) {
        if (!(this instanceof Element)) {
            return new Element(tagName, props, children)
        }
        this.tag = tag
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : undefined
        if (!this.key) {
            throw new Error(`${tag} ... html tag the key is undefined`)
        }
        let count = 0;
        this.children.forEach(child => {
            if (child instanceof Element) {
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
            if (!Util.isRvJsProp(propName)) {
                if (Util.isRvEvent(propName)) {
                    var evantName=propName.slice(3)
                    if(evantName=="click"){
                        
                        el.onclick=(e)=>{
                            Object.defineProperty(e,"element",{value:el})
                            Util.defineRvInnerGlobalValue(Util.getMethodHashId(`${props[propName]}`),e,true)
                             eval(`${Util.invokeGlobalFunName(Util.generateHashMNameByMName(props[propName]))}()`)
                        }

                    }

                } else {
                    Util.setAttr(el, propName, props[propName])
                }

            }
        }
            
        this.children.forEach(child => {
            const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
}
export default Element;
