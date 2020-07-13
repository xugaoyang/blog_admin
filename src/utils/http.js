/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import { message } from 'antd'
import store from '../store/index'


/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // router.replace({
  //     path: '/login',        
  //     query: {
  //         redirect: router.currentRoute.fullPath
  //     }
  // })
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message('登录过期，请重新登录')
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      message('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

const instance = axios.create({ timeout: 1000 * 10 })

// 设置接口域名，可能多方接入，暂时在api里面写入域名
// instance.defaults.baseURL = process.env.REACT_APP_API_SERVER

// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    console.log('config123123', config)
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    // 登录之后才需要验证token,获取登陆的状态再判断
    return config
  },
  error => {
    console.log(Promise.error(error))
    return Promise.error(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 服务器状态码不是200的情况    
  error => {
    const { response } = error
    if (response && response.status) {
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    }
  }
)

export default instance