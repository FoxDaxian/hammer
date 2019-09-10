### hammer

##### 基于koa的node中前台ssr方案 - 让rd更关注业务

- 什么是hammer
- 为什么是hammer
- 怎么用hammer

---

### 什么是hammer

- koa
- middleware
- controller
- services
- vue -> current status
- vue-router
- vuex

----

### 为什么是hammer

##### 当前问题

- 目前无开箱即用的工具
- 非业务相关内容占比过多
- ssr提供更快速的响应时间，减轻客户端的压力
- node分散耦合，增加前端广度和深度

---

### 为什么是hammer

##### hammer提供了什么
- 开箱即用的黑箱模型以及更少的依赖
- 无需rd关心非业务问题
- 提供ssr，解放客户端
- 服务依赖注入
- 非常自由的路由控制，可后端控制也可前端spa
- 自定义的node层渲染hooks
- 稳定的静态缓存服务器
- server - client 热刷新
- 高配性：中间件，service，config等
- 等等

---


### 怎么用hammer

1. npm i hammer-cli -g
2. hammer-cli get
3. hammer-cli run --dev --build
4. 编写业务代码
5. hammer-cli build
6. hammer-cli run + pm2
7. 完成部署

---

### 目前的问题

- 由于采用中间件和服务依赖注入，且当前只支持node，对于百度内部非node服务需要定制化。但是之后可一劳永逸
- node运维成本