<!--  -->
<style lang="scss" scoped>
  .shop-container {
    padding: 10px;
  }

</style>
<template>
  <div class="shop-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="shop_logo" label="店铺LOGO">
        <template slot-scope="scope">
          <img style="width:80px;cursor:pointer;" :src="scope.row.shop_logo" @click="()=>{
              shopDialog.dialogVisible = true;
              shopDialog.dialogImageUrl = scope.row.shop_logo
            }" />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="店铺编号">
      </el-table-column>
      <el-table-column prop="shop_name" label="店铺名称">
      </el-table-column>
      <el-table-column prop="shop_summary" label="店铺简介">
      </el-table-column>
      <el-table-column prop="goods_total_num" label="上架商品数量">
      </el-table-column>
      <el-table-column prop="like_count" label="收藏人数">
      </el-table-column>
      <el-table-column prop="shop_score" label="店铺综合评分">
      </el-table-column>
      <el-table-column prop="shop_create_date" label="创建时间">
      </el-table-column>
      <el-table-column label="操作" width="350px">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/shop/shopCategory/'+scope.row.id)" size="mini" type="primary">分类管理</el-button>
          <el-button @click="()=>$router.push('/goods/addGoods/'+scope.row.id)" size="mini" type="primary">添加商品</el-button>
          <el-button @click="()=>$router.push('/shop/editShop/'+scope.row.id)" size="mini" type="default">编辑</el-button>
          <el-button @click="deleteShop(scope.row.id)" size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="shopDialog.dialogVisible" size="tiny">
      <img width="100%" :src="shopDialog.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {
    parseTime
  } from '@/utils';
  import img_404 from '@/assets/404_images/image404.png';
  import {
    mapGetters
  } from 'vuex';
  import { getToken } from '@/utils/auth' // 验权
  export default {
    data() {
      return {
        fullscreenLoading: false,
        img_404,
        tableData: [],
        shopDialog: { //图片预览
          dialogVisible: false,
          dialogImageUrl: '',
        },
        dataParams: {
          pageIndex: 1,
          pageSize: 100,
        }
      };
    },

    watch: {},

    components: {},

    computed: {
      ...mapGetters([
        'shopData'
      ])
    },

    methods: {
      deleteShop(Id) {
        this.$confirm('此操作将删除该店铺的全部信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('DeleteShop', {
            ShopId: Id,
            AdminToken: getToken()
          }).then(response => {
            this.fullscreenLoading = false;
            this.updatedData();
          }, err => {
            this.fullscreenLoading = false
          })
        })
      },
      async updatedData() {
        let Data = await this.$store.dispatch('GetShopList', this.dataParams);
        return this.setData(Data);
      },
      async initData() {
        this.fullscreenLoading = true;
        if (!this.shopData) return this.updatedData();
        this.setData(this.shopData);
      },
      setData(res) {
        this.tableData = [];
        res.Data.map(i => {
          this.tableData.push({
            id: i.id,
            shop_logo: i.shop_logo[0].url,
            goods_total_num: i.goods_total_num,
            shop_summary: i.shop_summary,
            like_count: i.like_count,
            shop_name: i.shop_name,
            shop_score: parseFloat((i.shop_score.service + i.shop_score.ship) / 3),
            shop_create_date: parseTime(i.shop_create_date, '{y}-{m}-{d}')
          })
        })
        this.fullscreenLoading = false;
      }
    },

    mounted: function () {
      this.initData();
    }
  }

</script>
<style lang="scss" scoped>


</style>
