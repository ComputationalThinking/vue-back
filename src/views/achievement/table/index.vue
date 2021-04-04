<template>
  <div class="app-container">
    <router-link
      :to="{
        path: '/achievement/createform',
        query: {
          id: 0,
          operate: 0
        }
      }"
    >
      <div align="right"><el-button type="success">创建成果介绍</el-button></div>
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
      <el-table-column align="center" label="成果ID" width="130">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="成果标题描述" width="160">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="成果参与者" width="260">
        <template slot-scope="scope">
          {{ scope.row.participantMember }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成果类别" width="180" align="center">
        <template slot-scope="scope">
          {{ type[scope.row.sort] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <router-link
            :to="{
              path: '/achievement/form/' + row.id,
              query: {
                id: row.id,
                operate: 2
              }
            }"
          >
            <el-button type="primary" size="mini">编辑</el-button>
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
import { getAchieveList } from '@/api/table'
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
      list: [
        {
          id: 0,
          title: '',
          content: '',
          time: '',
          hot: '',
          sort: '',
          achieveName: '',
          participantMember: ''
        }
      ],
      listLoading: true,
      warn: '',
      type: ['国内外赛事', '科研成果', '涉及领域', '应用实例'],
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
      getAchieveList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.data.total
        this.list = res.data.data.result
      })
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
            .get('http://localhost:8083/achieve/deleteID?id=' + id)
            .then(function(response) {
              that.list = response.data
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
