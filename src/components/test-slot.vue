<template>
  <div class="conatiner-test">
    <div class="header"></div>
    <div class="content">
      <!-- 名字con的插槽 -->
      <slot name="con" :msg="msg"></slot>
    </div>
    <div class="footer">
      <!-- 名字foo的插槽 -->
      <slot name="foo"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "拥有插槽组件的内部数据"
    };
  }
};
</script>

<style scoped lang="less">
</style>