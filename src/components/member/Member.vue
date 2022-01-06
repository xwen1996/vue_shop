<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                   <el-input placeholder="请输入会员姓名" v-model="queryInfo.query" clearable @clear="getMember" @keyup.enter.native="getMember">
                        <el-button slot="append" icon="el-icon-search" @click="getMember"></el-button>
                    </el-input>
                </el-col>
                <!-- <el-col :span="6">
                    <el-button type="primary">主要按钮</el-button>
                </el-col> -->
            </el-row>
            <!-- 表格区 -->
            <el-table :data="memberList" style="width: 100%" border=true stripe>
                <el-table-column prop="MemberID" label="会员ID" width="100"></el-table-column>
                <el-table-column prop="MemberName" label="会员姓名" width="110"></el-table-column>
                <el-table-column prop="Sex" label="性别" width="110"></el-table-column>
                <el-table-column prop="Address" label="地址" width="200"></el-table-column>
                <el-table-column prop="PhoneNumber" label="电话" width="160"></el-table-column>
                <el-table-column prop="MenberGrade" label="会员等级" width="100"></el-table-column>
                <el-table-column prop="Integral" label="积分" width="100"></el-table-column>
                <el-table-column prop="Consumption" label="消费金额" width="100"></el-table-column>
                <el-table-column prop="RecordDate" label="注册日期"></el-table-column>
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
      memberList: [],
      total: 0
    }
  },
  created () {
    this.getMember()
  },
  methods: {
    async getMember () {
      const { data: res } = await this.$http.get('member', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取数据失败')
      if (res.query.length >= 1) {
        this.memberList = res.query
        this.total = res.total1
      } else {
        this.memberList = res.data
        this.total = res.total
      }
      console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getMember()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getMember()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
