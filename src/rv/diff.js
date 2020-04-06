import DiffList from "./diff_list"
import Util from "./util"
import {NODE_REPLACE,CHILD_RE_ORDER,NODE_PROPS,NODE_CONTENT} from "./domState"
class Diff {
    /**
     * dom tree diff algorithm object constructor
     * @param {*} oldTree the dom tree for before update 
     * @param {*} newTree the dom tree for after update
     */
    constructor(oldTree, newTree) {
        this.index = 0
        this.oldTree=oldTree
        this.newTree=newTree
        this.patches = {}
    }
    goDiff(){
        this.dfsWalk(this.oldTree, this.newTree, this.index)
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
                type:NODE_REPLACE,
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
        diffList.goDiff()
        let diffs = diffList.getResult()
        newChildren = diffs.child
        if (diffs.moves.length) {
            let reorderPatch = {
                type:CHILD_RE_ORDER,
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
export default Diff;