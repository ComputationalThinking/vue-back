<template>
  <div class="password-container">
    <el-card>
      <div class="title">
        <div class="title-container">
          <h2>重置密码</h2>
        </div>
      </div>
      <div class="form-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="password-form" auto-complete="on" label-position="left">
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
              :key="passwordType"
              ref="password"
              v-model="loginForm.vercode"
              :type="passwordType"
              placeholder="验证码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            ><el-button slot="append" type="success" round>
              获取验证码
            </el-button></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <!-- <span class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
            <el-input
              ref="username"
              v-model="loginForm.password"
              placeholder="新密码"
              name="password"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-form>
        <el-button :loading="loading" type="primary" round style="width:80%;margin-bottom:30px;" class="confirm" @click.native.prevent="handleLogin">确定</el-button>
        <p class="footer-text">已有账号?<router-link to="/login/userlogin">马上登录</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        vercode: '111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>
<style scoped>
.el-card{
  height: 550px;
}

.form-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top:40px ;
}

.title{
  display: flex;
  padding: 80px 0 0 0;
  justify-content: center;
  position: relative;
}

.title-container h2{
  font-weight: 400;
  font-size: 18px;
  position: relative;
}

.title-container h2::after{
  content:'';
  display: block;
  width:35px;
  position: absolute;
  left:25%;
  top:25px;
  border-bottom:2px solid rgb(3, 187, 122);

}

.password-container .password-form{
  position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 0 0;
    margin: 0 auto;
    overflow: hidden;
}

.footer-text{
  font-size: 12px;
  color: rgb(102, 102, 102);
}

.footer-text a{
  color: rgba(3, 187, 122, 1);
  padding-left: 5px;
}

.confirm{
  margin-top: 40px;
}
</style>
