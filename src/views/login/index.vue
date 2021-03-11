<template>
  <div class="login-view">
    <div class="container">
      <el-container>
        <el-aside width="50%">
          <div class="aside">
            <div class="text">
              <h2 class="lab-title">计算机思维实验室</h2>
              <p class="lab-intro">专注于计算机思维教育</p>
            </div>
            <div class="img-wrapper">
              <el-image :src="require('@/assets/images/1.png')" fit="cover" />
              <!-- <img src="@/assets/images/1.png"> -->
            </div>
          </div>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  }
}
</script>

<style scoped>
body{
  width: 100%;
  overflow-x: hidden;
}

.img-wrapper {
  overflow: hidden;
  flex:1;
}

.el-image{
  height: 100%;
}
.login-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 50%;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.el-container {
  min-width: 500px;
  width: 100%;
  /* box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%); */
}

.el-aside {
  background-color: rgb(3, 187, 122);
}
.aside {
  /* flex: 0 0 50%; */
  background-color: rgb(3, 187, 122);
  height: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.el-container >>> .el-main {
  padding: 0;
}

.lab-title {
  font-weight: 700;
  font-size: 30px;
  color: rgb(255, 255, 255);
  line-height: 45px;
}

.lab-intro {
  font-weight: 400;
  font-size: 20px;
  color: rgb(244, 244, 244);
  line-height: 29px;
}

.text {
  padding: 40px 0 10px 30px;
}

@media screen  and (max-width: 1100px){
   body{
  overflow-x: scroll;
   }
   .container{
     width:550px;
   }
}
</style>
