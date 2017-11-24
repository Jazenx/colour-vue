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
    validity: Mock.Random.date() + '至' + Mock.Random.date(),
    'reply_suspicion|1': [0, 1],
    'thread_suspicion|1': [0, 1, 2, 3],
    'behavior_suspicion|1': [0, 1],
    'mark_suspicion|1': [0, 1],
    'ip_suspicion|1': [0, 1],
    'mark_banned|1': [0, 1],
    'mistake_flag|1': [0, 1],
    submitor: '@cname',
    updatetime: '@datetime',
    id: '@increment',
    classify: '@cname',
    authorid: '@ip',
    adsnoun: Mock.Random.cword(2, 4),
    adsverb: Mock.Random.cword(2, 4),
    keyword: Mock.Random.cword(2, 8)
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
  }
}
