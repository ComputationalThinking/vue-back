<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="路径">
        <el-input v-model="form.pic" />
      </el-form-item>
      <el-form-item label="page">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item, index) in options.choice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="pageChoice(index)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.content" />
      </el-form-item>
      <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
      <el-form-item>
        <el-upload
          list-type="picture-card"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :action="uploadImgServer"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :limit="imgLimit"
          :on-exceed="handleExceed"
          :file-list="fileListFront"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit, dataPost()">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      id: 0,
      operate: 0,
      form: {
        id: 0,
        pic: '',
        page: 0,
        content: ''
      },
      options: {
        value: '',
        choice: [{
          value: '选项1',
          label: 1
        }, {
          value: '选项2',
          label: 2
        }
        ]
      },
      PageType: [1, 2],
      value: '',
      dialogImageUrl: '',
      dialogVisible: false,
      uploadImgServer: 'http://localhost:8083/carousel/AddImg',
      imgLimit: 1, // 上传照片数
      fileListFront: [] // 照片列表
    }
  },
  created() {
    this.id = this.$route.query.id
    this.operate = this.$route.query.operate
    const that = this
    if (this.operate === 2) {
      this.$axios
        .get('http://localhost:8083/carousel/giveID?id=' + this.id)
        .then(function(response) {
          that.form = response.data
          that.form.page = that.form.page - 1
          that.value = that.PageType[that.form.page]
          // that.content = that.form.content
        })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      // // var code = store.state.shop_code
      // const fd = new FormData()
      // fd.append('picFile', file)
      // // fd.append('shop_code', code)
      const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('仅支持jpg，png格式的图片！')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      console.log('file')
      console.log(file)
      console.log(URL.createObjectURL(file.raw))
      this.fileListFront.push(file)
    },
    handleExceed() {
      this.$message.error(`只能选择${this.imgLimit}个文件`)
    },
    onSubmit() {
      this.$message('submit!')
    },
    pageChoice(index) {
      this.form.page = index
    },
    getValue(value) {
      switch (value) {
        case '选项1':
          this.form.page = 1
          break
        case '选项2':
          this.form.page = 2
          break
        // default :
        //   this.form.identity = 1
        //   break
      }
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
          // this.form.time = this.date1 + 'T' + this.date2
          this.getValue(this.value)
          this.$axios
            .post('http://localhost:8083/carousel/UpdataID', this.form)
            .then(function(response) {
              // that.message = response.data
              that.listLoading = false
            })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          // this.form.time = this.date1 + 'T' + this.date2
          this.getValue(this.value)
          this.$axios
            .post('http://localhost:8083/carousel/AddID', this.form)
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
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

