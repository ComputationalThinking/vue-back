<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="成员编号">
            <el-input v-model="form.number" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line" />
        <el-col :span="11">
          <el-form-item label="出生地">
            <el-input v-model="form.author" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="职业">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="就读/毕业学校">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="学校地址">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form.title" type="email" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="生涯">
          <Tinymce ref="editor" :height="400" />
        </el-form-item>
        <el-form-item label="获奖">
          <Tinymce ref="editor" :height="400" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-form></div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        number: '',
        date1: '',
        date2: '',
        author: '',
        options: [{
          value: '选项1',
          label: '老师'
        }, {
          value: '选项2',
          label: '学生'
        }],
        value: ''
      },
      imageUrl: ''
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

