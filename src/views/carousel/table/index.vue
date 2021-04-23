<template>
  <div class="app-container">
    <router-link
      :to="{
        path: '/carousel/createform',
        query: {
          id: 0,
          operate: 0
        }
      }"
    >
      <div align="right"><el-button type="success">新建轮播图</el-button></div>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="轮播图编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="轮播图路径" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.pic }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="轮播图页码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.page }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row , $index }">
          <router-link
            :to="{
              path: '/carousel/form/' + row.id,
              query: {
                id: row.id,
                operate: 2
              }
            }"
          >
            <el-button
              type="primary"
              size="mini"
            >
              编辑
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row, $index, row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-if="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getCarouselList } from '@/api/table'
import Pagination from '@/components/Pagination'
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
          pic: '',
          page: ''
        }
      ],
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.listLoading = true
    this.getList()
  },
  methods: {
    getList() {
      getCarouselList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.data.total
        this.message = res.data.data.result
      })
    },
    editNews(id) {
      console.log(id)
      this.$router.push('/carousel/form/' + id)
    },
    creatNews() {
      this.$router.push('/carousel/createform')
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
            .get('http://localhost:8083/Carousel/carouselDeleteID?id=' + id)
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
