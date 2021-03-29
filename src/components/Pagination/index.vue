<template>
  <div class="pagination-container">
    <el-pagination
      :total="total"
      :page-size.sync="limit"
      :layout="layout"
      :background="background"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    total: {
      required: true,
      type: Number
    },
    limit: {
      type: Number,
      default: 5
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },

  methods: {
    handlePageChange(val) {
      this.$emit('pagination', { pageNum: val, pageSize: this.limit })
    }
  }
}
</script>

<style scoped>

</style>
