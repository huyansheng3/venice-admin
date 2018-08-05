import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/login',
  //   component: _import('login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/addAdmin',
  //   component: _import('senior/addAdmin'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      meta: {
        title: '首页',
        icon: 'home'
      },
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'order'
    },
    children: [{
      path: 'orderList',
      name: 'orderList',
      component: _import('order/orderList'),
      meta: {
        title: '订单信息',
        icon: 'table'
      }
    }]
  },
  {
    path: '/config',
    component: Layout,
    name: 'config',
    meta: {
      title: '配置项',
      icon: 'config'
    },
    children: [{
        path: 'currList',
        name: 'currList',
        component: _import('config/currList'),
        meta: {
          title: '支持币种配置',
          icon: 'table'
        }
      },
      {
        path: 'rate',
        name: 'rate',
        component: _import('config/rate'),
        meta: {
          title: '费率配置',
          icon: 'table'
        }
      }
    ]
  },

  // {
  //   path: '/user',
  //   component: Layout,
  //   name: 'user',
  //   meta: {
  //     title: '用户管理',
  //     icon: 'user'
  //   },
  //   children: [{
  //     path: 'userInfo',
  //     name: 'userInfo',
  //     component: _import('user/userInfo'),
  //     meta: {
  //       title: '用户列表',
  //       icon: 'user'
  //     }
  //   }]
  // },
  // {
  //   path: '/shop',
  //   component: Layout,
  //   name: 'shop',
  //   meta: {
  //     title: '店铺管理',
  //     icon: 'store'
  //   },
  //   children: [{
  //     path: 'shopInfo',
  //     name: 'shopInfo',
  //     component: _import('shop/shopInfo'),
  //     meta: {
  //       title: '店铺列表',
  //       icon: 'table'
  //     }
  //   },
  //   {
  //     path: 'addShop',
  //     name: 'addShop',
  //     component: _import('shop/addShop'),
  //     meta: {
  //       title: '新增店铺',
  //       icon: 'add'
  //     }
  //   },
  //   {
  //     path: 'shopCategory/:id',
  //     name: 'shopCategory',
  //     hidden: true,
  //     component: _import('shop/shopCategory'),
  //     meta: {
  //       title: '商品分类管理',
  //       icon: 'add'
  //     }
  //   },
  //   {
  //     path: 'editShop/:id',
  //     name: 'editShop',
  //     hidden: true,
  //     component: _import('shop/editShop'),
  //     meta: {
  //       title: '编辑店铺',
  //       icon: 'edit'
  //     }
  //   }]
  // },
  // {
  //   path: '/goods',
  //   component: Layout,
  //   name: 'goods',
  //   meta: {
  //     title: '商品管理',
  //     icon: 'goods'
  //   },
  //   children: [{
  //     path: 'goodsInfo',
  //     name: 'goodsInfo',
  //     component: _import('goods/goodsInfo'),
  //     meta: {
  //       title: '商品列表',
  //       icon: 'table'
  //     }
  //   }, {
  //     path: 'addGoods/:shopId',
  //     name: 'addGoods',
  //     hidden: true,
  //     component: _import('goods/addGoods'),
  //     meta: {
  //       title: '添加商品',
  //       icon: 'add'
  //     }
  //   }, {
  //     path: 'editGoods/:id',
  //     name: 'editGoods',
  //     hidden: true,
  //     component: _import('goods/editGoods'),
  //     meta: {
  //       title: '编辑商品',
  //       icon: 'user'
  //     }
  //   }, {
  //     path: 'goodsCategory',
  //     name: 'goodsCategory',
  //     component: _import('goods/goodsCategory'),
  //     meta: {
  //       title: '商品分类管理',
  //       icon: 'tree'
  //     }
  //   }]
  // },

  // {
  //   path: '/cms',
  //   component: Layout,
  //   name: 'cms',
  //   meta: {
  //     title: '资讯管理',
  //     icon: 'cms'
  //   },
  //   children: [
  //     {
  //       path: 'articleList',
  //       name: 'articleList',
  //       component: _import('cms/articleList'),
  //       meta: {
  //         title: '文章资讯',
  //         icon: 'table'
  //       }
  //     },{
  //       path: 'addArticle',
  //       name: 'addArticle',
  //       component: _import('cms/addArticle'),
  //       meta: {
  //         title: '添加文章',
  //         icon: 'add'
  //       }
  //     },
  //     {
  //       path: 'editArticle/:id',
  //       name: 'editArticle',
  //       component: _import('cms/editArticle'),
  //       hidden: true,
  //       meta: {
  //         title: '编辑信息',
  //         icon: 'user'
  //       }
  //     },
  //     {
  //       path: 'articleCategory',
  //       name: 'articleCategory',
  //       component: _import('cms/articleCategory'),
  //       meta: {
  //         title: '京东活动分类',
  //         icon: 'tree'
  //       }
  //     },
  //     {
  //       path: 'editArticleCategory/:id',
  //       name: 'editArticleCategory',
  //       component: _import('cms/editArticleCategory'),
  //       hidden: true,
  //       meta: {
  //         title: '编辑信息',
  //         icon: 'user'
  //       }
  //     },
  //     {
  //       path: 'addArticleCategory',
  //       name: 'addArticleCategory',
  //       component: _import('cms/addArticleCategory'),
  //       meta: {
  //         title: '创建活动分类',
  //         icon: 'add'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/senior',
  //   component: Layout,
  //   name: 'senior',
  //   meta: {
  //     title: '高级用户管理',
  //     icon: 'sttings'
  //   },
  //   children: [{
  //       path: 'adminInfo',
  //       name: 'adminInfo',
  //       component: _import('senior/adminInfo'),
  //       meta: {
  //         title: '管理员信息',
  //         icon: 'admin'
  //       }
  //     },
  //     {
  //       path: 'editAdmin/:id',
  //       name: 'editAdmin',
  //       hidden: true,
  //       component: _import('senior/editAdmin'),
  //       meta: {
  //         title: '编辑管理员',
  //         icon: 'user'
  //       }
  //     },
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})