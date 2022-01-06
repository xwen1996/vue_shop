<template>
    <div class="login_container">
        <!-- 登录框 -->
        <div class="login_box">
            <!-- 登录头像区 -->
            <div class="avatar_box">
                <img src="../assets/login_logo.jpg" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form ref="loginFormRef" :model='loginForm' :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type='password'></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="restLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    restLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录按钮，进行登录校验
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 检验成功，向服务器端发起post请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        // 登录成功后将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #333333;
    height: 100%;
}
//登录框
.login_box {
    width: 450px;
    height: 300px;
    background-color: #1E1E1E;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
//登录头像区样式
    .avatar_box{
        position: absolute;
        height: 150px;
        width: 150px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        left: 50%;
        transform: translate(-50%,-40%);
        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
}
.login_form{
    position: relative;
    top: 110px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    position:absolute;
    // display: flex;
    // justify-content: flex-end;
    bottom:0;
    left:50%;
    transform: translate(-50%,85px);
}
</style>
