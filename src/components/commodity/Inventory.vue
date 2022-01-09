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
            <el-row :gutter="30">
                <el-col :span="8">
                   <el-input placeholder="请输入商品名称" v-model="queryInfo.query" clearable @clear="getInventory" @keyup.enter.native="getInventory">
                        <el-button slot="append" icon="el-icon-search" @click="getInventory"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <span class="blue_">蓝色：库存不足100</span>
                </el-col>
                <el-col :span="4">
                    <span class="yellow_">黄色：一个月过期</span>
                </el-col>
                <el-col :span="4">
                    <span class="red_">红色：已经过期</span>
                </el-col>
            </el-row>
            <!-- 表格区 -->
            <el-table :data="inventoryList" style="width: 100%" :border=true :row-class-name="tableRowClassName">
                <el-table-column prop="ProductID" label="商品ID" width="90"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" width="150"></el-table-column>
                <el-table-column prop="Brand" label="品牌"></el-table-column>
                <el-table-column prop="Class" label="类别"></el-table-column>
                <el-table-column prop="Specification" label="规格" width="180"></el-table-column>
                <el-table-column prop="ShelfLife" label="保质期"></el-table-column>
                <el-table-column prop="ExpiryDate" label="过期日期" width="180"></el-table-column>
                <el-table-column prop="PurchasingPrice" label="进价" width="90"></el-table-column>
                <el-table-column prop="SellingPrice" label="售价" width="90"></el-table-column>
                <el-table-column prop="Inventory" label="库存" width="90"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="showAddDialog(scope.row.ProductID)">上架</el-button>
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
        <!-- 上架对话框 -->
        <el-dialog
        title="上架"
        :visible.sync="addVisible"
        width="30%"
        @closed="addDialogClose"
        >
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
                    <el-form-item label="上架数量" prop="Inventory">
                        <el-input v-model="addForm.Inventory"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCancel">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制上架对话框显示隐藏
      addVisible: false,
      addForm: {
        Inventory: 100
      },
      addFormRules: {
        Inventory: [
          { required: true, message: '请输入上架数量', trigger: 'blur' }
        ]
      },
      // 记录上架按钮当前ID
      ID: '',
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
      if (res.query.length >= 1) {
        this.inventoryList = res.query
        this.total = res.total1
      } else {
        this.inventoryList = res.data
        this.total = res.total
      }
      console.log(res)
    },
    // 上架按钮点击事件
    showAddDialog (id) {
      this.addVisible = true
      this.ID = id
    },
    // 监听上架对话框的关闭事件
    addDialogClose () {
      this.getInventory()
      this.$refs.addFormRef.resetFields()
    },
    // 上架对话框 确定 按钮点击事件
    addConfirm () {
      this.addVisible = false
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('inventory/add', { id: this.ID, add: this.addForm })
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
      })
    },
    // 上架对话框 取消 按钮点击事件
    addCancel () {
      this.addVisible = false
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
    },
    tableRowClassName ({ row }) {
      // console.log(this.$moment().format('YYYY-MM-DD')) 当前日期
      // console.log(this.$moment(row.ExpiryDate)._i) 过期日期
      // console.log(this.$moment(row.ExpiryDate).diff(this.$moment().format('YYYY-MM-DD'), 'day')) 两个日期相差
      if (this.$moment(row.ExpiryDate).diff(this.$moment().format('YYYY-MM-DD'), 'day') <= 30 && this.$moment(row.ExpiryDate).diff(this.$moment().format('YYYY-MM-DD'), 'day') > 0) {
        return 'yellow' // 快过期
      } else if (this.$moment(row.ExpiryDate).diff(this.$moment().format('YYYY-MM-DD'), 'day') <= 0) {
        return 'red' // 已经过期
      } else if (row.Inventory <= 100) {
        return 'blue' // 库存不足
      }
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.blue_ {
  background: rgb(28, 228, 255)
}
.yellow_ {
  background: rgba(255, 255, 105, 0.904)
}
.red_ {
  background: rgb(255, 128, 149)
}
</style>
<style>
.el-table .red {
  background: rgb(255, 128, 149) !important
}
.el-table .yellow {
  background: rgba(255, 255, 105, 0.904) !important
}
.el-table .blue {
  background: rgb(28, 228, 255) !important
}
</style>
