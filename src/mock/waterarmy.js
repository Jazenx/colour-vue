import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // location: ['@city(true)', '@city(true)'],
    location: '@cname 、@cname',
    username: '@cname',
    validity: Mock.Random.date() + '至' + Mock.Random.date(),
    'reply_suspicion|1': [0, 1],
    'thread_suspicion|1': [0, 1, 2, 3],
    'behavior_suspicion|1': [0, 1],
    'mark_suspicion|1': [0, 1],
    'ip_suspicion|1': [0, 1],
    'mark_banned|1': [0, 1],
    'mistake_flag|1': [0, 1],
    'userstate|1': [0, 1],
    submitor: '@cname',
    updatetime: '@datetime',
    id: '@increment',
    classify: '@cname',
    authorid: '@id'
  }))
}

const List2 = []
const count2 = 3

for (let i = 0; i < count2; i++) {
  List2.push(Mock.mock({
    // location: ['@city(true)', '@city(true)'],
    location: '@cname 、@cname',
    username: '@cname',
    replydate: Mock.Random.date(),
    'flag|1': [0, 1],
    url: '@url',
    'reply_suspicion|1': [0, 1],
    'thread_suspicion|1': [0, 1, 2, 3],
    'behavior_suspicion|1': [0, 1],
    'mark_suspicion|1': [0, 1],
    'ip_suspicion|1': [0, 1],
    'mark_banned|1': [0, 1],
    'mistake_flag|1': [0, 1],
    'userstate|1': [0, 1],
    submitor: '@cname',
    updatetime: '@datetime',
    id: '@increment',
    classify: '@cname',
    authorid: '@id',
    author: '@id',
    content: '<div class=\"relyhf\"><div class=\"qmhfimg\"></div><div class=\"relyhfcon\"><p><a href=\"http://i.autohome.com.cn/13041327/home.html\" target=\"_blank\">順齊自然2014</a> 2017/11/01 10:31:45 发表在 <a href=\"http://club.autohome.com.cn/bbs/thread-c-4133-68008228-6.html#115\">115楼 </a></p><p class=\"rrlycontxt\">我拍的细节也不行r a v ⒋ -З б你得就r a v ⒋ -З б算了  遭罪r a v ⒋ -З б看吧</p></div><div class=\"relyhfimg\"></div></div><div class=\"yy_reply_cont\"><div layer1=\"text-s\"></div>你已经很优秀了，无需这么苛刻要求自己<div layer1=\"text-e\"></div></div>',
    thread: '@id'
  }))
}




export default {
  getList: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 10,
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
      items: pageList,
      code: 8000
    }
  },
  getPostList: config => {
    const {
      importance,
      type,
      title,
      page = 1,
      limit = 10,
      sort
    } = param2Obj(config.url)

    let mockList = List2.filter(item => {
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
      items: pageList,
      code: 8000
    }
  }
}
