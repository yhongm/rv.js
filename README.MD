# rv.js 一个响应式组件化虚拟dom，数据驱动视图更新


## 无任何依赖
## 虚拟dom
## 数据驱动



## 使用方法:
npm install yhongm_rv.js 安装  

"%# #%" 占位符,数据占位符

1. demo及使用说明

```javascript
   
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
    window.data = myData //控制台修改data数据，视图自动刷新内容
       var rv = new RV( //创建对象
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

        //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
        rv.watch("parent", () => { alert("parent,change") })
        
        rv.watch("child", () => { alert("child,change") })
        rv.watch("child2", () => { alert("child2,change") })
    
        function clickDiv() {
            rv.data.parent = `click Div time:${new Date() / 1000}`//点击更新data，视图自动更新
        }
        function clickP1() {
            rv.data.child = `click p1 time:${new Date() / 1000}` //点击更新data变化,视图自动更新
        }
        function clickP2() {
            rv.data.child2 = `click p2 time:${new Date() / 1000}`//点击更新data变化,视图自动更新
        }



```


2. rv.watch(data,callback)观察data属性对象变化,变化后触发callback
3. el挂载对象节点选择器
4. data数据对象,虚拟dom中使用%##%访问data中数据



# [DEMO](https://github.com/yhongm/rvDemo)
