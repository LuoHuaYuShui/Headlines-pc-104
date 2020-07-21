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
          <el-select
            @change="changeChannel"
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 data绑定数组数据-->
      <el-table :data="articles">
        <!-- 列容器 -->
        <el-table-column label="封面">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 加载失败时的组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:180px;height:120px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" alt style="width:180px;height:120px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="400px"></el-table-column>
        <el-table-column label="状态">
          <!-- Element 的 Tag标签 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
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
      channelOptions: [],
      // 总条数
      total: 0
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    // 删除文章
    delArticle(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 点击确认，发删除请求
          try {
            // 测试账户的文章数据，后台限制不能删除
            await this.$http.delete(`articles/${id}`);
            this.$message.success("删除文章成功");
            this.getArticles();
          } catch (e) {
            this.$message.error("删除文章失败");
          }
        })
        .catch(() => {
          // 点击取消，没有逻辑
        });
    },
    // 去编辑
    toEdit(id) {
      this.$router.push({ path: "/publish", query: { id } });
    },
    // 选择频道
    changeChannel(val) {
      // 如果清空，val 是""字符串，应该设置为 null
      if (val === "") this.reqParams.channel_id = null;
    },
    // 选择日期
    changeDate(arr) {
      // arr 是数组 [起始日期,结束日期]
      /* 
         注意：后台需要的日期格式是 2020-07-20
         组件：支持日期格式设置
         注意：清空日期时，也会触发该函数，arr数据是null
      */
      if (arr) {
        this.reqParams.begin_pubdate = arr[0];
        this.reqParams.end_pubdate = arr[1];
      } else {
        this.reqParams.begin_pubdate = null;
        this.reqParams.end_pubdate = null;
      }
    },
    // 筛选函数 （删除状态查询 后台不支持）
    search() {
      this.reqParams.page = 1;
      // 重新查询
      this.getArticles();
    },
    // 切换分页（触发时 传入最新改变后的页码）
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getArticles();
    },
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
      // 总条数
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
</style>