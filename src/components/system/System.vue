<template>
    <div class="body">
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card>
          <span>
            系统用户注册
          </span>
          <div>
              <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="480px">
                  <el-form-item label="用户名" prop="UserName">
                      <el-input v-model="registerForm.UserName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="PassWord">
                      <el-input v-model="registerForm.PassWord"></el-input>
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
      registerForm: {
        UserName: 'admin',
        PassWord: '123456'
      },
      registerFormRules: {
        UserName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        PassWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  methods: {
    // 提交按钮
    submitForm () {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据校验失败')
        const { data: res } = await this.$http.post('system/register', this.registerForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        console.log(res)
      })
    },
    // 重置按钮
    resetInventoryForm () {
      this.$refs.registerFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
    width: 340px;
}
</style>
