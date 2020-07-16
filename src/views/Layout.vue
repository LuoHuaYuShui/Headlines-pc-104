<template>
  <el-container class="conatiner-layout">
    <el-aside width="200px">
      <!-- logo区域 -->
      <div class="logo"></div>
      <!-- 导航菜单 -->
      <!-- default-active="2" 设置默认激活的菜单项 -->
      <el-menu
        style="border-right:none"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- el-submenu 当有子菜单时使用该组件 -->
        <!-- el-menu-item  当没有子菜单使用该组件 -->
        <el-menu-item index="1">
          <!-- 设置图标 -->
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <!-- 设置图标 -->
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <!-- 设置图标 -->
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <!-- 设置图标 -->
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <!-- 设置图标 -->
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <!-- 设置图标 -->
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <!-- 设置图标 -->
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon"></span>
        <!-- 文字 -->
        <span class="text">智科云达科技有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown>
          <!-- 默认显示 -->
          <span>
            <!-- 头像 和 用户名 -->
            <img src="../assets/avatar.jpg" class="head" alt />
            <span class="name">一条龙为您服务</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉选项 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "layout"
};
</script>

<style scoped lang="less">
.conatiner-layout {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background-color: #002244;
      background: url("../assets/logo_admin.png") no-repeat center / 140px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .el-dropdown {
      float: right;
      .head {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        font-weight: bold;
        color: #333;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>