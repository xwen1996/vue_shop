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
            <el-row :gutter="30">
                <el-col :span="8">
                   <el-input placeholder="请输入会员姓名" v-model="queryInfo.query" clearable @clear="getMember" @keyup.enter.native="getMember">
                        <el-button slot="append" icon="el-icon-search" @click="getMember"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="registerMember">注册会员</el-button>
                </el-col>
            </el-row>
            <!-- 表格区 -->
            <el-table :data="memberList" style="width: 100%" :border=true stripe>
                <el-table-column prop="MemberID" label="会员ID" width="100"></el-table-column>
                <el-table-column prop="MemberName" label="会员姓名" width="110"></el-table-column>
                <el-table-column prop="Sex" label="性别" width="110"></el-table-column>
                <el-table-column prop="Address" label="地址" width="200"></el-table-column>
                <el-table-column prop="PhoneNumber" label="电话/会员号" width="160"></el-table-column>
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
        <!-- 注册会员对话框 -->
        <el-dialog
        title="会员注册"
        :visible.sync="registerVisible"
        width="30%"
        @closed="registerDialogClose"
        >
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="130px" size="mini">
                <el-form-item prop="MemberName" label="会员姓名">
                    <el-input v-model="registerForm.MemberName"></el-input>
                </el-form-item>
                <el-form-item prop="Sex" label="会员性别">
                    <el-input v-model="registerForm.Sex"></el-input>
                </el-form-item>
                <el-form-item prop="Address" label="会员地址">
                    <el-input v-model="registerForm.Address"></el-input>
                </el-form-item>
                <el-form-item prop="PhoneNumber" label="会员电话/会员号">
                    <el-input v-model="registerForm.PhoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitRegister">提交</el-button>
                <el-button type="info" @click="resetRegisterForm">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制 注册会员 对话框显示隐藏
      registerVisible: false,
      registerForm: {
        MemberName: '张三',
        Sex: '男',
        Address: '江西省南昌市',
        PhoneNumber: '18279256100'
      },
      registerFormRules: {
        MemberName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        PhoneNumber: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码格式错误', trigger: 'blur' }
        ]
      },
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
    // 注册会员按钮点击事件
    registerMember () {
      this.registerVisible = true
    },
    // 监听 注册会员 对话框的关闭事件
    registerDialogClose () {
      this.$refs.registerFormRef.resetFields()
      this.getMember()
    },
    // 提交 按钮点击事件
    submitRegister () {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('member/register', this.registerForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.getMember()
      })
    },
    // 重置 按钮点击事件
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
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
