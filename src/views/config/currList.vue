<!-- orderList -->
<style lang="scss" scoped>
.currency-list-container {
  width: 60%;
  margin: 20px;
  .btn-container {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="currency-list-container">
    <div class="btn-container">
      <el-button @click="handleAddClick" type="primary">新增</el-button>
    </div>
    
    <el-table highlight-current-row header-align="center" align="center" :data="currencyList" border style="width: 100%">
      <el-table-column :width="150" prop="curr" label="支持币种">
      </el-table-column>
      <el-table-column :width="150" prop="rate" label="质押率">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="()=>$router.push('/order/orderInfo/'+scope.row.OrdertNo)" size="mini" type="default">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增币种" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="币种" >
          <el-input v-model="form.curr" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="质押率">
          <el-input v-model="form.rate" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
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
      form: {
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
      this.$store.dispatch('saveCurrency')
      this.dialogFormVisible = false
    },
  },

  mounted() {
    this.initData()
  },
}
</script>
<style lang="scss" scoped>
</style>
