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
          <el-date-picker v-model="date1" type="date" placeholder="选择日期" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="date2" type="fixed-time" placeholder="选择时间" style="width: 100%;" value-format="hh:mm:ss" />
        </el-col>
      </el-form-item>
      <el-form-item label="新闻类别">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item, index) in options.choice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="sortChoice(index)"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="content" style="margin-bottom: 30px;" label="新闻内容">
        <Tinymce id="tinymceId" ref="editor" :height="400" :value="content" name="tinymac" />
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
// import {post} from '@/utils/request1'
export default {
  components: { Tinymce },
  data() {
    return {
      id: 0,
      operate: 0,
      content: '',
      form: {
        id: 0,
        pic: '',
        page: 1
      },
      // options: {
      //   value: '',
      //   choice: [{
      //     value: '选项1',
      //     label: '实验室新闻'
      //   }, {
      //     value: '选项2',
      //     label: '国内动态-国内信息化教育'
      //   }, {
      //     value: '选项3',
      //     label: '国内动态-国内实时活动资讯'
      //   }, {
      //     value: '选项4',
      //     label: '国外动态'
      //   }
      //   ]
      // },
      // type: ['实验室新闻', '国内动态-国内信息化教育', '国内动态-国内实时活动资讯', '国外动态'],
      // value: '',
      // date1: '',
      // date2: '',
      time: '',
      tinymceId: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.operate = this.$route.query.operate
    const that = this
    if (this.operate === 2) {
      this.$axios
        .get('http://localhost:8083/carousel/carouselgiveID?id=' + this.id)
        .then(function(response) {
          that.form = response.data
          that.value = that.type[that.form.sort]
          that.time = that.form.time
          that.date1 = that.time.substr(0, 10)
          that.date2 = that.time.substr(11, 8)
          that.content = that.form.content
        })
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    sortChoice(index) {
      this.form.sort = index
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.go(-1)
    },
    getValue(value) {
      switch (value) {
        case '选项1':
          this.form.sort = 0
          break
        case '选项2':
          this.form.sort = 1
          break
        case '选项3':
          this.form.sort = 2
          break
        case '选项4':
          this.form.sort = 3
          break
        default :
          this.form.sort = 0
          break
      }
    },
    getContent() {
      this.form.content = window.tinymce.get('tinymceId').getContent()
    },
    dataPost() {
      this.$confirm('确认是否编辑完毕?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var that = this
        this.listLoading = true
        if (this.operate === 2) {
          this.form.time = this.date1 + 'T' + this.date2
          this.getValue(this.value)
          this.getContent()
          this.$axios
            .post('http://localhost:8083/News/UpdataID', this.form)
            .then(function(response) {
              // that.message = response.data
              that.listLoading = false
            })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.form.time = this.date1 + 'T' + this.date2
          this.getValue(this.value)
          this.getContent()
          this.$axios
            .post('http://localhost:8083/News/AddID', this.form)
            .then(function(response) {
              // that.message = response.data
              that.listLoading = false
            })
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
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

