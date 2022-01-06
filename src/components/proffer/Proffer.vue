<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
            <el-breadcrumb-item>供应商信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                   <el-input placeholder="请输入供应商名称" v-model="queryInfo.query" clearable @clear="getProffer" @keyup.enter.native="getProffer">
                        <el-button slot="append" icon="el-icon-search" @click="getProffer"></el-button>
                    </el-input>
                </el-col>
                <!-- <el-col :span="6">
                    <el-button type="primary">主要按钮</el-button>
                </el-col> -->
            </el-row>
            <!-- 表格区 -->
            <el-table :data="profferList" style="width: 100%" border=true stripe>
                <el-table-column prop="ProfferID" label="供应商ID" width="120"></el-table-column>
                <el-table-column prop="ProfferName" label="供应商名称" width="120"></el-table-column>
                <el-table-column prop="Address" label="地址" width="200"></el-table-column>
                <el-table-column prop="Attn" label="联系人" width="120"></el-table-column>
                <el-table-column prop="AttnTel" label="联系人电话" width="200"></el-table-column>
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
      profferList: [],
      total: 0
    }
  },
  created () {
    this.getProffer()
  },
  methods: {
    async getProffer () {
      const { data: res } = await this.$http.get('proffer', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取数据失败')
      if (res.query.length >= 1) {
        this.profferList = res.query
        this.total = res.total1
      } else {
        this.profferList = res.data
        this.total = res.total
      }
      console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getProffer()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getProffer()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
