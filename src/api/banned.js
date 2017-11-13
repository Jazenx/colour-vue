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


export function addKeywords(keywords, validity, updatetime, submitor, location, wordstate, classify) {
  return fetch({
    url: 'blacklist/banned/addkeywords',
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


export function addContacts(keywords, validity, updatetime, submitor, location, wordstate, classify) {
  return fetch({
    url: 'blacklist/banned/addcontacts',
    method: 'post',
    data: {
      keywords, // 联系方式
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate, // 状态
      classify // 分类
    }
  })
}

export function addIp(keywords, validity, updatetime, submitor, location, wordstate) {
  return fetch({
    url: 'blacklist/banned/addip',
    method: 'post',
    data: {
      keywords, // 联系方式
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate // 状态
    }
  })
}


export function addId(keywords, validity, updatetime, submitor, location, wordstate) {
  return fetch({
    url: 'blacklist/banned/addid',
    method: 'post',
    data: {
      keywords, // 联系方式
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


export function getContacts(query) {
  return fetch({
    url: 'blacklist/banned/getcontacts',
    method: 'get',
    params: query
  })
}

export function getIp(query) {
  return fetch({
    url: 'blacklist/banned/getip',
    method: 'get',
    params: query
  })
}


export function getId(query) {
  return fetch({
    url: 'blacklist/banned/getid',
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



export function updateIp(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'blacklist/banned/updateip',
    method: 'post',
    data: {
      id, // 编号
      keywords, // ip
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location // 范围
    }
  })
}


export function updateId(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'blacklist/banned/updateid',
    method: 'post',
    data: {
      id, // 编号
      keywords, // id
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location // 范围
    }
  })
}



export function updateContacts(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'blacklist/banned/updatecontacts',
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


export function changeContactsStatus(id, wordstate) {
  return fetch({
    url: 'blacklist/banned/changecontactstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}

export function changeIpStatus(id, wordstate) {
  return fetch({
    url: 'blacklist/banned/changeipstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}

export function changeIdStatus(id, wordstate) {
  return fetch({
    url: 'blacklist/banned/changeidstatus',
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
    data: {
      keywordsID
    }
  })
}

export function deleteContacts(keywordsID) {
  return fetch({
    url: 'blacklist/banned/deletecontacts',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function deleteIps(keywordsID) {
  return fetch({
    url: 'blacklist/banned/deleteips',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function deleteIds(keywordsID) {
  return fetch({
    url: 'blacklist/banned/deleteids',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function getKeywordClassifyList() {
  return fetch({
    url: 'dropdown/blacklist/keyword',
    method: 'get'
  })
}
export function getContactClassifyList() {
  return fetch({
    url: 'dropdown/blacklist/contact',
    method: 'get'
  })
}

// 暂留
export function getIPClassifyList() {
  return fetch({
    url: 'dropdown/blacklist/ip',
    method: 'get'
  })
}

export function transferKeyword(keywordsID) {
  return fetch({
    url: 'blacklist/banned/transferkeyword',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function getLocationDropdownList() {
  return fetch({
    url: 'dropdown/location/',
    method: 'get'
  })
}