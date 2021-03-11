<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item style="margin-bottom: 30px;" label="人才需求">
        <Tinymce ref="editor" :height="400" />
      </el-form-item>
      <el-form-item style="margin-bottom: 30px;" label="研究方向">
        <Tinymce ref="editor" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
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
          label: '实验室新闻'
        }, {
          value: '选项2',
          label: '国内动态'
        }, {
          value: '选项3',
          label: '国外动态'
        }],
        value: ''
      }
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
