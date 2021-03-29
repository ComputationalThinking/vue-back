<template>
  <div class="app-container">
    <router-link
      :to="{
        path: '/news/createform',
        query: {
          id: 0,
          operate: 0
        }
      }"
    >
      <div align="right"><el-button type="success">创建新闻</el-button></div>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="message"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="新闻ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="新闻标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="新闻作者" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="新闻类别" width="180" align="center">
        <template slot-scope="scope">
          {{ type[scope.row.sort] }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link
            :to="{
              path: '/news/form/'+row.id,
              query: {
                id: row.id,
                operate: 2
              }
            }"
          >
            <el-button type="primary" size="mini">
              编辑
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index,row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="9" @pagination="getList" />
  </div>
</template>

<script>
// import { getList } from '@/api/table'
// import { get } from '@/utils/request1'
export default {
  // components: {
  //   Pagination
  // },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      message: [
        {
          id: 0,
          title: '',
          content: '',
          time: '',
          author: '',
          sort: ''
        }
      ],
      type: ['实验室动态', '国内信息化教育动态', '国内动态', '国外动态'],
      warn: ''
    }
  },
  created() {
    // this.fetchData()
    this.listLoading = true
    var that = this
    this.$axios
      .get('http://localhost:8083/News/FindAll')
      .then(function(response) {
        that.message = response.data
        that.listLoading = false
      })
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     // this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },
    editNews(id) {
      console.log(id)
      this.$router.push('/news/form/' + id)
    },
    creatNews() {
      this.$router.push('/news/createform')
    },
    handleDelete(index, row, id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var that = this
        this.listLoading = true
        this.$axios
          .get('http://localhost:8083/News/DeleteID?id=' + id)
          .then(function(response) {
            that.message = response.data
            that.listLoading = false
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
