import YrvUtil from './yrvUtil';

class YrvPatch {
    constructor(context) {
        this.context = context

    }
    setComponentContainer(componentContainer) {
        this.componentContainer = componentContainer
    }
    apply(node, patches) {
        this.node = node
        this.patches = patches
        this.walker = {
            index: 0
        }
        this.dfsWalk(this.node, this.walker, this.patches)
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
                case YrvUtil.NODE_REPLACE:
                    let newNode = YrvUtil.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render(this.componentContainer)
                    node.parentNode.replaceChild(newNode, node)
                    break
                case YrvUtil.CHILD_RE_ORDER:
                    this.reorderChildren(node, currentPatch.moves)
                    break
                case YrvUtil.NODE_PROPS:
                    this.setProps(node, currentPatch.props)
                    break
                case YrvUtil.NODE_CONTENT:
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
        let staticNodeList = YrvUtil.toArray(node.childNodes)
        let nodeMaps = {}
        staticNodeList.forEach((snode) => {
            if (snode.nodeType === 1) { //The read-only Node.nodeType property is an integer that identifies what the node is. It distinguishes different kind of nodes from each other, such as elements, text and comments.nodeType 1 isNode.ELEMENT_NODE	1	An Element node like <p> or <div>.
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
                    YrvUtil.isString(move.item) ? document.createTextNode(move.item) : move.item.render(this.componentContainer)
                staticNodeList.splice(index, 0, insertNode)
                node.insertBefore(insertNode, node.childNodes[index] || null)
            }
        })

    }
    setProps(node, props) {
        if (node) {
            // &&YrvUtil.isHtmlTag(node.tagName.toLocaleLowerCase())
            for (let key in props) {
                if (props[key] === undefined) {
                    node.removeAttribute(key)
                } else {
                    const value = props[key]
                    if (YrvUtil.isString(value)) {
                        YrvUtil.setAttr(node, key, value)
                    }
                }
            }
        }

    }
}
export default YrvPatch;