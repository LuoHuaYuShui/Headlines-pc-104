<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <el-radio-group @change="toggleList()" v-model="reqParams.collect" size="small">
          <!-- label属性单个按钮的值，选中点击后，这个值会赋值给reqParams.collect -->
          <!-- 当el-radio-button组件中没有文字说明，label的值直接当做文字说明 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="list-box">
        <div class="item-box" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <!-- item 中既有图片的id 也有图片的状态 -->
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{'red':item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="上传素材呦" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// auth 这个模块 在JS中才能使用
import auth from "@/utils/auth";
export default {
  name: "page-image",
  data() {
    return {
      // 上传的请求头对象
      headers: { Authorization: `Bearer ${auth.getUser().token}` },
      // 查询条件
      reqParams: {
        // 是否为收藏：true 表示收藏图片  false 表示全部图片
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 预览图地址
      imageUrl: null
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 上传成功 response 是上传成功后 后台返回的数据
    uploadSuccess(response) {
      // 提示 和 预览
      this.$message.success("上传素材成功");
      this.imageUrl = response.data.url;

      // 3秒后 关闭对话框 并且 更新列表
      window.setInterval(() => {
        this.dialogVisible = false;
        this.getImages();
      }, 3000);
    },
    // 打开对话框
    openDialog() {
      // 数据驱动视图
      this.dialogVisible = true;
      // 第二次打开，清空预览图
      this.imageUrl = null;
    },
    // 进行（添加）收藏 || 取消收藏
    async toggleStatus(item) {
      // 修改后的状态
      const updatedStatus = !item.is_collected;
      try {
        // 发送请求
        await this.$http.put(`user/images/${item.id}`, {
          // 和当前图片状态取反即可
          collect: updatedStatus
        });
        // 成功提示
        this.$message.success(updatedStatus ? "添加收藏成功" : "取消收藏成功");
        // 根据修改后的状态 去修改图片数据对应的状态is_collected
        item.is_collected = updatedStatus;
      } catch (e) {
        // 失败提示
        this.$message.success(updatedStatus ? "添加收藏失败" : "取消收藏失败");
      }
    },
    // 删除素材
    delImage(id) {
      // 确认框
      this.$confirm("此操作将永久删除该图片素材, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 点击确认时（删除请求）
          try {
            await this.$http.delete(`user/images/${id}`);
            this.$message.success("删除图片成功");
            this.getImages();
          } catch (e) {
            this.$message.error("删除图片失败");
          }
        })
        .catch(() => {
          // 点击取消时，不做任何逻辑
        });
    },
    // 切换全部 和 收藏
    toggleList() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 切换分页
    changePage(newPage) {
      this.reqParams.page = newPage;
      // 重新向后台获取数据
      this.getImages();
    },
    // 获取图片素材
    async getImages() {
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = res.data.data.results;
      // 设置总条数
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
// 列表样式
.list-box {
  margin-top: 20px;
  .item-box {
    display: inline-block;
    width: 180px;
    height: 180px;
    margin-right: 30px;
    border: 1px dashed #ddd;
    position: relative;
    margin-bottom: 30px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 30px;
        // 不加 & 解析后：span .red{} 后代选择器
        // 加 & 解析后：  span.red{}  交集选择器
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
