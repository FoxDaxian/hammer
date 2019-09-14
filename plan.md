### node
[x] koa依赖
[x] 中间件 
[x] server（服务）
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
[x] watch 根据内容hash来决定是否更新, 不实用
[ ] 各种类型的请求处理
[ ] 内容pipe输出, 比如post请求，等等


### webpack
[x] https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0  webpack 分包
https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
中文分包 https://imweb.io/topic/5b66dd601402769b60847149
[x] 根据入口进行合并打包
[x] hash文件检测注入
[x] 静态资源
[x] 打包动画
[ ] 开发环境，打包到内存中 一个页面 一个 html 倒是可以，但是vuex数据什么的如何注入呢？
[ ] 浏览器热刷新
[x] externals 可配置，需要自己添加cdn依赖
[ ] 打包时间过长 http://louiszhai.github.io/2019/01/04/webpack4/#%E9%9D%A2%E5%90%91tree-shaking%EF%BC%8C%E7%BA%A6%E6%9D%9F%E7%BC%96%E7%A0%81
[ ] tree sharking 树抖 webpack自带？写的时候是否需要更换方式
[x] 如何增加dll，不重复打包，router vux 啥的 => 采用externals，否则html难维护

### vue
[x] vue-ssr
[x] 挂载
[x] vue-router，引入的vue版本问题，需要需要编译模板，那么不能只用runtime
[x] 全局数据管理
[x] 双向同构路由，灵活
[x] 服务端自定义hook
[ ] css 相关，比如按需加载 首屏关键帧css读取

### babel
[x] babel分析 => 优化
[x] 支持babel配置，自动读取scaffold中的
[x] babel统一依赖

### 整合
[x] hammer get命令
[x] 整合 => hammer为核心 hammer-cli读取hammer相关配置、服务等
[ ] 通用(错误、等等)处理

### 其他
[ ] 提交前的代码统一格式化



#### 参考
[] require 引入 相关知识 [node module文档](https://nodejs.org/docs/latest/api/modules.html#modules_the_module_scope)
[ ] jsx中写css的方案  style-component 将样式也变成组件

#### 一些理论