<!-- orderList -->
<style lang="scss" scoped>
  .orderList-container {
    padding: 10px;
  }




</style>
<template>
  <div class="orderList-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column sortable prop="OrdertNo" label="订单号">
      </el-table-column>
      <el-table-column sortable prop="total_fee" label="下单金额">
      </el-table-column>
      <el-table-column sortable prop="createTime" label="下单时间">
      </el-table-column>
      <el-table-column sortable label="状态">
        <template slot-scope="scope">
            <font v-if="scope.row.cancel_status===1">[已取消]</font>
            <font v-if="scope.row.confirm_status===0">[待确认]</font>
            <font v-if="scope.row.finish_status===1">[已完成]</font>
            <font v-if="scope.row.pay_status===1&&scope.row.finish_status===0">[已支付]</font>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/order/orderInfo/'+scope.row.OrdertNo)" size="mini" type="default">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  export default {
    data() {
      return {
        fullscreenLoading: false,
        img_404,
        tableData: [],
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
        'orderListData'
      ])
    },

    methods: {
      async updatedData() {
        let Data = await this.$store.dispatch('GetOrderList', this.dataParams);
        return this.setData(Data);
      },
      async initData() {
        this.fullscreenLoading = true;
        if (!this.orderListData) return this.updatedData();
        this.setData(this.orderListData);
      },
      setData(res) {
        this.tableData = [];
        res.Data.map(i => {
          this.tableData.push({
            Id: i._id,
            OrdertNo: i.orderInfo.OrdertNo || '-',
            total_fee: i.orderInfo.total_fee || 0,
            createTime: parseTime(i.orderInfo.createTime, '{y}-{m}-{d}'),
            cancel_status: i.orderInfo.cancel_status,
            confirm_status: i.orderInfo.confirm_status,
            finish_status: i.orderInfo.finish_status,
            pay_status: i.orderInfo.pay_status,
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
