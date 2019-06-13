import RV from './rv.js'

let rv
window.clickDiv= function () {
    rv.data.parent = `click Div time:${new Date() / 1000}` //data变化，视图自动更新
}

window.clickP1= function () {
    rv.data.child = `click p1 time:${new Date() / 1000}` //data变化,视图自动更新
}

window.clickP2= function () {
    rv.data.child2 = `click p2 time:${new Date() / 1000}` //data变化,视图自动更新
}
window.onload = function () {
    
     rv= new RV( //创建对象
        {
            el: "#app",
            //el对象挂载的节点s
            data: {
                parent: "parent",
                child: "child",
                pcolor: "red",
                c1color: "blue",
                c2color: "green",
                child2: "child2"
            },
            //data为虚拟dom绑定的数据对象，虚拟dom取用数据时使用%##%占位符取用对应数据
            dom: {
                tag: "div",
                //tag为html元素为标签名
                props: {
                    key: "1",
                    style: "color:%#pcolor#%,width:100px,height:100px",
                    onclick: "clickDiv()"
                },
                //props html元素属性,包含key,style以及事件等信息。key为必填，不能重复
                children: ["%#parent#%",
                    //children为子节点数组，可以包含字符串以及虚拟dom。此处"%#parent#%"取用data.parent数据，在渲染前填充子节点为真实数据。data.parent数据变化时自动驱动视图更新
                    {
                        tag: "p",
                        props: {
                            key: "2",
                            style: "color:%#c1color#%,width:50px,height:50px",
                            onclick: "clickP1()"
                        },
                        children: ["%#child#%"]
                    },
                    {
                        tag: "p",
                        props: {
                            key: "3",
                            style: "color:%#c2color#%,width:50px,height:50px",
                            onclick: "clickP2()"
                        },
                        children: ["%#child2#%"]
                    }
                ]
            }
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
