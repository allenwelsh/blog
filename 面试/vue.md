# vue 面试总结

1、如果是在自己封装的组件或者是使用一些第三方的 UI 库时，会发现并不起效果，这时就需要用`·.native 修饰符了，如

```
//使用示例：
<el-input
  v-model="inputName"
  placeholder="搜索你的文件"
  @keyup.enter.native="searchFile(params)"
  >
</el-input>

```

知识点：原生事件与自定义事件，对于组件而言，data.on 赋值给 listeners，把 data.nativeOn 赋值给 data.on
data.on 里面存放着的都是原生 dom 事件，组件内部的 listeners 都是用户自定义的事件。
因此，在组件 patch 过程中，创建组件的根节点的时候，就会把 data.on 内部的原生 dom 事件注册在 dom 上。
因此如果在 h5 元素使用 native 如 <button @click.native="handler">，vue 就会报错。这正是因为在这里做了处理，只有占位符 vnode 才可以有 data.nativeOn 的属性。是 h5 标签的节点不会调用 createComponent 方法，其 data.on 在创建节点的时候会绑定到节点上。

---

2、vue 的 keep-alive 原理

```
// src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // 先省略...
  }
}

```

1、keep-alive 是抽象组件，abstract: true, // 判断当前组件虚拟 dom 是否渲染成真是 dom 的关键；

2、keep-alive 缓存的是 vnode

3、缓存机制是 LRU

4、从新挂载组件不会触发生命周期

https://www.cnblogs.com/chanwahfung/p/13523396.html
