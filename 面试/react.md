# react 面试总结

1、如何理解 Context，createContext

- Context 和 createContext（16.4）本质是解决属性层层传递问题；
- 很多组件其实就是借助 Context 功能实现的，react-redux、react-router
- Context 存在问题，context 的值有更新时，没办法保证所有子节点一定能更新。因为在老的 Context 中由上而下的“触发链”有可能被 shouldComponentUpdate 打断。
- Context 和 createContext 都是由生产者和消费者组成
- createContext 中的 value 可以是任何对象，可以是函数
- useContext(MyContext) 只允许您阅读上下文并订阅其更改。您仍然需要 <MyContext.Provider> 在树中使用以上内容来为此上下文提供值。

##### Context 使用

- 生产者

依赖 getChildContext 和 childContextTypes

```
var A = React.createClass({

    childContextTypes: {
         fruit: React.PropTypes.string.isRequired
    },

    getChildContext: function() {
         return { fruit: "Banana" };
    },

    render: function() {
         return <B />;
    }
});

```

- 消费者

下级组件都能获取到 this.context

```

var B = React.createClass({

    contextTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div>My name is: {this.context.name}</div>;//this.context
    }
});


```

##### createContext 使用

// 第一步，创建 context

```
const myContext = React.createContext()

```

// 第二步，创建 Provider Component

```
class MyProvider extends Component {
  state = {
    name: "rails365",
    age: 27
  }

  render() {
    return (
      <myContext.Provider value={{ state: this.state }}>
        { this.props.children }
      </myContext.Provider>
    )
  }
}
```

// 第三步，创建 Consumer Component

```
class Person extends Component {
  render() {
    return (
      <div>
        <h1>Person</h1>
        <myContext.Consumer>
          { ({ state }) => <p>My age is { state.age }</p> }
        </myContext.Consumer>
      </div>
    );
  }
}
```

##### createContext 手写实现

原理：本质就是要实现跨过中间 components 的通信，实现的方法就是实现一个发布者、订阅者模式

1. 创建一个 emitter

```
const emitter = {
    listeners:[],
    emit:(value)=>{
        emitter.listeners.forEach(fn => fn(value)); //执行函数
    },
    on:(fn)=>{
        emitter.listeners.push(fn); //将函数存入数字中
    }
}
```

2. 创建 Provider

```
class Provider extend React.PureComponent{
    componentDidUpdate() {
      emitter.emit(this.props.value);
    }
    componentDidMount() {
      emitter.emit(this.props.value);
    }

}

```

3. 创建 Consumer

```
class Consumer extend React.PureComponent{
    constructor(props) {
      super(props);
      this.state = { value: defaultValue };

      emitter.on(value => {
        console.log(value);
        this.setState({ value });
      });
    }

}

```

[createContext 原理](https://zhuanlan.zhihu.com/p/34038469)

#### 虚拟 DOM

- react 为什么要采用虚拟 DOM ？

  - 虚拟 DOM 更加结构化，方便与状态关联
  - 采用虚拟 DOM 方便统一处理 DOM 更新、事件、属性操作等，同时统一做好兼容性
  - 关于性能优化这点，其实虚拟 DOM 本并没没有优化性能，虚拟 DOM 最终也需要更新 dom，但是它帮我们做了很多关于操作 dom 的优化
  - 本质来说它是提升开发效率，是我们开发更关注与业务，而不是 dom 操作

- React 自定义组件为什么要大写？

  - babel 在编译时会判断 JSX 中组件的首字母，当首字母为小写时，其被认定为原生 DOM 标签，createElement 的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件

- react 如何将代码转换成了虚拟 DOM？

  - jsx 文件是 createElement 的语法糖
  - createElement 函数将代码转成虚拟 DOM 结构

#### setState 执行过程

#### 类组件生命周期（16.4）

##### 首次渲染

- constuctor
- ~~componentWillMount~~
- getDerivedStateFromProps
- render
- componentDidMount

##### 更新

- ~~componentWillReceiveProps~~
- ~~componentWillUpdate~~
- getDerivedStateFromProps
- shouldComponentUpdate(不能调用 setState)
- render(不能调用 setState)
- getSnapshotBeforeUpdate(不能调用 setState)
- componentDidUpdate

##### 父子更新

- Parent 组件： getDerivedStateFromProps()
- Parent 组件： shouldComponentUpdate()
- Parent 组件： render()
- Child 组件： getDerivedStateFromProps()
- Child 组件： shouldComponentUpdate()
- Child 组件： render()
- Child 组件： getSnapshotBeforeUpdate()
- Parent 组件： getSnapshotBeforeUpdate()
- Child 组件： componentDidUpdate()
- Parent 组件： componentDidUpdate()

##### getDerivedStateFromProps VS componentWillReceiveProps

- componentWillReceiveProps 作用
  - componentWillReceiveProps 在子组件更新前执行，初始化 render 时不执行,**如果仅子组件 state 改变时是不触发的**
  - 一般用于接收父组件的 props 来更新子组件的 state（派生状态），通过调用 this.setState()来更新你的组件状态，旧的属性还是可以通过 this.props 来获取,这里调用更新状态是安全的，并不会触发额外的 render 调用
  - 处理一些副作用
- componentWillReceiveProps 缺点

  - 父组件每次 render 导致子组件 re-render 的时候执行，就算此时 props 没有发生改变也会导致该方法执行
  - 由于使用副作用可能会产生未知 bug
  - 当外部多个属性在很短的时间间隔之内多次变化，就会导致 componentWillReceiveProps 被多次调用。这个调用并不会被合并，如果这次内容都会触发异步请求，那么可能会导致多个异步请求阻塞，而如果是 getDerivedStateFromProps 这个生命周期函数会在每次调用 render 之前被触发，react setState 操作是会通过 transaction 进行合并的，由此导致的更新过程是 batch 的，而 react 中大部分的更新过程的触发源都是 setState，所以 render 触发的频率并不会非常频繁

- getDerivedStateFromProps(props, state) 作用

  - **会在每次调用 render 方法之前调用**，在 setState() 后会被调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，返回值应用于 state,不通过 setState 队列
  - 是一个静态方法，不能调用组件实例（this）,不能产生副作用，负作用使用 componentDidUpdate
  - 也不是很好用，限制多

- 差异：

  - 调用的时机差别
  - 参数差别
  - 原理差别

- getSnapshotBeforeUpdate

##### 消失的生命周期

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

##### fiber 理解

- react 如果父组件有变化会更新父组件以下的所有组件
- react 之前的更新过程是一次更新完成
- react 更新时 GUI 线程被阻塞，无法刷新，会影响电话，也无法处理事件的回调
- react 更新过程主要分为调和阶段和 commit 阶段，调和阶段主要是 diff 算法
- diff 算法不管如何优化，本身都是需要递归遍历整个 dom 树，而堆栈形式的递归过程中是无法中断的
- fiber 是一种与进程、线程同为程序执行过程或者说是一个调度过程，这个调度过程会把任务分片执行，使得 diff 过程可以分片执行
- 这个调度过程一般由 requestIdleCallback 实现，但是 React 团队 polyfill 了这个 API，使其对比原生的浏览器兼容性更好且拓展了特性
- fiber 的核心是可中断、可回复、优先级
- 在 fiber 下调和过程不再是递归的堆栈遍历，而且链表结构，保证 fiber 调度恢复
- 影响到 will 相关生命周期

[fiber](https://segmentfault.com/a/1190000039189408)
[fiber2](https://segmentfault.com/a/1190000022995622)

##### 事件代理

- 无法实现事件冒泡的
  - mouseleave&mouseenter
  - blur & focus
  - scrool

##### 更新机制

- 执行 setState 时，先将 state 存入**当前** 组件的 state 暂存队列，同时判断**React**是否处于更新周期
- 如果处于更新周期，将该组件加入到更新队列中，如果不处于更新周期，启动更新周期，同时加入更新队列
- 调用 react 批事务机制，遍历待更新组件队列依次执行更新
- 将组件中的 state 暂存队列合并，获取最终 state,同时清空暂存队列
- 执行 render 及 diff
- 执行 commit

[必须要会的 50 个 React 面试题](https://juejin.cn/post/6844903806715559943#heading-43)
[2020 前端 React 面试](https://juejin.cn/post/6844903988073070606)
[2020 前端 React 面试 2](https://juejin.cn/post/6844904093492707336#heading-51)
