# rv.js 一个响应式虚拟dom，数据驱动视图更新


## 无任何依赖
## 虚拟dom
## 数据驱动



## 使用方法:
npm install yhongm_rv.js 安装  


1. demo及使用说明
```javascript
   

   var rv = new RV(  //创建对象
            {
                el: "#app",
                //el对象挂载的节点
                data: { parent: "parent", child: "child", pcolor: "red", c1color: "blue", c2color:"green",child2: "child2" },
                //data为虚拟dom绑定的数据对象，虚拟dom取用数据时使用%##%占位符取用对应数据
                dom: {
                    tag: "div",
		    //tag为html元素为标签名
                    props: { key: 1, style: "color:%#pcolor#%,width:100px,height:100px", onclick:"clickDiv()" },
                    //props html元素属性,包含key,style以及事件等信息。key为必填，不能重复
                    children: ["%#parent#%",
			//children为子节点数组，可以包含字符串以及虚拟dom。此处"%#parent#%"取用data.parent数据，在渲染前填充子节点为真实数据。data.parent数据变化时自动驱动视图更新
                        { tag: "p", props: { key: 2, style: "color:%#c1color#%,width:50px,height:50px" ,onclick:"clickP1()"}, children: ["%#child#%"] },
                        { tag: "p", props: { key: 3, style: "color:%#c2color#%,width:50px,height:50px" ,onclick:"clickP2()"}, children: ["%#child2#%"] }
                    ]
                }
            })

        
        rv.watch("parent", () => { alert("parent,change") })
        //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
        rv.watch("child", () => { alert("child,change") })
        rv.watch("child2", () => { alert("child2,change") })
    
        function clickDiv() {
            rv.data.parent = `click Div time:${new Date() / 1000}`//data变化，视图自动更新
        }
        function clickP1() {
            rv.data.child = `click p1 time:${new Date() / 1000}` //data变化,视图自动更新
        }
        function clickP2() {
            rv.data.child2 = `click p2 time:${new Date() / 1000}`//data变化,视图自动更新
        }



```
2. for指令:
```
                            {
                        tag: 'td',
                        props: {
                            key: "%#v.id#%",
                            onclick: 'clickDay(this)',
                            style: '%#v.style#%',
                            lable: '%#v.lable#%',
                            onMouseover: 'mouseOver(this);',
                            onMouseOut: 'mouseOut(this);',
                            childDomData:"v",
                            for: 'v _in_ week'
                        },
                        
                        children: [
                            {
                                tag: "p",
                                props:
                                {
                                   key: "{%#v.id#%+'_content'}",
                                   style:"margin-block-start: 0em;margin-block-end: 0em"
                                },
                                children: ["%#v.content#%"]

                            },
                            {
                                tag: "p",
                                props:
                                {
                                   key: "{%#v.id#%+'_lunarInfo'}",
                                   time:"{new Date()}",
                                   style:"margin-block-start: 0em;margin-block-end: 0em"
                                },
                                children: ["%#v.lunarInfo#%"]

                            }
                        ]
                    },
```

3. rv.watch(data,callback)观察data属性对象变化,变化后触发callback
4. el挂载对象节点选择器
5. data数据对象,虚拟dom中使用%##%访问data中数据
6. dom为虚拟dom对象,tag为html标签名称,prop为html属性,children子节点


# [DEMO](https://github.com/yhongm/rvDemo)
