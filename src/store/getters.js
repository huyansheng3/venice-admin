const getters = {
  /* 公共模块 */
  sidebar: state => state.app.sidebar,
  /* 公共模块 */

  /* 管理员模块 */
  userData: state => state.admin.userData,
  adminData: state => state.admin.adminData,
  /* 管理员模块 */

  /* 用户模块 */
  userListData: state => state.user.userListData,
  /* 用户模块 */

  /* 商品模块 */
  goodsListData: state => state.goods.goodsListData,
  /* 商品模块 */

  /* 订单 */
  orderListData: state => state.order.orderListData,
  /* 订单 */

  /* 资讯模块 */
  articleListData: state => state.cms.articleListData,
  goodsListData: state => state.cms.goodsListData,
  goodsKillData: state => state.cms.goodsKillData,
  /* 资讯模块 */

  /* 店铺管理 */
  shopData: state => state.shop.shopData
  /* 店铺管理 */
  
}
export default getters
