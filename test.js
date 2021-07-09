//实现一个继承
// 原型继承

const { createContext } = require("node:vm");

//写一个订阅模式
class EventEmit {
    constructor () {
        this.eventArr = [];
    }
    add() {
        this.eventArr.push(new Watch());
    }
    notic() {
        const watch = New Watch(() => {});
    }
}

class Watch {
    constructor (cb) {
        this.callback = cb
    }
    update () {
        this.callback()
    }
}

//写一个hooks实现类组件的this.setSate({a:1},cb)


const [a,setA] = useState(initialState)
setA(1)

const [a,setB] = useStateCb();
setB(1,(state)=>{
    console.log(state)
})

//说一下用hooks实现一个小型react-redux思路

创建context; createContext


const context = createContext();

<context.provider value={}>
</context.provider>

context.customer


//给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
//输入: "aba"
//输出: True

//输入: "abca"
//输出: True

//输入: "abcaf"
//输出: false
