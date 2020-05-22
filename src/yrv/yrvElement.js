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
    constructor(tag, props, children, belong, componentUniqueTag, uniqueTag, isComponent, renderCallback) {
        this.tag = tag
        this.belong = belong
        this.componentUniqueTag = componentUniqueTag
        this.uniqueTag = uniqueTag
        this.isComponent = isComponent
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : undefined
        this.renderCallback = renderCallback
        if (YrvUtil.isHtmlTag(this.tag) && !this.key) {
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
    render(componentContainer) {
        let el
        if (this.isComponent) {
            el = componentContainer.filter((component) => { return component.componentUniqueTag === this.uniqueTag })[0].component._render()
        } else {
            el = document.createElement(this.tag)
            const props = this.props
            if (this.renderCallback) {
                this.renderCallback(el, props, this.belong, this.componentUniqueTag)
            }
            this._innerHandlerProps(el, props)
        }

        this.children.forEach(child => {
            const childEl = (child instanceof YrvElement) ? child.render(componentContainer) : document.createTextNode(child)
            if (child instanceof YrvElement && child.props && "slot" in child.props) {
                this._handleSlotDom(el, childEl, child.props.slot)
            } else {
                el.appendChild(childEl)
            }

        })
        this._calcCount(componentContainer)
        return el;
    }
    _calcCount(componentContainer) {
        let count = 0;
        if (!this.isComponent) {
            this.children.forEach(child => {
                if (child instanceof YrvElement) {
                    child._calcCount(componentContainer)
                    if (child.isComponent) {
                        let componentTemp = componentContainer.filter((component) => { return component.componentUniqueTag === child.uniqueTag })
                        if (componentTemp.length > 0) {
                            let component = componentTemp[0].component
                            count += component._yrvElement.count
                            child.count = component._yrvElement.count
                        }

                    } else {

                        count += child.count
                     }
                }

                count++
            });
            this.count = count
        } else {
            let componentTemp = componentContainer.filter((component) => { return component.componentUniqueTag === this.uniqueTag })
            if (componentTemp.length > 0) {
                let component = componentTemp[0].component
                 this.count = component._yrvElement.count
            } else {
            }

        }

    }
    _handleSlotDom(node, slotDom, slotPosition) {
        let position = slotPosition
        let positionIndex = -1
        if (position === "default") {
            positionIndex = YrvUtil.toArray(node.childNodes).findIndex((childNode) => {
                if (childNode.tagName !== "SLOT") {
                    this._handleSlotDom(childNode, slotDom, slotPosition)
                }
                return childNode.tagName == "SLOT"
            })

        } else {
            positionIndex = YrvUtil.toArray(node.childNodes).findIndex((childNode) => {
                if (childNode.tagName !== "SLOT") {
                    this._handleSlotDom(childNode, slotDom, slotPosition)
                }
                return childNode.tagName == "SLOT" && childNode.getAttribute("name") === position
            })
        }
        if (positionIndex > -1) {

            node.replaceChild(slotDom, node.childNodes[positionIndex])
        }

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
                            YrvUtil.addElementEventListener(el, "input", (e) => {
                                YrvUtil.createAndSendSimpleRvEvent(YrvUtil.generateHashMNameByMName(`${this.belong}_${this.componentUniqueTag}_${props[propName]}change`), el.value)
                            })
                        } else {
                            console.log("RV warning:the rv-watch only use in input label")
                        }

                    } else {
                        YrvUtil.addElementEventListener(el, evantName, (e) => {
                            Object.defineProperty(e, "element", {
                                value: el
                            })
                            YrvUtil.createAndSendSimpleRvEvent(YrvUtil.generateHashMNameByMName(`${this.belong}_${this.componentUniqueTag}_${props[propName]}`), e)
                        })
                    }

                } else {
                    if (props[propName] !== undefined) {
                        YrvUtil.setAttr(el, propName, props[propName])
                    }

                }

            }
        }

    }
}
export default YrvElement;