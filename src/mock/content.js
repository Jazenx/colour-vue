import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'

const List = []
const count = 1000
const count2 = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // location: ['@city(true)', '@city(true)'],
    rowkey: '@id',
    pid: '@id', // 帖子id
    userid: '@id',
    username: '@cname 傻逼', // 用户姓名
    threadid: '@id', // 主题id
    ip: '@ip',
    'state|1': ['待审核', '已通过'],
    'location|1': ['主贴', '回帖'],
    subtime: '@time',
    submitor: '@cname', // 操作者姓名
    'submitor|1': [null, '@cname'],
    title: '@ctitle',
    url: '@url',
    keyword: '草泥马&傻逼',
    content: '草泥马@cparagraph()草泥马@cparagraph()傻逼@cparagraph()',
    'wordtype|1': ['低俗信息', '涉政信息', '黄色信息', '广告信息'],
    judgedetail: '@cword(3, 8)', // 详细判断信息
    'optinfo|1': [0, 1, 2, 3] // 操作信息 对应通过删除忽略
  }))
}

const ipList = []


for (let i = 0; i < count2; i++) {
  const xlist = [];
  for (let i = 0; i < count2; i++) {
    xlist.push(Mock.mock({
      // location: ['@city(true)', '@city(true)'],
      rowkey: '@id',
      pid: '@id', // 帖子id
      userid: '@id',
      username: '@cname', // 用户姓名
      threadid: '@id', // 主题id
      ip: '@ip',
      'state|1': ['待审核', '已通过'],
      'location|1': ['主贴', '回帖'],
      subtime: '@time',
      submitor: '@cname', // 操作者姓名
      'submitor|1': [null, '@cname'],
      title: '@ctitle',
      url: '@url',
      keyword: '草泥马',
      content: '草泥马@cparagraph()草泥马',
      'wordtype|1': ['低俗信息', '涉政信息', '黄色信息', '广告信息'],
      judgedetail: '@cword(3, 8)', // 详细判断信息
      'optinfo|1': [0, 1, 2, 3] // 操作信息 对应通过删除忽略
    }))
  }
  ipList.push(Mock.mock({
    total: 5,
    ip: '@ip',
    // username: '@cname',
    rowlist: xlist
  }))
}



const idList = []


for (let i = 0; i < count2; i++) {
  const xlist = [];
  for (let i = 0; i < count2; i++) {
    xlist.push(Mock.mock({
      // location: ['@city(true)', '@city(true)'],
      rowkey: '@id',
      pid: '@id', // 帖子id
      userid: '@id',
      username: '@cname傻逼', // 用户姓名
      threadid: '@id', // 主题id
      ip: '@ip',
      'state|1': ['待审核', '已通过'],
      'location|1': ['主贴', '回帖'],
      subtime: '@time',
      submitor: '@cname', // 操作者姓名
      'submitor|1': [null, '@cname'],
      title: '@ctitle',
      url: '@url',
      keyword: '草泥马',
      content: '草泥马@cparagraph()草泥马',
      'wordtype|1': ['低俗信息', '涉政信息', '黄色信息', '广告信息'],
      judgedetail: '@cword(3, 8)', // 详细判断信息
      'optinfo|1': [0, 1, 2, 3] // 操作信息 对应通过删除忽略
    }))
  }
  idList.push(Mock.mock({
    total: 5,
    userid: '@id',
    username: '@cname',
    rowlist: xlist
  }))
}


export default {
  getList: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 20,
      sort
    } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getIpList: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 20,
      sort
    } = param2Obj(config.url)

    let mockList = ipList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getIdList: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 20,
      sort
    } = param2Obj(config.url)

    let mockList = idList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
