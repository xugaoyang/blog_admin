##### 参考技术胖react实战教程，作为react练手项目

### 博客后台管理系统


#### 结构目录
```
|-- public
|-- src
|  |-- api
|    |-- index.js // api导出出口
|    |-- base.js  // 接口域名管理
|    |-- ... // 其他模块api接口
|  |-- assets
|    |-- css
|    |-- img
|    |-- libs
|  |-- config
|  |-- pages
|  |-- store // 状态管理库
|  |-- utils // 工具库
|    |-- http.js // axios 封装
|  |-- index.js
|-- .env.dev
|-- .env.production
|-- package.json
```
#### 功能完善：
- [x] 使用three.js美化登陆界面，效果参考iview首页粒子波纹效果
- [x] 登出功能
- [x] bundle分析
- [x] webpack配置（eject||react-app-rewired）
- [ ] eslint + lint-staged + prettier
- [ ] 封装axios
- [ ] 路由标签 react-router
- [x] react-redux(添加redux-persist数据持续)
- [ ] 登陆鉴权(JWT)


##### bundle分析，先构建，再运行分析脚本

```
npm run build
npm run analyze
```