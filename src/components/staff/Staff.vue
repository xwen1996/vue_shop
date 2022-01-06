<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                   <el-input placeholder="请输入员工姓名" v-model="queryInfo.query" clearable @clear="getStaff" @keyup.enter.native="getStaff">
                        <el-button slot="append" icon="el-icon-search" @click="getStaff"></el-button>
                    </el-input>
                </el-col>
                <!-- <el-col :span="6">
                    <el-button type="primary">主要按钮</el-button>
                </el-col> -->
            </el-row>
            <!-- 表格区 -->
            <el-table :data="staffList" style="width: 100%" border=true stripe>
                <el-table-column prop="StaffID" label="员工ID" width="100"></el-table-column>
                <el-table-column prop="StaffName" label="员工姓名" width="110"></el-table-column>
                <el-table-column prop="Sex" label="性别" width="110"></el-table-column>
                <el-table-column prop="Age" label="年龄" width="110"></el-table-column>
                <el-table-column prop="IDNumber" label="身份证号码" width="200"></el-table-column>
                <el-table-column prop="Address" label="地址"></el-table-column>
                <el-table-column prop="PhoneNumber" label="电话" width="200"></el-table-column>
                <el-table-column prop="Duty" label="职务" width="110"></el-table-column>
                <el-table-column prop="Wage" label="工资" width="110"></el-table-column>
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
      staffList: [],
      total: 0
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    async getStaff () {
      const { data: res } = await this.$http.get('staff', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取数据失败')
      if (res.query.length >= 1) {
        this.staffList = res.query
        this.total = res.total1
      } else {
        this.staffList = res.data
        this.total = res.total
      }
      console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getStaff()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getStaff()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
