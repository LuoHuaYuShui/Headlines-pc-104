<template>
  <div class="container-article">
    <!-- 搜索区域 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 封装组件实现 -->
        <my-bread>内容管理</my-bread>
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
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 51243 条结果：</div>
      <!-- 表格 data绑定数组数据-->
      <el-table :data="articles">
        <!-- 列容器 -->
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 组件名称 不能和 原生标签 重名
  name: "page-article",
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
        end_pubdate: null,
        // 当前请求数据的 页码
        page: 1,
        // 每页条数
        per_page: 20
      },
      // 支持日期范围组件的数据（当选择日期范围后分别给 begin 和 end日期赋值）
      dateArr: [],
      // 文章数组
      articles: [],
      // 频道选项
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    // 获取频道数据（行为方法）
    async getChannelOptions() {
      const res = await this.$http.get("channels");
      //console.log(res);
      this.channelOptions = res.data.data.channels;
    },
    // 获取文章数据
    async getArticles() {
      // get的传参方式：params: this.reqParams  筛选条件传给后台，根据条件拿数据
      const res = await this.$http.get("articles", { params: this.reqParams });
      this.articles = res.data.data.results;
    }
  }
};
</script>

<style scoped lang="less">
</style>