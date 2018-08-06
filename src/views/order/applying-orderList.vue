<!-- orderList -->
<style lang="scss" scoped>
.orderList-container {
  padding: 10px;

  .pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="orderList-container">

    <el-form ref="form" :inline="true" :model="searchForm" size="small">
      <el-form-item label="用户姓名">
        <el-input v-model="searchForm.userNo" ></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.orderNo"></el-input>
      </el-form-item>

      <el-form-item label="开始日期">
        <el-date-picker
          v-model="searchForm.startApplyDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束日期">
        <el-date-picker
          v-model="searchForm.endApplyDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" :loading="isSearch" @click="onSearch">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table  highlight-current-row header-align="center" align="center" :data="orderList" border style="width: 100%">
      <el-table-column  prop="userNo" label="姓名">
      </el-table-column>
      <el-table-column  prop="orderNo" label="订单编号">
      </el-table-column>
      <el-table-column  prop="pledgeCurr" label="质押币种">
      </el-table-column>
      <el-table-column  prop="pledgeNum" label="质押数量">
      </el-table-column>

      <el-table-column  prop="borrowCurr" label="借贷币种">
      </el-table-column>
      <el-table-column  prop="borrowNum" label="借贷数量">
      </el-table-column>
      <el-table-column  prop="payableAmount" label="等价USDT数量">
      </el-table-column>
      <el-table-column  prop="loanNum" label="实际到账">
      </el-table-column>

      <el-table-column  prop="borrowDays" label="借贷期限">
      </el-table-column>

      <el-table-column  prop="applyDate" label="申请时间">
      </el-table-column>

      <el-table-column  prop="createTime" label="放款时间">
      </el-table-column>

      <el-table-column  prop="status" label="订单状态">
        <template slot-scope="scope">
          {{getStatusText(scope.row.status)}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="checkDetail(scope.row)"  size="mini" type="primary">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :current-page="page.pageNum"
      :total="page.total">
    </el-pagination>

      <el-dialog title="订单详情" width="50%" :visible.sync="dialogVisible">
        <el-row >
          <el-col :span="8">
            质押币种：{{order.pledgeCurr}}
          </el-col>
          <el-col :span="8">
            质押数量：{{order.pledgeNum + order.pledgeCurr}}
          </el-col>
          <el-col :span="8">
            质押率：{{order.mortgageRate}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            借贷币种：{{order.borrowCurr}}
          </el-col>
          <el-col :span="8">
            借贷数量：{{order.borrowNum + order.borrowCurr}}
          </el-col>
          <el-col :span="8">
            等价USDT：{{order.payableAmount}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            借款期限：{{order.borrowDays}}
          </el-col>
          <el-col :span="8">
            托管费用：{{order.entrustNum + order.borrowCurr}}
          </el-col>
          <el-col :span="8">
            实际到账：{{order.loanNum + order.borrowCurr}}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            利息：{{order.payableAmount * order.interestRate}} USDT
          </el-col>
          <el-col :span="8">
            到期应还：{{order.payableAmount}} USDT
          </el-col>
        </el-row>

        <el-row>
          <p>备注信息：
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="order.remark">
            </el-input>
          </p>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="handleReject" size="mini">审核拒绝</el-button>
          <el-button type="success" @click="handleApprove" size="mini">审核通过</el-button>
        </div>
      </el-dialog>


  </div>
</template>

<script>
import { parseTime } from '@/utils'
import {
  queryApproveListByCondition,
  getOrder,
  approveAgree,
  approveReject,
} from '@/api/order'
import { mapGetters } from 'vuex'
import moment from 'moment'

const order = {
  createUser: '',
  updateUser: '',
  id: 1,
  orderNo: '11111_2018080511564105332437',
  userNo: '11111',
  pledgeCurr: 'DDD',
  pledgeNum: 0.00009895,
  borrowCurr: 'ETH',
  borrowNum: 22,
  applyPledgeValue: 0,
  applyBorrowValue: 0,
  loanPledgeValue: 0,
  loanBorrowValue: 0,
  borrowDays: 30,
  applyDate: '2018-08-05 00:00:00',
  loanDate: null,
  entrustNum: 0.2178,
  entrustRate: 0.01,
  loanNum: 21.78,
  status: 'APPLYING',
  interestRate: 0.03,
  deadlineDate: null,
  mortgageRate: 222333,
  payableAmount: 0,
  remark: '',
  realTimeMortgageRate: 0,
}

export const statusMap = {
  LOANING: '放款中',
  APPLYING: '审核中',
  REPAYING: '待还款',
  COMPLETED: '已完成',
  LIQUIDATED: '已平仓',
  OVERDUED: '已逾期',
  FAIL: '放款失败',
}

export default {
  data() {
    return {
      orderList: null,
      order: {},
      page: {
        pageNum: 1,
        pageSize: 10,
        pages: 0,
        total: 0,
      },
      searchForm: {},
      statusMap: statusMap,
      isSearch: false,
      dialogVisible: false,
    }
  },

  watch: {},

  components: {},

  computed: {
    searchCondition() {
      return {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        status: 'APPLYING',
        ...this.searchForm,
        startApplyDate: this.searchForm.startApplyDate
          ? moment(this.searchForm.startApplyDate).format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        endApplyDate: this.searchForm.endApplyDate
          ? moment(this.searchForm.endApplyDate).format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      }
    },
  },

  methods: {
    async queryApproveListByCondition() {
      this.isSearch = true
      const { dataList, ...page } = await queryApproveListByCondition(
        this.searchCondition
      )
      this.isSearch = false
      this.orderList = dataList.map(item => {
        return {
          ...item,

          deadlineDate: item.deadlineDate
            ? moment(item.deadlineDate).format('YYYY-MM-DD HH:mm:ss')
            : null,
          loanDate: item.loanDate
            ? moment(item.loanDate).format('YYYY-MM-DD HH:mm:ss')
            : null,
          applyDate: item.applyDate
            ? moment(item.applyDate).format('YYYY-MM-DD HH:mm:ss')
            : null,
        }
      })
      this.page = page
    },
    getStatusText(status) {
      return statusMap[status] || '待还款'
    },

    onSearch() {
      this.queryApproveListByCondition()
    },
    onReset() {
      this.searchForm = {}
      this.queryApproveListByCondition()
    },
    handleCurrentChange(curr) {
      this.page.pageNum = curr
      this.queryApproveListByCondition()
    },
    checkDetail(order) {
      this.order = order
      this.dialogVisible = true
    },
    handleReject() {
      approveReject(this.order).then(data => {
        this.$message({
          message: '审核拒绝成功',
          type: 'success',
        })
        this.dialogVisible = false
        this.queryApproveListByCondition()
      })
    },
    handleApprove() {
      approveAgree(this.order).then(data => {
        this.$message({
          message: '审核通过成功',
          type: 'success',
        })
        this.dialogVisible = false
        this.queryApproveListByCondition()
      })
    },
  },
  mounted() {
    this.queryApproveListByCondition()
  },
}
</script>
<style lang="scss" scoped>
</style>
