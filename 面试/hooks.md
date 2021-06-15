# Hooks 总结

##### 1、知识点

- hooks 是在 16.8 正式开放 api
- 尽量减少组件重新 render，render 调和过程是最耗性能的
- hooks 每次 Render 都有自己的 Props 与 State，每次 Render 都有自己的事件处理，每次 Render 都有自己的 Effects
- Capture Value 是 Function Component 特性，而不是 hooks 的
- hook 主要是解决状态缓存和副作用问题

##### 2、为什么要用 hooks

- 解决逻辑复用，当前代码混入一般都是高阶组件
- 更能关注代码分离，相同的业务逻辑能更方便的写在一起，不像之前被各种生命周期破坏
- class 类本身的作用并没有发挥--继承、方法调用（组件绝大部分方法都是内部自己调用）
- 简化代码逻辑，不需要去关注复杂的生命周期，不需要过分关注 this
- 函数式组件本质是一个函数，函数每次执行完成后，内部变量是需要出栈回收掉的（除了闭包），那如何保存之前的状态呢，方法就是 hook
- hooks 本质是一个链表，在每次执行函数组件的时候，会去查询链表赋予变量新的值
- hook 更好造轮子，尤其是与生命周期相关的轮子（1、不用关注生命周期，逻辑能集中，2、方便在组件销毁时移除副作用）

##### 3、react 优化

- 尽量减少组件重新 render，render 调和过程是最耗性能的

##### 4、 useRef

> useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
> useRef 在 react hook 中的作用,它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西，每次 Function Component 重新 render 的时候里面的函数方法、变量都是生成一份新的，旧的变量已经被垃圾回收机制回收掉了，而 useRef 每次返回的都是同一个引用（实际上是 hook 每次重新赋值给它）、

主要用途：

- 作为 DOM 管理，这个时候与 createRef 相同
- 作为一个数据存储，相当于 this

[createRef&useRef](https://codesandbox.io/embed/jovial-yonath-b24vy)

- usePrevious

```
const [count, setCount] = useState(0);
function usePrevious (value){
    let ref = useRef(null);
    useEffect(()=>{
        ref.current = value;
    })
    return ref.current
}
let preValue = usePrevious(count)

```

##### 5、 useCallback

> Returns a memoized callback.

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

官网解释是返回一个缓存回调

##### 6、 useMemo

> Returns a memoized value.

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

官网解释是返回一个缓存值，这个值可以是组件、变量,useCallback 是根据依赖(deps)缓存第一个入参的(callback)。useMemo 是根据依赖(deps)缓存第一个入参(callback)执行后的值，
useMemo 和 useCallback 都是为了减少：

- 减少重新 render 的次数。因为 React 最耗费性能的就是调和过程（reconciliation），只要不 render 就不会触发 reconciliation
- 减少计算量，尤其是耗时的计算

```

function updateCallback(callback, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateMemo(nextCreate, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  const nextValue = nextCreate(); //需要执行返回结果
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

```

[useMemo 与 useCallback 区别](https://juejin.cn/post/6844904001998176263)

##### 7、 useLayoutEffect

useLayoutEffect 与 useEffect 功能 99%差不多，主要差别是：

1. useLayoutEffect 是同步执行，执行过程中会阻止浏览器渲染；
2. useEffect 是异步执行，而且是在浏览器渲染完成后执行；
3. useLayoutEffect 比 useEffect 先执行

即：useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价

使用场景差异：

- useEffect 大部分使用于异步请求，如 api 请求
- useLayoutEffect 用于 dom 操作，解决页面闪烁问题

##### 8、hooks 原理

[原理](https://juejin.cn/post/6944863057000529933)

##### 9、手写 hooks

- 实现 redux

思路：

1. redux 2 大功能，第一是 reducer 的状态维护，第二是实现状态传递
2. 可以使用 useReducer 实现 reducer 状态维护
3. 使用 useContext 实现状态传递

- 实现 reducer==》initState&reducer&action

```
const actionType = {
    INSREMENT: 'INSREMENT',
    DECREMENT: 'DECREMENT',
}


export const add = (value: number) => {
    return {
        type: actionType.INSREMENT,
        payload: value
    }
}

export const dec = (value: number) => {
    return {
        type: actionType.DECREMENT,
        payload: value
    }
}

export const init = {
    count: 0
}

export const reducer = (state: any, action: any,) => {
    switch (action.type) {
        case actionType.INSREMENT:
            return { count: state.count + action.payload };
        case actionType.DECREMENT:
            return { count: state.count - action.payload };
        default:
            throw new Error();
    }

}

```

实现状态传递

```
//Parent.tsx
const  Context = creatContext();//创建一个Context实例

const [state,dispatch] = useReducer(reducer,init)//将dispatch作为值传递下去


<Context.Provider
  value={{
    state,
    dispatch,
  }}
>
  <Child />
</Context.Provider>

//Child.tsx

const context: any = useContext(Context);
return (
  <div>
    <h1>Now: {context.state.count}</h1>
    <button onClick={() => context.dispatch(add(2))}>add 2</button>
  </div>
);

```

- 实现 useState 回调

```
export const useStateCb = (init: any) => {
    const [count, setCount] = useState(init);
    const ref: any = useRef();
    useEffect(() => {
        ref.current && ref.current(count)
    }, [count])

    const mySetCount = (value: any, cb: any) => {
        setCount(value);
        ref.current = cb;
    }
    return [count, mySetCount]
}
```

- 实现 useTitle

```

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  },[])
}
```

- 实现 useSize

```
const getSize = ()=>{
  retutn {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  }
}

export const useSize = (title: string) => {

  const  [size,setSize] = useState(getSize());

  const handleResize = useCallback(()=>{
      setSize(getSize())
  },[])
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return(()=>{
      window.removeEventListener("resize", handleResize);
    })
  },[])
  return size
}


```

- 实现 强制 update， useUpdate

- 实现 useScroll

##### 相关文章

[精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033)

[30 分钟精通 React Hooks](https://juejin.cn/post/6844903709927800846)

[hook 造轮子](https://github.com/ascoders/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)
