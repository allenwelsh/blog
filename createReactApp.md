# react create app

1、使用脚手架初始化项目

```
npx create-react-app my-app --template typescript
```

2、使用 react-app-rewired 修改脚手架默认配置

- 安装：npm i react-app-rewired customize-cra --save-dev

- 在根目录下新建文件 config-overrides.js 文件

```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config
}
```

- 修改 package.json 文件

```
{
  // ...
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  // ...
}
```

3、
