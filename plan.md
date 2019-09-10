### node
[x] koa依赖
[x] 自定义渲染模板
[x] server注入state
[x] 缓存相关
[x] 在启动应用前如果要想做额外的操作
[x] 用户可配置，如果已经启动，提示更友好的方案
[x] 静态资源服务
[x] service依赖注入 比如 cookies 一些方法等等
[x] 解析body
[x] 重定向
[x] node层面全局数据注入
[ ] watch 根据内容hash来决定是否更新 https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
[ ] 各种类型的请求处理


### webpack
[x] https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0  webpack 分包
https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
中文分包 https://imweb.io/topic/5b66dd601402769b60847149
[x] 根据入口进行合并打包
[x] hash文件检测注入
[x] 静态资源
[ ] 打包动画
[ ] 打包时间过长
[ ] tree sharking 树抖 webpack自带？写的时候是否需要更换方式

### vue
[x] vue-ssr
[x] 挂载
[x] vue-router，引入的vue版本问题，需要需要编译模板，那么不能只用runtime
[x] 全局数据管理
[x] 双向同构路由，灵活
[x] 服务端自定义hook
[ ] css 相关，比如按需加载 首屏关键帧css读取

### babel
[ ] babel分析 => 优化
[ ] 支持babel配置，自动读取scaffold中的

### 整合
[x] 中间件 
[x] server（服务）
[x] 整合 => hammer为核心 hammer-cli读取hammer相关配置、服务等
[ ] 通用(错误、等等)处理


### 百度
[] nginx转发到node， 待接入的有：Bns，password
[] 百度rpc



#### 参考
[] require 引入 相关知识 [node module文档](https://nodejs.org/docs/latest/api/modules.html#modules_the_module_scope)
[ ] 增加包分析  https://github.com/danvk/source-map-explorer
[ ] jsx中写css的方案  style-component 将样式也变成组件

#### 一些理论