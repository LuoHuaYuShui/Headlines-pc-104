<template>
  <div class="container-login">
    <!-- el-card 是组件 解析后并不存在 el-card标签 -->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-login"
};
</script>

<style scoped lang="less">
.container-login {
  width: 100%;
  height: 100%;
  // 父容器没有样式时  设置绝对定位基于窗口设置宽高
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  // Element-ui 在组件的根容器上，加了一个和组件名称一致的类名
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 0 auto 20px;
      width: 200px;
    }
  }
}
</style>