<template>
  <div class="app-container">
    <router-link
      :to="{
        path: '/lab/character/createform',
        query: {
          id: 0,
          operate: 0
        }
      }"
    >
      <div align="right"><el-button type="success">新建成员</el-button></div>
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
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成员ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名及出生地" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="身份" width="80">
        <template slot-scope="scope">
          {{ IdenType[scope.row.identity] }}
          <!-- {{ scope.row.identity }} -->
        </template>
      </el-table-column>
      <el-table-column label="重要程度" width="80" align="center">
        <template slot-scope="scope">
          {{ AreaType[scope.row.area] }}
          <!-- <span>{{ scope.row.area }}</span> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="简介" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column> -->
      <el-table-column label="电话" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column label="email" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="现任" align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <router-link
            :to="{
              path: '/lab/character/form/' + row.id,
              query: {
                id: row.id,
                operate: 2
              }
            }"
          >
            <el-button type="primary" size="mini">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row,$index, row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-if="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getMemberList } from '@/api/table'
import Pagination from '@/components/Pagination'
// import { getList } from '@/api/table'
export default {
  components: { Pagination },
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
      total: 0,
      list: null,
      listLoading: true,
      message: [
        {
          id: 0,
          name: '',
          content: '',
          identity: '',
          tel: '',
          email: '',
          role: '',
          area: ''
        }
      ],
      IdenType: ['老师', '学生'],
      AreaType: ['重要', '普通'],
      warn: '',
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    // this.fetchData()
    this.listLoading = true
    this.getList()
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },
    getList() {
      getMemberList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.data.total
        this.message = res.data.data.result
      })
    },
    editNews(id) {
      console.log(id)
      this.$router.push('/lab/character/form/' + id)
    },
    creatNews() {
      this.$router.push('/lab/character/createform')
    },
    handleDelete(index, row, id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var that = this
          this.listLoading = true
          this.$axios
            .get('http://localhost:8083/member/memberDeleteID?id=' + id)
            .then(function(response) {
              that.message = response.data
              that.listLoading = false
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
