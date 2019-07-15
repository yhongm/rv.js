(function (ROOT) {
    var NODE_REPLACE = 0 //node replace 
    var CHILD_RE_ORDER = 1 //child node re order
    var NODE_PROPS = 2 //prop change 
    var NODE_CONTENT = 3 //content change

    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    function Element(tag, props, children) {
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
    Element.prototype.render = function () {
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
    };

    /**
     * dom tree diff algorithm object constructor
     * @param {*} oldTree the dom tree for before update 
     * @param {*} newTree the dom tree for after update
     */
    function Diff(oldTree, newTree) {
        this.index = 0
        this.patches = {}
        this.dfsWalk(oldTree, newTree, this.index)
    }
    Diff.prototype.dfsWalk = function (oldNode, newNode, index) {
        var currentPatch = []
        if (newNode == null) {

        } else if (Util.isString(oldNode) && Util.isString(newNode)) {
            if (oldNode != newNode) {
                currentPatch.push({
                    type: NODE_CONTENT,
                    content: newNode
                })
            }
        } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
            var propsPatches = this.diffProps(oldNode, newNode)
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
    Diff.prototype.diffProps = function (oldNode, newNode) {

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
    Diff.prototype.diffChildren = function (oldChildren, newChildren, index, currentPatch) {
        var diffList = new DiffList(oldChildren, newChildren)
        var diffs = diffList.getResult()
        newChildren = diffs.child
        if (diffs.moves.length) {
            var reorderPatch = {
                type: CHILD_RE_ORDER,
                moves: diffs.moves
            }
            currentPatch.push(reorderPatch)
        }
        var leftNode = null
        var currentNodeIndex = index
        oldChildren.forEach((child, i) => {
            var newChild = newChildren[i]
            currentNodeIndex = (leftNode && leftNode.count) ?
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1
            this.dfsWalk(child, newChild, currentNodeIndex)
            leftNode = child
        })


    }


    function Patch(node, patches) {
        var walker = {
            index: 0
        }
        this.dfsWalk(node, walker, patches)
    }
    Patch.prototype.dfsWalk = function (node, walker, patches) {
        var currentPatches = patches[walker.index]
        var len = node.childNodes ? node.childNodes.length : 0
        for (let i = 0; i < len; i++) {
            var child = node.childNodes[i]
            walker.index++
            this.dfsWalk(child, walker, patches)
        }
        if (currentPatches) {
            this.applyPatches(node, currentPatches)
        }

    }
    Patch.prototype.applyPatches = function (node, currentPatche) {
        currentPatche.forEach((currentPatch) => {
            switch (currentPatch.type) {
                case NODE_REPLACE:
                    var newNode = Util.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
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
    Patch.prototype.reorderChildren = function (node, moves) {
        var staticNodeList = Util.toArray(node.childNodes)
        var nodeMaps = {}
        staticNodeList.forEach((snode) => {
            if (snode.nodeType === 1) {
                var key = snode.getAttribute('key')
                if (key) {
                    nodeMaps[key] = snode
                }
            }
        })
        moves.forEach((move) => {
            var index = move.index
            if (move.type === 0) {
                if (staticNodeList[index] === node.childNodes[index]) {
                    node.removeChild(node.childNodes[index])
                }
                staticNodeList.splice(index, 1)
            } else if (move.type === 1) {
                var insertNode = nodeMaps[move.item.key] ?
                    nodeMaps(move.item.key).cloneNode(true) :
                    Util.isString(move.item) ? document.createTextNode(move.item) : move.item.render()
                staticNodeList.splice(index, 0, insertNode)
                node.insertBefore(insertNode, node.childNodes[index] || null)
            }
        })

    }
    Patch.prototype.setProps = function (node, props) {
        for (let key in props) {
            if (props[key] === undefined) {
                node.removeAttribute(key)
            } else {
                const value = props[key]
                Util.setAttr(node, key, value)
            }
        }

    }

    function Util() { }
    Util.isString = function (some) {
        return typeof some === 'string'
    }
    Util.toArray = function (list) {
        if (!list) {
            return []
        }
        var array = []
        for (let i = 0; i < list.length; i++) {
            array.push(list[i])
        }
        return array
    }
    Util.isForIn = function (direction) {
        return /^\w* _in_ \w*$/.test(direction)
    }
    Util.isForForIn = function (direction) {
        return /^\w* _in*$/.test(direction)
    }

    Util.isForOrForFor = function (direction) {
        return /^\w* _in_ \w|_in*$/.test(direction)
    }
    Util.isIgnoreChildren = function (node) {
        return node.props && node.props.hasOwnProperty("ignore")
    }
    Util.setAttr = function (node, key, value) {
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
    Util.isPlaceHolder = function (content) {
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
    Util.isDotOperatorExpression = function (content) {
        return /^\w*\.\w*$/.test(content)
    }
    Util.getPlaceHolderValue = function (content) {
        return content.slice(2, -2)
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */
    Util.isOperatorExpression = function (content) {

        if (Util.isString(content)) {
            if (/^\{\w*|\|\%+\}$/.test(content)) {

                return true
            } else {

                return false
            }
        }
        return false
    }
    Util.getOperatorExpression = function (content, data, dataKey) {
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


    /**
     * diff list 
     * @param {*} oldList 
     * @param {*} newList 
     * @param {*} key 
     */
    function DiffList(oldList, newList) {
        let oldListKeyIndex = makeKeyIndex(oldList).keyIndex
        let newListKeyIndex = makeKeyIndex(newList).keyIndex
        this.moveOperator = []
        this.childList = []
        for (let i = 0; i < oldList.length; i++) {
            let oldItem = oldList[i]
            let oItemKey = getKey(oldItem)
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
            let nItemKey = getKey(nItem)
            let cItem = this.tempList[index]
            let cItemKey = getKey(cItem)
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

        function makeKeyIndex(list) {
            var keyIndex = {}
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                let itemKey = getKey(item)
                keyIndex[itemKey] = i
            }
            return {
                keyIndex: keyIndex
            }
        }

        function getKey(item) {
            if (!item) {
                return undefined
            }
            return item["key"]
        }

    }
    DiffList.prototype.removeCopyTempList = function (index) {
        this.tempList.splice(index, 1)
    }
    DiffList.prototype.remove = function (index) {
        this.moveOperator.push({
            index: index,
            type: 0
        })
    }

    DiffList.prototype.insert = function (index, item) {
        this.moveOperator.push({
            index: index,
            item: item,
            type: 1
        })
    }

    DiffList.prototype.getResult = function () {
        return {
            moves: this.moveOperator,
            child: this.childList
        }
    }

    function observe(obj, observeMap, callback) {

        Object.keys(obj).forEach(key => {
            let internalValue = obj[key]
            var observable = new Observable()
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
        var result, oClass = getType(obj);
        if (oClass === "Object") {
            result = {};
        } else if (oClass === "Array") {
            result = [];
        } else {
            return obj;
        }
        for (key in obj) {
            var copy = obj[key];
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
        var d = new Diff(oldTree, newTree)
        return d.patches
    }


    function patch(node, patches) {
        return new Patch(node, patches)
    }

    /**
     * the map object use to save likily (key,value) data
     */
    function Map() {
        this.length = 0;
        this.map = new Object();
    }
    Map.prototype = {

        constructor: this,
        put: function (key, value) {
            if (!(key in this.map)) {
                this.length++;
            }
            this.map[key] = value;
        },
        get: function (key) {
            return (key in this.map) ? this.map[key] : null;
        },
        remove: function (key) {
            if ((key in this.map)) {
                delete this.map[key]
                this.length--;
            }
        },
        size: function () {
            return this.length;
        },
        clear: function () {
            length = 0;
            this.map = new Object();
        }
    }



    function RV(option) {
        const {
            el,
            data,
            dom
        } = option
        var root = Util.isString(el) ? document.querySelector(el) : el
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
    RV.prototype.updatedom = function (dom) {
        let nve = this.getVirtualElement(this.applyTruthfulData(dom))
        window.nve = nve
        window.ve = this.ve
        patch(this.w, diff(this.ve, nve))
        this.ve = nve

    }
    /**
     * the method use to listen the key value change 
     */
    RV.prototype.watch = function (key, callback) {
        this.observeMap.get(key).add(callback)
    }
    /**
     * the method use to get virtual dom 
     */
    RV.prototype.getVirtualElement = function (dom) {
        var children = []
        for (let child in dom.children) {
            var cc = dom.children[child]
            if (cc instanceof Array) {
                cc.forEach(c => {
                    var v = this.getVirtualElement(c)
                    children.push(v)
                })
            } else if (cc instanceof Object) {
                var v = this.getVirtualElement(cc)
                children.push(v)
            } else {
                children.push(cc)
            }
        }

        return h(dom.tag, dom.props, children)
    }
    /**
     * the method  use to replace place holder value by real data
     */
    RV.prototype.applyTruthfulData = function (dom) {

        if ("for" in dom.props) {
            var dataArray = []
            var dataSingle

            if (Util.isForIn) {
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
                    dataArray = this.data[dom.props['for'].split(" _in_ ")[1]]
                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }

            } else {
                throw new Error("the for directive use error")
            }
            var objs = []
            for (var index = 0; i < dataArray.length; i++) {
                var data = dataArray[index]
                var obj = this.vdom2rdom(dom, data, dataSingle, data)

                objs.push(obj)
            }

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

            let obj = this.vdom2rdom(dom, data, childDomDatakey, this.data)

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
    RV.prototype.vdom2rdom = function (dom, data, dataSingle, tdata) {
        var obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        var props = Object.keys(dom.props)
        for (var prop in props) {
            var value = props[prop]
            if (value === "style") {
                var style = dom.props[value]

                if (style.indexOf(",") > -1) {
                    var styles = style.split(",")
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

        for (var child in dom.children) {
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
    /**
     * the method use to handle single style place holder value
     */
    RV.prototype.handleSingleStyle = function (data, style, dataSingle) {
        let newStyle = ''
        if (dataSingle) {
            if (RV.isPlaceHolder(style)) {
                if (RV.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    var key = RV.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    var styleKey = style.split(":")[0]
                    var styleValue = style.split(":")[1]
                    styleValue = data[RV.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {
            console.log("handle single else")
            var styleKey = style.split(":")[0]
            var styleValue = style.split(":")[1]
            if (RV.isPlaceHolder(styleValue)) {

                styleValue = data[RV.getPlaceHolderValue(styleValue)]
                newStyle = styleKey + ":" + styleValue
                console.log("newStyle:" + newStyle)
            } else {
                newStyle = style
                console.log("oldStyle:")
            }
        }
        return newStyle
    }
    /**
     * the method use to  handle multitude style place holder value
     */
    RV.prototype.handleArrayStyle = function (data, styles, dataSingle) {
        var newStyleArray = ""
        for (let style of styles) {

            var newStyle = this.handleSingleStyle(data, style, dataSingle)
            console.log(`array.style:${style},newstyle:${newStyle}`)
            newStyleArray += newStyle + ";"
        }
        return newStyleArray

    }



})(window)
