<!-- goodsKill -->
<style lang="scss" scoped>
  .goodsKill-container {
    padding: 15px;
  }

</style>
<template>
  <div class="goodsKill-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column prop="image_url" label="资讯图片" width="100px">
        <template slot-scope="scope">
          <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url" @click="()=>{
            goodsKillDialog.dialogVisible = true;
            goodsKillDialog.dialogImageUrl = scope.row.image_url
          }" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="资讯类型" width="80">
      </el-table-column>
      <el-table-column prop="summary" label="资讯简介">
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间" sortable>
      </el-table-column>
      <el-table-column prop="start_date" label="开始时间" sortable>
      </el-table-column>
      <el-table-column prop="end_date" label="结束时间" sortable>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/cms/editarticleCategory/'+scope.row.id)" size="mini" type="default">编辑</el-button>
          <el-button @click="deleteGoodsKill(scope.row.id)" size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="goodsKillDialog.dialogVisible" size="tiny">
      <img width="100%" :src="goodsKillDialog.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import img_404 from '@/assets/404_images/image404.png'
  import {
    parseTime
  } from '@/utils'
  import { getToken } from '@/utils/auth' // 验权
  export default {
    data() {
      return {
        img_404,
        fullscreenLoading: false,
        tableData: [],
        goodsKillDialog: { //图片预览
          dialogVisible: false,
          dialogImageUrl: '',
        },
        dataParams: {
          pageIndex: 1,
          pageSize: 100,
          // Type: 'banner'
        }
      };
    },

    watch: {},

    components: {},

    computed: {
      ...mapGetters([
        'goodsKillData'
      ])
    },

    methods: {
      async updatedData() {
        let Data = await this.$store.dispatch('GetGoodsCategoryList', this.dataParams);
        return this.setData(Data);
      },
      async initData() {
        this.fullscreenLoading = true;
        if (!this.goodsKillData) return this.updatedData();
        this.setData(this.goodsKillData);
      },
      deleteGoodsKill(Id) {
        this.$confirm('此操作将删除该文章全部信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('DeleteGoodsCategory', {
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
      async setData(response) {
        this.tableData = [];
        response.Data.map(item => {
          let Img;
          try {
            Img = item.image_url[0].url
          } catch (error) {
            Img = img_404
          }
          this.tableData.push({
            id: item.id,
            type: item.type,
            image_url: Img,
            summary: item.summary,
            create_date: parseTime(item.create_date, '{y}-{m}-{d}'),
            start_date: parseTime(item.start_date, '{y}-{m}-{d}'),
            end_date: parseTime(item.end_date, '{y}-{m}-{d}'),
            status: item.status
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
