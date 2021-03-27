import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8083', // 基准位置
  timeout: 5000
})

export default service
