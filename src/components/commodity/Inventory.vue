<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>库存信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                   <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!-- <el-col :span="6">
                    <el-button type="primary">主要按钮</el-button>
                </el-col> -->
            </el-row>
            <!-- 表格区 -->
            <el-table :data="inventoryList" style="width: 100%" border=true stripe>
                <el-table-column prop="ProductID" label="商品ID" width="90"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" width="180"></el-table-column>
                <el-table-column prop="Brand" label="品牌"></el-table-column>
                <el-table-column prop="Class" label="类别"></el-table-column>
                <el-table-column prop="Specification" label="规格" width="150"></el-table-column>
                <el-table-column prop="ShelfLife" label="保质期"></el-table-column>
                <el-table-column prop="ExpiryDate" label="过期日期" width="220"></el-table-column>
                <el-table-column prop="PurchasingPrice" label="进价" width="90"></el-table-column>
                <el-table-column prop="SellingPrice" label="售价" width="90"></el-table-column>
                <el-table-column prop="Inventory" label="库存" width="90"></el-table-column>
            </el-table>
            <!-- 分页区 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageIndex"
                :page-sizes="[ 6, 7, 8, 9]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页码
        pageIndex: 1,
        // 每页显示多少条数据
        pageSize: 8
      },
      inventoryList: [],
      total: 0
    }
  },
  created () {
    this.getInventory()
  },
  methods: {
    async getInventory () {
      const { data: res } = await this.$http.get('inventory', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取数据失败')
      this.inventoryList = res.data
      this.total = res.total
      console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getInventory()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getInventory()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
