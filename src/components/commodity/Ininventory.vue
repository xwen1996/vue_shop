<template>
    <div class="body">
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品入库</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
            <div class="upExcel">
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel表格文件</div>
                </el-upload>
            </div>
            <div>
                <el-form ref="inventoryFormRef" :model="inventoryForm" :rules="inventoryFormRules" label-width="480px" size="small">
                    <el-form-item label="商品名称" prop="ProductName">
                        <el-input v-model="inventoryForm.ProductName"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="Brand">
                        <el-input v-model="inventoryForm.Brand"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="Class">
                        <el-input v-model="inventoryForm.Class"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" prop="Specification">
                        <el-input v-model="inventoryForm.Specification"></el-input>
                    </el-form-item>
                    <el-form-item label="保质期" prop="ShelfLife">
                        <el-input v-model="inventoryForm.ShelfLife"></el-input>
                    </el-form-item>
                    <el-form-item label="过期日期" prop="ExpiryDate">
                        <el-input v-model="inventoryForm.ExpiryDate"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" prop="PurchasingPrice">
                        <el-input v-model="inventoryForm.PurchasingPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="售价" prop="SellingPrice">
                        <el-input v-model="inventoryForm.SellingPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="Inventory">
                        <el-input v-model="inventoryForm.Inventory"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button type="info" @click="resetInventoryForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      inventoryForm: {
        ProductName: '今麦郎矿泉水',
        Brand: '今麦郎',
        Class: '食品',
        Specification: '500ml',
        ShelfLife: '12个月',
        ExpiryDate: '2022-12-12',
        PurchasingPrice: '0.5',
        SellingPrice: '1',
        Inventory: '500'
      },
      inventoryFormRules: {
        ProductName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        Brand: [
          { required: true, message: '请输入商品品牌', trigger: 'blur' }
        ],
        Class: [
          { required: true, message: '请输入商品类别', trigger: 'blur' }
        ],
        Specification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        ShelfLife: [
          { required: true, message: '请输入商品保质期', trigger: 'blur' }
        ],
        ExpiryDate: [
          { required: true, message: '请输入商品过期日期', trigger: 'blur' }
        ],
        PurchasingPrice: [
          { required: true, message: '请输入商品进价', trigger: 'blur' }
        ],
        SellingPrice: [
          { required: true, message: '请输入商品售价', trigger: 'blur' }
        ],
        Inventory: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      // 上传的文件列表
      fileList: []
    }
  },
  created () {

  },
  methods: {
    // 提交按钮
    submitForm () {
      this.$refs.inventoryFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('ininventory', this.inventoryForm)
        this.$message.success(res.msg)
        console.log(res)
      })
    },
    // 重置按钮
    resetInventoryForm () {
      this.$refs.inventoryFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.body{
    position: relative;
}
.upExcel{
    position: absolute;
    top: 44px;
}
.el-input {
    width: 340px;
}
</style>
