


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

class Patch {
    constructor(node, patches) {
        let walker = {
            index: 0
        }
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
        })
    }
    reorderChildren(node, moves) {
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
    static isNumber(value) {
        if (value === undefined || value === null || value === '') {
            return false
        }

        if (typeof (value) === 'string') {
            //正整数
            var reNumber = /^\d+$/
            //负整数
            var reNeNumber = /^-\d+$/
            //正实数
            var reRealNumber1 = /^[1-9]\d*[.]\d+$/  //非零开头
            var reRealNumber2 = /^0[.]\d+$/ //零开头
            //负实数
            var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/  //非零开头
            var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

            if (reNumber.test(value) || reNeNumber.test(value)
                || reRealNumber1.test(value) || reRealNumber2.test(value)
                || reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
                return true
            }
            else {
                return false
            }
        }
        else if (typeof (value) === 'number') {
            return true
        }
        else {
            return false
        }
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
    static isPlaceHolder(content) {
        if (content) {
            if (/^%#\w*.\w*#%$/.test(content)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    static isDotOperatorExpression(content) {
        return /^\w*\.\w*$/.test(content)
    }
    static getPlaceHolderValue(content) {
        return content.slice(2, -2)
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */
    static isOperatorExpression(content) {

        if (Util.isString(content)) {
            if (/^\{\w*|\|\%+\}$/.test(content)) {

                return true
            } else {

                return false
            }
        }
        return false
    }
    static getOperatorExpression(content, data, dataKey) {
        if (Util.isString(content)) {

            var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"))
            let startIndex = expression.indexOf("%#")
            let endIndex = expression.indexOf("#%") + 2
            if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                let placeHolder = expression.slice(startIndex, endIndex)
                let realValue
                if (placeHolder.indexOf(".") > 0) {
                    if (Util.getPlaceHolderValue(placeHolder).split(".")[0] === dataKey) {
                        let placeHolderValue = data[Util.getPlaceHolderValue(placeHolder).split(".")[1]]
                        realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : `"${placeHolderValue}"`//通过placeHolder取真实的值

                    }


                } else {
                    realValue = data[Util.getPlaceHolderValue(placeHolder)]//通过placeHolder取真实的值
                }

                expression = expression.replace(placeHolder, realValue)

            }
            return eval(expression)
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
        if (internalValue instanceof Object) {
            observe(internalValue, observeMap, callback)
        }
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


class Observable {
    constructor() {
        this.updateFunctions = new Set()
    }
    add(observableUpdate) {
        this.updateFunctions.add(observableUpdate)
    }
    invoke() {
        this.updateFunctions.forEach(fun => fun())
    }
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


function h(tagName, props, children) {
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
class Map {
    constructor() {
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
    hasKey(key) {
        return (key in this.map)
    }
    forEach(callback) {
        Object.keys(this.map).forEach(mapKey => {
            callback(this.map[mapKey])
        })
    }
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}
/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
class YhmParse {
    constructor() {
        this.componetMap = new Map()
        this.mIndex = 0
        this.mMap = new Map()
        this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
        this.mHandler = {
            startELement: function (tagName, prop, content, that) {
                that.mIndex += 1
                if (that.componetMap.hasKey(tagName)) {
                    //已经有当前组件的记录，将当前组件插入dom中
                    console.log("con,prop:" + JSON.stringify(that.componetMap.get(tagName).getProp()))
                    console.log("con,dom:" + JSON.stringify(that.componetMap.get(tagName).getDom()))
                    console.log(`tagName:${tagName} ,prop:${JSON.stringify(prop)}`)

                    that.componetMap.get(tagName).apply(prop)
                    that.mMap.put(that.mIndex, that.componetMap.get(tagName).getDom())

                } else {
                    var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false }

                    if (content.length > 0) {

                        obj.children.push(content.trim())
                    }
                    that.mMap.put(that.mIndex, obj)
                }

            },
            endElement: function (that) {
                that.mMap.get(that.mIndex).isClose = true
                if (that.mMap.hasKey((that.mIndex - 1))) {
                    that.mMap.get(that.mIndex - 1).children.push(that.mMap.get(that.mIndex))
                    that.mMap.remove(that.mIndex)
                }
                that.mIndex -= 1
            }


        }

    }
    /**
     * 用于解析自定义组件，按名字索引组件
     * @param {*} rvComponent 
     */
    useCustomComponent(rvComponent) {

        this.componetMap.put(rvComponent.getName(), rvComponent)
    }
    parseHtmlTemplate(html) {
        let startTime = new Date() / 1000
        var index = 0
        while (html) {
            var startTagOpen = html.indexOf('<')
            var startTagClose = html.indexOf('>') || html.indexOf('/>')
            var endTagOpen = html.indexOf('</')
            var endTagClose = html.indexOf('>')
            var startCommentOpen = html.indexOf('<!--')
            var endCommentClose = html.indexOf('-->')
            if (startCommentOpen == 0 && endCommentClose != -1 && endCommentClose > startCommentOpen) {
                index = endCommentClose + 3
                parseComment(html.substring(startCommentOpen + 4, endCommentClose + 3));
                html = html.substring(index)
                continue
            } else if (endTagOpen != -1 && endTagClose != -1 && endTagClose > endTagOpen) {
                index = endTagClose + 1
                _parseEndTag(html.substring(endTagOpen, endTagClose + 1), this)
                html = html.substring(index)
                continue
            } else if (startTagOpen != -1 && startTagClose != -1 && startTagClose > startTagOpen) {
                index = startTagClose + 1
                var content = ""
                if (html.indexOf('<', index) > -1 && html.indexOf('<', index) > startTagClose) {
                    // let contentEndIndex = html.indexOf('</', (index + 1))
                    content = html.substring(index, html.indexOf('<', index)).trim()
                }
                _parseStartTag(html.substring(startTagOpen, startTagClose + 1), content, this)
                html = html.substring(index)
                continue
            }
        }
        let endTime = new Date() / 1000
        console.log(`total parse time:${endTime - startTime}`)



        function _parseStartTag(html, content, that) {
            let startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>')
            var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex)
            var prop = {}
            if (html.indexOf(' ') > -1) {
                var props = html.substring(html.indexOf(' ') + 1, html.indexOf('>'))

                var propsResult = props.match(that.mPropRe)
                for (let i = 0; i < propsResult.length; i++) {
                    var pr = propsResult[i]

                    prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)[0]
                }
            }

            if (that.mHandler) {
                if (/(?<=").*?(?=")/.test(content)) {
                    content = content.match(/(?<=").*?(?=")/)[0]
                }
                that.mHandler.startELement(tagName, prop, content, that)
            }

        }
        function _parseEndTag(html, that) {
            if (that.mHandler) {
                that.mHandler.endElement(that)
            }
        }
        function parseComment(html) {
            // console.log(`parseComment=${html}`)
        }

    }
    getHtmlDom() {
        return this.mMap.get(1)
    }

}
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
        this.watchObj = watch
        this.applyTruthFulData()
    }
    applyTruthFulData() {
        console.log(`before dom:${JSON.stringify(this.rdom)}`)
        this.rdom = this.rvDomUtil.applyTruthfulData(this.dom)
        console.log(`after dom:${JSON.stringify(this.rdom)}`)
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

    getDom() {
        return this.rdom
    }
    getProp() {
        return this.props
    }

}
/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
class RVDomUtil {
    constructor(data) {
        this.data = data
    }

    getVirtualElement(dom) {
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
        if ("for" in dom.props) {
            let dataArray = []
            let dataSingle

            if (Util.isForIn(dom.props['for'])) {
                if ("childDomDatakey" in dom) {
                    dataArray = dom.data
                    dataSingle = dom.childDomDatakey
                } else if ("domDataKey" in dom) {
                    if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                        dataArray = dom.data
                    }
                    dataSingle = dom.props['for'].split(" _in_ ")[0]

                }
                else {
                    dataArray = data[dom.props['for'].split(" _in_ ")[1]]

                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }

            } else {
                throw new Error("the for directive use error")
            }
            let objs = []

            dataArray.forEach(data => {

                let obj = this.vdom2rdom(dom, data, dataSingle, data)

                objs.push(obj)
            }

            )
            return objs
        } else {

            let data
            let childDomDatakey
            if ("data" in dom) {
                data = dom.data
                childDomDatakey = dom.childDomDatakey
            } else {
                data = this.data
                childDomDatakey = undefined
            }

            let obj = this.vdom2rdom(dom, data, childDomDatakey, data)

            return obj
        }
    }
    /**
     * virtual dom 2 real data dom
     * @param {*} dom 
     * @param {*} data 
     * @param {*} dataSingle 
     * @param {*} tdata 
     */
    vdom2rdom(dom, data, dataSingle, tdata) {
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
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
            }
            else {
                if (Util.isPlaceHolder(dom.props[value])) {
                    if (!Util.isDotOperatorExpression(Util.getPlaceHolderValue(dom.props[value]))) {
                        obj.props[value] = tdata[Util.getPlaceHolderValue(dom.props[value])]
                    } else {
                        obj.props[value] = data[Util.getPlaceHolderValue(dom.props[value]).split(".")[1]]
                    }
                } else if (Util.isOperatorExpression(dom.props[value])) {

                    obj.props[value] = Util.getOperatorExpression(dom.props[value], data, dataSingle)
                }
                else {
                    obj.props[value] = dom.props[value]
                }

            }

        }

        for (let child in dom.children) {
            if (Util.isString(dom.children[child])) {
                if (Util.isPlaceHolder(dom.children[child])) {
                    if (Util.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                        obj.children[child] = tdata[Util.getPlaceHolderValue(dom.children[child])]

                    } else {
                        obj.children[child] = data[Util.getPlaceHolderValue(dom.children[child]).split(".")[1]]
                    }

                }
                else {
                    obj.children[child] = dom.children[child]
                }

            } else {
                if (dom.children[child] instanceof Object) {
                    if ("childDomData" in dom.props) {
                        dom.children[child].childDomDatakey = dom.props.childDomData

                        dom.children[child].data = data
                    } else if ("domData" in dom.props) {
                        dom.children[child].domDataKey = dom.props.domData
                        dom.children[child].data = data[child]
                    }

                    dom.children[child].data = data

                }

                obj.children[child] = this.applyTruthfulData(dom.children[child])

            }
        }
        return obj

    }
    handleSingleStyle(data, style, dataSingle) {
        let newStyle = ''
        if (dataSingle) {
            if (Util.isPlaceHolder(style)) {
                if (Util.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = Util.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[Util.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (Util.isPlaceHolder(styleValue)) {
                styleValue = data[Util.getPlaceHolderValue(styleValue)]
                newStyle = styleKey + ":" + styleValue

            } else {
                newStyle = style

            }
        }
        return newStyle
    }
    handleArrayStyle(data, styles, dataSingle) {
        let newStyleArray = ""
        for (let style of styles) {

            let newStyle = this.handleSingleStyle(data, style, dataSingle)
            newStyleArray += newStyle + ";"
        }
        return newStyleArray

    }
}

class RV {
    constructor(option) {
        const {
            el,
            data,
            template
        } = option
        this.el = el
        this.data = data
        this.template = template
        this.observeMap = new Map()
        this.parse = new YhmParse()
        this.rvDomUtil = new RVDomUtil(this.data)


    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    /**
     * run rv
     */
    run() {
        let root = Util.isString(this.el) ? document.querySelector(this.el) : this.el
        let dom = this._getDomTree()

        // this.ve = this.getVirtualElement(this.applyTruthfulData(dom))
        let rvThat = this
        this.parse.componetMap.forEach(function (componet) {


            observe(componet.data, componet.observeMap, () => {

                dom = rvThat._getDomTree()
                rvThat._updatedom(dom)
            })
            Object.keys(componet.watchObj).forEach((watchFun) => {

                if ((componet.observeMap.hasKey(watchFun))) {
                    componet.observeMap.get(watchFun).add(() => {
                        componet.watchObj[watchFun]()
                        componet.applyTruthFulData()
                    })
                }
            })
            componet.run()

        })

        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        this.w = this.ve.render()
        root.appendChild(this.w)

        observe(this.data, this.observeMap, () => {
            this._updatedom(dom)
        })
        this._updatedom(dom)
    }
    _getDomTree() {
        try {
            this.parse.parseHtmlTemplate(this.template.trim())

        } catch (e) {
            console.error(`rv parse e:${e}`)
        }
        return this.parse.getHtmlDom()
    }
    _updatedom(dom) {
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        window.nve = nve
        window.ve = this.ve
        patch(this.w, diff(this.ve, nve))
        this.ve = nve
    }
    watch(key, callback) {
        if (this.observeMap.hasKey(key)) {
            this.observeMap.get(key).add(callback)
        }

    }
    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {

        const { name, template, props, data } = option
        let parse = new YhmParse()
        parse.parseHtmlTemplate(template.trim())

        let dom = parse.getHtmlDom()

        return new RvComponent({ dom: dom, props: props, name: name, data: data, run: option.run, watch: option.watch })
    }

}

export default RV