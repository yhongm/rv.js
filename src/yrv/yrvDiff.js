import DiffList from "./yrvDiffList"
import YrvUtil from "./yrvUtil"

class YrvDiff {
    constructor(context) {
        this.context = context
    }
    /**
    * dom tree diff algorithm object constructor
    * @param {*} oldYrvElement the dom tree for before update 
    * @param {*} newYrvElement the dom tree for after update
    */
    goDiff(oldYrvElement, newYrvElement) {
        this.index = 0
        this.oldYrvElement = oldYrvElement
        this.newYrvElement = newYrvElement
        this.patches = {}
        this.dfsWalk(this.oldYrvElement, this.newYrvElement, this.index)
    }
    getPatches() {
        return this.patches
    }
    setComponentContainer(componentContainer) {
        this.componentContainer = componentContainer
    }
    dfsWalk(oldYrvElement, newYrvElement, index) {
        this.tempIndex = index
        let currentPatch = []
        if (newYrvElement == null) {

        } else if (YrvUtil.isString(oldYrvElement) && YrvUtil.isString(newYrvElement)) {
            if (oldYrvElement != newYrvElement) {
                currentPatch.push({
                    type: YrvUtil.NODE_CONTENT,
                    content: newYrvElement
                })
            }
        } else if (oldYrvElement.tag === newYrvElement.tag && oldYrvElement.key == newYrvElement.key) {
            let propsPatches = this.diffProps(oldYrvElement, newYrvElement)
            if (propsPatches) {
                currentPatch.push({
                    type: YrvUtil.NODE_PROPS,
                    props: propsPatches
                })
            }
            if (!YrvUtil.isIgnoreChildren(newYrvElement) && !YrvUtil.isIgnoreChildren(oldYrvElement)) {
                this.diffChildren(oldYrvElement, newYrvElement, index, currentPatch)
            }
        } else {
            currentPatch.push({
                type: YrvUtil.NODE_REPLACE,
                node: newYrvElement
            })
        }

        if (currentPatch.length) {
            this.patches[index] = currentPatch
        }
    }
    diffProps(oldYrvElement, newYrvElement) {
        if (oldYrvElement.isComponent && newYrvElement.isComponent) {
            return null
        }
        const oldProps = oldYrvElement.props
        const newProps = newYrvElement.props
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
    diffChildren(oldYrvElement, newYrvElement, index, currentPatch) {
        let oldChildren = oldYrvElement.children
        let newChildren = newYrvElement.children
        let diffList = new DiffList(oldChildren, newChildren)
        diffList.goDiff()
        let diffs = diffList.getResult()
        newChildren = diffs.child

        if (diffs.moves.length) {
            let reorderPatch = {
                type: YrvUtil.CHILD_RE_ORDER,
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
            if(!YrvUtil.isString(child)){
                if(child.isSlot()){
                    currentNodeIndex+=(newYrvElement.count-(newChild.count-2))
                 }
            }    
           
            this.dfsWalk(child, newChild, currentNodeIndex)
            leftNode = child
        })


    }
}
export default YrvDiff;