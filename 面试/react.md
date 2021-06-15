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
