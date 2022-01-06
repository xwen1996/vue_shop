<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>出库记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 搜索区 -->
            <!-- <el-row :gutter="20">
                <el-col :span="8">
                   <el-input placeholder="请输入商品名称" v-model="queryInfo.query" clearable @clear="getOutInventory" @keyup.enter.native="getOutInventory">
                        <el-button slot="append" icon="el-icon-search" @click="getOutInventory"></el-button>
                    </el-input>
                </el-col>
            </el-row> -->
            <!-- 表格区 -->
            <el-table :data="outinventoryList" style="width: 100%" border=true stripe>
                <el-table-column prop="ProductID" label="商品ID" width="65"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" width="130"></el-table-column>
                <el-table-column prop="Brand" label="品牌" width="65"></el-table-column>
                <el-table-column prop="Class" label="类别" width="80"></el-table-column>
                <el-table-column prop="Specification" label="规格" width="150"></el-table-column>
                <el-table-column prop="ShelfLife" label="保质期"></el-table-column>
                <el-table-column prop="ExpiryDate" label="过期日期" width="220"></el-table-column>
                <el-table-column prop="PurchasingPrice" label="进价" width="70"></el-table-column>
                <el-table-column prop="SellingPrice" label="售价" width="70"></el-table-column>
                <el-table-column prop="Inventory" label="库存" width="70"></el-table-column>
                <el-table-column prop="Selling" label="出售数量" width="80"></el-table-column>
                <el-table-column label="操作" width="144">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="showSellingDialog(scope.row.ProductID)">出售</el-button>
                        <el-button type="warning" size="mini" @click="showOutDialog(scope.row.ProductID)">下架</el-button>
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
        <!-- 出售对话框 -->
        <el-dialog
        title="出售"
        :visible.sync="sellingVisible"
        width="30%"
        @close="sellingDialogClose"
        >
            <el-form ref="sellingFormRef" :model="sellingForm" :rules="sellingFormRules" label-width="80px">
                <el-form-item prop="num" label="出售数量">
                    <el-input v-model="sellingForm.num"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sellingCancel">取 消</el-button>
                <el-button type="primary" @click="sellingConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 下架对话框 -->
        <el-dialog
        title="下架"
        :visible.sync="outVisible"
        width="30%"
        @close="outDialogClose"
        >
            <el-form ref="outFormRef" :model="outForm" :rules="outFormRules" label-width="80px">
                <el-form-item prop="num" label="下架数量">
                    <el-input v-model="outForm.num"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="outCancel">取 消</el-button>
                <el-button type="primary" @click="outConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制出售对话框显示隐藏
      sellingVisible: false,
      sellingForm: {
        num: 1
      },
      sellingFormRules: {
        num: [{ required: true, message: '请输入出售数量', trigger: 'blur' }]
      },
      // 记录出售，下架按钮当前ID
      ID: '',
      // 控制下架对话框显示隐藏
      outVisible: false,
      outForm: {
        num: 1
      },
      outFormRules: {
        num: [{ required: true, message: '请输入出售数量', trigger: 'blur' }]
      },
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页码
        pageIndex: 1,
        // 每页显示多少条数据
        pageSize: 9
      },
      // 数据
      outinventoryList: [],
      // 总数据条数
      total: 0
    }
  },
  created () {
    this.getOutInventory()
  },
  methods: {
    async getOutInventory () {
      const { data: res } = await this.$http.get('outinventory', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取数据失败')
      if (res.query.length >= 1) {
        this.outinventoryList = res.query
        this.total = res.total1
      } else {
        this.outinventoryList = res.data
        this.total = res.total
      }
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getOutInventory()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getOutInventory()
    },
    // 出售按钮点击事件
    showSellingDialog (id) {
      this.sellingVisible = true
      this.ID = id
    },
    // 监听出售对话框的关闭事件
    sellingDialogClose () {
      this.getOutInventory()
    },
    // 出售对话框 确定 按钮点击事件
    sellingConfirm () {
      this.sellingVisible = false
      this.$refs.sellingFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('outinventory', { id: this.ID, selling: this.sellingForm.num })
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
      })
      this.getOutInventory()
      this.$refs.sellingFormRef.resetField()
    },
    // 出售对话框 取消 按钮点击事件
    sellingCancel () {
      this.sellingVisible = false
      this.$refs.sellingFormRef.resetField()
    },
    // 下架按钮点击事件
    showOutDialog (id) {
      this.outVisible = true
      this.ID = id
    },
    // 监听下架对话框的关闭事件
    outDialogClose () {
      this.getOutInventory()
    },
    // 下架对话框 确定 按钮点击事件
    outConfirm () {
      this.outVisible = false
      this.$refs.outFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('outinventory/out', { id: this.ID, outNum: this.outForm.num })
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
      })
      this.getOutInventory()
      this.$refs.outFormRef.resetField()
    },
    // 下架对话框 取消 按钮点击事件
    outCancel () {
      this.outVisible = false
      this.$refs.outFormRef.resetField()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
