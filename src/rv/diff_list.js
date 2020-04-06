class DiffList {
    /**
     * diff list 
     * @param {*} oldList 
     * @param {*} newList 
     */
    constructor(oldList, newList) {
        this.oldList=oldList
        this.newList=newList
        this.oldListKeyIndex = this.makeListKeyIndex(this.oldList)
        this.newListKeyIndex = this.makeListKeyIndex(this.newList)
        this.moveOperator = []
        this.childList = []
        this.tempList=[]
    }
    /**
     * this function start diff 
     */
    goDiff(){
        for (let i = 0; i < this.oldList.length; i++) {
            let oldItem = this.oldList[i]
            let oItemKey = this.getKey(oldItem)
            if (!this.newListKeyIndex.hasOwnProperty(oItemKey)) {
                this.childList.push(null)
            } else {
                this.childList.push(this.newList[this.newListKeyIndex[oItemKey]])
            }
        }
        this.tempList = this.childList.concat()//copy the childList to a teml list
        let i = 0;
        while (i < this.tempList.length) {
            if (this.tempList[i] === null) {
                this.removeOperator(i)
                this.removeCopyTempList(i)
            } else {
                i++
            }
        }
        let index = 0
        for (let i = 0; i < this.newList.length; i++) {
            let nItem = this.newList[i]
            let nItemKey = this.getKey(nItem)
            let cItem = this.tempList[index]
            let cItemKey = this.getKey(cItem)
            if (cItem) {
                if (nItemKey != cItemKey) {
                    if (this.oldListKeyIndex.hasOwnProperty(nItemKey)) {
                        let cNextItemKey = getKey(this.tempList[index + 1])
                        if (nItemKey === cNextItemKey) {
                            this.removeOperator(i)
                            this.removeCopyTempList(index)
                            index++
                        } else {
                            this.insertOperator(i, nItem)
                        }
                    } else {
                        this.insertOperator(i, nItem)
                    }
                } else {
                    index++
                }
            } else {
                this.insertOperator(i, nItem)
            }
        }
        let k = this.tempList.length - index
        while (index++ < this.tempList.length) {
            k--
            this.removeOperator(k + this.newList.length)
        }
    }
    makeListKeyIndex(list) {
        let listkeyIndex = {}
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let itemKey = this.getKey(item)
            listkeyIndex[itemKey] = i
        }
        return listkeyIndex
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
    removeOperator(index) {
        this.moveOperator.push({
            index: index,
            type: 0
        })
    }

    insertOperator(index, item) {
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
export default DiffList;
