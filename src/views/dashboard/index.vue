<style lang="scss" scoped>
  #main {
    width: 100%;
    height: 550px;
  }
</style>
<template>
  <div class="dashboard-container">
    <div id="main"></div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Echarts from 'echarts';
  export default {
    name: 'dashboard',
    data() {
      return {
        statisData: {}
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    methods: {
      async initEcharts() {
        var myChart = Echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '月流量统计',
            subtext: `访问总数：${this.statisData.VisitsDailyTotalCount}  接口调用总数：${this.statisData.ApiDailyTotalCount}`
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
          },
          legend: {
            data: ['新增用户', '新增管理员', '新增店铺', '新增订单', '用户访问量','接口调用次数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.statisData.MonthTotalData
          },
          yAxis: {
            type: 'value'
          },     
          series: [{
              name: '新增用户',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.UserDailyData
            },
            {
              name: '新增管理员',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.AdminDailyData
            },
            {
              name: '新增店铺',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.ShopDailyData
            },
            {
              name: '新增订单',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.OrderDailyData
            },
            {
              name: '用户访问量',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.VisitsDailyData
            },
            {
              name: '接口调用次数',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: this.statisData.ApiDailyData
            }
          ]
        });
      },
      async initData() {
        this.$store.dispatch('GetStatisData').then(response => {
          let { Data } = response;
          Data.VisitsDailyTotalCount = 0;
          Data.ApiDailyTotalCount = 0;
          /* 假装自己很多用户的样子 */
          /*  */
          // Data.UserDailyData.map((item,index,array)=>{
          //   array[index] = index%2==0 ? index*11: index*20
          // })
          // Data.AdminDailyData.map((item,index,array)=>{
          //   array[index] = index%2==0 ? index*8 : index*10
          // })
          // Data.ShopDailyData.map((item,index,array)=>{
          //   array[index] = index%2==0 ? index*24 : index*30
          // })
          // Data.OrderDailyData.map((item,index,array)=>{
          //   array[index] = index%2==0 ? index*200 : index*60
          // })
          /*  */

          //
          Data.VisitsDailyData.map((item,index,array)=>{
            // array[index] = index%2==0 ? index*13 : index*40
            Data.VisitsDailyTotalCount +=  item;
          })
          Data.ApiDailyData.map((item,index,array)=>{
            // array[index] = index%2==0 ? index*13 : index*40
            Data.ApiDailyTotalCount +=  item;
          })
          // 

          /*  */
          // Data.UserDailyData[0] = 120;
          // Data.AdminDailyData[0] = 180;
          // Data.ShopDailyData[0] = 320;
          // Data.OrderDailyData[0] = 420;
          // Data.VisitsDailyData[0] = 880;
          /* 假装自己很多用户的样子 */
          
          this.statisData = Data;
          this.initEcharts();
        })
      }
    },
    mounted: function () {
      this.initData();
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

</style>
