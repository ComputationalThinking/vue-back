<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名及出生地">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- <el-row>
        <el-col :span="11">
          <el-form-item label="成员编号">
            <el-input v-model="form.number" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line" />
        <el-col :span="8">
          <el-form-item label="出生地">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item> -->
      <el-form-item label="身份">
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="(item, index) in options1.choice"
            :key="item.value1"
            :label="item.label"
            :value="item.value1"
            @click="idenChoice(index)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="重要程度">
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="(item, index) in options2.choice"
            :key="item.value2"
            :label="item.label"
            :value="item.value2"
            @click="roleChoice(index)"
          />
        </el-select>
      </el-form-item>
      <el-form ref="form" :model="form" label-width="120px">
        <!-- <el-form-item label="职业">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="就读/毕业学校">
          <el-input v-model="form.title" />
        </el-form-item> -->
        <el-form-item label="现任">
          <el-input v-model="form.role" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form.title" type="email" />
        </el-form-item>
        <!-- <el-form-item>
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
        </el-form-item> -->
        <el-form-item prop="content" label="简介">
          <Tinymce id="tinymceId" ref="editor" :height="400" :value="content" name="tinymac" />
        </el-form-item>
        <!-- <el-form-item label="获奖">
          <Tinymce ref="editor" :height="400" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit, dataPost()">确定</el-button>
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
      content: '',
      id: 0,
      operate: 0,
      form: {
        identity: 0,
        id: 0,
        name: '',
        time: '',
        content: '',
        tel: '',
        email: '',
        // img_boolean: 0,
        // img_src: '',
        role: '',
        area: 0
      },
      options1: {
        value1: '',
        choice: [{
          value1: '选项1',
          label: '老师'
        }, {
          value1: '选项2',
          label: '学生'
        }
        ]
      },
      options2: {
        value2: '',
        choice: [{
          value2: '选项1',
          label: '重要'
        }, {
          value2: '选项2',
          label: '普通'
        }
        ]
      },
      IdenType: ['老师', '学生'],
      AreaType: ['重要', '普通'],
      value1: '',
      value2: '',
      tinymceId: ''
      // imageUrl: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.operate = this.$route.query.operate
    const that = this
    if (this.operate === 2) {
      this.$axios
        .get('http://localhost:8083/member/memberGiveID?id=' + this.id)
        .then(function(response) {
          that.form = response.data
          that.value1 = that.IdenType[that.form.identity]
          that.value2 = that.AreaType[that.form.area]
          // that.time = that.form.time
          // that.date1 = that.time.substr(0, 10)
          // that.date2 = that.time.substr(11, 8)
          that.content = that.form.content
        })
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    idenChoice(index) {
      this.form.identity = index
    },
    roleChoice(index) {
      this.form.identity = index
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
            .post('http://localhost:8083/member/memberUpdataID', this.form)
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
            .post('http://localhost:8083/member/memberAddID', this.form)
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
    }
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // }
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

