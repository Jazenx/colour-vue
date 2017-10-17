import fetch from '@/utils/fetch'

export function addKeywords(keywords, validity, updatetime, submitor, location, wordstate, classify) {
  return fetch({
    url: 'graylist/banned/addkeywords',
    method: 'post',
    data: {
      keywords, // 关键词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate, // 状态
      classify
    }
  })
}


export function getKeywords(query) {
  return fetch({
    url: 'graylist/banned/getkeywords',
    method: 'get',
    params: query
  })
}

export function updateKeywords(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'graylist/banned/updatekeywords',
    method: 'post',
    data: {
      id, // 编号
      keywords, // 关键词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location // 范围
    }
  })
}

export function changeKeywordsStatus(id, wordstate) {
  return fetch({
    url: 'graylist/banned/changekeywordstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}



export function deleteKeywords(keywordsID) {
  return fetch({
    url: 'graylist/banned/deletekeywords',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function deleteContacts(keywordsID) {
  return fetch({
    url: 'graylist/banned/deletecontacts',
    method: 'post',
    data: {
      keywordsID
    }
  })
}