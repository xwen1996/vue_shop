<template>
    <div class="body">
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>财务统计</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
          <div>
            <span class="demonstration">选择年份：</span>
            <el-date-picker v-model="years.year" type="year" placeholder="选择年份" @blur='updata' value-format="yyyy">
            </el-date-picker>
          </div>
            <div id="main">
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 年份
      years: {
        year: '2022'
      },
      // echart 的实例对象
      myChart: null,
      yData: []
    }
  },
  created () {
  },
  mounted () {
    // 当Dom元素加载完成后调用
    this.initChart()
    this.getFinance()
  },
  methods: {
    // 初始化echarts实例
    initChart () {
      this.myChart = this.$echarts.init(document.getElementById('main'))
    },
    // 获取服务器数据
    async getFinance () {
      const { data: res } = await this.$http.get('finance', { params: this.years })
      if (res.code !== 200) return this.$message.error(res.msg)
      this.yData = res.sales
      console.log(this.yData)
      this.updateChart()
    },
    // 更新图表
    updateChart () {
      const ydata = this.yData
      const option = {
        title: {
          text: '销售统计图'
        },
        tooltip: {},
        xAxis: {
          name: '月份(/月)',
          type: 'category',
          boundaryGap: false,
          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        },
        yAxis: {
          name: '销售额(/元)',
          type: 'value',
          scale: true
        },
        series: [
          {
            name: '销量',
            type: 'line',
            markLine: { data: [{ type: 'average' }] },
            data: ydata
          }
        ]
      }
      this.myChart.setOption(option)
    },
    updata () {
      this.getFinance()
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 800px;
  height: 400px;
  margin-top: 15px;
}
</style>
