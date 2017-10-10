import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return fetch({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return fetch({
    url: '/article/pv',
    method: 'get',
    params: {
      pv
    }
  })
}


export function addKeywords(keywords, validity, updatetime, submitor, location, wordstate) {
  return fetch({
    url: 'blacklist/banned/addkeywords',
    method: 'post',
    data: {
      keywords, // 关键词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate // 状态
    }
  })
}


export function getKeywords(query) {
  return fetch({
    url: 'blacklist/banned/getkeywords',
    method: 'get',
    params: query
  })
}

export function searchKeywords(searchKeyword, searchLocation, searchWordstate, query) {
  return fetch({
    url: 'blacklist/banned/searchkeywords',
    method: 'get',
    params: {
      searchKeyword,
      searchLocation,
      searchWordstate,
      query
    }
  })
}



export function updateKeywords(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'blacklist/banned/updatekeywords',
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
    url: 'blacklist/banned/changekeywordstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}


export function deleteKeywords(keywordsID) {
  return fetch({
    url: 'blacklist/banned/deletekeywords',
    method: 'post',
    data: keywordsID
  })
}
