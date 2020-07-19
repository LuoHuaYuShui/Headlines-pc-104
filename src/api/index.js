// axios的配置，并导出配置好的axios
import axios from 'axios'
import auth from '@/utils/auth'

// 进行axios的配置
// 1.基准地址配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 2.请求头配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 给请求头追加 token（每次请求前都会做，拿到存储的token）
    config.headers.Authorization = `Bearer ${auth.getUser().token}`

    return config;
}, error => Promise.reject(error));


export default axios