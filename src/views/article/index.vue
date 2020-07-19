<template>
  <div class="container-article">
    <!-- 搜索区域 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容 -->
      <el-form label-width="80px" size="small">
        <!-- 表单项 -->
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- 下拉框 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option label="前端" :value="104"></el-option>
            <el-option label="Java" :value="108"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <!-- 组件产生两个数据：用 数组 收集数据，[开始日期，结束日期] -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->

    <!-- 测试代码 使用test-slot组件 -->
    <!-- <test-slot> -->
    <!-- data 变量名，代表插槽上绑定的所有自定义属性数据 -->
    <!-- scoped 代表插槽作用域数据 -->
    <!-- <div slot="con" slot-scoped="scope">内容{{scope.message}}</div> -->
    <!-- <div slot="foo">底部</div> -->
    <!-- </test-slot> -->
  </div>
</template>

<script>
// import TestSlot from "@/component/test-slot";
export default {
  components: { TestSlot },
  // 组件名称 不能和 原生标签 重名
  name: "page-article",
  // 测试
  // created() {
  //   // 发送获取当前登录用户的文章
  //   this.$http
  //     .get("/articles")
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
  data() {
    return {
      // 筛选条件对象（发给后台的参数，保证和后台要求的字段一致）
      reqParams: {
        // 0:草稿 1：待审核 2：审核通过 3：审核失败 4：已删除
        status: null,
        // 默认查询全部，
        channel_id: null,
        // 日期范围 (开始 和 结束)
        begin_pubdate: null,
        end_pubdate: null
      },
      // 支持日期范围组件的数据（当选择日期范围后分别给 begin 和 end日期赋值）
      dateArr: []
    };
  }
};
</script>

<style scoped lang="less">
</style>