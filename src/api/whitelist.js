import fetch from '@/utils/fetch'


export function addIp(keywords, validity, updatetime, submitor, location, wordstate) {
  return fetch({
    url: 'whitelist/banned/addip',
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
    url: 'whitelist/banned/addid',
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


export function getIp(query) {
  return fetch({
    url: 'whitelist/banned/getip',
    method: 'get',
    params: query
  })
}


export function getId(query) {
  return fetch({
    url: 'whitelist/banned/getid',
    method: 'get',
    params: query
  })
}






export function updateIp(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'whitelist/banned/updateip',
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
    url: 'whitelist/banned/updateid',
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





export function changeIpStatus(id, wordstate) {
  return fetch({
    url: 'whitelist/banned/changeipstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}

export function changeIdStatus(id, wordstate) {
  return fetch({
    url: 'whitelist/banned/changeidstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}


export function deleteIps(keywordsID) {
  return fetch({
    url: 'whitelist/banned/deleteips',
    method: 'post',
    data: {
      keywordsID
    }
  })
}


export function deleteIds(keywordsID) {
  return fetch({
    url: 'whitelist/banned/deleteids',
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