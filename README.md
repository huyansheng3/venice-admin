# node-admin-jd


该后台管理系统使用了element-admin构建的高仿京东IOS风格的App大型商城网站,目前基础功能基本完成，后续将会持续更新添加新功能...

该项目是一个后台管理项目。后端api又和管理系统分开使用。api使用了基于node.js的express来做接口的开发。管理系统则使用了element-damin搭建。对应传送门请看下面

__本项目纯属个人瞎弄，正常购买商品请选择京东官方App__

## 对应的项目

- [node-api-jd](https://github.com/Caitingwei/node-api-jd)

- [vue2-jd](https://github.com/Caitingwei/vue2-jd)

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢(~~求求你了~~)

# 演示

[查看demo请戳这里](https://awei.fun/shop/mobile)（请用chrome手机模式预览）

[后台管理系统请戳这里](https://awei.fun/shop/admin)（请用chrome手机模式预览）
`

## 效果展示

- 响应式布局首页
<img  src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/home.png"  />

- 编辑店铺
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/editShop.png"  />

- 添加店铺
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/addShop.png"  />

- 商品列表
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/goodsList.png"  />

- 店铺商品分类
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/shopCagory.png"  />

- 订单页
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/order.png"  />

- 文章列表
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/article.png"  />

- 活动分类
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/goodsCatrgory.png"  />

- 高级用户管理
<img src="https://github.com/Caitingwei/node-admin-jd/raw/master/screenshots/admin.png"  />

## 安装

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本 

```
git clone https://github.com/Caitingwei/node-admin-jd.git

cd node-admin-jd

//这里使用淘宝镜像安装能快一点
npm --registry https://registry.npm.taobao.org install

```
>>>具体使用方法跟Elment-admin一样 可以参考element-admin的官方文档
- [Element-Admin](https://github.com/PanJiaChen/vue-element-admin)

## 运行

### 本地调试模式

```
npm run start

```
### 生产模式(部署)

```
npm run build

```

# 当前实现的功能
>>资讯类
- [x] 获取文章列表
- [x] 获取文章详情
- [x] 获取咨询分类列表
- [x] 获取咨询分类
- [x] 获取推荐信息
- [x] 获取首页全部咨询
>>用户类
- [x] 获取用户信息
- [x] 发送短信验证码
- [x] 注册账号
- [x] 修改用户信息
- [x] 修改/设置密码
- [x] 登录
- [x] 保存地址
- [x] 获取单个地址信息
- [x] 获取地址列表
- [x] 删除地址
- [x] 使用钱包支付订单
- [x] 收藏店铺
- [x] 获取我的收藏店铺
- [x] 添加、删除、修改收货地址
>>商城类
- [x] 获取商品目录信息
- [x] 获取商品列表
- [x] 获取商品详情    
- [x] 搜索商品
- [x] 加入购物车
- [x] 删除选购产品
- [x] 获取选购的产品信息
- [x] 确认选购产品，将作为下单的产品信息
- [x] 获取确认选购的产品信息
- [x] 创建订单 !
- [x] 确认收货
- [x] 取消订单
- [x] 获取订单列表
- [x] 获取订单详情
- [x] 获取店铺信息
- [x] 商品评论列表
- [x] 发布评论

## 相关使用技术链接

- [Element-Admin](https://github.com/PanJiaChen/vue-element-admin)