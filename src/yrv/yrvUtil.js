import YrvObservable from "./yrvObservable"
import YrvMap from "./yrvMap"
/**
 * @author
 * the YruUtil is a common function set
 */
class YrvUtil {

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
    static checkHaveSameValueFromArray(arr) {
        let isSame = false
        for (var i = 0; i < arr.length; i++) {
            if (isSame === true) {
                break
            }
            for (var j = arr.length - 1; j > i; j--) {
                if (arr[i] == arr[j]) {
                    isSame = true
                    break;
                }
            }
        }
        return isSame
    }
    static isHtmlTag(tag) {
        return "img,iframe,embed,object,param,video,audio,source,track,canvas,map,area,svg,math,datails,summary,menuitem,menu,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,table,caption,colgroup,col,tbody,thead,tfoot,tr,td,th,a,em,strong,small,s,cite,q,dfn,abbr,data,time,code,var,samp,kbd,sub,sup,i,b,u,mark,ruby,rt,bdi,bdo,span,br,wbr,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,body,section,nav,article,aside,h1,h2,h3,h4,h5,h6,header,footer,address,main,head,title,base,link,meta,style,script,noscript,template,ins,del,html,div".split(",").includes(tag)
    }
    static loopGet(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] instanceof Array) {
                obj[key].forEach((childObj) => {
                    this.loopGet(childObj)
                })
            } else {
                obj[key]
                //console.log("loopGet,obj[key]:"+obj[key])
            }
        })

    }
    static isRvJsProp(prop) {
        return ["domData", "childDomData", "for", "data"].includes(prop)
    }
    static isRvEvent(direction) {
        return /^rv-\w*$/.test(direction)
    }

    static addElementEventListener(element, event, callback) {
        if (element instanceof HTMLElement) {
            element.addEventListener(event, callback)
        }
    }
    /**
     * generate hash method name by method name
     * by yhongm
     */
    static generateHashMNameByMName(name) {
        return `yrv_${YrvUtil.getHashCode(name)}`
    }
    static getHashCode(str) {
        let hash = 12345678
        for (let i = str.length - 1; i >= 0; i--) {
            hash ^= ((hash << 6) + str.charCodeAt(i) + (hash >> 3));
        }
        let resultHashCode = (hash & 0xffffffff)
        return resultHashCode;
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
            //positive int 
            var reNumber = /^\d+$/
            //negative int 
            var reNeNumber = /^-\d+$/
            //正实数
            var reRealNumber1 = /^[1-9]\d*[.]\d+$/ //非零开头
            var reRealNumber2 = /^0[.]\d+$/ //零开头
            //负实数
            var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/ //非零开头
            var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

            if (reNumber.test(value) || reNeNumber.test(value) ||
                reRealNumber1.test(value) || reRealNumber2.test(value) ||
                reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
                return true
            } else {
                return false
            }
        } else if (typeof (value) === 'number') {
            return true
        } else {
            return false
        }
    }

    static addStyle2Head(styleString, name) {
        let styles = document.getElementsByTagName("style")
        let index = YrvUtil.toArray(styles).findIndex((style) => {
            style.getAttribute("name") === name
        })
        if (index === -1) {
            let style = document.createElement("style");
            style.type = 'text/css';
            try {
                style.appendChild(document.createTextNode(styleString));
            } catch (error) {
                style.stylesheet.cssText = styleString;
            }
            style.setAttribute("name", name)
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
    static isRvEventProp(content) {
        if (content) {
            return content.startsWith("::")
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
    static getNotUndefinedContent(content) {
        return content === undefined ? "" : content
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */
    static isOperatorExpression(content) {

        if (YrvUtil.isString(content)) {
            if (/^\{\w*|\|\%+\}$/.test(content)) {

                return true
            } else {

                return false
            }
        }
        return false
    }
    static getOperatorExpression(content, data, dataKey, context) {
        if (YrvUtil.isString(content)) {

            var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"))
            let startIndex = expression.indexOf("%#")
            let endIndex = expression.indexOf("#%") + 2
            if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                let placeHolder = expression.slice(startIndex, endIndex)
                var placeHolderValue = YrvUtil.getPlaceHolderValue(placeHolder)
                let realValue
                if (YrvUtil.isDotOperatorExpression(placeHolderValue)) {

                    var placeHolderValueKey = placeHolderValue.split(".")[0]
                    var placeHolderValueValue = placeHolderValue.split(".")[1]

                    let placeHolderVValue = data[placeHolderValueValue]
                    if (placeHolderValueKey in context.componentData) {
                        placeHolderVValue = data[placeHolderValueKey][placeHolderValueValue]
                    } else {
                        if (placeHolderValueKey === dataKey && !dataKey) {
                            placeHolderVValue = data[placeHolderValueValue]
                        }
                    }
                    realValue = YrvUtil.isNumber(placeHolderVValue) ? placeHolderVValue : `"${placeHolderVValue}"` //get real value by PlaceHolder
                } else {
                    realValue = data[YrvUtil.getPlaceHolderValue(placeHolder)] //get real value by PlaceHolder 
                }
                expression = expression.replace(placeHolder, realValue)

            }
            return eval(expression)
        }


    }
    static getObjType(obj) {
        if (obj === null) return "null";
        if (obj === undefined) return "undefined";
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    /**
     * the method use to deep clone obj
     * @param {*} obj 
     */
    static clone(obj) {
        let result, oClass = YrvUtil.getObjType(obj);
        if (oClass === "Object") {
            result = {};
        } else if (oClass === "Array") {
            result = [];
        } else {
            return obj;
        }
        for (let key in obj) {
            let copy = obj[key];
            if (YrvUtil.getObjType(copy) == "Object") {
                result[key] = YrvUtil.clone(copy);
            } else if (YrvUtil.getObjType(copy) == "Array") {
                result[key] = YrvUtil.clone(copy);
            } else {
                result[key] = copy
            }
        }
        return result;
    }
    static cloneObj(origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
    static cloneObj2(obj) {
        return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
    }

    static typeObjOrArray(obj) {
        let oClass = Object.prototype.toString.call(obj).slice(8, -1)
        return oClass == "Object" || oClass == "Array"
    }
    static deepinCloneObj(obj) {
        if (obj) {
            let getType = obj => {
                let oClass = Object.prototype.toString.call(obj).slice(8, -1)
                if (oClass == "Object") {
                    return "obj"
                } else if (oClass == "Array") {
                    return "arr"
                } else {
                    return oClass
                }
            }
            let newObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
            Object.keys(obj).forEach((key) => {
                if (getType(obj[key]) == "obj") {
                    if (key === "componentMap") {
                        let newComponentMap = new YrvMap(obj[key].name + "_clone")
                        obj[key].forEachKV((name, componentQueue) => {
                            let newComponentQueue = []
                            componentQueue.forEach((component) => {
                                let newComponent = component._cloneNew(component.componentkey)
                                newComponent.componentUniqueTag = component.componentUniqueTag + "_c"
                                newComponentQueue.push(newComponent)
                                // component._clearMethods()
                            })

                            newComponentMap.put(name, newComponentQueue)
                        })
                        newObj[key] = newComponentMap
                    } else {
                        newObj[key] = YrvUtil.deepinCloneObj(obj[key])


                    }
                } else if (getType(obj[key]) == "arr") {
                    newObj[key] = YrvUtil.deepinCloneObj(obj[key])
                } else {
                    newObj[key] = obj[key]
                }


            })
            return newObj
        }

    }
    static observe(obj, observeMap, callback) {
        Object.keys(obj).forEach(key => {
            let internalValue = obj[key]
            let observable = new YrvObservable()
            // if (internalValue instanceof Object) {
            //     YrvUtil.observe(internalValue, observeMap, callback)
            // }
            // if (!observeMap.hasKey(key)) {
            observeMap.put(key, observable)
            // }
            if (!observable.has(callback)) {
                observable.add(callback)
            }

            Object.defineProperty(obj, key, {
                get() {
                    // if (!observable.has(callback)) {
                    //     observable.add(callback)
                    // }

                    return internalValue
                },
                set(newVal) {
                    let changed = false
                    if (YrvUtil.typeObjOrArray(newVal)) {
                        changed = YrvUtil.getHashCode(JSON.stringify(internalValue)) !== YrvUtil.getHashCode(JSON.stringify(newVal))
                    } else {
                        changed = internalValue !== newVal
                    }

                    if (changed) {
                        internalValue = newVal

                        observable.invoke()
                    }
                }
            })
        })

    }
    static observeComponent(component, callback) {
        if (component.data) {
            YrvUtil.observe(component.data, component.observeMap, callback)
        }
        if (component.watchObj) {
            Object.keys(component.watchObj).forEach((watchFun) => {
                if ((component.observeMap.hasKey(watchFun))) {
                    component.observeMap.get(watchFun).add(() => {
                        component.watchObj[watchFun]()
                    })
                }
            })
        }
    }
}
YrvUtil.NODE_REPLACE = 0; //node replace 
YrvUtil.CHILD_RE_ORDER = 1; //child node re order
YrvUtil.NODE_PROPS = 2; //prop change 
YrvUtil.NODE_CONTENT = 3; //content change

export default YrvUtil
