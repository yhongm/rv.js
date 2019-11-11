import RV from './src/rv.js'

// import RV from './src/rv/main'
let rv


window.clickDiv = function () {
    rv.data.parent = `click Div time:${new Date() / 1000}` //data变化，视图自动更新
}

window.clickP1 = function () {
    rv.data.child = `click p1 time:${new Date() / 1000}` //data变化,视图自动更新
}

window.clickP2 = function () {
    rv.data.child2 = `click p2 time:${new Date() / 1000}` //data变化,视图自动更新
}
let myData = {
    parent: "parent",
    child: "child",
    pcolor: "red",
    c1color: "blue",
    c2color: "green",
    child2: "child2",
    week: [
        {
            id: 11,
            content: "111"
        },
        {
            id: 22,
            content: "222"
        },
        {
            id: 33,
            content: "333"
        },
    ]
}
window.data = myData
window.onload = function () {
    this.console.log("onload")
    rv = new RV( //创建对象
        {
            el: "#app",
            //el对象挂载的节点s
            data: myData,
            template: `<div key="1" style="color:%#pcolor#%,width:100px,height:100px" onclick="clickDiv()">
                         "%#parent#%"
                         <p key="2" style="color:%#c1color#%,width:50px,height:50px" onclick="clickP1()">
                             "%#child#%"
                         </p>
                         <p key="3" style="color:%#c2color#%,width:50px,height:50px" onclick="clickP2()">
                            "%#child2#%"
                         </p>
                         <div key="4">
                            <p key="{%#v.id#%+'_content'}" childDomData="v" for="v _in_ week"  domData="week">"%#v.content#%"</p>
                         </div>
                       </div>`
        })
    rv.watch("parent", () => {
        alert("parent,change")
    }) //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
    rv.watch("child", () => {
        alert("child,change")
    })
    rv.watch("child2", () => {
        alert("child2,change")
    })






}