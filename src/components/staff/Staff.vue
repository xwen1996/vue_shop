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
            <el-row :gutter="30">
                <el-col :span="8">
                   <el-input placeholder="请输入员工姓名" v-model="queryInfo.query" clearable @clear="getStaff" @keyup.enter.native="getStaff">
                        <el-button slot="append" icon="el-icon-search" @click="getStaff"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addStaff">添加员工</el-button>
                </el-col>
            </el-row>
            <!-- 表格区 -->
            <el-table :data="staffList" style="width: 100%" :border=true stripe>
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
        <!-- 添加员工对话框 -->
        <el-dialog
        title="添加员工"
        :visible.sync="addStaffVisible"
        width="30%"
        @closed="addStaffDialogClose"
        >
            <el-form ref="addStaffFormRef" :model="addStaffForm" :rules="addStaffFormRules" label-width="130px" size="mini">
                <el-form-item prop="StaffName" label="员工姓名">
                    <el-input v-model="addStaffForm.StaffName"></el-input>
                </el-form-item>
                <el-form-item prop="Sex" label="员工性别">
                    <el-input v-model="addStaffForm.Sex"></el-input>
                </el-form-item>
                <el-form-item prop="Age" label="员工年龄">
                    <el-input v-model="addStaffForm.Age"></el-input>
                </el-form-item>
                <el-form-item prop="IDNumber" label="身份证号码">
                    <el-input v-model="addStaffForm.IDNumber"></el-input>
                </el-form-item>
                <el-form-item prop="Address" label="地址">
                    <el-input v-model="addStaffForm.Address"></el-input>
                </el-form-item>
                <el-form-item prop="PhoneNumber" label="员工电话">
                    <el-input v-model="addStaffForm.PhoneNumber"></el-input>
                </el-form-item>
                <el-form-item prop="Duty" label="职位">
                    <el-input v-model="addStaffForm.Duty"></el-input>
                </el-form-item>
                <el-form-item prop="Wage" label="工资">
                    <el-input v-model="addStaffForm.Wage"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAddStaff">提交</el-button>
                <el-button type="info" @click="resetAddStaffForm">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制 添加员工 对话框显示隐藏
      addStaffVisible: false,
      addStaffForm: {
        StaffName: '张三',
        Sex: '男',
        Age: '35',
        IDNumber: '360424198512124567',
        Address: '江西省南昌市',
        PhoneNumber: '18279255100',
        Duty: '收银',
        Wage: '8000'
      },
      addStaffFormRules: {
        StaffName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        Sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        Age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        IDNumber: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        PhoneNumber: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码格式错误', trigger: 'blur' }
        ],
        Duty: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        Wage: [
          { required: true, message: '请输入工资', trigger: 'blur' }
        ]
      },
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
    // 添加员工按钮点击事件
    addStaff () {
      this.addStaffVisible = true
    },
    // 监听 添加员工 对话框的关闭事件
    addStaffDialogClose () {
      this.$refs.addStaffFormRef.resetFields()
      this.getStaff()
    },
    // 提交 按钮点击事件
    submitAddStaff () {
      this.$refs.addStaffFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('staff/add', this.addStaffForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
      })
    },
    // 重置 按钮点击事件
    resetAddStaffForm () {
      this.$refs.addStaffFormRef.resetFields()
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
