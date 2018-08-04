<!-- userInfo -->
<style lang="scss" scoped>
  .user-container {
    padding: 15px;
  }

</style>
<template>
  <div class="user-container">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column prop="avatar" label="用户头像" width="100">
        <template slot-scope="scope" >
          <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.avatar" @click="()=>{
          userDialog.dialogVisible = true;
          userDialog.dialogImageUrl = scope.row.avatar
          }"
        /> 
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称">
      </el-table-column>
      <el-table-column prop="phone" label="手机">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="validWalletAmount" label="账户余额">
      </el-table-column>
    </el-table>
    <el-pagination @sizeChange="initPageIndex" background style="position:fixed;bottom:20px;left:700px" layout="prev, pager, next"
      :total="dataTotal" :page-size="100">
    </el-pagination>
    <el-dialog :visible.sync="userDialog.dialogVisible" size="tiny">
      <img width="100%" :src="userDialog.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {
    parseTime
  } from '@/utils';
  import {
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        fullscreenLoading: false,
        dataTotal: 10,
        tableData: [],
        userDialog:{ //图片预览
          dialogVisible: false,
          dialogImageUrl: '',
        },
        dataParams: {
          pageIndex: 1,
          pageSize: 10,
        }
      };
    },

    watch: {},

    components: {},

    computed: {
      ...mapGetters([
        'userListData'
      ])
    },

    methods: {
      setData(res) { //设置数据
        this.dataTotal = res.total;
        res.Data.map(i => {
          this.tableData.push({
            Id: i._id,
            avatar: i.photoUrl,
            name: i.username,
            sex: i.Sex === 1 ? '男' : '女',
            phone: i.phone || '-',
            createTime: parseTime(i.createTime, '{y}-{m}-{d}'),
            status: i.status === 1 ? '已审核' : '未审核',
            validWalletAmount: i.validWalletAmount || 0,
            nickName: i.nickName || '-'
          })
        })
      },
      async initData() { //初始化数据
        if (!this.userListData) {
          let Data = await this.$store.dispatch('GetUserList', this.dataParams);
          return this.setData(Data);
        }
        this.setData(this.userListData);
      },
      initPageIndex(page) { //加载分页数据
        console.log(page)
      }
    },
    mounted: function () {
      this.fullscreenLoading = true;
      this.initData();
    }
  }

</script>
<style lang="scss" scoped>


</style>
