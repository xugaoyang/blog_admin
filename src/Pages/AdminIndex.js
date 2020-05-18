import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { ProfileOutlined, FileAddOutlined, LogoutOutlined } from '@ant-design/icons';
import '../assets/css/adminIndex.scss'
import ArticleDetail from './ArticleDetail'
import ArticleList from './ArticleList'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function mapStateToProps(state) {
  console.log(state)
  return {
    username: state.username
  };
}

function AdminIndex(props) {
  console.log(props)
  const [collapsed, setCollapsed] = useState(false)
  const [logoUrl, setLogoUrl] = useState(require('../assets/img/logo_default.png'))
  const onCollapse = collapsed => {
    console.log('折叠', collapsed)
    setCollapsed(collapsed)
    collapsed ? setLogoUrl(require('../assets/img/logo_mini.png')) : setLogoUrl(require('../assets/img/logo_default.png'))
  }

  const handleClick = e => {
    console.log(e.item.props)
    if(e.key === '2') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }
  const logout = () => {
    props.history.push('/login')
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img className="logo-img" src={logoUrl} alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClick}>
          <Menu.Item key="1">
            <ProfileOutlined />
            <span>文章列表</span>
          </Menu.Item>
          <Menu.Item key="2">
            <FileAddOutlined />
            <span>添加文章</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="display-flex-end" style={{ background: '#fff', padding: 0 }}>
          <div className="user-set">
            <span className="m-r-10">{props.username}</span>
            <LogoutOutlined className="m-r-20 cursor-pointer" onClick={logout} />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={ArticleList} />
              <Route path="/index/article/" exact component={ArticleDetail} />
              <Route path="/index/article/:id" exact component={ArticleDetail} />
              <Route path="/index/article/:id/:type" exact component={ArticleDetail} />
              <Route path="/index/list/" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>yann blog by react</Footer>
      </Layout>
    </Layout>
  );
  
}

// export default AdminIndex
export default connect(mapStateToProps)(AdminIndex)