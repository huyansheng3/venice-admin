<style lang="scss">
.rate-container {
  width: 50%;
  margin: 20px;
}
</style>
<template>
  <div class="rate-container">
    <el-form :model="rate" label-width="100px">
      <el-form-item label="托管费率" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="rate.entrust" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="8"><el-button @click="save('ENTRUST')" type="primary" size="mini">保存</el-button></el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="利率（日）">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="rate.interest" auto-complete="off"></el-input>
          </el-col>
          <el-col :span="8"><el-button @click="save('INTEREST')" type="primary" size="mini">保存</el-button></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  queryEntrustRate,
  queryInterestRate,
  saveRateConfig,
} from '@/api/currency'

export default {
  name: 'Rate',
  data() {
    return {
      rate: {
        interest: '',
        entrust: '',
      },
    }
  },
  methods: {
    save(type) {
      return saveRateConfig({
        type,
        rate: this.rate[type.toLowerCase()],
      }).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success',
        })
      })
    },
  },
  mounted() {
    queryEntrustRate().then(data => {
      this.rate.entrust = data
    })
    queryInterestRate().then(data => {
      this.rate.interest = data
    })
  },
}
</script>

