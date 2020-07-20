<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 如果你的组件，除去template 还有其他选项，就需要默认导出-->
</template>
<script>
export default {
  // 此处定义的名字 在plugin.js的注册中用到
  name: "my-bread"
};
</script>>