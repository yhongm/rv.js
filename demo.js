// import RV from './src/rv/main'
import RV from './src/rv/main'

let rv



let myData = {
    parent: "parent",
    child: "child",
    pcolor: "red",
    c1color: "blue",
    c2color: "green",
    child2: "child2",
    time: 10000,
    pkey: "dddd",
    componentColor: "red",//用于自定义组件
    componentCotent: "componentCotent 888",//用于自定义组件
    componentValue: "componentValue 888",//用于自定义组件
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
window.RV = RV
window.onload = function () {

    var con = RV.component({ //定义自定义RV组件
        name: "MyComponent",//定义RV组件名字
        template: `
            <div class="aaa" key="aaa"><p key="bbb" class="bbb" style="color:%#pcolor#%" time="%#time#%" componentValue="%#pvalue#%">"%#pcontent#%"</p><div>
        `,//定义RV组件,HTML语法声明组件模板
        style: `
        .aaa {
            background-color: red
        }
        .bbb {
            width: 500px;
            height:200px;
        }
        `,
        //定义RV组件样式表,css语法声明组件样式
        props: {//定义RV组件属性,用于外部设值组件属性
            time: "1000",
            content: "a custom component",
            value: "componentValue"
        },
        data: {//定义RV组件data,data数据变化，自动更新模板内容
            pcontent: "a custom component",
            pcolor: "yellow",
            time: 10000,
            pvalue: "cvalue"

        },

        run() {//定义自定义RV组件运行代码,用于运行RV组件相关JS代码,RV组件启动时启动此方法


            let colors = ['red', 'green', 'blue', 'yellow', 'gray', 'white', 'black']

            setInterval(() => {
                this.data.pcontent = this.props.content
                this.data.time = this.props.time
                this.data.pvalue = this.props.value
                this.data.pcolor = colors[getRandomInt(6)]


            }, 1000)
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

        },
        watch: {
            pcolor() {
                console.log(`pcolorChange,change:`)

            }
        }


    })
    rv = new RV( //创建对象
        {
            el: "#app",
            //el对象挂载的节点s
            data: myData,//数据对象，用于驱动视图更新，数据变化，视图自动更新
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
                         <MyComponent content="%#componentCotent#%"  time="{Math.floor(new Date()/1000)+'_ttt'}" value="%#componentValue#%" key="888"></MyComponent>
                       </div>`
        })
    rv.use(con) //注册自定义RV组件
    rv.run()//启动
    rv.watch("parent", () => {
        alert("parent,change")
    }) //rv.watch("key",callback) 观察data数据对象对应key的数值变化,变化触发callback
    rv.watch("child", () => {
        alert("child,change")
    })
    rv.watch("child2", () => {
        alert("child2,change")
    })
    window.clickDiv = function () {
        rv.data.parent = `click Div time:${new Date() / 1000}` //data变化，视图自动更新
    }

    window.clickP1 = function () {
        rv.data.child = `click p1 time:${new Date() / 1000}` //data变化,视图自动更新
    }

    window.clickP2 = function () {
        rv.data.child2 = `click p2 time:${new Date() / 1000}` //data变化,视图自动更新
    }
    window.rv = rv


}