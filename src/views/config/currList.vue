<!-- orderList -->
<style lang="scss" scoped>
.currency-list-container {
  width: 50%;
  margin: 20px;
  .btn-container {
    text-align: right;
    margin-bottom: 10px;
  }
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
<template>
  <div class="currency-list-container">
    <div class="btn-container">
      <el-button @click="handleAddClick" size="mini" type="primary">新增</el-button>
    </div>
    
    <el-table :height="580" highlight-current-row header-align="center" align="center" :data="currencyList" border style="width: 100%">
      <el-table-column :width="150" prop="curr" label="支持币种">
      </el-table-column>
      <el-table-column :width="150" prop="rate" label="质押率">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini" type="primary">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" size="mini" type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page="pageNum"
      :total="total">
    </el-pagination>

    <el-dialog title="新增币种" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="currency">
        <el-form-item label="币种" >
          <el-input v-model="currency.curr" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="质押率">
          <el-input v-model="currency.rate" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" size="mini">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { parseTime } from '@/utils'
import img_404 from '@/assets/404_images/image404.png'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'CurrencyList',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      currency: {
        curr: '',
        rate: '',
      },
    }
  },

  watch: {},

  components: {},

  computed: {
    ...mapState({
      currencyList: state => state.currency.currencyList,
      pageNum: state => state.currency.pageNum,
      pageSize: state => state.currency.pageSize,
      total: state => state.currency.total,
      pages: state => state.currency.pages,
    }),
  },

  methods: {
    initData() {
      this.$store.dispatch('getCurrencyList')
    },
    handleAddClick() {
      this.dialogFormVisible = true
    },
    handleConfirm() {
      this.$store.dispatch('saveCurrency', this.currency)
      this.dialogFormVisible = false
      this.currency = {
        curr: '',
        rate: '',
      }
    },
    handleEdit(currency) {
      this.currency = currency
      this.dialogFormVisible = true
    },
    handleDelete(currency) {
      this.$store.dispatch('deleteCurrency', { id: currency.id })
    },
    handleCurrentChange(current) {
      this.$store.commit('setCurrentPage', current)
      this.$store.dispatch('getCurrencyList')
    },
  },

  mounted() {
    console.log(this.$store)
    this.initData()
  },
}
</script>
<style lang="scss" scoped>
</style>
