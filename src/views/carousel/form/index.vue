<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="轮播图描述">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="轮播图编号">
            <el-input v-model="form.number" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line" />
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
      <el-form-item label="轮播图图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :class="{ hide: hideUp}"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Tinymce from '@/components/Tinymce'
export default {
  // components: { Tinymce },
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
          label: '计算机思维'
        }, {
          value: '选项2',
          label: '当前咨询'
        }],
        value: ''
      },
      dialogImageUrl: '',
      tinymceId: '',
      dialogVisible: false,
      disabled: false,
      hideUp: true,
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
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
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
            .post('http://localhost:8083/Carousel/UpdataID', this.form)
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
            .post('http://localhost:8083/Carousel/AddID', this.form)
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

