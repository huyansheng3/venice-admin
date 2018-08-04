<!--  -->
<style lang="scss" scoped>
  .goods-container {
    padding: 10px;
  }

</style>
<template>
  <div class="goods-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="image_url" label="商品图片" width="100">
        <template slot-scope="scope">
          <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url" @click="()=>{
            goodsDialog.dialogVisible = true;
            goodsDialog.dialogImageUrl = scope.row.image_url
          }" />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品名称" width="220">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="stocks" label="商品库存" width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="categoryId" label="所属分类" width="80">
      </el-table-column>
      <el-table-column prop="shopId" label="所属店铺" width="80">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/goods/editGoods/'+scope.row.productNo)" size="mini" type="default">编辑</el-button>
          <el-button @click="deleteGoods(scope.row.Id)" size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="goodsDialog.dialogVisible" size="tiny">
      <img width="100%" :src="goodsDialog.dialogImageUrl" alt="">
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
        goodsDialog: { //图片预览
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
        'goodsListData'
      ])
    },

    methods: {
      deleteGoods(Id) {
        this.$confirm('此操作将删除该商品的全部信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('DeleteGoods', {
            Id: Id,
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
        let Data = await this.$store.dispatch('GoodsList', this.dataParams);
        return this.setData(Data);
      },
      async initData() {
        this.fullscreenLoading = true;
        if (!this.goodsListData) return this.updatedData();
        this.setData(this.goodsListData);
      },
      setData(res) {
        this.tableData = [];
        res.Data.map(i => {
          let imgpath = '';
          try {
            imgpath = i.image_url[0].url;
          } catch (err) {
            imgpath = this.img_404;
          }
          this.tableData.push({
            Id: i._id,
            image_url: imgpath,
            categoryId: i.categoryId,
            summary: i.summary,
            productNo: i.productNo,
            productName: i.productName,
            price: i.price,
            stocks: i.stocks,
            createTime: parseTime(i.createTime, '{y}-{m}-{d}'),
            status: i.status === 1 ? '上架中' : '已下架',
            shopId: i.shopId
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
