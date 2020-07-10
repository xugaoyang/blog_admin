import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../assets/css/addArticle.scss'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import api from '../api/index'

const { Option } = Select;
const { TextArea } = Input

function ArticleDetail(props) {
  const [articleType, setArticleType] = useState(props.match.params.type)
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // eslint-disable-next-line
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectedType] = useState('') //选择的文章类别

  console.log('当前文章类型', articleType)
  
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 
  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html=marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html=marked(e.target.value)
    setIntroducehtml(html)
  }

  useEffect(() => {
    getTypeInfo()
    let tmpId = props.match.params.id
    if(tmpId){
      setArticleId(tmpId)
      getArticleById(tmpId)
    } 
  },[props.history, props.match.params.id])
  
  const selectTypeHandler = (value) => {
    console.log(value)
    setSelectedType(value)
  }
  const getTypeInfo = async () => {
    const res = await api.article.getArticleTypes()
    if (res.data.data === '没有登陆') {
      localStorage.removeItem('openId')
      props.history.push('/login')
    } else {
      setTypeInfo(res.data.data)
    }
  }
  const saveArticle = async () => {
    console.log('selectedType', selectedType)
    if (!selectedType) {
      message.error('必须选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('文章简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    let dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd
    }
    const datetxt = showDate.replace('-', '/')
    dataProps.addTime = (new Date(datetxt).getTime()) / 1000

    if (articleId === 0) {
      console.log('articleId=:', articleId)
      dataProps.view_count = Math.ceil(Math.random()*100) + 1000
      const res = await api.article.addArticle(dataProps)
      if (res.data.isSuccess) {
        setArticleId(res.data.insertId)
        message.success('文章保存成功')
      } else {
        message.success('文章保存失败')
      }
    } else {
      dataProps.id = articleId
      const res = await api.article.updateArticle(dataProps)
      if (res.data.isSuccess) {
        message.success('文章保存成功')
      } else {
        message.success('文章保存失败')
      }
    }
  }

  const getArticleById = async (id) => {
    const res = await api.article.articleDetail({id})
    if (res && res.status === 200) {
      let articleInfo = res.data.data[0]
      setArticleTitle(articleInfo.title)
      setArticleContent(articleInfo.article_content)
      let html = marked(articleInfo.article_content)
      setMarkdownContent(html)
      setIntroducemd(articleInfo.introduce)
      let tmpInt = marked(articleInfo.introduce)
      setIntroducehtml(tmpInt)
      setShowDate(articleInfo.addTime)
      setSelectedType(articleInfo.typeId)
    }
  }

  return (
    <div>
      <Row gutter={5} jusitify='space-between' align="center" style={{marginBottom: 10}}>
        <Col span={10}>
          <Input value={articleTitle} placeholder="博客标题" size="large" onChange={e=>{setArticleTitle(e.target.value)}} disabled={articleType !== 'update'} />
        </Col>
        <Col span={4}>
          <Select placeholder='输入文章类型' size="large" onChange={selectTypeHandler} style={{ width: '100%' }} disabled={articleType !== 'update'}>
            {
              typeInfo.map((item, index) => {
                return (
                <Option key={index} value={item.id}>{item.typeName}</Option>
                )
              })
            }
          </Select>
        </Col>
        <Col span={4}>
            <DatePicker
              style={{width: '100%'}}
              defaultValue={showDate}
              onChange={(date, dateString) => setShowDate(dateString)}
              placeholder="发布日期"
              size="large"
              disabled={articleType !== 'update'}
            />
        </Col>
        <Col span={6}>
        {
          articleType === 'update' &&
          <Row justify="end">
            <Button size="large">暂存文章</Button>&nbsp;
            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
          </Row>
        }
        </Col>
      </Row>
      <Row gutter={5} style={{height: 100, marginBottom: 10}}>
        <Col span={12}>
          <TextArea 
              style={{height: '100%'}}
              placeholder="文章简介"
              value={introducemd}
              onChange={changeIntroduce}
              onPressEnter={changeIntroduce}
              disabled={articleType !== 'update'}
          />
        </Col>
        <Col span={12}>
          <div
            style={{height: '100%', overflow: 'auto'}}
            className="introduce-html"
            dangerouslySetInnerHTML={{__html:'文章简介：'+introducehtml}}>
          </div>
        </Col>
      </Row>
      <Row gutter={5} style={{height: 500, marginBottom: 10}}>
        <Col span={12} style={{height: '100%'}}>
          <TextArea
            style={{height: '100%'}}
            value={articleContent}
            onChange={changeContent}
            onPressEnter={changeContent}
            className="markdown-content"
            rows={20}
            placeholder="文章内容"
            disabled={articleType !== 'update'}
          />
        </Col>
        <Col span={12} style={{height: '100%'}}>
          <div
            style={{height: '100%', overflow: 'auto'}}
            className="show-html"
            dangerouslySetInnerHTML={{__html:markdownContent}}>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ArticleDetail