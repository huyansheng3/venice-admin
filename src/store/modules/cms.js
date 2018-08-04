import {
  getArticleList,
  getArticle,
  createdArticle,
  deleteArticle,
  editArticle,
  getGoodsCategory,
  getGoodsCategoryList,
  createGoodsCategory,
  editGoodsCategory,
  deleteGoodsCategory,
  createdCategoryGoods,
  deleteCategoryGoods,
  getSearchGoodsList
} from '@/api/cms'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const cms = {
  state: {
    articleListData: null,
    goodsListData: null,
    goodsKillData: null
  },
  mutations: {
    SET_ARTICLE_LIST_DATA: (state, articleListData) => {
      state.articleListData = articleListData
    },
    SET_GOODS_LIST_DATA: (state, goodsListData) => {
      state.goodsListData = goodsListData
    },
    SET_GOODS_KILL_LIST_DATA: (state, goodsKillData) => {
      state.goodsKillData = goodsKillData
    }
  },
  actions: {
    CreatedArticle({ commit,state }, formData) { // 创建文章资讯
      return new Promise((resolve, reject) => {
        createdArticle(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteArticle({ commit,state }, formData) { // 删除文章资讯
      return new Promise((resolve, reject) => {
        deleteArticle(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditArticle({ commit,state }, formData) { // 编辑文章资讯
      return new Promise((resolve, reject) => {
        editArticle(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CreateGoodsCategory({ commit,state }, formData) { // 创建秒杀活动资讯
      return new Promise((resolve, reject) => {
        createGoodsCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditGoodsCategory({ commit,state }, formData) { // 编辑秒杀活动资讯
      return new Promise((resolve, reject) => {
        editGoodsCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteGoodsCategory({ commit,state }, formData) { // 删除秒杀活动资讯
      return new Promise((resolve, reject) => {
        deleteGoodsCategory(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetArticleList({ commit,state }, formData) { // 创建某资讯分类
      return new Promise((resolve, reject) => {
        getArticleList(formData).then(response => {
          commit('SET_ARTICLE_LIST_DATA',response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetArticle({ commit,state }, formData) { // 创建某资讯分类
      return new Promise((resolve, reject) => {
        getArticle(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetGoodsCategoryList({ commit,state },formData){ //获取秒杀活动列表
      return new Promise((resolve,reject)=>{
        getGoodsCategoryList(formData).then(response=>{
          commit('SET_GOODS_KILL_LIST_DATA',response)
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    },
    GetGoodsCategory({ commit,state },formData){ //获取秒杀活动
      return new Promise((resolve,reject)=>{
        getGoodsCategory(formData).then(response=>{
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    },
    GetSearchGoodsData({ commit,state },formData){ //获取查询的商品列表
      return new Promise((resolve,reject)=>{
        getSearchGoodsList(formData).then(response=>{
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    },
  }
}



export default cms
