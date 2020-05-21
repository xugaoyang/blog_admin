/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
  // 新增文章
  addArticle(params) {
    return axios.post(`${base.api}/admin/addArticle`, qs.stringify(params))
  },
  // 删除文章
  deleteArticle(params) {
    return axios.delete(`${base.api}/admin/deleteArticle`, {data: params.id})
  },
  // 修改文章
  updateArticle(params) {
    return axios.post(`${base.api}/admin/updateArticle`, qs.stringify(params))
  },
  // 文章详情
  articleDetail (params) {
    return axios.get(`${base.api}/admin/getArticleById/${params.id}`)
  },
  // 文章列表
  articleList () {
    console.log('1111111111111111')
    return axios.get(`${base.api}/admin/getArticleList`)
  },
  // 文章类型
  getArticleTypes() {
    return axios.get(`${base.api}/admin/getTypeInfo`)
  }
}

export default article
