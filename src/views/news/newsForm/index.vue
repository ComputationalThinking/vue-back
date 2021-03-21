<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="新闻编号">
            <el-input v-model="form.number" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line" />
        <el-col :span="11">
          <el-form-item label="新闻作者">
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
      <el-form-item label="新闻类别">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="content" style="margin-bottom: 30px;" label="新闻内容">
        <Tinymce ref="editor" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit, dataPost()">确定</el-button>
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
          label: '国内动态-国内信息化教育'
        }, {
          value: '选项3',
          label: '国外动态-国内实时活动资讯'
        }, {
          value: '选项4',
          label: '国外动态'
        }],
        value: ''
      },
      message: ''
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
    dataPost() {
      var that = this
      this.$axios
        .post('http://localhost:8083/News/informationGet', that.form)
        .then(function(response) {
          that.message = response.data
          alert(response.data)
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

