# 软件工程化开发项目前端部分

## 项目简介

技术栈:

- [Vue3](https://cn.vuejs.org/): 用于构建用户界面的渐进式框架
- [TypeScript](https://www.typescriptlang.org/): TypeScript是JavaScript的超集，支持类型检查
- [Vite](https://cn.vitejs.dev/): 前端构建工具
- [Element Plus](https://element-plus.org/zh-CN/): 基于 Vue 3.0 的桌面端组件库, 用于快速构建界面
- [Axios](https://www.axios-http.cn/): 用于发送网络请求

## 项目依赖

在Windows环境下开发，以下是开发环境的版本：

- Node.js: 20.12.0
- npm: 10.5.0

执行以下命令来确认你的Node.js和npm版本：

```shell
node -v
npm -v
```

## 项目启动

1. 安装依赖
```shell
npm install
```

这个命令会安装项目所需的所有依赖。

2. 启动项目
```shell
npm run dev
```

这个命令会启动一个热更新的开发服务器, 你可以在浏览器中访问`http://localhost:xxxx`来查看项目, 对于项目的修改会实时更新。

3. 打包项目
```shell
npm run build
```

这个命令会将项目打包到`dist`目录下, 你可以将`dist`目录下的文件部署到服务器上

## 项目结构

```
.
├── public          // 静态资源
├── src
│   ├── assets      // 静态资源
│   ├── components  // 公共组件
│   ├── router      // 路由配置
│   ├── stores      // 状态管理
│   ├── views       // 页面
│   ├── App.vue     // 根组件
|   ├── style.css   // 全局样式
│   └── main.ts     // 入口文件
├── .gitignore
├── index.html      // 入口html
├── package.json    // 依赖配置
└── vite.config.ts  // vite配置
```
