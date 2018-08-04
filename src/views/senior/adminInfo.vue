<!--  -->
<style lang="scss" scoped>
  .table-container {
    padding: 10px;
  }

</style>
<template>
  <div class="table-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="avatar" label="用户头像" width="100">
        <template slot-scope="scope">
          <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.avatar" @click="()=>{
            adminDialog.dialogVisible = true;
            adminDialog.dialogImageUrl = scope.row.avatar
          }" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="permissions" label="权限" width="130">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="220">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/senior/editAdmin/'+scope.row.Id)" size="mini" type="default" v-if="scope.row.roles!=='root'">编辑</el-button>
          <el-button @click="AuthorizedAdmin(scope.row.Id)" v-if="scope.row.status==='未审核'" size="mini" type="primary" plain>审核</el-button>
          <el-button @click="deleteAdmin(scope.row.Id)" v-if="scope.row.roles!=='root'" size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="adminDialog.dialogVisible" size="tiny">
      <img width="100%" :src="adminDialog.dialogImageUrl" alt="">
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
  import { getToken } from '@/utils/auth' // 验权
  export default {
    data() {
      return {
        fullscreenLoading: false,
        tableData: [],
        adminDialog: { //图片预览
          dialogVisible: false,
          dialogImageUrl: '',
        },
      };
    },

    watch: {},

    components: {},

    computed: {
      ...mapGetters([
        'userData',
        'adminData'
      ])
    },

    methods: {
      AuthorizedAdmin(token) {
        this.$confirm('是否要审核该管理员(将获得对应的权限), 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const FromData = {
            rootId: this.userData._id,
            othersId: token,
            status: 1
          }
          this.fullscreenLoading = true;
          this.$store.dispatch('AuthorizedAdmin', FromData).then(response => {
            this.fullscreenLoading = false;
            this.updatedData();
          }, err => {
            this.fullscreenLoading = false
          })
        })
      },
      deleteAdmin(token) {
        this.$confirm('此操作将删除该管理员账户全部信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$store.dispatch('DeleteAdmin', {
            AdminToken: token
          }).then(response => {
            this.fullscreenLoading = false;
            this.updatedData();
          }, err => {
            this.fullscreenLoading = false
          })
        })
      },
      async updatedData() {
        let Data = await this.$store.dispatch('AdminList',{
          AdminToken: getToken()
        });
        return this.setData(Data);
      },
      async initData() {
        this.fullscreenLoading = true;
        if (!this.adminData) return this.updatedData();
        this.setData(this.adminData);
      },
      setData(res) {
        this.tableData = [];
        res.Data.map(i => {
          switch (i.roles) {
            case 'admin':
              i.rolesName = '普通管理员[admin]'
              break;
            case 'root':
              i.rolesName = '超级管理员[root]'
              break;
            case 'test':
              i.rolesName = '测试员[test]'
              break;
            default:
              i.rolesName = '未知[null]'
              break;
          }
          this.tableData.push({
            Id: i._id,
            avatar: i.photo_url,
            name: i.username,
            phone: i.phone || '-',
            roles: i.roles,
            permissions: i.rolesName,
            address: (i.province + i.city + i.area + i.address) || '-',
            createTime: parseTime(i.create_date, '{y}-{m}-{d}'),
            status: i.status === 1 ? '已审核' : '未审核',
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
