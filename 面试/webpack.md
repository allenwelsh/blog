# webpack 面试总结

1、babel 缓存

babel 缓存主要是在二次打包时，打包构建速度更快

```
 {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            ...
        ],
        //开启babelh缓存，第二次构建时，会读取之前的缓存
        cacheDirectory: true
}

```

2、HMR 原理解析

-live reload 工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失， webapck HMR 则不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率

```
HMR作为一个Webpack内置的功能，可以通过HotModuleReplacementPlugin或--hot开启
 devServer: {
    hot: true
}
```

3、提取公共代码

webpack 提供了一个非常好的内置插件帮我们实现这一需求：CommonsChunkPlugin。不过在 webpack4 中 CommonsChunkPlugin 被删除，取而代之的是 optimization.splitChunks, 所幸的是 optimization.splitChunks 更强大！

cacheGroups 是 splitChunks 配置的核心，对代码的拆分规则全在 cacheGroups 缓存组里配置。
缓存组的每一个属性都是一个配置规则，我这里给他的 default 属性进行了配置，属性名可以不叫 default 可以自己定。
属性的值是一个对象，里面放的我们对一个代码拆分规则的描述

```
//webpack.config.js

optimization: {
    splitChunks: {
        cacheGroups: {
            default: {
                name: 'common',
                chunks: 'initial'
            }
        }
    }
}

```
