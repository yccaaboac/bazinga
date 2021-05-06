<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <h3 class="title">EL-ADMIN 后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" placeholder="账号">
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          type="text"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @clike="getCode" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0"
        >记住我</el-checkbox
      >
      <el-form-item style="width: 100%">
        <!-- 给vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自子组件自定义的事件（父子组件的传递） -->
        <!-- prevent 是用来阻止默认的 ，相当于原生的event.preventDefault() -->
        <el-button
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span>登录</span>
          <!-- <span>登录中</span> -->
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <span></span>
      <span>.</span>
      <a href="#"></a>
    </div>
  </div>
</template>
<script>
import { encrypt } from "@/utils/rsaEncrypt";
import Background from "@/assets/images/background.jpg";
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import Config from "@/settings";
export default {
  name: "Login",
  data() {
    return {
      Background: Background,
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "admin",
        password: "123456",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        //获取route的参数赋值给redirect变量
        this.redirect = route.query && route.query.redirect;
      },
      //该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  created() {
    //获取验证码
    this.getCode();
    //尝试获取用户密码等Cookie
    this.getCookie();
    //token过期提示
    this.point();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
      };
    },
    point() {
      const point = Cookies.get("point") !== undefined;
      if (point) {
        this.$notify({
          title: "提示",
          message: "当前登录状态已过期，请重新登录！",
          type: "warning", //success，error
          duration: 5000, //提示显示的时间
        });
        Cookies.remove("point");
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        // console.log(this.$refs);{loginForm: VueComponent}
        // console.log(this.$refs.loginForm);VueComponent {_uid: 5, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
        // console.log(valid);false
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          remeberMe: this.loginForm.remeberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid,
        };
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password);
        }

        if (valid) {
          if (user.remeberMe) {
            Cookies.set("username", user.username, {
              expires: Config.passCookieExpires,
            });
            Cookies.set("password", user.password, {
              expires: Config.passCookieExpires,
            });
            Cookies.set("rememberMe", user.rememberMe, {
              expires: Config.passCookieExpires,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("remeberMe");
          }

          this.$store
            .dispatch("Login", user)
            .then(() => {
              //当未登录访问http://localhost:8013/login时，this.redirect为undifined
              //即使/，最后也会跳到/dashboard
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.getCode();
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
