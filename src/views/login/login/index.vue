
<template>
  <div class="login-container">
    <el-card>
      <div class="option">
        <div v-for="(option,index) in options" :key="option" class="option-text-container" :class="{active: currentIndex === index }">
          <el-button type="text" class="option-text" @click="handleOption(option,index)">{{ option }}</el-button>
        </div>
      </div>
      <div class="form-container">
        <template v-if="isPassword">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <!-- <span class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="手机号/账号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <!-- <span class="svg-container">
              <svg-icon icon-class="password" />
            </span> -->
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <!-- <span class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="手机号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <!-- <span class="svg-container">
              <svg-icon icon-class="password" />
            </span> -->
              <el-input
                :key="1"
                ref="password"
                v-model="loginForm.password"
                type="text"
                placeholder="验证码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              ><el-button slot="append" type="success" round>
                获取验证码
              </el-button>
              </el-input>
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span> -->
            </el-form-item>

            <div class="tips">
              <span style="margin-right:20px;">username: admin</span>
              <span> password: any</span>
            </div>

          </el-form>
        </template>
        <div class="forget">
          <router-link to="/login/userpassword">忘记密码</router-link>
        </div>
        <el-button :loading="loading" type="primary" round style="width:80%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        <p class="footer-text">没有账号?<router-link to="/login/userregister">立即注册</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      options: ['密码登录', '验证码登录'],
      isPassword: true,
      currentIndex: 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleOption(option, index) {
      this.currentIndex = index
      if (option === '密码登录') {
        this.isPassword = true
      } else {
        this.isPassword = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }
/* reset element-ui css */
.login-container {
  // .el-input {
  //   display: inline-block;
  //   height: 47px;
  //   width: 85%;
  //   input {
  //     background: transparent;
  //     border: 0px;
  //     -webkit-appearance: none;
  //     border-radius: 0px;
  //     padding: 12px 5px 12px 15px;
  //     color: $light_gray;
  //     height: 47px;
  //     caret-color: $cursor;
  //     &:-webkit-autofill {
  //       box-shadow: 0 0 0px 1000px $bg inset !important;
  //       -webkit-text-fill-color: $cursor !important;
  //     }
  //   }
  // }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 0 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<style scoped>
.option{
  display: flex;
  padding: 80px 0 0 0;
  justify-content:space-evenly
}

.el-card{
  height: 550px;
}

.form-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.option-text{
  font-weight: 400;
  font-size: 18px;
  color: rgba(153, 153, 153, 1);
}

.option-text-container{
  position: relative;
}
.active .el-button{
  color: rgb(16, 16, 16);
}

.active::after{
  content:'';
  display: block;
  width:35px;
  position: absolute;
  left:25%;
  border-bottom:2px solid rgb(3, 187, 122);
}

.form-container{
  padding-top:40px ;
}

.forget{
  align-self: flex-end;
  padding-bottom: 40px;
}

.forget a{
  font-size: 12px;
  color: rgba(102, 102, 102, 1);
}

.footer-text{
  font-size: 12px;
  color: rgb(102, 102, 102);
}

.footer-text a{
  color: rgba(3, 187, 122, 1);
  padding-left: 5px;
}
</style>
