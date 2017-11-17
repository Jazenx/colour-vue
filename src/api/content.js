import fetch from '@/utils/fetch'


export function getContentList(query, state) {
  return fetch({
    url: 'review/content/list',
    method: 'post',
    data: {
      query,
      state
    }
  })
}


export function getIpList(query, state, page) {
  return fetch({
    url: 'review/ipworkstation/list',
    method: 'post',
    data: {
      query,
      state,
      page
    }
  })
}


export function getIdList(query, state, page) {
  return fetch({
    url: 'review/idworkstation/list',
    method: 'post',
    data: {
      query,
      state,
      page
    }
  })
}









export function getUserInfoList(query) {
  return fetch({
    url: 'review/content/userlist',
    method: 'get',
    params: query
  })
}

export function getIpInfoList(query) {
  return fetch({
    url: 'review/content/iplist',
    method: 'get',
    params: query
  })
}






export function submitAllList(listInfo, submitor) {
  return fetch({
    url: 'review/content/allsubmit',
    method: 'post',
    data: {
      listInfo,
      submitor
    }
  })
}

export function getBanurl(nameList) {
  return fetch({
    url: 'review/content/banurl',
    method: 'post',
    data: {
      nameList
    }
  })
}


export function submitOneOperation(detail) {
  return fetch({
    url: 'review/content/submitOneOperation',
    method: 'post',
    data: {
      detail
    }
  })
}


export function getUserIPWorkStation(query, state) {
  return fetch({
    url: 'review/ipcontent/list',
    method: 'post',
    data: {
      query,
      state
    }
  })
}


export function getUserIDWorkStation(query, state) {
  return fetch({
    url: 'review/idcontent/list',
    method: 'post',
    data: {
      query,
      state
    }
  })
}
