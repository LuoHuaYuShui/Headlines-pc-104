<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small">
          <!-- label属性单个按钮的值，选中点击后，这个值会赋值给reqParams.collect -->
          <!-- 当el-radio-button组件中没有文字说明，label的值直接当做文字说明 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="list-box">
        <div class="item-box" v-for="i in 10" :key="i">
          <img src="../../assets/avatar.jpg" alt />
          <div class="option">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "page-image",
  data() {
    return {
      // 查询条件
      reqParams: {
        // 是否为收藏：true 表示收藏图片  false 表示全部图片
        collect: false,
        page: 1,
        per_page: 10
      }
    };
  }
};
</script>

<style scoped lang="less">
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