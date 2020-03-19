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
    static loopGet(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] instanceof Array) {
                obj[key].forEach((childObj) => {
                    this.loopGet(childObj)
                })
            } else {
                obj[key]
            }
        })

    }
    static isRvJsProp(prop) {
        return ["domData", "childDomData", "for","data"].includes(prop)
    }
    static isRvEvent(direction) {

        return /^rv-\w*$/.test(direction)
    }
    static defineRvInnerGlobalValue(key,value,isCanWrite){
        if(!window.hasOwnProperty("_______js_yhongm_rv____")){
            Object.defineProperty(window,"_______js_yhongm_rv____",{value:{}})
        }
        Object.defineProperty(window["_______js_yhongm_rv____"],key,{value:value,writable:isCanWrite})
    }
    static getRvInnerGlobalValue(key){
        if(!key){
            return undefined
        }
       return window["_______js_yhongm_rv____"][`${key}`]
    }
    static invokeGlobalFunName(name){
        return `window._______js_yhongm_rv____.${name}`
    }
    static createRvEvent(eventName) {
        var event = document.createEvent("Event");
        event.initEvent(eventName, false, true);
        return event
    }
    /**
     * generate hash method name by method name
     * by yhongm
     */
    static generateHashMNameByMName(method){
        return `${Util.getMethodHashId(method)}_${method}`
    }
    static getMethodHashId(name) {
        return `_rv_${Util.getHashCode(name)}`
    }
    static getHashCode(str) {
        str = str.toLowerCase();
        var hash = 1234567890, i, ch;
        for (i = str.length - 1; i >= 0; i--) {
            ch = str.charCodeAt(i);
            hash ^= ((hash << 5) + ch + (hash >> 2));
        }
        return (hash & 0x7FFFFFFF);
    }
    static isForIn(direction) {
        return /^\w* _in_ [\w\.]*$/.test(direction)
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

    static addStyle2Head(styleString) {

        var style = document.getElementsByTagName("style")[0]
        if (style) {
            //style tag exists
            try {
                style.appendChild(document.createTextNode(styleString));
            } catch (error) {
                console.error(`component style,${error}`)
                style.stylesheet.cssText = styleString;

            }
        } else {
            //style tag isn't exits
            style = document.createElement("style");
            style.type = 'text/css';
            var head = document.getElementsByTagName("head")[0]
            head.appendChild(style);
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
    static getNotUndefinedContent(content){
        return content===undefined?"":content
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
    static getOperatorExpression(content, data, dataKey,context) {
        if (Util.isString(content)) {

            var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"))
            let startIndex = expression.indexOf("%#")
            let endIndex = expression.indexOf("#%") + 2
            if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                let placeHolder = expression.slice(startIndex, endIndex)
                var placeHolderValue=Util.getPlaceHolderValue(placeHolder)
                let realValue
                if (Util.isDotOperatorExpression(placeHolderValue)) {
                   
                    var placeHolderValueKey=placeHolderValue.split(".")[0]
                    var placeHolderValueValue=placeHolderValue.split(".")[1]

                    let placeHolderVValue=data[placeHolderValueValue]
                    if(placeHolderValueKey in context.data){
                        placeHolderVValue=data[placeHolderValueKey][placeHolderValueValue]
                    }else{
                        if (placeHolderValueKey === dataKey && !dataKey) {
                            placeHolderVValue = data[placeHolderValueValue]
                        }
                    }
                    realValue = Util.isNumber(placeHolderVValue) ? placeHolderVValue : `"${placeHolderVValue}"`//get real value by PlaceHolder
                } else {
                    realValue = data[Util.getPlaceHolderValue(placeHolder)]//get real value by PlaceHolder 
                }
                expression = expression.replace(placeHolder, realValue)

            }
            return eval(expression)
        }


    }
}

export default Util