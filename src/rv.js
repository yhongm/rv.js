
const NODE_REPLACE = 0 //node replace 
const CHILD_RE_ORDER = 1 //child node re order
const NODE_PROPS = 2 //prop change 
const NODE_CONTENT = 3 //content change
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
            throw new Error(`${tag} ... the key is undefined`)
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
            Util.setAttr(el, propName, props[propName])
        }
        this.children.forEach(child => {
            const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
}

class Diff {
    /**
    * dom tree diff algorithm object constructor
    * @param {*} oldTree the dom tree for before update 
    * @param {*} newTree the dom tree for after update
    */
    constructor(oldTree, newTree) {
        this.index = 0
        this.patches = {}
        this.dfsWalk(oldTree, newTree, this.index)
    }
    dfsWalk(oldNode, newNode, index) {
        let currentPatch = []
        if (newNode == null) {

        } else if (Util.isString(oldNode) && Util.isString(newNode)) {
            if (oldNode != newNode) {
                currentPatch.push({
                    type: NODE_CONTENT,
                    content: newNode
                })
            }
        } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
            let propsPatches = this.diffProps(oldNode, newNode)
            if (propsPatches) {
                currentPatch.push({
                    type: NODE_PROPS,
                    props: propsPatches
                })
            }
            if (!Util.isIgnoreChildren(newNode)) {
                this.diffChildren(oldNode.children, newNode.children, index, currentPatch)
            }
        } else {
            currentPatch.push({
                type: NODE_REPLACE,
                node: newNode
            })
        }
        if (currentPatch.length) {
            this.patches[index] = currentPatch
        }
    }
    diffProps(oldNode, newNode) {

        const oldProps = oldNode.props
        const newProps = newNode.props

        const propsPatches = {}
        let isSame = true;
        for (let key in oldProps) {
            if (newProps[key] !== oldProps[key]) {
                isSame = false
                propsPatches[key] = newProps[key]
            }
        }
        for (let key in newProps) {
            if (!oldProps.hasOwnProperty(key)) {
                isSame = false
                propsPatches[key] = newProps[key]
            }
        }
        return isSame ? null : propsPatches

    }
    diffChildren(oldChildren, newChildren, index, currentPatch) {
        let diffList = new DiffList(oldChildren, newChildren)
        let diffs = diffList.getResult()
        newChildren = diffs.child
        if (diffs.moves.length) {
            let reorderPatch = {
                type: CHILD_RE_ORDER,
                moves: diffs.moves
            }
            currentPatch.push(reorderPatch)
        }
        let leftNode = null
        let currentNodeIndex = index
        oldChildren.forEach((child, i) => {
            let newChild = newChildren[i]
            currentNodeIndex = (leftNode && leftNode.count) ?
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1
            this.dfsWalk(child, newChild, currentNodeIndex)
            leftNode = child
        })


    }
}

class Patch{
    constructor(node, patches){
        let walker = {index: 0}
        this.dfsWalk(node, walker, patches)
    }
    dfsWalk(node, walker, patches) {
     let currentPatches = patches[walker.index]
     let len = node.childNodes ? node.childNodes.length : 0
     for (let i = 0; i < len; i++) {
        let child = node.childNodes[i]
        walker.index++
        this.dfsWalk(child, walker, patches)
     }
     if (currentPatches) {
        this.applyPatches(node, currentPatches)
     }

    }
    applyPatches(node, currentPatche) {
    currentPatche.forEach((currentPatch) => {
        switch (currentPatch.type) {
            case NODE_REPLACE:
                let newNode = Util.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break
            case CHILD_RE_ORDER:
                this.reorderChildren(node, currentPatch.moves)
                break
            case NODE_PROPS:
                this.setProps(node, currentPatch.props)
                break
            case NODE_CONTENT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                break

        }
    })}
    reorderChildren (node, moves) {
       let staticNodeList = Util.toArray(node.childNodes)
       let nodeMaps = {}
       staticNodeList.forEach((snode) => {
          if (snode.nodeType === 1) {
            let key = snode.getAttribute('key')
            if (key) {
                nodeMaps[key] = snode
            }
          }
        })
        moves.forEach((move) => {
          let index = move.index
          if (move.type === 0) {
            if (staticNodeList[index] === node.childNodes[index]) {
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
          } else if (move.type === 1) {
            let insertNode = nodeMaps[move.item.key] ?
                nodeMaps(move.item.key).cloneNode(true) :
                Util.isString(move.item) ? document.createTextNode(move.item) : move.item.render()
            staticNodeList.splice(index, 0, insertNode)
            node.insertBefore(insertNode, node.childNodes[index] || null)
          }
        })

    }
    setProps(node, props) {
      for (let key in props) {
        if (props[key] === undefined) {
            node.removeAttribute(key)
        } else {
            const value = props[key]
            Util.setAttr(node, key, value)
        }
    }

    }
}




class Util {
    static isString(some) {
        return typeof some === 'string'
    }
    static toArray(list) {
        if (!list) {
            return []
        }
        let array = []
        for (let i = 0; i < list.length; i++) {
            array.push(list[i])
        }
        return array
    }
    static isForIn(direction) {
        return /^\w* _in_ \w*$/.test(direction)
    }
    static isForForIn(direction) {
        return /^\w* _in*$/.test(direction)
    }

    static isForOrForFor(direction) {
        return /^\w* _in_ \w|_in*$/.test(direction)
    }
    static isIgnoreChildren(node) {
        return node.props && node.props.hasOwnProperty("ignore")
    }
    static setAttr(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value
                break
            case 'value':
                let tagName = node.tagName || ''
                tagName = tagName.toLowerCase()
                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value
                } else {
                    node.setAttribute(key, value)
                }
                break
            default:
                node.setAttribute(key, value)
                break
        }

    }
}


class DiffList {
   /**
   * diff list 
   * @param {*} oldList 
   * @param {*} newList 
   * @param {*} key 
   */
    constructor(oldList, newList) {
        let oldListKeyIndex = this.makeKeyIndex(oldList).keyIndex
        let newListKeyIndex = this.makeKeyIndex(newList).keyIndex
        this.moveOperator = []
        this.childList = []
        for (let i = 0; i < oldList.length; i++) {
            let oldItem = oldList[i]
            let oItemKey = this.getKey(oldItem)
            if (!newListKeyIndex.hasOwnProperty(oItemKey)) {
                this.childList.push(null)
            } else {
                this.childList.push(newList[newListKeyIndex[oItemKey]])
            }
        }
        this.tempList = this.childList.slice(0)
        let i = 0;
        while (i < this.tempList.length) {
            if (this.tempList[i] === null) {
                this.remove(i)
                this.removeCopyTempList(i)
            } else {
                i++
            }
        }
        let index = 0
        for (let i = 0; i < newList.length; i++) {
            let nItem = newList[i]
            let nItemKey = this.getKey(nItem)
            let cItem = this.tempList[index]
            let cItemKey = this.getKey(cItem)
            if (cItem) {
                if (nItemKey != cItemKey) {
                    if (oldListKeyIndex.hasOwnProperty(nItemKey)) {
                        let cNextItemKey = getKey(this.tempList[index + 1])
                        if (nItemKey === cNextItemKey) {
                            this.remove(i)
                            this.removeCopyTempList(index)
                            index++
                        } else {
                            this.insert(i, nItem)
                        }
                    } else {
                        this.insert(i, nItem)
                    }
                } else {
                    index++
                }
            } else {
                this.insert(i, nItem)
            }
        }
        let k = this.tempList.length - index
        while (index++ < this.tempList.length) {
            k--
            this.remove(k + newList.length)
        }

        
    }
    makeKeyIndex(list) {
        let keyIndex = {}
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let itemKey = this.getKey(item)
            keyIndex[itemKey] = i
        }
        return {
            keyIndex: keyIndex
        }
    }

    getKey(item) {
        if (!item) {
            return undefined
        }
        return item["key"]
    }
    removeCopyTempList(index) {
        this.tempList.splice(index, 1)
    }
    remove(index) {
        this.moveOperator.push({
            index: index,
            type: 0
        })
    }

    insert(index, item) {
        this.moveOperator.push({
            index: index,
            item: item,
            type: 1
        })
    }

    getResult() {
        return {
            moves: this.moveOperator,
            child: this.childList
        }
    }
}



function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        let observable = new Observable()
        observeMap.put(key, observable)
        Object.defineProperty(obj, key, {
            get() {
                observable.add(callback)
                return internalValue
            },
            set(newVal) {
                const changed = internalValue !== newVal
                internalValue = newVal
                if (changed) {
                    observable.invoke()
                }
            }
        })
    })
    return obj
}



function Observable() {
    this.updateFunctions = new Set()
}
Observable.prototype.add = function (observableUpdate) {
    this.updateFunctions.add(observableUpdate)
}
Observable.prototype.invoke = function () {
    this.updateFunctions.forEach(fun => fun())
}


/**
 * the method use to deep clone obj
 * @param {*} obj 
 */
function clone(obj) {
    let getType = (o) => {
        if (o === null) return "null";
        if (o === undefined) return "undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }
    let result, oClass = getType(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        let copy = obj[key];
        if (getType(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (getType(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}


function h (tagName, props, children) {
    return new Element(tagName, props, children)
}

function diff(oldTree, newTree) {
    let d = new Diff(oldTree, newTree)
    return d.patches
}


function patch(node, patches) {
    return new Patch(node, patches)
}
/**
 * the map object use to save likily (key,value) data
 */
class Map{
    constructor(){
        this.length = 0;
        this.map = new Object();
    }
    put(key, value) {
        if (!(key in this.map)) {
            this.length++;
        }
        this.map[key] = value;
    }
    get(key) {
        return (key in this.map) ? this.map[key] : null;
    }
    remove(key) {
        if ((key in this.map)) {
            delete this.map[key]
            this.length--;
        }
    }
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}


class RV{
    constructor(option){
      const {el,data,dom} = option
      let root = Util.isString(el) ? document.querySelector(el) : el
      this.data = data
      this.ve = this.getVirtualElement(this.applyTruthfulData(dom))
      this.w = this.ve.render()
      root.appendChild(this.w)
      this.observeMap = new Map()
      observe(this.data, this.observeMap, () => {
        this.updatedom(dom)
      })
      this.updatedom(dom)

    }
    updatedom (dom) {
      let nve = this.getVirtualElement(this.applyTruthfulData(dom))
      window.nve = nve
      window.ve = this.ve
      patch(this.w, diff(this.ve, nve))
         this.ve = nve
      }
    watch (key, callback) {
        this.observeMap.get(key).add(callback)
    }
    getVirtualElement (dom) {
      let children = []
      for (let child in dom.children) {
        let cc = dom.children[child]
        if (cc instanceof Array) {
            cc.forEach(c => {
                let v = this.getVirtualElement(c)
                children.push(v)
            })
        } else if (cc instanceof Object) {
            let v = this.getVirtualElement(cc)
            children.push(v)
        } else {
            children.push(cc)
        }
      }

      return h(dom.tag, dom.props, children)
    }
    applyTruthfulData(dom) {
      if ("for" in dom.props || "for_for" in dom.props) {
        let dataArray = []
        let isForFor = false
        let dataSingle
        if (dom.props['for']) { //add for direction
            if (Util.isForOrForFor(dom.props['for'])) {
                if (dom.forData) {
                    if (Util.isForIn(dom.props['for'])) {
                        throw new Error("plase use _in direction")
                    }
                    dataArray = dom.forData
                    dataSingle = dom.props['for'].split(" _in")[0]
                } else {
                    if (Util.isForForIn(dom.props['for'])) {
                        throw new Error("plase use _in_ direction")
                    }
                    dataArray = this.data[dom.props['for'].split(" _in_ ")[1]]
                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }
            }
        } else if (dom.props['for_for']) { //add for_for direction
            if (Util.isForOrForFor(dom.props['for_for'])) {
                if (Util.isForForIn(dom.props['for_for'])) {
                    throw new Error("plase use _in_ direction")
                }
                isForFor = true
                dataArray = this.data[dom.props['for_for'].split(" _in_ ")[1]]
                dataSingle = dom.props['for_for'].split(" _in_ ")[0]
            } else {}
        } else {
            throw new Error("the for direction use error")
        }
        let objs = []
        dataArray.forEach(data => {
                let obj = {}
                obj.tag = dom.tag
                obj.children = []
                obj.props = {}
                for (let child in dom.children) {
                    if (Util.isString(dom.children[child])) {
                        if (RV.isPlaceHolder(dom.children[child])) {
                            if (RV.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                                obj.children[child] = this.data[RV.getPlaceHolderValue(dom.children[child])]
                            } else {
                                obj.children[child] = data[RV.getPlaceHolderValue(dom.children[child]).split(".")[1]]
                            }
                        } else {
                            obj.children[child] = dom.children[child]
                        }
                    } else {
                        if (isForFor) {
                            dom.children[child].forData = data
                        }
                        obj.children[child] = this.applyTruthfulData(dom.children[child])
                    }
                }

                let props = Object.keys(dom.props)
                for (let prop in props) {
                    let value = props[prop]
                    if (value === "style") {
                        let style = dom.props[value]
                        if (style.indexOf(",") > -1) {
                            let styles = style.split(",")
                            obj.props[value] = this.handleArrayStyle(data, styles, dataSingle)
                        } else {

                            obj.props[value] = this.handleSingleStyle(data, style, dataSingle)
                        }
                    } else {
                        if (RV.isPlaceHolder(dom.props[value])) {
                            if (RV.getPlaceHolderValue(dom.props[value]).indexOf(dataSingle) == -1) {
                                obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])]
                            } else {
                                obj.props[value] = data[RV.getPlaceHolderValue(dom.props[value]).split(".")[1]]

                            }
                        } else {
                            obj.props[value] = dom.props[value]
                        }
                    }

                }
                objs.push(obj)
            }

        )
        return objs
    } else {
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        for (let child in dom.children) {
            if (Util.isString(dom.children[child])) {
                if (RV.isPlaceHolder(dom.children[child])) {
                    obj.children[child] = this.data[RV.getPlaceHolderValue(dom.children[child])]
                } else {
                    obj.children[child] = dom.children[child]
                }
            } else {
                obj.children[child] = this.applyTruthfulData(dom.children[child])

            }
        }

        let props = Object.keys(dom.props)
        for (let prop in props) {
            let value = props[prop]
            if (value === "style") {
                let style = dom.props[value]
                if (style.indexOf(",") > -1) {
                    let styles = style.split(",")
                    obj.props[value] = this.handleArrayStyle(this.data, styles, undefined)
                } else {

                    obj.props[value] = this.handleSingleStyle(this.data, style, undefined)
                }
            } else {
                if (RV.isPlaceHolder(dom.props[value])) {
                    obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])]
                } else {
                    obj.props[value] = dom.props[value]
                }

            }

        }
    
        return obj
     }
   }
   handleSingleStyle (data, style, dataSingle) {
    let newStyle = ''
    if (dataSingle) {
        if (RV.isPlaceHolder(style)) {
            if (RV.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                let key = RV.getPlaceHolderValue(style).split(".")[1]
                newStyle = data[key]
            } else {
                let styleKey = style.split(":")[0]
                let styleValue = style.split(":")[1]
                styleValue = data[RV.getPlaceHolderValue(styleValue)]
                newStyle = styleKey + ":" + styleValue
            }
        } else {
            newStyle = style
        }
    } else {
       
        let styleKey = style.split(":")[0]
        let styleValue = style.split(":")[1]
        if (RV.isPlaceHolder(styleValue)) {

            styleValue = data[RV.getPlaceHolderValue(styleValue)]
            newStyle = styleKey + ":" + styleValue
          
        } else {
            newStyle = style
           
        }
    }
        return newStyle
    }
    handleArrayStyle (data, styles, dataSingle) {
      let newStyleArray = ""
      for (let style of styles) {

        let newStyle = this.handleSingleStyle(data, style, dataSingle)
        newStyleArray += newStyle + ";"
    }
    return newStyleArray

}
  static isPlaceHolder(content) {
    if (content) {
        if (content.startsWith("%#") && content.endsWith("#%")) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
  }

  static getPlaceHolderValue (content) {
    return content.slice(2, -2)
  }

}
export default RV
