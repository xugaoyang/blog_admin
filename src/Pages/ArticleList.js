import React, { useState, useEffect } from 'react'
import {  Modal, message, Button, Table } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const {confirm} = Modal

function ArticleList(props) {
  const [list, setList] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then(res => {
      if (res.data.data === '没有登陆') {
        localStorage.removeItem('openId')
        props.history.push('/login')
      } else {
        const articleList = res.data.list
        articleList.map((item) => {
          return Object.assign(item, {
            key: item.id
          })
        })
        console.log('文章列表',articleList)
        setList(articleList)
      }
    }) 
  }, [props.history])
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then(res => {
      if (res.data.data === '没有登陆') {
        localStorage.removeItem('openId')
        props.history.push('/login')
      } else {
        const articleList = res.data.list
        articleList.map((item) => {
          return Object.assign(item, {
            key: item.id
          })
        })
        console.log('文章列表',articleList)
        setList(articleList)
      }
    })
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
          <Button onClick={() => updateArticle(record.id)} type="primary" style={{marginRight: '5px'}}>修改</Button>
          <Button onClick={() => deleteArticle(record.id)}>删除</Button>
        </div>
      )
    },

  ]

  const deleteArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗？',
      content: '如果你点击ok文章将会永远删除',
      onOk() {
        axios(servicePath.deleteArticle+id, {withCredentials: true}).then(res=> {
          message.success('文章删除成功')
          getList()
        })
      },
      onCancel() {
        message.success('取消删除')
      }
    })
  }

  const updateArticle = (id) => {
    props.history.push(`/index/add/${id}`)
  }
  return (
    <div>
      {/* <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <h4>标题</h4>
            </Col>
            <Col span={3}>
              <h4>类别</h4>
            </Col>
            <Col span={3}>
              <h4>发布时间</h4>
            </Col>
            <Col span={3}>
              <h4>浏览量</h4>
            </Col>
            <Col span={4}>
              <h4>操作</h4>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={3}>
                {item.typeName}
              </Col>
              <Col span={3}>
                {item.addTime}
              </Col>
              <Col span={3}>
                共{item.part_count}集
              </Col>
              <Col span={3}>
                {item.view_count}
              </Col>
              <Col span={4}>
                <Button type="primary">修改</Button>
                <Button >删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      /> */}

      <Table dataSource={list} columns={columns} />
    </div>

  )
}

export default ArticleList