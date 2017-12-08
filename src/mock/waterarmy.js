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
  },
  getNodes: config => {
    const nodes = [{
      userid: '785137',
      nodeid: '0'
    }, {
      userid: '1260907',
      nodeid: '1'
    }, {
      userid: '1292277',
      nodeid: '2'
    }, {
      userid: '1686180',
      nodeid: '3'
    }, {
      userid: '1699365',
      nodeid: '4'
    }, {
      userid: '2416793',
      nodeid: '5'
    }, {
      userid: '2663845',
      nodeid: '6'
    }, {
      userid: '2787206',
      nodeid: '7'
    }, {
      userid: '3751345',
      nodeid: '8'
    }, {
      userid: '4873499',
      nodeid: '9'
    }, {
      userid: '5594795',
      nodeid: '10'
    }, {
      userid: '8814582',
      nodeid: '11'
    }, {
      userid: '9528780',
      nodeid: '12'
    }, {
      userid: '11008065',
      nodeid: '13'
    }, {
      userid: '13193620',
      nodeid: '14'
    }, {
      userid: '14036731',
      nodeid: '15'
    }, {
      userid: '26223242',
      nodeid: '16'
    }];
    return {
      nodes
    };
  },
  getEdges: config => {
    const edges = [{
      relation: '0.37',
      source: 6,
      target: 9
    }, {
      relation: '0.41',
      source: 7,
      target: 9
    }, {
      relation: '0.31',
      source: 7,
      target: 15
    }, {
      relation: '0.31',
      source: 7,
      target: 8
    }, {
      relation: '0.37',
      source: 2,
      target: 5
    }, {
      relation: '0.30',
      source: 10,
      target: 15
    }, {
      relation: '0.31',
      source: 7,
      target: 15
    }, {
      relation: '0.31',
      source: 7,
      target: 8
    }, {
      relation: '0.39',
      source: 7,
      target: 9
    }, {
      relation: '0.41',
      source: 0,
      target: 7
    }, {
      relation: '0.34',
      source: 0,
      target: 8
    }, {
      relation: '0.33',
      source: 0,
      target: 9
    }, {
      relation: '0.33',
      source: 9,
      target: 15
    }, {
      relation: '0.36',
      source: 6,
      target: 9
    }, {
      relation: '0.39',
      source: 6,
      target: 7
    }, {
      relation: '0.31',
      source: 6,
      target: 15
    }, {
      relation: '0.31',
      source: 0,
      target: 5
    }, {
      relation: '0.36',
      source: 0,
      target: 2
    }, {
      relation: '0.35',
      source: 0,
      target: 2
    }, {
      relation: '0.40',
      source: 2,
      target: 5
    }, {
      relation: '0.34',
      source: 0,
      target: 2
    }, {
      relation: '0.35',
      source: 0,
      target: 2
    }, {
      relation: '0.30',
      source: 1,
      target: 5
    }, {
      relation: '0.35',
      source: 9,
      target: 13
    }, {
      relation: '0.32',
      source: 9,
      target: 15
    }, {
      relation: '0.32',
      source: 5,
      target: 14
    }, {
      relation: '0.32',
      source: 0,
      target: 9
    }, {
      relation: '0.42',
      source: 0,
      target: 7
    }, {
      relation: '0.36',
      source: 0,
      target: 8
    }, {
      relation: '0.32',
      source: 0,
      target: 2
    }, {
      relation: '0.37',
      source: 2,
      target: 5
    }, {
      relation: '0.42',
      source: 0,
      target: 7
    }, {
      relation: '0.32',
      source: 0,
      target: 9
    }, {
      relation: '0.38',
      source: 2,
      target: 5
    }, {
      relation: '0.33',
      source: 4,
      target: 16
    }, {
      relation: '0.33',
      source: 4,
      target: 8
    }, {
      relation: '0.40',
      source: 4,
      target: 9
    }, {
      relation: '0.35',
      source: 4,
      target: 15
    }, {
      relation: '0.31',
      source: 7,
      target: 8
    }, {
      relation: '0.31',
      source: 7,
      target: 11
    }, {
      relation: '0.36',
      source: 2,
      target: 5
    }, {
      relation: '0.38',
      source: 3,
      target: 4
    }, {
      relation: '0.39',
      source: 3,
      target: 15
    }, {
      relation: '0.40',
      source: 3,
      target: 11
    }, {
      relation: '0.31',
      source: 11,
      target: 12
    }, {
      relation: '0.35',
      source: 5,
      target: 14
    }, {
      relation: '0.38',
      source: 0,
      target: 7
    }, {
      relation: '0.38',
      source: 0,
      target: 8
    }, {
      relation: '0.33',
      source: 9,
      target: 10
    }, {
      relation: '0.35',
      source: 6,
      target: 9
    }, {
      relation: '0.36',
      source: 6,
      target: 7
    }, {
      relation: '0.33',
      source: 10,
      target: 15
    }, {
      relation: '0.35',
      source: 5,
      target: 14
    }, {
      relation: '0.31',
      source: 4,
      target: 11
    }, {
      relation: '0.33',
      source: 4,
      target: 15
    }, {
      relation: '0.33',
      source: 0,
      target: 2
    }, {
      relation: '0.33',
      source: 0,
      target: 2
    }, {
      relation: '0.38',
      source: 6,
      target: 7
    }, {
      relation: '0.36',
      source: 6,
      target: 9
    }, {
      relation: '0.35',
      source: 0,
      target: 2
    }, {
      relation: '0.32',
      source: 9,
      target: 13
    }, {
      relation: '0.31',
      source: 9,
      target: 15
    }, {
      relation: '0.31',
      source: 0,
      target: 9
    }, {
      relation: '0.35',
      source: 0,
      target: 2
    }];
    return {
      edges
    }
  }
}
