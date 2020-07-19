<template>
  <div class="container-article">内容管理</div>
</template>

<script>
export default {
  // 组件名称 不能和 原生标签 重名
  name: "page-article",
  // 测试
  created() {
    // 发送获取当前登录用户的文章
    this.$http
      .get("/articles")
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped lang="less">
</style>