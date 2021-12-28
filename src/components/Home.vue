<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <!-- <img src="../assets/home_logo.png" alt=""> -->
                <span>超市后台管理系统</span>
            </div>
            <el-button type="info" @click="logout" round>退出</el-button>
        </el-header>
        <!-- 主体区域 -->
        <el-container>
            <!-- 左侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 折叠按钮 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 左侧菜单  -->
                <!-- unique-opened：是否只保持一个子菜单的展开，collapse：是否折叠菜单，router：是否使用vue-router的模式，default-active：当前激活菜单的index -->
                <el-menu background-color="#252526" text-color="#fff" active-text-color="#007ACC" unique-opened :collapse='isCollapse' :collapse-transition='false' router :default-active ='activePath'>
                    <!-- v-for 循环遍历数据 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key='item.id'>
                        <!-- 一级菜单模版 -->
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <!-- 将当前点击的path(路由地址)赋给index，然后传递给activePath -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <!-- 二级菜单模版 -->
                            <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        { id: '0', path: 'commodity', authName: '商品管理', children: [{ id: '6', path: 'inventory', authName: '库存信息' }, { id: '7', path: 'ininventory', authName: '商品入库' }, { id: '8', path: 'outinventory', authName: '出库记录' }] },
        { id: '1', path: 'caiwutongji', authName: '财务统计', children: [{ id: '9', path: 'caiwu', authName: '财务统计' }] },
        { id: '2', path: 'huiyuanguanli', authName: '会员管理', children: [{ id: '10', path: 'huiyuan', authName: '会员管理' }] },
        { id: '3', path: 'gongyingshangguanli', authName: '供应商管理', children: [{ id: '11', path: 'gongyingshang', authName: '供应商管理' }] },
        { id: '4', path: 'yuangongguanli', authName: '员工信息', children: [{ id: '12', path: 'yuangong', authName: '员工信息' }] },
        { id: '5', path: 'xitongshezhi', authName: '系统设置', children: [{ id: '13', path: 'xitong', authName: '系统设置' }] }
      ],
      // 一级菜单图标
      iconsObj: {
        0: 'el-icon-s-goods',
        1: 'el-icon-s-marketing',
        2: 'el-icon-user-solid',
        3: 'el-icon-s-home',
        4: 'el-icon-s-custom',
        5: 'el-icon-s-tools'
      },
      // 记录折叠状态，是否折叠
      isCollapse: false,
      // 记录被激活的菜单链接地址，也就是path(路由地址)
      activePath: ''
    }
  },
  // 生命周期函数，创建后
  created () {
    // 创建后自动调用函数，获取菜单数据
    // this.getMenuList()
    // 自动将 index 值赋给 default-active，保持菜单链接高亮
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  // 函数定义区
  methods: {
    // 退出功能
    logout () {
      // 清空token
      window.sessionStorage.clear()
      // 路由跳转到登录页
      this.$router.push('/login')
    },
    // 折叠侧边栏切换
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 将path(路由地址)保存在浏览器的会话储存中，保存菜单链接的激活状态，高亮
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      // 点击之后将 index 值赋给 default-active，保持菜单链接高亮
      this.activePath = activePath
    }
    // 获取所有左侧菜单数据，保存在menulist数组中
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.code !== 200) return this.$message.error(res.msg)
    //   this.menulist = res.data
    //   console.log(res)
    // }
  }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
// 头部样式
.el-header{
    div{
        img{
            height: 57px;
        }
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
            font-size: 25px;
        }
    }
    background-color: #3C3C3C;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #E9EDF1;
}
// 折叠按钮
.toggle-button{
    background-color: #243137;
    font-size: 10px;
    height: 25px;
    color: #E9EDF1;
    text-align: center;
    line-height: 25px;
    letter-spacing: 0.3em;
    cursor: pointer;
}
// 左侧边栏样式
.el-aside{
    background-color: #252526;
    .el-menu {
      border-right: none;
    }
}
// 右侧主体样式
.el-main{
    background-color: #E9EDF1;
}
</style>
