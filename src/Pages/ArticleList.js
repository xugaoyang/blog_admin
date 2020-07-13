import React, { useState, useEffect } from 'react'
import {  Modal, message, Button, Table } from 'antd'
import api from '../api/index'

const {confirm} = Modal

function ArticleList(props) {
  const [list, setList] = useState([])
  useEffect(() => {
    getList()
  }, [props.history])
  const getList = async () => {
    const res = await api.article.articleList()
    if (res && res.status === 200) {
      const articleList = res.data.list
      articleList.map((item) => {
        return Object.assign(item, {
          key: item.id
        })
      })
      console.log('文章列表',articleList)
      setList(articleList)
    }
    
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '简介',
      dataIndex: 'introduce',
      key: 'introduce',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => (
        <div>
          <Button onClick={() => readArticle(record.id)} style={{marginRight: '5px'}} size="small">查看</Button>
          <Button onClick={() => updateArticle(record.id)} type="primary" style={{marginRight: '5px'}} size="small">修改</Button>
          <Button onClick={() => deleteArticle(record.id)} type="danger" size="small">删除</Button>
        </div>
      )
    },

  ]

  const deleteArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗？',
      content: '如果你点击ok文章将会永远删除',
      async onOk() {
        const res = await api.article.deleteArticle({id})
        if (res && res.status === 200) {
          message.success('文章删除成功')
          getList()
        }
      },
      onCancel() {
        message.success('取消删除')
      }
    })
  }

  const updateArticle = (id) => {
    props.history.push(`/index/article/${id}/update`)
  }
  const readArticle = (id) => {
    props.history.push(`/index/article/${id}`)
  }
  return (
    <div>
      <Table dataSource={list} columns={columns} />
    </div>

  )
}

export default ArticleList