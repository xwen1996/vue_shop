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
            <el-row :gutter="30">
                <el-col :span="8">
                   <el-input placeholder="请输入供应商名称" v-model="queryInfo.query" clearable @clear="getProffer" @keyup.enter.native="getProffer">
                        <el-button slot="append" icon="el-icon-search" @click="getProffer"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addProffer">添加供应商</el-button>
                </el-col>
            </el-row>
            <!-- 表格区 -->
            <el-table :data="profferList" style="width: 100%" :border=true stripe>
                <el-table-column prop="ProfferID" label="供应商ID" width="120"></el-table-column>
                <el-table-column prop="ProfferName" label="供应商名称" width="120"></el-table-column>
                <el-table-column prop="Address" label="地址" width="200"></el-table-column>
                <el-table-column prop="Attn" label="联系人" width="120"></el-table-column>
                <el-table-column prop="AttnTel" label="联系人电话" width="200"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="showDeleteDialog(scope.row.ProfferID)">删除</el-button>
                    </template>
                </el-table-column>
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
        <!-- 添加供应商对话框 -->
        <el-dialog
        title="添加供应商"
        :visible.sync="addProfferVisible"
        width="30%"
        @closed="addProfferDialogClose"
        >
            <el-form ref="addProfferFormRef" :model="addProfferForm" :rules="addProfferFormRules" label-width="130px" size="mini">
                <el-form-item prop="ProfferName" label="供应商名称">
                    <el-input v-model="addProfferForm.ProfferName"></el-input>
                </el-form-item>
                <el-form-item prop="Address" label="供应商地址">
                    <el-input v-model="addProfferForm.Address"></el-input>
                </el-form-item>
                <el-form-item prop="Attn" label="联系人">
                    <el-input v-model="addProfferForm.Attn"></el-input>
                </el-form-item>
                <el-form-item prop="AttnTel" label="联系电话">
                    <el-input v-model="addProfferForm.AttnTel"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitaddProffer">提交</el-button>
                <el-button type="info" @click="resetaddProfferForm">重置</el-button>
            </span>
        </el-dialog>
        <!-- 删除供应商对话框 -->
        <el-dialog
        title="警告"
        :visible.sync="deleteProfferVisible"
        width="30%"
        @closed="deleteProfferDialogClose"
        >
          <span>确认删除吗？</span>
          <span slot="footer" class="dialog-footer">
              <el-button type="info" @click="notDelete">取消</el-button>
              <el-button type="primary" @click="submitDelete">确认</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制 添加供应商 对话框显示隐藏
      addProfferVisible: false,
      addProfferForm: {
        ProfferName: '今麦郎',
        Address: '江西省南昌市',
        Attn: '张三',
        AttnTel: '18279256100'
      },
      addProfferFormRules: {
        ProfferName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请输入供应商地址', trigger: 'blur' }
        ],
        Attn: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        AttnTel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码格式错误', trigger: 'blur' }
        ]
      },
      // 记录当前ID
      ID: '',
      // 控制 删除供应商 对话框显示隐藏
      deleteProfferVisible: false,
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
    // 添加供应商 按钮点击事件
    addProffer () {
      this.addProfferVisible = true
    },
    // 监听 添加供应商 对话框的关闭事件
    addProfferDialogClose () {
      this.$refs.addProfferFormRef.resetFields()
      this.getProffer()
    },
    // 提交 按钮点击事件
    submitaddProffer () {
      this.$refs.addProfferFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('proffer/add', this.addProfferForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.getProffer()
      })
    },
    // 重置 按钮点击事件
    resetaddProfferForm () {
      this.$refs.addProfferFormRef.resetFields()
    },
    // 删除按钮点击事件
    showDeleteDialog (id) {
      this.deleteProfferVisible = true
      this.ID = id
    },
    // 监听 删除 对话框的关闭事件
    deleteProfferDialogClose () {
      this.getProffer()
    },
    // 确定 按钮点击事件
    async submitDelete () {
      this.deleteProfferVisible = false
      const { data: res } = await this.$http.post('proffer/delete', { id: this.ID })
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    },
    // 取消 按钮点击事件
    notDelete () {
      this.deleteProfferVisible = false
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
