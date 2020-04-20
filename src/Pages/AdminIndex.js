import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { PieChartOutlined, UserOutlined, FileOutlined } from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import {Route} from 'react-router-dom'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [logoUrl, setLogoUrl] = useState(require('../static/img/logo_default.png'))
  const onCollapse = collapsed => {
    console.log('折叠', collapsed);
    setCollapsed(collapsed)
    collapsed ? setLogoUrl(require('../static/img/logo_mini.png')) : setLogoUrl(require('../static/img/logo_default.png'))
  };

  const handleClickArticle = e => {
    console.log(e.item.props)
    if(e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img className="logo-img" src={logoUrl} alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <FileOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list/" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>yann blog by react</Footer>
      </Layout>
    </Layout>
  );
  
}

export default AdminIndex