<template>
  <div class="container-login">
    <!-- el-card 是组件 解析后并不存在 el-card标签 -->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <!-- 双向数据绑定之后 才可以输入数据 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input
            style="width:240px;margin-right:8px"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 默认选中 -->
        <el-form-item>
          <!-- :value="true" 复选框默认选中，且不能修改 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth";

export default {
  name: "page-login",
  data() {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // value 是待校验的数据
      // callback 校验完毕后调用的回调函数
      // 手机号规则：必须1开头，第二位是3-9之间，9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号不正确"));
      }
    };
    return {
      // 表单数据对象
      loginForm: {
        // mobile 和 code 是固定的，后台需要的字段名称
        mobile: "13911111111",
        code: "246810"
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 需要自定义手机号的校验规则
          +{ validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "验证码格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // 整体表单校验
      this.$refs.loginForm.validate(async valid => {
        // valid代表是否整体校验成功
        if (valid) {
          // 进行登录
          // this.$http
          //   .post("/authorizations", this.loginForm)
          //   .then(res => {
          //     // res.data 获取后台返回的所有数据
          //     // 成功：保存用户信息
          //     auth.setUser(res.data.data);
          //     // 成功：跳转首页
          //     this.$router.push("/");
          //   })
          //   .catch(e => {
          //     // 失败提示  手机号或验证码错误（ElementUI 自带的语法）
          //     //  console.log("登录失败");
          //     this.$message.error("手机号或验证码错误");
          //   });
          // ===============================================================
          // 当某段代码可能会出现报错 或 异常，捕获这段代码的异常，进行异常处理
          // 语法：try{ 可能报错的代码片段 }catch(e){ 对异常进行处理代码 } 异常捕获和异常处理
          try {
            // 理想情况
            const res = await this.$http.post(
              "/authorizations",
              this.loginForm
            );
            auth.setUser(res.data.data);
            this.$router.push("/");
          } catch (e) {
            // try 中的代码出现异常会执行catch
            this.$message.error("手机号或验证码错误");
          }
        }
      });
    }
  }
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