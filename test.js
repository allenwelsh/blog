//实现一个继承
// 原型继承
function Father(){
    this.print = function(){}
}

function Son(){}

Son.prototype = new Father()

const son = new Son()
son.print()

//写一个订阅模式
class EventEmit{
    constructor(){
        this.event = {}
    }
    on(eventName, callback){
        if(this.event[eventName]){
            this.event[eventName].push(callback)
        }else{
            this.event[eventName] = [callback]
        }
    }
    emit(eventName, ...args){
        if(this.event[eventName]){
            this.event[eventName].forEach(fn=>fn.apply(this, args))
        }
    }
    remove(eventName, callback){
        this.event[eventName] = this.event[eventName].filter(fn=>fn!callback)
    }
}

//写一个hooks实现类组件的this.setSate({a:1},cb)
function useStateHook(obj){
    const [state,setState] = useState();
    const ref = useRef();
    const fn = useCallback(
        (state,cb) => {
            setState(state);
            ref.current = cb;
        },
        [],
    )

    useEffect(()=>{
        ref.current();
    },[state])
    return [state,fn]

}

const [a,setA] = useState();

const [b,setB] = useStateHook();


setA(a);

setB(2,(v)=>{
    console.log(v)
})

//说一下用hooks实现一个小型react-redux思路
<Provider value={store}></Provider>
connect(mapStatetoProps,mapDispatchToProps)()
useReucer()

1.useContext()  context =React.createContext()
2. context.Provider value={store,dispatch}

3. const [storem, dispatch] = useReducer(reducer)
4.[dispatch] useContext(context)


创建context 

//给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
//输入: "aba"
//输出: True

//输入: "abca"
//输出: True

//输入: "abcaf"
//输出: false
